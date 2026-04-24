import { useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Card, P, Btn } from '../components/shared';
import { MONO } from '../constants/sections';

const CATEGORIES = [
  { id: 'sciatica',  label: 'Sciatica / Foot', icon: '🦶', lowerIsBetter: true  },
  { id: 'elbow',     label: 'Elbow',            icon: '💪', lowerIsBetter: true  },
  { id: 'throat',    label: 'Throat / Globus',  icon: '🫁', lowerIsBetter: true  },
  { id: 'anxiety',   label: 'Anxiety',          icon: '🧠', lowerIsBetter: true  },
  { id: 'sleep',     label: 'Sleep Quality',    icon: '😴', lowerIsBetter: false },
];

const SCORE_LABELS_LOW = ['None', 'Mild', 'Moderate', 'Bad', 'Severe'];
const SCORE_LABELS_SLEEP = ['Terrible', 'Poor', 'OK', 'Good', 'Great'];

const SCORE_COLORS = ['#4a8c5c', '#7ab06e', '#c9a84c', '#c97a4c', '#c94c4c'];
const SLEEP_COLORS = ['#c94c4c', '#c9a84c', '#c9c44c', '#7ab06e', '#4a8c5c'];

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

function formatDate(dateStr) {
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
}

function ScoreButton({ value, selected, lowerIsBetter, onClick }) {
  const colors = lowerIsBetter ? SCORE_COLORS : SLEEP_COLORS;
  const labels = lowerIsBetter ? SCORE_LABELS_LOW : SCORE_LABELS_SLEEP;
  const color = colors[value - 1];
  return (
    <button
      onClick={() => onClick(value)}
      style={{
        flex: 1, padding: '10px 4px', border: selected ? `2px solid ${color}` : '2px solid #3a352e',
        background: selected ? color + '33' : '#1a1915', borderRadius: 3,
        color: selected ? color : '#6a6358', fontSize: 12, fontFamily: 'inherit',
        cursor: 'pointer', transition: 'all 0.15s', textAlign: 'center',
      }}
    >
      <div style={{ fontSize: 16, marginBottom: 2 }}>{value}</div>
      <div style={{ fontSize: 10 }}>{labels[value - 1]}</div>
    </button>
  );
}

function MiniBar({ score, lowerIsBetter }) {
  if (!score) return <span style={{ color: '#3a352e', fontSize: 12 }}>—</span>;
  const colors = lowerIsBetter ? SCORE_COLORS : SLEEP_COLORS;
  const color = colors[score - 1];
  return (
    <div style={{ display: 'flex', gap: 2, alignItems: 'center' }}>
      {[1,2,3,4,5].map(i => (
        <div key={i} style={{
          width: 8, height: 8, borderRadius: 1,
          background: i <= score ? color : '#2a2520',
        }} />
      ))}
    </div>
  );
}

