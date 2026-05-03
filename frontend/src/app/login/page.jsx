'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import api from '@/lib/api';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1], delay },
});

export default function Login() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

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
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=IBM+Plex+Mono:wght@400;500&display=swap');
        html, body { margin: 0; padding: 0; background: #f0ede6; }
        *, *::before, *::after { box-sizing: border-box; }
        .fd { font-family: 'Cormorant Garamond', serif; }
        .fm { font-family: 'IBM Plex Mono', monospace; }
        .field {
          width: 100%; background: #e4e0d8;
          border: none; border-bottom: 2px solid #b0aba0;
          padding: 0.85rem 0.9rem; font-family: 'IBM Plex Mono', monospace;
          font-size: 13px; color: #0d0d0d; outline: none;
          transition: border-color 0.2s, background 0.2s;
        }
        .field::placeholder { color: #9e9a92; }
        .field:focus { border-bottom-color: #0d0d0d; background: #dedad1; }
        .btn-submit {
          width: 100%; background: #0d0d0d; color: #f0ede6;
          border: none; padding: 14px; font-family: 'IBM Plex Mono', monospace;
          font-size: 11px; letter-spacing: 0.16em; text-transform: uppercase;
          cursor: pointer; transition: opacity 0.15s; margin-top: 2.5rem;
        }
        .btn-submit:hover:not(:disabled) { opacity: 0.75; }
        .btn-submit:disabled { opacity: 0.4; cursor: not-allowed; }
      `}</style>

      <div style={{ minHeight: '100vh', width: '100%', background: '#f0ede6', color: '#0d0d0d', display: 'grid', gridTemplateColumns: '1fr 1fr' }}>

        {/* Left — branding panel */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          style={{ borderRight: '1px solid #d6d3cc', padding: '3rem 5%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
        >
          <Link href="/" className="fm" style={{ fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#0d0d0d', textDecoration: 'none' }}>
            ← AuthKit
          </Link>

          <div>
            <p className="fm" style={{ fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#d4400a', marginBottom: '1.5rem' }}>
              Welcome back
            </p>
            <h1 className="fd" style={{ fontSize: 'clamp(3rem, 5vw, 5rem)', fontWeight: 700, lineHeight: 0.92, letterSpacing: '-0.01em', color: '#0d0d0d', marginBottom: '1.8rem' }}>
              Sign in to<br />
              <em style={{ fontWeight: 400, fontStyle: 'italic', color: '#d4400a' }}>your</em><br />
              account.
            </h1>
            <p className="fm" style={{ fontSize: 11, color: '#888', lineHeight: 1.8, maxWidth: '30ch' }}>
              Secured with JWT session management and multi-channel verification.
            </p>
          </div>

          <p className="fm" style={{ fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#bbb' }}>
            © {new Date().getFullYear()} AuthKit
          </p>
        </motion.div>

        {/* Right — form panel */}
        <div style={{ padding: '3rem 6%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <motion.div {...fade(0.1)} style={{ maxWidth: 400, width: '100%' }}>

            <p className="fm" style={{ fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#aaa', marginBottom: '2.5rem' }}>
              01 / Credentials
            </p>

            <form onSubmit={handleSubmit}>
              {/* Email */}
              <motion.div {...fade(0.18)} style={{ marginBottom: '2rem' }}>
                <label className="fm" style={{ fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#888', display: 'block', marginBottom: '0.6rem' }}>
                  Email address
                </label>
                <input
                  type="email" name="email" placeholder="name@example.com"
                  className="field" required onChange={handleChange}
                />
              </motion.div>

              {/* Password */}
              <motion.div {...fade(0.24)} style={{ marginBottom: '0.5rem' }}>
                <label className="fm" style={{ fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#888', display: 'block', marginBottom: '0.6rem' }}>
                  Password
                </label>
                <input
                  type="password" name="password" placeholder="••••••••"
                  className="field" required onChange={handleChange}
                />
              </motion.div>

              {/* Submit */}
              <motion.div {...fade(0.3)}>
                <button type="submit" disabled={loading} className="btn-submit">
                  <AnimatePresence mode="wait">
                    {loading ? (
                      <motion.span key="l" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        Signing in…
                      </motion.span>
                    ) : (
                      <motion.span key="s" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        Sign in →
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
              </motion.div>
            </form>

            {/* Footer link */}
            <motion.div {...fade(0.38)} style={{ marginTop: '2.5rem', paddingTop: '2rem', borderTop: '1px solid #d6d3cc' }}>
              <p className="fm" style={{ fontSize: 11, color: '#888' }}>
                No account?{' '}
                <Link href="/register" style={{ color: '#0d0d0d', fontWeight: 500, textDecoration: 'none', borderBottom: '1px solid #0d0d0d' }}>
                  Create one
                </Link>
              </p>
            </motion.div>

          </motion.div>
        </div>

      </div>
    </>
  );
}