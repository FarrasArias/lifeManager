import { useState, useEffect, useRef } from 'react';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from './firebase';
import { useAuth } from './contexts/AuthContext';
import { NAV_GROUPS, FONT, MONO } from './constants/sections';
import Overview from './sections/Overview';
import PainTracker from './sections/PainTracker';
import Ailments from './sections/Ailments';
import GymTracker from './sections/GymTracker';
import DietSection from './sections/DietSection';
import SleepSection from './sections/SleepSection';
import DailySection from './sections/DailySection';
import GrocerySection from './sections/GrocerySection';
import { IntervalTimer, ScheduleTimer } from './sections/Timers';
import PhysioTracker from './sections/PhysioTracker';

// ─── Login ────────────────────────────────────────────────────────────────────

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [shake, setShake] = useState(false);

  const attempt = async () => {
    if (!email || !password) return;
    setLoading(true);
    setError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (e) {
      const msg =
        e.code === 'auth/invalid-credential' || e.code === 'auth/wrong-password'
          ? 'Incorrect email or password'
          : e.code === 'auth/too-many-requests'
          ? 'Too many attempts — try again later'
          : 'Sign-in failed';
      setError(msg);
      setShake(true);
      setTimeout(() => setShake(false), 400);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      fontFamily: FONT, background: '#0a0d16', minHeight: '100vh',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <div style={{
        background: '#0f1320', border: '1px solid #1e2640', borderRadius: 4,
        padding: '48px 40px', width: '100%', maxWidth: 360,
        animation: shake ? 'shake 0.4s ease' : 'none',
        boxShadow: '0 0 40px rgba(86,214,252,0.06)',
      }}>
        <div style={{ fontSize: 24, color: '#dde8ff', marginBottom: 8, fontWeight: 400, letterSpacing: '0.06em' }}>
          Life Manager
        </div>
        <div style={{ fontSize: 13, color: '#3a4a6a', marginBottom: 32, letterSpacing: '0.03em' }}>
          Body · Mind · Recovery
        </div>
        <input
          type="email" value={email} autoFocus
          onChange={e => { setEmail(e.target.value); setError(''); }}
          onKeyDown={e => e.key === 'Enter' && attempt()}
          placeholder="Email"
          style={{
            width: '100%', background: '#0a0d16',
            border: error ? '1px solid #c94c4c' : '1px solid #1e2640',
            color: '#dde8ff', padding: '12px 16px', fontSize: 15, fontFamily: MONO,
            borderRadius: 2, outline: 'none', boxSizing: 'border-box', marginBottom: 10,
          }}
        />
        <input
          type="password" value={password}
          onChange={e => { setPassword(e.target.value); setError(''); }}
          onKeyDown={e => e.key === 'Enter' && attempt()}
          placeholder="Password"
          style={{
            width: '100%', background: '#0a0d16',
            border: error ? '1px solid #c94c4c' : '1px solid #1e2640',
            color: '#dde8ff', padding: '12px 16px', fontSize: 15, fontFamily: MONO,
            borderRadius: 2, outline: 'none', boxSizing: 'border-box', marginBottom: 12,
          }}
        />
        {error && (
          <div style={{ fontSize: 12, color: '#c94c4c', marginBottom: 12, fontFamily: MONO }}>
            {error}
          </div>
        )}
        <button
          onClick={attempt} disabled={loading}
          style={{
            width: '100%',
            background: loading ? '#1e2640' : 'linear-gradient(90deg, #56d6fc, #8877fc)',
            color: loading ? '#6a7a9c' : '#0a0d16',
            border: 'none', padding: '12px 0', fontSize: 14,
            fontFamily: FONT, fontWeight: 700, borderRadius: 2,
            cursor: loading ? 'default' : 'pointer', letterSpacing: '0.05em',
          }}
        >{loading ? 'Signing in…' : 'Enter'}</button>
      </div>
      <style>{`
        @keyframes shake {
          0%,100%{transform:translateX(0)}
          20%,60%{transform:translateX(-8px)}
          40%,80%{transform:translateX(8px)}
        }
      `}</style>
    </div>
  );
}

function Spinner() {
  return (
    <div style={{
      fontFamily: FONT, background: '#0a0d16', minHeight: '100vh',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: '#1e2640', fontSize: 13, letterSpacing: '0.08em',
    }}>◌</div>
  );
}

// ─── Dropdown Nav ─────────────────────────────────────────────────────────────

