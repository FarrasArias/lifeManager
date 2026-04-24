import { useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Card, P, Tag, Btn } from '../components/shared';
import { MONO } from '../constants/sections';
import { GYM_DAYS, WARMUP } from '../constants/exercises';

function initProgress(exercises) {
  const out = {};
  exercises.forEach(ex => {
    out[ex.id] = { weight: ex.defaultWeight, reps: ex.repMin };
  });
  return out;
}

function ExerciseRow({ ex, progress, onUpdate }) {
  const p = progress[ex.id] || { weight: ex.defaultWeight, reps: ex.repMin };
  const atMax = p.reps >= ex.repMax;
  const [editingWeight, setEditingWeight] = useState(false);
  const [weightInput, setWeightInput] = useState(p.weight);

  const incReps = () => onUpdate(ex.id, { ...p, reps: Math.min(p.reps + 1, ex.repMax) });
  const decReps = () => onUpdate(ex.id, { ...p, reps: Math.max(p.reps - 1, ex.repMin) });

  const saveWeight = () => {
    onUpdate(ex.id, { ...p, weight: weightInput });
    setEditingWeight(false);
  };

  return (
    <div style={{
      padding: '12px 0', borderBottom: '1px solid #2a2520',
      display: 'flex', flexDirection: 'column', gap: 8,
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 14, color: '#e8d5b7' }}>{ex.name}</div>
          <div style={{ fontSize: 11, color: '#6a6358', fontFamily: MONO, marginTop: 2 }}>{ex.notes}</div>
        </div>
        <div style={{ fontSize: 11, color: '#6a6358', fontFamily: MONO, textAlign: 'right', whiteSpace: 'nowrap' }}>
          {ex.sets} sets × {ex.repMin}–{ex.repMax}
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ fontSize: 11, color: '#6a6358', fontFamily: MONO }}>REPS</span>
          <button onClick={decReps} style={ctrlBtn}>−</button>
          <span style={{
            fontSize: 18, color: atMax ? '#c9dbb2' : '#e8d5b7',
            fontFamily: MONO, minWidth: 28, textAlign: 'center',
          }}>{p.reps}</span>
          <button onClick={incReps} style={ctrlBtn}>+</button>
        </div>

        {ex.hasWeight && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ fontSize: 11, color: '#6a6358', fontFamily: MONO }}>WT</span>
            {editingWeight ? (
              <>
                <input
                  autoFocus value={weightInput}
                  onChange={e => setWeightInput(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter') saveWeight(); if (e.key === 'Escape') setEditingWeight(false); }}
                  style={{
                    background: '#1a1915', border: '1px solid #b2c9db', color: '#e8d5b7',
                    padding: '3px 8px', fontSize: 13, fontFamily: MONO, borderRadius: 2,
                    width: 80, outline: 'none',
                  }}
                />
                <button onClick={saveWeight} style={{ ...ctrlBtn, color: '#c9dbb2', borderColor: '#c9dbb2' }}>✓</button>
              </>
            ) : (
              <button
                onClick={() => { setWeightInput(p.weight); setEditingWeight(true); }}
                style={{
                  background: '#1a1915', border: '1px solid #3a352e', color: '#b2c9db',
                  padding: '3px 10px', fontSize: 13, fontFamily: MONO, borderRadius: 2,
                  cursor: 'pointer',
                }}
              >{p.weight || '—'}</button>
            )}
          </div>
        )}

        {atMax && (
          <span style={{
            fontSize: 11, fontFamily: MONO, color: '#c9dbb2',
            background: '#1a2a1e', border: '1px solid #4a8c5c44',
            padding: '2px 8px', borderRadius: 2,
          }}>⬆ ready to increase weight</span>
        )}
      </div>
    </div>
  );
}

const ctrlBtn = {
  background: '#2a2520', border: '1px solid #3a352e', color: '#e8d5b7',
  width: 28, height: 28, borderRadius: 2, cursor: 'pointer',
  fontSize: 16, lineHeight: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
  fontFamily: 'inherit',
};

