import React from 'react';
import { ArrowRight } from 'lucide-react';
export function PreFooterCta({onOpenAssessment,onContact}){
 return <section id="contact" className="px-cta"><div className="container px-cta-grid">
  <div><h3>KNOW YOUR RISK. STRENGTHEN WHAT MATTERS.</h3><p>Start with a practical security review and a clear plan forward.</p></div>
  <div className="px-cta-actions"><button className="btn-primary btn-green" onClick={onOpenAssessment}>Start a Security Review <ArrowRight size={11}/></button><button className="btn-outline btn-dark-outline" onClick={onContact}>Contact PENETIX <ArrowRight size={10}/></button></div>
  <div className="px-cta-tag">A SAFER TOMORROW<br/>TOGETHER.</div>
 </div></section>
}
