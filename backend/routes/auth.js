const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const rateLimit = require('express-rate-limit');

const otpLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10, // limit each IP to 10 requests per windowMs
    message: 'Too many OTP requests from this IP, please try again after 15 minutes'
});

router.post('/register', authController.register);
router.post('/verify-otp', otpLimiter, authController.verifyOTP);
router.post('/resend-otp', otpLimiter, authController.resendOTP);
router.post('/login', authController.login);
router.get('/me', protect, authController.getMe);

module.exports = router;
