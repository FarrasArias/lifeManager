import { useState } from 'react';
import { useCloudSync } from '../hooks/useCloudSync';
import { Card, P } from '../components/shared';
import { MONO } from '../constants/sections';

const COLOR = '#ff8c6b';

function uid() { return Math.random().toString(36).slice(2, 8); }

// ── Daily schedule data (from master plan Section 5) ────────────────────────
const DAYS_OF_WEEK = [
  { key: 'mon', short: 'M',   label: 'Monday' },
  { key: 'tue', short: 'T',   label: 'Tuesday' },
  { key: 'wed', short: 'W',   label: 'Wednesday' },
  { key: 'thu', short: 'Th',  label: 'Thursday' },
  { key: 'fri', short: 'F',   label: 'Friday' },
  { key: 'sat', short: 'S',   label: 'Saturday' },
  { key: 'sun', short: 'Su',  label: 'Sunday' },
];

const JS_DAY_TO_KEY = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

const ROTATION = {
  mon: { neck: true,  core: false, legs: true  },
  tue: { neck: false, core: true,  legs: false },
  wed: { neck: true,  core: false, legs: true  },
  thu: { neck: false, core: true,  legs: false },
  fri: { neck: true,  core: false, legs: true  },
  sat: { neck: false, core: true,  legs: false },
  sun: { neck: true,  core: false, legs: true  },
};

const SCHEDULE = {
  mon: [
    { id: 'warmup',  label: 'Warm-up + chin tucks + nerve glides',  time: '10 min', cat: 'prep' },
    { id: 'gym',     label: 'Gym — Day 1: Push',                     time: '50 min', cat: 'gym' },
    { id: 'neck',    label: 'Physio: Neck / Upper Back',              time: '15 min', cat: 'physio' },
    { id: 'legs',    label: 'Physio: Legs / Glutes',                  time: '15 min', cat: 'physio' },
    { id: 'neuro',   label: 'Neurodinamia + movilidad columna',       time: '10 min', cat: 'daily' },
  ],
  tue: [
    { id: 'warmup',  label: 'Warm-up + chin tucks + nerve glides',  time: '10 min', cat: 'prep' },
    { id: 'gym',     label: 'Gym — Day 2: Legs',                     time: '50 min', cat: 'gym' },
    { id: 'core',    label: 'Physio: Core',                           time: '25 min', cat: 'physio' },
    { id: 'neuro',   label: 'Neurodinamia + movilidad columna',       time: '10 min', cat: 'daily' },
  ],
  wed: [
    { id: 'cardio',  label: 'Cardio (recumbent bike)',                time: '20 min', cat: 'cardio' },
    { id: 'neck',    label: 'Physio: Neck / Upper Back',              time: '15 min', cat: 'physio' },
    { id: 'legs',    label: 'Physio: Legs / Glutes',                  time: '15 min', cat: 'physio' },
    { id: 'nerve',   label: 'Full nerve flossing session',            time: '10 min', cat: 'daily' },
    { id: 'neuro',   label: 'Neurodinamia + movilidad columna',       time: '10 min', cat: 'daily' },
    { id: 'stretch', label: 'Pausa activa / stretching',              time: '10 min', cat: 'daily' },
  ],
  thu: [
    { id: 'warmup',  label: 'Warm-up + chin tucks + nerve glides',  time: '10 min', cat: 'prep' },
    { id: 'gym',     label: 'Gym — Day 3: Pull',                     time: '50 min', cat: 'gym' },
    { id: 'core',    label: 'Physio: Core',                           time: '25 min', cat: 'physio' },
    { id: 'neuro',   label: 'Neurodinamia + movilidad columna',       time: '10 min', cat: 'daily' },
  ],
  fri: [
    { id: 'cardio',  label: 'Cardio (recumbent bike)',                time: '20 min', cat: 'cardio' },
    { id: 'neck',    label: 'Physio: Neck / Upper Back',              time: '15 min', cat: 'physio' },
    { id: 'legs',    label: 'Physio: Legs / Glutes',                  time: '15 min', cat: 'physio' },
    { id: 'nerve',   label: 'Full nerve flossing session',            time: '10 min', cat: 'daily' },
    { id: 'neuro',   label: 'Neurodinamia + movilidad columna',       time: '10 min', cat: 'daily' },
    { id: 'stretch', label: 'Pausa activa / stretching',              time: '10 min', cat: 'daily' },
  ],
  sat: [
    { id: 'warmup',  label: 'Warm-up + chin tucks + nerve glides',  time: '10 min', cat: 'prep' },
    { id: 'gym',     label: 'Gym — Day 4: Push/Pull Hybrid',         time: '50 min', cat: 'gym' },
    { id: 'core',    label: 'Physio: Core',                           time: '25 min', cat: 'physio' },
    { id: 'neuro',   label: 'Neurodinamia + movilidad columna',       time: '10 min', cat: 'daily' },
  ],
  sun: [
    { id: 'neck',    label: 'Physio: Neck / Upper Back',              time: '15 min', cat: 'physio' },
    { id: 'legs',    label: 'Physio: Legs / Glutes',                  time: '15 min', cat: 'physio' },
    { id: 'nerve',   label: 'Nerve flossing (gentle)',                time: '5 min',  cat: 'daily' },
    { id: 'neuro',   label: 'Neurodinamia + movilidad columna',       time: '10 min', cat: 'daily' },
    { id: 'stretch', label: 'Pausa activa / stretching',              time: '10 min', cat: 'daily' },
  ],
};

