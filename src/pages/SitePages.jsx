import React, { useState } from 'react';
import {
  ArrowRight, ShieldCheck, Layers3, Server, Mail, Network, ChartNoAxesColumnIncreasing,
  Cloud, Gauge, DatabaseBackup, LifeBuoy, Lock, Code2, Wrench, TrendingUp,
  Eye, Target, Hexagon, CheckCircle2, Send, FileText
} from 'lucide-react';

const services = [
  [ShieldCheck,'Security Assessment','Review your current security posture and identify important weaknesses.'],
  [Layers3,'Vulnerability Assessment','Identify and prioritize security issues across authorized websites and systems.'],
  [Server,'Website & Infrastructure Hardening','Improve configurations, access controls and essential security protections.'],
  [Mail,'Email & Account Security','Strengthen authentication, email security and account protection.'],
  [Network,'Security Health Check','A practical review covering accounts, backups, exposure and key business risks.'],
  [ChartNoAxesColumnIncreasing,'Security Awareness','Help teams recognize phishing, account risks and common digital threats.'],
];

function PageFrame({ eyebrow, title, accent, text, children }) {
  return (
    <main className="site-page">
      <section className="route-hero">
        <div className="container route-hero-grid">
          <div>
            <div className="route-kicker">{eyebrow}</div>
            <h1>{title}<br/><span>{accent}</span></h1>
            <p>{text}</p>
          </div>
          <div className="route-hero-art">
            <div className="route-orb"/>
            <div className="route-ring r1"/>
            <div className="route-ring r2"/>
            <small>PENETIX / SYSTEM</small>
          </div>
        </div>
      </section>
      {children}
    </main>
  );
}

export function ServicesPage() {
  return <PageFrame eyebrow="SERVICES" title="Practical security." accent="Clear outcomes." text="Focused cybersecurity services for growing businesses, delivered with clear scope, authorization and practical reporting.">
    <section className="route-section">
      <div className="container">
        <div className="route-section-head">
          <div><span>AVAILABLE NOW</span><h2>Start with what matters most.</h2></div>
          <p>We keep the service list focused. No fake enterprise claims and no unnecessary complexity.</p>
        </div>
        <div className="route-card-grid three">
          {services.map(([Icon,title,desc],i)=><article className="route-card" key={title}>
            <div className="route-card-top"><b>0{i+1}</b><Icon size={24}/></div>
            <h3>{title}</h3><p>{desc}</p>
            <a href="/contact">Discuss this service <ArrowRight size={13}/></a>
          </article>)}
        </div>
      </div>
    </section>
    <ProcessBlock/>
    <RouteCTA/>
  </PageFrame>
}

export function HostingPage() {
  const items = [
    [Cloud,'Hosting Setup','Help selecting and configuring suitable hosting for your website or application.'],
    [Gauge,'Performance Basics','Caching, asset optimization and practical performance improvements.'],
    [Lock,'Secure Configuration','HTTPS, access controls, environment handling and sensible hardening.'],
    [DatabaseBackup,'Backup Planning','Practical backup and restore planning for supported projects.'],
    [LifeBuoy,'Maintenance Support','Updates, troubleshooting and technical maintenance where agreed.'],
    [Server,'Infrastructure Guidance','Clear recommendations for simple, maintainable deployment setups.'],
  ];
  return <PageFrame eyebrow="HOSTING" title="Reliable foundations." accent="Without unnecessary complexity." text="Hosting and infrastructure guidance for businesses that need a clean, secure and maintainable web setup.">
    <section className="route-section">
      <div className="container">
        <div className="route-card-grid three">
          {items.map(([Icon,t,d],i)=><article className="route-card" key={t}><div className="route-card-top"><b>0{i+1}</b><Icon size={24}/></div><h3>{t}</h3><p>{d}</p></article>)}
        </div>
        <div className="route-note"><ShieldCheck size={20}/><p>PENETIX does not claim to operate its own global data-center network. Hosting solutions are selected and configured using appropriate third-party infrastructure for the project.</p></div>
      </div>
    </section>
    <RouteCTA/>
  </PageFrame>
}

