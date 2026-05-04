import { useState, useEffect, useRef } from 'react';
import { useCloudSync } from '../hooks/useCloudSync';
import { Card } from '../components/shared';
import { MONO, FONT } from '../constants/sections';

// ─── Audio ────────────────────────────────────────────────────────────────────

function playBeep(type) {
  try {
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return;
    const ctx = new Ctx();

    const tone = (freq, t, dur, vol = 0.65) => {
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      osc.connect(g); g.connect(ctx.destination);
      osc.frequency.value = freq;
      osc.type = 'triangle';
      g.gain.setValueAtTime(vol, t);
      g.gain.setValueAtTime(vol, t + dur * 0.75);
      g.gain.exponentialRampToValueAtTime(0.001, t + dur);
      osc.start(t); osc.stop(t + dur);
    };

    if (type === 'interval') {
      // Rising 3-tone chime — C5 → E5 → G5
      tone(523, ctx.currentTime,        0.35);
      tone(659, ctx.currentTime + 0.38, 0.35);
      tone(784, ctx.currentTime + 0.76, 0.6);
    } else {
      // Double ding for schedule reminders
      tone(880, ctx.currentTime,        0.45);
      tone(880, ctx.currentTime + 0.55, 0.7);
    }
  } catch {}
}

// ─── Notifications ────────────────────────────────────────────────────────────

async function requestNotifPerm() {
  if ('Notification' in window && Notification.permission === 'default') {
    await Notification.requestPermission();
  }
}

function notify(title, body) {
  if (!('Notification' in window) || Notification.permission !== 'granted') return;
  try { new Notification(title, { body, silent: true, icon: '/lifeManager/favicon.svg' }); } catch {}
}

// ─── Shared helpers ───────────────────────────────────────────────────────────

function uid() { return Math.random().toString(36).slice(2, 8); }

function fmtSecs(s) {
  const n = Math.max(0, Math.round(s));
  return `${String(Math.floor(n / 60)).padStart(2, '0')}:${String(n % 60).padStart(2, '0')}`;
}

function toDurSecs(value, unit) {
  const n = parseFloat(value) || 0;
  return unit === 'min' ? Math.round(n * 60) : Math.round(n);
}

// ─── Shared styles ────────────────────────────────────────────────────────────

const baseInput = {
  background: '#0a0d16', border: '1px solid #1e2640', color: '#dde8ff',
  padding: '6px 10px', fontSize: 13, fontFamily: "'Courier New', monospace",
  borderRadius: 2, outline: 'none',
};

const iconBtn = (color) => ({
  background: 'none', border: '1px solid #1e2640', color,
  width: 26, height: 26, borderRadius: 2, cursor: 'pointer', fontSize: 15,
  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
});

const actionBtn = (color) => ({
  background: color + '22', border: `1px solid ${color}55`, color,
  padding: '8px 20px', fontSize: 13, fontFamily: "'Georgia', serif",
  borderRadius: 2, cursor: 'pointer', letterSpacing: '0.03em',
});

const ghostBtn = (color) => ({
  background: 'none', border: `1px solid ${color}55`, color,
  padding: '6px 14px', fontSize: 12, fontFamily: "'Courier New', monospace",
  borderRadius: 2, cursor: 'pointer', letterSpacing: '0.03em',
});

// ─── Interval Timer ───────────────────────────────────────────────────────────

const DEFAULT_PARTS = [
  { id: 'p1', label: 'Work',  value: 30, unit: 'min' },
  { id: 'p2', label: 'Break', value: 1,  unit: 'min' },
];

