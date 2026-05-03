# Full-Stack Authentication System with OTP

A modern, premium authentication system built with Next.js, Express, MongoDB, and Twilio/Nodemailer.

## ✨ Features

- **Next.js 15 (App Router)** with TypeScript & Tailwind CSS
- **Express.js** Backend with MongoDB/Mongoose
- **JWT-based Authentication** with secure token storage
- **Dual OTP Verification**:
  - Email OTP via Nodemailer (Gmail)
  - SMS OTP via Twilio
- **Security**:
  - Bcrypt password hashing
  - Rate limiting on OTP endpoints
  - Brute-force protection (5 attempts max)
  - CORS protection
- **UI/UX**:
  - Premium glassmorphism design
  - Gradient backgrounds
  - Smooth Framer Motion animations
  - Mobile responsive layout
  - Toast notifications

## 🚀 Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure `.env` file (already created with placeholders):
   - Add your `MONGO_URI`
   - Add `JWT_SECRET`
   - Add Gmail credentials for `EMAIL_USER` and `EMAIL_PASS` (Use App Passwords)
   - Add Twilio credentials (`TWILIO_SID`, `TWILIO_AUTH_TOKEN`, `TWILIO_PHONE`)
4. Start the server:
   ```bash
   npm run dev
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## 🛠 Tech Stack

- **Frontend**: Next.js, Tailwind CSS, Framer Motion, Axios, Lucide React, React Hot Toast
- **Backend**: Node.js, Express, Mongoose, JWT, Nodemailer, Twilio, Express Rate Limit
- **Database**: MongoDB

## 📝 Note

Ensure your MongoDB instance is running before starting the backend. If using Twilio, make sure your phone numbers are verified in the Twilio console if using a trial account.
