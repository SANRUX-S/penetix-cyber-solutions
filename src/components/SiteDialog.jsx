import { useEffect, useId, useRef, useState } from 'react';
import { ArrowDownToLine, ArrowRight, Check, ChevronLeft, ChevronRight, Mail, Pause, Play, ShieldCheck, X, Zap, Sparkles, Server, Code2 } from 'lucide-react';
import '../styles/dialog.css';

const EMAIL = 'penetixcybersolutions@gmail.com';
const SERVICES = [
  'Web Development', 'Managed Hosting / Future Infrastructure', 'Security Assessment', 'Vulnerability Assessment', 'Website Security Review',
  'Infrastructure Hardening', 'Email Security', 'Account & Access Security',
  'Security Health Check', 'Backup & Recovery Review', 'Cloud / Hosting Security Review',
  'Device Security Review', 'Security Awareness', 'Security Improvement Roadmap',
];

const SCENES = [
  {
    word: 'Clarity.', label: '01 / UNDERSTAND YOUR EXPOSURE',
    image: '/images/hero-architecture.webp',
    title: 'Good security starts with a clear view.',
    description: 'Understand the systems your business depends on, the information you need to protect, and the risks that deserve attention.',
  },
  {
    word: 'Protection.', label: '02 / STRENGTHEN WHAT MATTERS',
    image: '/images/architecture.webp',
    title: 'Practical improvements. Stronger foundations.',
    description: 'Bring accounts, websites, devices and everyday processes into focus. Prioritize useful changes that fit the way your business works.',
  },
  {
    word: 'Confidence.', label: '03 / KEEP MOVING FORWARD',
    image: '/images/mountains.webp',
    title: 'A clearer path to a safer tomorrow.',
    description: 'Turn security findings into understandable decisions and a practical improvement plan. Know what to fix first, next and later.',
  },
];

const CATEGORIES = [
  ['Website Security', 86], ['Email Security', 78],
  ['Account Security', 84], ['Backup Readiness', 75],
];

const FINDINGS = [
  { level: 'High', title: 'Require MFA for privileged accounts', detail: 'Illustrative finding: an administrator account has no second factor enabled.', action: 'Enable MFA, review administrator access and document a secure recovery process.' },
  { level: 'High', title: 'Restrict an exposed management interface', detail: 'Illustrative finding: a hosting management interface is reachable without an access restriction.', action: 'Limit access to approved administrators through an appropriate access control.' },
  { level: 'Medium', title: 'Validate backup restoration', detail: 'Illustrative finding: backups exist, but the recovery process has not been tested.', action: 'Run a documented restore test and confirm the business can recover essential information.' },
];

