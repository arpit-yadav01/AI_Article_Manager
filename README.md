# 📝 AI Article Manager

A full-stack AI-powered article writing and management platform built for learning and real-world practice.

The platform allows users to create and explore articles, while admins can use AI tools to improve content quality using modern LLMs.

🌐 **Live Demo**  
Frontend: https://articlemanagerwithai.netlify.app  
Backend API: https://ai-article-manager.onrender.com  

---

## 🚀 Features

### 👤 Authentication & Roles
- JWT-based authentication
- Role-based access control
  - **User**
  - **Admin**

### 📰 Article Management
- Create, read, update, delete articles
- Users can:
  - View only their own articles
  - Explore articles written by others (read-only)
- Admins can:
  - Edit or delete **any** article

### 🤖 AI-Powered Writing Tools (Admin Only)
- ✨ **Summarize Article**
- ✨ **Improve Writing** (rewrite for clarity & flow)
- 🧠 **Find Mistakes & Suggestions**

AI features are powered by **Groq LLMs** and integrated securely on the backend.



## 🛠 Tech Stack

### Frontend
- React (Vite)
- Axios
- React Router
- Context API
- Hosted on **Netlify**

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- JWT Authentication
- Role-based middleware
- Groq AI SDK
- Hosted on **Render**

---

Project Structure (Monorepo)
AI_Article_Manager/
├── article-backend/
│ ├── src/
│ │ ├── controllers/
│ │ ├── routes/
│ │ ├── services/
│ │ ├── middleware/
│ │ ├── models/
│ │ ├── app.js
│ │ └── server.js
│ └── package.json
│
├── article-frontend/
│ ├── src/
│ │ ├── pages/
│ │ ├── components/
│ │ ├── api/
│ │ ├── context/
│ │ └── App.jsx
│ └── package.json
│
└── README.md


---

## 🔐 Environment Variables (Backend)

Create a `.env` file inside `article-backend/`:

```env
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
GROQ_API_KEY=your_groq_api_key
NODE_ENV=production


🧪 Running Locally
Backend
cd article-backend
npm install
npm run dev

Frontend
cd article-frontend
npm install
npm run dev

