import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLang } from '../context/LanguageContext';
import { colors } from '../theme';

const destinations = [
  { label: 'Sousse, Tunisie', path: '/destinations', query: 'sousse' },
  { label: 'Istanbul, Turquie', path: '/destinations', query: 'istanbul' },
  { label: 'Antalya, Turquie', path: '/destinations', query: 'antalya' },
];

export default function SearchBar() {
  const { t } = useLang();
  const [query, setQuery] = useState('');
  const [focused, setFocused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();

  const results = query.length > 0
    ? destinations.filter(d => {
        const q = query.toLowerCase();
        return d.label.toLowerCase().includes(q) || d.query.toLowerCase().includes(q);
      })
    : [];

  const handleSelect = (item) => {
    setQuery('');
    navigate(item.path);
  };

  const isActive = focused || hovered;

  return (
    <div style={{
      ...styles.wrap,
      ...(isActive ? styles.wrapActive : {}),
      transform: isActive ? 'scale(1.02)' : 'scale(1)',
    }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}>
      <svg style={{ ...styles.icon, ...(isActive ? styles.iconActive : {}) }} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
      </svg>
      <input
        style={styles.input}
        type="text"
        placeholder={`${t('destinations_title')}...`}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setTimeout(() => setFocused(false), 200)}
      />
      {isActive && (
        <div style={styles.hintLine}>
          <span style={styles.hintDot}></span>
          <span style={styles.hintDot}></span>
          <span style={styles.hintDot}></span>
        </div>
      )}
      {results.length > 0 && (
          <div style={{ ...styles.results, opacity: 1, transform: 'translateY(0)' }}>
          {results.map((r, i) => (
            <button key={i} style={{
              ...styles.resultItem,
              ...(i < results.length - 1 ? { borderBottom: `1px solid ${colors.grayLight}` } : {}),
            }} onClick={() => handleSelect(r)}
              onMouseDown={(e) => e.preventDefault()}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={colors.gray} strokeWidth="2" style={{ minWidth: 14 }}>
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              <span>{r.label}</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={colors.gold} strokeWidth="2" style={{ marginLeft: 'auto', minWidth: 14 }}>
                <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
              </svg>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  wrap: {
    display: 'flex', alignItems: 'center', gap: 10,
    background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(12px)',
    border: '1px solid rgba(255,255,255,0.2)',
    borderRadius: 50, padding: '10px 22px',
    maxWidth: 480, width: '100%',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    position: 'relative',
  },
  wrapActive: {
    background: 'rgba(255,255,255,0.18)',
    border: `1px solid ${colors.gold}99`,
    boxShadow: `0 0 40px ${colors.gold}33`,
  },
  icon: { color: 'rgba(255,255,255,0.5)', minWidth: 18, transition: 'all 0.3s' },
  iconActive: { color: colors.gold, transform: 'rotate(10deg)' },
  input: {
    flex: 1, border: 'none', background: 'transparent',
    color: '#fff', fontSize: '0.95rem', outline: 'none',
    fontFamily: 'inherit',
  },
  hintLine: {
    display: 'flex', gap: 4, alignItems: 'center',
    position: 'absolute', right: 22, top: '50%', transform: 'translateY(-50%)',
  },
  hintDot: {
    width: 4, height: 4, borderRadius: '50%',
    background: colors.gold, opacity: 0.6,
    animation: 'pulse 1.5s ease infinite',
  },
  results: {
    position: 'absolute', top: 'calc(100% + 10px)', left: 0, right: 0,
    background: '#fff', borderRadius: 16, overflow: 'hidden',
    boxShadow: '0 20px 60px rgba(0,0,0,0.15)', zIndex: 100,
  },
  resultItem: {
    display: 'flex', alignItems: 'center', gap: 12, width: '100%',
    padding: '14px 18px', border: 'none', background: 'transparent',
    color: '#333', cursor: 'pointer', fontSize: '0.9rem',
    fontFamily: 'inherit', textAlign: 'left', transition: 'all 0.15s',
  },
};