export function IntervalTimer() {
  const [parts, setParts] = useCloudSync('intervalPartitions', DEFAULT_PARTS);
  const [running, setRunning] = useState(false);
  const [, bump] = useState(0);
  const rerender = () => bump(n => n + 1);

  const state = useRef({ idx: 0, secs: null });
  const partsRef = useRef(parts);
  partsRef.current = parts;

  const durOf = p => toDurSecs(p.value, p.unit);

  useEffect(() => {
    if (!running) return;
    const p = partsRef.current;
    if (!p.length) return;
    if (state.current.secs === null) {
      state.current.secs = durOf(p[state.current.idx]);
    }

    const id = setInterval(() => {
      state.current.secs -= 1;
      if (state.current.secs <= 0) {
        const parts = partsRef.current;
        const nextIdx = (state.current.idx + 1) % parts.length;
        playBeep('interval');
        notify(parts[nextIdx].label, 'Interval timer');
        state.current.idx = nextIdx;
        state.current.secs = durOf(parts[nextIdx]);
      }
      rerender();
    }, 1000);

    return () => clearInterval(id);
  }, [running]);

  const start = async () => {
    await requestNotifPerm();
    if (parts.length) setRunning(true);
  };
  const pause = () => setRunning(false);
  const reset = () => {
    setRunning(false);
    state.current = { idx: 0, secs: null };
    rerender();
  };

  const addPart = () =>
    setParts(p => [...p, { id: uid(), label: 'Rest', value: 5, unit: 'min' }]);

  const delPart = (id) => {
    setParts(p => p.filter(x => x.id !== id));
    reset();
  };

  const updPart = (id, field, val) =>
    setParts(p => p.map(x => x.id === id ? { ...x, [field]: val } : x));

  const activeIdx = state.current.idx;
  const displaySecs = state.current.secs ?? (parts.length ? durOf(parts[0]) : 0);
  const curPart = parts[activeIdx] ?? parts[0];
  const color = '#4df0e0';

  return (
    <Card title="Interval Timer" color={color}>
      <p style={{ fontSize: 13, color: '#3a4a6a', margin: '0 0 16px', fontFamily: FONT }}>
        Define a loop of intervals. The timer cycles through them indefinitely and plays a sound at each transition.
      </p>

      {/* Countdown display */}
      <div style={{
        background: '#0a1430', border: '1px solid #1a2440', borderRadius: 3,
        padding: '20px', textAlign: 'center', marginBottom: 14,
      }}>
        <div style={{ fontSize: 11, fontFamily: MONO, color: '#3a5a8a', letterSpacing: '0.12em', marginBottom: 6 }}>
          {curPart?.label?.toUpperCase() ?? 'READY'}
          {parts.length > 1 && (
            <span style={{ marginLeft: 10, color: '#1a3a6a' }}>
              {activeIdx + 1} / {parts.length}
            </span>
          )}
        </div>
        <div style={{
          fontSize: 56, fontFamily: MONO,
          color: running ? color : '#1a3a6a',
          letterSpacing: '0.03em', lineHeight: 1,
        }}>
          {fmtSecs(displaySecs)}
        </div>
      </div>

      {/* Controls */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
        {!running
          ? <button onClick={start} disabled={!parts.length} style={actionBtn(color)}>▶ Start</button>
          : <button onClick={pause} style={actionBtn('#ff6eb4')}>⏸ Pause</button>
        }
        <button onClick={reset} style={{ ...actionBtn('#6a7a9c'), background: 'none' }}>↺ Reset</button>
      </div>

      {/* Sequence list */}
      <div style={{ fontSize: 11, fontFamily: MONO, color: '#4a5070', letterSpacing: '0.08em', marginBottom: 8 }}>
        SEQUENCE
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 5, marginBottom: 10 }}>
        {parts.map((p, i) => (
          <div key={p.id} style={{
            display: 'flex', alignItems: 'center', gap: 8,
            background: i === activeIdx && running ? '#0a1828' : 'transparent',
            border: `1px solid ${i === activeIdx && running ? '#1a3a6a' : '#141828'}`,
            borderRadius: 2, padding: '8px 10px',
          }}>
            <span style={{ fontSize: 11, fontFamily: MONO, color: '#1e2640', minWidth: 14, flexShrink: 0 }}>
              {i + 1}
            </span>
            <input
              value={p.label}
              onChange={e => updPart(p.id, 'label', e.target.value)}
              placeholder="Label"
              style={{ ...baseInput, flex: 1, minWidth: 0 }}
            />
            <input
              type="number" min="0.5" step="0.5" value={p.value}
              onChange={e => updPart(p.id, 'value', e.target.value)}
              style={{ ...baseInput, width: 62, textAlign: 'right', flexShrink: 0 }}
            />
            <button
              onClick={() => updPart(p.id, 'unit', p.unit === 'min' ? 'sec' : 'min')}
              style={{
                background: 'none', border: '1px solid #1e2640', color: '#3a4a6a',
                padding: '5px 8px', fontSize: 11, fontFamily: MONO, borderRadius: 2,
                cursor: 'pointer', minWidth: 36, flexShrink: 0,
              }}
            >{p.unit}</button>
            <button onClick={() => delPart(p.id)} style={iconBtn('#6a4040')}>−</button>
          </div>
        ))}
      </div>
      <button onClick={addPart} style={ghostBtn(color)}>+ Add interval</button>
    </Card>
  );
}

