import { colors } from '../theme';

const ringStyle = (size, delay, opacity = 0.15) => ({
  position: 'absolute',
  top: '50%', left: '50%',
  width: size, height: size,
  borderRadius: '50%',
  marginLeft: -size/2, marginTop: -size/2,
  border: `1.5px solid ${colors.gold}`,
  opacity,
  animation: `rippleExpand 4s ${delay}s ease-out infinite`,
  pointerEvents: 'none',
});

const starStyle = (size, top, left, delay, duration = 3) => ({
  position: 'absolute',
  width: size, height: size,
  top: `${top}%`, left: `${left}%`,
  borderRadius: '50%',
  background: colors.gold,
  boxShadow: `0 0 ${size * 2}px ${colors.gold}66`,
  animation: `twinkle ${duration}s ${delay}s ease-in-out infinite`,
  pointerEvents: 'none',
});

const particleStyle = (top, left, delay, size = 4, color = '#fff') => ({
  position: 'absolute',
  width: size, height: size,
  top: `${top}%`, left: `${left}%`,
  borderRadius: '50%',
  background: color,
  opacity: 0,
  animation: `driftUp ${6 + Math.random() * 4}s ${delay}s linear infinite`,
  pointerEvents: 'none',
});

export default function HeroDecoration() {
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', zIndex: 1, pointerEvents: 'none' }}>
      {/* Compass rose */}
      <div className="compass-rose" style={{
        position: 'absolute', top: '40%', left: '50%', transform: 'translate(-50%, -50%)',
        width: 0, height: 0,
      }}>
        <svg width="300" height="300" viewBox="-150 -150 300 300" style={{ overflow: 'visible' }}>
          <defs>
            <linearGradient id="cg" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor={colors.gold} stopOpacity="0.3" />
              <stop offset="50%" stopColor={colors.gold} stopOpacity="0.5" />
              <stop offset="100%" stopColor={colors.gold} stopOpacity="0.2" />
            </linearGradient>
            <linearGradient id="cg2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={colors.gold} stopOpacity="0" />
              <stop offset="50%" stopColor={colors.gold} stopOpacity="0.25" />
              <stop offset="100%" stopColor={colors.gold} stopOpacity="0" />
            </linearGradient>
          </defs>
          {/* Outer ring */}
          <circle cx="0" cy="0" r="120" fill="none" stroke="url(#cg)" strokeWidth="1">
            <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="30s" repeatCount="indefinite" />
          </circle>
          <circle cx="0" cy="0" r="100" fill="none" stroke="url(#cg)" strokeWidth="0.5">
            <animateTransform attributeName="transform" type="rotate" from="0" to="-360" dur="45s" repeatCount="indefinite" />
          </circle>
          <circle cx="0" cy="0" r="80" fill="none" stroke="url(#cg)" strokeWidth="0.5">
            <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="60s" repeatCount="indefinite" />
          </circle>
          {/* Degree ticks */}
          {[...Array(36)].map((_, i) => {
            const angle = (i * 10 * Math.PI) / 180;
            const r1 = 115, r2 = 120;
            const x1 = Math.cos(angle) * r1, y1 = Math.sin(angle) * r1;
            const x2 = Math.cos(angle) * r2, y2 = Math.sin(angle) * r2;
            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={colors.gold} strokeWidth={i % 3 === 0 ? 1.5 : 0.5} opacity={i % 3 === 0 ? 0.5 : 0.2} />;
          })}
          {/* Compass star points - N/S/E/W */}
          {[
            { angle: 0, label: 'N' }, { angle: 90, label: 'E' },
            { angle: 180, label: 'S' }, { angle: 270, label: 'O' },
          ].map(({ angle, label }) => {
            const rad = (angle * Math.PI) / 180;
            const tipX = Math.cos(rad) * 70, tipY = Math.sin(rad) * 70;
            return (
              <g key={label}>
                <polygon
                  points={`${tipX},${tipY} ${Math.cos(rad + 2.5 * Math.PI / 180) * 20},${Math.sin(rad + 2.5 * Math.PI / 180) * 20} 0,0 ${Math.cos(rad - 2.5 * Math.PI / 180) * 20},${Math.sin(rad - 2.5 * Math.PI / 180) * 20}`}
                  fill={label === 'N' ? `${colors.gold}88` : `${colors.gold}44`}
                  opacity={0.7}
                />
                <text x={tipX * 1.4} y={tipY * 1.4 + 4} fill={colors.gold} fontSize="12" fontWeight="700" textAnchor="middle" opacity={0.8}>
                  {label}
                </text>
              </g>
            );
          })}
          {/* NE/NW/SE/SW */}
          {[45, 135, 225, 315].map((angle) => {
            const rad = (angle * Math.PI) / 180;
            const tipX = Math.cos(rad) * 45, tipY = Math.sin(rad) * 45;
            return (
              <polygon key={angle}
                points={`${tipX},${tipY} ${Math.cos(rad + 3 * Math.PI / 180) * 15},${Math.sin(rad + 3 * Math.PI / 180) * 15} 0,0 ${Math.cos(rad - 3 * Math.PI / 180) * 15},${Math.sin(rad - 3 * Math.PI / 180) * 15}`}
                fill={`${colors.gold}33`}
                opacity={0.5}
              />
            );
          })}
          {/* Center dot */}
          <circle cx="0" cy="0" r="4" fill={colors.gold} opacity="0.7">
            <animate attributeName="opacity" values="0.4;1;0.4" dur="3s" repeatCount="indefinite" />
            <animate attributeName="r" values="3;6;3" dur="3s" repeatCount="indefinite" />
          </circle>
        </svg>
      </div>

      {/* Expanding rings */}
      <div className="ring-1" style={ringStyle(80, 0)} />
      <div className="ring-2" style={ringStyle(80, 0.8)} />
      <div className="ring-3" style={ringStyle(80, 1.6)} />
      <div className="ring-4" style={ringStyle(80, 2.4)} />
      <div className="ring-5" style={ringStyle(80, 3.2)} />

      {/* Twinkling stars */}
      <div style={starStyle(3, 15, 10, 0, 2.5)} />
      <div style={starStyle(2, 25, 85, 0.5, 3)} />
      <div style={starStyle(4, 35, 5, 1, 2)} />
      <div style={starStyle(2, 45, 92, 1.5, 3.5)} />
      <div style={starStyle(3, 55, 8, 2, 2.8)} />
      <div style={starStyle(2, 65, 88, 0.8, 2.2)} />
      <div style={starStyle(3, 20, 75, 1.2, 2.5)} />
      <div style={starStyle(2, 70, 15, 2.5, 3)} />
      <div style={starStyle(3, 50, 95, 0.3, 2.7)} />
      <div style={starStyle(2, 30, 20, 1.8, 3.2)} />
      <div style={starStyle(4, 75, 80, 0.6, 2.3)} />
      <div style={starStyle(2, 10, 50, 2.2, 2.8)} />
      <div style={starStyle(3, 80, 45, 1.4, 3)} />
      <div style={starStyle(2, 40, 55, 0.9, 2.5)} />
      <div style={starStyle(3, 5, 30, 1.7, 2.6)} />

      {/* Floating golden dust particles */}
      <div style={particleStyle(80, 20, 0, 3, colors.gold)} />
      <div style={particleStyle(85, 70, 1, 2, colors.gold)} />
      <div style={particleStyle(90, 40, 2, 4, '#fff')} />
      <div style={particleStyle(75, 55, 0.5, 2, colors.gold)} />
      <div style={particleStyle(82, 85, 1.5, 3, '#fff')} />
      <div style={particleStyle(88, 10, 3, 2, colors.gold)} />
      <div style={particleStyle(78, 35, 0.8, 3, '#fff')} />
      <div style={particleStyle(85, 60, 2.5, 2, colors.gold)} />
    </div>
  );
}
