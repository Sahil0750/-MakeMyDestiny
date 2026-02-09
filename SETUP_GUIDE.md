# 🚀 Complete Setup & Deployment Guide

## Table of Contents
1. [Local Development Setup](#local-development-setup)
2. [Database Setup](#database-setup)
3. [Running the Application](#running-the-application)
4. [Testing](#testing)
5. [Deployment](#deployment)
6. [Troubleshooting](#troubleshooting)

---

## 📦 Local Development Setup

### Step 1: Install Prerequisites

#### Install Node.js
- Download from: https://nodejs.org/
- Recommended version: v18.x or higher
- Verify installation:
```bash
node --version
npm --version
```

#### Install MongoDB
**Option 1: Local Installation**
- Download from: https://www.mongodb.com/try/download/community
- Install and start MongoDB service

**Option 2: MongoDB Atlas (Cloud)**
- Create free account at: https://www.mongodb.com/cloud/atlas
- Create a cluster
- Get connection string

### Step 2: Clone/Download Project
```bash
cd Desktop
cd makemydestiny
```

### Step 3: Backend Setup

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Create .env file (already created, but verify)
# Update MONGO_URI if using MongoDB Atlas
```

**Environment Variables (.env):**
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/travel-booking
# For MongoDB Atlas use:
# MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/travel-booking

JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d
NODE_ENV=development
```

### Step 4: Frontend Setup

```bash
# Open new terminal
cd frontend

# Install dependencies
npm install
```

---

## 🗄️ Database Setup

### Seed Database with Sample Data

```bash
# In backend directory
node seeder.js
```

This will:
- Clear existing data
- Add 20+ tourist destinations (including Jharkhand)
- Create admin user (admin@makemydestiny.com / admin123)
- Create test user (user@test.com / user123)

### To Clear Database
```bash
node seeder.js -d
```

---

## ▶️ Running the Application

### Start Backend Server

```bash
# In backend directory
npm run dev
```

Server will start on: `http://localhost:5000`

You should see:
```
MongoDB Connected: localhost
Server running in development mode on port 5000
```

### Start Frontend Application

```bash
# In frontend directory (new terminal)
npm start
```

Application will open at: `http://localhost:3000`

---

## 🧪 Testing

### Test Backend API

**Using Browser/Postman:**

1. **Get All Trips:**
   - GET: `http://localhost:5000/api/trips`

2. **Register User:**
   - POST: `http://localhost:5000/api/auth/register`
   - Body:
   ```json
   {
     "name": "Test User",
     "email": "test@example.com",
     "password": "test123",
     "phone": "9876543210"
   }
   ```

3. **Login:**
   - POST: `http://localhost:5000/api/auth/login`
   - Body:
   ```json
   {
     "email": "admin@makemydestiny.com",
     "password": "admin123"
   }
   ```

### Test Frontend Features

1. **User Flow:**
   - Register new account
   - Browse trips
   - Filter by state/category
   - View trip details
   - Book a trip
   - View bookings
   - Cancel booking
   - Chat with AI bot

2. **Admin Flow:**
   - Login as admin
   - View dashboard statistics
   - Manage trips
   - View all bookings
   - Check reports

---

## 🌐 Deployment

### Backend Deployment (Render/Railway)

#### Using Render:

1. Create account at https://render.com
2. Create new Web Service
3. Connect GitHub repository
4. Configure:
   - Build Command: `npm install`
   - Start Command: `node server.js`
5. Add Environment Variables:
   ```
   MONGO_URI=your_mongodb_atlas_uri
   JWT_SECRET=your_secret_key
   NODE_ENV=production
   ```

#### Using Railway:

1. Create account at https://railway.app
2. New Project → Deploy from GitHub
3. Add MongoDB plugin
4. Add environment variables
5. Deploy

### Frontend Deployment (Vercel)

1. Create account at https://vercel.com
2. Import project from GitHub
3. Configure:
   - Framework: Create React App
   - Build Command: `npm run build`
   - Output Directory: `build`
4. Update API URLs in frontend code to production backend URL
5. Deploy

### Update API URLs for Production

In `frontend/src/services/*.js`, update:
```javascript
const API_URL = 'https://your-backend-url.com/api';
```

---

## 🔧 Troubleshooting

### Common Issues

#### 1. MongoDB Connection Error
**Error:** `MongooseServerSelectionError`

**Solution:**
- Check if MongoDB is running
- Verify MONGO_URI in .env
- For Atlas: Check IP whitelist and credentials

#### 2. Port Already in Use
**Error:** `Port 5000 is already in use`

**Solution:**
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Change port in .env
PORT=5001
```

#### 3. CORS Error
**Error:** `Access-Control-Allow-Origin`

**Solution:**
- Backend already has CORS enabled
- Check if backend is running
- Verify API URLs in frontend

#### 4. JWT Token Issues
**Error:** `Not authorized to access this route`

**Solution:**
- Clear browser localStorage
- Login again
- Check JWT_SECRET in .env

#### 5. Module Not Found
**Error:** `Cannot find module`

**Solution:**
```bash
# Delete node_modules and reinstall
rm -rf node_modules
npm install
```

### Performance Tips

1. **Database Indexing:**
```javascript
// Add indexes in models
tripSchema.index({ state: 1, category: 1 });
```

2. **Enable Compression:**
```bash
npm install compression
```

3. **Use Production Build:**
```bash
npm run build
```

---

## 📊 Project Statistics

- **Total Files:** 40+
- **Lines of Code:** 3000+
- **API Endpoints:** 20+
- **React Components:** 15+
- **Tourist Destinations:** 20+
- **States Covered:** 15+

---

## 🎯 Key Features Checklist

### User Features
- [x] User Registration & Login
- [x] Browse & Search Trips
- [x] Filter by State/Category/Price
- [x] View Trip Details
- [x] Book Trips
- [x] Multiple Travellers Support
- [x] View Booking History
- [x] Update Bookings
- [x] Cancel Bookings
- [x] AI Chatbot Support

### Admin Features
- [x] Admin Dashboard
- [x] View Statistics
- [x] Manage Trips (CRUD)
- [x] View All Bookings
- [x] User Management
- [x] Revenue Reports
- [x] Monthly Analytics

### Security Features
- [x] Password Hashing (bcrypt)
- [x] JWT Authentication
- [x] Role-Based Access Control
- [x] Protected Routes
- [x] Input Validation
- [x] Error Handling

### Technical Features
- [x] RESTful API
- [x] MongoDB Integration
- [x] React Context API
- [x] Responsive Design
- [x] Real-time Validation
- [x] Toast Notifications

---

## 📞 Support & Contact

For any issues or questions:
- Check documentation
- Review error logs
- Test API endpoints
- Verify environment variables

---

## 🎉 Success Indicators

Your setup is successful when:
- ✅ Backend server starts without errors
- ✅ MongoDB connection is established
- ✅ Frontend loads at localhost:3000
- ✅ You can see trips on homepage
- ✅ Login/Register works
- ✅ Chatbot responds
- ✅ Bookings can be created

---

**Happy Coding! 🚀**
