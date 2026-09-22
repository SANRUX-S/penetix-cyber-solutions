export function BrandMark({ className = '' }) {
  return <svg className={className} viewBox="0 0 44 48" fill="none" aria-hidden="true"><path d="M8 5h16c12 0 18 6 16 16-2 10-10 15-21 15h-3L7 47H0l15-21h10c6 0 9-3 9-7 0-5-4-7-10-7H8V5Z" fill="currentColor"/><path d="M8 17h15l-5 7H8v10l-7 9V24c0-4 3-7 7-7Z" fill="currentColor"/></svg>;
}

export default function Logo({ footer = false, onClick }) {
  return <a className={`brand${footer ? ' brand-footer' : ''}`} href="#home" onClick={onClick} aria-label="PENETIX home"><BrandMark /><span className="brand-type"><span className="brand-name">PENETIX</span><span className="brand-tagline">SECURE TODAY. STRONGER TOMORROW.</span></span></a>;
}
