import { useState } from 'react';
import { useCloudSync } from '../hooks/useCloudSync';
import { Card, P } from '../components/shared';
import { MONO } from '../constants/sections';

const DAYS = [
  { id: 'mon', label: 'Mon', full: 'Monday'    },
  { id: 'tue', label: 'Tue', full: 'Tuesday'   },
  { id: 'wed', label: 'Wed', full: 'Wednesday' },
  { id: 'thu', label: 'Thu', full: 'Thursday'  },
  { id: 'fri', label: 'Fri', full: 'Friday'    },
  { id: 'sat', label: 'Sat', full: 'Saturday'  },
  { id: 'sun', label: 'Sun', full: 'Sunday'    },
];

// Map JS getDay() (0=Sun) → DAYS index
const JS_DAY_TO_IDX = [6, 0, 1, 2, 3, 4, 5];

function uid() { return Math.random().toString(36).slice(2, 8); }

const COLOR = '#ff8c6b';

const ctrlBtn = {
  background: '#141828', border: '1px solid #1e2640', color: '#dde8ff',
  width: 28, height: 28, borderRadius: 2, cursor: 'pointer',
  fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center',
};

const inputStyle = {
  background: '#0a0d16', border: '1px solid #1e2640', color: '#dde8ff',
  padding: '7px 10px', fontSize: 13, fontFamily: "'Courier New', monospace",
  borderRadius: 2, outline: 'none',
};

function ExerciseItem({ ex, onUpdate, onRemove }) {
  return (
    <div style={{ padding: '12px 0', borderBottom: '1px solid #141828' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 14, color: '#dde8ff' }}>{ex.name}</div>
          {ex.description && (
            <div style={{ fontSize: 11, color: '#6a7a9c', fontFamily: MONO, marginTop: 2 }}>
              {ex.description}
            </div>
          )}
        </div>
        <button
          onClick={onRemove}
          style={{
            background: 'none', border: '1px solid #1e2640', color: '#6a4040',
            width: 26, height: 26, borderRadius: 2, cursor: 'pointer',
            fontSize: 14, display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
          }}
        >−</button>
      </div>

      <div style={{ display: 'flex', gap: 14, marginTop: 10, flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ fontSize: 11, color: '#6a7a9c', fontFamily: MONO }}>SETS</span>
          <button onClick={() => onUpdate('sets', Math.max(1, ex.sets - 1))} style={ctrlBtn}>−</button>
          <span style={{ fontSize: 17, color: '#dde8ff', fontFamily: MONO, minWidth: 26, textAlign: 'center' }}>
            {ex.sets}
          </span>
          <button onClick={() => onUpdate('sets', Math.min(20, ex.sets + 1))} style={ctrlBtn}>+</button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ fontSize: 11, color: '#6a7a9c', fontFamily: MONO }}>REPS</span>
          <button onClick={() => onUpdate('reps', Math.max(1, ex.reps - 1))} style={ctrlBtn}>−</button>
          <span style={{ fontSize: 17, color: '#dde8ff', fontFamily: MONO, minWidth: 26, textAlign: 'center' }}>
            {ex.reps}
          </span>
          <button onClick={() => onUpdate('reps', Math.min(100, ex.reps + 1))} style={ctrlBtn}>+</button>
        </div>
      </div>
    </div>
  );
}

