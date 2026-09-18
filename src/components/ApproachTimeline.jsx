import React from 'react';
import { ArrowRight } from 'lucide-react';
const steps=[
 ['01','Scope','Understand the business, systems and assessment boundaries.'],
 ['02','Assess','Identify meaningful risks and weaknesses.'],
 ['03','Prioritize','Separate important issues from unnecessary noise.'],
 ['04','Improve','Provide practical actions to strengthen security.'],
];
export function ApproachTimeline({onLearnMore}){
 return <section id="approach-timeline" className="px-approach">
  <div className="container">
    <div className="px-approach-head">
      <div><div className="px-kicker" style={{marginBottom:5}}>OUR APPROACH</div><h2>A clear path from risk<br/>to improvement.</h2></div>
      <p className="px-approach-copy">We follow a structured, transparent approach to ensure real security improvements for your business.</p>
      <button className="px-text-link" style={{background:'none',border:0,cursor:'pointer'}} onClick={onLearnMore}>Learn More <ArrowRight size={13}/></button>
    </div>
    <div className="px-steps">
      {steps.map(([n,t,d])=><div className="px-step" key={n}><div className="px-step-badge">{n}</div><div><h3>{t}</h3><p>{d}</p></div></div>)}
    </div>
  </div>
 </section>
}
