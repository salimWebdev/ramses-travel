import { useState, useEffect, useRef } from 'react';
import { useLang } from '../context/LanguageContext';
import AnimatedSection from './AnimatedSection';
import { colors } from '../theme';

const stats = [
  { value: 500, suffix: '+', icon: '✈️', key: 'stats_clients' },
  { value: 10, suffix: '+', icon: '🌍', key: 'stats_destinations' },
  { value: 5, suffix: '+', icon: '⭐', key: 'stats_years' },
  { value: 100, suffix: '%', icon: '❤️', key: 'stats_rating' },
];

function useCounter(target, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const step = (ts) => {
      if (!startTime) startTime = ts;
      const p = Math.min((ts - startTime) / duration, 1);
      setCount(Math.floor(p * target));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return count;
}

function StatItem({ stat, index }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);
  const count = useCounter(stat.value, 2000, visible);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className={`stat-item animate-scale stagger-${index + 1}`}>
      <div className="stat-icon">{stat.icon}</div>
      <div className="stat-value">{count}{stat.suffix}</div>
      <div className="stat-label">{stat.key}</div>
    </div>
  );
}

export default function Stats() {
  const { t } = useLang();
  return (
    <AnimatedSection style={styles.section}>
      <div className="blob-deco blob-1"></div>
      <div className="blob-deco blob-2"></div>
      <div style={styles.container}>
        <div style={styles.grid}>
          {stats.map((s, i) => (
            <StatItem key={i} stat={{ ...s, key: t(s.key) }} index={i} />
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}

const styles = {
  section: {
    background: 'linear-gradient(135deg, #1a3d5c 0%, #2a5f8f 100%)',
    color: '#fff', padding: '80px 0', position: 'relative', overflow: 'hidden',
  },
  container: { maxWidth: 1200, margin: '0 auto', padding: '0 20px', position: 'relative', zIndex: 1 },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 25, textAlign: 'center' },
};
