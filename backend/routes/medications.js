/*
## Medication Endpoints

### GET /medications
Get patient medications
```json
Response: 200
[
  {
    "id": "uuid",
    "name": "Aspirin",
    "dosage": "100mg",
    "frequency": "Twice daily",
    "isActive": true
  }
]
```

### POST /medications
Add medication (doctor only)
```json
Request:
{
  "patientId": "uuid",
  "name": "Aspirin",
  "dosage": "100mg",
  "frequency": "Twice daily",
  "startDate": "2024-01-15"
}

Response: 201
{ "message": "Medication added", "medication": {...} }
```

### PUT /medications/:id/complete
Mark medication reminder as completed
```json
Response: 200
{ "message": "Marked as completed" }
```
*/