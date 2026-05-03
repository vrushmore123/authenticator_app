'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { ShieldCheck, RefreshCw } from 'lucide-react';

export default function Verify() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const [otp, setOtp] = useState('');
  const [identifier, setIdentifier] = useState('');

  useEffect(() => {
    const stored = localStorage.getItem('verify_identifier');
    if (!stored) {
      router.push('/register');
    } else {
      setIdentifier(stored);
    }
  }, [router]);

  useEffect(() => {
    if (cooldown > 0) {
      const timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [cooldown]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (otp.length !== 6) return toast.error('Enter 6-digit OTP');

    setLoading(true);
    try {
      const res = await api.post('/auth/verify-otp', { identifier, otp });
      toast.success(res.data.message);
      localStorage.setItem('token', res.data.token);
      localStorage.removeItem('verify_identifier');
      router.push('/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Verification failed');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (cooldown > 0) return;
    setResending(true);
    try {
      const res = await api.post('/auth/resend-otp', { identifier });
      toast.success(res.data.message);
      setCooldown(30);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Resend failed');
    } finally {
      setResending(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="auth-card text-center"
    >
      <div className="flex justify-center mb-4">
        <div className="p-4 bg-white/20 rounded-full">
          <ShieldCheck className="w-12 h-12 text-white" />
        </div>
      </div>
      <h2 className="text-3xl font-bold mb-2">Verify OTP</h2>
      <p className="text-white/70 mb-8">
        Enter the 6-digit code sent to <br />
        <span className="text-white font-semibold">{identifier}</span>
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <input
          type="text"
          maxLength={6}
          placeholder="0 0 0 0 0 0"
          className="text-center text-2xl tracking-[1em] font-bold"
          value={otp}
          onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="btn-primary"
        >
          {loading ? 'Verifying...' : 'Verify Account'}
        </button>
      </form>

      <div className="mt-8">
        <button
          onClick={handleResend}
          disabled={resending || cooldown > 0}
          className="flex items-center gap-2 mx-auto text-white/80 hover:text-white disabled:opacity-50 transition-all"
        >
          <RefreshCw className={`w-4 h-4 ${resending ? 'animate-spin' : ''}`} />
          {cooldown > 0 ? `Resend OTP in ${cooldown}s` : 'Resend OTP'}
        </button>
      </div>
    </motion.div>
  );
}
