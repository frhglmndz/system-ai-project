/*
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
*/