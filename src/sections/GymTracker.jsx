import { useState } from 'react';
import { useCloudSync } from '../hooks/useCloudSync';
import { Card, P, Tag, Btn } from '../components/shared';
import { MONO } from '../constants/sections';
import { GYM_DAYS, WARMUP } from '../constants/exercises';

function initProgress(exercises) {
  const out = {};
  exercises.forEach(ex => {
    out[ex.id] = {
      weight: ex.defaultWeight,
      reps: ex.reps,
      sets: ex.sets,
      userNotes: '',
      readyToIncrease: false,
    };
  });
  return out;
}

function ExerciseRow({ ex, progress, onUpdate }) {
  const p = progress[ex.id] || {
    weight: ex.defaultWeight, reps: ex.reps, sets: ex.sets,
    userNotes: '', readyToIncrease: false,
  };
  const currentSets = p.sets ?? ex.sets;
  const [editingWeight, setEditingWeight] = useState(false);
  const [weightInput, setWeightInput] = useState(p.weight);

  // No clamping — fully open reps/sets
  const incReps = () => onUpdate(ex.id, { ...p, reps: p.reps + 1 });
  const decReps = () => onUpdate(ex.id, { ...p, reps: Math.max(p.reps - 1, 0) });
  const incSets = () => onUpdate(ex.id, { ...p, sets: currentSets + 1 });
  const decSets = () => onUpdate(ex.id, { ...p, sets: Math.max(currentSets - 1, 1) });

  const saveWeight = () => {
    onUpdate(ex.id, { ...p, weight: weightInput });
    setEditingWeight(false);
  };

  const toggleReady = () => {
    onUpdate(ex.id, { ...p, readyToIncrease: !p.readyToIncrease });
  };

  const updateNotes = (val) => {
    onUpdate(ex.id, { ...p, userNotes: val });
  };

  return (
    <div style={{
      padding: '12px 0', borderBottom: '1px solid #141828',
      display: 'flex', flexDirection: 'column', gap: 8,
    }}>
      {/* Guide (ideal reps + RIR) */}
      {ex.guide && (
        <div style={{ fontSize: 11, color: '#3d8b6e', fontFamily: MONO }}>
          ▸ {ex.guide}
        </div>
      )}

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 14, color: '#dde8ff' }}>{ex.name}</div>
          <div style={{ fontSize: 11, color: '#6a7a9c', fontFamily: MONO, marginTop: 2 }}>{ex.notes}</div>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ fontSize: 11, color: '#6a7a9c', fontFamily: MONO }}>SETS</span>
          <button onClick={decSets} style={ctrlBtn}>−</button>
          <span style={{ fontSize: 18, color: '#dde8ff', fontFamily: MONO, minWidth: 28, textAlign: 'center' }}>
            {currentSets}
          </span>
          <button onClick={incSets} style={ctrlBtn}>+</button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ fontSize: 11, color: '#6a7a9c', fontFamily: MONO }}>REPS</span>
          <button onClick={decReps} style={ctrlBtn}>−</button>
          <span style={{
            fontSize: 18, color: '#dde8ff',
            fontFamily: MONO, minWidth: 28, textAlign: 'center',
          }}>{p.reps}</span>
          <button onClick={incReps} style={ctrlBtn}>+</button>
        </div>

        {ex.hasWeight && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ fontSize: 11, color: '#6a7a9c', fontFamily: MONO }}>WT</span>
            {editingWeight ? (
              <>
                <input
                  autoFocus value={weightInput}
                  onChange={e => setWeightInput(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter') saveWeight(); if (e.key === 'Escape') setEditingWeight(false); }}
                  style={{
                    background: '#0a0d16', border: '1px solid #56d6fc', color: '#dde8ff',
                    padding: '3px 8px', fontSize: 13, fontFamily: MONO, borderRadius: 2,
                    width: 80, outline: 'none',
                  }}
                />
                <button onClick={saveWeight} style={{ ...ctrlBtn, color: '#56fcd8', borderColor: '#56fcd8' }}>✓</button>
              </>
            ) : (
              <button
                onClick={() => { setWeightInput(p.weight); setEditingWeight(true); }}
                style={{
                  background: '#0a0d16', border: '1px solid #1e2640', color: '#56d6fc',
                  padding: '3px 10px', fontSize: 13, fontFamily: MONO, borderRadius: 2,
                  cursor: 'pointer',
                }}
              >{p.weight || '—'}</button>
            )}
          </div>
        )}

        {/* Manual "ready to increase" toggle */}
        <button
          onClick={toggleReady}
          style={{
            fontSize: 11, fontFamily: MONO, cursor: 'pointer',
            background: p.readyToIncrease ? '#082018' : '#0f1320',
            border: `1px solid ${p.readyToIncrease ? '#4a8c5c' : '#1e2640'}`,
            color: p.readyToIncrease ? '#56fcd8' : '#6a7a9c',
            padding: '2px 8px', borderRadius: 2,
          }}
        >{p.readyToIncrease ? '⬆ increase next' : '⬆ flag'}</button>
      </div>

      {/* User notes input */}
      <div style={{ marginTop: 2 }}>
        <input
          type="text"
          placeholder="Notes…"
          value={p.userNotes || ''}
          onChange={e => updateNotes(e.target.value)}
          style={{
            width: '100%', boxSizing: 'border-box',
            background: '#0a0d16', border: '1px solid #1e2640', color: '#a0b0cc',
            padding: '5px 8px', fontSize: 12, fontFamily: MONO, borderRadius: 2,
            outline: 'none',
          }}
        />
      </div>
    </div>
  );
}

