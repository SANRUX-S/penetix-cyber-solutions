import React from 'react';
import { MessageSquare, Hexagon, LockKeyhole, ChartNoAxesColumnIncreasing } from 'lucide-react';
const items=[
 [MessageSquare,'Clear Communication','Straightforward insights, without jargon.'],
 [Hexagon,'Practical Recommendations','Actions you can implement, not just theory.'],
 [LockKeyhole,'Confidential Handling','Your information stays private and secure.'],
 [ChartNoAxesColumnIncreasing,'Business-Focused Security','Solutions that support your real goals.'],
];
export function WhyPenetix(){
 return <section id="company" className="px-why"><div className="container px-why-grid">
  <div className="px-why-intro"><div className="px-kicker" style={{marginBottom:0}}>WHY PENETIX</div><h2>Security built around<br/>clarity, not fear.</h2><p>We focus on practical improvements that help businesses reduce risk without unnecessary complexity.</p></div>
  {items.map(([Icon,t,d])=><div className="px-pillar" key={t}><Icon className="px-pillar-icon" size={23}/><div><h3>{t}</h3><p>{d}</p></div></div>)}
 </div></section>
}