function ContactContent({ service }) {
  const id = useId();
  const [prepared, setPrepared] = useState(false);

  function prepareEmail(event) {
    event.preventDefault();
    const values = new FormData(event.currentTarget);
    const selectedService = values.get('service') || 'Help choosing a service';
    const subject = `PENETIX enquiry — ${selectedService}`;
    const body = [
      'Hello PENETIX,', '', 'I would like to discuss a project or service.', '',
      `Name: ${values.get('name')}`, `Business email: ${values.get('email')}`,
      `Company: ${values.get('company') || 'Not provided'}`, `Service: ${selectedService}`,
      '', 'About the request:', values.get('message'), '',
      'Please contact me to discuss the scope and next steps.',
    ].join('\n');
    setPrepared(true);
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  return (
    <div className="contact-content">
      <p className="dialog-intro">Tell us a little about your business and what you would like to build, improve or protect. We’ll start with a conversation and a clear scope.</p>
      <form className="contact-form" onSubmit={prepareEmail}>
        <div className="contact-fields">
          <label htmlFor={`${id}-name`}>Your name <span aria-hidden="true">*</span>
            <input id={`${id}-name`} name="name" autoComplete="name" placeholder="Full name" required maxLength={100} autoFocus />
          </label>
          <label htmlFor={`${id}-email`}>Business email <span aria-hidden="true">*</span>
            <input id={`${id}-email`} name="email" type="email" autoComplete="email" placeholder="you@company.com" required maxLength={250} />
          </label>
          <label htmlFor={`${id}-company`}>Company <span className="contact-optional">(optional)</span>
            <input id={`${id}-company`} name="company" autoComplete="organization" placeholder="Company name" maxLength={150} />
          </label>
          <label htmlFor={`${id}-service`}>Interested in
            <select id={`${id}-service`} name="service" defaultValue={service || ''}>
              <option value="">Help me choose a service</option>
              {service && !SERVICES.includes(service) && <option value={service}>{service}</option>}
              {SERVICES.map((item) => <option key={item} value={item}>{item}</option>)}
            </select>
          </label>
        </div>
        <label htmlFor={`${id}-message`}>How can we help? <span aria-hidden="true">*</span>
          <textarea id={`${id}-message`} name="message" rows={4} required maxLength={2500} placeholder="A short overview of your business, what you need, and any important requirements." aria-describedby={`${id}-note`} />
        </label>
        <p id={`${id}-note`} className="contact-note"><ShieldCheck size={16} aria-hidden="true" />Please share an overview only. Don’t include passwords, access tokens or sensitive findings.</p>
        <div className="contact-submit">
          <button className="button button-primary" type="submit">Continue in email <ArrowRight size={17} aria-hidden="true" /></button>
          <p>This opens your email app with a draft. Send it there to complete your request; nothing is submitted on this website.</p>
        </div>
        {prepared && <p className="contact-status" role="status"><Check size={18} aria-hidden="true" />We’ve requested your email app to open. If it didn’t, use the email address below. Your request is only sent when you send the email.</p>}
      </form>
      <div className="contact-direct"><Mail size={17} aria-hidden="true" /><span>Prefer to email directly?<a href={`mailto:${EMAIL}`}>{EMAIL}</a></span></div>
    </div>
  );
}

function StoryContent() {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(() => !window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const [visible, setVisible] = useState(() => !document.hidden);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = (event) => { if (event.matches) setPlaying(false); };
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    const onVisibilityChange = () => setVisible(!document.hidden);
    document.addEventListener('visibilitychange', onVisibilityChange);
    return () => document.removeEventListener('visibilitychange', onVisibilityChange);
  }, []);

  useEffect(() => {
    if (!playing || !visible) return undefined;
    const timer = window.setInterval(() => setIndex((current) => (current + 1) % SCENES.length), 6500);
    return () => window.clearInterval(timer);
  }, [playing, visible]);

  function goTo(next) {
    setPlaying(false);
    setIndex((next + SCENES.length) % SCENES.length);
  }

  const scene = SCENES[index];
  return (
    <div className="story-content" role="region" aria-roledescription="carousel" aria-label="The PENETIX story" onFocusCapture={(event) => { if (!event.target.closest('[data-story-playback]')) setPlaying(false); }}>
      <div className="story-visual">
        <img key={scene.image} src={scene.image} alt="" className="story-image" />
        <div className="story-shade" />
        <div className="story-scene" aria-live={playing ? 'off' : 'polite'} aria-atomic="true">
          <span className="story-label">{scene.label}</span>
          <span className="story-word">{scene.word}</span>
          <h3>{scene.title}</h3>
          <p>{scene.description}</p>
        </div>
        <span className="story-signature">PENETIX / OUR PURPOSE</span>
      </div>
      <div className="story-controls">
        <div className="story-dots" role="group" aria-label="Choose a scene">
          {SCENES.map((item, sceneIndex) => <button key={item.word} type="button" aria-label={`Scene ${sceneIndex + 1}: ${item.word}`} aria-current={sceneIndex === index ? 'step' : undefined} onClick={() => goTo(sceneIndex)}><span /></button>)}
        </div>
        <span className="story-counter">0{index + 1} <span>/ 03</span></span>
        <div className="story-buttons">
          <button className="dialog-icon-button" type="button" onClick={() => goTo(index - 1)} aria-label="Previous scene"><ChevronLeft size={19} /></button>
          <button className="dialog-icon-button" type="button" data-story-playback onClick={() => setPlaying((current) => !current)} aria-label={playing ? 'Pause story' : 'Play story'}>{playing ? <Pause size={17} /> : <Play size={17} />}</button>
          <button className="dialog-icon-button" type="button" onClick={() => goTo(index + 1)} aria-label="Next scene"><ChevronRight size={19} /></button>
        </div>
      </div>
      <p className="story-caption">A three-part visual introduction to our approach.</p>
    </div>
  );
}

