# Backend Setup Instructions

## Prerequisites
- Node.js (v14 or higher)
- XAMPP with MySQL running
- Database created from `database/schema.sql`

## Installation

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the `backend` directory with the following:
```env
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=patient_recovery
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
```

## Running the Server

### Development mode (with auto-restart):
```bash
npm run dev
```

### Production mode:
```bash
npm start
```

The server will run on `http://localhost:3000`

## API Endpoints

All endpoints are prefixed with `/api`. See `API_DOCUMENTATION.md` in the root directory for complete API documentation.

## Testing the Backend

1. Start XAMPP and ensure MySQL is running
2. Import the database schema from `database/schema.sql` into phpMyAdmin
3. Start the backend server with `npm run dev`
4. Test the authentication endpoint:

```bash
# Register a new user
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123","firstName":"John","lastName":"Doe","role":"patient"}'
```

If you get a response with a token, the backend is working correctly!

## Common Issues

### Database Connection Errors
- Make sure XAMPP MySQL is running
- Verify database credentials in `.env`
- Check if the database exists: `patient_recovery`

### Port Already in Use
- Change the PORT in `.env` to a different number (e.g., 3001)
- Or stop the process using port 3000

### Module Not Found
- Run `npm install` again
- Delete `node_modules` and `package-lock.json`, then run `npm install`
