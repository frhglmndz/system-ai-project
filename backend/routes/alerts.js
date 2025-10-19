/*
## Alerts Endpoints

### GET /alerts
Get alerts for doctor
```json
Response: 200
[
  {
    "id": "uuid",
    "patientName": "John Doe",
    "alertType": "breathing_difficulty",
    "severity": "high",
    "message": "Patient reported breathing difficulty",
    "isResolved": false,
    "createdAt": "2024-01-20T10:00:00Z"
  }
]
```

### PUT /alerts/:id/resolve
Mark alert as resolved (doctor only)
```json
Response: 200
{ "message": "Alert resolved" }
```
*/