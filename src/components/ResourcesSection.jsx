import React from 'react';
import { ArrowRight } from 'lucide-react';
const items=[
 ['Cybersecurity Basics','Key concepts every business should know.','/assets/alpine_landscape.jpg'],
 ['Website Security Checklists','A practical checklist for stronger websites.','/assets/architecture_glass.jpg'],
 ['Email Security Guide','Simple steps for safer communication.','/assets/security_keyboard.jpg'],
 ['Business Security Checklist','A quick guide to improve your security.','/assets/hero_sphere.jpg'],
];
export function ResourcesSection({onSelectResource}){
 return <section id="resources" className="px-resources"><div className="container px-res-grid">
  <div className="px-res-intro"><div className="px-kicker" style={{marginBottom:0}}>RESOURCES</div><h2>Learn, stay informed,<br/>build stronger security.</h2></div>
  {items.map(([t,d,img])=><article className="px-resource" key={t} onClick={()=>onSelectResource?.({title:t})}><img src={img} alt=""/><div><h4>{t}</h4><p>{d} <ArrowRight className="arr" size={9}/></p></div></article>)}
 </div></section>
}
