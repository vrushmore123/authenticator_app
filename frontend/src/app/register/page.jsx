'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import api from '@/lib/api';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, Phone, Lock, ArrowRight, Loader2, ArrowLeft, Smartphone } from 'lucide-react';

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
      localStorage.setItem('verify_identifier', formData.otpMethod === 'email' ? formData.email : formData.phoneNumber);
      router.push('/verify');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 flex justify-center"
      >
        <Link href="/" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="auth-card max-w-lg"
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-black mb-3 text-white tracking-tight">Create Account</h2>
          <p className="text-slate-400">Join our premium security platform</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300 ml-1">Full Name</label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-purple-400 transition-colors z-10" />
                <input
                  type="text"
                  name="name"
                  placeholder="John Doe"
                  className="pl-14 pr-4"
                  required
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300 ml-1">Phone Number</label>
              <div className="relative group">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-purple-400 transition-colors z-10" />
                <input
                  type="tel"
                  name="phoneNumber"
                  placeholder="+1 (555) 000-0000"
                  className="pl-14 pr-4"
                  required
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300 ml-1">Email Address</label>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-purple-400 transition-colors z-10" />
              <input
                type="email"
                name="email"
                placeholder="name@example.com"
                className="pl-14 pr-4"
                required
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300 ml-1">Password</label>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-purple-400 transition-colors z-10" />
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                className="pl-14 pr-4"
                required
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <label className="text-sm font-medium text-slate-300 ml-1">Verification Method</label>
            <div className="grid grid-cols-2 gap-4">
              <label className={`
                flex items-center justify-center gap-2 p-3 rounded-xl border cursor-pointer transition-all
                ${formData.otpMethod === 'email' ? 'bg-purple-500/20 border-purple-500/50 text-white' : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10'}
              `}>
                <input
                  type="radio"
                  name="otpMethod"
                  value="email"
                  className="hidden"
                  onChange={handleChange}
                />
                <Mail className="w-4 h-4" />
                <span>Email</span>
              </label>
              <label className={`
                flex items-center justify-center gap-2 p-3 rounded-xl border cursor-pointer transition-all
                ${formData.otpMethod === 'sms' ? 'bg-fuchsia-500/20 border-fuchsia-500/50 text-white' : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10'}
              `}>
                <input
                  type="radio"
                  name="otpMethod"
                  value="sms"
                  className="hidden"
                  onChange={handleChange}
                />
                <Smartphone className="w-4 h-4" />
                <span>SMS</span>
              </label>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full mt-6"
          >
            <AnimatePresence mode="wait">
              {loading ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2"
                >
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Creating Account...</span>
                </motion.div>
              ) : (
                <motion.div
                  key="submit"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2"
                >
                  <span>Create Account</span>
                  <ArrowRight className="w-5 h-5" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </form>

        <div className="mt-8 pt-8 border-t border-white/5 text-center">
          <p className="text-slate-400 text-sm">
            Already have an account?{' '}
            <Link href="/login" className="text-white font-bold hover:text-purple-400 transition-colors">
              Sign In
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
