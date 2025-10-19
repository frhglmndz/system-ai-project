/*
## Appointment Endpoints

### GET /appointments
Get user appointments
```json
Response: 200
[
  {
    "id": "uuid",
    "title": "Follow-up Checkup",
    "appointmentDate": "2024-02-01",
    "appointmentTime": "10:00",
    "location": "Main Hospital",
    "isCompleted": false
  }
]
```

### POST /appointments
Create appointment
```json
Request:
{
  "patientId": "uuid",
  "title": "Checkup",
  "appointmentDate": "2024-02-01",
  "appointmentTime": "10:00",
  "location": "Hospital"
}

Response: 201
{ "message": "Appointment created", "appointment": {...} }
```
*/