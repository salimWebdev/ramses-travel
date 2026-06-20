import { colors } from '../theme';

export default function PageBanner({ title, sub }) {
  return (
    <section style={styles.banner}>
      <div className="blob-deco" style={{ width: 200, height: 200, background: 'rgba(201,168,76,0.15)', top: '-50px', left: '10%', position: 'absolute', filter: 'blur(50px)' }}></div>
      <div className="blob-deco" style={{ width: 150, height: 150, background: 'rgba(74,144,217,0.2)', bottom: '-40px', right: '15%', position: 'absolute', filter: 'blur(40px)', animationDelay: '2s' }}></div>
      <div style={styles.container}>
        <h1 style={styles.title}>{title}</h1>
        <div style={styles.line}></div>
        <p style={styles.sub}>{sub}</p>
      </div>
    </section>
  );
}

const styles = {
  banner: {
    background: 'linear-gradient(135deg, #1a3d5c 0%, #2a5f8f 50%, #1a3d5c 100%)',
    backgroundSize: '200% 200%',
    animation: 'gradientShift 8s ease infinite',
    padding: '70px 0', textAlign: 'center', color: '#fff',
    position: 'relative', overflow: 'hidden',
  },
  container: { maxWidth: 1200, margin: '0 auto', padding: '0 20px', position: 'relative', zIndex: 1 },
  title: { fontSize: '2.5rem', marginBottom: 8, fontWeight: 800 },
  line: { width: 60, height: 3, background: 'linear-gradient(90deg, #C9A84C, #4A90D9)', margin: '0 auto 12px', borderRadius: 2 },
  sub: { opacity: 0.85, fontSize: '1.05rem' },
};
