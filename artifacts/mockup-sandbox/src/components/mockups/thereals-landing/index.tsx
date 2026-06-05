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
import logo08 from '@assets/thereals_logos-08_1780690102828.svg';

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
        transition: transform 0.1s, width 0.15s, height 0.15s;
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
        transition: width 0.25s, height 0.25s, opacity 0.2s;
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
        transition: background 0.2s, transform 0.15s;
      }
      .tr-btn-primary:hover {
        background: ${C.red};
        opacity: 0.88;
        transform: translateY(-1px);
      }
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
      .tr-btn-ghost:hover {
        border-color: ${C.ink2};
        color: ${C.ink};
      }

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
        width: 32px;
        height: 1px;
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
        display: block;
        width: 100%;
        font-family: ${body};
        font-size: 14px;
        background: transparent;
        border: none;
        border-bottom: 1px solid ${C.dust};
        padding: 14px 0;
        color: ${C.ink};
        outline: none;
        transition: border-color 0.2s;
      }
      .tr-input:focus { border-bottom-color: ${C.red}; }
      .tr-input::placeholder { color: ${C.dust}; }

      .tr-select {
        display: block;
        width: 100%;
        font-family: ${body};
        font-size: 14px;
        background: transparent;
        border: none;
        border-bottom: 1px solid ${C.dust};
        padding: 14px 0;
        color: ${C.ink};
        outline: none;
        appearance: none;
        cursor: none;
        transition: border-color 0.2s;
      }
      .tr-select:focus { border-bottom-color: ${C.red}; }

      .tr-form-label {
        display: block;
        font-family: ${mono};
        font-size: 8px;
        letter-spacing: 0.22em;
        text-transform: uppercase;
        color: ${C.muted};
        margin-bottom: 4px;
        margin-top: 28px;
      }

      .tr-m-card {
        padding: 36px 0;
        border-top: 1px solid ${C.dust};
        display: grid;
        grid-template-columns: 52px 1fr;
        gap: 24px;
        align-items: start;
      }
      .tr-m-card:last-child { border-bottom: 1px solid ${C.dust}; }

      .tr-join-card {
        padding: 72px 52px;
        border-right: 1px solid ${C.dust};
        position: relative;
        overflow: hidden;
        cursor: none;
        transition: background 0.3s;
      }
      .tr-join-card:last-child { border-right: none; }
      .tr-join-card:hover { background: ${C.cream}; }

      .tr-nav-link {
        font-family: ${mono};
        font-size: 9px;
        letter-spacing: 0.2em;
        text-transform: uppercase;
        color: ${C.muted};
        text-decoration: none;
        cursor: none;
        background: none;
        border: none;
        transition: color 0.2s;
      }
      .tr-nav-link:hover { color: ${C.ink}; }
      .tr-nav-link-light {
        font-family: ${mono};
        font-size: 9px;
        letter-spacing: 0.2em;
        text-transform: uppercase;
        color: rgba(246,245,241,0.4);
        text-decoration: none;
        cursor: none;
        background: none;
        border: none;
        transition: color 0.2s;
      }
      .tr-nav-link-light:hover { color: rgba(246,245,241,0.9); }

      .tr-film-frame {
        width: 100%;
        aspect-ratio: 16/9;
        background: ${C.ink};
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
      }
      .tr-film-frame::before,
      .tr-film-frame::after {
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
      .tr-film-frame::after { right: 0; }

      .tr-stat-num {
        font-family: ${serif};
        font-weight: 800;
        font-size: 36px;
        color: ${C.ink};
        line-height: 1;
        margin-bottom: 6px;
      }
      .tr-stat-label {
        font-family: ${mono};
        font-size: 8px;
        letter-spacing: 0.2em;
        text-transform: uppercase;
        color: ${C.muted};
      }
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
      <button
        onClick={() => navigate('/')}
        style={{ background: 'none', border: 'none', cursor: 'none', padding: 0 }}
      >
        <img
          src={logoSrc}
          alt="The Reals"
          style={{
            width: 88,
            height: 88,
            display: 'block',
          }}
        />
      </button>
      <div style={{ display: 'flex', alignItems: 'center', gap: 36 }}>
        <button className={linkClass} onClick={() => navigate('/join/creator')}>Creators</button>
        <button className={linkClass} onClick={() => navigate('/join/brand')}>Brands</button>
        <button className={linkClass}>About</button>
        <button
          onClick={() => navigate('/join/creator')}
          style={{
            fontFamily: mono, fontSize: '9px', letterSpacing: '0.18em',
            textTransform: 'uppercase',
            background: C.red, color: '#fff', border: 'none',
            padding: '10px 20px', cursor: 'none',
            transition: 'background 0.2s',
          }}
        >
          Apply for Beta
        </button>
      </div>
    </nav>
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

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

function HeroSection() {
  const navigate = useNavigate();
  return (
    <section style={{
      minHeight: '100vh',
      display: 'grid',
      gridTemplateRows: '1fr auto',
      padding: '0 52px 52px',
      position: 'relative',
      overflow: 'hidden',
      borderBottom: `1px solid ${C.dust}`,
    }}>
      <div className="tr-hero-rules" />

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        alignItems: 'flex-end',
        paddingTop: 128,
        gap: 0,
      }}>
        <div style={{ position: 'relative', paddingBottom: 8 }}>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{
              fontFamily: mono, fontSize: 9, letterSpacing: '0.28em',
              textTransform: 'uppercase', color: C.muted, marginBottom: 28,
            }}
          >
            Beta / Open to Creators
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <div style={{
              overflow: 'hidden',
              width: '100%',
              height: 'clamp(140px, 18vw, 260px)',
              position: 'relative',
              marginBottom: 24,
            }}>
              <img
                src={logo08}
                alt="The Reals wordmark"
                style={{
                  width: '115%',
                  display: 'block',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  transformOrigin: 'top left',
                }}
              />
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            style={{
              fontFamily: body, fontSize: 13, color: C.muted,
              marginTop: 8, lineHeight: 1.5,
            }}
          >
            where authentic Creators meet brands that deserve them
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          style={{ paddingBottom: 8, paddingLeft: 52 }}
        >
          <p style={{
            fontFamily: body, fontWeight: 500,
            fontSize: 'clamp(17px, 2vw, 22px)',
            lineHeight: 1.55, color: C.ink2, marginBottom: 36, maxWidth: 440,
          }}>
            The platform built for Creators who refuse to compromise. Authentic storytelling. Real partnerships. Audiences that trust you.
          </p>

          <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
            <button className="tr-btn-primary" onClick={() => navigate('/join/creator')}>
              Join as a Creator
            </button>
            <button className="tr-btn-ghost" onClick={() => navigate('/join/brand')}>
              For Brands
            </button>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.55 }}
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          paddingTop: 48, borderTop: `1px solid ${C.dust}`,
        }}
      >
        <div style={{ display: 'flex', gap: 64 }}>
          {[
            { n: '2,400+', l: 'Creators Waitlisted' },
            { n: '48', l: 'Brand Partners' },
            { n: 'Q3 2026', l: 'Beta Launch' },
          ].map(s => (
            <div key={s.l}>
              <div className="tr-stat-num">{s.n}</div>
              <div className="tr-stat-label">{s.l}</div>
            </div>
          ))}
        </div>
        <p style={{
          fontFamily: mono, fontSize: 9, letterSpacing: '0.16em',
          color: C.dust, textTransform: 'uppercase',
        }}>
          Applications open now
        </p>
      </motion.div>
    </section>
  );
}

