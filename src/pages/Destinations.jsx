import { useState, useEffect } from 'react';
import { useLang } from '../context/LanguageContext';
import PageBanner from '../components/PageBanner';
import { colors } from '../theme';
import { apiGet } from '../api';

const fallbackDests = [
  {
    id: 'sousse',
    name: { fr: 'Sousse, Tunisie', ar: 'سوسة، تونس', en: 'Sousse, Tunisia' },
    tag: { fr: 'Promo été', ar: 'عرض الصيف', en: 'Summer promo' },
    mapQuery: 'Sousse+Tunisia',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80',
    price: '31 990 DA',
    rating: 4.5,
    reviews: 128,
    duration: '7 Jours / 6 Nuits',
    desc: {
      fr: "Découvrez les plages paradisiaques de Sousse, perle de la Méditerranée. Profitez du soleil, de la mer turquoise et du sable fin lors de ce séjour tout inclus. La médina de Sousse, classée au patrimoine mondial de l'UNESCO, vous émerveillera par ses ruelles authentiques et son riche patrimoine historique.",
      ar: 'اكتشف شواطئ سوسة الجنة، لؤلؤة البحر الأبيض المتوسط. استمتع بالشمس والبحر الفيروزي والرمال الناعمة خلال هذه الإقامة الشاملة. المدينة القديمة في سوسة، المدرجة في قائمة اليونسكو للتراث العالمي، ستبهرك بأزقتها الأصيلة وتراثها التاريخي الغني.',
      en: 'Discover the paradisiacal beaches of Sousse, pearl of the Mediterranean. Enjoy the sun, turquoise sea and fine sand during this all-inclusive stay. The medina of Sousse, a UNESCO World Heritage site, will amaze you with its authentic alleys and rich historical heritage.',
    },
    includes: [
      { fr: 'Vol aller-retour', ar: 'رحلة ذهاب وعودة', en: 'Round trip flight' },
      { fr: 'Séjour 7 jours / 6 nuits en hôtel 4★', ar: 'إقامة 7 أيام / 6 ليالٍ في فندق 4 نجوم', en: '7 days / 6 nights in 4★ hotel' },
      { fr: 'Demi-pension (Petit-déjeuner + Dîner)', ar: 'نصف إقامة (فطور + عشاء)', en: 'Half board (Breakfast + Dinner)' },
      { fr: 'Transport aller-retour en bus confortable', ar: 'نقل ذهاب وعودة بحافلة مريحة', en: 'Round trip by comfortable bus' },
      { fr: 'Accompagnement & assistance durant le séjour', ar: 'مرافقة ومساعدة خلال الإقامة', en: 'Guidance & assistance during stay' },
    ],
    recommendations: [
      { name: { fr: 'Plage de Sousse', ar: 'شاطئ سوسة', en: 'Sousse Beach' }, rating: 4.6, text: { fr: 'Plage de sable fin, eau claire, idéale pour les familles', ar: 'شاطئ رملي ناعم، مياه صافية، مثالي للعائلات', en: 'Fine sand beach, clear water, ideal for families' } },
      { name: { fr: 'Médina de Sousse', ar: 'مدينة سوسة القديمة', en: 'Medina of Sousse' }, rating: 4.7, text: { fr: 'Classée UNESCO, souks authentiques et architecture historique', ar: 'مدرجة في اليونسكو، أسواق أصلية وهندسة معمارية تاريخية', en: 'UNESCO listed, authentic souks and historical architecture' } },
      { name: { fr: 'Port El Kantaoui', ar: 'ميناء القنطاوي', en: 'Port El Kantaoui' }, rating: 4.5, text: { fr: 'Station balnéaire moderne avec marina, golf et restaurants', ar: 'منتجع عصري مع مرسى وملعب غولف ومطاعم', en: 'Modern resort with marina, golf and restaurants' } },
    ],
  },
  {
    id: 'istanbul',
    name: { fr: 'Istanbul, Turquie', ar: 'إسطنبول، تركيا', en: 'Istanbul, Turkey' },
    tag: { fr: 'Nouveau', ar: 'جديد', en: 'New' },
    mapQuery: 'Istanbul+Turkey',
    image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=800&q=80',
    price: '133 000 DA',
    rating: 4.7,
    reviews: 95,
    duration: '8 Jours / 7 Nuits',
    desc: {
      fr: "Istanbul, ville aux deux continents, vous invite à un voyage exceptionnel entre Orient et Occident. Explorez ses palais majestueux, ses mosquées historiques et son célèbre Grand Bazar. Cette métropole vibrante vous séduira par son ambiance unique, sa gastronomie raffinée et l'hospitalité légendaire de ses habitants.",
      ar: 'إسطنبول، مدينة القارتين، تدعوكم لرحلة استثنائية بين الشرق والغرب. استكشفوا قصورها المهيبة ومساجدها التاريخية وبازارها الكبير الشهير. هذه المدينة النابضة بالحياة ستأسركم بأجوائها الفريدة ومطبخها الراقي وكرم ضيافة سكانها الأسطوري.',
      en: 'Istanbul, city on two continents, invites you on an exceptional journey between East and West. Explore its majestic palaces, historical mosques and famous Grand Bazaar. This vibrant metropolis will captivate you with its unique atmosphere, refined gastronomy and legendary hospitality.',
    },
    includes: [
      { fr: 'Vol aller-retour Alger – Istanbul (Turkish Airlines)', ar: 'رحلة ذهاب وعودة الجزائر – إسطنبول (الخطوط التركية)', en: 'Round trip Algiers – Istanbul (Turkish Airlines)' },
      { fr: 'Hébergement 8 jours / 7 nuits en hôtel 4★', ar: 'إقامة 8 أيام / 7 ليالٍ في فندق 4 نجوم', en: '8 days / 7 nights in 4★ hotel' },
      { fr: 'Petit-déjeuner inclus durant tout le séjour', ar: 'فطور مشمول طوال الإقامة', en: 'Breakfast included' },
      { fr: '19 excursions organisées', ar: '19 رحلة منظمة', en: '19 organized excursions' },
      { fr: 'Guide francophone accompagnateur', ar: 'مرشد ناطق بالفرنسية', en: 'French-speaking guide' },
    ],
    recommendations: [
      { name: { fr: 'Sainte-Sophie', ar: 'آيا صوفيا', en: 'Hagia Sophia' }, rating: 4.8, text: { fr: "Chef-d'œuvre architectural, musée puis mosquée, incontournable", ar: 'تحفة معمارية، متحف ثم مسجد، لا يُفوّت', en: 'Architectural masterpiece, museum then mosque, unmissable' } },
      { name: { fr: 'Mosquée Bleue', ar: 'المسجد الأزرق', en: 'Blue Mosque' }, rating: 4.7, text: { fr: "Magnifique mosquée aux 6 minarets et céramiques d'Iznik", ar: 'مسجد رائع ذو 6 مآذن وخزف إزنيق', en: 'Magnificent mosque with 6 minarets and Iznik tiles' } },
      { name: { fr: 'Grand Bazar', ar: 'البازار الكبير', en: 'Grand Bazaar' }, rating: 4.5, text: { fr: 'Plus grand marché couvert au monde, 4000 boutiques', ar: 'أكبر سوق مغطى في العالم، 4000 متجر', en: 'Largest covered market in the world, 4000 shops' } },
    ],
  },
  {
    id: 'antalya',
    name: { fr: 'Antalya, Turquie', ar: 'أنطاليا، تركيا', en: 'Antalya, Turkey' },
    tag: { fr: 'Bientôt', ar: 'قريباً', en: 'Coming soon' },
    mapQuery: 'Antalya+Turkey',
    image: 'https://images.unsplash.com/photo-1587271337852-1f9845e0f2e8?w=800&q=80',
    price: 'À partir de 45 000 DA',
    rating: 4.6,
    reviews: 72,
    duration: '7 Jours / 6 Nuits',
    desc: {
      fr: 'Antalya, joyau de la Riviera turque, vous offre des plages de rêve, une vieille ville charmante et des sites antiques fascinants. Entre mer cristalline, montagnes verdoyantes et vestiges romains, cette destination est un véritable paradis pour les amateurs de farniente et de culture.',
      ar: 'أنطاليا، جوهرة الريفييرا التركية، تقدم لك شواطئ الأحلام ومدينة قديمة ساحرة ومواقع أثرية رائعة. بين البحر الصافي والجبال الخضراء والآثار الرومانية، هذه الوجهة هي جنة حقيقية لعشاق الاسترخاء والثقافة.',
      en: 'Antalya, jewel of the Turkish Riviera, offers dream beaches, a charming old town and fascinating ancient sites. Between crystal-clear sea, green mountains and Roman ruins, this destination is a true paradise for relaxation and culture lovers.',
    },
    includes: [
      { fr: 'Vol aller-retour', ar: 'رحلة ذهاب وعودة', en: 'Round trip flight' },
      { fr: 'Séjour 7 jours / 6 nuits en hôtel 5★', ar: 'إقامة 7 أيام / 6 ليالٍ في فندق 5 نجوم', en: '7 days / 6 nights in 5★ hotel' },
      { fr: 'Tout inclus (buffet illimité)', ar: 'شامل كلياً (بوفيه مفتوح)', en: 'All inclusive (unlimited buffet)' },
      { fr: 'Transferts aéroport', ar: 'انتقالات المطار', en: 'Airport transfers' },
    ],
    recommendations: [
      { name: { fr: 'Vieille Ville (Kaleiçi)', ar: 'المدينة القديمة (كاليشي)', en: 'Old Town (Kaleiçi)' }, rating: 4.7, text: { fr: 'Quartier historique aux ruelles pavées et maisons ottomanes', ar: 'حي تاريخي بشوارع مرصوفة ومنازل عثمانية', en: 'Historic district with cobbled streets and Ottoman houses' } },
      { name: { fr: 'Plage de Lara', ar: 'شاطئ لارا', en: 'Lara Beach' }, rating: 4.6, text: { fr: 'Plage de sable doré avec complexes hôteliers de luxe', ar: 'شاطئ رملي ذهبي مع منتجعات فاخرة', en: 'Golden sand beach with luxury resorts' } },
    ],
  },
];

