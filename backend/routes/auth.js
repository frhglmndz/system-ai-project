/*
## Authentication Endpoints

### POST /auth/register
Register a new user
```json
Request:
{
  "email": "user@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe",
  "role": "patient" // or "doctor"
}

Response: 201
{
  "user": { "id": "uuid", "email": "user@example.com" },
  "token": "jwt-token"
}
```

### POST /auth/login
Login user
```json
Request:
{
  "email": "user@example.com",
  "password": "password123"
}

Response: 200
{
  "user": { "id": "uuid", "email": "user@example.com", "role": "patient" },
  "token": "jwt-token"
}
```

### GET /auth/me
Get current user (requires auth token)
```json
Response: 200
{
  "user": { "id": "uuid", "email": "user@example.com", "role": "patient" }
}
```
*/