import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, Check, Database, Fingerprint, Globe2, KeyRound, Laptop, Mail, RotateCcw } from 'lucide-react';
import '../styles/security-system.css';

const securityLayers = [
  {
    name: 'Identity', icon: Fingerprint, x: 28, y: 19,
    description: 'Make sure the right people have the right access to your business.',
    checks: ['Multi-factor authentication', 'Account ownership', 'Password practices', 'Identity protection'],
  },
  {
    name: 'Website', icon: Globe2, x: 78, y: 22,
    description: 'Build confidence in the systems your customers connect with every day.',
    checks: ['Website configuration', 'Authentication controls', 'Security headers', 'Exposed services'],
  },
  {
    name: 'Email', icon: Mail, x: 93, y: 45,
    description: 'Protect communication, accounts and access from common email-based threats.',
    checks: ['Authentication', 'Phishing exposure', 'Account protection', 'Configuration review'],
  },
  {
    name: 'Devices', icon: Laptop, x: 14, y: 72,
    description: 'Strengthen the everyday devices that keep your business moving.',
    checks: ['System updates', 'Device encryption', 'Endpoint access', 'Security hygiene'],
  },
  {
    name: 'Data', icon: Database, x: 85, y: 74,
    description: 'Understand where important information lives and how it is protected.',
    checks: ['Data access', 'Sharing permissions', 'Storage configuration', 'Sensitive information'],
  },
  {
    name: 'Backups', icon: RotateCcw, x: 49, y: 88,
    description: 'Give your business a clearer path back when something goes wrong.',
    checks: ['Backup coverage', 'Restore readiness', 'Recovery priorities', 'Backup access'],
  },
  {
    name: 'Access', icon: KeyRound, x: 7, y: 44,
    description: 'Keep permissions purposeful, proportionate and easy to account for.',
    checks: ['User permissions', 'Privileged accounts', 'Access reviews', 'Account offboarding'],
  },
];

