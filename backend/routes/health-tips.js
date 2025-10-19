/*
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
*/