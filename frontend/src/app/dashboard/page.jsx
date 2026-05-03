'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1], delay },
});

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sessionTime] = useState(() => new Date().toLocaleString('en-GB', {
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  }));

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get('/auth/me');
        setUser(res.data.user);
      } catch {
        localStorage.removeItem('token');
        router.push('/login');
      } finally {
        setLoading(false);
      }
    };
    const token = localStorage.getItem('token');
    if (!token) router.push('/login');
    else fetchUser();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    toast.success('Logged out successfully');
    router.push('/login');
  };

  if (loading) {
    return (
      <>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=IBM+Plex+Mono:wght@400;500&display=swap');
          html,body{margin:0;padding:0;background:#f0ede6;}
        `}</style>
        <div style={{ minHeight: '100vh', background: '#f0ede6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#aaa' }}>
            Loading session…
          </span>
        </div>
      </>
    );
  }

  const joinDate = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
    : '—';

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=IBM+Plex+Mono:wght@400;500&display=swap');
        html,body{margin:0;padding:0;background:#f0ede6;}
        *,*::before,*::after{box-sizing:border-box;}
        .fd{font-family:'Cormorant Garamond',serif;}
        .fm{font-family:'IBM Plex Mono',monospace;}
        .data-row{display:flex;justify-content:space-between;align-items:baseline;padding:1.2rem 0;border-bottom:1px solid #d6d3cc;}
        .data-row:first-child{border-top:1px solid #d6d3cc;}
        .data-label{font-family:'IBM Plex Mono',monospace;font-size:10px;letter-spacing:.22em;text-transform:uppercase;color:#888;}
        .data-value{font-family:'IBM Plex Mono',monospace;font-size:12px;color:#0d0d0d;font-weight:500;text-align:right;max-width:60%;word-break:break-all;}
        .signout-btn{background:none;border:1px solid #d6d3cc;font-family:'IBM Plex Mono',monospace;font-size:10px;letter-spacing:.16em;text-transform:uppercase;color:#888;padding:9px 20px;cursor:pointer;transition:border-color .15s,color .15s;}
        .signout-btn:hover{border-color:#0d0d0d;color:#0d0d0d;}
        .panel{background:#e8e5de;padding:2rem 2.5rem;}
        .panel-label{font-family:'IBM Plex Mono',monospace;font-size:9px;letter-spacing:.28em;text-transform:uppercase;color:#aaa;margin-bottom:1.4rem;}
        .spec-item{margin-bottom:1.6rem;}
        .spec-item:last-child{margin-bottom:0;}
        .spec-key{font-family:'IBM Plex Mono',monospace;font-size:9px;letter-spacing:.22em;text-transform:uppercase;color:#999;margin-bottom:.3rem;}
        .spec-val{font-family:'Cormorant Garamond',serif;font-size:1.25rem;font-weight:600;color:#0d0d0d;line-height:1.1;}
      `}</style>

      <div style={{ minHeight: '100vh', width: '100%', background: '#f0ede6', color: '#0d0d0d' }}>

        {/* Nav */}
        <motion.header {...fade(0)} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.8rem 5vw', borderBottom: '1px solid #d6d3cc' }}>
          <span className="fm" style={{ fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase' }}>AuthKit</span>
          <button onClick={handleLogout} className="signout-btn">Sign out</button>
        </motion.header>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: 'calc(100vh - 65px)' }}>

          {/* Left — identity */}
          <div style={{ borderRight: '1px solid #d6d3cc', padding: '4rem 4vw 4rem 5vw', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>

            <div>
              <motion.p {...fade(0.08)} className="fm" style={{ fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#d4400a', marginBottom: '1.4rem' }}>
                Account
              </motion.p>
              <motion.h1 {...fade(0.14)} className="fd" style={{ fontSize: 'clamp(2.8rem, 4.5vw, 4.8rem)', fontWeight: 700, lineHeight: 0.92, letterSpacing: '-0.01em', marginBottom: '1rem' }}>
                {user?.name?.split(' ')[0]}<br />
                <em style={{ fontWeight: 400, fontStyle: 'italic', color: '#d4400a' }}>
                  {user?.name?.split(' ').slice(1).join(' ') || 'welcome.'}
                </em>
              </motion.h1>
              <motion.p {...fade(0.2)} className="fm" style={{ fontSize: 11, color: '#888', marginBottom: '3.5rem' }}>
                Session started {sessionTime}
              </motion.p>

              {/* Data rows */}
              <motion.div {...fade(0.26)}>
                {[
                  { label: 'Email',   value: user?.email },
                  { label: 'Phone',   value: user?.phoneNumber },
                  { label: 'Status',  value: 'Verified' },
                  { label: 'Member since', value: joinDate },
                ].map((row) => (
                  <div className="data-row" key={row.label}>
                    <span className="data-label">{row.label}</span>
                    <span className="data-value" style={row.label === 'Status' ? { color: '#2e7d52' } : {}}>
                      {row.value ?? '—'}
                    </span>
                  </div>
                ))}
              </motion.div>
            </div>

            <motion.p {...fade(0.35)} className="fm" style={{ fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#bbb', marginTop: '3rem' }}>
              © {new Date().getFullYear()} AuthKit
            </motion.p>
          </div>

          {/* Right — security panel */}
          <div style={{ padding: '4rem 5vw 4rem 4vw', display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>

            {/* Security specs block */}
            <motion.div {...fade(0.18)} className="panel">
              <p className="fm panel-label">Security</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.6rem 2rem' }}>
                {[
                  { key: 'Protocol',    val: 'JWT / RS256' },
                  { key: 'Encryption',  val: 'AES-256' },
                  { key: '2FA',         val: 'Active' },
                  { key: 'Session',     val: 'Monitored' },
                ].map((s) => (
                  <div key={s.key} className="spec-item">
                    <p className="fm spec-key">{s.key}</p>
                    <p className="fd spec-val">{s.val}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Activity block */}
            <motion.div {...fade(0.26)}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                <span className="fm" style={{ fontSize: 9, letterSpacing: '0.28em', textTransform: 'uppercase', color: '#aaa', whiteSpace: 'nowrap' }}>Activity</span>
                <div style={{ flex: 1, height: 1, background: '#d6d3cc' }} />
              </div>
              {[
                { action: 'Login',           time: sessionTime },
                { action: 'OTP verified',    time: sessionTime },
                { action: 'Account created', time: joinDate },
              ].map((item, i) => (
                <motion.div
                  key={item.action}
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                  style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '1rem 0', borderBottom: '1px solid #d6d3cc' }}
                >
                  <span className="fm" style={{ fontSize: 11, color: '#0d0d0d' }}>{item.action}</span>
                  <span className="fm" style={{ fontSize: 10, color: '#aaa', letterSpacing: '0.05em' }}>{item.time}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* Links block */}
            <motion.div {...fade(0.34)}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                <span className="fm" style={{ fontSize: 9, letterSpacing: '0.28em', textTransform: 'uppercase', color: '#aaa', whiteSpace: 'nowrap' }}>Quick access</span>
                <div style={{ flex: 1, height: 1, background: '#d6d3cc' }} />
              </div>
              {['Security settings', 'Active sessions', 'Audit logs'].map((link, i) => (
                <motion.button
                  key={link}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.38 + i * 0.06 }}
                  style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', padding: '1rem 0', borderBottom: '1px solid #d6d3cc', background: 'none', border: 'none', borderBottom: '1px solid #d6d3cc', cursor: 'pointer' }}
                  onMouseEnter={e => e.currentTarget.querySelector('span').style.transform = 'translateX(3px)'}
                  onMouseLeave={e => e.currentTarget.querySelector('span').style.transform = 'translateX(0)'}
                >
                  <span className="fm" style={{ fontSize: 11, color: '#0d0d0d' }}>{link}</span>
                  <span style={{ fontSize: 14, color: '#d4400a', transition: 'transform 0.15s' }}>→</span>
                </motion.button>
              ))}
            </motion.div>

          </div>
        </div>
      </div>
    </>
  );
}