export function SolutionsPage() {
  const solutions = [
    [Code2,'BUILD','Create a strong, maintainable digital foundation.',['Website planning','Modern implementation','Performance basics','Clean deployment']],
    [ShieldCheck,'SECURE','Reduce avoidable risk early.',['Security review','Access hardening','Secure configuration','Prioritized improvements']],
    [Wrench,'MAINTAIN','Keep systems useful and dependable.',['Bug fixes','Content updates','Security maintenance','Technical support']],
    [TrendingUp,'GROW','Prepare for the next stage.',['Hosting roadmap','Security roadmap','Infrastructure guidance','Future capability planning']],
  ];
  return <PageFrame eyebrow="SOLUTIONS" title="Start with the outcome." accent="Not the jargon." text="Choose a practical direction based on what your business needs now, then grow the security and infrastructure over time.">
    <section className="route-section">
      <div className="container solution-stack">
        {solutions.map(([Icon,name,desc,items],i)=><article className="solution-row" key={name}>
          <div><span>0{i+1}</span><Icon size={27}/><h2>{name}</h2><p>{desc}</p></div>
          <div className="solution-points">{items.map(x=><div key={x}><CheckCircle2 size={15}/>{x}</div>)}</div>
        </article>)}
      </div>
    </section>
    <RouteCTA/>
  </PageFrame>
}

export function AboutPage() {
  return <PageFrame eyebrow="ABOUT PENETIX" title="Built around clarity." accent="Designed to grow responsibly." text="PENETIX is an early-stage cybersecurity and technology brand focused on practical, security-minded digital work.">
    <section className="route-section">
      <div className="container about-grid">
        <div>
          <div className="route-kicker dark">OUR DIRECTION</div>
          <h2>Build well. Secure early.</h2>
          <p className="route-copy">The current focus is practical: security assessments, vulnerability reviews, website and infrastructure hardening, email and account security, security health checks and awareness. Capabilities can expand over time without pretending the company already operates services it does not yet provide.</p>
        </div>
        <div className="route-card-grid two">
          {[
            [Target,'Mission','Help growing businesses understand risk and build stronger digital foundations.'],
            [Eye,'Vision','Grow into a trusted modern cybersecurity and technology company.'],
            [Hexagon,'Approach','Assess → Prioritize → Improve → Grow.'],
            [ShieldCheck,'Principle','Authorized work, clear scope and honest capability statements.'],
          ].map(([Icon,t,d])=><article className="route-card compact" key={t}><Icon size={23}/><h3>{t}</h3><p>{d}</p></article>)}
        </div>
      </div>
    </section>
    <section className="brand-statement"><div className="container"><span>PENETIX</span><h2>SECURING THE <em>DIGITAL FUTURE.</em></h2><p>BUILD • SECURE • GROW</p></div></section>
  </PageFrame>
}

function ContactForm({ project=false }) {
  const [sent,setSent]=useState(false);
  return <form className="route-form" onSubmit={(e)=>{e.preventDefault();setSent(true)}}>
    <div className="form-grid">
      <label><span>Name *</span><input required placeholder="Your name"/></label>
      <label><span>Email *</span><input type="email" required placeholder="you@company.com"/></label>
      <label><span>Company / Brand</span><input placeholder="Company name"/></label>
      <label><span>{project?'Project type':'Website / URL'}</span><input placeholder={project?'Security review / Website / Hosting':'https://...'}/></label>
      <label className="wide"><span>{project?'Project details *':'Message *'}</span><textarea required rows="6" placeholder="Tell PENETIX what you need..."/></label>
    </div>
    <button className="form-submit" type="submit">{project?'Submit Project Request':'Send Request'} <Send size={15}/></button>
    {sent && <p className="form-ready">Form UI is working. Connect your email/API endpoint before public launch to deliver submissions.</p>}
  </form>
}

export function ContactPage() {
  return <PageFrame eyebrow="CONTACT" title="One clear place." accent="Start the conversation." text="Use the contact page for new business, support questions or an authorized security-assessment inquiry.">
    <section className="route-section"><div className="container contact-grid">
      <div className="contact-side">
        <div className="contact-option"><Mail size={22}/><h3>New Business</h3><p>Security services, website/infrastructure questions or consultation.</p></div>
        <div className="contact-option"><LifeBuoy size={22}/><h3>Existing Support</h3><p>Maintenance, update or technical support request.</p></div>
        <div className="contact-option"><ShieldCheck size={22}/><h3>Security Assessment</h3><p>Only for systems you own or are explicitly authorized to test.</p></div>
      </div>
      <ContactForm/>
    </div></section>
  </PageFrame>
}

