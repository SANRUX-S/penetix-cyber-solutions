import React from 'react';
import { ArrowRight, Play, ShieldCheck, Users, Lock } from 'lucide-react';

export function Hero({ onOpenAssessment, onWatchStory }) {
  return (
    <section id="home" className="px-hero">
      <div className="container px-hero-inner">
        <div className="px-hero-copy">
          <div className="px-kicker">CYBERSECURITY FOR MODERN BUSINESSES</div>
          <h1>
            Security without<br/>the noise.<br/>
            <span className="tone">Clarity. Protection. </span><span className="accent">Confidence.</span>
          </h1>
          <p className="px-hero-desc">Practical cybersecurity assessments, hardening and risk reduction for growing businesses.</p>
          <p className="px-hero-sub">Understand your exposure. Fix what matters. Build stronger security.</p>

          <div className="px-actions">
            <button className="btn-primary btn-green" onClick={onOpenAssessment}>
              Start a Security Review <ArrowRight size={14}/>
            </button>
            <button className="btn-outline" onClick={onWatchStory}>
              <span style={{width:20,height:20,borderRadius:'50%',background:'#102023',color:'#fff',display:'grid',placeItems:'center'}}>
                <Play size={9} fill="currentColor"/>
              </span>
              Watch Our Story
            </button>
          </div>

          <div className="px-trust-row">
            <div className="px-trust-item"><span className="px-trust-icon"><ShieldCheck size={20}/></span>Clear Reporting</div>
            <div className="px-trust-item"><span className="px-trust-icon"><Users size={20}/></span>Business Focused</div>
            <div className="px-trust-item"><span className="px-trust-icon"><Lock size={18}/></span>Confidential by Design</div>
          </div>
        </div>

        <div className="px-meta">PENETIX<br/><span style={{fontSize:7}}>SECURITY SYSTEM 001</span></div>
        <div className="px-sphere" aria-hidden="true"/>
        <div className="px-side-label">ASSESS<br/>HARDEN<br/>PROTECT<br/>IMPROVE<br/><span style={{display:'inline-block',width:18,borderTop:'1px solid rgba(255,255,255,.65)',marginTop:8}}/></div>
        <div className="px-side-number">01</div>
        <div className="px-side-caption">A SAFER<br/>DIGITAL WORLD<br/>BUILDS BRIGHTER<br/>TOMORROWS.</div>
      </div>
    </section>
  );
}
