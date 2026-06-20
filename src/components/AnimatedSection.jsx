import useInView from '../hooks/useInView';

export default function AnimatedSection({ children, className = '', style = {}, as: Tag = 'section' }) {
  const [ref, inView] = useInView();
  return (
    <Tag ref={ref} className={`animate-fade-up ${inView ? 'visible' : ''} ${className}`} style={style}>
      {children}
    </Tag>
  );
}