export function StartProjectPage() {
  return <PageFrame eyebrow="START A PROJECT" title="Tell us the goal." accent="We will map the path." text="Share the project scope, current situation and what you want to improve.">
    <section className="route-section"><div className="container form-page"><ContactForm project/></div></section>
  </PageFrame>
}

export function ResourcesPage() {
  const cards=[
    ['Cybersecurity Basics','A plain-language introduction to practical business cybersecurity.'],
    ['Website Security Checklist','A starter checklist for improving common website security controls.'],
    ['Email Security Guide','Simple steps for reducing account compromise and phishing risk.'],
    ['Business Security Checklist','A short review of accounts, backups, access and exposure.'],
  ];
  return <PageFrame eyebrow="RESOURCES" title="Learn clearly." accent="Improve continuously." text="Short practical guides for businesses that want to understand and improve their security.">
    <section className="route-section"><div className="container route-card-grid two">{cards.map(([t,d],i)=><article className="resource-big" key={t}><span>0{i+1}</span><FileText size={25}/><h3>{t}</h3><p>{d}</p><small>COMING RESOURCE</small></article>)}</div></section>
  </PageFrame>
}

function LegalPage({kind}) {
  const isPrivacy=kind==='privacy', isAuth=kind==='authorization';
  const title=isPrivacy?'Privacy Policy':isAuth?'Security Testing Authorization':'Terms of Service';
  const accent=isPrivacy?'Respecting information and confidentiality.':isAuth?'Authorized systems only.':'Clear expectations for working together.';
  return <PageFrame eyebrow="LEGAL" title={title} accent={accent} text="A concise starter policy page for the PENETIX website.">
    <section className="route-section"><div className="container legal-copy">
      {isPrivacy ? <>
        <h2>Information we receive</h2><p>Information submitted through PENETIX contact or project forms may include names, email addresses, company details, project information and messages.</p>
        <h2>How information is used</h2><p>Information is used to respond to inquiries, scope requested work, provide support and improve the service experience. PENETIX should not request unnecessary sensitive information through public forms.</p>
        <h2>Confidentiality</h2><p>Project and security information should be handled carefully and shared only where required for the agreed work.</p>
      </> : isAuth ? <>
        <h2>Permission is required</h2><p>PENETIX security testing is intended only for systems owned by the client or systems for which the client has clear written authorization to test.</p>
        <h2>Scope comes first</h2><p>Domains, applications, IP ranges, accounts, testing windows and excluded systems should be agreed before any active testing begins.</p>
        <h2>No unauthorized testing</h2><p>PENETIX should not perform testing against unrelated third-party systems or assets outside an approved scope.</p>
      </> : <>
        <h2>Service scope</h2><p>The agreed proposal, statement of work or written scope defines what PENETIX will deliver for a project.</p>
        <h2>Client responsibilities</h2><p>Clients must provide accurate information, required access and appropriate authorization for requested work.</p>
        <h2>Security work</h2><p>Security assessments and vulnerability testing require explicit authorization and a clearly defined scope.</p>
      </>}
      <p className="legal-note">This is starter website copy and should be reviewed before relying on it as final legal advice.</p>
    </div></section>
  </PageFrame>
}
export const PrivacyPage=()=> <LegalPage kind="privacy"/>;
export const TermsPage=()=> <LegalPage kind="terms"/>;
export const SecurityAuthorizationPage=()=> <LegalPage kind="authorization"/>;

export function NotFoundPage() {
  return <PageFrame eyebrow="404" title="Page not found." accent="Return to PENETIX." text="The page you requested does not exist or has moved.">
    <section className="route-section"><div className="container"><a className="route-primary" href="/">Return Home <ArrowRight size={14}/></a></div></section>
  </PageFrame>
}

function ProcessBlock(){
  return <section className="process-block"><div className="container">
    <div className="route-kicker">OUR APPROACH</div><h2>Scope → Assess → Prioritize → Improve</h2>
    <div className="process-grid">{['Scope the authorized work','Assess meaningful risk','Prioritize what matters','Improve with practical actions'].map((x,i)=><div key={x}><b>0{i+1}</b><span>{x}</span></div>)}</div>
  </div></section>
}
function RouteCTA(){
  return <section className="route-cta"><div className="container"><div><span>READY TO START?</span><h2>Know your risk. Strengthen what matters.</h2></div><a href="/contact">Contact PENETIX <ArrowRight size={14}/></a></div></section>
}
