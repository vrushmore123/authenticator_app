'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, RefreshCw, Loader2, ArrowRight } from 'lucide-react';

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
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="auth-card text-center"
    >
      <motion.div 
        initial={{ y: -10 }}
        animate={{ y: 0 }}
        className="flex justify-center mb-6"
      >
        <div className="relative">
          <div className="absolute inset-0 bg-purple-500 blur-xl opacity-20"></div>
          <div className="relative p-5 bg-white/5 rounded-full border border-white/10">
            <ShieldCheck className="w-12 h-12 text-purple-400" />
          </div>
        </div>
      </motion.div>

      <h2 className="text-3xl font-black mb-3 text-white tracking-tight">Verify Identity</h2>
      <p className="text-slate-400 mb-8 leading-relaxed">
        We've sent a 6-digit verification code to<br />
        <span className="text-white font-semibold">{identifier}</span>
      </p>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="relative group">
          <input
            type="text"
            maxLength={6}
            placeholder="000000"
            className="text-center text-4xl tracking-[0.5em] font-black h-20 bg-white/5 border-white/10 rounded-2xl group-focus-within:border-purple-500/50 transition-all placeholder:text-slate-800"
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn-primary w-full"
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
                <span>Verifying...</span>
              </motion.div>
            ) : (
              <motion.div
                key="submit"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-2"
              >
                <span>Verify Account</span>
                <ArrowRight className="w-5 h-5" />
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </form>

      <div className="mt-10 pt-8 border-t border-white/5">
        <button
          onClick={handleResend}
          disabled={resending || cooldown > 0}
          className="flex items-center gap-2 mx-auto text-slate-400 hover:text-white disabled:opacity-50 transition-all group"
        >
          <RefreshCw className={`w-4 h-4 ${resending ? 'animate-spin' : 'group-hover:rotate-180 transition-transform duration-500'}`} />
          <span>{cooldown > 0 ? `Resend code in ${cooldown}s` : 'Resend Code'}</span>
        </button>
      </div>
    </motion.div>
  );
}
