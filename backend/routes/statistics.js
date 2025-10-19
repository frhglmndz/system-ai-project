/*
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
*/