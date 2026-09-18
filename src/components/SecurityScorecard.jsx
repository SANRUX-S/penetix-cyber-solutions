import React from 'react';
import { Check, ArrowRight } from 'lucide-react';
export function SecurityScorecard({onViewSampleReport}){
 const sev=[['Critical',0,'#f25b62'],['High',2,'#f2a136'],['Medium',4,'#e5d054'],['Low',6,'#8fcf6a']];
 return <section id="scorecard" className="px-score">
  <div className="container px-score-grid">
    <div className="px-score-copy">
      <div className="px-kicker" style={{color:'#d8e5df',marginBottom:0}}>SEE THE DIFFERENCE</div>
      <h2>See your security<br/>more clearly.</h2>
      <p>Cybersecurity shouldn't feel confusing. PENETIX turns technical findings into clear priorities and practical actions.</p>
      {['Identify what matters','Understand the risk','Know what to fix next'].map(x=><div className="px-check" key={x}><i><Check size={10}/></i>{x}</div>)}
    </div>
    <div className="px-review-wrap">
      <div className="px-review">
        <div className="px-review-head"><span>SAMPLE SECURITY REVIEW</span><span>→</span></div>
        <div className="px-review-body">
          <div className="px-posture">Security Posture<strong>Moderate</strong></div>
          <div className="px-gauge"><b>82</b><span>/100</span></div>
          <div className="px-severity">
            {sev.map(([l,c,color])=><div className="px-sev" key={l}><em><i style={{background:color}}/>{l}</em><span>{c}</span></div>)}
          </div>
        </div>
        <div className="px-review-foot"><span>Example assessment summary. Not a real customer result.</span><button onClick={onViewSampleReport}>View a Sample Report <ArrowRight size={9}/></button></div>
      </div>
    </div>
    <div className="px-score-image"><div className="px-score-image-label">PEOPLE<br/>IDEAS<br/>SECURITY<br/>PROGRESS</div><div className="px-score-image-tag">BUILT FOR<br/>A SAFER DIGITAL<br/>TOMORROW.</div></div>
  </div>
 </section>
}
