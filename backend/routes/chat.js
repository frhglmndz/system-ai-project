/*
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
*/