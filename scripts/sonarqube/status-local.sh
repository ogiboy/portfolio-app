#!/usr/bin/env bash
set -Eeuo pipefail

SONAR_HOST_URL="${SONAR_HOST_URL:-http://localhost:9000}"

if [[ "${SONAR_HOST_URL}" != "http://localhost:9000" ]]; then
  echo "This script is local-only and requires SONAR_HOST_URL=http://localhost:9000." >&2
  exit 1
fi

if ! command -v docker >/dev/null 2>&1; then
  echo "Docker is required to inspect local SonarQube." >&2
  exit 1
fi

if ! command -v curl >/dev/null 2>&1; then
  echo "curl is required to inspect local SonarQube health." >&2
  exit 1
fi

docker ps --filter "name=^sonarqube$" --filter "name=^sonarqube-db$" \
  --format "table {{.Names}}\t{{.Image}}\t{{.Status}}\t{{.Ports}}"

echo
curl -fsS "${SONAR_HOST_URL}/api/system/status" || {
  echo "SonarQube did not respond at ${SONAR_HOST_URL}" >&2
  exit 1
}
echo
