import { useState, useRef, useEffect } from 'react';
import { useLang } from '../context/LanguageContext';
import { colors } from '../theme';

const languages = [
  { code: 'fr', label: 'Français' },
  { code: 'ar', label: 'العربية' },
  { code: 'en', label: 'English' },
];

export default function LanguageSwitcher() {
  const { lang, setLang } = useLang();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const current = languages.find(l => l.code === lang) || languages[0];

  return (
    <div ref={ref} style={styles.wrap}>
      <button onClick={() => setOpen(!open)} style={styles.btn} title="Language">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <line x1="2" y1="12" x2="22" y2="12"/>
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
        </svg>
        <span style={styles.label}>{current.code.toUpperCase()}</span>
        <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
          <path d="M6 9l6 6 6-6"/>
        </svg>
      </button>
      {open && (
        <div style={styles.dropdown}>
          {languages.map(l => (
            <button key={l.code} onClick={() => { setLang(l.code); setOpen(false); }}
              style={{ ...styles.item, ...(lang === l.code ? styles.itemActive : {}) }}>
              <span style={styles.itemCode}>{l.code.toUpperCase()}</span>
              <span>{l.label}</span>
              {lang === l.code && <span style={{ marginLeft: 'auto', color: colors.gold }}>✓</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  wrap: { position: 'relative' },
  btn: {
    display: 'flex', alignItems: 'center', gap: 5,
    background: 'rgba(201,168,76,0.12)', border: `1px solid ${colors.gold}4D`,
    color: colors.gold, padding: '6px 12px', borderRadius: 8,
    cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600,
    transition: 'all 0.2s',
  },
  label: { minWidth: 24, textAlign: 'center' },
  dropdown: {
    position: 'absolute', top: 'calc(100% + 6px)', right: 0,
    background: colors.primaryDarker, border: `1px solid ${colors.gold}4D`,
    borderRadius: 10, overflow: 'hidden', minWidth: 170,
    boxShadow: '0 10px 40px rgba(0,0,0,0.3)', zIndex: 100,
  },
  item: {
    display: 'flex', alignItems: 'center', gap: 10, width: '100%',
    padding: '10px 14px', border: 'none', background: 'transparent',
    color: 'rgba(255,255,255,0.85)', cursor: 'pointer',
    fontSize: '0.85rem', textAlign: 'left', transition: 'background 0.15s',
  },
  itemActive: { background: 'rgba(201,168,76,0.1)', color: colors.gold },
  itemCode: {
    width: 28, height: 20, borderRadius: 4,
    background: 'rgba(255,255,255,0.08)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: '0.7rem', fontWeight: 700,
  },
};