function AddForm({ onAdd }) {
  const [form, setForm] = useState({ name: '', description: '', sets: 3, reps: 10 });
  const upd = (field, val) => setForm(f => ({ ...f, [field]: val }));

  const submit = () => {
    if (!form.name.trim()) return;
    onAdd({ ...form, name: form.name.trim(), description: form.description.trim() });
    setForm({ name: '', description: '', sets: 3, reps: 10 });
  };

  return (
    <div style={{ marginTop: 16, paddingTop: 16, borderTop: '1px solid #141828' }}>
      <div style={{ fontSize: 11, fontFamily: MONO, color: '#4a5070', letterSpacing: '0.08em', marginBottom: 10 }}>
        ADD EXERCISE
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <input
          value={form.name} placeholder="Exercise name"
          onChange={e => upd('name', e.target.value)}
          onKeyDown={e => e.key === 'Enter' && submit()}
          style={{ ...inputStyle, width: '100%', boxSizing: 'border-box' }}
        />
        <input
          value={form.description} placeholder="Form cue / description (optional)"
          onChange={e => upd('description', e.target.value)}
          onKeyDown={e => e.key === 'Enter' && submit()}
          style={{ ...inputStyle, width: '100%', boxSizing: 'border-box' }}
        />
        <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ fontSize: 11, color: '#6a7a9c', fontFamily: MONO }}>SETS</span>
            <input
              type="number" min="1" value={form.sets}
              onChange={e => upd('sets', Math.max(1, parseInt(e.target.value) || 1))}
              style={{ ...inputStyle, width: 58, textAlign: 'center' }}
            />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ fontSize: 11, color: '#6a7a9c', fontFamily: MONO }}>REPS</span>
            <input
              type="number" min="1" value={form.reps}
              onChange={e => upd('reps', Math.max(1, parseInt(e.target.value) || 1))}
              style={{ ...inputStyle, width: 58, textAlign: 'center' }}
            />
          </div>
          <button
            onClick={submit}
            disabled={!form.name.trim()}
            style={{
              background: COLOR + '22', border: `1px solid ${COLOR}55`, color: COLOR,
              padding: '7px 16px', fontSize: 12, fontFamily: MONO,
              borderRadius: 2, cursor: form.name.trim() ? 'pointer' : 'default',
              opacity: form.name.trim() ? 1 : 0.4,
            }}
          >+ Add</button>
        </div>
      </div>
    </div>
  );
}

export default function PhysioTracker() {
  const [program, setProgram] = useCloudSync('physioProgram', {});
  const [activeDay, setActiveDay] = useState(() => DAYS[JS_DAY_TO_IDX[new Date().getDay()]].id);

  const dayExercises = program[activeDay] || [];

  const addExercise = (ex) => {
    setProgram(prev => ({
      ...prev,
      [activeDay]: [...(prev[activeDay] || []), { ...ex, id: uid() }],
    }));
  };

  const removeExercise = (id) => {
    setProgram(prev => ({
      ...prev,
      [activeDay]: (prev[activeDay] || []).filter(e => e.id !== id),
    }));
  };

  const updateExercise = (id, field, val) => {
    setProgram(prev => ({
      ...prev,
      [activeDay]: (prev[activeDay] || []).map(e => e.id === id ? { ...e, [field]: val } : e),
    }));
  };

  const activeDayFull = DAYS.find(d => d.id === activeDay)?.full;

  return (
    <>
      <Card title="Physio Program" color={COLOR}>
        <P>Daily physio exercises by day of week. Each day is independent — add, remove, or adjust sets/reps freely. Changes save automatically to your account.</P>
      </Card>

      {/* Day tabs */}
      <div style={{
        display: 'flex', background: '#0f1320', border: '1px solid #1e2640',
        borderRadius: 2, overflow: 'hidden', marginBottom: 20,
      }}>
        {DAYS.map((d, i) => {
          const count = program[d.id]?.length || 0;
          const isActive = d.id === activeDay;
          return (
            <button
              key={d.id}
              onClick={() => setActiveDay(d.id)}
              style={{
                flex: 1, padding: '9px 4px 7px', background: isActive ? '#0f1320' : 'none',
                border: 'none',
                borderRight: i < 6 ? '1px solid #1e2640' : 'none',
                borderBottom: isActive ? `2px solid ${COLOR}` : '2px solid transparent',
                color: isActive ? COLOR : '#6a7a9c',
                fontSize: 11, fontFamily: MONO, cursor: 'pointer',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
              }}
            >
              <span>{d.label}</span>
              {count > 0 && (
                <span style={{
                  fontSize: 9, color: isActive ? COLOR : '#3a4060',
                  background: isActive ? COLOR + '22' : 'transparent',
                  borderRadius: 8, padding: '0 4px', minWidth: 14, textAlign: 'center',
                }}>
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Exercise list for selected day */}
      <Card title={`${activeDayFull} Exercises`} color={COLOR}>
        {dayExercises.length === 0 ? (
          <div style={{ fontSize: 13, color: '#3a4060', fontFamily: MONO, padding: '8px 0 4px' }}>
            No exercises for {activeDayFull} yet.
          </div>
        ) : (
          dayExercises.map(ex => (
            <ExerciseItem
              key={ex.id}
              ex={ex}
              onUpdate={(field, val) => updateExercise(ex.id, field, val)}
              onRemove={() => removeExercise(ex.id)}
            />
          ))
        )}
        <AddForm onAdd={addExercise} />
      </Card>
    </>
  );
}