function downloadSample() {
  const content = [
    'PENETIX — SAMPLE SECURITY REVIEW',
    'DEMONSTRATION ONLY. This is not a real customer assessment, certification or complete report.',
    '', 'SECURITY POSTURE: 82 / 100',
    '', 'ILLUSTRATIVE CATEGORY SCORES',
    ...CATEGORIES.map(([name, value]) => `${name}: ${value} / 100`),
    '', 'ILLUSTRATIVE FINDING COUNTS', 'Critical: 0', 'High: 2', 'Medium: 5', 'Low: 8',
    '', 'THREE SELECTED EXAMPLES (OF 15 ILLUSTRATIVE FINDINGS)',
    ...FINDINGS.flatMap((finding, index) => [
      '', `${index + 1}. [${finding.level.toUpperCase()}] ${finding.title}`,
      finding.detail, `Suggested next step: ${finding.action}`,
    ]),
    '', 'HOW TO READ THIS SAMPLE',
    'Scores and findings are illustrative and are not independently calculated or validated.',
    'A real review must define its scope, evidence, limitations and prioritization with the business.',
    'Security testing requires written authorization and agreed boundaries before work begins.',
    '', `Discuss a scoped security review: ${EMAIL}`,
  ].join('\n');
  const url = URL.createObjectURL(new Blob([content], { type: 'text/plain;charset=utf-8' }));
  const link = document.createElement('a');
  link.href = url;
  link.download = 'penetix-sample-security-review.txt';
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function ReportContent() {
  return (
    <div className="sample-content">
      <div className="sample-notice"><span className="sample-tag">SAMPLE / DEMONSTRATION</span><p>Illustrative data to show how findings can become clear decisions. This is not a real client assessment.</p></div>
      <div className="sample-dashboard">
        <div className="sample-score">
          <div className="sample-gauge" role="img" aria-label="Illustrative security posture score: 82 out of 100">
            <svg viewBox="0 0 120 120" aria-hidden="true"><circle className="sample-gauge-track" cx="60" cy="60" r="52" /><circle className="sample-gauge-value" cx="60" cy="60" r="52" /></svg>
            <div><strong>82</strong><span>/ 100</span></div>
          </div>
          <span className="sample-score-label">Security posture</span><p>A useful foundation, with priority actions ahead.</p>
        </div>
        <div className="sample-categories">
          <span className="sample-kicker">ILLUSTRATIVE CONTROL SCORES</span>
          {CATEGORIES.map(([name, value]) => <div className="sample-category" key={name}><div><span>{name}</span><strong>{value}<span> / 100</span></strong></div><div className="sample-bar" aria-hidden="true"><span style={{ width: `${value}%` }} /></div></div>)}
        </div>
      </div>
      <div className="sample-severities" aria-label="Illustrative findings by severity">
        {[[0, 'Critical'], [2, 'High'], [5, 'Medium'], [8, 'Low']].map(([count, severity]) => <div key={severity}><i className={`sample-dot sample-dot-${severity.toLowerCase()}`} aria-hidden="true" /><span>{severity}</span><strong>{count}</strong></div>)}
      </div>
      <div className="sample-findings-heading"><h3>What to fix next.</h3><span>3 selected examples</span></div>
      <div className="sample-findings">
        {FINDINGS.map((finding, index) => <article className="sample-finding" key={finding.title}><div className="sample-finding-number">0{index + 1}</div><div><span className={`sample-severity sample-severity-${finding.level.toLowerCase()}`}>{finding.level} priority</span><h4>{finding.title}</h4><p>{finding.detail}</p><p className="sample-action"><ArrowRight size={14} aria-hidden="true" />{finding.action}</p></div></article>)}
      </div>
      <div className="sample-download"><p>A real review includes an agreed scope, supporting evidence, limitations and recommendations tailored to your business.</p><button type="button" className="button button-primary" onClick={downloadSample}>Download sample <ArrowDownToLine size={17} aria-hidden="true" /></button></div>
    </div>
  );
}

const LEGAL = {
  privacy: {
    title: 'Privacy & your information',
    sections: [
      ['Contact requests', 'The contact form prepares a draft in your own email app. It does not send or store your request through an on-site submission service. You choose whether to send the email.'],
      ['Information you choose to share', 'A contact email may contain your name, email address, company and request. Share only what is needed for an initial conversation. Do not send passwords, access tokens, confidential findings or unnecessary personal information.'],
      ['Email and service providers', 'Email you send is handled by the email services involved in delivery. Website hosting may also process routine connection information to deliver the site. The practices of those providers apply to their services.'],
      ['Project information', 'Before sharing detailed security information, agree the scope, appropriate communication channels and handling arrangements with PENETIX. Contact us if you have a question about information you have shared or would like to request its deletion.'],
    ],
  },
  terms: {
    title: 'Website terms',
    sections: [
      ['Information on this website', 'This website describes PENETIX’s services and approach. Its general information and examples do not constitute a completed assessment of your systems or a guarantee that a system is secure.'],
      ['Samples and demonstrations', 'Any sample dashboard, score or finding is illustrative. It is not a real client result, a security certification or a promise of a particular outcome.'],
      ['Agreeing work', 'A contact request starts a conversation. Services, timing, deliverables, fees and responsibilities must be agreed before work begins. Sending a request does not authorize testing or create a service agreement.'],
      ['Using this site', 'Use this website lawfully and do not interfere with its operation or attempt unauthorized access. Questions about services or site content can be sent to PENETIX using the address below.'],
    ],
  },
  authorization: {
    title: 'Security testing authorization',
    sections: [
      ['Written permission comes first', 'Security assessments and vulnerability testing require written authorization from someone entitled to authorize work on the relevant systems. A contact form or an email enquiry alone is not permission to test.'],
      ['Clear scope and boundaries', 'Before work begins, agree the exact assets, system owners, allowed methods, testing window, exclusions and operational limits. Third-party systems require the appropriate permissions and must comply with the provider’s applicable rules.'],
      ['Operational coordination', 'Agree a point of contact, how findings will be communicated and when testing should pause. Potentially disruptive activity must be explicitly discussed and authorized within the scope.'],
      ['Careful information handling', 'Agree how access and findings will be shared, protected, retained and removed. Do not send credentials or sensitive assessment material through the initial contact form.'],
    ],
  },
};

function LegalContent({ page }) {
  const document = LEGAL[page] || LEGAL.privacy;
  return <div className="dialog-legal">{document.sections.map(([title, text]) => <section key={title}><h3>{title}</h3><p>{text}</p></section>)}<div className="dialog-legal-contact"><Mail size={18} aria-hidden="true" /><a href={`mailto:${EMAIL}`}>{EMAIL}</a></div></div>;
}

function WebDevContent({ onContact, onNavigate }) {
  return (
    <div className="webdev-content">
      <p className="dialog-intro">
        Security-first web architecture engineered for speed, resilience, and conversion.
        Every web application is developed to meet rigorous zero-trust standards while delivering
        a seamless, high-performance user experience.
      </p>

      <div className="webdev-grid">
        <div className="webdev-card">
          <div className="webdev-card-icon"><ShieldCheck size={20} /></div>
          <div>
            <h3>Zero-Trust Foundation</h3>
            <p>OWASP Top 10 mitigation, strict Content Security Policies (CSP), input sanitization, and automated dependency vulnerability audits.</p>
          </div>
        </div>

        <div className="webdev-card">
          <div className="webdev-card-icon"><Zap size={20} /></div>
          <div>
            <h3>Sub-Second Performance</h3>
            <p>Modern React, Next.js, and Vite engineering with server-side caching, edge delivery, optimized assets, and green Core Web Vitals.</p>
          </div>
        </div>

        <div className="webdev-card">
          <div className="webdev-card-icon"><Sparkles size={20} /></div>
          <div>
            <h3>Bespoke UI/UX Design</h3>
            <p>High-fidelity interactive interfaces with fluid micro-animations, glassmorphic elements, accessible semantic HTML, and responsive mobile-first design.</p>
          </div>
        </div>

        <div className="webdev-card">
          <div className="webdev-card-icon"><Server size={20} /></div>
          <div>
            <h3>Hardened Cloud & Deployment</h3>
            <p>Automated CI/CD pipelines, SSL automation, isolated containerization, and seamless integration with PENETIX hardened hosting.</p>
          </div>
        </div>
      </div>

      <div className="webdev-actions">
        <button
          className="button button-primary"
          type="button"
          onClick={() => onContact('Web Development')}
        >
          Discuss a Web Development Project <ArrowRight size={17} aria-hidden="true" />
        </button>
        {onNavigate && (
          <button
            className="button button-outline"
            type="button"
            onClick={() => {
              onNavigate('hosting');
            }}
          >
            Explore Hardened Hosting <ArrowRight size={17} aria-hidden="true" />
          </button>
        )}
      </div>
    </div>
  );
}

export default function SiteDialog({ dialog, onClose, onContact, onNavigate }) {
  const ref = useRef(null);
  const titleId = useId();
  const open = Boolean(dialog);

  useEffect(() => {
    if (!open || !ref.current) return undefined;
    const element = ref.current;
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    if (!element.open) element.showModal();
    return () => {
      if (element.open) element.close();
      document.body.style.overflow = previousOverflow;
      if (previousFocus instanceof HTMLElement && previousFocus.isConnected) previousFocus.focus({ preventScroll: true });
    };
  }, [open]);

  if (!dialog) return null;
  const title = dialog.type === 'contact' ? 'Let’s start with clarity.'
    : dialog.type === 'story' ? 'A safer tomorrow starts here.'
      : dialog.type === 'report' ? 'A clearer view of security.'
        : dialog.type === 'webdev' ? 'Security-first web development.'
          : (LEGAL[dialog.key] || LEGAL.privacy).title;

  function closeOnBackdrop(event) {
    if (event.target !== event.currentTarget) return;
    const box = event.currentTarget.getBoundingClientRect();
    if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) onClose();
  }

  const handleContactForService = (service) => {
    onClose();
    if (onContact) onContact(service);
  };

  const handleNavigateHosting = (route) => {
    onClose();
    if (onNavigate) onNavigate(route);
  };

  return (
    <dialog ref={ref} className={`dialog-shell dialog-shell-${dialog.type}`} aria-labelledby={titleId} onCancel={(event) => { event.preventDefault(); onClose(); }} onClick={closeOnBackdrop}>
      <div className="dialog-header">
        <div><span className="dialog-eyebrow">PENETIX / {dialog.type === 'contact' ? 'START A CONVERSATION' : dialog.type === 'story' ? 'OUR STORY' : dialog.type === 'report' ? 'SAMPLE SECURITY REVIEW' : dialog.type === 'webdev' ? 'SECURE WEB DEVELOPMENT' : 'INFORMATION'}</span><h2 id={titleId}>{title}</h2></div>
        <button className="dialog-icon-button dialog-close" type="button" aria-label="Close dialog" onClick={onClose}><X size={21} aria-hidden="true" /></button>
      </div>
      {dialog.type === 'contact' && <ContactContent key={dialog.service || 'general'} service={dialog.service} />}
      {dialog.type === 'webdev' && <WebDevContent onContact={handleContactForService} onNavigate={handleNavigateHosting} />}
      {dialog.type === 'story' && <StoryContent />}
      {dialog.type === 'report' && <ReportContent />}
      {dialog.type === 'legal' && <LegalContent page={dialog.key} />}
    </dialog>
  );
}
