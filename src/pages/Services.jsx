import { useState } from 'react';
import { useLang } from '../context/LanguageContext';
import PageBanner from '../components/PageBanner';
import AnimatedSection from '../components/AnimatedSection';
import { colors } from '../theme';

const services = [
  { key: 'billetterie', img: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80', icon: '✈️', gradient: 'linear-gradient(135deg, #4A90D9, #1a3d5c)' },
  { key: 'hotel', img: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80', icon: '🏨', gradient: 'linear-gradient(135deg, #C9A84C, #8B6914)' },
  { key: 'tours', img: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&q=80', icon: '🗺️', gradient: 'linear-gradient(135deg, #2ECC71, #1A7A3A)' },
  { key: 'visa', img: 'https://images.unsplash.com/photo-1556388158-158f5f501a2a?w=800&q=80', icon: '📋', gradient: 'linear-gradient(135deg, #9B59B6, #5B2C6F)' },
  { key: 'insurance', img: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80', icon: '🛡️', gradient: 'linear-gradient(135deg, #E74C3C, #922B21)' },
];

export default function Services() {
  const { t, lang } = useLang();
  const [selected, setSelected] = useState(null);

  const openModal = (s) => setSelected(s);
  const closeModal = () => setSelected(null);

  const getPoints = (key) => {
    const raw = t(`services_${key}_points`);
    return raw ? raw.split('|') : [];
  };

  const isRtl = lang === 'ar';

  return (
    <>
      <PageBanner title={t('services_title')} sub={t('services_sub')} />
      <AnimatedSection style={{ padding: '80px 0', overflow: 'hidden', position: 'relative' }}>
        <div className="blob-deco blob-1" style={{ top: '-100px', right: '-80px' }}></div>
        <div className="blob-deco blob-2" style={{ bottom: '-100px', left: '-80px' }}></div>
        <div className="deco-shape anim-float" style={{ top: '5%', left: '2%', width: 40, height: 40, border: `2px solid ${colors.gold}33`, borderRadius: '50%', opacity: 0.5 }} />
        <div className="deco-shape anim-float-slow" style={{ top: '30%', right: '3%', width: 50, height: 50, background: `${colors.primary}11`, borderRadius: '50%' }} />
        <div className="deco-shape anim-shape" style={{ bottom: '20%', left: '4%', width: 0, height: 0, borderLeft: '10px solid transparent', borderRight: '10px solid transparent', borderBottom: `18px solid ${colors.gold}22`, opacity: 0.4 }} />
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 20px', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 25 }}>
            {services.map((s, i) => (
              <div key={s.key} className={`animate-scale card-lift ${'stagger-' + (i + 1)}`}
                onClick={() => openModal(s)}
                style={{
                  borderRadius: 20, overflow: 'hidden', cursor: 'pointer', position: 'relative',
                  minHeight: 320, background: s.gradient, display: 'flex', flexDirection: 'column',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.12)', transition: 'all 0.4s',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-8px)'; e.currentTarget.style.boxShadow = '0 16px 48px rgba(0,0,0,0.2)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.12)'; }}>
                <div style={{ position: 'absolute', inset: 0, opacity: 0.25 }}>
                  <img src={s.img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ position: 'relative', padding: 30, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                  <div style={{
                    width: 56, height: 56, borderRadius: 16, background: 'rgba(255,255,255,0.2)',
                    backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center',
                    justifyContent: 'center', fontSize: '1.6rem', marginBottom: 15,
                    boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                  }}>
                    {s.icon}
                  </div>
                  <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#fff', marginBottom: 8 }}>
                    {t(`services_${s.key}_title`)}
                  </h3>
                  <p style={{ fontSize: '0.88rem', color: 'rgba(255,255,255,0.85)', lineHeight: 1.6, marginBottom: 15 }}>
                    {t(`services_${s.key}_desc`)}
                  </p>
                  <div style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8, alignSelf: 'flex-start',
                    padding: '8px 18px', borderRadius: 50, background: 'rgba(255,255,255,0.15)',
                    backdropFilter: 'blur(8px)', fontSize: '0.8rem', fontWeight: 600, color: '#fff',
                  }}>
                    {lang === 'ar' ? 'عرض التفاصيل' : lang === 'en' ? 'View details' : 'Voir les détails'}
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      {isRtl
                        ? <><line x1="19" y1="12" x2="5" y2="12"/><polyline points="9 18 5 12 9 6"/></>
                        : <><line x1="5" y1="12" x2="19" y2="12"/><polyline points="9 18 15 12 9 6"/></>
                      }
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {selected && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 2000, display: 'flex',
          alignItems: 'center', justifyContent: 'center', padding: 20,
          animation: 'fadeIn 0.2s ease',
        }}
          onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}>
          <div style={{
            position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)',
            backdropFilter: 'blur(4px)',
          }}></div>
          <div className="animate-fade-up" style={{
            position: 'relative', background: '#fff', borderRadius: 24,
            maxWidth: 560, width: '100%', maxHeight: '85vh', overflow: 'auto',
            boxShadow: '0 40px 80px rgba(0,0,0,0.3)', padding: 0,
          }}>
            <div style={{
              position: 'relative', height: 200, overflow: 'hidden',
              background: selected.gradient,
            }}>
              <img src={selected.img} alt="" style={{
                width: '100%', height: '100%', objectFit: 'cover', opacity: 0.3,
              }} />
              <div style={{
                position: 'absolute', inset: 0,
                display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
                padding: 30,
              }}>
                <div style={{
                  width: 48, height: 48, borderRadius: 14, background: 'rgba(255,255,255,0.2)',
                  backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center',
                  justifyContent: 'center', fontSize: '1.4rem', marginBottom: 10,
                }}>
                  {selected.icon}
                </div>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff' }}>
                  {t(`services_${selected.key}_title`)}
                </h2>
              </div>
              <button onClick={closeModal} style={{
                position: 'absolute', top: 15, right: 15, width: 36, height: 36,
                borderRadius: '50%', border: 'none', background: 'rgba(255,255,255,0.2)',
                backdropFilter: 'blur(8px)', color: '#fff', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1.2rem', transition: 'all 0.2s',
              }}
                onMouseEnter={(e) => e.target.style.background = 'rgba(255,255,255,0.3)'}
                onMouseLeave={(e) => e.target.style.background = 'rgba(255,255,255,0.2)'}>
                ✕
              </button>
            </div>
            <div style={{ padding: '25px 30px 30px' }}>
              <p style={{ color: colors.textLight, fontSize: '0.95rem', lineHeight: 1.8, marginBottom: 22 }}>
                {t(`services_${selected.key}_detail`)}
              </p>
              <div style={{
                background: '#f8fafc', borderRadius: 16, padding: '20px 24px',
              }}>
                <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: colors.primary, marginBottom: 14, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  {lang === 'ar' ? 'ما يشمل هذه الخدمة' : lang === 'en' ? 'What this service includes' : 'Ce que comprend ce service'}
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {getPoints(selected.key).map((point, j) => (
                    <div key={j} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <div style={{
                        width: 22, height: 22, borderRadius: '50%', background: selected.gradient,
                        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                      }}>
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3">
                          <polyline points="20 6 9 17 4 12"/>
                        </svg>
                      </div>
                      <span style={{ fontSize: '0.88rem', color: colors.primaryDarker, fontWeight: 500 }}>{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
