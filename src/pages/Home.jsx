import Hero from '../components/Hero';
import ServicesSection from '../components/ServicesSection';
import Stats from '../components/Stats';
import Testimonials from '../components/Testimonials';
import { colors } from '../theme';

export default function Home() {
  return (
    <>
      <div style={{ position: 'relative' }}>
        <div className="deco-shape anim-float" style={{ top: '15%', right: '3%', width: 40, height: 40, border: `2px solid ${colors.gold}33`, borderRadius: '50%', opacity: 0.5 }} />
        <div className="deco-shape anim-float-slow" style={{ top: '45%', left: '2%', width: 50, height: 50, border: `2px solid ${colors.primary}44`, borderRadius: '50%', opacity: 0.4 }} />
        <div className="deco-shape anim-shape" style={{ top: '70%', right: '6%', width: 0, height: 0, borderLeft: '10px solid transparent', borderRight: '10px solid transparent', borderBottom: `18px solid ${colors.gold}22`, opacity: 0.5 }} />
        <Hero />
      </div>
      <ServicesSection />
      <div style={{ position: 'relative' }}>
        <div className="deco-shape anim-breathe" style={{ top: '10%', left: '5%', width: 25, height: 25, background: `${colors.primary}11`, borderRadius: '50%' }} />
        <div className="deco-shape anim-spin" style={{ bottom: '15%', right: '4%', width: 30, height: 30, border: `1.5px solid ${colors.gold}33`, borderRadius: '50%', background: 'transparent' }} />
        <Stats />
      </div>
      <Testimonials />
    </>
  );
}
