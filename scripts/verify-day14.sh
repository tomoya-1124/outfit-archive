#!/usr/bin/env bash
set -euo pipefail

echo "[1/3] Type check"
npm run lint

echo "[2/3] Format check"
npm run format:check

echo "[3/3] API smoke check (optional)"
if curl -fsS http://localhost:8080/api/outfits >/dev/null 2>&1; then
  echo "API reachable: http://localhost:8080/api/outfits"
else
  echo "API not reachable. Start docker compose first." >&2
fi
