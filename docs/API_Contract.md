# RescueBite API Contract Documentation

Base development URL: `http://localhost:8000/api`

Protected endpoints use:

```text
Authorization: Bearer <token>
```

## Authentication

### Register

`POST /api/register`

```json
{
  "name": "Human Hope NGO",
  "email": "hope@example.com",
  "phone": "+8801700000000",
  "password": "password",
  "role": "ngo",
  "beneficiary_preference": "human"
}
```

For NGO users, `beneficiary_preference` must be `human`, `animal`, or `both`.

### Login

`POST /api/login`

```json
{
  "email": "hope@example.com",
  "password": "password"
}
```

Success returns `token` and `user`.

### Profile / Logout

- `GET /api/profile`
- `POST /api/logout`

## Food Donations

### Create Food Donation

`POST /api/donations`

Compatibility alias: `POST /api/food-donations`

Access: Donor

```json
{
  "food": "Cooked meals",
  "quantity": "Approximately 30 servings",
  "beneficiary_type": "human",
  "pickup_deadline": "2026-08-12T20:00:00+06:00",
  "address": "Dhanmondi, Dhaka",
  "description": "Freshly prepared food"
}
```

Success (`201`):

```json
{
  "message": "Food donation created successfully.",
  "donation": {
    "id": 101,
    "food": "Cooked meals",
    "beneficiary_type": "human"
  },
  "notifications_created": 2
}
```

Creating a donation synchronously creates in-app notifications for matching NGO users. A Human donation matches Human and Both NGO preferences. An Animal donation matches Animal and Both preferences.

## Notifications

### Retrieve notifications

`GET /api/notifications`

Access: authenticated user; NGO accounts receive their matching donation alerts.

```json
{
  "data": [
    {
      "id": 12,
      "user_id": 3,
      "donation_id": 101,
      "type": "donation_available",
      "title": "New food donation available",
      "message": "New food donation available near your service area.\n\nFood: Cooked meals\nQuantity: Approximately 30 servings\nBeneficiary: Human\nPickup deadline: 8:00 PM",
      "data": {
        "donation_id": 101,
        "food": "Cooked meals",
        "quantity": "Approximately 30 servings",
        "beneficiary_type": "human",
        "pickup_deadline": "2026-08-12T20:00:00+06:00",
        "address": "Dhanmondi, Dhaka"
      },
      "read_at": null,
      "created_at": "2026-08-12T14:00:00+06:00",
      "updated_at": "2026-08-12T14:00:00+06:00"
    }
  ],
  "unread_count": 1
}
```

### Mark one as read

`PATCH /api/notifications/{notificationId}/read`

The notification must belong to the authenticated user. The original `PUT` endpoint from the early API contract is retained as a compatibility alias.

### Mark all as read

`PATCH /api/notifications/read-all`

Marks all unread notifications belonging to the authenticated user as read.

## Duplicate prevention

The database enforces a unique key across:

```text
user_id + donation_id + type
```

The notification service uses an idempotent insert, so rerunning matching for the same donation does not create a second notification for the same NGO.

## Status Codes

- `200` OK
- `201` Created
- `401` Unauthenticated
- `403` Forbidden
- `404` Not Found
- `422` Validation Error
- `500` Server Error
