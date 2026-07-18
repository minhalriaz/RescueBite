# RescueBite API Contract Documentation

## Authentication

### Register User
**Endpoint:** POST /api/register  
**Access:** Public

#### Request
```json
{
  "name": "Lionel Messi",
  "email": "messi@example.com",
  "password": "goat123",
  "role": "donor"
}
```

#### Success (201)
```json
{
  "message": "User registered successfully."
}
```

#### Errors
- 400 Bad Request
- 409 Email already exists

### Login
**Endpoint:** POST /api/login  
**Access:** Public

```json
{
  "email": "ronaldo@example.com",
  "password": "goat123"
}
```

Success:
```json
{
  "token":"jwt_token",
  "role":"donor"
}
```

### Profile
**Endpoint:** GET /api/profile  
**Access:** Donor, NGO, Volunteer, Admin

```json
{
  "id":1,
  "name":"Cristiano Ronaldo",
  "email":"ronaldo@example.com",
  "role":"donor"
}
```

### Logout
POST /api/logout

---

# Food Donations

### Create Food Donation
**Endpoint:** POST /api/food-donations  
**Access:** Donor

```json
{
  "title":"Cooked Rice and Curry",
  "description":"Freshly prepared food",
  "quantity":15,
  "expiryTime":"2026-07-18T21:00:00",
  "latitude":23.7465,
  "longitude":90.3760,
  "address":"Dhanmondi, Dhaka"
}
```

Success:
```json
{
  "message":"Food donation created successfully.",
  "donationId":101
}
```

Other endpoints:
- GET /api/food-donations
- GET /api/food-donations/{id}
- PUT /api/food-donations/{id}
- DELETE /api/food-donations/{id}
- GET /api/food-donations/history

# Pickup Requests
- POST /api/pickup-requests
- GET /api/pickup-requests
- PUT /api/pickup-requests/{id}/approval
- PUT /api/pickup-requests/{id}/status
- PUT /api/pickup-requests/{id}/pickup
- PUT /api/pickup-requests/{id}/delivery

# Notifications
- GET /api/notifications
- PUT /api/notifications/{id}/read

# Admin
- GET /api/admin/users
- GET /api/admin/food-posts
- GET /api/admin/pickup-requests
- GET /api/admin/reports

# Status Codes
200 OK
201 Created
400 Bad Request
401 Unauthorized
403 Forbidden
404 Not Found
409 Conflict
500 Internal Server Error
