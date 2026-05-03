'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Shield, Lock, Smartphone, Mail, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="text-center text-white max-w-5xl w-full mx-auto py-12 px-4">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div variants={itemVariants} className="flex justify-center mb-8">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-fuchsia-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative p-4 bg-slate-900/50 rounded-2xl backdrop-blur-xl border border-white/10">
              <Shield className="w-12 h-12 text-purple-400" />
            </div>
          </div>
        </motion.div>

        <motion.h1 variants={itemVariants} className="text-5xl md:text-8xl font-black mb-6 tracking-tight leading-tight">
          Modern <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-fuchsia-400 to-pink-400">Security</span>
          <br className="hidden md:block" /> Simplified.
        </motion.h1>

        <motion.p variants={itemVariants} className="text-lg md:text-xl text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed">
          The most secure and visually stunning full-stack authentication solution. 
          Built with JWT, Multi-channel OTP, and Next.js.
        </motion.p>

        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center mb-24">
          <Link href="/register" className="btn-primary group">
            Get Started <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link href="/login" className="btn-secondary">
            Sign In
          </Link>
        </motion.div>

        <motion.div 
          variants={itemVariants}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 text-left"
        >
          <FeatureCard 
            icon={<Lock className="w-6 h-6 text-purple-400" />}
            title="JWT Security"
            description="Enterprise-grade session management using secure JSON Web Tokens."
          />
          <FeatureCard 
            icon={<Mail className="w-6 h-6 text-purple-400" />}
            title="Email Verification"
            description="Seamless onboarding with instant OTP verification via email."
          />
          <FeatureCard 
            icon={<Smartphone className="w-6 h-6 text-fuchsia-400" />}
            title="SMS OTP"
            description="Two-factor security with Twilio integration for mobile verification."
          />
        </motion.div>
      </motion.div>
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="glass-card group hover:border-purple-500/30 transition-all duration-500">
      <div className="mb-4 p-2 w-fit bg-white/5 rounded-lg border border-white/10 group-hover:scale-110 transition-transform duration-500">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2 text-white/90">{title}</h3>
      <p className="text-slate-400 leading-relaxed text-sm">
        {description}
      </p>
    </div>
  );
}
