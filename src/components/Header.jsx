import { Link, useLocation } from 'react-router-dom';
import { useLang } from '../context/LanguageContext';
import { useState, useEffect } from 'react';
import LanguageSwitcher from './LanguageSwitcher';
import { colors } from '../theme';

function useMediaQuery(query) {
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const handler = (e) => setMatches(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, [query]);
  return matches;
}

export default function Header() {
  const { t } = useLang();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isMobile = useMediaQuery('(max-width: 820px)');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { to: '/', label: t('nav_home') },
    { to: '/about', label: t('nav_about') },
    { to: '/services', label: t('nav_services') },
    { to: '/destinations', label: t('nav_destinations') },
    { to: '/blog', label: t('nav_blog') },
    { to: '/contact', label: t('nav_contact') },
  ];

  return (
    <header style={{ ...styles.header, ...(scrolled ? styles.headerScrolled : {}) }}>
      <div style={styles.inner}>
        <Link to="/" style={styles.logo}>
          <img src="/logo.jpg" alt="Ramses Travel" style={styles.logoImg}
            onError={(e) => { e.target.style.display = 'none'; document.getElementById('logo-fallback').style.display = 'block'; }} />
          <div style={styles.brandText}>
            <span className="shimmer-text" style={styles.brandName}>Ramses</span>
            <span style={styles.brandSub}>Travel</span>
          </div>
          <div id="logo-fallback" style={styles.logoFallback}>
            <div style={styles.logoText}>RAMSES</div>
            <div style={styles.logoSub}>{t('banner_home')}</div>
          </div>
        </Link>
        {isMobile && (
          <div style={styles.mobileRight}>
            <LanguageSwitcher />
            <button style={styles.hamburger} onClick={() => setMenuOpen(!menuOpen)}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                {menuOpen
                  ? <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>
                  : <><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></>
                }
              </svg>
            </button>
          </div>
        )}
        <nav style={{
          ...styles.nav,
          ...(isMobile ? { display: menuOpen ? 'flex' : 'none', width: '100%', flexDirection: 'column' } : {}),
        }}>
          {links.map(l => (
            <Link key={l.to} to={l.to} style={{
              ...styles.navLink,
              ...(location.pathname === l.to ? styles.navActive : {}),
            }} onClick={() => setMenuOpen(false)}>{l.label}</Link>
          ))}
          {!isMobile && <LanguageSwitcher />}
        </nav>
      </div>
    </header>
  );
}

const styles = {
  header: {
    background: `rgba(26,61,92,0.95)`, backdropFilter: 'blur(12px)',
    padding: '15px 0',
    position: 'sticky', top: 0, zIndex: 1000,
    transition: 'all 0.3s ease',
    borderBottom: '1px solid transparent',
  },
  headerScrolled: {
    background: colors.primaryDarker,
    padding: '10px 0',
    borderBottom: `1px solid ${colors.gold}33`,
    boxShadow: '0 4px 30px rgba(0,0,0,0.2)',
  },
  inner: {
    maxWidth: 1200, margin: '0 auto', padding: '0 20px',
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    flexWrap: 'wrap', gap: 15,
  },
  logo: {
    display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none',
  },
  logoImg: { height: 48, width: 'auto', borderRadius: 8 },
  brandText: { display: 'flex', flexDirection: 'column', lineHeight: 1.1 },
  brandName: { fontSize: '1.3rem', fontWeight: 800, color: colors.gold, letterSpacing: 2 },
  brandSub: { fontSize: '0.65rem', color: 'rgba(255,255,255,0.7)', fontWeight: 400, letterSpacing: 3, textTransform: 'uppercase' },
  logoFallback: { display: 'none' },
  logoText: {
    fontSize: '1.3rem', fontWeight: 800, color: colors.gold, letterSpacing: 3,
  },
  logoSub: {
    fontSize: '0.6rem', color: 'rgba(255,255,255,0.6)', fontWeight: 400,
    letterSpacing: 2, textTransform: 'uppercase',
  },
  mobileRight: { display: 'flex', alignItems: 'center', gap: 8 },
  hamburger: {
    background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: 8,
    color: '#fff', cursor: 'pointer', display: 'flex', padding: '8px',
  },
  nav: { display: 'flex', alignItems: 'center', gap: 4, flexWrap: 'wrap' },
  navLink: {
    color: 'rgba(255,255,255,0.85)', padding: '8px 16px', borderRadius: 8,
    fontSize: '0.85rem', fontWeight: 500, textDecoration: 'none',
    transition: 'all 0.2s',
  },
  navActive: { background: `${colors.gold}33`, color: colors.gold },
};
