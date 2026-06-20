import { useState, useEffect, useRef } from 'react';
import { useLang } from '../context/LanguageContext';
import { apiGet } from '../api';
import PageBanner from '../components/PageBanner';
import AnimatedSection from '../components/AnimatedSection';
import { colors } from '../theme';

const fallback = [
  {
    id: 'f1',
    name_fr: 'Sousse — Perle de la Méditerranée',
    name_ar: 'سوسة — لؤلؤة البحر الأبيض المتوسط',
    name_en: 'Sousse — Pearl of the Mediterranean',
    description_fr: 'Découvrez les plages paradisiaques de Sousse. Profitez du soleil, de la mer turquoise et du sable fin lors de ce séjour tout inclus.',
    description_ar: 'اكتشف شواطئ سوسة الجنة.',
    description_en: 'Discover the paradisiacal beaches of Sousse.',
    images: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80',
      'https://images.unsplash.com/photo-1488085061387-422e29b40080?w=800&q=80',
      'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=80',
      'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=800&q=80',
      'https://images.unsplash.com/photo-1490077476659-095159692ab5?w=800&q=80',
    ],
    price: '31 990 DA',
    duration: '7 Jours / 6 Nuits',
    dates: ['15 Juillet 2026', '1 Août 2026', '15 Août 2026'],
  },
  {
    id: 'f2',
    name_fr: 'Istanbul — Entre Orient et Occident',
    name_ar: 'إسطنبول — بين الشرق والغرب',
    name_en: 'Istanbul — Between East and West',
    description_fr: 'Explorez ses palais majestueux, ses mosquées historiques et son célèbre Grand Bazar.',
    description_ar: 'استكشفوا قصورها المهيبة ومساجدها التاريخية.',
    description_en: 'Explore its majestic palaces and historical mosques.',
    images: [
      'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=800&q=80',
      'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80',
      'https://images.unsplash.com/photo-1473116763249-2faaef81ccda?w=800&q=80',
      'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=800&q=80',
      'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&q=80',
    ],
    price: '133 000 DA',
    duration: '8 Jours / 7 Nuits',
    dates: ['20 Juillet 2026', '10 Août 2026'],
  },
];

function ImageScroll({ images }) {
  const ref = useRef(null);

  return (
    <div style={{ position: 'relative' }}>
      <div ref={ref} className="gallery-scroll" style={{
        display: 'flex', gap: 12, overflowX: 'auto', paddingBottom: 10,
        scrollSnapType: 'x mandatory', cursor: 'grab',
      }}>
        {images.map((img, i) => (
          <div key={i} style={{
            minWidth: 260, height: 180, borderRadius: 14, overflow: 'hidden',
            flexShrink: 0, scrollSnapAlign: 'start', position: 'relative',
            boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
            border: `2px solid ${colors.gold}22`,
          }}>
            <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <span style={{
              position: 'absolute', bottom: 6, right: 8,
              fontSize: '0.7rem', color: '#fff',
              background: 'rgba(0,0,0,0.4)', padding: '2px 8px', borderRadius: 10,
            }}>{i + 1}/{images.length}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function DestCard({ item, lang, isRtl }) {
  const name = lang === 'ar' ? item.name_ar : lang === 'en' ? item.name_en : item.name_fr;
  const desc = lang === 'ar' ? item.description_ar : lang === 'en' ? item.description_en : item.description_fr;
  const images = item.images && item.images.length ? item.images : [];
  const dates = item.dates || [];

  return (
    <div style={{
      background: '#fff', borderRadius: 24, overflow: 'hidden',
      boxShadow: '0 10px 40px rgba(0,0,0,0.08)',
      border: `1px solid ${colors.gold}18`,
    }}>
      <div className="section-shimmer"></div>

      {/* Image scroll */}
      {images.length > 0 && (
        <div style={{ padding: '20px 24px 0' }}>
          <ImageScroll images={images} />
        </div>
      )}

      {/* Content */}
      <div style={{ padding: '20px 28px 28px' }}>
        <h3 style={{
          fontSize: '1.3rem', fontWeight: 800, color: colors.primaryDarker,
          marginBottom: 8, lineHeight: 1.3, textAlign: isRtl ? 'right' : 'left',
        }}>
          {name}
        </h3>
        <p style={{
          color: colors.textLight, fontSize: '0.9rem', lineHeight: 1.7,
          marginBottom: 16, textAlign: isRtl ? 'right' : 'left',
        }}>
          {desc}
        </p>

        {/* Dates */}
        {dates.length > 0 && (
          <div style={{ textAlign: isRtl ? 'right' : 'left' }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 700, color: colors.primary, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              {isRtl ? 'التواريخ' : lang === 'en' ? 'Dates' : 'Dates du séjour'}
            </span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 8, flexDirection: isRtl ? 'row-reverse' : 'row' }}>
              {dates.map((d, i) => (
                <span key={i} style={{
                  fontSize: '0.8rem', fontWeight: 500, color: colors.goldDark,
                  background: `${colors.gold}12`, padding: '6px 14px',
                  borderRadius: 20, border: `1px solid ${colors.gold}22`,
                }}>
                  📅 {d}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Blog() {
  const { t, lang } = useLang();
  const [items, setItems] = useState(fallback);
  const isRtl = lang === 'ar';

  useEffect(() => {
    apiGet('/organized-destinations').then(data => {
      if (data && data.length) setItems(data);
    }).catch(() => {});
  }, []);

  return (
    <>
      <PageBanner title={t('blog_title')} sub={t('blog_sub')} />
      <AnimatedSection style={{ padding: '60px 0 80px', position: 'relative', overflow: 'hidden' }}>
        <div className="blob-deco blob-1" style={{ top: '-100px', right: '-80px', opacity: 0.15 }}></div>
        <div className="blob-deco blob-2" style={{ bottom: '-100px', left: '-80px', opacity: 0.15 }}></div>
        <div className="deco-shape anim-float" style={{ top: '10%', right: '3%', width: 40, height: 40, border: `2px solid ${colors.gold}22`, borderRadius: '50%' }} />
        <div className="deco-shape anim-float-slow" style={{ bottom: '15%', left: '2%', width: 50, height: 50, background: `${colors.primary}11`, borderRadius: '50%' }} />

        <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 20px', position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', gap: 30 }}>
          {items.map((item, i) => (
            <div key={item.id || i} className="animate-fade-up" style={{ transitionDelay: `${i * 0.12}s` }}>
              <DestCard item={item} lang={lang} isRtl={isRtl} />
            </div>
          ))}

          {items.length === 0 && (
            <div style={{ textAlign: 'center', padding: '60px 20px', color: colors.gray }}>
              <div style={{ fontSize: '3rem', marginBottom: 15 }}>🧳</div>
              <p>Aucune destination organisée</p>
            </div>
          )}
        </div>
      </AnimatedSection>
    </>
  );
}
