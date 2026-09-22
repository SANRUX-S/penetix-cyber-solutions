import { ArrowUpRight } from 'lucide-react';
import { resources } from '../data/content.js';
import { SectionHeading, SectionFoot } from './SectionParts.jsx';

export default function ResourcesSection() {
  return <section className="section-panel resources-section" id="resources" aria-labelledby="resources-title" data-section="07"><div className="container"><SectionHeading label="RESOURCES" title={<>Learn. Stay informed.<br />Build stronger security.</>} number="07" id="resources-title"><p>Clear, practical guidance for businesses that want to understand and improve their security.</p></SectionHeading>
    <div className="resources-grid">{resources.map((resource, index) => <article className="resource-card" key={resource.title} data-reveal style={{ '--reveal-delay': `${index % 3 * 70}ms` }}><div className="resource-image"><img src={`/images/${resource.image}.webp`} alt="" loading="lazy" width="1536" height="1024" style={{ objectPosition: resource.position }} /><span className="resource-number">0{index + 1}</span></div><div className="resource-copy"><span className="eyebrow">{resource.category}</span><h3>{resource.title}</h3><p>{resource.summary}</p><div className="resource-status"><span>GUIDE / COMING RESOURCE</span><ArrowUpRight size={18} aria-hidden="true" /></div></div></article>)}</div>
    <SectionFoot left="LESS JARGON. MORE UNDERSTANDING." right="GOOD SECURITY STARTS WITH GOOD INFORMATION." /></div></section>;
}