const DAY_TITLES = {
  mon: 'Gym Push',
  tue: 'Gym Legs',
  wed: 'Cardio + Recovery',
  thu: 'Gym Pull',
  fri: 'Cardio + Recovery',
  sat: 'Gym Hybrid',
  sun: 'Rest + Maintenance',
};

const CAT_COLORS = {
  prep:    '#56d6fc',
  gym:     '#56d6fc',
  cardio:  '#a78bfa',
  physio:  COLOR,
  daily:   '#6a7a9c',
};

function todayKey() { return JS_DAY_TO_KEY[new Date().getDay()]; }
function todayDate() { return new Date().toISOString().slice(0, 10); }

// ── Must-do exercises ───────────────────────────────────────────────────────
const MUSTS = [
  { name: 'Chin tucks',               detail: 'Hold 5s × 10. Also 3-5 between EVERY gym set' },
  { name: 'Radial nerve glide (left)', detail: 'Gentle oscillations × 8. Stop if pain increases' },
  { name: 'Ulnar nerve glide (left)',  detail: 'Gentle oscillations × 8. Stop if pain increases' },
];

// ── Notes sections ──────────────────────────────────────────────────────────
const SECTIONS = [
  { key: 'neck',  title: 'Neck / Upper Back',  icon: '🦴' },
  { key: 'core',  title: 'Core',               icon: '🫁' },
  { key: 'legs',  title: 'Legs / Glutes',       icon: '🦵' },
];

const inputStyle = {
  background: '#0a0d16', border: '1px solid #1e2640', color: '#dde8ff',
  padding: '7px 10px', fontSize: 13, fontFamily: MONO,
  borderRadius: 2, outline: 'none', width: '100%', boxSizing: 'border-box',
};

function smallBtn(color) {
  return {
    background: 'none', border: `1px solid ${color}44`,
    color, width: 26, height: 26, borderRadius: 2,
    cursor: 'pointer', fontSize: 14,
    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
  };
}

