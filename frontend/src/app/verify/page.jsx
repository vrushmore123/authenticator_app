'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1], delay },
});

export default function Verify() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const [otp, setOtp] = useState('');
  const [identifier, setIdentifier] = useState('');

  useEffect(() => {
    const stored = localStorage.getItem('verify_identifier');
    if (!stored) router.push('/register');
    else setIdentifier(stored);
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
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=IBM+Plex+Mono:wght@400;500&display=swap');
        html, body { margin: 0; padding: 0; background: #f0ede6; }
        *, *::before, *::after { box-sizing: border-box; }
        .fd { font-family: 'Cormorant Garamond', serif; }
        .fm { font-family: 'IBM Plex Mono', monospace; }
        .otp-input {
          width: 100%;
          background: #e4e0d8;
          border: none;
          border-bottom: 2px solid #b0aba0;
          padding: 1.2rem 1rem;
          font-family: 'IBM Plex Mono', monospace;
          font-size: 2.2rem;
          font-weight: 500;
          letter-spacing: 0.55em;
          color: #0d0d0d;
          text-align: center;
          outline: none;
          transition: border-color 0.2s, background 0.2s;
        }
        .otp-input::placeholder { color: #c4bfb5; letter-spacing: 0.55em; }
        .otp-input:focus { border-bottom-color: #0d0d0d; background: #dedad1; }
        .btn-submit {
          width: 100%; background: #0d0d0d; color: #f0ede6;
          border: none; padding: 14px;
          font-family: 'IBM Plex Mono', monospace;
          font-size: 11px; letter-spacing: 0.16em; text-transform: uppercase;
          cursor: pointer; transition: opacity 0.15s; margin-top: 2rem;
        }
        .btn-submit:hover:not(:disabled) { opacity: 0.75; }
        .btn-submit:disabled { opacity: 0.4; cursor: not-allowed; }
        .resend-btn {
          background: none; border: none; cursor: pointer;
          font-family: 'IBM Plex Mono', monospace;
          font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase;
          color: #888; transition: color 0.15s; padding: 0;
        }
        .resend-btn:hover:not(:disabled) { color: #0d0d0d; }
        .resend-btn:disabled { opacity: 0.4; cursor: not-allowed; }
        .progress-bar {
          height: 2px; background: #d6d3cc;
          position: relative; overflow: hidden;
        }
        .progress-fill {
          position: absolute; left: 0; top: 0; height: 100%;
          background: #d4400a;
          transition: width 1s linear;
        }
      `}</style>

      <div style={{ minHeight: '100vh', width: '100%', background: '#f0ede6', color: '#0d0d0d', display: 'grid', gridTemplateColumns: '1fr 1fr' }}>

        {/* Left — branding panel */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          style={{ borderRight: '1px solid #d6d3cc', padding: '3rem 5%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
        >
          <span className="fm" style={{ fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#0d0d0d' }}>
            AuthKit
          </span>

          <div>
            <p className="fm" style={{ fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#d4400a', marginBottom: '1.5rem' }}>
              Step 03 / 03
            </p>
            <h1 className="fd" style={{ fontSize: 'clamp(3rem, 5vw, 5rem)', fontWeight: 700, lineHeight: 0.92, letterSpacing: '-0.01em', marginBottom: '1.8rem' }}>
              Verify your<br />
              <em style={{ fontWeight: 400, fontStyle: 'italic', color: '#d4400a' }}>identity</em><br />
              now.
            </h1>
            <p className="fm" style={{ fontSize: 11, color: '#888', lineHeight: 1.8, maxWidth: '30ch' }}>
              A 6-digit code was sent to
            </p>
            <p className="fm" style={{ fontSize: 12, color: '#0d0d0d', marginTop: '0.3rem', fontWeight: 500, wordBreak: 'break-all', maxWidth: '30ch' }}>
              {identifier}
            </p>
          </div>

          {/* Step progress */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
            {[
              { n: '01', label: 'Details entered',    done: true },
              { n: '02', label: 'OTP method chosen',  done: true },
              { n: '03', label: 'Identity verified',  done: false },
            ].map((step) => (
              <div key={step.n} style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                <span className="fm" style={{ fontSize: 9, color: step.done ? '#d4400a' : '#bbb' }}>{step.n}</span>
                <div style={{ flex: 1, height: 1, background: step.done ? '#d4400a' : '#d6d3cc', transition: 'background 0.3s' }} />
                <span className="fm" style={{ fontSize: 10, color: step.done ? '#555' : '#888', letterSpacing: '0.1em' }}>{step.label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right — form panel */}
        <div style={{ padding: '3rem 6%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <motion.div {...fade(0.1)} style={{ maxWidth: 400, width: '100%' }}>

            <p className="fm" style={{ fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#aaa', marginBottom: '2.5rem' }}>
              03 / Verification
            </p>

            <form onSubmit={handleSubmit}>
              {/* OTP field */}
              <motion.div {...fade(0.18)} style={{ marginBottom: '0.5rem' }}>
                <label className="fm" style={{ fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#777', display: 'block', marginBottom: '0.6rem' }}>
                  6-digit code
                </label>
                <input
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  placeholder="000000"
                  className="otp-input"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                  required
                />
                {/* Character count indicator */}
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.4rem' }}>
                  <span className="fm" style={{ fontSize: 10, color: otp.length === 6 ? '#d4400a' : '#bbb', letterSpacing: '0.1em' }}>
                    {otp.length} / 6
                  </span>
                </div>
              </motion.div>

              {/* Submit */}
              <motion.div {...fade(0.24)}>
                <button type="submit" disabled={loading || otp.length !== 6} className="btn-submit">
                  <AnimatePresence mode="wait">
                    {loading ? (
                      <motion.span key="l" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        Verifying…
                      </motion.span>
                    ) : (
                      <motion.span key="s" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        Verify identity →
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
              </motion.div>
            </form>

            {/* Resend */}
            <motion.div {...fade(0.32)} style={{ marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid #d6d3cc' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <button onClick={handleResend} disabled={resending || cooldown > 0} className="resend-btn">
                  {resending ? 'Sending…' : cooldown > 0 ? `Resend in ${cooldown}s` : 'Resend code'}
                </button>
                {cooldown > 0 && (
                  <span className="fm" style={{ fontSize: 10, color: '#d4400a', letterSpacing: '0.1em' }}>
                    {cooldown}s
                  </span>
                )}
              </div>

              {/* Cooldown progress bar */}
              {cooldown > 0 && (
                <div className="progress-bar" style={{ marginTop: '0.75rem' }}>
                  <div className="progress-fill" style={{ width: `${(cooldown / 30) * 100}%` }} />
                </div>
              )}
            </motion.div>

          </motion.div>
        </div>

      </div>
    </>
  );
} 