export default function PainTracker() {
  const [log, setLog] = useLocalStorage('painLog', []);
  const today = todayKey();
  const todayEntry = log.find(e => e.date === today) || { date: today, scores: {} };
  const [draft, setDraft] = useState(todayEntry.scores);

  const setScore = (catId, val) => {
    const next = { ...draft, [catId]: val };
    setDraft(next);
    setLog(prev => {
      const filtered = prev.filter(e => e.date !== today);
      return [{ date: today, scores: next }, ...filtered].slice(0, 90);
    });
  };

  const last14 = log.slice(0, 14);

  return (
    <>
      <Card title={`Daily Check-In — ${formatDate(today)}`} color="#f0b8a0">
        <P>Quick daily pulse. Tap 1–5 for each category. Lower = better for pain/anxiety; higher = better for sleep. Data saves automatically.</P>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 8 }}>
          {CATEGORIES.map(cat => (
            <div key={cat.id}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <span style={{ fontSize: 18 }}>{cat.icon}</span>
                <span style={{ fontSize: 14, color: '#e8d5b7', fontWeight: 600 }}>{cat.label}</span>
                {draft[cat.id] && (
                  <span style={{ fontSize: 11, color: '#6a6358', fontFamily: MONO, marginLeft: 'auto' }}>
                    logged ✓
                  </span>
                )}
              </div>
              <div style={{ display: 'flex', gap: 6 }}>
                {[1,2,3,4,5].map(v => (
                  <ScoreButton
                    key={v} value={v}
                    selected={draft[cat.id] === v}
                    lowerIsBetter={cat.lowerIsBetter}
                    onClick={val => setScore(cat.id, val)}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 16, fontSize: 12, color: '#6a6358', fontFamily: MONO }}>
          {Object.keys(draft).length} / {CATEGORIES.length} logged today
        </div>
      </Card>

      {last14.length > 0 && (
        <Card title="History — Last 14 Days" color="#f0b8a0">
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12, fontFamily: MONO }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #3a352e' }}>
                  <th style={{ textAlign: 'left', padding: '6px 8px', color: '#6a6358', fontWeight: 400 }}>Date</th>
                  {CATEGORIES.map(c => (
                    <th key={c.id} style={{ textAlign: 'center', padding: '6px 8px', color: '#6a6358', fontWeight: 400 }}>
                      {c.icon}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {last14.map(entry => (
                  <tr key={entry.date} style={{ borderBottom: '1px solid #1e1c19' }}>
                    <td style={{ padding: '6px 8px', color: entry.date === today ? '#f0b8a0' : '#8a8278', whiteSpace: 'nowrap' }}>
                      {formatDate(entry.date)}
                    </td>
                    {CATEGORIES.map(cat => (
                      <td key={cat.id} style={{ padding: '6px 8px', textAlign: 'center' }}>
                        <MiniBar score={entry.scores[cat.id]} lowerIsBetter={cat.lowerIsBetter} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{ marginTop: 12, fontSize: 11, color: '#6a6358', fontFamily: MONO }}>
            Bars: filled = scored | {CATEGORIES.filter(c => c.lowerIsBetter).map(c => c.label).join(', ')} → lower is better &nbsp;·&nbsp; Sleep → higher is better
          </div>
        </Card>
      )}

      <Card title="Streak — Physio & Habits" color="#f0b8a0">
        <DailyHabits />
      </Card>
    </>
  );
}

const HABITS = [
  { id: 'physio',    label: 'Physio done',       icon: '🧘' },
  { id: 'walk',      label: '15-min walk',        icon: '🚶' },
  { id: 'psyllium',  label: 'Psyllium taken',     icon: '💊' },
  { id: 'water',     label: '2.5L water',         icon: '💧' },
  { id: 'noscreen',  label: 'Screen off by 10PM', icon: '📵' },
];

function DailyHabits() {
  const [habits, setHabits] = useLocalStorage('dailyHabits', {});
  const today = todayKey();
  const todayHabits = habits[today] || {};

  const toggle = (id) => {
    setHabits(prev => ({
      ...prev,
      [today]: { ...(prev[today] || {}), [id]: !(prev[today] || {})[id] },
    }));
  };

  const streak = computeStreak(habits);

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
        <div style={{ fontSize: 28, color: '#f0b8a0', fontFamily: MONO }}>{streak}</div>
        <div>
          <div style={{ fontSize: 13, color: '#e8d5b7' }}>day streak</div>
          <div style={{ fontSize: 11, color: '#6a6358' }}>all 5 habits completed</div>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {HABITS.map(h => {
          const done = !!todayHabits[h.id];
          return (
            <div
              key={h.id} onClick={() => toggle(h.id)}
              style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '10px 14px', borderRadius: 2, cursor: 'pointer',
                background: done ? '#1e2a1e' : '#1e1c19',
                border: done ? '1px solid #4a8c5c44' : '1px solid #2a2520',
                transition: 'all 0.15s',
              }}
            >
              <div style={{
                width: 20, height: 20, borderRadius: 2,
                border: done ? '1px solid #4a8c5c' : '1px solid #3a352e',
                background: done ? '#4a8c5c' : 'transparent',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 13, color: '#1a1915', flexShrink: 0,
              }}>{done ? '✓' : ''}</div>
              <span style={{ fontSize: 16 }}>{h.icon}</span>
              <span style={{ fontSize: 14, color: done ? '#c9dbb2' : '#6a6358' }}>{h.label}</span>
            </div>
          );
        })}
      </div>
    </>
  );
}

function computeStreak(habits) {
  let streak = 0;
  const d = new Date();
  d.setDate(d.getDate() - 1);
  while (true) {
    const key = d.toISOString().slice(0, 10);
    const h = habits[key] || {};
    if (HABITS.every(hab => h[hab.id])) {
      streak++;
      d.setDate(d.getDate() - 1);
    } else break;
  }
  return streak;
}