// ── Rotation diagram ────────────────────────────────────────────────────────
function RotationDiagram({ selectedDay, onSelectDay }) {
  const today = todayKey();
  const categories = [
    { key: 'neck', label: 'Neck/Back', color: '#ff8c6b' },
    { key: 'core', label: 'Core',      color: '#a78bfa' },
    { key: 'legs', label: 'Legs/Glt',  color: '#56fcd8' },
  ];

  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12, fontFamily: MONO }}>
        <thead>
          <tr>
            <th style={{ padding: '6px 4px', color: '#4a5070', textAlign: 'left', fontWeight: 400 }}></th>
            {DAYS_OF_WEEK.map(d => (
              <th
                key={d.key}
                onClick={() => onSelectDay(d.key)}
                style={{
                  padding: '6px 2px', textAlign: 'center', cursor: 'pointer',
                  color: d.key === selectedDay ? '#dde8ff' : d.key === today ? COLOR : '#6a7a9c',
                  fontWeight: d.key === today ? 700 : 400,
                  borderBottom: d.key === selectedDay ? `2px solid ${COLOR}` : '2px solid transparent',
                }}
              >{d.short}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {categories.map(cat => (
            <tr key={cat.key}>
              <td style={{ padding: '5px 4px', color: cat.color, fontSize: 11, whiteSpace: 'nowrap' }}>{cat.label}</td>
              {DAYS_OF_WEEK.map(d => (
                <td key={d.key} style={{ padding: '5px 2px', textAlign: 'center' }}>
                  {ROTATION[d.key][cat.key]
                    ? <span style={{ color: cat.color }}>●</span>
                    : <span style={{ color: '#1e2640' }}>·</span>}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ fontSize: 10, color: '#3a4060', fontFamily: MONO, marginTop: 8 }}>
        + Nerve flossing & neurodinamia: EVERY DAY &nbsp;·&nbsp; Pausa activa: every hour when sitting
      </div>
    </div>
  );
}

// ── Daily checklist ─────────────────────────────────────────────────────────
function DailyChecklist({ dayKey, checklist, onToggle }) {
  const items = SCHEDULE[dayKey] || [];
  const dateStr = todayDate();
  const todayChecks = checklist[dateStr] || {};
  const isToday = dayKey === todayKey();
  const dayLabel = DAYS_OF_WEEK.find(d => d.key === dayKey)?.label;
  const totalMin = items.reduce((sum, it) => sum + parseInt(it.time), 0);
  const doneCount = items.filter(it => todayChecks[it.id]).length;

  return (
    <Card
      title={`${dayLabel} — ${DAY_TITLES[dayKey]}`}
      color={COLOR}
      action={isToday && doneCount > 0 && (
        <span style={{ fontSize: 11, fontFamily: MONO, color: doneCount === items.length ? '#56fcd8' : '#6a7a9c' }}>
          {doneCount}/{items.length}
        </span>
      )}
    >
      <div style={{ fontSize: 11, fontFamily: MONO, color: '#4a5070', marginBottom: 10 }}>
        ~{totalMin} min total
      </div>
      {items.map(item => {
        const done = isToday && todayChecks[item.id];
        return (
          <div
            key={item.id}
            onClick={isToday ? () => onToggle(item.id) : undefined}
            style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '9px 0', borderBottom: '1px solid #141828',
              cursor: isToday ? 'pointer' : 'default',
              opacity: done ? 0.5 : 1,
            }}
          >
            {isToday && (
              <div style={{
                width: 20, height: 20, borderRadius: 2, flexShrink: 0,
                border: `1px solid ${done ? '#56fcd8' : '#1e2640'}`,
                background: done ? '#56fcd822' : 'transparent',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 12, color: '#56fcd8',
              }}>
                {done ? '✓' : ''}
              </div>
            )}
            <div style={{ flex: 1 }}>
              <span style={{
                fontSize: 13, color: '#dde8ff',
                textDecoration: done ? 'line-through' : 'none',
              }}>{item.label}</span>
            </div>
            <span style={{
              fontSize: 11, fontFamily: MONO,
              color: CAT_COLORS[item.cat] || '#6a7a9c',
              flexShrink: 0,
            }}>{item.time}</span>
          </div>
        );
      })}
      {!isToday && (
        <div style={{ fontSize: 11, color: '#3a4060', fontFamily: MONO, marginTop: 10 }}>
          Checkboxes available on the current day only
        </div>
      )}
    </Card>
  );
}

// ── Note item ───────────────────────────────────────────────────────────────
function NoteItem({ note, onSave, onRemove }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(note.text);

  const save = () => {
    const trimmed = draft.trim();
    if (trimmed) { onSave(trimmed); }
    setEditing(false);
  };

  if (editing) {
    return (
      <div style={{ display: 'flex', gap: 6, alignItems: 'flex-start', padding: '6px 0' }}>
        <textarea
          autoFocus value={draft}
          onChange={e => setDraft(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); save(); } if (e.key === 'Escape') setEditing(false); }}
          rows={2}
          style={{ ...inputStyle, resize: 'vertical', minHeight: 40 }}
        />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4, flexShrink: 0 }}>
          <button onClick={save} style={smallBtn('#56fcd8')}>✓</button>
          <button onClick={() => setEditing(false)} style={smallBtn('#6a7a9c')}>✕</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8,
      padding: '8px 0', borderBottom: '1px solid #141828',
    }}>
      <div
        onClick={() => { setDraft(note.text); setEditing(true); }}
        style={{ flex: 1, fontSize: 13, color: '#a0b0cc', cursor: 'pointer', whiteSpace: 'pre-wrap', lineHeight: 1.5 }}
      >
        {note.text}
      </div>
      <div style={{ display: 'flex', gap: 4, flexShrink: 0 }}>
        <button onClick={() => { setDraft(note.text); setEditing(true); }} style={smallBtn('#56d6fc')} title="Edit">✎</button>
        <button onClick={onRemove} style={smallBtn('#6a4040')} title="Remove">−</button>
      </div>
    </div>
  );
}

