'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Shield, Lock, Smartphone, Mail, ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <div className="text-center text-white max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="inline-block p-3 bg-white/10 rounded-2xl mb-6 backdrop-blur-sm border border-white/20">
          <Shield className="w-12 h-12 text-blue-300" />
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight">
          Secure <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300">Authentication</span>
        </h1>
        <p className="text-xl md:text-2xl text-white/70 mb-10 max-w-2xl mx-auto leading-relaxed">
          The ultimate full-stack solution for modern web apps. 
          Featuring JWT, Email & SMS OTP, and a premium user experience.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-20">
          <Link href="/register" className="px-8 py-4 bg-white text-purple-700 font-bold rounded-2xl hover:bg-white/90 transition-all flex items-center justify-center gap-2 text-lg shadow-xl hover:scale-105 active:scale-95">
            Get Started <ArrowRight className="w-5 h-5" />
          </Link>
          <Link href="/login" className="px-8 py-4 bg-white/10 border border-white/20 text-white font-bold rounded-2xl hover:bg-white/20 transition-all text-lg backdrop-blur-md shadow-xl hover:scale-105 active:scale-95">
            Login
          </Link>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 1 }}
        className="grid md:grid-cols-3 gap-8 text-left"
      >
        <div className="glass p-6 rounded-2xl">
          <Lock className="w-8 h-8 mb-4 text-blue-300" />
          <h3 className="text-xl font-bold mb-2">JWT Security</h3>
          <p className="text-white/60">Stateless authentication with secure JSON Web Tokens for cross-domain safety.</p>
        </div>
        <div className="glass p-6 rounded-2xl">
          <Mail className="w-8 h-8 mb-4 text-purple-300" />
          <h3 className="text-xl font-bold mb-2">Email OTP</h3>
          <p className="text-white/60">Verified registration via Nodemailer and Gmail SMTP integration.</p>
        </div>
        <div className="glass p-6 rounded-2xl">
          <Smartphone className="w-8 h-8 mb-4 text-green-300" />
          <h3 className="text-xl font-bold mb-2">SMS OTP</h3>
          <p className="text-white/60">Twilio integration for mobile-first security and instant verification.</p>
        </div>
      </motion.div>
    </div>
  );
}
