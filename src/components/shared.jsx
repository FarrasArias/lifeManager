import { FONT, MONO } from '../constants/sections';

export function Card({ title, color = '#e8d5b7', children, collapsible, expanded, onToggle, action }) {
  const isOpen = !collapsible || expanded;
  return (
    <div style={{
      background: '#252220', border: '1px solid #3a352e',
      borderLeft: `3px solid ${color}`, marginBottom: 20, borderRadius: 2,
    }}>
      <div
        onClick={collapsible ? onToggle : undefined}
        style={{
          padding: '16px 20px', cursor: collapsible ? 'pointer' : 'default',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          borderBottom: isOpen ? '1px solid #3a352e' : 'none',
        }}
      >
        <h3 style={{ margin: 0, fontSize: 16, fontWeight: 600, color, letterSpacing: '0.02em' }}>{title}</h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {action}
          {collapsible && <span style={{ color: '#6a6358', fontSize: 14 }}>{isOpen ? '▾' : '▸'}</span>}
        </div>
      </div>
      {isOpen && <div style={{ padding: '16px 20px' }}>{children}</div>}
    </div>
  );
}

export function P({ children, style }) {
  return <p style={{ margin: '0 0 12px', fontSize: 14.5, color: '#ccc5b9', ...style }}>{children}</p>;
}

export function Ul({ children }) {
  return <ul style={{ margin: '0 0 12px', paddingLeft: 20, fontSize: 14.5, color: '#ccc5b9' }}>{children}</ul>;
}

export function Li({ children }) {
  return <li style={{ marginBottom: 6 }}>{children}</li>;
}

export function Tag({ children, bg = '#3a352e' }) {
  return (
    <span style={{
      display: 'inline-block', background: bg, color: '#e8e0d4',
      padding: '2px 10px', borderRadius: 2, fontSize: 12, fontFamily: MONO,
      marginRight: 6, marginBottom: 4,
    }}>{children}</span>
  );
}

export function SectionTitle({ children, color }) {
  return (
    <div style={{ fontSize: 14, fontWeight: 600, color, margin: '16px 0 8px' }}>{children}</div>
  );
}

export function Btn({ onClick, children, style, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        background: 'none', border: '1px solid #3a352e', color: '#8a8278',
        padding: '8px 16px', fontSize: 13, fontFamily: FONT, borderRadius: 2,
        cursor: disabled ? 'default' : 'pointer', transition: 'all 0.15s',
        opacity: disabled ? 0.5 : 1,
        ...style,
      }}
    >{children}</button>
  );
}
