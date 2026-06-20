import { useState, useEffect } from 'react';
import { useLang } from '../context/LanguageContext';
import AnimatedSection from './AnimatedSection';
import { colors } from '../theme';
import { apiGet } from '../api';

const fallbackReviews = [
  { text_fr: 'Excellent service ! L\'équipe de Ramses Travel m\'a aidé à organiser un voyage inoubliable en Tunisie. Professionnel et à l\'écoute.', name: 'Karim B.', rating: 5, source: 'manual' },
  { text_fr: 'Je recommande vivement ! Voyage organisé à Istanbul parfait du début à la fin. Merci à toute l\'équipe.', name: 'Sofia M.', rating: 5, source: 'manual' },
  { text_fr: 'Rapide, efficace et des prix imbattables. Ma référence pour tous mes voyages.', name: 'Amine H.', rating: 5, source: 'manual' },
];

const fallbackAr = [
  { text_ar: 'خدمة ممتازة! ساعدني فريق رمسيس Travel في تنظيم رحلة لا تنسى إلى تونس. محترفون ويصغون جيداً.', name: 'كريم ب.', rating: 5 },
  { text_ar: 'أنصح به بشدة! رحلة منظمة إلى إسطنبول مثالية من البداية إلى النهاية. شكراً للفريق بأكمله.', name: 'صوفيا م.', rating: 5 },
  { text_ar: 'سريع، فعال وأسعار لا تُقبل. مرجعي لجميع أسفاري.', name: 'أمين ح.', rating: 5 },
];

const fallbackEn = [
  { text_en: 'Excellent service! The Ramses Travel team helped me organize an unforgettable trip to Tunisia. Professional and attentive.', name: 'Karim B.', rating: 5 },
  { text_en: 'Highly recommend! Perfect organized trip to Istanbul from start to finish. Thank you to the whole team.', name: 'Sofia M.', rating: 5 },
  { text_en: 'Fast, efficient and unbeatable prices. My go-to for all my travels.', name: 'Amine H.', rating: 5 },
];

export default function Testimonials() {
  const { t, lang } = useLang();
  const [reviews, setReviews] = useState([]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    apiGet('/reviews').then(data => {
      if (data && data.length > 0) {
        setReviews(data.slice(0, 10));
      } else {
        const fb = lang === 'ar' ? fallbackAr : lang === 'en' ? fallbackEn : fallbackReviews;
        setReviews(fb);
      }
    }).catch(() => {
      const fb = lang === 'ar' ? fallbackAr : lang === 'en' ? fallbackEn : fallbackReviews;
      setReviews(fb);
    });
  }, [lang]);

  useEffect(() => {
    if (reviews.length <= 1) return;
    const timer = setInterval(() => setCurrent(c => (c + 1) % reviews.length), 5000);
    return () => clearInterval(timer);
  }, [reviews.length]);

  const getReviewText = (r) => {
    if (lang === 'ar' && r.text_ar) return r.text_ar;
    if (lang === 'en' && r.text_en) return r.text_en;
    if (lang === 'ar' && r.text) return r.text;
    if (lang === 'en' && r.text) return r.text;
    return r.text || r.text_fr || '';
  };

  const getStars = (n) => '★'.repeat(n || 5) + '☆'.repeat(5 - (n || 5));

  return (
    <AnimatedSection style={styles.section}>
      <div style={styles.container}>
        <div style={styles.titleWrap}>
          <h2 style={styles.title}>{t('sec_test_title')}</h2>
          <div style={styles.line}></div>
          <p style={styles.sub}>{t('sec_test_sub')}</p>
        </div>
        {reviews.length > 0 && (
          <div style={styles.carousel}>
            <div style={styles.cardWrap}>
              {reviews.map((item, i) => (
                <div key={i} className={`testimonial-slide ${i === current ? 'active' : ''}`} style={styles.card}>
                  <div style={styles.quoteIcon}>&ldquo;</div>
                  <div style={styles.stars}>{getStars(item.rating)}</div>
                  <p style={styles.text}>{getReviewText(item)}</p>
                  <div style={styles.author}>
                    {item.profilePhoto ? (
                      <img src={item.profilePhoto} alt="" style={styles.avatar} />
                    ) : (
                      <div style={{...styles.avatar, background: colors.goldLight, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', color: colors.primaryDarker, fontWeight: 700}}>
                        {(item.name || '?')[0].toUpperCase()}
                      </div>
                    )}
                    <div>
                      <strong style={styles.name}>{item.name || 'Client'}</strong>
                      <div style={styles.role}>{item.source === 'google' ? 'Avis Google Maps' : 'Client Ramses Travel'}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {reviews.length > 1 && (
              <div className="testimonial-dots">
                {reviews.map((_, i) => (
                  <button key={i} className={`testimonial-dot ${i === current ? 'active' : ''}`}
                    onClick={() => setCurrent(i)} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </AnimatedSection>
  );
}

const styles = {
  section: { padding: '80px 0', background: '#f8fafc' },
  container: { maxWidth: 800, margin: '0 auto', padding: '0 20px' },
  titleWrap: { textAlign: 'center', marginBottom: 50 },
  title: { fontSize: '2.2rem', color: colors.primaryDarker, marginBottom: 10, fontWeight: 700 },
  line: { width: 60, height: 3, background: colors.gold, margin: '0 auto 15px' },
  sub: { color: colors.gray, fontSize: '1.05rem', maxWidth: 600, margin: '0 auto' },
  carousel: { position: 'relative' },
  cardWrap: { position: 'relative', minHeight: 280 },
  card: { background: '#fff', padding: 40, borderRadius: 16, boxShadow: '0 8px 30px rgba(0,0,0,0.06)', flexDirection: 'column', position: 'relative' },
  quoteIcon: { position: 'absolute', top: 15, right: 25, fontSize: '4rem', color: colors.gold, opacity: 0.15, fontWeight: 800, lineHeight: 1, fontFamily: 'Georgia, serif' },
  stars: { color: colors.gold, marginBottom: 15, fontSize: '1rem', letterSpacing: 2 },
  text: { color: colors.textLight, fontStyle: 'italic', marginBottom: 20, lineHeight: 1.8, fontSize: '1rem' },
  author: { display: 'flex', alignItems: 'center', gap: 14 },
  avatar: { width: 50, height: 50, borderRadius: '50%', objectFit: 'cover', border: `3px solid ${colors.gold}` },
  name: { color: colors.primaryDarker, fontSize: '0.95rem', display: 'block' },
  role: { color: colors.gray, fontSize: '0.8rem', marginTop: 2 },
};
