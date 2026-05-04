import { useState } from 'react';
import { useCloudSync } from '../hooks/useCloudSync';
import { Card, P, Tag, Btn } from '../components/shared';
import { MONO } from '../constants/sections';
import { GYM_DAYS, WARMUP } from '../constants/exercises';

function initProgress(exercises) {
  const out = {};
  exercises.forEach(ex => {
    out[ex.id] = { weight: ex.defaultWeight, reps: ex.repMin, sets: ex.sets };
  });
  return out;
}

function ExerciseRow({ ex, progress, onUpdate }) {
  const p = progress[ex.id] || { weight: ex.defaultWeight, reps: ex.repMin, sets: ex.sets };
  const currentSets = p.sets ?? ex.sets;
  const atMax = p.reps >= ex.repMax;
  const [editingWeight, setEditingWeight] = useState(false);
  const [weightInput, setWeightInput] = useState(p.weight);

  const incReps = () => onUpdate(ex.id, { ...p, reps: Math.min(p.reps + 1, ex.repMax) });
  const decReps = () => onUpdate(ex.id, { ...p, reps: Math.max(p.reps - 1, ex.repMin) });
  const incSets = () => onUpdate(ex.id, { ...p, sets: Math.min(currentSets + 1, 10) });
  const decSets = () => onUpdate(ex.id, { ...p, sets: Math.max(currentSets - 1, 1) });

  const saveWeight = () => {
    onUpdate(ex.id, { ...p, weight: weightInput });
    setEditingWeight(false);
  };

  return (
    <div style={{
      padding: '12px 0', borderBottom: '1px solid #141828',
      display: 'flex', flexDirection: 'column', gap: 8,
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 14, color: '#dde8ff' }}>{ex.name}</div>
          <div style={{ fontSize: 11, color: '#6a7a9c', fontFamily: MONO, marginTop: 2 }}>{ex.notes}</div>
        </div>
        <div style={{ fontSize: 11, color: '#6a7a9c', fontFamily: MONO, textAlign: 'right', whiteSpace: 'nowrap' }}>
          {ex.repMin}–{ex.repMax} reps
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
            fontSize: 18, color: atMax ? '#56fcd8' : '#dde8ff',
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

        {atMax && (
          <span style={{
            fontSize: 11, fontFamily: MONO, color: '#56fcd8',
            background: '#082018', border: '1px solid #4a8c5c44',
            padding: '2px 8px', borderRadius: 2,
          }}>⬆ ready to increase weight</span>
        )}
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

function WarmupSection() {
  return (
    <div>
      <div style={{ fontSize: 12, fontFamily: MONO, color: '#6a7a9c', marginBottom: 10 }}>
        + 5 min stationary bike if available
      </div>
      {WARMUP.map(ex => (
        <div key={ex.id} style={{ padding: '8px 0', borderBottom: '1px solid #141828', fontSize: 13 }}>
          <div style={{ color: '#dde8ff' }}>{ex.name}</div>
          <div style={{ color: '#6a7a9c', fontSize: 11, fontFamily: MONO }}>
            {ex.sets} × {ex.repMin} &nbsp;·&nbsp; {ex.notes}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function GymTracker() {
  const [gymProgress, setGymProgress] = useCloudSync('gymProgress', {});
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
      <Card title="Progressive Overload Tracker" color="#56d6fc">
        <P>Add 1 rep per exercise per week. When a row turns teal (max reps hit), tap the weight badge to update it — drop reps back to the minimum and repeat. All values persist locally.</P>
        <div style={{ background: '#0e1530', padding: 14, borderRadius: 2, border: '1px solid #0e1c30', marginBottom: 12 }}>
          <div style={{ fontSize: 12, fontFamily: MONO, color: '#56d6fc', marginBottom: 6 }}>PROGRESSION RULE</div>
          <div style={{ fontSize: 13, color: '#a0b0cc' }}>
            Hit max reps on all sets → increase weight → drop back to min reps. One rep per week max.
          </div>
        </div>
        <Tag bg="#0e1828">4 days/week</Tag>
        <Tag bg="#0e0e28">~60 min/session</Tag>
        <Tag bg="#100e1c">Core every day</Tag>
      </Card>

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
              Day {i + 1}
            </button>
          ))}
        </div>
      </div>

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

      <Card
        title="Warm-Up (Every Session)" color="#56d6fc"
        collapsible expanded={warmupOpen} onToggle={() => setWarmupOpen(v => !v)}
      >
        <WarmupSection />
      </Card>

      <Card title="Cardio — Gradual Reintroduction" color="#56d6fc">
        <P><strong>Weeks 1–6:</strong> Walking only. 15–20 min daily on flat ground.</P>
        <P><strong>Weeks 7–12:</strong> Stationary bike, 15–20 min, 2×/week, low resistance. Recumbent preferred.</P>
        <P><strong>Weeks 13+:</strong> Swimming if physio approves. 20 min, 2×/week.</P>
        <P><strong>Running:</strong> Only after physio clearance + 4 weeks pain-free. Walk/jog intervals to start.</P>
      </Card>
    </>
  );
}
