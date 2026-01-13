# AI-Powered Study Buddy

**Created by: Vikash Mishra**

A full-stack web application that serves as an intelligent study companion for students across all levels (school, college, competitive exams). Built with React, Node.js, Express, SQLite, and Google Gemini AI.

## Features

### 🤖 AI-Powered Chat Assistant
- Context-aware responses based on education level
- Subject-specific guidance (School, College, Programming, Exam Prep)
- Step-by-step explanations with examples
- Code assistance with clean implementations
- Conversation history and persistence

### 📅 Study Plan Generator
- Create personalized study schedules
- Specify subject, duration, and daily time commitment
- Get realistic, day-by-day learning plans
- Export and save study plans

### 🎨 Modern UI/UX
- Beautiful gradient design with glassmorphism effects
- Dark/Light mode support
- Smooth animations and transitions
- Fully responsive (desktop, tablet, mobile)
- Markdown rendering for rich content

### 🔐 Authentication
- Secure JWT-based authentication
- User profiles with education level
- Password encryption
- Session persistence

## Tech Stack

**Frontend:**
- React 18
- Vite
- React Router
- Axios
- Marked (Markdown rendering)

**Backend:**
- Node.js
- Express.js
- SQLite (better-sqlite3)
- JWT Authentication
- Google Gemini AI API

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- Google Gemini API Key (free tier available)

### 1. Clone or Navigate to Project
```bash
cd "c:\Users\ASUS\studt buddy"
```

### 2. Get Gemini API Key
1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Click "Create API Key"
3. Copy your API key

### 3. Configure Environment Variables
Create a `.env` file in the root directory:
```bash
cp .env.example .env
```

Edit `.env` and add your configuration:
```env
# Backend
PORT=5000
DATABASE_PATH=./backend/database.sqlite
JWT_SECRET=your-secret-key-change-this-in-production
GEMINI_API_KEY=your-gemini-api-key-here

# Frontend
VITE_API_URL=http://localhost:5000/api
```

### 4. Install Dependencies

**Backend:**
```bash
cd backend
npm install
```

**Frontend:**
```bash
cd ../frontend
npm install
```

### 5. Run the Application

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```
Backend will run on `http://localhost:5000`

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```
Frontend will run on `http://localhost:5173`

### 6. Access the Application
Open your browser and navigate to `http://localhost:5173`

## Usage Guide

### First Time Setup
1. Click "Sign Up" to create an account
2. Enter your name, email, password
3. Select your education level
4. Click "Sign Up"

### Chatting with Study Buddy
1. Select a subject category (optional)
2. Type your question in the input field
3. Press Enter or click Send
4. View AI-generated responses with markdown formatting

### Generating Study Plans
1. Click "Study Plan Generator" in the sidebar
2. Enter subject/topic
3. Specify duration (e.g., "2 weeks", "1 month")
4. Set hours per day
5. Click "Generate Study Plan"
6. Review your personalized plan

### Managing Conversations
- Click "New Chat" to start a fresh conversation
- Select previous conversations from the sidebar
- Delete conversations by clicking the trash icon

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Chat
- `POST /api/chat/message` - Send message to AI (protected)
- `GET /api/chat/history` - Get user's conversations (protected)
- `GET /api/chat/conversation/:id` - Get specific conversation (protected)
- `DELETE /api/chat/conversation/:id` - Delete conversation (protected)

### Study Plan
- `POST /api/studyplan/generate` - Generate study plan (protected)

## Project Structure
```
studt-buddy/
├── backend/
│   ├── config/
│   │   ├── database.js       # SQLite setup
│   │   └── ai.js            # Gemini AI integration
│   ├── middleware/
│   │   └── auth.js          # JWT middleware
│   ├── routes/
│   │   ├── auth.js          # Auth endpoints
│   │   ├── chat.js          # Chat endpoints
│   │   └── studyplan.js     # Study plan endpoints
│   ├── server.js            # Express server
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ChatMessage.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   ├── SubjectSelector.jsx
│   │   │   └── StudyPlanGenerator.jsx
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   └── Chat.jsx
│   │   ├── services/
│   │   │   └── api.js       # API client
│   │   ├── App.jsx          # Main app
│   │   ├── main.jsx         # Entry point
│   │   └── index.css        # Global styles
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
├── .env
├── .env.example
├── .gitignore
└── README.md
```

## Deployment

### Backend
Deploy to platforms like:
- [Render](https://render.com)
- [Railway](https://railway.app)
- [Heroku](https://heroku.com)

### Frontend
Deploy to:
- [Vercel](https://vercel.com)
- [Netlify](https://netlify.com)
- GitHub Pages

Don't forget to update environment variables in your deployment platform!

## Troubleshooting

**Issue: API not connecting**
- Check that backend is running on port 5000
- Verify `VITE_API_URL` in frontend `.env`

**Issue: AI responses failing**
- Verify your Gemini API key is correct
- Check API quota limits
- Ensure internet connection

**Issue: Authentication not working**
- Clear browser localStorage
- Check JWT_SECRET is set in backend `.env`

## License
MIT License

## Author
**Vikash Mishra**

---

Built with ❤️ for learners everywhere
