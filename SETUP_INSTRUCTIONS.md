# Setup Instructions for Local Development

## Prerequisites
- XAMPP installed (Apache + MySQL)
- Node.js installed (v18 or higher)
- Git installed

---

## Part 1: Export Project from Lovable

1. **Connect to GitHub**
   - In Lovable editor, click the **GitHub** button in the top menu
   - Click **Connect to GitHub**
   - Authorize the Lovable GitHub App
   - Select your GitHub account
   - Click **Create Repository**
   - Your project will be pushed to GitHub automatically

2. **Clone the Repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   cd YOUR_REPO_NAME
   ```

3. **Install Dependencies**
   ```bash
   npm install
   ```

4. **Configure Environment**
   ```bash
   cp .env.example .env.local
   ```
   Edit `.env.local`:
   ```
   VITE_API_URL=http://localhost:3000/api
   VITE_OPENAI_API_KEY=your_openai_key_here
   ```

5. **Run Frontend**
   ```bash
   npm run dev
   ```
   Frontend will run at: `http://localhost:8080`

---

## Part 2: Setup XAMPP Database

1. **Start XAMPP**
   - Open XAMPP Control Panel
   - Start **Apache** and **MySQL**

2. **Create Database**
   - Open `http://localhost/phpmyadmin` in browser
   - Click **New** to create database
   - Name it: `recovery_tracker`
   - Click **Create**

3. **Import Schema**
   - Select `recovery_tracker` database
   - Click **Import** tab
   - Click **Choose File**
   - Select `database/schema.sql` from your project
   - Click **Go** to import

4. **Verify Tables Created**
   - Check that all tables appear in the left sidebar:
     - users
     - user_roles
     - profiles
     - doctors
     - patients
     - recovery_plans
     - medications
     - medication_reminders
     - appointments
     - vitals
     - symptoms
     - health_tips
     - saved_health_tips
     - chat_messages
     - chat_alerts
     - notifications

---

## Part 3: Build Node.js Backend (You need to do this)

### Create Backend Project

1. **Create backend folder**
   ```bash
   mkdir backend
   cd backend
   npm init -y
   ```

2. **Install Dependencies**
   ```bash
   npm install express cors dotenv mysql2 bcryptjs jsonwebtoken
   npm install --save-dev @types/node @types/express typescript ts-node nodemon
   ```

3. **Create .env file**
   ```
   PORT=3000
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=
   DB_NAME=recovery_tracker
   JWT_SECRET=your_jwt_secret_here_change_this
   OPENAI_API_KEY=your_openai_key_here
   ```

4. **Create server.js**
   ```javascript
   const express = require('express');
   const cors = require('cors');
   require('dotenv').config();

   const app = express();

   app.use(cors());
   app.use(express.json());

   // Import routes (you'll create these)
   // app.use('/api/auth', require('./routes/auth'));
   // app.use('/api/profile', require('./routes/profile'));
   // ... etc

   const PORT = process.env.PORT || 3000;
   app.listen(PORT, () => {
     console.log(`Server running on port ${PORT}`);
   });
   ```

5. **Create MySQL connection** (db.js)
   ```javascript
   const mysql = require('mysql2/promise');

   const pool = mysql.createPool({
     host: process.env.DB_HOST,
     user: process.env.DB_USER,
     password: process.env.DB_PASSWORD,
     database: process.env.DB_NAME,
     waitForConnections: true,
     connectionLimit: 10
   });

   module.exports = pool;
   ```

6. **Implement All API Endpoints**
   - Follow the `API_DOCUMENTATION.md` file
   - Create route files for each section:
     - `routes/auth.js` (register, login, logout)
     - `routes/profile.js`
     - `routes/patients.js`
     - `routes/medications.js`
     - `routes/vitals.js`
     - `routes/chat.js` (AI assistant with OpenAI)
     - etc.

7. **AI Chat Implementation**
   - Use OpenAI API for chat responses
   - Analyze messages for urgent keywords
   - Create alerts when detecting:
     - "can't breathe" / "breathing difficulty"
     - "chest pain"
     - "severe pain"
     - "emergency"
   - Insert alert into `chat_alerts` table
   - Notify doctor via `notifications` table

8. **Run Backend**
   ```bash
   node server.js
   ```
   Backend runs at: `http://localhost:3000`

---

## Part 4: Test the Integration

1. Frontend: `http://localhost:8080`
2. Backend: `http://localhost:3000`
3. Database: XAMPP MySQL

Test flow:
1. Register new user
2. Login
3. Add medications
4. Record vitals
5. Send chat message
6. Check if alerts work

---

## Development Workflow

1. **Frontend changes**: Edit files in your project, run `npm run dev`
2. **Backend changes**: Edit backend files, restart Node.js server
3. **Database changes**: Modify in phpMyAdmin

---

## Important Notes

⚠️ **Building the backend will take significant time**:
- Implement authentication with JWT
- Create all CRUD endpoints
- Implement AI chat logic
- Set up alert detection system
- Create notification system
- Implement role-based access control

📚 **References**:
- Express.js docs: https://expressjs.com/
- MySQL docs: https://dev.mysql.com/doc/
- OpenAI API: https://platform.openai.com/docs

---

## Alternative: Use Lovable Cloud

Instead of building everything manually, you can:
1. Enable Lovable Cloud in the Lovable editor
2. Get authentication, database, AI features automatically
3. Focus on UI/UX instead of backend code

This saves weeks of development time!
