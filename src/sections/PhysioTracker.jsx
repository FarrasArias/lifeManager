import { useState } from 'react';
import { useCloudSync } from '../hooks/useCloudSync';
import { Card, P } from '../components/shared';
import { MONO } from '../constants/sections';

const COLOR = '#ff8c6b';

function uid() { return Math.random().toString(36).slice(2, 8); }

const MUSTS = [
  { name: 'Chin tucks',               detail: 'Hold 5s × 10. Also 3-5 between EVERY gym set' },
  { name: 'Radial nerve glide (left)', detail: 'Gentle oscillations × 8. Stop if pain increases' },
  { name: 'Ulnar nerve glide (left)',  detail: 'Gentle oscillations × 8. Stop if pain increases' },
];

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
          autoFocus
          value={draft}
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

function smallBtn(color) {
  return {
    background: 'none', border: `1px solid ${color}44`,
    color, width: 26, height: 26, borderRadius: 2,
    cursor: 'pointer', fontSize: 14,
    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
  };
}

export default function PhysioTracker() {
  const [physioNotes, setPhysioNotes] = useCloudSync('physioNotes', {});

  const updateSection = (key, items) => {
    setPhysioNotes(prev => ({ ...prev, [key]: items }));
  };

  return (
    <>
      <Card title="Physio — Must-Do (Every Day)" color={COLOR}>
        <P style={{ marginBottom: 14 }}>These exercises are non-negotiable — do them daily, including gym days (they're part of your warm-up).</P>
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
