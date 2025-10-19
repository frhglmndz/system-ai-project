/*
## Vitals Endpoints

### GET /vitals
Get patient vitals history
```json
Response: 200
[
  {
    "id": "uuid",
    "bloodPressureSystolic": 120,
    "bloodPressureDiastolic": 80,
    "heartRate": 72,
    "temperature": 98.6,
    "recordedAt": "2024-01-20T10:00:00Z"
  }
]
```

### POST /vitals
Record vitals
```json
Request:
{
  "bloodPressureSystolic": 120,
  "bloodPressureDiastolic": 80,
  "heartRate": 72,
  "temperature": 98.6
}

Response: 201
{ "message": "Vitals recorded", "vital": {...} }
```
*/