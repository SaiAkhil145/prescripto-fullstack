# Prescripto - Doctor Appointment Booking Platform

A comprehensive full-stack healthcare appointment management system built with the MERN stack, enabling patients to book appointments with doctors online and providing administrators with tools to manage the entire booking process.

🔗 **Live Demo**: [prescripto-fullstack-murex.vercel.app](https://prescripto-fullstack-murex.vercel.app)

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Payment Integration](#payment-integration)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)

## 🎯 Overview

Prescripto is a modern healthcare appointment booking platform that connects patients with doctors, streamlining the appointment scheduling process. The platform offers an intuitive user interface for patients to find and book appointments with healthcare professionals, while providing doctors and administrators with comprehensive tools to manage their practice.

## ✨ Features

### Patient Features
- 🔍 Search and filter doctors by specialty, location, and availability
- 📅 View doctor profiles with detailed information and availability
- 🕐 Real-time appointment slot booking
- 👤 User registration and authentication
- 📱 Responsive design for all devices
- 💳 Secure online payment integration
- 📝 Medical history management
- 📊 View appointment history

### Doctor Features
- 📅 Manage appointment schedules and availability
- 👥 View patient appointments and details
- ✅ Accept or reject appointment requests
- 💼 Update profile and specialization information
- 📈 Dashboard with appointment analytics
- 🕒 Set working hours and time slots

### Admin Features
- 📊 Comprehensive admin dashboard
- 👨‍⚕️ Doctor management (add, edit, remove)
- 👥 User management and oversight
- 📈 Analytics and reporting
- 💰 Payment and transaction management
- 📅 Appointment overview and management
- 🏥 Specialty and department management
- 📧 Communication tools

### Backend Features
- 🔐 JWT-based authentication and authorization
- 🗄️ RESTful API architecture
- 💾 MongoDB database with Mongoose ODM
- 🔒 Secure password hashing with bcrypt
- ☁️ Cloudinary integration for image storage
- 💳 Payment gateway integration (Razorpay)
- 🛡️ Input validation and error handling
- 🚀 Optimized performance with caching

## 🛠️ Tech Stack

### Frontend (Client)
- **React** - UI library for building user interfaces
- **Tailwind CSS** - Utility-first CSS framework
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client for API requests
- **React Toastify** - Toast notifications
- **React Icons** - Icon library
- **Date-fns** - Date manipulation library

### Admin Panel
- **React** - Admin interface
- **Tailwind CSS** - Consistent styling
- **React Table** - Table management

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - Authentication tokens
- **Bcrypt.js** - Password hashing
- **Multer** - File upload handling
- **Cloudinary** - Cloud-based image management
- **Stripe/Razorpay** - Payment processing
- **Validator** - Input validation

### Deployment & Tools
- **Vercel** - Frontend deployment
- **MongoDB Atlas** - Database hosting
- **Cloudinary** - Media storage
- **Git** - Version control

## 📁 Project Structure

```
prescripto-fullstack/
│
├── client/                    # Patient-facing frontend
│   ├── public/
│   ├── src/
│   │   ├── assets/           # Images, icons
│   │   ├── components/       # Reusable components
│   │   │   ├── Header.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── DoctorCard.jsx
│   │   │   └── Banner.jsx
│   │   ├── pages/            # Page components
│   │   │   ├── Home.jsx
│   │   │   ├── Doctors.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── About.jsx
│   │   │   ├── Contact.jsx
│   │   │   ├── MyProfile.jsx
│   │   │   ├── MyAppointments.jsx
│   │   │   └── Appointment.jsx
│   │   ├── context/          # Context API
│   │   │   └── AppContext.jsx
│   │   ├── utils/            # Utility functions
│   │   └── App.jsx
│   └── package.json
│
├── admin/                     # Admin dashboard
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/       # Admin components
│   │   │   ├── Navbar.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   └── DoctorList.jsx
│   │   ├── pages/            # Admin pages
│   │   │   ├── Dashboard.jsx
│   │   │   ├── AddDoctor.jsx
│   │   │   ├── DoctorsList.jsx
│   │   │   ├── Appointments.jsx
│   │   │   └── Settings.jsx
│   │   ├── context/
│   │   └── App.jsx
│   └── package.json
│
├── backend/                   # Backend API
│   ├── config/
│   │   ├── db.js             # Database connection
│   │   ├── cloudinary.js     # Cloudinary config
│   │   └── email.js          # Email config
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── userController.js
│   │   ├── doctorController.js
│   │   ├── appointmentController.js
│   │   └── adminController.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Doctor.js
│   │   ├── Appointment.js
│   │   └── Admin.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── userRoutes.js
│   │   ├── doctorRoutes.js
│   │   ├── appointmentRoutes.js
│   │   └── adminRoutes.js
│   ├── middleware/
│   │   ├── auth.js           # Authentication middleware
│   │   ├── upload.js         # File upload middleware
│   └── server.js             # Entry point
│
└── README.md
```

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:
- **Node.js** (v14 or higher)
- **npm** or **yarn**
- **MongoDB** (local or Atlas account)
- **Cloudinary account** (for image uploads)
- **Payment gateway account** (Stripe or Razorpay)

## 🔐 Environment Variables

Create `.env` files in the respective directories:

### Backend (.env)
```env
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=your_mongodb_connection_string

# JWT
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=7d

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_secret_key

# Email Service (Gmail/SendGrid/etc.)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_email_password
EMAIL_FROM=noreply@prescripto.com

# Payment Gateway (Stripe)
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key

# Or Razorpay
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_secret

# Admin Credentials
ADMIN_EMAIL=admin@prescripto.com
ADMIN_PASSWORD=your_secure_admin_password

# Frontend URL (for CORS)
CLIENT_URL=http://localhost:3000
ADMIN_URL=http://localhost:3001
```

### Client (.env)
```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
```

### Admin (.env)
```env
REACT_APP_API_URL=http://localhost:5000/api
```

## 📥 Installation

1. **Clone the repository**
```bash
git clone https://github.com/SaiAkhil145/prescripto-fullstack.git
cd prescripto-fullstack
```

2. **Install Backend Dependencies**
```bash
cd backend
npm install
```

3. **Install Client Dependencies**
```bash
cd ../client
npm install
```

4. **Install Admin Dependencies**
```bash
cd ../admin
npm install
```

## ▶️ Running the Application

### Development Mode

1. **Start the Backend Server**
```bash
cd backend
npm run dev
# Server runs on http://localhost:5000
```

2. **Start the Client Application**
```bash
cd client
npm start
# Client runs on http://localhost:3000
```

3. **Start the Admin Panel**
```bash
cd admin
npm start
# Admin panel runs on http://localhost:3001
```

### Production Build

1. **Build the Client**
```bash
cd client
npm run build
```

2. **Build the Admin Panel**
```bash
cd admin
npm run build
```

3. **Start the Backend in Production**
```bash
cd backend
npm start
```

## 📡 API Documentation

### Authentication Endpoints

#### User Authentication
- `POST /api/auth/register` - Register new patient
- `POST /api/auth/login` - Patient login
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/profile` - Get user profile (Protected)

#### Doctor Authentication
- `POST /api/auth/doctor/login` - Doctor login
- `GET /api/auth/doctor/profile` - Get doctor profile (Protected)

#### Admin Authentication
- `POST /api/auth/admin/login` - Admin login

### User Endpoints
- `GET /api/users/profile` - Get user profile (Protected)
- `PUT /api/users/profile` - Update user profile (Protected)
- `GET /api/users/appointments` - Get user appointments (Protected)

### Doctor Endpoints
- `GET /api/doctors` - Get all doctors
- `GET /api/doctors/:id` - Get single doctor
- `GET /api/doctors/specialty/:specialty` - Get doctors by specialty
- `PUT /api/doctors/:id` - Update doctor profile (Protected - Doctor/Admin)
- `GET /api/doctors/:id/available-slots` - Get available time slots

### Appointment Endpoints
- `POST /api/appointments` - Book appointment (Protected)
- `GET /api/appointments` - Get all appointments (Admin)
- `GET /api/appointments/user/:userId` - Get user appointments (Protected)
- `GET /api/appointments/doctor/:doctorId` - Get doctor appointments (Protected)
- `PUT /api/appointments/:id/cancel` - Cancel appointment (Protected)
- `PUT /api/appointments/:id/complete` - Complete appointment (Doctor)
- `PUT /api/appointments/:id/status` - Update appointment status (Admin/Doctor)

### Admin Endpoints
- `POST /api/admin/doctors` - Add new doctor (Admin)
- `PUT /api/admin/doctors/:id` - Update doctor (Admin)
- `DELETE /api/admin/doctors/:id` - Delete doctor (Admin)
- `GET /api/admin/dashboard` - Get dashboard statistics (Admin)
- `GET /api/admin/appointments` - Get all appointments (Admin)
- `GET /api/admin/users` - Get all users (Admin)

### Payment Endpoints
- `POST /api/payments/create-checkout-session` - Create payment session
- `POST /api/payments/verify` - Verify payment
- `GET /api/payments/history` - Get payment history (Protected)

## 💳 Payment Integration

The platform supports multiple payment gateways:

### Stripe Integration
```javascript
// Client-side
const stripe = await loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

// Create checkout session
const session = await axios.post('/api/payments/create-checkout-session', {
  appointmentId,
  amount
});

// Redirect to Stripe checkout
await stripe.redirectToCheckout({
  sessionId: session.data.id
});
```

### Razorpay Integration
```javascript
// Client-side
const options = {
  key: RAZORPAY_KEY_ID,
  amount: amount * 100, // Amount in paise
  currency: "INR",
  name: "Prescripto",
  description: "Doctor Appointment Booking",
  handler: function (response) {
    // Verify payment
    verifyPayment(response);
  }
};

const rzp = new Razorpay(options);
rzp.open();
```

## 📸 Screenshots

*(Add screenshots here)*

- **Landing Page** - Homepage with doctor search
- **Doctor Listing** - Browse doctors by specialty
- **Doctor Profile** - Detailed doctor information
- **Appointment Booking** - Time slot selection
- **User Dashboard** - Appointment management
- **Admin Dashboard** - Analytics and management
- **Doctor Panel** - Appointment management for doctors

## 🎨 Key Features Explained

### Appointment Booking System
- Real-time availability checking
- Slot-based booking system
- Automatic conflict resolution
- Email/SMS notifications

### Doctor Management
- Comprehensive profile management
- Specialty categorization
- Availability calendar
- Rating and review system

### Payment Processing
- Secure payment gateway integration
- Multiple payment options
- Automatic receipt generation
- Refund management

### Admin Dashboard
- Real-time analytics
- Appointment tracking
- Revenue reports
- User management

## 🔒 Security Features

- JWT-based authentication
- Password encryption with bcrypt
- Input validation and sanitization
- CORS protection
- Rate limiting
- SQL injection prevention
- XSS protection

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Sai Akhil**
- GitHub: [@SaiAkhil145](https://github.com/SaiAkhil145)
- LinkedIn: [Your LinkedIn Profile]

## 🙏 Acknowledgments

- MongoDB for database solutions
- Cloudinary for image hosting
- Stripe/Razorpay for payment processing
- Vercel for deployment
- All healthcare professionals who inspired this project

## 📞 Support

For support and queries:
- Email: support@prescripto.com
- Create an issue in the GitHub repository

## 🗺️ Roadmap

- [ ] Video consultation integration
- [ ] AI-powered doctor recommendations
- [ ] Multi-language support
- [ ] Mobile app development (React Native)
- [ ] Integration with health insurance providers
- [ ] Prescription management system
- [ ] Medical records storage
- [ ] Telemedicine features

---

⭐ **If you find this project helpful, please give it a star!**

## 📄 Additional Information

### Database Schema

**User Model**
```javascript
{
  name: String,
  email: String,
  password: String,
  phone: String,
  address: Object,
  image: String,
  appointments: [ObjectId]
}
```

**Doctor Model**
```javascript
{
  name: String,
  email: String,
  password: String,
  specialty: String,
  degree: String,
  experience: Number,
  about: String,
  fees: Number,
  address: Object,
  slots_booked: Object,
  available: Boolean,
  image: String
}
```

**Appointment Model**
```javascript
{
  userId: ObjectId,
  doctorId: ObjectId,
  slotDate: String,
  slotTime: String,
  userData: Object,
  docData: Object,
  amount: Number,
  date: Date,
  cancelled: Boolean,
  payment: Boolean,
  isCompleted: Boolean
}
```
