/*
### GET /profile
Get user profile (requires auth)
```json
Response: 200
{
  "id": "uuid",
  "userId": "uuid",
  "firstName": "John",
  "lastName": "Doe",
  "phone": "+1234567890",
  "dateOfBirth": "1990-01-01",
  "avatarUrl": "url"
}
```

### PUT /profile
Update user profile
```json
Request:
{
  "firstName": "John",
  "lastName": "Doe",
  "phone": "+1234567890"
}

Response: 200
{ "message": "Profile updated", "profile": {...} }
```
*/