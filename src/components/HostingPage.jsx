import { useState } from 'react';
import {
  ShieldCheck,
  Server,
  LockKeyhole,
  DatabaseBackup,
  KeyRound,
  Activity,
  CheckCircle2,
  ArrowRight,
  ArrowUpRight,
  Cpu,
  Globe,
  HardDrive,
  Zap,
  Terminal,
  Layers,
  HelpCircle,
} from 'lucide-react';
import Footer from './Footer.jsx';
import HostingPricingSection from './HostingPricingSection.jsx';

const features = [
  {
    icon: ShieldCheck,
    title: 'Multi-Layer DDoS Mitigation',
    description:
      'Continuous volumetric and application-layer (Layer 3/4 & Layer 7) traffic scrubbing. Protects against massive bot floods without increasing latency.',
  },
  {
    icon: Server,
    title: 'Kernel-Hardened OS',
    description:
      'Operating systems customized with strict SELinux/AppArmor profiles, kernel security patches, and zero unnecessary listening daemons or legacy services.',
  },
  {
    icon: LockKeyhole,
    title: 'Intelligent Web Application Firewall',
    description:
      'Automated WAF continuously updated to stop OWASP Top 10 exploits, zero-days, SQL injection, cross-site scripting, and malicious scraping.',
  },
  {
    icon: DatabaseBackup,
    title: 'Immutable Daily Backups',
    description:
      'Encrypted, offsite, air-gapped snapshots with verified restore points to guarantee business continuity and ransomware immunity.',
  },
  {
    icon: KeyRound,
    title: 'Zero-Trust Access Control',
    description:
      'Enforce hardware key MFA, IP whitelisting, and strict cryptographic SSH key authentication. No passwords or unprotected administrative interfaces.',
  },
  {
    icon: Activity,
    title: '24/7 Threat Telemetry & Monitoring',
    description:
      'Real-time perimeter monitoring, anomaly detection, and automated alerts to catch suspicious access attempts before they escalate.',
  },
];

const plans = [
  {
    tier: 'STARTER HARDENED',
    name: 'Cloud VPS Secure',
    price: '$49',
    period: '/ month',
    description:
      'Ideal for growing business websites, portals, and web applications needing hardened isolation.',
    featured: false,
    specs: [
      '4 vCPU Cores (Dedicated Allocation)',
      '8 GB ECC Memory',
      '160 GB Enterprise NVMe Storage',
      '10 TB High-Speed Bandwidth',
      'Automated WAF & Daily Backups',
      'Free Let’s Encrypt Wildcard SSL',
      'Standard 99.95% Uptime SLA',
    ],
    serviceQuery: 'Cloud VPS Secure Hosting',
  },
  {
    tier: 'ENTERPRISE RECOMMENDED',
    name: 'Dedicated Security Server',
    price: '$189',
    period: '/ month',
    description:
      'Bare-metal performance with hardware-level isolation for high-traffic and compliance-driven workloads.',
    featured: true,
    specs: [
      '8 Cores / 16 Threads AMD EPYC',
      '32 GB ECC DDR4 Memory',
      '500 GB RAID-1 NVMe Storage',
      'Unlimited High-Speed Clean Bandwidth',
      'Advanced Layer 7 DDoS Scrubbing',
      'Continuous Intrusion Detection (IDS/IPS)',
      'Dedicated IP & Hardware MFA Access',
      'Priority 99.99% Uptime SLA',
    ],
    serviceQuery: 'Dedicated Security Server Hosting',
  },
  {
    tier: 'MISSION CRITICAL',
    name: 'High-Availability Cluster',
    price: '$449',
    period: '/ month',
    description:
      'Multi-node failover cluster designed for zero-downtime financial, healthcare, and enterprise apps.',
    featured: false,
    specs: [
      'Multi-Region Load Balanced Cluster',
      '64 GB+ Distributed Memory',
      'Synchronous Real-Time Data Replication',
      'Global Anycast Network Routing',
      'Custom WAF Rule Engineering',
      'Automated Multi-Zone Disaster Recovery',
      'Dedicated Security Engineer Support',
      '99.999% High Availability SLA',
    ],
    serviceQuery: 'High-Availability Hosting Cluster',
  },
];

