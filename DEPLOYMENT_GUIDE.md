# 🚀 Production Deployment Guide

## 📋 Pre-Deployment Checklist

### ✅ Code Preparation
- [ ] All features tested locally
- [ ] Email service integrated
- [ ] Remove `verificationToken` from register response
- [ ] Update CORS settings for production URLs
- [ ] Environment variables configured
- [ ] Error logging implemented
- [ ] Database indexes created
- [ ] API rate limiting added (optional)

### ✅ Security Checklist
- [ ] Strong JWT_SECRET (32+ characters)
- [ ] HTTPS enabled
- [ ] Secure cookies configured
- [ ] Input validation on all endpoints
- [ ] SQL injection prevention
- [ ] XSS protection
- [ ] CSRF tokens (if needed)
- [ ] Rate limiting on auth endpoints

---

## 🔧 Environment Configuration

### Backend (.env)
```env
# Server
NODE_ENV=production
PORT=5000

# Database
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/makemydestiny?retryWrites=true&w=majority

# JWT
JWT_SECRET=your_super_secure_random_string_min_32_characters_long
JWT_EXPIRE=7d

# Frontend URL (for CORS)
FRONTEND_URL=https://your-app.vercel.app

# Email Service (Choose one)
# SendGrid
SENDGRID_API_KEY=SG.xxxxxxxxxxxxxxxxxxxxx

# OR AWS SES
AWS_ACCESS_KEY_ID=AKIAXXXXXXXXXXXXXXXX
AWS_SECRET_ACCESS_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
AWS_REGION=us-east-1

# OR SMTP
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

### Frontend (.env)
```env
REACT_APP_API_URL=https://your-backend.onrender.com
REACT_APP_ENV=production
```

---

## 📧 Email Service Integration

### Option 1: SendGrid (Recommended)

#### 1. Install Package
```bash
cd backend
npm install @sendgrid/mail
```

#### 2. Update authController.js
```javascript
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// In register function, after user creation:
const verificationUrl = `${process.env.FRONTEND_URL}/verify-email/${verificationToken}`;

const msg = {
  to: user.email,
  from: 'noreply@makemydestiny.com', // Use your verified sender
  subject: 'Verify Your Email - MakeMyDestiny',
  html: `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f8fafc; padding: 30px; border-radius: 0 0 10px 10px; }
        .button { display: inline-block; padding: 15px 30px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; text-decoration: none; border-radius: 8px; margin: 20px 0; }
        .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🌍 Welcome to MakeMyDestiny!</h1>
        </div>
        <div class="content">
          <h2>Hi ${user.name},</h2>
          <p>Thank you for registering with MakeMyDestiny! We're excited to help you plan your next adventure.</p>
          <p>Please verify your email address by clicking the button below:</p>
          <center>
            <a href="${verificationUrl}" class="button">Verify Email Address</a>
          </center>
          <p>Or copy and paste this link into your browser:</p>
          <p style="word-break: break-all; color: #667eea;">${verificationUrl}</p>
          <p><strong>This link will expire in 24 hours.</strong></p>
          <p>If you didn't create an account, please ignore this email.</p>
        </div>
        <div class="footer">
          <p>© 2024 MakeMyDestiny. All rights reserved.</p>
          <p>Happy Traveling! 🌍✈️</p>
        </div>
      </div>
    </body>
    </html>
  `
};

try {
  await sgMail.send(msg);
  console.log('Verification email sent to:', user.email);
} catch (error) {
  console.error('Email sending failed:', error);
  // Don't fail registration if email fails
}

// IMPORTANT: Remove verificationToken from response
res.status(201).json({
  success: true,
  token,
  message: 'Registration successful! Please check your email to verify your account.',
  user: {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    isEmailVerified: user.isEmailVerified
  }
  // verificationToken removed for production
});
```

#### 3. SendGrid Setup
1. Sign up at https://sendgrid.com
2. Verify your sender email
3. Create API key
4. Add to environment variables

---

### Option 2: AWS SES

#### 1. Install Package
```bash
npm install @aws-sdk/client-ses
```

#### 2. Update authController.js
```javascript
const { SESClient, SendEmailCommand } = require('@aws-sdk/client-ses');

