import { useState, useEffect, useRef } from 'react';
import {
  MemoryRouter,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

import editorial400 from '@assets/EditorialToday-Regular_1780690089220.ttf';
import editorial600 from '@assets/EditorialToday-SemiBold_1780690089220.ttf';
import editorial700 from '@assets/EditorialToday-Bold_1780690089219.ttf';
import editorial800 from '@assets/EditorialToday-ExtraBold_1780690089221.ttf';

import logo09 from '@assets/thereals_logos-09_1780690102829.svg';
import logo10 from '@assets/thereals_logos-10_1780690102829.svg';
import wordmark from '@assets/thereals_wordmark_1780692562361.svg';

const C = {
  paper:  '#ede9e0',
  paper2: '#e4dfd4',
  cream:  '#f7f3eb',
  ink:    '#1a1814',
  ink2:   '#3a3630',
  muted:  '#8a8278',
  dust:   '#b8b0a0',
  red:    '#e30005',
  white:  '#f6f5f1',
} as const;

const mono = "'DM Mono', 'Courier New', monospace";
const serif = "'EditorialToday', Georgia, serif";
const body = "'Inter', 'Helvetica Neue', Arial, sans-serif";

function useGlobalStyles() {
  useEffect(() => {
    const existing = document.getElementById('thereals-global');
    if (existing) return;
    const s = document.createElement('style');
    s.id = 'thereals-global';
    s.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400&family=Inter:wght@400;500&display=swap');

      @font-face {
        font-family: 'EditorialToday';
        font-weight: 400;
        font-style: normal;
        src: url('${editorial400}') format('truetype');
      }
      @font-face {
        font-family: 'EditorialToday';
        font-weight: 600;
        font-style: normal;
        src: url('${editorial600}') format('truetype');
      }
      @font-face {
        font-family: 'EditorialToday';
        font-weight: 700;
        font-style: normal;
        src: url('${editorial700}') format('truetype');
      }
      @font-face {
        font-family: 'EditorialToday';
        font-weight: 800;
        font-style: normal;
        src: url('${editorial800}') format('truetype');
      }

      .tr-root {
        cursor: none;
        background: ${C.paper};
        color: ${C.ink};
        font-family: ${body};
        font-weight: 400;
        overflow-x: hidden;
      }
      .tr-root *, .tr-root *::before, .tr-root *::after {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
      }

      .tr-grain {
        position: fixed; inset: 0;
        pointer-events: none; z-index: 8000;
        opacity: 0.5;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23g)' opacity='.12'/%3E%3C/svg%3E");
        mix-blend-mode: multiply;
      }

      .tr-cursor-dot {
        position: fixed;
        width: 10px; height: 10px;
        background: ${C.red};
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transform: translate(-50%, -50%);
        transition: transform 0.1s;
      }
      .tr-cursor-ring {
        position: fixed;
        width: 34px; height: 34px;
        border: 1.5px solid ${C.red};
        border-radius: 50%;
        pointer-events: none;
        z-index: 9998;
        transform: translate(-50%, -50%);
        opacity: 0.45;
        transition: width 0.25s, height 0.25s;
      }

      .tr-btn-primary {
        display: inline-block;
        font-family: ${mono};
        font-size: 10px;
        letter-spacing: 0.18em;
        text-transform: uppercase;
        background: ${C.red};
        color: #fff;
        border: none;
        padding: 15px 32px;
        cursor: none;
        text-decoration: none;
        transition: opacity 0.2s, transform 0.15s;
      }
      .tr-btn-primary:hover { opacity: 0.88; transform: translateY(-1px); }

      .tr-btn-ghost {
        display: inline-block;
        font-family: ${mono};
        font-size: 10px;
        letter-spacing: 0.18em;
        text-transform: uppercase;
        background: transparent;
        color: ${C.muted};
        border: 1px solid ${C.dust};
        padding: 14px 24px;
        cursor: none;
        text-decoration: none;
        transition: border-color 0.2s, color 0.2s;
      }
      .tr-btn-ghost:hover { border-color: ${C.ink2}; color: ${C.ink}; }

      .tr-section-tag {
        font-family: ${mono};
        font-size: 9px;
        letter-spacing: 0.28em;
        text-transform: uppercase;
        color: ${C.muted};
        display: flex;
        align-items: center;
        gap: 12px;
        margin-bottom: 40px;
      }
      .tr-section-tag::before {
        content: '';
        display: block;
        width: 32px; height: 1px;
        background: ${C.red};
        flex-shrink: 0;
      }

      .tr-hero-rules {
        position: absolute; inset: 0; pointer-events: none;
        background: repeating-linear-gradient(
          180deg,
          transparent 0px, transparent 79px,
          rgba(26,24,20,0.05) 79px, rgba(26,24,20,0.05) 80px
        );
      }

      .tr-input {
        display: block; width: 100%;
        font-family: ${body}; font-size: 14px;
        background: transparent; border: none;
        border-bottom: 1px solid ${C.dust};
        padding: 14px 0; color: ${C.ink}; outline: none;
        transition: border-color 0.2s;
      }
      .tr-input:focus { border-bottom-color: ${C.red}; }
      .tr-input::placeholder { color: ${C.dust}; }

      .tr-select {
        display: block; width: 100%;
        font-family: ${body}; font-size: 14px;
        background: transparent; border: none;
        border-bottom: 1px solid ${C.dust};
        padding: 14px 0; color: ${C.ink}; outline: none;
        appearance: none; cursor: none;
        transition: border-color 0.2s;
      }
      .tr-select:focus { border-bottom-color: ${C.red}; }

      .tr-form-label {
        display: block;
        font-family: ${mono}; font-size: 8px;
        letter-spacing: 0.22em; text-transform: uppercase;
        color: ${C.muted}; margin-bottom: 4px; margin-top: 28px;
      }

      .tr-m-card {
        padding: 36px 0;
        border-top: 1px solid ${C.dust};
        display: grid;
        grid-template-columns: 52px 1fr;
        gap: 24px; align-items: start;
      }
      .tr-m-card:last-child { border-bottom: 1px solid ${C.dust}; }

      .tr-join-card {
        padding: 72px 52px;
        border-right: 1px solid ${C.dust};
        position: relative; overflow: hidden;
        cursor: none;
      }
      .tr-join-card:last-child { border-right: none; }

      .tr-nav-link {
        font-family: ${mono}; font-size: 9px;
        letter-spacing: 0.2em; text-transform: uppercase;
        color: ${C.muted}; text-decoration: none;
        cursor: none; background: none; border: none;
        transition: color 0.2s;
      }
      .tr-nav-link:hover { color: ${C.ink}; }

      .tr-nav-link-light {
        font-family: ${mono}; font-size: 9px;
        letter-spacing: 0.2em; text-transform: uppercase;
        color: rgba(246,245,241,0.4); text-decoration: none;
        cursor: none; background: none; border: none;
        transition: color 0.2s;
      }
      .tr-nav-link-light:hover { color: rgba(246,245,241,0.9); }

      .tr-film-frame {
        width: 100%; aspect-ratio: 16/9;
        background: ${C.ink};
        position: relative;
        display: flex; align-items: center; justify-content: center;
        overflow: hidden;
      }
      .tr-film-frame::before, .tr-film-frame::after {
        content: '';
        position: absolute; top: 0; bottom: 0; width: 20px;
        background: repeating-linear-gradient(
          180deg,
          transparent 0px, transparent 10px,
          rgba(255,255,255,0.1) 10px, rgba(255,255,255,0.1) 18px,
          transparent 18px, transparent 28px
        );
        z-index: 2;
      }
      .tr-film-frame::before { left: 0; }
      .tr-film-frame::after  { right: 0; }

      .tr-stat-num {
        font-family: ${serif}; font-weight: 800;
        font-size: 36px; color: ${C.ink};
        line-height: 1; margin-bottom: 6px;
      }
      .tr-stat-label {
        font-family: ${mono}; font-size: 8px;
        letter-spacing: 0.2em; text-transform: uppercase;
        color: ${C.muted};
      }

      .tr-coll-tile {
        aspect-ratio: 3/4; background: ${C.paper2};
        border: 1px solid ${C.dust};
        position: relative; overflow: hidden;
        display: flex; align-items: flex-end;
        cursor: none; transition: transform 0.3s;
      }
      .tr-coll-tile:hover { transform: scale(1.015); z-index: 2; }
      .tr-coll-tile.tall { grid-row: span 2; aspect-ratio: unset; }

      .tr-rate-block {
        padding: 32px; border: 1px solid ${C.dust};
        background: ${C.cream}; position: relative;
      }
      .tr-rate-block::before {
        content: '';
        position: absolute; left: 0; top: 0; bottom: 0;
        width: 3px; background: ${C.red};
      }

      .tr-testi {
        background: ${C.paper2};
        padding: 36px 28px;
        border: 1px solid ${C.dust};
        position: relative;
      }

      .tr-footer-link {
        font-family: ${mono}; font-size: 9px;
        letter-spacing: 0.16em; text-transform: uppercase;
        color: ${C.muted}; text-decoration: none;
        cursor: none; background: none; border: none;
        display: block; margin-bottom: 10px; text-align: left;
        transition: color 0.2s;
      }
      .tr-footer-link:hover { color: ${C.ink}; }
    `;
    document.head.appendChild(s);
    return () => { s.remove(); };
  }, []);
}

function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const raf = useRef<number>(0);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.left = `${e.clientX}px`;
        dotRef.current.style.top = `${e.clientY}px`;
      }
    };
    const animate = () => {
      ringPos.current.x += (pos.current.x - ringPos.current.x) * 0.12;
      ringPos.current.y += (pos.current.y - ringPos.current.y) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.left = `${ringPos.current.x}px`;
        ringRef.current.style.top = `${ringPos.current.y}px`;
      }
      raf.current = requestAnimationFrame(animate);
    };
    document.addEventListener('mousemove', onMove);
    raf.current = requestAnimationFrame(animate);
    return () => {
      document.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="tr-cursor-dot" />
      <div ref={ringRef} className="tr-cursor-ring" />
    </>
  );
}

// ─── NAV ─────────────────────────────────────────────────────────────────────

function Nav() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isDark = pathname === '/join/brand';
  const logoSrc = isDark ? logo10 : logo09;
  const linkClass = isDark ? 'tr-nav-link-light' : 'tr-nav-link';

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 500,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '14px 52px',
    }}>
      <button onClick={() => navigate('/')} style={{ background: 'none', border: 'none', cursor: 'none', padding: 0 }}>
        <img src={logoSrc} alt="The Reals" style={{ width: 88, height: 88, display: 'block' }} />
      </button>
      <div style={{ display: 'flex', alignItems: 'center', gap: 36 }}>
        <button className={linkClass} onClick={() => navigate('/')}>Library</button>
        <button className={linkClass} onClick={() => navigate('/')}>How It Works</button>
        <button className={linkClass}>Contact</button>
        <button
          onClick={() => navigate('/join/creator')}
          style={{
            fontFamily: mono, fontSize: '9px', letterSpacing: '0.18em', textTransform: 'uppercase',
            background: C.red, color: '#fff', border: 'none',
            padding: '10px 20px', cursor: 'none', transition: 'opacity 0.2s',
          }}
        >
          Join Beta
        </button>
      </div>
    </nav>
  );
}

const fadeUp = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } };

function InView({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-60px' }}
      variants={fadeUp}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

// ─── HERO ─────────────────────────────────────────────────────────────────────

function HeroSection() {
  const navigate = useNavigate();
  return (
    <section style={{
      minHeight: '100vh', display: 'grid', gridTemplateRows: '1fr auto',
      padding: '0 52px 52px', position: 'relative', overflow: 'hidden',
      borderBottom: `1px solid ${C.dust}`,
    }}>
      <div className="tr-hero-rules" />

      <div style={{
        display: 'grid', gridTemplateColumns: '1fr 1fr',
        alignItems: 'flex-end', paddingTop: 128, gap: 0,
      }}>
        {/* Left — wordmark + annotation */}
        <div style={{ position: 'relative', paddingBottom: 8 }}>
          <motion.p
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{ fontFamily: mono, fontSize: 9, letterSpacing: '0.28em', textTransform: 'uppercase', color: C.muted, marginBottom: 16 }}
          >
            Beta / Open to Creators
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            style={{ marginBottom: 12 }}
          >
            <img src={wordmark} alt="The Reals" style={{ width: '100%', display: 'block' }} />
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            style={{
              fontFamily: mono, fontStyle: 'italic', fontSize: 11,
              color: C.muted, display: 'inline-block', transform: 'rotate(-1.5deg)',
            }}
          >
            100% human. 0% AI. Ever.
          </motion.p>
        </div>

        {/* Right — statement + CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          style={{ paddingBottom: 8, paddingLeft: 52 }}
        >
          <p style={{
            fontFamily: serif, fontStyle: 'italic', fontWeight: 700,
            fontSize: 'clamp(18px, 2.4vw, 28px)',
            lineHeight: 1.45, color: C.ink2, marginBottom: 40, maxWidth: 440,
          }}>
            The internet is flooding with artificial content.
            We're building the movement to keep it human.
          </p>
          <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
            <button className="tr-btn-primary" onClick={() => navigate('/join/creator')}>Join the Movement</button>
            <button className="tr-btn-ghost" onClick={() => navigate('/')}>How it works</button>
          </div>
        </motion.div>
      </div>

      {/* Stats bar */}
      <motion.div
        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.55 }}
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 48, borderTop: `1px solid ${C.dust}` }}
      >
        <div style={{ display: 'flex', gap: 64 }}>
          {[
            { n: '50', suf: '%',  l: 'Revenue to creators' },
            { n: '0',  suf: '%',  l: 'AI content. Ever.' },
            { n: '1',  suf: 'yr', l: 'Instant license window' },
          ].map(s => (
            <div key={s.l}>
              <div className="tr-stat-num">{s.n}<span style={{ color: C.red }}>{s.suf}</span></div>
              <div className="tr-stat-label">{s.l}</div>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
          {['VML', 'OGILVY', 'T&P', 'HOGARTH'].map(name => (
            <span key={name} style={{ fontFamily: mono, fontSize: 10, fontWeight: 700, letterSpacing: '0.06em', color: C.dust }}>
              {name}
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

// ─── MANIFESTO ───────────────────────────────────────────────────────────────

function ManifestoSection() {
  const navigate = useNavigate();
  return (
    <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: '80vh', borderBottom: `1px solid ${C.dust}` }}>
      <div style={{
        padding: '88px 52px', borderRight: `1px solid ${C.dust}`,
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', bottom: -20, right: -10,
          fontFamily: serif, fontWeight: 800, fontSize: 240,
          color: 'rgba(26,24,20,0.04)', lineHeight: 1,
          pointerEvents: 'none', userSelect: 'none',
        }}>01</div>
        <InView>
          <div className="tr-section-tag">Our Manifesto</div>
          <p style={{
            fontFamily: serif, fontStyle: 'italic',
            fontSize: 'clamp(20px, 2.4vw, 28px)',
            lineHeight: 1.55, color: C.ink2,
          }}>
            In a world of AI-generated ads, we stand with{' '}
            <strong style={{ fontStyle: 'normal', color: C.ink, fontWeight: 700 }}>team human.</strong>
            <br /><br />
            The raw, the shaky, the imperfect.<br />
            The footage that{' '}
            <strong style={{ fontStyle: 'normal', color: C.ink, fontWeight: 700 }}>feels real</strong>
            {' '}for campaigns that actually resonate.
            <br /><br />
            <span style={{ fontStyle: 'normal', color: C.red, fontWeight: 700 }}>Enough of AI slop already.</span>
            <br /><br />
            We don't use AI to fake it.<br />
            We use it to <strong style={{ fontStyle: 'normal', color: C.ink, fontWeight: 700 }}>find</strong> it.
          </p>
          <div style={{ marginTop: 48, display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'flex-start' }}>
            <button className="tr-btn-primary" onClick={() => navigate('/join/creator')}>
              Join The Reals Beta
            </button>
            <p style={{ fontFamily: mono, fontStyle: 'italic', fontSize: 9, letterSpacing: '0.14em', color: C.muted }}>
              Founding creator applications open now
            </p>
          </div>
        </InView>
      </div>

      <div style={{ padding: '88px 52px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: C.paper2 }}>
        <InView delay={0.1}>
          <div style={{ width: '100%' }}>
            <div className="tr-film-frame">
              <div style={{ position: 'relative', zIndex: 2 }}>
                <div style={{
                  width: 72, height: 72, border: '2px solid rgba(255,255,255,0.5)',
                  borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'border-color 0.2s, transform 0.2s',
                }}>
                  <svg width="16" height="18" viewBox="0 0 16 18" fill="none" style={{ marginLeft: 3 }}>
                    <path d="M1 1L15 9L1 17V1Z" fill="white" stroke="white" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
              <div style={{
                position: 'absolute', bottom: 0, left: 20, right: 20,
                padding: '14px 16px', background: 'rgba(227,0,5,0.85)',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between', zIndex: 3,
              }}>
                <span style={{ fontFamily: mono, fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#fff' }}>
                  The Reals — Manifesto
                </span>
                <span style={{ fontFamily: mono, fontSize: 9, letterSpacing: '0.12em', color: 'rgba(255,255,255,0.7)' }}>
                  Coming Soon
                </span>
              </div>
            </div>
          </div>
        </InView>
      </div>
    </section>
  );
}

// ─── MOVEMENT / HOW IT WORKS ─────────────────────────────────────────────────

const features = [
  {
    num: '01',
    title: 'Connect your feed',
    body: "Securely link your Instagram, TikTok, or YouTube via API. We index your existing published content — you don't shoot a single extra frame.",
  },
  {
    num: '02',
    title: 'Pre-clearance in principle',
    body: 'Your content becomes searchable and licensable. You agree in principle — but you review and approve every individual licensing request before it executes. Full control, always.',
  },
  {
    num: '03',
    title: 'A brand finds your footage',
    body: 'When a buyer selects your content, you receive a notification: brand name, usage type, license fee. Accept or decline. Your content, your call.',
  },
  {
    num: '04',
    title: 'Earn passive royalties',
    body: '50% of every license fee, straight to your account via Stripe. No exclusivity. No briefs. No extra content. Just your existing camera roll, working for you.',
    tag: 'Non-exclusive · You keep all rights',
  },
];

function MovementSection() {
  return (
    <section id="how-it-works" style={{ padding: '108px 52px', borderBottom: `1px solid ${C.dust}`, position: 'relative', overflow: 'hidden' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 3fr', gap: 88, alignItems: 'flex-start' }}>
        <div style={{ position: 'sticky', top: 128 }}>
          <InView>
            <div className="tr-section-tag">For Creators</div>
            <h2 style={{ fontFamily: serif, fontWeight: 800, fontSize: 'clamp(56px, 7vw, 96px)', lineHeight: 0.92, color: C.ink, marginTop: 32 }}>
              <span style={{ display: 'block' }}>YOUR</span>
              <span style={{ display: 'block' }}>CAMERA</span>
              <span style={{ display: 'block' }}>ROLL,</span>
              <span style={{ display: 'block', color: C.red, fontStyle: 'italic' }}>earning.</span>
            </h2>
            <p style={{ fontFamily: mono, fontStyle: 'italic', fontSize: 10, color: C.muted, marginTop: 20, display: 'inline-block', transform: 'rotate(-1deg)' }}>
              connect once. earn forever.
            </p>
          </InView>
        </div>
        <div>
          {features.map((f, i) => (
            <InView key={f.num} delay={i * 0.08}>
              <div className="tr-m-card">
                <div style={{ fontFamily: serif, fontWeight: 800, fontSize: 13, color: C.dust, paddingTop: 4 }}>{f.num}</div>
                <div>
                  <h3 style={{ fontFamily: serif, fontWeight: 700, fontSize: 'clamp(18px, 2vw, 22px)', color: C.ink, marginBottom: 10 }}>
                    {f.title}
                  </h3>
                  <p style={{ fontFamily: mono, fontSize: 11, lineHeight: 1.85, color: C.muted }}>{f.body}</p>
                  {f.tag && (
                    <span style={{ display: 'inline-block', marginTop: 14, fontFamily: mono, fontSize: 8, letterSpacing: '0.18em', textTransform: 'uppercase', background: C.red, color: '#fff', padding: '4px 10px' }}>
                      {f.tag}
                    </span>
                  )}
                </div>
              </div>
            </InView>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── JOIN SECTION ─────────────────────────────────────────────────────────────

function JoinSection() {
  const navigate = useNavigate();

  const creatorFeatures = [
    'No uploading, no shooting briefs',
    '50% revenue split — fair and transparent',
    'Non-exclusive — you keep full ownership',
    'Review and approve every request',
    'Founding creator status in the library',
  ];
  const buyerFeatures = [
    'Instant licensing — no clearance lag',
    'Fully indemnified',
    '100% No-AI Guarantee',
    'Fixed pricing — no negotiation friction',
  ];

  return (
    <section id="join-cards" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderBottom: `1px solid ${C.dust}` }}>
      {/* Creator — active */}
      <InView>
        <button
          className="tr-join-card"
          onClick={() => navigate('/join/creator')}
          style={{ textAlign: 'left', width: '100%', background: C.cream, transition: 'background 0.3s' }}
        >
          <div style={{ position: 'absolute', top: -16, right: 24, fontFamily: serif, fontWeight: 800, fontSize: 120, color: 'rgba(26,24,20,0.05)', lineHeight: 1, pointerEvents: 'none', userSelect: 'none' }}>01</div>
          <div style={{ fontFamily: mono, fontSize: 8, letterSpacing: '0.22em', textTransform: 'uppercase', color: C.red, marginBottom: 20 }}>Beta Now Open</div>
          <h2 style={{ fontFamily: serif, fontWeight: 800, fontSize: 'clamp(40px, 5vw, 64px)', lineHeight: 0.92, color: C.ink, marginBottom: 20 }}>
            Join as<br /><em style={{ fontStyle: 'italic', color: C.red }}>Creator</em>
          </h2>
          <p style={{ fontFamily: serif, fontStyle: 'italic', fontSize: 16, color: C.ink2, marginBottom: 28, maxWidth: 360 }}>
            Monetise your camera roll.
          </p>
          <p style={{ fontFamily: mono, fontSize: 11, lineHeight: 1.85, color: C.muted, marginBottom: 32, maxWidth: 360 }}>
            Connect your social feeds and turn your existing footage into passive income. We license your authentic content to top global brands — you do nothing after setup.
          </p>
          <ul style={{ listStyle: 'none', marginBottom: 40 }}>
            {creatorFeatures.map(item => (
              <li key={item} style={{ fontFamily: mono, fontSize: 11, color: C.ink2, padding: '10px 0', borderBottom: `1px solid ${C.dust}`, display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ color: C.red, flexShrink: 0 }}>{'\u2192'}</span>{item}
              </li>
            ))}
          </ul>
          <span className="tr-btn-primary">Connect My Feed</span>
        </button>
      </InView>

      {/* Buyer — coming soon */}
      <InView delay={0.12}>
        <div className="tr-join-card" style={{ textAlign: 'left', width: '100%', opacity: 0.45, pointerEvents: 'none' }}>
          <div style={{ position: 'absolute', top: -16, right: 24, fontFamily: serif, fontWeight: 800, fontSize: 120, color: 'rgba(26,24,20,0.04)', lineHeight: 1, pointerEvents: 'none', userSelect: 'none' }}>02</div>
          <div style={{ display: 'inline-block', fontFamily: mono, fontSize: 8, letterSpacing: '0.22em', textTransform: 'uppercase', color: C.muted, border: `1px solid ${C.dust}`, padding: '4px 10px', marginBottom: 20 }}>
            Coming Soon
          </div>
          <h2 style={{ fontFamily: serif, fontWeight: 800, fontSize: 'clamp(40px, 5vw, 64px)', lineHeight: 0.92, color: C.ink, marginBottom: 20 }}>
            Join as<br /><em style={{ fontStyle: 'italic', color: C.red }}>Buyer</em>
          </h2>
          <p style={{ fontFamily: serif, fontStyle: 'italic', fontSize: 16, color: C.ink2, marginBottom: 28, maxWidth: 360 }}>
            Source authentic footage.
          </p>
          <p style={{ fontFamily: mono, fontSize: 11, lineHeight: 1.85, color: C.muted, marginBottom: 32, maxWidth: 360 }}>
            For creative professionals who need verified, human-created content for commercial use. Search our index of unpolished, legally-cleared video assets.
          </p>
          <ul style={{ listStyle: 'none', marginBottom: 40 }}>
            {buyerFeatures.map(item => (
              <li key={item} style={{ fontFamily: mono, fontSize: 11, color: C.ink2, padding: '10px 0', borderBottom: `1px solid ${C.dust}`, display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ color: C.red, flexShrink: 0 }}>{'\u2192'}</span>{item}
              </li>
            ))}
          </ul>
          <span className="tr-btn-ghost">Notify Me</span>
        </div>
      </InView>
    </section>
  );
}

// ─── COLLECTIONS ─────────────────────────────────────────────────────────────

const collections = [
  { name: 'TRENDING\nTODAY',     sub: 'Updated daily',              tall: true,  tone: '#ddd7cc' },
  { name: 'DAILY RITUALS',       sub: 'Morning · Coffee · Commute', tall: false, tone: '#d6d0c4' },
  { name: 'MILLENNIAL\nMOMENTS', sub: 'Real life · Real people',    tall: false, tone: '#cfc8ba' },
  { name: 'GET READY\nWITH ME',  sub: 'Lifestyle · Wellness',       tall: false, tone: '#c8c0b0' },
  { name: 'WELLNESS\n& SPORT',   sub: 'Gym · Running · Yoga',       tall: false, tone: '#d2ccbc' },
  { name: 'EAT\n& DRINK',        sub: 'Cooking · Restaurants',      tall: false, tone: '#e0dbd0' },
  { name: 'CHAOS &\nNIGHTLIFE',  sub: 'Parties · Friends · Crowds', tall: false, tone: '#cac3b2' },
];

function CollectionsSection() {
  return (
    <section id="collections" style={{ padding: '80px 52px', borderBottom: `1px solid ${C.dust}` }}>
      <InView>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', alignItems: 'flex-end', marginBottom: 56 }}>
          <div>
            <div className="tr-section-tag">The Library</div>
            <h2 style={{ fontFamily: serif, fontWeight: 800, fontSize: 'clamp(48px, 6vw, 80px)', lineHeight: 0.92, color: C.ink }}>
              CURATED<br /><span style={{ color: C.red }}>COLLECTIONS</span>
            </h2>
          </div>
          <p style={{ fontFamily: serif, fontStyle: 'italic', fontSize: 16, color: C.muted, lineHeight: 1.65, maxWidth: 320, alignSelf: 'flex-end' }}>
            Real footage from real people — indexed, curated, and ready to license in minutes.
          </p>
        </div>
      </InView>
      <InView delay={0.1}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gridTemplateRows: 'auto auto', gap: 2 }}>
          {collections.map((c, i) => (
            <div key={i} className={`tr-coll-tile${c.tall ? ' tall' : ''}`} style={{ background: c.tone }}>
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(160deg, rgba(26,24,20,0) 30%, rgba(26,24,20,0.55) 100%)' }} />
              <div style={{ position: 'relative', zIndex: 2, padding: '20px 18px' }}>
                <div style={{ fontFamily: serif, fontWeight: 800, fontSize: 18, color: C.ink, lineHeight: 1.1, whiteSpace: 'pre-line', mixBlendMode: 'multiply' as const }}>{c.name}</div>
                <div style={{ fontFamily: mono, fontSize: 8, letterSpacing: '0.14em', textTransform: 'uppercase' as const, color: C.muted, marginTop: 4 }}>{c.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </InView>
    </section>
  );
}

// ─── RATES ────────────────────────────────────────────────────────────────────

function RatesSection() {
  const navigate = useNavigate();
  return (
    <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderBottom: `1px solid ${C.dust}` }}>
      <div style={{ padding: '80px 52px', borderRight: `1px solid ${C.dust}`, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <InView>
          <div className="tr-section-tag">Your Earnings</div>
          <h2 style={{ fontFamily: serif, fontWeight: 800, fontSize: 'clamp(48px, 5.5vw, 72px)', lineHeight: 0.92, color: C.ink, marginBottom: 24 }}>
            SIMPLE.<br /><span style={{ color: C.red }}>FAIR.</span><br />FIXED.
          </h2>
          <p style={{ fontFamily: serif, fontStyle: 'italic', fontSize: 17, color: C.muted, lineHeight: 1.65, maxWidth: 380, marginBottom: 32 }}>
            No negotiations, no hidden fees, no surprises. You know exactly what you'll earn before you accept any request.
          </p>
          <div style={{ fontFamily: mono, fontSize: 10, lineHeight: 1.9, color: C.muted, paddingTop: 20, borderTop: `1px solid ${C.dust}` }}>
            Non-exclusive — you keep full ownership and posting freedom.<br />
            The same clip can be sold again and again.<br />
            Profiles with Pre-Agreed Rates are prioritised in search.
          </div>
        </InView>
      </div>

      <div style={{ padding: '80px 52px', background: C.paper2, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <InView delay={0.1}>
          <div className="tr-rate-block" style={{ marginBottom: 16 }}>
            <div style={{ fontFamily: mono, fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: C.muted, marginBottom: 8 }}>
              Organic Social Use — Your Share
            </div>
            <div style={{ fontFamily: serif, fontWeight: 800, fontSize: 52, color: C.ink, lineHeight: 1 }}>
              <sup style={{ fontSize: 22, verticalAlign: 'super' }}>£</sup>149
              <small style={{ fontSize: 14, fontFamily: mono, color: C.muted, fontWeight: 300 }}> per clip</small>
            </div>
            <div style={{ fontFamily: mono, fontSize: 10, color: C.muted, marginTop: 8, lineHeight: 1.7 }}>
              Brand's Instagram/TikTok feed, internal decks, website. 1-year non-exclusive license.
            </div>
          </div>
          <div className="tr-rate-block" style={{ marginBottom: 24 }}>
            <div style={{ fontFamily: mono, fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: C.muted, marginBottom: 8 }}>
              Paid Media Use — Your Share
            </div>
            <div style={{ fontFamily: serif, fontWeight: 800, fontSize: 52, color: C.ink, lineHeight: 1 }}>
              <sup style={{ fontSize: 22, verticalAlign: 'super' }}>£</sup>499
              <small style={{ fontSize: 14, fontFamily: mono, color: C.muted, fontWeight: 300 }}> per clip</small>
            </div>
            <div style={{ fontFamily: mono, fontSize: 10, color: C.muted, marginTop: 8, lineHeight: 1.7 }}>
              Sponsored ads on Meta/TikTok/YouTube. 1-year non-exclusive license.
            </div>
          </div>
          <button className="tr-btn-primary" onClick={() => navigate('/join/creator')}>
            Apply as Founding Creator
          </button>
        </InView>
      </div>
    </section>
  );
}

// ─── TESTIMONIALS ─────────────────────────────────────────────────────────────

const testimonials = [
  { quote: "It's like Getty, but for social. We sourced and licensed 9 clips for a major campaign within 48 hours — and came in significantly under budget.", name: 'Madhavi U.', role: 'Client Partner, Ogilvy UK' },
  { quote: "What used to take weeks was done in two days. Finally, a streamlined approach to creator outreach. Our project margins are looking much healthier.", name: 'Elizabeth J.', role: 'WPP Productions Business Affairs' },
  { quote: "For a researcher, this tool is a lifesaver. Instead of a messy list of links, I can finally supply organised, client-ready collections.", name: 'Christian G.', role: 'Freelance Researcher' },
  { quote: "I can test pre-licensed clips in my edits immediately, without the fear of rights issues killing the idea later.", name: 'Marco B.', role: 'VML' },
  { quote: "I love that The Reals shares 50% with me. It's totally passive — I just keep creating and being myself.", name: 'Raquel D.', role: 'Founding Creator' },
];

function TestimonialsSection() {
  const navigate = useNavigate();
  return (
    <section style={{ padding: '80px 52px', borderBottom: `1px solid ${C.dust}` }}>
      <InView>
        <div className="tr-section-tag">What People Are Saying</div>
      </InView>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2 }}>
        {testimonials.map((t, i) => (
          <InView key={i} delay={i * 0.06}>
            <div className="tr-testi" style={{ minHeight: 260 }}>
              <div style={{ fontFamily: serif, fontWeight: 800, fontSize: 72, color: C.red, opacity: 0.15, position: 'absolute', top: 8, left: 20, lineHeight: 1 }}>
                "
              </div>
              <p style={{ fontFamily: mono, fontSize: 11, lineHeight: 1.85, color: C.ink2, marginBottom: 24 }}>
                {t.quote}
              </p>
              <div style={{ fontFamily: mono, fontSize: 10, letterSpacing: '0.1em', color: C.muted }}>
                <strong style={{ display: 'block', color: C.ink, fontWeight: 400, marginBottom: 2 }}>{t.name}</strong>
                {t.role}
              </div>
            </div>
          </InView>
        ))}
        {/* Dark CTA card */}
        <InView delay={testimonials.length * 0.06}>
          <div style={{
            background: C.ink, padding: '36px 28px',
            display: 'flex', flexDirection: 'column', justifyContent: 'center',
            alignItems: 'flex-start', gap: 24, minHeight: 260,
            border: `1px solid ${C.ink}`,
          }}>
            <p style={{ fontFamily: serif, fontStyle: 'italic', fontWeight: 400, fontSize: 20, color: '#fff', lineHeight: 1.4 }}>
              Want to be one of our founding creators?
            </p>
            <button className="tr-btn-primary" onClick={() => navigate('/join/creator')}>
              Apply Now
            </button>
          </div>
        </InView>
      </div>
    </section>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────

function Footer() {
  const navigate = useNavigate();
  return (
    <footer style={{ borderTop: `1px solid ${C.dust}` }}>
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: 64, padding: '64px 52px 48px', borderBottom: `1px solid ${C.dust}` }}>
        <div>
          <button onClick={() => navigate('/')} style={{ background: 'none', border: 'none', cursor: 'none', padding: 0, marginBottom: 20, display: 'block' }}>
            <img src={logo09} alt="The Reals" style={{ width: 52, height: 52 }} />
          </button>
          <p style={{ fontFamily: mono, fontSize: 10, color: C.muted, lineHeight: 1.9, maxWidth: 360 }}>
            The indexed library of licenced, authentic, creator-led social content. 100% human. 0% AI. Ever.
          </p>
        </div>
        <div>
          <div style={{ fontFamily: mono, fontSize: 8, letterSpacing: '0.22em', textTransform: 'uppercase', color: C.dust, marginBottom: 20 }}>Company</div>
          {['About', 'Technology', 'Contact'].map(l => <button key={l} className="tr-footer-link">{l}</button>)}
        </div>
        <div>
          <div style={{ fontFamily: mono, fontSize: 8, letterSpacing: '0.22em', textTransform: 'uppercase', color: C.dust, marginBottom: 20 }}>Legal</div>
          {['Terms of Service', 'Privacy Policy', 'Creator Guide'].map(l => <button key={l} className="tr-footer-link">{l}</button>)}
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 52px' }}>
        <span style={{ fontFamily: mono, fontSize: 9, color: C.dust, letterSpacing: '0.1em' }}>&copy; 2026 The Reals. All rights reserved.</span>
        <span style={{ fontFamily: mono, fontSize: 9, color: C.dust, letterSpacing: '0.1em' }}>Built by humans. For humans.</span>
      </div>
    </footer>
  );
}

// ─── PAGES ────────────────────────────────────────────────────────────────────

function LandingPage() {
  return (
    <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
      <HeroSection />
      <ManifestoSection />
      <MovementSection />
      <JoinSection />
      <CollectionsSection />
      <RatesSection />
      <TestimonialsSection />
      <Footer />
    </motion.div>
  );
}

function CreatorJoinPage() {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', handle: '', category: '' });

  return (
    <motion.div key="creator" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }} style={{ minHeight: '100vh', background: C.paper }}>
      <div style={{ maxWidth: 880, margin: '0 auto', padding: '140px 52px 100px' }}>
        <button className="tr-nav-link" onClick={() => navigate('/')} style={{ marginBottom: 52, display: 'flex', alignItems: 'center', gap: 8 }}>
          Back to The Reals
        </button>

        {!submitted ? (
          <>
            <InView>
              <div className="tr-section-tag">Creator Beta Application</div>
              <h1 style={{ fontFamily: serif, fontWeight: 800, fontSize: 'clamp(52px, 7vw, 96px)', lineHeight: 0.9, color: C.ink, marginBottom: 40 }}>
                Join as a<br /><em style={{ fontStyle: 'italic', color: C.red }}>Creator.</em>
              </h1>
            </InView>

            <InView delay={0.1}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, marginBottom: 72, paddingBottom: 72, borderBottom: `1px solid ${C.dust}` }}>
                <div>
                  <p style={{ fontFamily: mono, fontSize: 13, lineHeight: 1.85, color: C.ink2, marginBottom: 20 }}>
                    The Reals is the indexed library of human-made social footage, licensed to brands and agencies at fixed prices. You connect your feed once — we do the rest.
                  </p>
                  <p style={{ fontFamily: mono, fontSize: 11, lineHeight: 1.85, color: C.muted, marginBottom: 16 }}>
                    There are no briefs, no deadlines, no exclusivity. When a buyer selects your content, you decide. Accept or decline every request. 50% of the license fee goes straight to you via Stripe.
                  </p>
                  <p style={{ fontFamily: mono, fontSize: 11, lineHeight: 1.85, color: C.muted }}>
                    Founding creators get prioritised placement in buyer search results and a rate card that never changes.
                  </p>
                </div>
                <div>
                  {[
                    { n: '01', t: 'Apply', b: 'Tell us about yourself and your feed. No pitch deck, no follower minimum.' },
                    { n: '02', t: 'Connect your feed', b: 'Link your Instagram, TikTok, or YouTube securely via API. We only read — we never post.' },
                    { n: '03', t: 'Earn', b: 'Your existing content starts earning passive royalties. No extra effort required.' },
                  ].map(step => (
                    <div key={step.n} style={{ display: 'flex', gap: 20, marginBottom: 28 }}>
                      <div style={{ fontFamily: serif, fontWeight: 800, fontSize: 13, color: C.red, paddingTop: 2, flexShrink: 0 }}>{step.n}</div>
                      <div>
                        <div style={{ fontFamily: serif, fontWeight: 700, fontSize: 15, color: C.ink, marginBottom: 6 }}>{step.t}</div>
                        <div style={{ fontFamily: mono, fontSize: 11, lineHeight: 1.85, color: C.muted }}>{step.b}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </InView>

            <InView delay={0.15}>
              <form onSubmit={e => { e.preventDefault(); setSubmitted(true); }}>
                <div className="tr-section-tag" style={{ marginBottom: 40 }}>Your Application</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 48px' }}>
                  <div>
                    <label className="tr-form-label">Full Name</label>
                    <input className="tr-input" type="text" placeholder="Your name" required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
                  </div>
                  <div>
                    <label className="tr-form-label">Email Address</label>
                    <input className="tr-input" type="email" placeholder="your@email.com" required value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
                  </div>
                  <div>
                    <label className="tr-form-label">Primary Social Handle</label>
                    <input className="tr-input" type="text" placeholder="@yourhandle" required value={form.handle} onChange={e => setForm(f => ({ ...f, handle: e.target.value }))} />
                  </div>
                  <div>
                    <label className="tr-form-label">Content Category</label>
                    <select className="tr-select" required value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}>
                      <option value="" disabled>Select a category</option>
                      <option value="daily-rituals">Daily Rituals</option>
                      <option value="wellness">Wellness &amp; Sport</option>
                      <option value="food">Eat &amp; Drink</option>
                      <option value="travel">Travel &amp; Outdoors</option>
                      <option value="work">Modern Work</option>
                      <option value="nightlife">Chaos &amp; Nightlife</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
                <div style={{ marginTop: 48 }}>
                  <button type="submit" className="tr-btn-primary">Connect My Feed</button>
                  <p style={{ fontFamily: mono, fontSize: 10, color: C.muted, marginTop: 16 }}>
                    Applications reviewed within 48 hours. Founding creator status available now.
                  </p>
                </div>
              </form>
            </InView>
          </>
        ) : (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} style={{ paddingTop: 40 }}>
            <div style={{ display: 'inline-block', background: C.red, color: '#fff', fontFamily: mono, fontSize: 8, letterSpacing: '0.22em', textTransform: 'uppercase', padding: '5px 12px', marginBottom: 32 }}>
              Application Received
            </div>
            <h2 style={{ fontFamily: serif, fontWeight: 800, fontSize: 'clamp(48px, 6vw, 80px)', lineHeight: 0.92, color: C.ink, marginBottom: 24 }}>
              You're In.
            </h2>
            <p style={{ fontFamily: mono, fontSize: 14, lineHeight: 1.9, color: C.ink2, maxWidth: 440, marginBottom: 16 }}>
              Welcome to The Reals founding creator community.
            </p>
            <p style={{ fontFamily: mono, fontSize: 11, lineHeight: 1.85, color: C.muted, maxWidth: 420, marginBottom: 40 }}>
              Your application is received. We're reviewing your feed and will be in touch within 48 hours with your Founding Creator onboarding pack.
            </p>
            <button className="tr-btn-ghost" onClick={() => navigate('/')}>Back to The Reals</button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

// ─── BUYER JOIN PAGE ──────────────────────────────────────────────────────────

const buyerInputStyle: React.CSSProperties = {
  display: 'block', width: '100%', fontFamily: mono, fontSize: 11,
  background: 'transparent', border: 'none',
  borderBottom: '1px solid rgba(246,245,241,0.15)',
  padding: '14px 0', color: '#f6f5f1', outline: 'none',
};
const buyerLabelStyle: React.CSSProperties = {
  display: 'block', fontFamily: mono, fontSize: 8, letterSpacing: '0.22em',
  textTransform: 'uppercase', color: 'rgba(246,245,241,0.35)', marginBottom: 4, marginTop: 28,
};

function BuyerJoinPage() {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ company: '', contact: '', email: '', useCase: '' });

  return (
    <motion.div key="buyer" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }} style={{ minHeight: '100vh', background: C.ink }}>
      <div style={{ maxWidth: 880, margin: '0 auto', padding: '140px 52px 100px' }}>
        <button className="tr-nav-link-light" onClick={() => navigate('/')} style={{ marginBottom: 52, display: 'flex', alignItems: 'center', gap: 8 }}>
          Back to The Reals
        </button>

        {!submitted ? (
          <>
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
              <div style={{ fontFamily: mono, fontSize: 9, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(246,245,241,0.45)', display: 'flex', alignItems: 'center', gap: 12, marginBottom: 40 }}>
                <span style={{ display: 'block', width: 32, height: 1, background: C.red, flexShrink: 0 }} />
                For Buyers
              </div>
              <h1 style={{ fontFamily: serif, fontWeight: 800, fontSize: 'clamp(52px, 7vw, 96px)', lineHeight: 0.9, color: C.white, marginBottom: 40 }}>
                License<br /><em style={{ fontStyle: 'italic', color: C.red }}>Footage.</em>
              </h1>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, marginBottom: 72, paddingBottom: 72, borderBottom: '1px solid rgba(246,245,241,0.1)' }}>
                <div>
                  <p style={{ fontFamily: mono, fontSize: 13, lineHeight: 1.85, color: 'rgba(246,245,241,0.7)', marginBottom: 20 }}>
                    The Reals is a pre-cleared library of authentic, human-made social content. Search, select, and license in minutes — no sourcing lag, no rights surprises.
                  </p>
                  <p style={{ fontFamily: mono, fontSize: 11, lineHeight: 1.85, color: 'rgba(246,245,241,0.4)' }}>
                    Every asset is verified human-made. Full legal indemnification included. Fixed pricing. 1-year non-exclusive license. If you need something custom, our managed service team handles Tier 2 requests.
                  </p>
                </div>
                <div>
                  {[
                    { n: '01', t: 'Search the library', b: 'Browse curated collections or search by category, style, and usage type. Every asset is pre-cleared at source.' },
                    { n: '02', t: 'Select and license', b: 'Choose your clip and usage tier. Fixed pricing, no negotiation. Full indemnification included.' },
                    { n: '03', t: 'Campaign goes live', b: 'Instant license window. Your campaign is cleared and ready to run — no lag, no surprises.' },
                  ].map(step => (
                    <div key={step.n} style={{ display: 'flex', gap: 20, marginBottom: 28 }}>
                      <div style={{ fontFamily: serif, fontWeight: 800, fontSize: 13, color: C.red, paddingTop: 2, flexShrink: 0 }}>{step.n}</div>
                      <div>
                        <div style={{ fontFamily: serif, fontWeight: 700, fontSize: 15, color: C.white, marginBottom: 6 }}>{step.t}</div>
                        <div style={{ fontFamily: mono, fontSize: 11, lineHeight: 1.85, color: 'rgba(246,245,241,0.4)' }}>{step.b}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}>
              <form onSubmit={e => { e.preventDefault(); setSubmitted(true); }}>
                <div style={{ fontFamily: mono, fontSize: 9, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(246,245,241,0.45)', display: 'flex', alignItems: 'center', gap: 12, marginBottom: 40 }}>
                  <span style={{ display: 'block', width: 32, height: 1, background: C.red, flexShrink: 0 }} />
                  Licensing Enquiry
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 48px' }}>
                  <div>
                    <label style={buyerLabelStyle}>Company Name</label>
                    <input style={buyerInputStyle} type="text" placeholder="Your company" required value={form.company} onChange={e => setForm(f => ({ ...f, company: e.target.value }))} />
                  </div>
                  <div>
                    <label style={buyerLabelStyle}>Contact Name</label>
                    <input style={buyerInputStyle} type="text" placeholder="Your name" required value={form.contact} onChange={e => setForm(f => ({ ...f, contact: e.target.value }))} />
                  </div>
                  <div>
                    <label style={buyerLabelStyle}>Email Address</label>
                    <input style={buyerInputStyle} type="email" placeholder="your@company.com" required value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
                  </div>
                  <div>
                    <label style={buyerLabelStyle}>Usage Intent</label>
                    <select style={{ ...buyerInputStyle, appearance: 'none', cursor: 'none' } as React.CSSProperties} required value={form.useCase} onChange={e => setForm(f => ({ ...f, useCase: e.target.value }))}>
                      <option value="" disabled style={{ background: C.ink }}>Select usage type</option>
                      <option value="organic-social" style={{ background: C.ink }}>Organic Social</option>
                      <option value="paid-media" style={{ background: C.ink }}>Paid Media</option>
                      <option value="both" style={{ background: C.ink }}>Both</option>
                      <option value="other" style={{ background: C.ink }}>Other</option>
                    </select>
                  </div>
                </div>
                <div style={{ marginTop: 48 }}>
                  <button type="submit" style={{ display: 'inline-block', fontFamily: mono, fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', background: C.red, color: '#fff', border: 'none', padding: '15px 32px', cursor: 'none', transition: 'opacity 0.2s' }}>
                    Send Enquiry
                  </button>
                  <p style={{ fontFamily: mono, fontSize: 10, color: 'rgba(246,245,241,0.3)', marginTop: 16 }}>
                    Licensing enquiries reviewed within 2 working days.
                  </p>
                </div>
              </form>
            </motion.div>
          </>
        ) : (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} style={{ paddingTop: 40 }}>
            <div style={{ display: 'inline-block', background: C.red, color: '#fff', fontFamily: mono, fontSize: 8, letterSpacing: '0.22em', textTransform: 'uppercase', padding: '5px 12px', marginBottom: 32 }}>
              Enquiry Received
            </div>
            <h2 style={{ fontFamily: serif, fontWeight: 800, fontSize: 'clamp(48px, 6vw, 80px)', lineHeight: 0.92, color: C.white, marginBottom: 32 }}>
              We'll be<br /><em style={{ fontStyle: 'italic', color: C.red }}>in touch.</em>
            </h2>
            <p style={{ fontFamily: mono, fontSize: 14, lineHeight: 1.9, color: 'rgba(246,245,241,0.6)', maxWidth: 460, marginBottom: 40 }}>
              Thank you, {form.contact?.split(' ')[0] || 'there'}. A member of our team will respond to your licensing enquiry within 2 working days.
            </p>
            <button
              onClick={() => navigate('/')}
              style={{ fontFamily: mono, fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', background: 'transparent', color: 'rgba(246,245,241,0.45)', border: '1px solid rgba(246,245,241,0.2)', padding: '14px 24px', cursor: 'none' }}
            >
              Back to The Reals
            </button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

// ─── ROOT ──────────────────────────────────────────────────────────────────────

export default function TheRealsLanding() {
  useGlobalStyles();
  return (
    <MemoryRouter>
      <div className="tr-root">
        <div className="tr-grain" />
        <Cursor />
        <Nav />
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/join/creator" element={<CreatorJoinPage />} />
            <Route path="/join/brand" element={<BuyerJoinPage />} />
          </Routes>
        </AnimatePresence>
      </div>
    </MemoryRouter>
  );
}
