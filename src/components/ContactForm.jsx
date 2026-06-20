import { useState } from 'react';
import { useLang } from '../context/LanguageContext';
import { colors } from '../theme';
import { apiPost } from '../api';

export default function ContactForm() {
  const { t } = useLang();
  const [sent, setSent] = useState(false);
  const services = ['form_service_1', 'form_service_2', 'form_service_3', 'form_service_4', 'form_service_5'];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const body = Object.fromEntries(fd.entries());
    const res = await apiPost('/contact', body);
    if (res) { setSent(true); e.target.reset(); }
  };

  if (sent) return (
    <form className="contact-form-card">
      <div style={{ textAlign: 'center', padding: '30px 0' }}>
        <p style={{ fontSize: '2.5rem', marginBottom: 10 }}>&#9989;</p>
        <h3 style={{ color: colors.primaryDarker }}>{t('form_submit')} !</h3>
        <button style={styles.btn} onClick={() => setSent(false)}>Envoyer un autre message</button>
      </div>
    </form>
  );

  return (
    <form className="contact-form-card" onSubmit={handleSubmit}>
      <h3 style={styles.title}>{t('contact_form_title')}</h3>
      <div style={styles.group}>
        <label style={styles.label}>{t('form_name')}</label>
        <input type="text" name="name" placeholder={t('form_name')} required style={styles.input} />
      </div>
      <div style={styles.group}>
        <label style={styles.label}>{t('form_email')}</label>
        <input type="email" name="email" placeholder={t('form_email')} required style={styles.input} />
      </div>
      <div style={styles.group}>
        <label style={styles.label}>{t('form_phone')}</label>
        <input type="tel" name="phone" placeholder={t('form_phone')} style={styles.input} />
      </div>
      <div style={styles.group}>
        <label style={styles.label}>{t('form_service')}</label>
        <select name="service" style={styles.input}>
          <option value="">{t('form_service_opt')}</option>
          {services.map((s, i) => (
            <option key={i} value={s.split('_')[2]}>{t(s)}</option>
          ))}
        </select>
      </div>
      <div style={styles.group}>
        <label style={styles.label}>{t('form_message')}</label>
        <textarea name="message" placeholder={t('form_message')} required style={{ ...styles.input, height: 120, resize: 'vertical' }}></textarea>
      </div>
      <button type="submit" className="btn-shine" style={styles.btn}>{t('form_submit')}</button>
    </form>
  );
}

const styles = {
  form: { background: '#fff', padding: 35, borderRadius: 12, boxShadow: '0 4px 20px rgba(0,0,0,0.06)' },
  title: { color: colors.primaryDarker, marginBottom: 20 },
  group: { marginBottom: 18 },
  label: { display: 'block', marginBottom: 5, fontWeight: 500, color: colors.primaryDarker, fontSize: '0.9rem' },
  input: {
    width: '100%', padding: '12px 15px', border: `1px solid ${colors.grayLight}`,
    borderRadius: 8, fontSize: '0.95rem', fontFamily: 'inherit',
    transition: 'all 0.3s ease',
  },
  btn: {
    padding: '14px 32px', borderRadius: 50, fontWeight: 600,
    fontSize: '0.95rem', border: 'none', cursor: 'pointer',
    background: colors.gold, color: colors.primaryDarker,
    transition: 'all 0.3s',
  },
};
