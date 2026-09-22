import { pillars } from '../data/content.js';
import { SectionHeading, SectionFoot } from './SectionParts.jsx';
import { BrandMark } from './Logo.jsx';

export default function WhyPenetixSection() {
  return <section className="section-panel company-section" id="company" aria-labelledby="company-title" data-section="06"><img className="company-landscape" src="/images/mountains.webp" alt="" loading="lazy" width="1536" height="1024" /><div className="container company-inner"><SectionHeading label="WHY PENETIX" title={<>Security built around<br />clarity, not fear.</>} number="06" id="company-title"><p>Practical cybersecurity should help businesses understand risk, make informed decisions and improve what matters.</p></SectionHeading>
    <div className="company-note" data-reveal><BrandMark /><span>Thoughtful security.<br /><strong>Stronger foundations.</strong></span><span className="company-note-rule" /><span className="technical-text">THE PRINCIPLES<br />BEHIND THE PRACTICE</span></div>
    <div className="value-pillars">{pillars.map(({ title, icon: Icon, text }, index) => <article className="value-pillar" key={title} data-reveal style={{ '--reveal-delay': `${index * 80}ms` }}><div className="pillar-top"><span>{String(index + 1).padStart(2, '0')}</span><Icon size={31} strokeWidth={1.2} /></div><h3>{title}</h3><p>{text}</p></article>)}</div>
    <SectionFoot left="PRACTICAL BY DESIGN. PERSONAL BY APPROACH." right="SECURE TODAY. STRONGER TOMORROW." /></div></section>;
}
