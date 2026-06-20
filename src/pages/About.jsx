import { useLang } from '../context/LanguageContext';
import PageBanner from '../components/PageBanner';
import AnimatedSection from '../components/AnimatedSection';
import { colors } from '../theme';

const values = [
  { icon: '🤝', key: 'pro' },
  { icon: '🎯', key: 'quality' },
  { icon: '❤️', key: 'passion' },
  { icon: '🌍', key: 'access' },
];

const team = [
  { name: 'Équipe Ramses Travel', role: 'team_role', img: 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=200&q=80' },
];

export default function About() {
  const { t, lang } = useLang();

  return (
    <>
      <PageBanner title={t('about_title')} sub={t('about_sub')} />
      <AnimatedSection style={{ padding: '80px 0', position: 'relative', overflow: 'hidden' }}>
        <div className="blob-deco blob-1" style={{ top: '-80px', right: '-60px' }}></div>
        <div className="blob-deco blob-2" style={{ bottom: '-80px', left: '-60px' }}></div>
        <div className="deco-shape anim-float" style={{ top: '8%', left: '3%', width: 30, height: 30, border: `2px solid ${colors.gold}33`, borderRadius: '50%', opacity: 0.5 }} />
        <div className="deco-shape anim-float-slow" style={{ top: '50%', right: '4%', width: 40, height: 40, background: `${colors.primary}11`, borderRadius: '50%' }} />
        <div className="deco-shape anim-shape" style={{ bottom: '15%', left: '6%', width: 0, height: 0, borderLeft: '8px solid transparent', borderRight: '8px solid transparent', borderBottom: `15px solid ${colors.gold}22`, opacity: 0.4 }} />
        <div style={{ maxWidth: 1000, margin: '0 auto', padding: '0 20px', position: 'relative', zIndex: 1 }}>
          <div style={{ textAlign: 'center', maxWidth: 700, margin: '0 auto 60px' }}>
            <h2 style={{ fontSize: '1.8rem', color: colors.primaryDarker, marginBottom: 15, fontWeight: 700 }}>
              {t('about_story_title')}
            </h2>
            <div className="section-divider" style={{ marginBottom: 20 }}></div>
            <p style={{ color: colors.textLight, lineHeight: 1.9, fontSize: '0.98rem' }}>
              {t('about_story_1')}
            </p>
            <p style={{ color: colors.textLight, lineHeight: 1.9, fontSize: '0.98rem', marginTop: 15 }}>
              {t('about_story_2')}
            </p>
            <p style={{ color: colors.textLight, lineHeight: 1.9, fontSize: '0.98rem', marginTop: 15 }}>
              {t('about_story_3')}
            </p>
          </div>

          <div style={{ textAlign: 'center', marginBottom: 60 }}>
            <h2 style={{ fontSize: '1.6rem', color: colors.primaryDarker, marginBottom: 40, fontWeight: 700 }}>
              {t('about_mission_title')}
            </h2>
            <blockquote style={{
              fontStyle: 'italic', fontSize: '1.2rem', color: colors.primary,
              maxWidth: 600, margin: '0 auto', padding: '20px 30px',
              borderLeft: `3px solid ${colors.gold}`, background: colors.offWhite,
              borderRadius: '0 12px 12px 0', lineHeight: 1.6,
            }}>
              &ldquo;{t('about_slogan')}&rdquo;
            </blockquote>
          </div>

          <div style={{ textAlign: 'center', marginBottom: 60 }}>
            <h2 style={{ fontSize: '1.6rem', color: colors.primaryDarker, marginBottom: 10, fontWeight: 700 }}>
              {t('about_values_title')}
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 20, marginTop: 35 }}>
              {values.map((v, i) => (
                <div key={i} className="card-lift" style={{
                  background: '#fff', padding: '30px 18px', borderRadius: 16, textAlign: 'center',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.05)', borderBottom: `3px solid ${colors.gold}`,
                }}>
                  <div style={{ fontSize: '2.2rem', marginBottom: 12 }}>{v.icon}</div>
                  <h4 style={{ fontSize: '1rem', color: colors.primaryDarker, fontWeight: 700, marginBottom: 6 }}>
                    {t('about_val_' + v.key)}
                  </h4>
                  <p style={{ fontSize: '0.82rem', color: colors.gray }}>{t('about_val_' + v.key + '_desc')}</p>
                </div>
              ))}
            </div>
          </div>

          <div style={{ textAlign: 'center' }}>
            <h2 style={{ fontSize: '1.6rem', color: colors.primaryDarker, marginBottom: 35, fontWeight: 700 }}>
              {t('about_team_title')}
            </h2>
            <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 30 }}>
              {team.map((m, i) => (
                <div key={i} style={{
                  background: '#fff', borderRadius: 16, overflow: 'hidden', width: 220,
                  boxShadow: '0 4px 20px rgba(0,0,0,0.06)', padding: '25px 20px', textAlign: 'center',
                }}>
                  <img src={m.img} alt="" style={{
                    width: 100, height: 100, borderRadius: '50%', objectFit: 'cover',
                    border: `3px solid ${colors.gold}`, marginBottom: 12,
                  }} />
                  <h4 style={{ color: colors.primaryDarker, fontSize: '1rem', fontWeight: 700 }}>{m.name}</h4>
                  <p style={{ color: colors.gray, fontSize: '0.8rem' }}>{t(m.role)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </AnimatedSection>
    </>
  );
}
