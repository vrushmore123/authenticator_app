const User = require('../models/User');
const jwt = require('jsonwebtoken');
const sendEmail = require('../utils/sendEmail');
const sendSMS = require('../utils/sendSMS');
const crypto = require('crypto');

// Generate 6-digit OTP
const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });
};

exports.register = async (req, res) => {
    try {
        const { name, email, phoneNumber, password, otpMethod } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ $or: [{ email }, { phoneNumber }] });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists with this email or phone number' });
        }

        const otpCode = generateOTP();
        const otpExpiry = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

        const user = await User.create({
            name,
            email,
            phoneNumber,
            password,
            otp: {
                code: otpCode,
                expiry: otpExpiry,
                method: otpMethod,
                attempts: 0
            }
        });

        // Send OTP
        if (otpMethod === 'email') {
            await sendEmail({
                email: user.email,
                subject: 'Your OTP Code',
                html: `<h1>Your OTP is ${otpCode}</h1><p>It will expire in 5 minutes.</p>`
            });
        } else {
            await sendSMS({
                phoneNumber: user.phoneNumber,
                message: `Your OTP is ${otpCode}. It will expire in 5 minutes.`
            });
        }

        res.status(201).json({
            message: 'User registered. Please verify OTP sent to your ' + otpMethod,
            userId: user._id
        });
    } catch (error) {
        console.error('Registration Error:', error);
        res.status(500).json({ message: error.message });
    }
};

exports.verifyOTP = async (req, res) => {
    try {
        const { identifier, otp } = req.body; // identifier can be email or phone

        const user = await User.findOne({
            $or: [{ email: identifier }, { phoneNumber: identifier }]
        });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.isVerified) {
            return res.status(400).json({ message: 'User already verified' });
        }

        // Brute force protection
        if (user.otp.attempts >= 5) {
            return res.status(400).json({ message: 'Max attempts reached. Please resend OTP.' });
        }

        // Check expiry
        if (user.otp.expiry < Date.now()) {
            return res.status(400).json({ message: 'OTP expired' });
        }

        // Check OTP
        if (user.otp.code !== otp) {
            user.otp.attempts += 1;
            await user.save();
            return res.status(400).json({ message: 'Invalid OTP' });
        }

        // Success
        user.isVerified = true;
        user.otp.code = undefined;
        user.otp.expiry = undefined;
        user.otp.attempts = 0;
        await user.save();

        const token = signToken(user._id);

        res.status(200).json({
            message: 'OTP verified successfully',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        console.error('Verify OTP Error:', error);
        res.status(500).json({ message: error.message });
    }
};

exports.resendOTP = async (req, res) => {
    try {
        const { identifier } = req.body;

        const user = await User.findOne({
            $or: [{ email: identifier }, { phoneNumber: identifier }]
        });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Cooldown check (optional but good practice)
        // For simplicity, we just generate a new one
        const otpCode = generateOTP();
        const otpExpiry = new Date(Date.now() + 5 * 60 * 1000);

        user.otp.code = otpCode;
        user.otp.expiry = otpExpiry;
        user.otp.attempts = 0;
        await user.save();

        if (user.otp.method === 'email') {
            await sendEmail({
                email: user.email,
                subject: 'Your New OTP Code',
                html: `<h1>Your New OTP is ${otpCode}</h1><p>It will expire in 5 minutes.</p>`
            });
        } else {
            await sendSMS({
                phoneNumber: user.phoneNumber,
                message: `Your New OTP is ${otpCode}. It will expire in 5 minutes.`
            });
        }

        res.status(200).json({ message: 'OTP resent successfully' });
    } catch (error) {
        console.error('Resend OTP Error:', error);
        res.status(500).json({ message: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        if (!user.isVerified) {
            return res.status(401).json({ message: 'Account not verified. Please verify your OTP.' });
        }

        const token = signToken(user._id);

        res.status(200).json({
            message: 'Login successful',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        console.error('Login Error:', error);
        res.status(500).json({ message: error.message });
    }
};

exports.getMe = async (req, res) => {
    res.status(200).json({
        user: req.user
    });
};