// ─── Daily Schedule ───────────────────────────────────────────────────────────

export function ScheduleTimer() {
  const [events, setEvents] = useCloudSync('scheduleEvents', []);
  const [newTime, setNewTime] = useState('');
  const [newLabel, setNewLabel] = useState('');
  const [lastCheck, setLastCheck] = useState('');

  const eventsRef = useRef(events);
  eventsRef.current = events;
  const firedRef = useRef(new Set());

  const color = '#77c0ff';

  useEffect(() => {
    const check = () => {
      const now = new Date();
      const hhmm =
        now.getHours().toString().padStart(2, '0') + ':' +
        now.getMinutes().toString().padStart(2, '0');
      const day = now.toISOString().slice(0, 10);
      setLastCheck(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));

      eventsRef.current.forEach(evt => {
        const key = `${day}/${evt.id}`;
        if (evt.time === hhmm && !firedRef.current.has(key)) {
          firedRef.current.add(key);
          playBeep('schedule');
          notify(evt.label, 'Life Manager reminder');
        }
      });
    };

    check();
    const id = setInterval(check, 30_000);
    return () => clearInterval(id);
  }, []);

  const addEvent = async () => {
    if (!newTime || !newLabel.trim()) return;
    await requestNotifPerm();
    setEvents(prev =>
      [...prev, { id: uid(), time: newTime, label: newLabel.trim() }]
        .sort((a, b) => a.time.localeCompare(b.time))
    );
    setNewTime('');
    setNewLabel('');
  };

  const removeEvent = id => setEvents(prev => prev.filter(e => e.id !== id));

  const sorted = [...events].sort((a, b) => a.time.localeCompare(b.time));

  const nowHHMM =
    new Date().getHours().toString().padStart(2, '0') + ':' +
    new Date().getMinutes().toString().padStart(2, '0');

  const nextId = sorted.find(e => e.time > nowHHMM)?.id;

  return (
    <Card title="Daily Schedule" color={color}>
      <p style={{ fontSize: 13, color: '#3a4a6a', margin: '0 0 16px', fontFamily: FONT }}>
        Recurring daily reminders by clock time. Fires every day when the time arrives and the app is open.
      </p>

      {sorted.length === 0 ? (
        <div style={{ fontSize: 13, color: '#1e2640', fontFamily: MONO, padding: '20px 0', textAlign: 'center' }}>
          No events yet
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginBottom: 14 }}>
          {sorted.map(evt => {
            const past = evt.time < nowHHMM;
            const isNext = evt.id === nextId;
            return (
              <div key={evt.id} style={{
                display: 'flex', alignItems: 'center', gap: 10,
                background: isNext ? '#0a1430' : 'transparent',
                border: `1px solid ${isNext ? '#1a3a6a' : '#141828'}`,
                borderRadius: 2, padding: '8px 12px',
              }}>
                <span style={{
                  fontFamily: MONO, fontSize: 13,
                  color: past ? '#1e2640' : color,
                  minWidth: 44, flexShrink: 0,
                }}>
                  {evt.time}
                </span>
                <span style={{ flex: 1, fontSize: 14, color: past ? '#3a4060' : '#dde8ff' }}>
                  {isNext && <span style={{ fontSize: 10, color, marginRight: 6 }}>▶</span>}
                  {evt.label}
                </span>
                <button onClick={() => removeEvent(evt.id)} style={iconBtn('#6a4040')}>−</button>
              </div>
            );
          })}
        </div>
      )}

      {/* Add event */}
      <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
        <input
          type="time" value={newTime}
          onChange={e => setNewTime(e.target.value)}
          style={{ ...baseInput, width: 96, flexShrink: 0 }}
        />
        <input
          value={newLabel} placeholder="Activity…"
          onChange={e => setNewLabel(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && addEvent()}
          style={{ ...baseInput, flex: 1, minWidth: 120 }}
        />
        <button onClick={addEvent} style={ghostBtn(color)}>+ Add</button>
      </div>

      {lastCheck && (
        <div style={{ fontSize: 11, color: '#1e2640', fontFamily: MONO, marginTop: 10 }}>
          last checked {lastCheck}
        </div>
      )}
    </Card>
  );
}
