import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '../context/LanguageContext';
import SearchBar from './SearchBar';
import HeroDecoration from './HeroDecoration';

export default function Hero() {
  const { t } = useLang();
  const heroRef = useRef(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        if (rect.bottom > 0) setOffset(window.scrollY * 0.3);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section ref={heroRef} style={styles.hero}>
      <div style={{ ...styles.bg, transform: `translateY(${offset}px)` }}>
        <img src="https://images.unsplash.com/photo-1488085061387-422e29b40080?w=1600&q=80"
          alt="" style={styles.bgImg} />
      </div>
      <div style={styles.overlay}></div>
      <HeroDecoration />
      <div style={styles.content}>
        <div className="hero-badge">Agence de voyage • Tizi Ouzou</div>
        <h1 className="hero-title">
          <span style={{ color: '#C9A84C' }}>{t('hero_title')}</span>{' '}
          <span>{t('hero_title_gold')}</span>
        </h1>
        <p className="hero-tagline">{t('hero_tagline')}</p>
        <p className="hero-sub">{t('hero_sub')}</p>
        <div className="hero-search" style={styles.searchWrap}>
          <SearchBar />
        </div>
        <div className="hero-buttons">
          <Link to="/destinations" className="hero-btn-gold btn-shine">{t('hero_btn1')}</Link>
          <Link to="/contact" className="hero-btn-outline">{t('hero_btn2')}</Link>
        </div>
      </div>
    </section>
  );
}

const styles = {
  hero: {
    position: 'relative', minHeight: '90vh',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    textAlign: 'center', color: '#fff', overflow: 'hidden',
  },
  bg: { position: 'absolute', inset: '-10%', zIndex: 0 },
  bgImg: { width: '100%', height: '100%', objectFit: 'cover' },
  overlay: {
    position: 'absolute', inset: 0,
    background: 'linear-gradient(135deg, rgba(26,61,92,0.85) 0%, rgba(74,144,217,0.6) 100%)',
    zIndex: 1,
  },
  content: {
    position: 'relative', zIndex: 2, maxWidth: 700, padding: '40px 20px',
  },
  searchWrap: { display: 'flex', justifyContent: 'center', marginBottom: 25, position: 'relative', zIndex: 10 },
};
