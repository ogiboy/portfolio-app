#!/usr/bin/env bash
set -Eeuo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
ARTIFACT_DIR="${SONAR_ARTIFACT_DIR:-${REPO_ROOT}/.ai/qa/artifacts/sonar}"
LCOV_PATH="${SONAR_JAVASCRIPT_LCOV:-${REPO_ROOT}/coverage/lcov.info}"
SCAN_LOG="${ARTIFACT_DIR}/sonar-npm.log"
PNPM_EXECUTABLE="${PNPM_EXECUTABLE:-pnpm}"

SONAR_HOST_URL="${SONAR_HOST_URL:-http://localhost:9000}"
SONAR_READY_TIMEOUT_SECONDS="${SONAR_READY_TIMEOUT_SECONDS:-90}"
SONAR_TOKEN_KEYCHAIN_SERVICE="${SONAR_TOKEN_KEYCHAIN_SERVICE:-codex-sonarqube-token}"
SONAR_TOKEN_KEYCHAIN_ACCOUNT="${SONAR_TOKEN_KEYCHAIN_ACCOUNT:-${USER:-}}"

require_command() {
  local command_name="$1"
  local purpose="$2"

  if ! command -v "${command_name}" >/dev/null 2>&1; then
    echo "${command_name} is required to ${purpose}." >&2
    exit 1
  fi
}

resolve_token() {
  if [[ -z "${SONAR_TOKEN:-}" ]] && command -v security >/dev/null 2>&1 && [[ -n "${SONAR_TOKEN_KEYCHAIN_ACCOUNT}" ]]; then
    SONAR_TOKEN="$(
      security find-generic-password \
        -a "${SONAR_TOKEN_KEYCHAIN_ACCOUNT}" \
        -s "${SONAR_TOKEN_KEYCHAIN_SERVICE}" \
        -w 2>/dev/null || true
    )"
  fi

  if [[ -z "${SONAR_TOKEN:-}" ]]; then
    echo "SONAR_TOKEN is required. Set it in the environment or store it in macOS Keychain service '${SONAR_TOKEN_KEYCHAIN_SERVICE}'." >&2
    exit 1
  fi

  export SONAR_TOKEN
}

wait_for_sonarqube() {
  local deadline=$((SECONDS + SONAR_READY_TIMEOUT_SECONDS))

  echo "Waiting for local SonarQube at ${SONAR_HOST_URL}"
  while ((SECONDS < deadline)); do
    if response="$(curl -fsS "${SONAR_HOST_URL}/api/system/status" 2>/dev/null)" &&
      grep -q '"status":"UP"' <<<"${response}"; then
      return 0
    fi
    sleep 3
  done

  echo "Timed out waiting for local SonarQube at ${SONAR_HOST_URL}. Run scripts/sonarqube/status-local.sh for diagnostics." >&2
  exit 1
}

redacted_runner() {
  local -a command=("$@")

  "${command[@]}" 2>&1 \
    | SONAR_TOKEN_REDACT="${SONAR_TOKEN}" perl -pe 'BEGIN { $t = $ENV{SONAR_TOKEN_REDACT} // ""; } if (length $t) { s/\Q$t\E/<redacted>/go }' \
    | tee "${SCAN_LOG}"
}

cd "${REPO_ROOT}"
mkdir -p "${ARTIFACT_DIR}"

require_command "${PNPM_EXECUTABLE}" "run the local SonarQube scan"
require_command curl "wait for local SonarQube readiness"
require_command perl "redact the local SonarQube scan log"

if [[ "${SONAR_HOST_URL}" != "http://localhost:9000" ]]; then
  echo "This script is local-only and requires SONAR_HOST_URL=http://localhost:9000." >&2
  exit 1
fi

if [[ "${SONAR_SKIP_COVERAGE:-0}" != "1" ]]; then
  echo "Writing JavaScript/TypeScript coverage to ${LCOV_PATH}"
  "${PNPM_EXECUTABLE}" run --silent test:coverage
fi

if [[ ! -f "${LCOV_PATH}" ]]; then
  echo "LCOV coverage is required at ${LCOV_PATH}. Run pnpm test:coverage or unset SONAR_SKIP_COVERAGE." >&2
  exit 1
fi

resolve_token
wait_for_sonarqube

command=(
  "${PNPM_EXECUTABLE}" exec sonar-scanner-npm
  "-Dproject.settings=sonar-project.properties"
  "-Dsonar.host.url=${SONAR_HOST_URL}"
)

echo "Running local @sonar/scan at ${SONAR_HOST_URL}"
redacted_runner "${command[@]}"
echo "Sonar scanner log: ${SCAN_LOG}"
