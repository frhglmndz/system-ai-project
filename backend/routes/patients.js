/**
 ## Patient Endpoints

### GET /patients
Get all patients (doctor only)
```json
Response: 200
[
  {
    "id": "uuid",
    "userId": "uuid",
    "firstName": "John",
    "lastName": "Doe",
    "recoveryProgress": 75,
    "dischargeDate": "2024-01-15"
  }
]
```

### GET /patients/:id
Get patient details (doctor or own patient record)
```json
Response: 200
{
  "id": "uuid",
  "userId": "uuid",
  "doctorId": "uuid",
  "bloodType": "O+",
  "allergies": "None",
  "medicalConditions": "Post-surgery",
  "recoveryProgress": 75
}
```

### PUT /patients/:id
Update patient info (doctor only)
```json
Request:
{
  "doctorId": "uuid",
  "recoveryProgress": 80,
  "medicalConditions": "Recovering well"
}

Response: 200
{ "message": "Patient updated", "patient": {...} }
```
 */