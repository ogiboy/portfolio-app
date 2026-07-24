#!/usr/bin/env bash
set -Eeuo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
exec "${REPO_ROOT}/scripts/qa/run_sonar_scan.sh" "$@"
