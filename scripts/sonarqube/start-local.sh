#!/usr/bin/env bash
set -Eeuo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
COMPOSE_FILE="${SONARQUBE_COMPOSE_FILE:-${REPO_ROOT}/scripts/sonarqube/docker-compose.sonarqube.yml}"
SONAR_HOST_URL="${SONAR_HOST_URL:-http://localhost:9000}"
START_TIMEOUT_SECONDS="${SONARQUBE_START_TIMEOUT_SECONDS:-90}"
SONAR_CONTAINER_NAME="${SONARQUBE_CONTAINER_NAME:-sonarqube}"

if [[ "${SONAR_HOST_URL}" != "http://localhost:9000" ]]; then
  echo "This script is local-only and requires SONAR_HOST_URL=http://localhost:9000." >&2
  exit 1
fi

require_command() {
  local command_name="$1"
  local purpose="$2"

  if ! command -v "${command_name}" >/dev/null 2>&1; then
    echo "${command_name} is required to ${purpose}." >&2
    exit 1
  fi
}

require_command docker "start local SonarQube"
require_command curl "wait for local SonarQube readiness"

if [[ ! -r "${COMPOSE_FILE}" ]]; then
  echo "SonarQube compose file is not readable: ${COMPOSE_FILE}" >&2
  exit 1
fi

if docker compose version >/dev/null 2>&1; then
  COMPOSE_COMMAND=(docker compose)
elif command -v docker-compose >/dev/null 2>&1; then
  COMPOSE_COMMAND=(docker-compose)
else
  echo "Docker Compose is required. Install Docker Compose v2 or docker-compose." >&2
  exit 1
fi

"${COMPOSE_COMMAND[@]}" -f "${COMPOSE_FILE}" config --quiet
"${COMPOSE_COMMAND[@]}" -f "${COMPOSE_FILE}" up -d
echo "Local SonarQube is starting at ${SONAR_HOST_URL}"

deadline=$((SECONDS + START_TIMEOUT_SECONDS))
while ((SECONDS < deadline)); do
  if response="$(curl -fsS "${SONAR_HOST_URL}/api/system/status" 2>/dev/null)" &&
    grep -q '"status":"UP"' <<<"${response}"; then
    echo "Local SonarQube is ready at ${SONAR_HOST_URL}"
    exit 0
  fi

  container_state="$(docker inspect -f '{{.State.Status}}' "${SONAR_CONTAINER_NAME}" 2>/dev/null || true)"
  if [[ "${container_state}" == "exited" || "${container_state}" == "dead" ]]; then
    echo "SonarQube container stopped before becoming ready. Recent logs:" >&2
    docker logs "${SONAR_CONTAINER_NAME}" --tail 80 >&2 || true
    exit 1
  fi

  sleep 3
done

echo "Timed out waiting for local SonarQube to become ready at ${SONAR_HOST_URL}." >&2
docker ps --filter "name=^${SONAR_CONTAINER_NAME}$" \
  --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}" >&2 || true
docker logs "${SONAR_CONTAINER_NAME}" --tail 80 >&2 || true
exit 1
