# RescueBite API — Checkpoint 2

Laravel API for RescueBite. Checkpoint 2 implements donor-to-NGO in-app food notifications only; no SMS provider is required.

## Setup

```bash
cd apps/api
composer install
cp .env.example .env
php artisan key:generate
# Configure MySQL in .env, then:
php artisan migrate --seed
php artisan serve
```

The frontend expects the API at `http://localhost:8000/api` by default.

## Demo accounts

All seeded accounts use password `password`.

| Account | Email | Preference | Seed token |
|---|---|---|---|
| Donor | donor@rescuebite.test | — | `demo-donor-token` |
| Human NGO | human.ngo@rescuebite.test | Human | `demo-human-ngo-token` |
| Animal NGO | animal.ngo@rescuebite.test | Animal | `demo-animal-ngo-token` |
| Both NGO | both.ngo@rescuebite.test | Both | `demo-both-ngo-token` |

The deterministic seed tokens are presentation-only. Normal login rotates the token to a random value.

## Notification flow

1. `POST /api/donations` creates a donor's donation.
2. `DonationNotificationService` selects NGO users whose `beneficiary_preference` equals the donation beneficiary or `both`.
3. One database notification is inserted per eligible NGO.
4. A unique database index on `(user_id, donation_id, type)` prevents duplicate alerts.
5. NGO clients read the alerts with `GET /api/notifications` and mark them read with the PATCH endpoints.

## Main endpoints

```text
POST   /api/register
POST   /api/login
POST   /api/donations
POST   /api/food-donations        # compatibility alias
GET    /api/notifications
PATCH  /api/notifications/{id}/read
PATCH  /api/notifications/read-all
```

Protected endpoints use `Authorization: Bearer <token>`.

## Tests

```bash
php artisan test
```

Feature tests cover Human/Animal/Both matching, duplicate prevention, notification retrieval, ownership, mark-read, and mark-all-read.
