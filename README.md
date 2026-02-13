# 🌍 MakeMyDestiny - Online Travel Booking & Reservation System

A full-stack MERN application for booking and managing travel reservations across India, with special focus on Jharkhand tourist destinations.

**Live Website**: https://make-my-destiny-qj9v.vercel.app/

## ✨ Latest Updates (v2.0)

🎨 **Professional UI Redesign** - Modern, sleek interface with enhanced user experience
📧 **Email Verification** - JWT-based secure email verification system
🔒 **Enhanced Security** - Crypto-based token generation with 24-hour expiration
⚡ **Better UX** - Loading states, smooth animations, and professional feedback

> See [UPGRADE_GUIDE.md](UPGRADE_GUIDE.md) for detailed changes and [BEFORE_AFTER.md](BEFORE_AFTER.md) for visual comparison.

## 🚀 Project Overview

**MakeMyDestiny** is a comprehensive travel booking platform that enables users to discover, book, and manage travel reservations securely. The system features role-based access control, real-time booking validation, email verification, and an AI-powered chatbot for customer support.

## 🎯 Key Features

### 👤 User Features
- ✅ User Registration with Email Verification
- 🔐 Secure Login with JWT Authentication
- 🔍 Search and filter trips by state, category, and price
- 📅 Book trips with multiple travellers
- ✏️ Update booking details
- ❌ Cancel bookings with automatic refund processing
- 📜 View complete booking history
- 🤖 AI Chatbot assistance for queries

### 🛠️ Admin Features
- 📊 Comprehensive dashboard with statistics
- ➕ Add, update, and delete trips
- 👥 View and manage all bookings
- 📈 View reports (daily/monthly bookings)
- 💰 Revenue tracking
- 👤 User management

### 🔐 Security Features
- Password hashing using bcrypt
- JWT token-based authentication
- Email verification with secure tokens
- Crypto-based token generation
- 24-hour token expiration
- Role-based authorization (User/Admin)
- Input validation and sanitization
- Protected API routes
- Secure session management

### 🤖 AI Integration
- Rule-based chatbot with intent detection
- FAQ assistance
- Booking help and guidance
- Cancellation support
- 24/7 availability

## 🏗️ Tech Stack

### Frontend
- **React.js** - UI Library
- **React Router** - Navigation
- **Context API** - State Management
- **Axios** - HTTP Client
- **React Toastify** - Notifications
- **CSS3** - Styling

### Backend
- **Node.js** - Runtime Environment
- **Express.js** - Web Framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password Hashing

## 📁 Project Structure

```
makemydestiny/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── tripController.js
│   │   ├── bookingController.js
│   │   ├── chatbotController.js
│   │   └── userController.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Trip.js
│   │   └── Booking.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── tripRoutes.js
│   │   ├── bookingRoutes.js
│   │   ├── chatbotRoutes.js
│   │   └── userRoutes.js
│   ├── middleware/
│   │   ├── auth.js
│   │   └── error.js
│   ├── data/
│   │   └── trips.js
│   ├── .env
│   ├── server.js
│   ├── seeder.js
│   └── package.json
│
└── frontend/
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── components/
    │   │   └── common/
    │   │       ├── Navbar.js
    │   │       ├── Navbar.css
    │   │       ├── Chatbot.js
    │   │       └── Chatbot.css
    │   ├── pages/
    │   │   ├── Home.js
    │   │   ├── Home.css
    │   │   ├── Login.js
    │   │   ├── Register.js
    │   │   ├── VerifyEmail.js
    │   │   ├── Auth.css
    │   │   ├── Trips.js
    │   │   ├── Trips.css
    │   │   ├── TripDetail.js
    │   │   ├── TripDetail.css
    │   │   ├── MyBookings.js
    │   │   ├── MyBookings.css
    │   │   ├── AdminDashboard.js
    │   │   └── AdminDashboard.css
    │   ├── services/
    │   │   ├── tripService.js
    │   │   ├── bookingService.js
    │   │   └── chatbotService.js
    │   ├── context/
    │   │   └── AuthContext.js
    │   ├── App.js
    │   ├── App.css
    │   ├── index.js
    │   └── index.css
    └── package.json
```

## 🗄️ Database Schema

