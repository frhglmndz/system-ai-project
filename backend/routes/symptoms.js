/*
## Symptoms Endpoints

### GET /symptoms
Get patient symptoms
```json
Response: 200
[
  {
    "id": "uuid",
    "symptomName": "Headache",
    "severity": "mild",
    "recordedAt": "2024-01-20T10:00:00Z"
  }
]
```

### POST /symptoms
Record symptom
```json
Request:
{
  "symptomName": "Headache",
  "severity": "mild",
  "description": "Mild throbbing"
}

Response: 201
{ "message": "Symptom recorded", "symptom": {...} }
```
*/