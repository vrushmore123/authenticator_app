const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const dns = require('dns');

dns.setServers(['1.1.1.1', '8.8.8.8']);
// Force IPv4 first to solve DNS SRV issues on Windows
if (dns.setDefaultResultOrder) {
    dns.setDefaultResultOrder('ipv4first');
}
const authRoutes = require('./routes/auth');

const path = require('path');
dotenv.config({ path: path.resolve(__dirname, '.env') });

const app = express();

// ✅ 1. CORS Configuration
const allowedOrigins = [
    "http://localhost:3000",
    "https://authenticator-app-indol.vercel.app",
    process.env.FRONTEND_URL
].filter(Boolean);

app.use(cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true
}));

console.log("Allowed Origins:", allowedOrigins);
console.log("MongoDB URI defined:", !!process.env.MONGO_URI);

// ✅ 2. Middleware
app.use(express.json());

// ✅ 3. Routes
app.use('/api/auth', authRoutes);

// ✅ 4. Database & Server Start
const PORT = process.env.PORT || 5000;
console.log(process.env.MONGO_URI, "mongouri");

if (!process.env.MONGO_URI) {
    console.error("❌ ERROR: MONGO_URI is not defined in .env");
    process.exit(1);
}

mongoose.connect(process.env.MONGO_URI, { family: 4 })
    .then(() => console.log("MongoDB connected ✅"))
    .catch(err => console.error("MongoDB connection failed ❌", err));
console.log("MongoDB URI:", process.env.MONGO_URI);

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});