### User Schema
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  phone: String,
  role: "user" | "admin",
  isEmailVerified: Boolean,
  emailVerificationToken: String,
  emailVerificationExpire: Date,
  createdAt: Date
}
```

### Trip Schema
```javascript
{
  destination: String,
  state: String,
  description: String,
  price: Number,
  duration: String,
  availableSeats: Number,
  totalSeats: Number,
  startDate: Date,
  endDate: Date,
  image: String,
  highlights: [String],
  category: String,
  isActive: Boolean,
  createdAt: Date
}
```

### Booking Schema
```javascript
{
  user: ObjectId (ref: User),
  trip: ObjectId (ref: Trip),
  seatsBooked: Number,
  totalAmount: Number,
  status: "booked" | "cancelled" | "completed",
  bookingDate: Date,
  travellerDetails: [{
    name: String,
    age: Number,
    gender: String
  }],
  paymentStatus: String
}
```

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/travel-booking
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d
NODE_ENV=development
```

4. Seed the database with sample data:
```bash
node seeder.js
```

5. Start the backend server:
```bash
npm run dev
```

Backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the React app:
```bash
npm start
```

Frontend will run on `http://localhost:3000`

## 🌐 Live Demo

**Frontend**: https://make-my-destiny-qj9v.vercel.app/  
**Backend API**: https://makemydestiny.onrender.com  
**Database**: MongoDB Atlas

**Note**: First API request may take 50+ seconds due to Render's free tier cold start.

## 📚 Documentation

- **[QUICK_START.md](QUICK_START.md)** - Quick setup and testing guide
- **[UPGRADE_GUIDE.md](UPGRADE_GUIDE.md)** - Comprehensive upgrade documentation
- **[BEFORE_AFTER.md](BEFORE_AFTER.md)** - Visual comparison of changes
- **[INSTALLATION.md](INSTALLATION.md)** - Detailed installation instructions

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/verify-email/:token` - Verify email address
- `GET /api/auth/me` - Get current user (Protected)

### Trips
- `GET /api/trips` - Get all trips (with filters)
- `GET /api/trips/:id` - Get single trip
- `POST /api/trips` - Create trip (Admin only)
- `PUT /api/trips/:id` - Update trip (Admin only)
- `DELETE /api/trips/:id` - Delete trip (Admin only)

### Bookings
- `POST /api/bookings` - Create booking (Protected)
- `GET /api/bookings/user` - Get user bookings (Protected)
- `GET /api/bookings` - Get all bookings (Admin only)
- `GET /api/bookings/:id` - Get single booking (Protected)
- `PUT /api/bookings/:id` - Update booking (Protected)
- `PUT /api/bookings/:id/cancel` - Cancel booking (Protected)
- `GET /api/bookings/stats/report` - Get booking statistics (Admin only)

### Chatbot
- `POST /api/chatbot` - Send message to chatbot
- `GET /api/chatbot/faqs` - Get FAQs

### Users (Admin Only)
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get single user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

## 🏔️ Featured Destinations

### Jharkhand
- Netarhat - Queen of Chotanagpur
- Baidyanath Dham, Deoghar
- Betla National Park
- Hundru Falls & Ranchi
- Parasnath Hills
- Jonha Falls

### Other Popular Destinations
- Manali, Himachal Pradesh
- Golden Triangle (Delhi, Agra, Jaipur)
- Varanasi, Uttar Pradesh
- Kerala Backwaters
- Goa Beaches
- Darjeeling, West Bengal
- Udaipur, Rajasthan
- Meghalaya
- And many more...

## 🎨 Features Showcase

### Real-time Validation
- Seat availability checking
- Booking conflict prevention
- Input validation on both client and server

### Responsive Design
- Mobile-friendly interface
- Adaptive layouts
- Touch-optimized controls

### User Experience
- Intuitive navigation
- Loading states
- Error handling
- Success notifications
- Smooth animations

## 🔮 Future Enhancements

- [x] Email verification system
- [x] Professional UI redesign
- [x] Loading states and animations
- [ ] Email service integration (SendGrid/AWS SES)
- [ ] Password reset functionality
- [ ] Resend verification email
- [ ] Payment gateway integration (Razorpay/Stripe)
- [ ] Email notifications for bookings
- [ ] SMS alerts
- [ ] Advanced AI chatbot with NLP
- [ ] Trip recommendations based on user preferences
- [ ] Review and rating system
- [ ] Image upload for trips
- [ ] Multi-language support
- [ ] Social media integration
- [ ] Mobile app (React Native)
- [ ] Two-factor authentication

## 📝 Best Practices Implemented

- Clean code architecture
- Modular component structure
- Reusable components
- Error handling middleware
- Input validation
- Security best practices
- RESTful API design
- Proper HTTP status codes
- Consistent naming conventions
- Code comments where necessary

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the ISC License.

## 👨‍💻 Developer

Created with ❤️ for travel enthusiasts

## 📞 Support

For support, email support@makemydestiny.com or use the AI chatbot in the application.

---

**Happy Traveling! 🌍✈️**
#   - M a k e M y D e s t i n y 
 
 