function ManifestoSection() {
  const navigate = useNavigate();
  return (
    <section style={{
      display: 'grid', gridTemplateColumns: '1fr 1fr',
      minHeight: '80vh', borderBottom: `1px solid ${C.dust}`,
    }}>
      <div style={{
        padding: '88px 52px', borderRight: `1px solid ${C.dust}`,
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', bottom: -20, right: -10,
          fontFamily: serif, fontWeight: 800,
          fontSize: 240, color: 'rgba(26,24,20,0.035)', lineHeight: 1,
          pointerEvents: 'none', userSelect: 'none',
        }}>01</div>
        <InView>
          <div className="tr-section-tag">Manifesto</div>
          <p style={{
            fontFamily: body, fontWeight: 400,
            fontSize: 'clamp(17px, 2vw, 21px)',
            lineHeight: 1.7, color: C.ink2,
          }}>
            We believe <strong style={{ color: C.ink, fontWeight: 600 }}>authentic Creators</strong> deserve more than algorithms and diminishing returns.{' '}
            <span style={{ color: C.red, fontWeight: 600 }}>The Reals&#8482;</span> is the platform that puts the relationship between Creator and audience first, and finds brands that honour that.
          </p>
          <div style={{ marginTop: 48, display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'flex-start' }}>
            <button className="tr-btn-primary" onClick={() => navigate('/join/creator')}>
              Apply for Beta
            </button>
            <p style={{ fontFamily: body, fontSize: 12, color: C.muted }}>
              Beta access is limited. Applications reviewed individually.
            </p>
          </div>
        </InView>
      </div>

      <div style={{ padding: '88px 52px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: C.paper2 }}>
        <InView delay={0.1}>
          <div style={{ width: '100%' }}>
            <div className="tr-film-frame">
              <div style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
                <div style={{
                  width: 72, height: 72, border: '2px solid rgba(255,255,255,0.4)',
                  borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 16px',
                }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M8 5l11 7-11 7V5z" fill="rgba(255,255,255,0.7)" />
                  </svg>
                </div>
                <p style={{ fontFamily: mono, fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)' }}>
                  Manifesto Film
                </p>
              </div>
              <div style={{
                position: 'absolute', bottom: 0, left: 20, right: 20,
                padding: '14px 16px',
                background: `rgba(227,0,5,0.85)`,
                display: 'flex', alignItems: 'center', justifyContent: 'space-between', zIndex: 3,
              }}>
                <span style={{ fontFamily: mono, fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#fff' }}>
                  Coming Soon
                </span>
                <span style={{ fontFamily: mono, fontSize: 9, color: 'rgba(255,255,255,0.6)' }}>00:00</span>
              </div>
            </div>
            <p style={{ fontFamily: body, fontSize: 12, color: C.muted, marginTop: 16 }}>
              The Reals manifesto film, in production
            </p>
          </div>
        </InView>
      </div>
    </section>
  );
}

const features = [
  { num: '01', title: 'Curated Brand Matching', body: 'We connect Creators with brands whose values align with yours. No cold outreach, no race to the bottom on rates. Every brand on The Reals has been vetted for authentic partnership potential.', tag: 'For Creators' },
  { num: '02', title: 'Transparent Deal Flow', body: 'Clear briefs, fair rates, honest timelines. Every campaign on The Reals comes with full transparency on deliverables, creative freedom, and commercial terms before you commit.', tag: 'Deal Structure' },
  { num: '03', title: 'Audience-First Analytics', body: 'Track what your audience actually responds to. Engagement quality over vanity metrics. Help brands understand the difference between reach and real influence.', tag: 'Intelligence' },
  { num: '04', title: 'A Community of Reals', body: 'Access a private network of Creators who take their craft seriously. Peer review, shared learnings, and a collective voice strong enough to set new industry standards.', tag: 'Community' },
];

function MovementSection() {
  return (
    <section style={{
      padding: '108px 52px', borderBottom: `1px solid ${C.dust}`,
      position: 'relative', overflow: 'hidden',
    }}>
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 3fr', gap: 88, alignItems: 'flex-start' }}>
        <div style={{ position: 'sticky', top: 128 }}>
          <InView>
            <div className="tr-section-tag">How It Works</div>
            <h2 style={{
              fontFamily: serif, fontWeight: 800,
              fontSize: 'clamp(52px, 6.5vw, 88px)',
              lineHeight: 0.92, color: C.ink, marginTop: 32,
            }}>
              <span style={{ display: 'block' }}>The</span>
              <span style={{ display: 'block', color: C.red }}>Move-</span>
              <span style={{ display: 'block' }}>ment.</span>
            </h2>
            <p style={{ fontFamily: body, fontSize: 13, color: C.muted, marginTop: 24 }}>
              Built for Creators, not algorithms
            </p>
          </InView>
        </div>
        <div>
          {features.map((f, i) => (
            <InView key={f.num} delay={i * 0.08}>
              <div className="tr-m-card">
                <div style={{ fontFamily: serif, fontWeight: 800, fontSize: 13, color: C.dust, paddingTop: 4 }}>
                  {f.num}
                </div>
                <div>
                  <h3 style={{ fontFamily: serif, fontWeight: 700, fontSize: 'clamp(17px, 1.8vw, 21px)', color: C.ink, marginBottom: 10 }}>
                    {f.title}
                  </h3>
                  <p style={{ fontFamily: body, fontSize: 14, lineHeight: 1.75, color: C.muted }}>
                    {f.body}
                  </p>
                  <span style={{ display: 'inline-block', marginTop: 14, fontFamily: mono, fontSize: 8, letterSpacing: '0.18em', textTransform: 'uppercase', background: C.red, color: '#fff', padding: '4px 10px' }}>
                    {f.tag}
                  </span>
                </div>
              </div>
            </InView>
          ))}
        </div>
      </div>
    </section>
  );
}

function JoinSection() {
  const navigate = useNavigate();
  return (
    <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderBottom: `1px solid ${C.dust}` }}>
      <InView>
        <button
          className="tr-join-card"
          onClick={() => navigate('/join/creator')}
          style={{ textAlign: 'left', width: '100%', background: C.cream }}
        >
          <div style={{ position: 'absolute', top: -16, right: 24, fontFamily: serif, fontWeight: 800, fontSize: 120, color: 'rgba(26,24,20,0.045)', lineHeight: 1, pointerEvents: 'none', userSelect: 'none' }}>01</div>
          <div className="tr-section-tag" style={{ marginBottom: 20 }}>
            <span style={{ color: C.red, fontFamily: mono, fontSize: 8, letterSpacing: '0.22em', textTransform: 'uppercase' }}>Now Open</span>
          </div>
          <h2 style={{ fontFamily: serif, fontWeight: 800, fontSize: 'clamp(38px, 4.5vw, 60px)', lineHeight: 0.92, color: C.ink, marginBottom: 20 }}>
            I'm a<br /><span style={{ color: C.red }}>Creator.</span>
          </h2>
          <p style={{ fontFamily: body, fontSize: 15, lineHeight: 1.65, color: C.ink2, marginBottom: 28, maxWidth: 360 }}>
            For Creators who build real audiences and want brand relationships that don't compromise their voice.
          </p>
          <ul style={{ listStyle: 'none', marginBottom: 40 }}>
            {['Curated brand matching, no cold outreach', 'Transparent rates and creative freedom', 'Community of Creators who get it'].map(item => (
              <li key={item} style={{ fontFamily: body, fontSize: 13, color: C.ink2, padding: '10px 0', borderBottom: `1px solid ${C.dust}`, display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ color: C.red, flexShrink: 0 }}>+</span>{item}
              </li>
            ))}
          </ul>
          <span className="tr-btn-primary">Join as a Creator</span>
        </button>
      </InView>

      <InView delay={0.12}>
        <button
          className="tr-join-card"
          onClick={() => navigate('/join/brand')}
          style={{ textAlign: 'left', width: '100%' }}
        >
          <div style={{ position: 'absolute', top: -16, right: 24, fontFamily: serif, fontWeight: 800, fontSize: 120, color: 'rgba(26,24,20,0.04)', lineHeight: 1, pointerEvents: 'none', userSelect: 'none' }}>02</div>
          <div style={{ display: 'inline-block', fontFamily: mono, fontSize: 8, letterSpacing: '0.22em', textTransform: 'uppercase', color: C.muted, border: `1px solid ${C.dust}`, padding: '4px 10px', marginBottom: 20 }}>
            Brand Enquiries
          </div>
          <h2 style={{ fontFamily: serif, fontWeight: 800, fontSize: 'clamp(38px, 4.5vw, 60px)', lineHeight: 0.92, color: C.ink, marginBottom: 20 }}>
            I'm a<br /><span style={{ color: C.red }}>Brand.</span>
          </h2>
          <p style={{ fontFamily: body, fontSize: 15, lineHeight: 1.65, color: C.ink2, marginBottom: 28, maxWidth: 360 }}>
            For brands that understand the value of authentic advocacy and want Creators who genuinely believe in what they do.
          </p>
          <ul style={{ listStyle: 'none', marginBottom: 40 }}>
            {['Access to verified authentic Creators', 'Campaign briefs built around creative integrity', 'Measurable impact beyond vanity metrics'].map(item => (
              <li key={item} style={{ fontFamily: body, fontSize: 13, color: C.ink2, padding: '10px 0', borderBottom: `1px solid ${C.dust}`, display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ color: C.red, flexShrink: 0 }}>+</span>{item}
              </li>
            ))}
          </ul>
          <span className="tr-btn-ghost">Partner with Us</span>
        </button>
      </InView>
    </section>
  );
}

function Footer() {
  const navigate = useNavigate();
  return (
    <footer style={{ padding: '48px 52px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: `1px solid ${C.dust}` }}>
      <button onClick={() => navigate('/')} style={{ background: 'none', border: 'none', cursor: 'none' }}>
        <img src={logo09} alt="The Reals" style={{ width: 52, height: 52 }} />
      </button>
      <div style={{ display: 'flex', gap: 32 }}>
        <button className="tr-nav-link" onClick={() => navigate('/join/creator')}>Creators</button>
        <button className="tr-nav-link" onClick={() => navigate('/join/brand')}>Brands</button>
        <button className="tr-nav-link">About</button>
        <button className="tr-nav-link">Privacy</button>
      </div>
      <p style={{ fontFamily: mono, fontSize: 9, color: C.dust, letterSpacing: '0.1em' }}>
        &copy; 2026 The Reals&#8482;
      </p>
    </footer>
  );
}

function LandingPage() {
  return (
    <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
      <HeroSection />
      <ManifestoSection />
      <MovementSection />
      <JoinSection />
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
                Join as a<br /><span style={{ color: C.red }}>Creator.</span>
              </h1>
            </InView>

            <InView delay={0.1}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, marginBottom: 72, paddingBottom: 72, borderBottom: `1px solid ${C.dust}` }}>
                <div>
                  <p style={{ fontFamily: body, fontSize: 16, lineHeight: 1.7, color: C.ink2, marginBottom: 20 }}>
                    The Reals&#8482; is built for Creators who take authenticity seriously. If you've built an audience on the back of genuine storytelling, this is your platform.
                  </p>
                  <p style={{ fontFamily: body, fontSize: 14, lineHeight: 1.8, color: C.muted, marginBottom: 16 }}>
                    We're in Beta. That means access is deliberately limited, and every application is reviewed by a human. We're not looking for follower counts. We're looking for Creators with a clear voice and a community that trusts them.
                  </p>
                  <p style={{ fontFamily: body, fontSize: 14, lineHeight: 1.8, color: C.muted }}>
                    Beta members get early access to brand partnerships, input into how the platform develops, and a founding-member rate that never changes.
                  </p>
                </div>
                <div>
                  {[
                    { n: '01', t: 'Apply', b: "Tell us about yourself and your audience. No pitch deck required." },
                    { n: '02', t: 'Review', b: "Applications are reviewed individually. We'll respond within 5 days." },
                    { n: '03', t: 'Onboard', b: "Access the platform, connect your channels, and start seeing matched briefs." },
                  ].map(step => (
                    <div key={step.n} style={{ display: 'flex', gap: 20, marginBottom: 28 }}>
                      <div style={{ fontFamily: serif, fontWeight: 800, fontSize: 13, color: C.red, paddingTop: 2, flexShrink: 0 }}>{step.n}</div>
                      <div>
                        <div style={{ fontFamily: serif, fontWeight: 700, fontSize: 15, color: C.ink, marginBottom: 6 }}>{step.t}</div>
                        <div style={{ fontFamily: body, fontSize: 13, lineHeight: 1.65, color: C.muted }}>{step.b}</div>
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
                      <option value="lifestyle">Lifestyle</option>
                      <option value="fashion">Fashion &amp; Style</option>
                      <option value="food">Food &amp; Drink</option>
                      <option value="travel">Travel</option>
                      <option value="fitness">Fitness &amp; Wellbeing</option>
                      <option value="tech">Technology</option>
                      <option value="culture">Culture &amp; Arts</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
                <div style={{ marginTop: 48 }}>
                  <button type="submit" className="tr-btn-primary">Submit Application</button>
                  <p style={{ fontFamily: body, fontSize: 12, color: C.muted, marginTop: 16 }}>
                    We review every application individually. You'll hear from us within 5 working days.
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
            <h2 style={{ fontFamily: serif, fontWeight: 800, fontSize: 'clamp(48px, 6vw, 80px)', lineHeight: 0.92, color: C.ink, marginBottom: 32 }}>
              You're in<br /><span style={{ color: C.red }}>the queue.</span>
            </h2>
            <p style={{ fontFamily: body, fontSize: 18, lineHeight: 1.65, color: C.ink2, maxWidth: 500, marginBottom: 40 }}>
              We've received your application, {form.name?.split(' ')[0] || 'Creator'}. A real human will review it. Expect to hear from us within 5 working days.
            </p>
            <button className="tr-btn-ghost" onClick={() => navigate('/')}>Back to The Reals</button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

const brandInputStyle: React.CSSProperties = {
  display: 'block', width: '100%', fontFamily: body, fontSize: 14,
  background: 'transparent', border: 'none',
  borderBottom: '1px solid rgba(246,245,241,0.15)',
  padding: '14px 0', color: '#f6f5f1', outline: 'none',
};
const brandLabelStyle: React.CSSProperties = {
  display: 'block', fontFamily: mono, fontSize: 8, letterSpacing: '0.22em',
  textTransform: 'uppercase', color: 'rgba(246,245,241,0.35)', marginBottom: 4, marginTop: 28,
};

function BrandJoinPage() {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ company: '', contact: '', email: '', useCase: '' });

  return (
    <motion.div key="brand" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }} style={{ minHeight: '100vh', background: C.ink }}>
      <div style={{ maxWidth: 880, margin: '0 auto', padding: '140px 52px 100px' }}>
        <button
          className="tr-nav-link-light"
          onClick={() => navigate('/')}
          style={{ marginBottom: 52, display: 'flex', alignItems: 'center', gap: 8 }}
        >
          Back to The Reals
        </button>

        {!submitted ? (
          <>
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
              <div style={{ fontFamily: mono, fontSize: 9, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(246,245,241,0.45)', display: 'flex', alignItems: 'center', gap: 12, marginBottom: 40 }}>
                <span style={{ display: 'block', width: 32, height: 1, background: C.red, flexShrink: 0 }} />
                Brand Partnerships
              </div>
              <h1 style={{ fontFamily: serif, fontWeight: 800, fontSize: 'clamp(52px, 7vw, 96px)', lineHeight: 0.9, color: C.white, marginBottom: 40 }}>
                Partner<br /><span style={{ color: C.red }}>With Us.</span>
              </h1>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, marginBottom: 72, paddingBottom: 72, borderBottom: '1px solid rgba(246,245,241,0.1)' }}>
                <div>
                  <p style={{ fontFamily: body, fontSize: 16, lineHeight: 1.7, color: 'rgba(246,245,241,0.7)', marginBottom: 20 }}>
                    The Reals&#8482; connects brands with Creators whose audiences have chosen to be there. Not algorithmically delivered, but genuinely earned.
                  </p>
                  <p style={{ fontFamily: body, fontSize: 14, lineHeight: 1.8, color: 'rgba(246,245,241,0.4)' }}>
                    We work with brands that understand the difference between reach and resonance. If you're looking for the cheapest route to impressions, this isn't for you. If you want Creators who will stand behind your product because they genuinely believe in it, let's talk.
                  </p>
                </div>
                <div>
                  {[
                    { n: '01', t: 'Verified Creators Only', b: "Every Creator on The Reals has been individually vetted for authenticity, consistency, and audience trust." },
                    { n: '02', t: 'Brief-to-Match', b: "Share your campaign brief. We surface Creators who are a genuine fit, not just the ones with the biggest numbers." },
                    { n: '03', t: 'Full Transparency', b: "Clear deliverables, fair rates, and creative briefs that respect the Creator's voice." },
                  ].map(step => (
                    <div key={step.n} style={{ display: 'flex', gap: 20, marginBottom: 28 }}>
                      <div style={{ fontFamily: serif, fontWeight: 800, fontSize: 13, color: C.red, paddingTop: 2, flexShrink: 0 }}>{step.n}</div>
                      <div>
                        <div style={{ fontFamily: serif, fontWeight: 700, fontSize: 15, color: C.white, marginBottom: 6 }}>{step.t}</div>
                        <div style={{ fontFamily: body, fontSize: 13, lineHeight: 1.65, color: 'rgba(246,245,241,0.4)' }}>{step.b}</div>
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
                  Brand Enquiry
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 48px' }}>
                  <div>
                    <label style={brandLabelStyle}>Company Name</label>
                    <input style={brandInputStyle} type="text" placeholder="Your company" required value={form.company} onChange={e => setForm(f => ({ ...f, company: e.target.value }))} />
                  </div>
                  <div>
                    <label style={brandLabelStyle}>Contact Name</label>
                    <input style={brandInputStyle} type="text" placeholder="Your name" required value={form.contact} onChange={e => setForm(f => ({ ...f, contact: e.target.value }))} />
                  </div>
                  <div>
                    <label style={brandLabelStyle}>Email Address</label>
                    <input style={brandInputStyle} type="email" placeholder="your@brand.com" required value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
                  </div>
                  <div>
                    <label style={brandLabelStyle}>Campaign Intent</label>
                    <select style={{ ...brandInputStyle, appearance: 'none', cursor: 'none' } as React.CSSProperties} required value={form.useCase} onChange={e => setForm(f => ({ ...f, useCase: e.target.value }))}>
                      <option value="" disabled style={{ background: C.ink }}>Select intent</option>
                      <option value="brand-awareness" style={{ background: C.ink }}>Brand Awareness</option>
                      <option value="product-launch" style={{ background: C.ink }}>Product Launch</option>
                      <option value="ongoing-partnership" style={{ background: C.ink }}>Ongoing Partnership</option>
                      <option value="content-creation" style={{ background: C.ink }}>Content Creation</option>
                      <option value="other" style={{ background: C.ink }}>Other</option>
                    </select>
                  </div>
                </div>
                <div style={{ marginTop: 48 }}>
                  <button type="submit" style={{ display: 'inline-block', fontFamily: mono, fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', background: C.red, color: '#fff', border: 'none', padding: '15px 32px', cursor: 'none', transition: 'background 0.2s' }}>
                    Send Enquiry
                  </button>
                  <p style={{ fontFamily: body, fontSize: 12, color: 'rgba(246,245,241,0.3)', marginTop: 16 }}>
                    Brand enquiries are reviewed within 3 working days.
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
              We'll be in<br /><span style={{ color: C.red }}>touch.</span>
            </h2>
            <p style={{ fontFamily: body, fontSize: 18, lineHeight: 1.65, color: 'rgba(246,245,241,0.65)', maxWidth: 500, marginBottom: 40 }}>
              Thanks for reaching out, {form.contact?.split(' ')[0] || 'there'}. Someone from our partnerships team will be in contact within 3 working days.
            </p>
            <button
              style={{ display: 'inline-block', fontFamily: mono, fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', background: 'transparent', color: 'rgba(246,245,241,0.5)', border: '1px solid rgba(246,245,241,0.2)', padding: '14px 24px', cursor: 'none', transition: 'border-color 0.2s, color 0.2s' }}
              onClick={() => navigate('/')}
            >
              Back to The Reals
            </button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

function AppShell() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [location.pathname]);

  const isDark = location.pathname === '/join/brand';

  return (
    <div
      className="tr-root"
      style={{ minHeight: '100vh', position: 'relative' }}
    >
      <div className="tr-grain" />
      <Cursor />

      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0, height: 116,
        background: isDark ? C.ink : C.paper,
        zIndex: 490, transition: 'background 0.4s',
      }} />

      <Nav />

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/join/creator" element={<CreatorJoinPage />} />
          <Route path="/join/brand" element={<BrandJoinPage />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default function TherealsLanding() {
  useGlobalStyles();
  return (
    <MemoryRouter initialEntries={['/']} initialIndex={0}>
      <AppShell />
    </MemoryRouter>
  );
}
