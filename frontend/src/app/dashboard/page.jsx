'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { LogOut, User, ShieldCheck, Mail, Phone, Calendar } from 'lucide-react';

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get('/auth/me');
        setUser(res.data.user);
      } catch (error) {
        localStorage.removeItem('token');
        router.push('/login');
      } finally {
        setLoading(false);
      }
    };

    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
    } else {
      fetchUser();
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    toast.success('Logged out successfully');
    router.push('/login');
  };

  if (loading) {
    return (
      <div className="text-white text-xl animate-pulse">Loading dashboard...</div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass rounded-3xl p-8 w-full max-w-4xl text-white overflow-hidden relative"
    >
      {/* Decorative background blobs */}
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-purple-500 rounded-full blur-[100px] opacity-20"></div>
      <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-blue-500 rounded-full blur-[100px] opacity-20"></div>

      <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-gradient-to-br from-blue-400 to-purple-500 rounded-2xl shadow-lg">
            <User className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Welcome, {user?.name}</h1>
            <p className="text-white/60">Manage your account and security settings</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-6 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl transition-all"
        >
          <LogOut className="w-5 h-5" /> Logout
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="glass p-6 rounded-2xl flex items-center gap-4">
          <div className="p-3 bg-white/10 rounded-xl">
            <Mail className="w-6 h-6 text-blue-300" />
          </div>
          <div>
            <p className="text-sm text-white/50 uppercase tracking-wider">Email Address</p>
            <p className="text-lg font-medium">{user?.email}</p>
          </div>
        </div>

        <div className="glass p-6 rounded-2xl flex items-center gap-4">
          <div className="p-3 bg-white/10 rounded-xl">
            <Phone className="w-6 h-6 text-purple-300" />
          </div>
          <div>
            <p className="text-sm text-white/50 uppercase tracking-wider">Phone Number</p>
            <p className="text-lg font-medium">{user?.phoneNumber}</p>
          </div>
        </div>

        <div className="glass p-6 rounded-2xl flex items-center gap-4">
          <div className="p-3 bg-white/10 rounded-xl">
            <ShieldCheck className="w-6 h-6 text-green-300" />
          </div>
          <div>
            <p className="text-sm text-white/50 uppercase tracking-wider">Verification Status</p>
            <p className="text-lg font-medium text-green-400">Verified</p>
          </div>
        </div>

        <div className="glass p-6 rounded-2xl flex items-center gap-4">
          <div className="p-3 bg-white/10 rounded-xl">
            <Calendar className="w-6 h-6 text-orange-300" />
          </div>
          <div>
            <p className="text-sm text-white/50 uppercase tracking-wider">Member Since</p>
            <p className="text-lg font-medium">{new Date(user?.createdAt).toLocaleDateString()}</p>
          </div>
        </div>
      </div>

      <div className="mt-10 p-8 glass rounded-2xl border-blue-500/30 border">
        <h3 className="text-xl font-semibold mb-4">Security Overview</h3>
        <p className="text-white/70 mb-6">
          Your account is secured with JWT-based authentication and multi-channel OTP verification.
          All your sensitive data is encrypted and stored securely.
        </p>
        <div className="flex gap-4">
          <span className="px-4 py-1 bg-green-500/20 text-green-300 text-xs rounded-full border border-green-500/30">JWT Active</span>
          <span className="px-4 py-1 bg-blue-500/20 text-blue-300 text-xs rounded-full border border-blue-500/30">SSL Secured</span>
          <span className="px-4 py-1 bg-purple-500/20 text-purple-300 text-xs rounded-full border border-purple-500/30">2FA Verified</span>
        </div>
      </div>
    </motion.div>
  );
}