const ctrlBtn = {
  background: '#141828', border: '1px solid #1e2640', color: '#dde8ff',
  width: 28, height: 28, borderRadius: 2, cursor: 'pointer',
  fontSize: 16, lineHeight: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
  fontFamily: 'inherit',
};

export default function GymTracker() {
  const [gymProgress, setGymProgress] = useCloudSync('gymProgress', {});
  const [activeDay, setActiveDay] = useState(0);

  const day = GYM_DAYS[activeDay];

  const update = (exId, newP) => {
    setGymProgress(prev => ({ ...prev, [exId]: newP }));
  };

  const resetDay = () => {
    const initial = initProgress(day.exercises);
    setGymProgress(prev => ({ ...prev, ...initial }));
  };

  return (
    <>
      {/* ── Must-Do + Warm-Up at the TOP ── */}
      <Card title="⚡ Pre-Workout Checklist" color="#56d6fc">
        {/* Must-do exercises */}
        <div style={{ fontSize: 12, fontFamily: MONO, color: '#56d6fc', marginBottom: 8, letterSpacing: '0.06em' }}>
          MUST-DO (EVERY SET REST)
        </div>
        <div style={{
          background: '#0e1530', padding: 12, borderRadius: 2,
          border: '1px solid #0e1c30', marginBottom: 14,
        }}>
          <div style={{ fontSize: 13, color: '#dde8ff' }}>
            <strong style={{ color: '#56fcd8' }}>Chin tucks</strong> — 3-5 reps between EVERY set. Pull chin back, hold 5s.
          </div>
          <div style={{ fontSize: 11, color: '#6a7a9c', fontFamily: MONO, marginTop: 4 }}>
            Decompresses cervical spine. This becomes automatic in ~2 weeks.
          </div>
        </div>

        {/* Nerve flossing */}
        <div style={{ fontSize: 12, fontFamily: MONO, color: '#ff8c6b', marginBottom: 8, letterSpacing: '0.06em' }}>
          NERVE FLOSSING (BEFORE FIRST SET)
        </div>
        <div style={{ padding: '0 0 6px' }}>
          <div style={{ padding: '8px 0', borderBottom: '1px solid #141828' }}>
            <div style={{ fontSize: 13, color: '#dde8ff' }}>Radial nerve glide (left arm)</div>
            <div style={{ fontSize: 11, color: '#6a7a9c', fontFamily: MONO, marginTop: 2 }}>
              1×8 gentle oscillations · Stop if pain increases
            </div>
          </div>
          <div style={{ padding: '8px 0', borderBottom: '1px solid #141828' }}>
            <div style={{ fontSize: 13, color: '#dde8ff' }}>Ulnar nerve glide (left arm)</div>
            <div style={{ fontSize: 11, color: '#6a7a9c', fontFamily: MONO, marginTop: 2 }}>
              1×8 gentle oscillations · Stop if pain increases
            </div>
          </div>
        </div>

        {/* Warm-up */}
        <div style={{ fontSize: 12, fontFamily: MONO, color: '#a78bfa', marginTop: 10, marginBottom: 8, letterSpacing: '0.06em' }}>
          WARM-UP (~8 MIN)
        </div>
        {WARMUP.map(ex => (
          <div key={ex.id} style={{ padding: '6px 0', borderBottom: '1px solid #141828', fontSize: 13 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <span style={{ color: '#dde8ff' }}>{ex.name}</span>
              <span style={{ fontSize: 11, color: '#4a5070', fontFamily: MONO, flexShrink: 0, marginLeft: 8 }}>
                {ex.sets}×{ex.reps}
              </span>
            </div>
            <div style={{ color: '#6a7a9c', fontSize: 11, fontFamily: MONO, marginTop: 1 }}>
              {ex.notes}
            </div>
          </div>
        ))}
      </Card>

      {/* ── Tracker info ── */}
      <Card title="Strength-Focused Tracker" color="#56d6fc">
        <P>Track sets, reps & weight freely — no hard limits. The green guide above each exercise shows the ideal rep range and RIR target. Tap ⬆ flag when you feel ready to increase weight next session.</P>
        <div style={{ background: '#0e1530', padding: 14, borderRadius: 2, border: '1px solid #0e1c30', marginBottom: 12 }}>
          <div style={{ fontSize: 12, fontFamily: MONO, color: '#56d6fc', marginBottom: 6 }}>YOUR RULES</div>
          <div style={{ fontSize: 13, color: '#a0b0cc' }}>
            ⦿ Chin tucked on every exercise — cervical health first.<br />
            ⦿ LEFT ARM: stop if cold/tingling. Note which exercises trigger it.<br />
            ⦿ Compounds RIR 2-3 · Isolation RIR 0-1 · Rehab/core controlled.
          </div>
        </div>
        <Tag bg="#0e1828">4 days/week</Tag>
        <Tag bg="#0e0e28">~60 min</Tag>
        <Tag bg="#100e1c">Core every session</Tag>
        <Tag bg="#0e1828">Cervical-safe</Tag>
      </Card>

      {/* ── Day tabs ── */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ display: 'flex', gap: 0, background: '#0f1320', borderRadius: 2, overflow: 'hidden', border: '1px solid #1e2640' }}>
          {GYM_DAYS.map((d, i) => (
            <button
              key={d.id}
              onClick={() => setActiveDay(i)}
              style={{
                flex: 1, padding: '10px 4px', background: activeDay === i ? '#1a1a3a' : 'none',
                border: 'none', borderRight: i < 3 ? '1px solid #1e2640' : 'none',
                color: activeDay === i ? '#56d6fc' : '#6a7a9c',
                fontSize: 11, fontFamily: MONO, cursor: 'pointer',
                borderBottom: activeDay === i ? '2px solid #56d6fc' : '2px solid transparent',
              }}
            >
              {d.label.split('—')[0].trim()}
            </button>
          ))}
        </div>
      </div>

      {/* ── Exercises ── */}
      <Card title={day.label} color="#56d6fc" action={
        <button
          onClick={resetDay}
          title="Reset this day to starting values"
          style={{
            background: 'none', border: '1px solid #1e2640', color: '#6a7a9c',
            padding: '3px 10px', fontSize: 11, fontFamily: MONO, borderRadius: 2, cursor: 'pointer',
          }}
        >reset</button>
      }>
        <div style={{ marginBottom: 8 }}>
          {day.tags.map(t => <Tag key={t} bg="#100e1c">{t}</Tag>)}
        </div>
        {day.exercises.map(ex => (
          <ExerciseRow
            key={ex.id} ex={ex}
            progress={gymProgress}
            onUpdate={update}
          />
        ))}
      </Card>

      {/* ── Cardio ── */}
      <Card title="Cardio — Gradual Reintroduction" color="#56d6fc">
        <P><strong>Current phase:</strong> Recumbent bike 5 min warm-up before every gym session.</P>
        <P><strong>Next step:</strong> Add 2×/week standalone sessions, 15-20 min, low resistance.</P>
        <P><strong>Later:</strong> Swimming if physio approves. 20 min, 2×/week.</P>
        <P><strong>Running:</strong> Only after physio clearance + 4 weeks pain-free.</P>
      </Card>
    </>
  );
}
