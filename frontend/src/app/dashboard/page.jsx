'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { LogOut, User, ShieldCheck, Mail, Phone, Calendar, Loader2, ExternalLink, ShieldAlert } from 'lucide-react';

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
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="w-12 h-12 text-purple-500 animate-spin" />
        <p className="text-slate-400 font-medium animate-pulse">Accessing Secure Vault...</p>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card w-full max-w-5xl overflow-hidden relative"
    >
      {/* Premium Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-8 relative z-10">
        <div className="flex items-center gap-6">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-fuchsia-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-500"></div>
            <div className="relative p-5 bg-slate-900/50 rounded-2xl border border-white/10 backdrop-blur-xl">
              <User className="w-10 h-10 text-purple-400" />
            </div>
          </div>
          <div>
            <h1 className="text-4xl font-black text-white tracking-tight">Welcome, {user?.name}</h1>
            <p className="text-slate-400 flex items-center gap-2 mt-1">
              <ShieldCheck className="w-4 h-4 text-green-400" />
              Verified Account Status
            </p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="btn-secondary group flex items-center gap-3 px-8 border-red-500/20 hover:border-red-500/50 hover:bg-red-500/10 text-red-400"
        >
          <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" /> 
          Sign Out
        </button>
      </div>

      {/* Stats/Info Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
        <InfoCard 
          icon={<Mail className="w-5 h-5 text-purple-400" />}
          label="Email Address"
          value={user?.email}
        />
        <InfoCard 
          icon={<Phone className="w-5 h-5 text-purple-400" />}
          label="Phone Number"
          value={user?.phoneNumber}
        />
        <InfoCard 
          icon={<ShieldCheck className="w-5 h-5 text-green-400" />}
          label="Account Status"
          value="Secure"
        />
        <InfoCard 
          icon={<Calendar className="w-5 h-5 text-orange-400" />}
          label="Joined Date"
          value={new Date(user?.createdAt).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}
        />
      </div>

      {/* Security Details & Activity */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="p-8 bg-white/5 rounded-[24px] border border-white/10 relative overflow-hidden group hover:border-purple-500/30 transition-colors">
            <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity">
              <ShieldAlert className="w-32 h-32 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
              <ShieldCheck className="w-6 h-6 text-purple-400" />
              Security Overview
            </h3>
            <p className="text-slate-400 leading-relaxed mb-8 max-w-2xl">
              Your identity is protected with end-to-end encryption. All sessions are monitored 
              and secured with industry-standard JWT protocols and 2-factor authentication.
            </p>
            <div className="flex flex-wrap gap-3">
              <Badge text="JWT v2.0 Active" color="blue" />
              <Badge text="SSL 256-bit" color="purple" />
              <Badge text="Encrypted Storage" color="green" />
              <Badge text="2FA Enabled" color="fuchsia" />
            </div>
          </div>
        </div>

        <div className="glass rounded-[24px] p-8 border border-white/10 flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-bold mb-6">Quick Links</h3>
            <div className="space-y-4">
              <QuickLink text="Security Settings" />
              <QuickLink text="Active Sessions" />
              <QuickLink text="Audit Logs" />
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-white/5">
            <p className="text-xs text-slate-500 uppercase tracking-widest font-bold">Privacy Policy v2.4</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function InfoCard({ icon, label, value }) {
  return (
    <div className="p-6 bg-white/5 rounded-2xl border border-white/5 hover:border-white/10 transition-colors">
      <div className="mb-4">{icon}</div>
      <p className="text-xs text-slate-500 uppercase tracking-widest font-bold mb-1">{label}</p>
      <p className="text-sm font-semibold text-white/90 truncate">{value}</p>
    </div>
  );
}

function Badge({ text, color }) {
  const colors = {
    blue: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    purple: 'bg-fuchsia-500/10 text-fuchsia-400 border-fuchsia-500/20',
    green: 'bg-green-500/10 text-green-400 border-green-500/20',
    fuchsia: 'bg-fuchsia-500/10 text-fuchsia-400 border-fuchsia-500/20',
  };
  return (
    <span className={`px-4 py-1.5 text-[10px] font-bold uppercase tracking-wider rounded-full border ${colors[color]}`}>
      {text}
    </span>
  );
}

function QuickLink({ text }) {
  return (
    <button className="w-full flex items-center justify-between text-slate-400 hover:text-white group transition-colors">
      <span className="text-sm font-medium">{text}</span>
      <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
    </button>
  );
}
