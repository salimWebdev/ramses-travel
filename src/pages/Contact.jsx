import { useLang } from '../context/LanguageContext';
import PageBanner from '../components/PageBanner';
import ContactForm from '../components/ContactForm';
import AnimatedSection from '../components/AnimatedSection';
import { colors } from '../theme';

const contactItems = [
  { icon: '📍', label: 'Adresse', value: 'contact_address', value2: 'contact_city' },
  { icon: '📞', label: 'Téléphone', value: 'contact_phone' },
  { icon: '✉️', label: 'Email', value: 'contact_email' },
];

export default function Contact() {
  const { t } = useLang();
  return (
    <>
      <PageBanner title={t('contact_title')} sub={t('contact_sub')} />
      <AnimatedSection style={{ padding: '80px 0', position: 'relative', overflow: 'hidden' }}>
        <div className="blob-deco blob-2" style={{ bottom: '-80px', left: '-60px' }}></div>
        <div className="deco-shape anim-float" style={{ top: '12%', left: '4%', width: 35, height: 35, border: `2px solid ${colors.gold}33`, borderRadius: '50%', opacity: 0.6 }} />
        <div className="deco-shape anim-float-slow" style={{ bottom: '25%', right: '3%', width: 45, height: 45, background: `${colors.primary}11`, borderRadius: '50%' }} />
        <div className="deco-shape anim-spin" style={{ top: '35%', left: '8%', width: 20, height: 20, border: `1.5px solid ${colors.gold}44`, borderRadius: '50%', background: 'transparent' }} />
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 20px', position: 'relative', zIndex: 1 }}>
          <div className="contact-grid">
            <div className="animate-fade-up">
              <h3 style={{ color: colors.primaryDarker, fontSize: '1.3rem', marginBottom: 10, fontWeight: 700 }}>{t('contact_info_title')}</h3>
              <div className="section-divider" style={{ margin: '0 0 25px 0' }}></div>
              {contactItems.map((item, i) => (
                <div key={i} className="card-lift" style={{ display: 'flex', gap: 15, marginBottom: 18, padding: '18px 20px', background: '#fff', borderRadius: 14, boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
                  <div style={{ width: 48, height: 48, minWidth: 48, background: `linear-gradient(135deg, ${colors.gold}22, ${colors.gold}11)`, borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>{item.icon}</div>
                  <div>
                    <strong style={{ display: 'block', color: colors.primaryDarker, marginBottom: 3, fontSize: '0.85rem' }}>{item.label}</strong>
                    <span style={{ color: colors.gray, fontSize: '0.9rem' }}>
                      {item.value ? t(item.value) : item.fallback}
                      {item.value2 && <><br />{t(item.value2)}</>}
                    </span>
                  </div>
                </div>
              ))}
              <div style={{ marginTop: 25, borderRadius: 16, overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
                <iframe
                  title="map"
                  style={{ width: '100%', height: 200, border: 'none' }}
                  loading="lazy"
                  src="https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=Tizi+Ouzou+Algeria&zoom=13"
                  allowFullScreen
                />
              </div>
            </div>
            <div className="animate-fade-up stagger-2">
              <ContactForm />
            </div>
          </div>
        </div>
      </AnimatedSection>
    </>
  );
}