const faqs = [
  {
    q: 'How does PENETIX Hardened Hosting differ from standard web hosts?',
    a: 'Standard hosts prioritize density and low cost, often sharing kernel resources and leaving management interfaces vulnerable. PENETIX configures each environment from the ground up with defensive hardening: kernel-level protections, proactive WAF rules, isolated environments, and continuous monitoring.',
  },
  {
    q: 'Can PENETIX assist with migrating our existing website or database?',
    a: 'Yes. Our security engineering team handles full end-to-end migrations with zero downtime, performing security audits on your existing code and databases during the transition.',
  },
  {
    q: 'Where are your data centers located?',
    a: 'Our infrastructure is housed in Tier III+ and Tier IV certified facilities in North America, Europe, and Asia-Pacific, featuring redundant power, physical biometric access security, and multi-homed tier-1 transit.',
  },
  {
    q: 'How are backups and disaster recovery managed?',
    a: 'All data is snapshotted daily with AES-256 encryption and replicated to geographically separate, air-gapped storage. Restore drills are executed routinely to guarantee rapid recovery readiness.',
  },
];

export default function HostingPage({ onContact, onLegal, onNavigateHome }) {
  const [activeFaq, setActiveFaq] = useState(null);

  return (
    <div className="hosting-page" id="hosting-page">
      {/* Hero Section */}
      <section className="hosting-hero" id="hosting-hero">
        <div className="container hosting-hero-inner">
          <div className="hosting-hero-content">
            <div className="hosting-badge">
              <span className="hosting-badge-dot" />
              Cyber-Hardened Hosting Infrastructure
            </div>
            <h1 className="hosting-title">
              Enterprise hosting built for <span>security first.</span>
            </h1>
            <p className="hosting-subtitle">
              High-performance, fortified hosting infrastructure designed to defend against modern
              cyber threats, DDoS attacks, unauthorized access, and data breaches.
            </p>
            <div className="button-row">
              <a href="#pricing" className="button button-primary">
                Explore Hosting Plans <ArrowRight size={16} />
              </a>
              <button
                className="button button-secondary"
                onClick={() => onContact('Cloud / Hosting Security Review')}
              >
                Request Custom Setup
              </button>
            </div>
            <div className="hosting-quick-stats">
              <div className="stat-item">
                <span className="stat-value">99.99%</span>
                <span className="stat-label">Uptime SLA</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">&lt; 15ms</span>
                <span className="stat-label">Average Latency</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">2.4 Tbps</span>
                <span className="stat-label">DDoS Scrubbing Capacity</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">24/7/365</span>
                <span className="stat-label">Security Monitoring</span>
              </div>
            </div>
          </div>

          <div className="hosting-hero-visual">
            <div className="hosting-hero-card">
              <div className="card-status-bar">
                <span className="status-online">
                  <span className="status-indicator" />
                  INFRASTRUCTURE ONLINE
                </span>
                <span>SEC-NODE // 01</span>
              </div>
              <div className="server-metric-row">
                <span className="metric-name">
                  <Cpu size={15} /> System Integrity
                </span>
                <span className="metric-val">100% SECURE</span>
              </div>
              <div className="server-metric-row">
                <span className="metric-name">
                  <Globe size={15} /> DDoS Shield
                </span>
                <span className="metric-val">ACTIVE (ANYCAST)</span>
              </div>
              <div className="server-metric-row">
                <span className="metric-name">
                  <LockKeyhole size={15} /> WAF Rule Engine
                </span>
                <span className="metric-val">ENFORCING</span>
              </div>
              <div className="server-metric-row">
                <span className="metric-name">
                  <HardDrive size={15} /> Air-Gapped Snapshot
                </span>
                <span className="metric-val">VERIFIED (SYNCED)</span>
              </div>
              <div className="terminal-box">
                <div className="terminal-line">
                  <span className="terminal-prompt">$</span> penetix-guardian status
                </div>
                <div className="terminal-line">&gt; Kernel: Linux 6.6.x (Hardened Grsec)</div>
                <div className="terminal-line">&gt; Zero unauthorized ports open</div>
                <div className="terminal-line">&gt; Perimeter defense: NOMINAL</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="hosting-features-section" id="hosting-features">
        <div className="container">
          <div className="section-heading">
            <div className="section-heading-title">
              <p className="eyebrow">BUILT-IN PROTECTION</p>
              <h2>Security is not an add-on.<br />It’s our architecture.</h2>
            </div>
            <div className="section-heading-aside">
              <p>
                Every server comes pre-configured with defensive hardening, strict isolation, and
                continuous telemetry so you can deploy with confidence.
              </p>
            </div>
            <div className="section-index">01 <span>/ 04</span></div>
          </div>

          <div className="features-grid">
            {features.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div className="feature-card" key={idx}>
                  <div className="feature-icon-wrapper">
                    <Icon size={24} strokeWidth={1.5} />
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Hosting Plans Section */}
      <HostingPricingSection onContact={onContact} />

      {/* Architecture & Compliance Overview */}
      <section className="hosting-architecture-section" id="hosting-architecture">
        <div className="container">
          <div className="section-heading">
            <div className="section-heading-title">
              <p className="eyebrow">ENTERPRISE ASSURANCE</p>
              <h2>Infrastructure engineered<br />for uncompromising uptime.</h2>
            </div>
            <div className="section-heading-aside">
              <p>
                Strict hardware isolation, redundant network transit, and verified compliance standards
                ensure business reliability under any conditions.
              </p>
            </div>
            <div className="section-index">03 <span>/ 04</span></div>
          </div>

          <div className="architecture-grid">
            <div className="arch-card">
              <h4>Tier III+ & IV Facilities</h4>
              <p>Redundant power feeds, N+1 generators, biometric access controls, and 24/7 on-site physical security.</p>
            </div>
            <div className="arch-card">
              <h4>Anycast Global Routing</h4>
              <p>Ultra-low latency edge points with automatic BGP rerouting around regional fiber cuts or network congestion.</p>
            </div>
            <div className="arch-card">
              <h4>Regulatory Alignment</h4>
              <p>Architected to fulfill compliance mandates including ISO 27001, SOC 2, HIPAA, and GDPR data residency.</p>
            </div>
            <div className="arch-card">
              <h4>Zero Port Exposure</h4>
              <p>External network perimeters are locked down strictly. Administrative access requires authenticated cryptographic tunnels.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="hosting-faq-section" id="hosting-faq">
        <div className="container">
          <div className="section-heading">
            <div className="section-heading-title">
              <p className="eyebrow">QUESTIONS & ANSWERS</p>
              <h2>Frequently asked questions<br />about our hosting.</h2>
            </div>
            <div className="section-heading-aside">
              <p>Everything you need to know about our infrastructure, onboarding, and migration support.</p>
            </div>
            <div className="section-index">04 <span>/ 04</span></div>
          </div>

          <div className="faq-grid">
            {faqs.map((faq, idx) => (
              <div className="faq-item" key={idx}>
                <h4>{faq.q}</h4>
                <p>{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA & Footer */}
      <section className="section-panel contact-section" id="hosting-cta">
        <div className="final-cta">
          <img src="/images/mountains.webp" alt="" loading="lazy" width="1536" height="1024" />
          <div className="container final-cta-inner">
            <div className="cta-topline">
              <span className="eyebrow">FORTIFY YOUR DIGITAL ASSETS</span>
              <span className="section-index">HOSTING <span>/ CLOUD</span></span>
            </div>
            <div className="cta-content">
              <h2>Deploy on infrastructure<br /><span>engineered for security.</span></h2>
              <p>Consult with our cloud security architects to design and deploy a custom hardened hosting environment.</p>
              <div className="button-row">
                <button
                  className="button button-light"
                  onClick={() => onContact('Cloud / Hosting Security Review')}
                >
                  Consult an Architect <ArrowRight size={18} />
                </button>
                <a className="text-link text-link-light" href="mailto:penetixcybersolutions@gmail.com">
                  Contact PENETIX <ArrowRight size={17} />
                </a>
              </div>
            </div>
            <div className="cta-bottomline">
              <span>Hardened OS. <i /> Anycast DDoS Shield. <i /> 24/7 Security Telemetry.</span>
              <span>A SAFER DIGITAL FOUNDATION.<br />ALWAYS.</span>
            </div>
          </div>
        </div>
        <Footer onContact={onContact} onLegal={onLegal} />
      </section>
    </div>
  );
}
