import { lazy, Suspense } from 'react';
import { ArrowRight, ArrowDown, Play, ShieldCheck, UsersRound, LockKeyhole } from 'lucide-react';
const HeroSphere3D = lazy(() => import('./HeroSphere3D.jsx'));

export default function Hero({ onContact, onStory }) {
  return <section className="section-panel hero" id="home" aria-labelledby="hero-title" data-section="01">
    <img className="hero-background" src="/images/hero-architecture.webp" alt="" fetchPriority="high" width="1536" height="1024" />
    <div className="hero-light" />
    <div className="container hero-composition">
      <div className="hero-copy">
        <p className="eyebrow">CYBERSECURITY FOR MODERN BUSINESSES</p>
        <h1 id="hero-title">Security without<br />the noise.</h1>
        <p className="hero-promise">Clarity. Protection.<br /><span>Confidence.</span></p>
        <p className="hero-description">Practical cybersecurity assessments, hardening and risk reduction for growing businesses.</p>
        <p className="hero-secondary">Understand your exposure. Fix what matters.<br className="mobile-break" /> Build stronger security.</p>
        <div className="button-row"><button className="button button-primary" onClick={onContact}>Start a Security Review <ArrowRight size={18} /></button><button className="button button-secondary" onClick={onStory}><span className="play-disc"><Play size={11} fill="currentColor" /></span>Watch Our Story</button></div>
        <div className="trust-row"><span><ShieldCheck />Clear Reporting</span><span><UsersRound />Business Focused</span><span><LockKeyhole />Confidential by Design</span></div>
      </div>
      <div className="hero-object">
        <div className="hero-object-label"><strong>PENETIX</strong><span>SECURITY SYSTEM 001</span><i /></div>
        <Suspense fallback={<span className="sphere-loading" aria-live="polite">Preparing security core</span>}><HeroSphere3D /></Suspense>
      </div>
      <div className="hero-edge" aria-hidden="true"><span>ASSESS<br />HARDEN<br />PROTECT<br />IMPROVE</span><i /><span className="hero-edge-number">01</span><span>A SAFER<br />DIGITAL WORLD<br />BUILDS BRIGHTER<br />TOMORROWS.</span></div>
    </div>
    <div className="container hero-bottom"><a href="#services" className="scroll-cue"><span className="scroll-disc"><ArrowDown size={16} /></span>SCROLL TO EXPLORE</a><span className="technical-text">BUILT ON CLARITY. DESIGNED FOR CONFIDENCE.</span></div>
  </section>;
}