const sesClient = new SESClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  }
});

// In register function:
const verificationUrl = `${process.env.FRONTEND_URL}/verify-email/${verificationToken}`;

const params = {
  Source: 'noreply@makemydestiny.com',
  Destination: {
    ToAddresses: [user.email]
  },
  Message: {
    Subject: {
      Data: 'Verify Your Email - MakeMyDestiny'
    },
    Body: {
      Html: {
        Data: `<!-- Same HTML as SendGrid -->`
      }
    }
  }
};

try {
  await sesClient.send(new SendEmailCommand(params));
  console.log('Verification email sent');
} catch (error) {
  console.error('Email sending failed:', error);
}
```

---

### Option 3: Nodemailer (SMTP)

#### 1. Install Package
```bash
npm install nodemailer
```

#### 2. Update authController.js
```javascript
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

// In register function:
const verificationUrl = `${process.env.FRONTEND_URL}/verify-email/${verificationToken}`;

const mailOptions = {
  from: '"MakeMyDestiny" <noreply@makemydestiny.com>',
  to: user.email,
  subject: 'Verify Your Email - MakeMyDestiny',
  html: `<!-- Same HTML as SendGrid -->`
};

try {
  await transporter.sendMail(mailOptions);
  console.log('Verification email sent');
} catch (error) {
  console.error('Email sending failed:', error);
}
```

---

## 🌐 Backend Deployment (Render)

### 1. Prepare Repository
```bash
git add .
git commit -m "Production ready with email verification"
git push origin main
```

### 2. Deploy to Render
1. Go to https://render.com
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name**: makemydestiny-api
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free

### 3. Add Environment Variables
In Render dashboard, add all variables from `.env`:
```
NODE_ENV=production
MONGO_URI=mongodb+srv://...
JWT_SECRET=...
FRONTEND_URL=https://your-app.vercel.app
SENDGRID_API_KEY=...
```

### 4. Deploy
- Click "Create Web Service"
- Wait for deployment (5-10 minutes)
- Note your backend URL: `https://makemydestiny-api.onrender.com`

---

## 🎨 Frontend Deployment (Vercel)

### 1. Update API URL
Create `.env.production`:
```env
REACT_APP_API_URL=https://makemydestiny-api.onrender.com
```

### 2. Build Test
```bash
cd frontend
npm run build
```

### 3. Deploy to Vercel
1. Go to https://vercel.com
2. Click "New Project"
3. Import your GitHub repository
4. Configure:
   - **Framework**: Create React App
   - **Root Directory**: frontend
   - **Build Command**: `npm run build`
   - **Output Directory**: build

### 4. Add Environment Variables
```
REACT_APP_API_URL=https://makemydestiny-api.onrender.com
```

### 5. Deploy
- Click "Deploy"
- Wait for deployment (2-5 minutes)
- Your app is live!

---

## 🔧 Post-Deployment Configuration

### 1. Update CORS in Backend
```javascript
// server.js
const cors = require('cors');

app.use(cors({
  origin: [
    'https://your-app.vercel.app',
    'http://localhost:3000' // For local development
  ],
  credentials: true
}));
```

### 2. Test Email Delivery
```bash
# Register a new user
curl -X POST https://makemydestiny-api.onrender.com/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "test123",
    "phone": "1234567890"
  }'

# Check your email for verification link
```

### 3. Monitor Logs
- **Render**: Dashboard → Logs
- **Vercel**: Dashboard → Deployments → View Function Logs

---

## 📊 Database Setup (MongoDB Atlas)

### 1. Create Cluster
1. Go to https://mongodb.com/cloud/atlas
2. Create free cluster
3. Create database user
4. Whitelist IP: `0.0.0.0/0` (all IPs)

### 2. Get Connection String
```
mongodb+srv://username:password@cluster.mongodb.net/makemydestiny?retryWrites=true&w=majority
```

### 3. Create Indexes (Optional)
```javascript
// In MongoDB Atlas or via code
db.users.createIndex({ email: 1 }, { unique: true });
db.users.createIndex({ emailVerificationToken: 1 });
db.trips.createIndex({ state: 1, category: 1 });
db.bookings.createIndex({ user: 1, status: 1 });
```

---