function EngineeredCore({ activeIndex }) {
  const selected = securityLayers[activeIndex];

  return (
    <svg className="orbit-engineering" viewBox="0 0 600 590" fill="none" aria-hidden="true">
      <defs>
        <radialGradient id="orbit-atmosphere">
          <stop stopColor="#80b69c" stopOpacity=".13" />
          <stop offset=".55" stopColor="#537f6c" stopOpacity=".07" />
          <stop offset="1" stopColor="#537f6c" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="orbit-core-metal" cx=".32" cy=".19" r=".88">
          <stop stopColor="#e4e4d0" />
          <stop offset=".11" stopColor="#83958c" />
          <stop offset=".31" stopColor="#415450" />
          <stop offset=".51" stopColor="#162925" />
          <stop offset=".78" stopColor="#10221f" />
          <stop offset=".95" stopColor="#52736a" />
          <stop offset="1" stopColor="#91a696" />
        </radialGradient>
        <linearGradient id="orbit-rim" x1="185" y1="179" x2="392" y2="398" gradientUnits="userSpaceOnUse">
          <stop stopColor="#dedec5" />
          <stop offset=".24" stopColor="#8da397" />
          <stop offset=".52" stopColor="#364d45" />
          <stop offset=".78" stopColor="#aab8a0" />
          <stop offset="1" stopColor="#3d6253" />
        </linearGradient>
        <linearGradient id="orbit-band-metal" x1="224" y1="187" x2="372" y2="409" gradientUnits="userSpaceOnUse">
          <stop stopColor="#eef0d9" stopOpacity=".65" />
          <stop offset=".19" stopColor="#aab9aa" stopOpacity=".3" />
          <stop offset=".43" stopColor="#152924" stopOpacity=".2" />
          <stop offset=".72" stopColor="#72917c" stopOpacity=".45" />
          <stop offset="1" stopColor="#dadbc0" stopOpacity=".7" />
        </linearGradient>
        <linearGradient id="orbit-connection" x1="300" y1="295" x2={selected.x * 6} y2={selected.y * 5.9} gradientUnits="userSpaceOnUse">
          <stop stopColor="#9bc9ad" stopOpacity="0" />
          <stop offset="1" stopColor="#a8d4b7" stopOpacity=".8" />
        </linearGradient>
        <radialGradient id="orbit-floor-shadow">
          <stop stopColor="#061713" stopOpacity=".8" />
          <stop offset="1" stopColor="#061713" stopOpacity="0" />
        </radialGradient>
        <clipPath id="orbit-core-clip"><circle cx="300" cy="289" r="100" /></clipPath>
      </defs>

      <circle cx="300" cy="293" r="278" fill="url(#orbit-atmosphere)" />
      <ellipse cx="300" cy="480" rx="153" ry="25" fill="url(#orbit-floor-shadow)" />
      <g className="orbit-guide-lines" stroke="#aac5b5" strokeWidth=".65">
        <circle cx="300" cy="294" r="242" strokeDasharray="2 10" opacity=".22" />
        <path d="M300 35v41m0 437v41M41 294h42m433 0h42" opacity=".3" />
        <path d="M299 74h2M299 515h2M79 293v2M520 293v2" strokeWidth="3" opacity=".5" />
      </g>

      <g className="orbit-ring orbit-ring-back" stroke="url(#orbit-rim)">
        <ellipse cx="300" cy="294" rx="237" ry="113" transform="rotate(-17 300 294)" opacity=".64" />
        <ellipse cx="300" cy="294" rx="226" ry="91" transform="rotate(19 300 294)" opacity=".5" />
        <ellipse cx="300" cy="294" rx="234" ry="162" transform="rotate(-39 300 294)" opacity=".26" strokeWidth=".65" />
        <ellipse cx="300" cy="294" rx="137" ry="221" transform="rotate(-34 300 294)" opacity=".38" strokeWidth=".75" />
      </g>
      <path d={`M300 294 L${selected.x * 6} ${selected.y * 5.9}`} stroke="url(#orbit-connection)" strokeWidth="1.4" />

      <g className="orbit-core-float">
        <circle cx="300" cy="289" r="101" fill="#172e27" stroke="url(#orbit-rim)" strokeWidth="2" />
        <circle cx="300" cy="289" r="99" fill="url(#orbit-core-metal)" />
        <g clipPath="url(#orbit-core-clip)">
          <ellipse cx="300" cy="289" rx="59" ry="103" transform="rotate(24 300 289)" stroke="url(#orbit-band-metal)" strokeWidth="13" />
          <ellipse cx="300" cy="289" rx="62" ry="103" transform="rotate(24 300 289)" stroke="#dde5d7" strokeOpacity=".3" strokeWidth=".8" />
          <ellipse cx="300" cy="289" rx="100" ry="31" transform="rotate(-24 300 289)" stroke="url(#orbit-band-metal)" strokeWidth="16" />
          <ellipse cx="300" cy="289" rx="100" ry="32" transform="rotate(-24 300 289)" stroke="#bacabe" strokeOpacity=".35" strokeWidth=".7" />
          <path d="M248 202c39 47 61 113 54 186M215 238c37 18 131 5 165-2M208 304c53 37 113 46 180 29" stroke="#bec9b8" strokeOpacity=".15" />
          <ellipse cx="300" cy="289" rx="80" ry="99" transform="rotate(42 300 289)" stroke="#c2cdbb" strokeOpacity=".26" />
        </g>
        <circle cx="300" cy="289" r="43" fill="#10231f" fillOpacity=".57" stroke="#91a69a" strokeOpacity=".25" />
        <g transform="translate(278 261)" fill="#edf1e9">
          <path d="M7 1h23c11 0 15 6 11 16l-2 6c-3 9-9 13-18 13h-7L2 53h-12L9 25h15c3 0 5-1 6-4l2-5c1-3 0-5-4-5H4L7 1Z" />
          <path d="M1 15h19l-5 8H-4l5-8Z" opacity=".78" />
        </g>
        <circle cx="267" cy="207" r="3" fill="#e4e4c4" />
        <circle cx="364" cy="351" r="2" fill="#b6d1b0" />
      </g>

      <g className="orbit-ring orbit-ring-front">
        <path d="M75 340c34 66 169 82 299 36s192-112 146-160" stroke="url(#orbit-rim)" strokeWidth="1.3" />
        <path d="M100 229c-36 71 35 140 164 166s235-13 244-79" stroke="url(#orbit-rim)" strokeWidth=".8" opacity=".8" />
        <ellipse cx="300" cy="294" rx="234" ry="117" transform="rotate(-17 300 294)" stroke="#92bba0" strokeWidth=".55" opacity=".25" />
      </g>
      <g className="orbit-traveller orbit-traveller-one">
        <circle cx="109" cy="383" r="6" fill="#94bc9b" fillOpacity=".12" />
        <circle cx="109" cy="383" r="2" fill="#c5d6b8" />
      </g>
      <g className="orbit-traveller orbit-traveller-two">
        <circle cx="451" cy="190" r="5" fill="#c1d9b5" fillOpacity=".12" />
        <circle cx="451" cy="190" r="1.8" fill="#b9cfaa" />
      </g>
    </svg>
  );
}

