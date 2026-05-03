'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import api from '@/lib/api';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { Mail, Lock, LogIn } from 'lucide-react';

export default function Login() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post('/auth/login', formData);
      toast.success(res.data.message);
      localStorage.setItem('token', res.data.token);
      router.push('/dashboard');
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed';
      toast.error(message);
      if (message.includes('not verified')) {
        localStorage.setItem('verify_identifier', formData.email);
        router.push('/verify');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="auth-card"
    >
      <h2 className="text-3xl font-bold mb-6 text-center">Welcome Back</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
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

        <button
          type="submit"
          disabled={loading}
          className="btn-primary flex items-center justify-center gap-2"
        >
          {loading ? 'Logging in...' : (
            <>
              Login <LogIn className="w-5 h-5" />
            </>
          )}
        </button>
      </form>

      <p className="mt-6 text-center text-white/70">
        Don't have an account?{' '}
        <Link href="/register" className="text-white font-bold hover:underline">
          Register
        </Link>
      </p>
    </motion.div>
  );
}