## 🧪 Production Testing

### 1. Registration Flow
```bash
# Test registration
curl -X POST https://your-api.com/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "secure123",
    "phone": "1234567890"
  }'

# Expected: Email sent, no token in response
```

### 2. Email Verification
- Check email inbox
- Click verification link
- Should redirect to login page

### 3. Login Flow
```bash
# Test login
curl -X POST https://your-api.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "secure123"
  }'

# Expected: JWT token and user data
```

### 4. Protected Routes
```bash
# Test protected route
curl -X GET https://your-api.com/api/auth/me \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"

# Expected: User data with isEmailVerified: true
```

---

## 📈 Monitoring & Analytics

### 1. Error Tracking
Consider adding:
- **Sentry**: Error tracking
- **LogRocket**: Session replay
- **New Relic**: Performance monitoring

### 2. Analytics
- **Google Analytics**: User behavior
- **Mixpanel**: Event tracking
- **Hotjar**: Heatmaps

### 3. Uptime Monitoring
- **UptimeRobot**: Free uptime monitoring
- **Pingdom**: Advanced monitoring
- **StatusCake**: Multi-location checks

---

## 🔒 Security Hardening

### 1. Rate Limiting
```bash
npm install express-rate-limit
```

```javascript
const rateLimit = require('express-rate-limit');

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 requests per window
  message: 'Too many attempts, please try again later'
});

app.use('/api/auth/login', authLimiter);
app.use('/api/auth/register', authLimiter);
```

### 2. Helmet.js
```bash
npm install helmet
```

```javascript
const helmet = require('helmet');
app.use(helmet());
```

### 3. Input Sanitization
```bash
npm install express-mongo-sanitize
```

```javascript
const mongoSanitize = require('express-mongo-sanitize');
app.use(mongoSanitize());
```

---

## 🎯 Performance Optimization

### 1. Enable Compression
```bash
npm install compression
```

```javascript
const compression = require('compression');
app.use(compression());
```

### 2. Cache Static Assets
```javascript
// In frontend build
// Vercel automatically handles this
```

### 3. Database Optimization
- Create indexes on frequently queried fields
- Use projection to limit returned fields
- Implement pagination for large datasets

---

## 📞 Support & Maintenance

### Daily Tasks
- [ ] Check error logs
- [ ] Monitor email delivery rate
- [ ] Check API response times

### Weekly Tasks
- [ ] Review user feedback
- [ ] Check verification completion rate
- [ ] Update dependencies
- [ ] Backup database

### Monthly Tasks
- [ ] Security audit
- [ ] Performance review
- [ ] Cost analysis
- [ ] Feature planning

---

## 🚨 Troubleshooting

### Issue: Emails not sending
**Check:**
- API keys are correct
- Sender email is verified
- Email service quota not exceeded
- Check spam folder

### Issue: CORS errors
**Solution:**
```javascript
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));
```

### Issue: Slow cold starts (Render)
**Solution:**
- Upgrade to paid plan
- Use cron job to ping server every 10 minutes
- Consider alternative hosting

### Issue: Database connection fails
**Check:**
- IP whitelist includes `0.0.0.0/0`
- Connection string is correct
- Database user has proper permissions

---

## ✅ Launch Checklist

### Pre-Launch
- [ ] All features tested
- [ ] Email service working
- [ ] SSL certificates active
- [ ] Environment variables set
- [ ] Database backed up
- [ ] Error tracking enabled
- [ ] Analytics configured

### Launch Day
- [ ] Deploy backend
- [ ] Deploy frontend
- [ ] Test all flows
- [ ] Monitor logs
- [ ] Check email delivery
- [ ] Test on mobile devices

### Post-Launch
- [ ] Monitor error rates
- [ ] Track user registrations
- [ ] Check email verification rates
- [ ] Gather user feedback
- [ ] Plan improvements

---

## 🎉 You're Ready to Launch!

Your **MakeMyDestiny** platform is now:
- ✅ Production-ready
- ✅ Secure and verified
- ✅ Professionally designed
- ✅ Fully documented
- ✅ Ready to scale

**Good luck with your launch! 🚀🌍✈️**

---

*For questions or issues, refer to the documentation or create an issue in the repository.*
