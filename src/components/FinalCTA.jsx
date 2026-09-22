import { ArrowRight } from 'lucide-react';
import Footer from './Footer.jsx';

export default function FinalCTA({ onContact, onLegal }) {
  return (
    <section className="section-panel contact-section" id="contact" aria-labelledby="contact-title" data-section="08">
      <div className="final-cta">
        <img src="/images/mountains.webp" alt="" loading="lazy" width="1536" height="1024" />
        <div className="container final-cta-inner">
          <div className="cta-topline">
            <span className="eyebrow">A STRONGER TOMORROW STARTS HERE</span>
            <span className="section-index">08 <span>/ 08</span></span>
          </div>
          <div className="cta-content" data-reveal>
            <h2 id="contact-title">Know your risk.<br /><span>Strengthen<br className="mobile-break" /> what matters.</span></h2>
            <p>Start with a practical security review and get a clearer view of what deserves attention.</p>
            <div className="button-row">
              <button className="button button-light" onClick={() => onContact()}>Start a Security Review <ArrowRight size={18} /></button>
              <a className="text-link text-link-light" href="mailto:penetixcybersolutions@gmail.com">Contact PENETIX <ArrowRight size={17} /></a>
            </div>
          </div>
          <div className="cta-bottomline">
            <span>Clear scope. <i /> Confidential handling. <i /> Practical recommendations.</span>
            <span>A SAFER TOMORROW.<br />TOGETHER.</span>
          </div>
        </div>
      </div>
      <Footer onContact={onContact} onLegal={onLegal} />
    </section>
  );
}
