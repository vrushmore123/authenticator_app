'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay },
});

const features = [
  { index: '01', title: 'JWT Sessions',   description: 'Stateless, cryptographically signed tokens. No session store required.' },
  { index: '02', title: 'Email OTP',      description: 'Transactional verification delivered instantly at onboarding.' },
  { index: '03', title: 'SMS Two-Factor', description: 'Twilio-powered mobile verification as a second authentication layer.' },
];

const specs = [
  { label: 'Protocol',   value: 'JWT / RS256' },
  { label: 'OTP delivery', value: 'Email + SMS' },
  { label: 'Framework',  value: 'Next.js 14' },
  { label: 'Stack',      value: 'Node · Mongo · Twilio' },
];

export default function Home() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400;1,600&family=IBM+Plex+Mono:wght@400;500&display=swap');
        html, body { margin: 0; padding: 0; background: #f0ede6; overflow-x: hidden; }
        *, *::before, *::after { box-sizing: border-box; }
        .fd { font-family: 'Cormorant Garamond', serif; }
        .fm { font-family: 'IBM Plex Mono', monospace; }
        .btn-solid { background: #0d0d0d; color: #f0ede6; padding: 13px 28px; font-family: 'IBM Plex Mono', monospace; font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase; text-decoration: none; transition: opacity .15s; display: inline-block; }
        .btn-solid:hover { opacity: 0.7; }
        .btn-outline { border: 1px solid #0d0d0d; color: #0d0d0d; padding: 13px 28px; font-family: 'IBM Plex Mono', monospace; font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase; text-decoration: none; transition: background .15s, color .15s; display: inline-block; }
        .btn-outline:hover { background: #0d0d0d; color: #f0ede6; }
        .nav-link { font-family: 'IBM Plex Mono', monospace; font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; color: #888; text-decoration: none; transition: color .15s; }
        .nav-link:hover { color: #0d0d0d; }
        @media (max-width: 768px) {
          .hero-grid { grid-template-columns: 1fr !important; }
          .spec-panel { border-left: none !important; border-top: 1px solid #d6d3cc; padding-left: 0 !important; padding-top: 2rem !important; }
          .feature-row { grid-template-columns: 2.5rem 1fr !important; }
          .feature-desc { display: none; }
        }
      `}</style>

      <div style={{ minHeight: '100vh', width: '100%', background: '#f0ede6', color: '#0d0d0d', display: 'flex', flexDirection: 'column' }}>

        {/* Nav */}
        <motion.header {...fade(0)} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.8rem 5vw', borderBottom: '1px solid #d6d3cc' }}>
          <span className="fm" style={{ fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase' }}>AuthKit</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
            <Link href="/login" className="nav-link">Sign in</Link>
            <Link href="/register" className="btn-solid" style={{ padding: '10px 22px' }}>Register</Link>
          </div>
        </motion.header>

        {/* Hero */}
        <main className="hero-grid" style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: '68vh' }}>

          {/* Left */}
          <div style={{ padding: '5rem 4vw 5rem 5vw', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <motion.p {...fade(0.08)} className="fm" style={{ fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#d4400a', marginBottom: '1.8rem' }}>
              Full-stack authentication
            </motion.p>

            <motion.h1 {...fade(0.15)} className="fd" style={{ fontSize: 'clamp(3.2rem, 5vw, 5.8rem)', fontWeight: 700, lineHeight: 0.93, letterSpacing: '-0.01em', marginBottom: '2.2rem' }}>
              Security that<br />
              <em style={{ fontWeight: 400, fontStyle: 'italic', color: '#d4400a' }}>doesn't</em><br />
              get in the way.
            </motion.h1>

            <motion.p {...fade(0.22)} className="fm" style={{ fontSize: 12, color: '#666', lineHeight: 1.9, maxWidth: '36ch', marginBottom: '2.8rem', letterSpacing: '0.02em' }}>
              JWT sessions, email OTP, and SMS two-factor — wired into Next.js from the start.
            </motion.p>

            <motion.div {...fade(0.28)} style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <Link href="/register" className="btn-solid">Get started →</Link>
              <Link href="/login" className="btn-outline">Sign in</Link>
            </motion.div>
          </div>

          {/* Right — spec panel */}
          <motion.div
            className="spec-panel"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.1, delay: 0.25 }}
            style={{ borderLeft: '1px solid #d6d3cc', padding: '5rem 5vw 5rem 4vw', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '2.8rem' }}
          >
            {specs.map((item, i) => (
              <motion.div key={item.label} initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.4 + i * 0.09, ease: [0.22, 1, 0.36, 1] }}>
                <p className="fm" style={{ fontSize: 10, letterSpacing: '0.28em', textTransform: 'uppercase', color: '#aaa', marginBottom: '0.45rem' }}>{item.label}</p>
                <p className="fd" style={{ fontSize: '1.6rem', fontWeight: 600, color: '#0d0d0d', lineHeight: 1 }}>{item.value}</p>
              </motion.div>
            ))}
          </motion.div>
        </main>

        {/* Features */}
        <section style={{ padding: '0 5vw 4rem', borderTop: '1px solid #d6d3cc' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', padding: '1.6rem 0 2.2rem' }}>
            <span className="fm" style={{ fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#aaa', whiteSpace: 'nowrap' }}>What's included</span>
            <div style={{ flex: 1, height: 1, background: '#d6d3cc' }} />
          </div>

          {features.map((f, i) => (
            <motion.div
              key={f.index}
              className="feature-row"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.5 + i * 0.09, ease: [0.22, 1, 0.36, 1] }}
              style={{ display: 'grid', gridTemplateColumns: '3rem 1fr 2.5fr', gap: '0 3vw', alignItems: 'start', padding: '1.6rem 0', borderBottom: '1px solid #d6d3cc' }}
            >
              <span className="fm" style={{ fontSize: 10, color: '#bbb', paddingTop: 3 }}>{f.index}</span>
              <span className="fd" style={{ fontSize: '1.3rem', fontWeight: 600, lineHeight: 1.2 }}>{f.title}</span>
              <span className="fm feature-desc" style={{ fontSize: 11, color: '#666', lineHeight: 1.85, letterSpacing: '0.02em' }}>{f.description}</span>
            </motion.div>
          ))}
        </section>

        {/* Footer */}
        <motion.footer {...fade(0.6)} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.4rem 5vw', borderTop: '1px solid #d6d3cc' }}>
          <span className="fm" style={{ fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#aaa' }}>© {new Date().getFullYear()} AuthKit</span>
          <span className="fm" style={{ fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#d4400a' }}>Built with Next.js</span>
        </motion.footer>

      </div>
    </>
  );
}