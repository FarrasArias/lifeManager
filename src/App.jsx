import { useState } from 'react';
import { SECTIONS, FONT, MONO } from './constants/sections';
import Overview from './sections/Overview';
import PainTracker from './sections/PainTracker';
import Ailments from './sections/Ailments';
import GymTracker from './sections/GymTracker';
import DietSection from './sections/DietSection';
import SleepSection from './sections/SleepSection';
import DailySection from './sections/DailySection';
import GrocerySection from './sections/GrocerySection';

const AUTH_KEY = 'lm_auth';
const PWD_HASH = btoa('152809');

function checkAuth() {
  try { return sessionStorage.getItem(AUTH_KEY) === 'ok'; } catch { return false; }
}

function Lock({ onAuth }) {
  const [input, setInput] = useState('');
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);

  const attempt = () => {
    if (btoa(input) === PWD_HASH) {
      try { sessionStorage.setItem(AUTH_KEY, 'ok'); } catch {}
      onAuth();
    } else {
      setError(true);
      setShake(true);
      setInput('');
      setTimeout(() => setShake(false), 400);
    }
  };

  return (
    <div style={{
      fontFamily: FONT, background: '#1a1915', minHeight: '100vh',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <div style={{
        background: '#252220', border: '1px solid #3a352e', borderRadius: 4,
        padding: '48px 40px', width: '100%', maxWidth: 360,
        animation: shake ? 'shake 0.4s ease' : 'none',
      }}>
        <div style={{ fontSize: 24, color: '#e8d5b7', marginBottom: 8, fontWeight: 400, letterSpacing: '0.06em' }}>
          Life Manager
        </div>
        <div style={{ fontSize: 13, color: '#6a6358', marginBottom: 32, letterSpacing: '0.03em' }}>
          Body · Mind · Recovery
        </div>
        <input
          type="password" value={input} autoFocus
          onChange={e => { setInput(e.target.value); setError(false); }}
          onKeyDown={e => e.key === 'Enter' && attempt()}
          placeholder="Password"
          style={{
            width: '100%', background: '#1a1915',
            border: error ? '1px solid #c94c4c' : '1px solid #3a352e',
            color: '#e8d5b7', padding: '12px 16px', fontSize: 15, fontFamily: MONO,
            borderRadius: 2, outline: 'none', boxSizing: 'border-box', marginBottom: 12,
          }}
        />
        {error && (
          <div style={{ fontSize: 12, color: '#c94c4c', marginBottom: 12, fontFamily: MONO }}>
            Incorrect password
          </div>
        )}
        <button
          onClick={attempt}
          style={{
            width: '100%', background: '#e8d5b7', color: '#1a1915', border: 'none',
            padding: '12px 0', fontSize: 14, fontFamily: FONT, fontWeight: 600,
            borderRadius: 2, cursor: 'pointer', letterSpacing: '0.04em',
          }}
        >Enter</button>
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

export default function App() {
  const [authed, setAuthed] = useState(checkAuth);
  const [active, setActive] = useState('overview');

  if (!authed) return <Lock onAuth={() => setAuthed(true)} />;

  return (
    <div style={{ fontFamily: FONT, background: '#1a1915', color: '#e8e0d4', minHeight: '100vh', lineHeight: 1.65 }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #2a2520 0%, #1a1915 100%)',
        borderBottom: '1px solid #3a352e', padding: '24px 24px 16px',
      }}>
        <div style={{ maxWidth: 960, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div>
            <h1 style={{ fontSize: 24, fontWeight: 400, letterSpacing: '0.08em', margin: 0, color: '#e8d5b7', textTransform: 'uppercase' }}>
              Holistic Life Manager
            </h1>
            <p style={{ fontSize: 13, color: '#8a8278', margin: '5px 0 0', letterSpacing: '0.04em' }}>
              Body · Mind · Recovery — An integrated approach
            </p>
          </div>
          <button
            onClick={() => { try { sessionStorage.removeItem(AUTH_KEY); } catch {} setAuthed(false); }}
            style={{ background: 'none', border: 'none', color: '#3a352e', fontSize: 12, fontFamily: MONO, cursor: 'pointer', padding: 0 }}
            title="Lock app"
          >◼ lock</button>
        </div>
      </div>

      {/* Nav */}
      <div style={{ background: '#22201b', borderBottom: '1px solid #3a352e', padding: '0 24px', overflowX: 'auto' }}>
        <div style={{ maxWidth: 960, margin: '0 auto', display: 'flex', gap: 0 }}>
          {SECTIONS.map(s => (
            <button
              key={s.id} onClick={() => setActive(s.id)}
              style={{
                background: 'none', border: 'none',
                borderBottom: active === s.id ? `2px solid ${s.color}` : '2px solid transparent',
                color: active === s.id ? s.color : '#6a6358',
                padding: '13px 14px 11px', fontSize: 12, fontFamily: FONT,
                cursor: 'pointer', whiteSpace: 'nowrap', transition: 'all 0.2s', letterSpacing: '0.03em',
              }}
            >
              <span style={{ marginRight: 5 }}>{s.icon}</span>{s.title}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: 960, margin: '0 auto', padding: '32px 24px 80px' }}>
        {active === 'overview' && <Overview />}
        {active === 'pain'     && <PainTracker />}
        {active === 'ailments' && <Ailments />}
        {active === 'gym'      && <GymTracker />}
        {active === 'diet'     && <DietSection />}
        {active === 'sleep'    && <SleepSection />}
        {active === 'daily'    && <DailySection />}
        {active === 'grocery'  && <GrocerySection />}
      </div>
    </div>
  );
}
