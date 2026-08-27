# RescueBite

RescueBite is a React + Laravel food-rescue application. The repository is organized as a monorepo:

- `apps/web` — React/Vite frontend
- `apps/api` — Laravel API
- `docs` — API and project documentation

## Checkpoint 2: Donor-to-NGO notifications

Issue #14 is implemented with database-backed in-app notifications. Donor-created food posts are matched to NGO beneficiary preferences (`human`, `animal`, `both`), shown in the notification bell/dropdown/page, counted as unread, and can be marked read individually or all at once. No SMS service is used.

See `docs/checkpoint-2-notifications.md` for the full flow and demo procedure.

## Run with Docker

To run the project (including MySQL and services) using Docker:

1. Make sure Docker Desktop is running.
2. Start the containers using Docker Compose:
   ```bash
   docker compose up --build

## Run the backend

cd apps/api
composer install
cp .env.example .env
php artisan key:generate
# Configure MySQL values in .env
php artisan migrate --seed
php artisan serve

## Run the frontend

cd ../web
cp .env.example .env
npm install
npm run dev

Frontend default: `http://localhost:5173`  
API default: `http://localhost:8000/api`

## Tests

cd apps/api
php artisan test

cd ../web
npm run lint
npm run build
