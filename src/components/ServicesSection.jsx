import { useLang } from '../context/LanguageContext';
import AnimatedSection from './AnimatedSection';
import { colors } from '../theme';

const services = [
  { key: 'ticketing', icon: '✈️' },
  { key: 'hotel', icon: '🏨' },
  { key: 'tours', icon: '🧳' },
  { key: 'visa', icon: '🛂' },
  { key: 'insurance', icon: '🛡️' },
];

export default function ServicesSection() {
  const { t } = useLang();
  return (
    <AnimatedSection style={styles.section}>
      <div style={styles.container}>
        <div className="deco-shape anim-float" style={{ top: '5%', left: '2%', width: 50, height: 50, border: `2px solid ${colors.gold}22`, borderRadius: '50%' }} />
        <div className="deco-shape anim-float-slow" style={{ bottom: '10%', right: '3%', width: 35, height: 35, background: `${colors.primary}11`, borderRadius: '50%' }} />
        <div style={styles.titleWrap}>
          <h2 style={styles.title}>{t('sec_services_title')}</h2>
          <div className="section-divider"></div>
          <p style={styles.sub}>{t('sec_services_sub')}</p>
        </div>
        <div style={styles.grid}>
          {services.map((s, i) => (
            <div key={s.key} className={`animate-scale card-lift ${'stagger-' + (i + 1)}`}
              style={styles.card}>
              <div style={styles.icon}>{s.icon}</div>
              <h3 style={styles.cardTitle}>{t(`service_${s.key}`)}</h3>
              <p style={styles.cardDesc}>{t(`service_${s.key}_desc`)}</p>
            </div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}

const styles = {
  section: { padding: '80px 0' },
  container: { maxWidth: 1200, margin: '0 auto', padding: '0 20px' },
  titleWrap: { textAlign: 'center', marginBottom: 50 },
  title: { fontSize: '2.2rem', color: colors.primaryDarker, marginBottom: 10, fontWeight: 700 },
  line: { width: 60, height: 3, background: colors.gold, margin: '0 auto 15px' },
  sub: { color: colors.gray, fontSize: '1.05rem', maxWidth: 600, margin: '0 auto' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 25 },
  card: {
    background: '#fff', padding: '35px 20px', borderRadius: 12,
    textAlign: 'center', boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
    borderBottom: `3px solid transparent`,
    transition: 'all 0.3s ease',
  },
  icon: { width: 60, height: 60, margin: '0 auto 15px', background: colors.goldLight, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' },
  cardTitle: { color: colors.primaryDarker, marginBottom: 8, fontSize: '1.1rem' },
  cardDesc: { color: colors.gray, fontSize: '0.9rem' },
};
