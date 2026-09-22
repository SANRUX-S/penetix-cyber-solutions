import { ArrowRight, Check } from 'lucide-react';
import { approach } from '../data/content.js';
import { SectionHeading, SectionFoot } from './SectionParts.jsx';

export default function ApproachSection() {
  return <section className="section-panel approach-section" id="approach" aria-labelledby="approach-title" data-section="04"><img className="approach-landscape" src="/images/mountains.webp" alt="" loading="lazy" width="1536" height="1024" /><div className="container approach-inner">
    <SectionHeading label="OUR APPROACH" title={<>A clear path from<br />risk to improvement.</>} number="04" id="approach-title"><p>A practical security process built around clear scope, useful findings and realistic improvements.</p></SectionHeading>
    <ol className="approach-timeline">{approach.map((step, index) => <li key={step.title} data-reveal style={{ '--reveal-delay': `${index * 120}ms` }}><div className="process-track"><span className="process-number">{String(index + 1).padStart(2, '0')}</span><span className="process-connector"><ArrowRight size={20} /></span></div><div className="process-copy"><span className="technical-text">{step.note}</span><h3>{step.title}</h3><p>{step.text}</p></div></li>)}</ol>
    <div className="approach-summary" data-reveal><p>Progress starts with<br /><strong>a clearer perspective.</strong></p><div>{['Clear scope.', 'Meaningful findings.', 'Practical improvements.'].map(text => <span key={text}><Check size={17} />{text}</span>)}</div></div>
    <SectionFoot left="A STRUCTURED PROCESS. A SHARED UNDERSTANDING." right="FROM KNOWING TO DOING." />
  </div></section>;
}