export default function SecuritySystemSection() {
  const [activeIndex, setActiveIndex] = useState(2);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const active = securityLayers[activeIndex];
  const ActiveIcon = active.icon;

  useEffect(() => {
    const element = sectionRef.current;
    let intersecting = false;
    const updateVisibility = () => setIsVisible(intersecting && !document.hidden);
    const observer = new IntersectionObserver(([entry]) => {
      intersecting = entry.isIntersecting;
      updateVisibility();
    }, { threshold: 0.1 });
    observer.observe(element);
    document.addEventListener('visibilitychange', updateVisibility);
    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', updateVisibility);
    };
  }, []);

  const moveSelection = (direction) => {
    setActiveIndex((current) => (current + direction + securityLayers.length) % securityLayers.length);
  };

  return (
    <section id="security-system" ref={sectionRef} className="section-panel system-section" data-section="03" data-animate={isVisible} aria-labelledby="system-heading">
      <div className="system-atmosphere" aria-hidden="true" />
      <div className="container system-container">
        <div className="system-topline"><span>CONNECTED BY DESIGN</span><span>PENETIX / SECURITY SYSTEM 001</span></div>

        <div className="system-composition">
          <div className="system-copy">
            <p className="eyebrow">SECURITY IN MOTION</p>
            <h2 id="system-heading">Security is<br />a system.</h2>
            <p className="system-introduction">Strong security comes from multiple layers working together.</p>
            <p className="system-explanation">From the way your team signs in to the way your data is backed up, every connection matters.</p>
            <a className="button button-light system-approach" href="#approach">Explore Our Approach <ArrowRight size={17} aria-hidden="true" /></a>
            <div className="system-copy-note"><span /> SEVEN LAYERS. ONE CONNECTED VIEW.</div>
          </div>

          <div className="orbit-stage" role="group" aria-label="Explore the seven security layers">
            <EngineeredCore activeIndex={activeIndex} />
            {securityLayers.map((layer, index) => (
              <button
                type="button"
                key={layer.name}
                className={`orbit-node${index === activeIndex ? ' orbit-node-active' : ''}${layer.x < 40 ? ' orbit-node-left' : ''}${layer.y > 80 ? ' orbit-node-bottom' : ''}`}
                style={{ '--node-x': `${layer.x}%`, '--node-y': `${layer.y}%` }}
                onMouseEnter={() => setActiveIndex(index)}
                onFocus={() => setActiveIndex(index)}
                onClick={() => setActiveIndex(index)}
                aria-pressed={activeIndex === index}
                aria-label={`Explore ${layer.name.toLowerCase()} security`}
              >
                <span className="orbit-node-point" aria-hidden="true"><span /></span>
                <span className="orbit-node-label">{layer.name}</span>
              </button>
            ))}
            <span className="orbit-stage-caption">SELECT A LAYER TO EXPLORE</span>
          </div>

          <div className="system-inspector-column">
            <p className="system-inspector-eyebrow">A STRONGER, MORE<br />RESILIENT BUSINESS</p>
            <div className="inspector-panel">
              <div className="inspector-panel-top"><span>LAYER OVERVIEW</span><span className="inspector-status-dot" /></div>
              <div className="inspector-content" aria-live="polite" aria-atomic="true">
                <div className="inspector-layer-icon"><ActiveIcon size={27} strokeWidth={1.25} aria-hidden="true" /><svg viewBox="0 0 72 72" aria-hidden="true"><circle cx="36" cy="36" r="32" /><circle cx="36" cy="36" r="32" className="inspector-icon-progress" style={{ strokeDasharray: `${((activeIndex + 1) / securityLayers.length) * 201} 201` }} /></svg></div>
                <h3>{active.name}</h3>
                <p className="inspector-description">{active.description}</p>
                <p className="inspector-check-label">POSSIBLE CHECKS</p>
                <ul className="inspector-checks">{active.checks.map((check) => <li key={check}><Check size={13} aria-hidden="true" />{check}</li>)}</ul>
              </div>
              <div className="inspector-navigation">
                <button type="button" onClick={() => moveSelection(-1)} aria-label="Explore previous security layer"><ArrowLeft size={16} aria-hidden="true" /></button>
                <button type="button" onClick={() => moveSelection(1)} aria-label="Explore next security layer"><ArrowRight size={16} aria-hidden="true" /></button>
                <span className="inspector-count"><span>{String(activeIndex + 1).padStart(2, '0')}</span> / 07</span>
              </div>
            </div>
            <p className="system-bottom-statement">Each layer matters.<br /><span>Stronger together.</span></p>
          </div>
        </div>

        <div className="system-bottomline"><span>BUILT AROUND YOUR BUSINESS</span><span className="system-bottomline-center">Clarity across every layer.</span><span>03 <span className="system-section-index">/ 08</span></span></div>
      </div>
    </section>
  );
}
