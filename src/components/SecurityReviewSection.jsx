import { ArrowRight, Check, ArrowUpRight, ShieldCheck } from 'lucide-react';

const categories = [['Website Security', 86], ['Email Security', 78], ['Account Security', 84], ['Backup Readiness', 75]];
const findings = [['Critical', 0], ['High', 2], ['Medium', 5], ['Low', 8]];

export function ReportDashboard() {
  return <div className="report-dashboard" aria-label="Sample security review: score 82 out of 100">
    <div className="dashboard-top"><span className="eyebrow">SAMPLE SECURITY REVIEW</span><ShieldCheck size={20} strokeWidth={1.3} /></div>
    <div className="dashboard-score-row"><div className="score-title"><span>Security Posture</span><strong>Moderate</strong><span className="sample-badge">DEMONSTRATION</span></div><div className="score-gauge"><svg viewBox="0 0 120 120" aria-hidden="true"><defs><linearGradient id="scoreGradient" x1="0" x2="1" y1="0" y2="1"><stop offset="0%" stopColor="#72c99b" /><stop offset="100%" stopColor="#ecd88a" /></linearGradient></defs><circle className="gauge-track" cx="60" cy="60" r="51" /><circle className="gauge-value" cx="60" cy="60" r="51" /></svg><span><strong>82</strong><small>/ 100</small></span></div></div>
    <p className="score-summary">Good foundation, with key areas to improve.</p>
    <div className="dashboard-categories">{categories.map(([name, score]) => <div className="category-row" key={name}><div><span>{name}</span><span>{score}<small> / 100</small></span></div><span className="category-track"><i style={{ '--score': `${score}%` }} /></span></div>)}</div>
    <div className="dashboard-findings">{findings.map(([label, count]) => <span key={label}><span><i className={`severity severity-${label.toLowerCase()}`} />{label}</span><strong>{count}</strong></span>)}</div>
    <div className="dashboard-bottom"><span className="status-dot" />Illustrative findings. Clear priorities.</div>
  </div>;
}

export default function SecurityReviewSection({ onReport }) {
  return <section className="section-panel review-section" id="security-review" aria-labelledby="review-title" data-section="05"><div className="container review-inner"><div className="review-topline"><span className="eyebrow">SEE THE DIFFERENCE</span><span className="section-index">05 <span>/ 08</span></span></div>
    <div className="review-layout"><div className="review-copy" data-reveal><h2 id="review-title">See your <br />security<br /><span>more clearly.</span></h2><p>Security findings should help you make decisions — not create more confusion.</p><p className="review-detail">PENETIX turns technical findings into clear priorities and practical actions.</p><ul className="review-benefits">{['Identify what matters', 'Understand the risk', 'Know what to fix next'].map(text => <li key={text}><span><Check size={15} /></span>{text}</li>)}</ul><button className="button button-light" onClick={onReport}>View a Sample Report <ArrowRight size={17} /></button></div>
      <div className="review-dashboard-wrap" data-reveal><ReportDashboard /><p className="sample-disclaimer">Example assessment summary. Not a real customer result.</p></div>
      <figure className="review-architecture" data-reveal><img src="/images/architecture.webp" alt="Illustrative glass architecture surrounded by alpine mountains and evergreen trees" loading="lazy" width="1536" height="1024" /><figcaption><span className="eyebrow">PEOPLE<br />IDEAS<br />SECURITY<br />PROGRESS</span><span className="building-caption">BUILT FOR<br />A SAFER DIGITAL<br />TOMORROW.<ArrowUpRight size={25} strokeWidth={1.2} /></span></figcaption></figure>
    </div><div className="review-bottomline"><span>UNDERSTAND THE FINDINGS. SEE THE WAY FORWARD.</span><span>CLARITY CHANGES EVERYTHING.</span></div>
  </div></section>;
}
