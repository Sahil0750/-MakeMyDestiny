# 📦 Installation Commands

## Copy-Paste Ready Commands

### Step 1: Backend Setup

```bash
# Navigate to backend
cd backend
# Install all dependencies
npm install

# This will install:
# - express (Web framework)
# - mongoose (MongoDB ODM)
# - bcryptjs (Password hashing)
# - jsonwebtoken (JWT authentication)
# - dotenv (Environment variables)
# - cors (Cross-origin requests)
# - express-validator (Input validation)
# - cookie-parser (Cookie handling)
# - nodemon (Dev dependency - auto restart)
```

### Step 2: Frontend Setup

```bash
# Navigate to frontend (open new terminal)
cd frontend

# Install all dependencies
npm install

# This will install:
# - react (UI library)
# - react-dom (React DOM)
# - react-router-dom (Routing)
# - axios (HTTP client)
# - react-icons (Icons)
# - react-toastify (Notifications)
# - react-scripts (Build tools)
```

### Step 3: Database Seeding

```bash
# In backend directory
node seeder.js

# This will:
# ✅ Clear existing data
# ✅ Add 20+ tourist destinations
# ✅ Create admin user (admin@makemydestiny.com / admin123)
# ✅ Create test user (user@test.com / user123)
```

### Step 4: Start Backend

```bash
# In backend directory
npm run dev

# Server will start on http://localhost:5000
# You should see:
# "MongoDB Connected: localhost"
# "Server running in development mode on port 5000"
```

### Step 5: Start Frontend

```bash
# In frontend directory (new terminal)
npm start

# App will open at http://localhost:3000
# Browser will automatically open
```

---

## 🔄 Alternative: Production Mode

### Backend Production
```bash
cd backend
npm start
```

### Frontend Production Build
```bash
cd frontend
npm run build
# Creates optimized production build in 'build' folder
```

---

## 🧹 Clean Installation (If Issues)

### Backend
```bash
cd backend
rmdir /s /q node_modules
del package-lock.json
npm install
```

### Frontend
```bash
cd frontend
rmdir /s /q node_modules
del package-lock.json
npm install
```

---

## 📋 Verification Commands

### Check Node & npm versions
```bash
node --version
npm --version
```

### Check MongoDB
```bash
# Check if MongoDB is running
mongosh
# or
mongo
```

### Test Backend API
```bash
# In browser or Postman
GET http://localhost:5000/api/trips
```

---

## 🐛 Troubleshooting Commands

### Kill Port 5000 (Windows)
```bash
netstat -ano | findstr :5000
taskkill /PID <PID_NUMBER> /F
```

### Kill Port 3000 (Windows)
```bash
netstat -ano | findstr :3000
taskkill /PID <PID_NUMBER> /F
```

### Clear npm cache
```bash
npm cache clean --force
```

### Reinstall dependencies
```bash
# Backend
cd backend
npm install --force

# Frontend
cd frontend
npm install --force
```

---

## ✅ Success Indicators

After running all commands, you should see:

**Backend Terminal:**
```
MongoDB Connected: localhost
Server running in development mode on port 5000
```

**Frontend Terminal:**
```
Compiled successfully!
webpack compiled with 0 warnings
```

**Browser:**
- Application opens at http://localhost:3000
- Homepage loads with gradient design
- Trips are visible
- Chatbot icon appears

---

## 🎯 Quick Test

1. Open http://localhost:3000
2. Click "Trips" in navbar
3. You should see 20+ destinations
4. Click on any trip to view details
5. Try the chatbot (bottom right)
6. Login with: admin@makemydestiny.com / admin123

---

## 📞 Still Having Issues?

Check these files:
1. SETUP_GUIDE.md - Detailed troubleshooting
2. README.md - Complete documentation
3. PROJECT_SUMMARY.md - Project overview

---

**Happy Coding! 🚀**
