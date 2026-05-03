'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import api from '@/lib/api';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { User, Mail, Phone, Lock, ArrowRight } from 'lucide-react';

export default function Register() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    password: '',
    otpMethod: 'email',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post('/auth/register', formData);
      toast.success(res.data.message);
      // Store identifier for verification page
      localStorage.setItem('verify_identifier', formData.otpMethod === 'email' ? formData.email : formData.phoneNumber);
      router.push('/verify');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="auth-card"
    >
      <h2 className="text-3xl font-bold mb-6 text-center">Create Account</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <User className="absolute left-3 top-3 w-5 h-5 text-white/50" />
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            className="pl-10"
            required
            onChange={handleChange}
          />
        </div>
        <div className="relative">
          <Mail className="absolute left-3 top-3 w-5 h-5 text-white/50" />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            className="pl-10"
            required
            onChange={handleChange}
          />
        </div>
        <div className="relative">
          <Phone className="absolute left-3 top-3 w-5 h-5 text-white/50" />
          <input
            type="tel"
            name="phoneNumber"
            placeholder="Phone Number"
            className="pl-10"
            required
            onChange={handleChange}
          />
        </div>
        <div className="relative">
          <Lock className="absolute left-3 top-3 w-5 h-5 text-white/50" />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="pl-10"
            required
            onChange={handleChange}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">OTP Verification Method:</label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="otpMethod"
                value="email"
                checked={formData.otpMethod === 'email'}
                onChange={handleChange}
                className="w-4 h-4"
              />
              <span>Email</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="otpMethod"
                value="sms"
                checked={formData.otpMethod === 'sms'}
                onChange={handleChange}
                className="w-4 h-4"
              />
              <span>SMS</span>
            </label>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn-primary flex items-center justify-center gap-2"
        >
          {loading ? 'Creating account...' : (
            <>
              Register <ArrowRight className="w-5 h-5" />
            </>
          )}
        </button>
      </form>

      <p className="mt-6 text-center text-white/70">
        Already have an account?{' '}
        <Link href="/login" className="text-white font-bold hover:underline">
          Login
        </Link>
      </p>
    </motion.div>
  );
}
