# Day13-14 Completion Checklist

## Day13 (quality checks)

- [x] Type check (`npm run lint`)
- [x] Format check (`npm run format:check`)
- [x] Error handling consistency confirmed in key flows (create/edit/delete)

## Day14 (release readiness)

- [x] README finalized for setup and operations
- [x] `.env` templates provided for frontend/backend
- [x] Docker compose startup flow documented
- [x] Verification script added: `scripts/verify-day14.sh`

## Manual smoke flow

1. `docker compose up --build -d`
2. open `http://localhost:3000`
3. open `http://localhost:8080/api/outfits`
4. create/update/delete outfit from UI and verify behavior
