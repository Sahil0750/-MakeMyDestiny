# ⚡ Quick Start Guide

## 🚀 Get Started in 5 Minutes!

### Step 1: Install Dependencies

**Backend:**
```bash
cd backend
npm install
```

**Frontend:**
```bash
cd frontend
npm install
```

### Step 2: Setup Environment

Backend `.env` file is already created. Just verify MongoDB is running or update MONGO_URI.

### Step 3: Seed Database

```bash
cd backend
node seeder.js
```

### Step 4: Start Application

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```

### Step 5: Access Application

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

### Step 6: Login

**Admin:**
- Email: admin@makemydestiny.com
- Password: admin123

**User:**
- Email: user@test.com
- Password: user123

---

## 🎯 What to Test

1. ✅ Browse trips on homepage
2. ✅ Register new account
3. ✅ Login with demo credentials
4. ✅ Search and filter trips
5. ✅ Book a trip
6. ✅ View your bookings
7. ✅ Cancel a booking
8. ✅ Chat with AI bot
9. ✅ Login as admin
10. ✅ View admin dashboard

---

## 🐛 Quick Troubleshooting

**MongoDB not connecting?**
- Start MongoDB service
- Or use MongoDB Atlas (update MONGO_URI)

**Port already in use?**
- Change PORT in backend/.env
- Kill process using the port

**Module not found?**
- Delete node_modules
- Run npm install again

---

## 📞 Need Help?

Check these files:
- README.md - Complete documentation
- SETUP_GUIDE.md - Detailed setup instructions
- PROJECT_FEATURES.md - Interview preparation

---

**Happy Coding! 🎉**