// ── Notes section ───────────────────────────────────────────────────────────
function NotesSection({ sectionKey, icon, title, notes, onUpdate }) {
  const [input, setInput] = useState('');
  const items = notes || [];

  const addNote = () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    onUpdate([...items, { id: uid(), text: trimmed }]);
    setInput('');
  };

  const saveNote = (id, newText) => {
    onUpdate(items.map(n => n.id === id ? { ...n, text: newText } : n));
  };

  const removeNote = (id) => {
    onUpdate(items.filter(n => n.id !== id));
  };

  return (
    <Card title={`${icon}  ${title}`} color={COLOR}>
      {items.length === 0 && (
        <div style={{ fontSize: 13, color: '#3a4060', fontFamily: MONO, padding: '4px 0 8px' }}>
          No notes yet — add exercises, observations, or physio instructions below.
        </div>
      )}
      {items.map(note => (
        <NoteItem
          key={note.id}
          note={note}
          onSave={(text) => saveNote(note.id, text)}
          onRemove={() => removeNote(note.id)}
        />
      ))}
      <div style={{ display: 'flex', gap: 6, marginTop: 12 }}>
        <textarea
          value={input}
          placeholder="Add a note…"
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); addNote(); } }}
          rows={1}
          style={{ ...inputStyle, resize: 'vertical', minHeight: 36 }}
        />
        <button
          onClick={addNote}
          disabled={!input.trim()}
          style={{
            background: COLOR + '22', border: `1px solid ${COLOR}55`, color: COLOR,
            padding: '7px 14px', fontSize: 12, fontFamily: MONO,
            borderRadius: 2, cursor: input.trim() ? 'pointer' : 'default',
            opacity: input.trim() ? 1 : 0.4, flexShrink: 0, alignSelf: 'flex-end',
          }}
        >+ Add</button>
      </div>
    </Card>
  );
}

// ── Main component ──────────────────────────────────────────────────────────
export default function PhysioTracker() {
  const [physioNotes, setPhysioNotes] = useCloudSync('physioNotes', {});
  const [checklist, setChecklist] = useCloudSync('physioChecklist', {});
  const [selectedDay, setSelectedDay] = useState(todayKey);

  const updateSection = (key, items) => {
    setPhysioNotes(prev => ({ ...prev, [key]: items }));
  };

  const toggleItem = (itemId) => {
    const dateStr = todayDate();
    setChecklist(prev => {
      const dayChecks = prev[dateStr] || {};
      return { ...prev, [dateStr]: { ...dayChecks, [itemId]: !dayChecks[itemId] } };
    });
  };

  return (
    <>
      {/* Physio rotation diagram */}
      <Card title="Weekly Physio Rotation" color={COLOR}>
        <P style={{ marginBottom: 12 }}>Physio categories alternate daily. Tap a day to see its full schedule below.</P>
        <RotationDiagram selectedDay={selectedDay} onSelectDay={setSelectedDay} />
      </Card>

      {/* Daily schedule with checklist */}
      <DailyChecklist
        dayKey={selectedDay}
        checklist={checklist}
        onToggle={toggleItem}
      />

      {/* Must-do exercises */}
      <Card title="Must-Do (Every Day)" color={COLOR}>
        <P style={{ marginBottom: 8 }}>Non-negotiable — do these daily, including gym days.</P>
        {MUSTS.map((m, i) => (
          <div key={i} style={{
            padding: '10px 0',
            borderBottom: i < MUSTS.length - 1 ? '1px solid #141828' : 'none',
          }}>
            <div style={{ fontSize: 14, color: '#dde8ff', fontWeight: 500 }}>{m.name}</div>
            <div style={{ fontSize: 11, color: '#6a7a9c', fontFamily: MONO, marginTop: 2 }}>{m.detail}</div>
          </div>
        ))}
      </Card>

      {/* Notes sections */}
      {SECTIONS.map(s => (
        <NotesSection
          key={s.key}
          sectionKey={s.key}
          icon={s.icon}
          title={s.title}
          notes={physioNotes[s.key]}
          onUpdate={(items) => updateSection(s.key, items)}
        />
      ))}
    </>
  );
}
