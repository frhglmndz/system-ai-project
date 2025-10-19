# API Documentation for Node.js/Express Backend

Base URL: `http://localhost:3000/api` (configure in your .env file)

---

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

---

## Profile Endpoints

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

---

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

---

## Recovery Plans Endpoints

### GET /recovery-plans
Get patient's recovery plans
```json
Response: 200
[
  {
    "id": "uuid",
    "title": "Post-Surgery Recovery Plan",
    "description": "6-week recovery program",
    "dietPlan": "Low sodium, high protein diet...",
    "exercisePlan": "Light walking 10 mins daily...",
    "startDate": "2024-01-15"
  }
]
```

### POST /recovery-plans
Create recovery plan (doctor only)
```json
Request:
{
  "patientId": "uuid",
  "title": "Recovery Plan",
  "description": "Details...",
  "dietPlan": "Diet details...",
  "exercisePlan": "Exercise details...",
  "startDate": "2024-01-15",
  "endDate": "2024-03-15"
}

Response: 201
{ "message": "Plan created", "plan": {...} }
```

---

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

---

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

---

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

---

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

---

## Health Tips Endpoints

### GET /health-tips
Get health tips
```json
Response: 200
[
  {
    "id": "uuid",
    "title": "Stay Hydrated",
    "category": "Wellness",
    "content": "Drink 8 glasses of water daily..."
  }
]
```

### POST /health-tips/:id/save
Save health tip
```json
Response: 200
{ "message": "Tip saved" }
```

### GET /health-tips/saved
Get saved health tips
```json
Response: 200
[...]
```

---

## Chat Endpoints (AI Assistant)

### GET /chat/messages
Get chat history
```json
Response: 200
[
  {
    "id": "uuid",
    "role": "user",
    "content": "I'm having trouble breathing",
    "createdAt": "2024-01-20T10:00:00Z"
  },
  {
    "id": "uuid",
    "role": "assistant",
    "content": "I understand you're experiencing breathing difficulty...",
    "createdAt": "2024-01-20T10:00:05Z"
  }
]
```

### POST /chat/send
Send message to AI assistant (analyzes for urgent conditions)
```json
Request:
{
  "message": "I'm having chest pain"
}

Response: 200
{
  "response": "I'm concerned about your chest pain...",
  "alertCreated": true,
  "alertType": "severe_pain"
}
```

**Important**: This endpoint should:
1. Save user message to database
2. Call OpenAI/Gemini API for AI response
3. Analyze message for urgent keywords (breathing, chest pain, etc.)
4. Create alert in `chat_alerts` table if urgent
5. Notify doctor via notifications table
6. Return AI response to user

---

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

---

## Notifications Endpoints

### GET /notifications
Get user notifications
```json
Response: 200
[
  {
    "id": "uuid",
    "title": "Medication Reminder",
    "message": "Time to take Aspirin",
    "type": "reminder",
    "isRead": false,
    "createdAt": "2024-01-20T10:00:00Z"
  }
]
```

### PUT /notifications/:id/read
Mark notification as read
```json
Response: 200
{ "message": "Marked as read" }
```

---

## Dashboard Statistics

### GET /dashboard/stats
Get dashboard statistics
```json
Response: 200
{
  "recoveryProgress": 75,
  "medicationsTaken": 12,
  "totalMedications": 15,
  "upcomingAppointments": 2,
  "recentVitals": {...}
}
```

### GET /dashboard/doctor-stats (doctor only)
Get doctor dashboard statistics
```json
Response: 200
{
  "totalPatients": 25,
  "activeAlerts": 3,
  "todayAppointments": 5,
  "patientsNeedingAttention": 2
}
```

---

## Authentication Notes

All authenticated endpoints require JWT token in header:
```
Authorization: Bearer <jwt-token>
```

Store token in localStorage after login and include in all API requests.

---

## Error Responses

All endpoints return errors in this format:
```json
{
  "error": "Error message",
  "statusCode": 400
}
```

Common status codes:
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Server Error