function WarmupSection() {
  return (
    <div>
      <div style={{ fontSize: 12, fontFamily: MONO, color: '#6a6358', marginBottom: 10 }}>
        + 5 min stationary bike if available
      </div>
      {WARMUP.map(ex => (
        <div key={ex.id} style={{ padding: '8px 0', borderBottom: '1px solid #2a2520', fontSize: 13 }}>
          <div style={{ color: '#e8d5b7' }}>{ex.name}</div>
          <div style={{ color: '#6a6358', fontSize: 11, fontFamily: MONO }}>
            {ex.sets} × {ex.repMin} &nbsp;·&nbsp; {ex.notes}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function GymTracker() {
  const [gymProgress, setGymProgress] = useLocalStorage('gymProgress', {});
  const [activeDay, setActiveDay] = useState(0);
  const [warmupOpen, setWarmupOpen] = useState(false);

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
      <Card title="Progressive Overload Tracker" color="#b2c9db">
        <P>Add 1 rep per exercise per week. When a row turns green (max reps hit), tap the weight badge to update it — drop reps back to the minimum and repeat. All values persist locally.</P>
        <div style={{ background: '#1a2530', padding: 14, borderRadius: 2, border: '1px solid #2a3540', marginBottom: 12 }}>
          <div style={{ fontSize: 12, fontFamily: MONO, color: '#7ab8d4', marginBottom: 6 }}>PROGRESSION RULE</div>
          <div style={{ fontSize: 13, color: '#b0a898' }}>
            Hit max reps on all sets → increase weight → drop back to min reps. One rep per week max.
          </div>
        </div>
        <Tag bg="#2a3328">4 days/week</Tag>
        <Tag bg="#282a33">~60 min/session</Tag>
        <Tag bg="#2a2833">Core every day</Tag>
      </Card>

      <div style={{ marginBottom: 20 }}>
        <div style={{ display: 'flex', gap: 0, background: '#22201b', borderRadius: 2, overflow: 'hidden', border: '1px solid #3a352e' }}>
          {GYM_DAYS.map((d, i) => (
            <button
              key={d.id}
              onClick={() => setActiveDay(i)}
              style={{
                flex: 1, padding: '10px 4px', background: activeDay === i ? '#2a2a3a' : 'none',
                border: 'none', borderRight: i < 3 ? '1px solid #3a352e' : 'none',
                color: activeDay === i ? '#b2c9db' : '#6a6358',
                fontSize: 11, fontFamily: MONO, cursor: 'pointer',
                borderBottom: activeDay === i ? '2px solid #b2c9db' : '2px solid transparent',
              }}
            >
              Day {i + 1}
            </button>
          ))}
        </div>
      </div>

      <Card title={day.label} color="#b2c9db" action={
        <button
          onClick={resetDay}
          title="Reset this day to starting values"
          style={{
            background: 'none', border: '1px solid #3a352e', color: '#6a6358',
            padding: '3px 10px', fontSize: 11, fontFamily: MONO, borderRadius: 2, cursor: 'pointer',
          }}
        >reset</button>
      }>
        <div style={{ marginBottom: 8 }}>
          {day.tags.map(t => <Tag key={t} bg="#2a2833">{t}</Tag>)}
        </div>
        {day.exercises.map(ex => (
          <ExerciseRow
            key={ex.id} ex={ex}
            progress={gymProgress}
            onUpdate={update}
          />
        ))}
      </Card>

      <Card
        title="Warm-Up (Every Session)" color="#b2c9db"
        collapsible expanded={warmupOpen} onToggle={() => setWarmupOpen(v => !v)}
      >
        <WarmupSection />
      </Card>

      <Card title="Cardio — Gradual Reintroduction" color="#b2c9db">
        <P><strong>Weeks 1–6:</strong> Walking only. 15–20 min daily on flat ground.</P>
        <P><strong>Weeks 7–12:</strong> Stationary bike, 15–20 min, 2×/week, low resistance. Recumbent preferred.</P>
        <P><strong>Weeks 13+:</strong> Swimming if physio approves. 20 min, 2×/week.</P>
        <P><strong>Running:</strong> Only after physio clearance + 4 weeks pain-free. Walk/jog intervals to start.</P>
      </Card>
    </>
  );
}