function GroupNav({ active, setActive }) {
  const [dropdown, setDropdown] = useState(null);
  const navRef = useRef(null);

  useEffect(() => {
    if (!dropdown) return;
    const close = () => setDropdown(null);
    document.addEventListener('mousedown', close);
    window.addEventListener('scroll', close, true);
    return () => {
      document.removeEventListener('mousedown', close);
      window.removeEventListener('scroll', close, true);
    };
  }, [dropdown]);

  const handleGroup = (g, e) => {
    if (g.direct) { setActive(g.direct); setDropdown(null); return; }
    if (dropdown?.groupId === g.id) { setDropdown(null); return; }
    const rect = e.currentTarget.getBoundingClientRect();
    setDropdown({ groupId: g.id, top: rect.bottom, left: rect.left });
  };

  const handleSection = id => { setActive(id); setDropdown(null); };

  return (
    <div ref={navRef} style={{ display: 'flex', gap: 0 }}>
      {NAV_GROUPS.map(g => {
        const isGroupActive = g.direct
          ? active === g.direct
          : g.sections?.some(s => s.id === active);
        const isOpen = dropdown?.groupId === g.id;

        return (
          <div key={g.id}>
            <button
              onClick={e => { e.stopPropagation(); handleGroup(g, e); }}
              style={{
                background: isGroupActive ? g.color + '14' : 'none',
                border: 'none',
                borderBottom: isGroupActive ? `2px solid ${g.color}` : '2px solid transparent',
                color: isGroupActive ? g.color : '#3a4a6a',
                padding: '13px 16px 11px', fontSize: 12, fontFamily: FONT,
                cursor: 'pointer', whiteSpace: 'nowrap', transition: 'all 0.2s',
                letterSpacing: '0.04em', display: 'flex', alignItems: 'center', gap: 5,
              }}
            >
              <span>{g.icon}</span>
              <span>{g.label}</span>
              {!g.direct && (
                <span style={{ fontSize: 8, opacity: 0.5 }}>{isOpen ? '▲' : '▼'}</span>
              )}
            </button>

            {isOpen && (
              <div
                onMouseDown={e => e.stopPropagation()}
                style={{
                  position: 'fixed',
                  top: dropdown.top,
                  left: dropdown.left,
                  zIndex: 9999,
                  background: '#0f1320',
                  border: '1px solid #1e2640',
                  borderRadius: 3, minWidth: 180,
                  boxShadow: `0 8px 32px rgba(0,0,0,0.7), 0 0 0 1px ${g.color}22`,
                }}
              >
                {g.sections.map(s => (
                  <button
                    key={s.id}
                    onClick={() => handleSection(s.id)}
                    style={{
                      display: 'block', width: '100%', textAlign: 'left',
                      background: active === s.id ? g.color + '14' : 'none',
                      border: 'none',
                      borderLeft: active === s.id ? `2px solid ${g.color}` : '2px solid transparent',
                      color: active === s.id ? g.color : '#6a7a9c',
                      padding: '11px 16px', fontSize: 13, fontFamily: FONT,
                      cursor: 'pointer', letterSpacing: '0.02em',
                    }}
                    onMouseEnter={e => { if (active !== s.id) e.currentTarget.style.background = '#141828'; }}
                    onMouseLeave={e => { if (active !== s.id) e.currentTarget.style.background = 'none'; }}
                  >
                    {s.title}
                  </button>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  const { user, loading } = useAuth();
  const [active, setActive] = useState('overview');

  if (loading) return <Spinner />;
  if (!user) return <Login />;

  return (
    <div style={{ fontFamily: FONT, background: '#0a0d16', color: '#dde8ff', minHeight: '100vh', lineHeight: 1.65 }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #0f1320 0%, #0a0d16 100%)',
        borderBottom: '1px solid #1e2640', padding: '24px 24px 16px',
      }}>
        <div style={{ maxWidth: 960, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div>
            <h1 style={{ fontSize: 24, fontWeight: 400, letterSpacing: '0.08em', margin: 0, color: '#dde8ff', textTransform: 'uppercase' }}>
              Holistic Life Manager
            </h1>
            <p style={{ fontSize: 13, color: '#3a4a6a', margin: '5px 0 0', letterSpacing: '0.04em' }}>
              Body · Mind · Recovery — An integrated approach
            </p>
          </div>
          <button
            onClick={() => signOut(auth)}
            style={{ background: 'none', border: 'none', color: '#222840', fontSize: 12, fontFamily: MONO, cursor: 'pointer', padding: 0 }}
            title="Sign out"
          >◼ lock</button>
        </div>
      </div>

      {/* Nav */}
      <div style={{ background: '#080b14', borderBottom: '1px solid #1e2640', padding: '0 24px', overflowX: 'auto', position: 'relative', zIndex: 100 }}>
        <div style={{ maxWidth: 960, margin: '0 auto' }}>
          <GroupNav active={active} setActive={setActive} />
        </div>
      </div>

      {/* Content — conditional sections */}
      <div style={{ maxWidth: 960, margin: '0 auto', padding: '32px 24px 80px' }}>
        {active === 'overview'  && <Overview />}
        {active === 'pain'      && <PainTracker />}
        {active === 'ailments'  && <Ailments />}
        {active === 'gym'       && <GymTracker />}
        {active === 'diet'      && <DietSection />}
        {active === 'sleep'     && <SleepSection />}
        {active === 'daily'     && <DailySection />}
        {active === 'grocery'   && <GrocerySection />}
        {active === 'physio'    && <PhysioTracker />}

        {/* Timers always mounted so they keep running across all sections */}
        <div style={{ display: active === 'interval' ? 'block' : 'none' }}>
          <IntervalTimer />
        </div>
        <div style={{ display: active === 'schedule' ? 'block' : 'none' }}>
          <ScheduleTimer />
        </div>
      </div>
    </div>
  );
}