export default function Destinations() {
  const { lang, t } = useLang();
  const [destList, setDestList] = useState(fallbackDests);
  const [selected, setSelected] = useState(destList[0]);
  const [lightbox, setLightbox] = useState(null);

  useEffect(() => {
    apiGet('/destinations').then(apiDests => {
      if (apiDests && apiDests.length) {
        const mapped = apiDests.map(d => ({
          id: d.id,
          name: { fr: d.name_fr || '', ar: d.name_ar || '', en: d.name_en || '' },
          tag: { fr: d.tag_fr || 'Offre', ar: d.tag_ar || 'عرض', en: d.tag_en || 'Offer' },
          mapQuery: d.mapQuery || (d.name_en || '').replace(/ /g, '+') + '+Turkey',
          image: d.image || '',
          price: d.price || '',
          rating: d.rating || 4.5,
          reviews: d.reviews || 0,
          duration: d.duration || '',
          desc: { fr: d.desc_fr || '', ar: d.desc_ar || '', en: d.desc_en || '' },
          includes: (d.includes_fr || []).map((_, i) => ({
            fr: (d.includes_fr || [])[i] || '',
            ar: (d.includes_ar || [])[i] || '',
            en: (d.includes_en || [])[i] || '',
          })),
          recommendations: (d.recommendations || []).map(r => ({
            name: { fr: r.name_fr || '', ar: r.name_ar || '', en: r.name_en || '' },
            rating: r.rating || 4.5,
            text: { fr: r.text_fr || '', ar: r.text_ar || '', en: r.text_en || '' },
          })),
        }));
        setDestList(mapped);
        setSelected(mapped[0]);
      }
    });
  }, []);

  const getMapUrl = (d) =>
    `https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${d.mapQuery}&zoom=12`;

  const getWhatsAppUrl = (d) => {
    const msg = encodeURIComponent(`${t('dest_contact_msg')} ${d.name[lang]} (${d.price})`);
    return `https://wa.me/213557872453?text=${msg}`;
  };

  return (
    <>
      <PageBanner title={t('destinations_title')} sub={t('destinations_sub')} />
      <section style={{ ...styles.page, position: 'relative', overflow: 'hidden' }} id="dest-page">
        <div className="blob-deco blob-1" style={{ top: '-80px', right: '-60px', opacity: 0.3 }}></div>
        <div className="blob-deco blob-2" style={{ bottom: '-80px', left: '-60px', opacity: 0.3 }}></div>
        <div className="deco-shape anim-float" style={{ top: '10%', left: '3%', width: 30, height: 30, border: `2px solid ${colors.gold}33`, borderRadius: '50%', opacity: 0.5 }} />
        <div className="deco-shape anim-float-slow" style={{ bottom: '15%', right: '4%', width: 40, height: 40, background: `${colors.primary}11`, borderRadius: '50%' }} />
        <div className="section-divider" style={{ marginBottom: 40 }}></div>
        <div className="dest-grid" style={styles.container}>
          <div className="dest-left" style={styles.leftCol}>
            <div style={styles.destList}>
              {destList.map((d) => (
                <button
                  key={d.id}
                  onClick={() => setSelected(d)}
                  className="dest-card-btn"
                  style={{
                    ...styles.destBtn,
                    ...(selected.id === d.id ? styles.destBtnActive : {}),
                  }}>
                  <img src={d.image} alt="" style={styles.destBtnImg} />
                  <div style={styles.destBtnInfo}>
                    <strong style={styles.destBtnName}>{d.name[lang]}</strong>
                    <span style={{ ...styles.destBtnPrice, ...(selected.id === d.id ? { color: colors.gold } : {}) }}>{d.price}</span>
                    <div style={styles.destBtnMeta}>
                      <span>⭐ {d.rating}</span>
                      <span>🗓️ {d.duration}</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div style={styles.rightCol}>
            <div style={styles.detailCard}>
              <div style={styles.detailHeader} onClick={() => setLightbox(0)} className="gradient-border">
                <img src={selected.image} alt="" style={styles.detailImg} />
                <div style={styles.detailOverlay}>
                  <span style={styles.detailTag}>{selected.tag[lang]}</span>
                  <h2 style={styles.detailTitle}>{selected.name[lang]}</h2>
                  <div style={styles.detailMeta}>
                    <span>⭐ {selected.rating}</span>
                    <span>💬 {selected.reviews} avis</span>
                    <span>🗓️ {selected.duration}</span>
                  </div>
                  <div style={styles.detailPrice}>{selected.price}</div>
                </div>
              </div>

              <div style={styles.detailBody}>
                <div style={styles.mapSec}>
                  <iframe
                    title="map"
                    style={styles.map}
                    loading="lazy"
                    src={getMapUrl(selected)}
                    allowFullScreen
                  />
                </div>
                <div style={styles.sec}>
                  <h3 style={styles.secTitle}>{lang === 'ar' ? 'الوصف' : 'Description'}</h3>
                  <p style={styles.desc}>{selected.desc[lang]}</p>
                </div>

                <div style={styles.sec}>
                  <h3 style={styles.secTitle}>{lang === 'ar' ? 'مشمول في الرحلة' : lang === 'en' ? "What's included" : 'Ce qui est inclus'}</h3>
                  <ul style={styles.incList}>
                    {selected.includes.map((item, i) => (
                      <li key={i} style={styles.incItem}>
                        <span style={styles.incCheck}>✓</span>
                        {item[lang]}
                      </li>
                    ))}
                  </ul>
                </div>

                <div style={styles.sec}>
                  <h3 style={styles.secTitle}>
                    {lang === 'ar' ? '⭐ توصيات Google Maps' : lang === 'en' ? '⭐ Google Maps Recommendations' : '⭐ Recommandations Google Maps'}
                  </h3>
                  <div style={styles.recGrid}>
                    {selected.recommendations.map((rec, i) => (
                      <div key={i} className="dest-rec-card" style={styles.recCard}>
                        <div style={styles.recHeader}>
                          <strong style={styles.recName}>{rec.name[lang]}</strong>
                          <span style={styles.recRating}>⭐ {rec.rating}</span>
                        </div>
                        <p style={styles.recText}>{rec.text[lang]}</p>
                        <div style={styles.recBar}>
                          <div style={{ ...styles.recBarFill, width: `${(rec.rating / 5) * 100}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <a href={getWhatsAppUrl(selected)} target="_blank" rel="noopener" className="dest-cta" style={styles.cta}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  {t('dest_contact_btn')}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {lightbox !== null && (
        <div className="lightbox-overlay" onClick={() => setLightbox(null)}>
          <button className="lightbox-close" onClick={() => setLightbox(null)}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
          {lightbox > 0 && (
            <button className="lightbox-nav lightbox-prev" onClick={(e) => { e.stopPropagation(); setLightbox(lightbox - 1); }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>
            </button>
          )}
          <img className="lightbox-img" src={selected.image} alt="" onClick={(e) => e.stopPropagation()} />
          {lightbox < 0 && (
            <button className="lightbox-nav lightbox-next" onClick={(e) => { e.stopPropagation(); setLightbox(lightbox + 1); }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
            </button>
          )}
          <div className="lightbox-counter">{lightbox + 1} / 1</div>
        </div>
      )}
    </>
  );
}

const styles = {
  page: { padding: '60px 0', background: colors.offWhite },
  container: {
    maxWidth: 1200, margin: '0 auto', padding: '0 20px',
    display: 'grid', gridTemplateColumns: '400px 1fr', gap: 35,
    alignItems: 'start',
  },
  leftCol: { display: 'flex', flexDirection: 'column', gap: 16, position: 'sticky', top: 90 },
  rightCol: { minWidth: 0 },

  destList: { display: 'flex', flexDirection: 'column', gap: 10 },
  destBtn: {
    display: 'flex', gap: 14, alignItems: 'center',
    background: '#fff', border: '2px solid transparent',
    borderRadius: 14, padding: 12, cursor: 'pointer',
    textAlign: 'left', fontFamily: 'inherit',
    boxShadow: '0 2px 10px rgba(0,0,0,0.04)',
    transition: 'all 0.25s',
  },
  destBtnActive: { borderColor: colors.gold, boxShadow: `0 4px 20px ${colors.gold}22` },
  destBtnImg: { width: 70, height: 70, borderRadius: 10, objectFit: 'cover', flexShrink: 0 },
  destBtnInfo: { flex: 1, minWidth: 0 },
  destBtnName: { display: 'block', color: colors.primaryDarker, fontSize: '0.95rem', marginBottom: 2 },
  destBtnPrice: { fontSize: '0.85rem', fontWeight: 700, color: colors.primary, display: 'block', marginBottom: 4 },
  destBtnMeta: { display: 'flex', gap: 10, fontSize: '0.75rem', color: colors.gray },

  map: { width: '100%', height: '100%', border: 'none', borderRadius: 12 },

  detailCard: { background: '#fff', borderRadius: 16, overflow: 'hidden', boxShadow: '0 8px 30px rgba(0,0,0,0.08)' },
  detailHeader: { position: 'relative', height: 260, overflow: 'hidden' },
  detailImg: { width: '100%', height: '100%', objectFit: 'cover' },
  detailOverlay: {
    position: 'absolute', inset: 0,
    background: 'linear-gradient(transparent 30%, rgba(26,61,92,0.9) 100%)',
    display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
    padding: '28px 24px',
  },
  detailTag: {
    display: 'inline-block', alignSelf: 'flex-start',
    background: `${colors.gold}E6`, color: '#fff',
    fontSize: '0.75rem', fontWeight: 700, padding: '4px 14px',
    borderRadius: 20, marginBottom: 8,
  },
  detailTitle: { color: '#fff', fontSize: '1.6rem', fontWeight: 800, marginBottom: 5 },
  detailMeta: { display: 'flex', gap: 14, flexWrap: 'wrap', fontSize: '0.8rem', color: 'rgba(255,255,255,0.85)', marginBottom: 6 },
  detailPrice: {
    display: 'inline-block', alignSelf: 'flex-start',
    fontSize: '1.3rem', fontWeight: 800, color: colors.gold,
  },

  detailBody: { padding: '24px' },
  mapSec: { marginBottom: 20, borderRadius: 12, overflow: 'hidden', height: 220, boxShadow: '0 4px 15px rgba(0,0,0,0.08)' },
  sec: { marginBottom: 24 },
  secTitle: { fontSize: '1.1rem', fontWeight: 700, color: colors.primaryDarker, marginBottom: 10 },
  desc: { color: colors.textLight, fontSize: '0.9rem', lineHeight: 1.8 },

  incList: { listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 7 },
  incItem: { display: 'flex', alignItems: 'center', gap: 10, fontSize: '0.88rem', color: '#444' },
  incCheck: {
    width: 20, height: 20, borderRadius: '50%', flexShrink: 0,
    background: `${colors.gold}22`, color: colors.goldDark,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: '0.65rem', fontWeight: 700,
  },

  recGrid: { display: 'flex', flexDirection: 'column', gap: 10 },
  recCard: { background: colors.offWhite, borderRadius: 10, padding: '14px 16px' },
  recHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 },
  recName: { color: colors.primaryDarker, fontSize: '0.9rem' },
  recRating: { fontSize: '0.8rem', color: colors.gold, fontWeight: 600 },
  recText: { color: colors.gray, fontSize: '0.82rem', marginBottom: 8, lineHeight: 1.5 },
  recBar: { height: 4, background: colors.grayLight, borderRadius: 4, overflow: 'hidden' },
  recBarFill: { height: '100%', background: `linear-gradient(90deg, ${colors.gold}, ${colors.goldDark})`, borderRadius: 4, transition: 'width 0.6s ease' },

  cta: {
    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
    padding: '14px 28px', borderRadius: 50, fontWeight: 700,
    fontSize: '0.95rem', textDecoration: 'none',
    background: `linear-gradient(135deg, ${colors.gold} 0%, ${colors.goldDark} 110%)`,
    color: colors.primaryDarker, border: 'none', cursor: 'pointer',
    marginTop: 14,
    boxShadow: `0 6px 25px ${colors.gold}44`,
    transition: 'all 0.3s ease',
    letterSpacing: 0.5,
  },
};
