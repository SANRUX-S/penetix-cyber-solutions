import React from 'react';
import { ShieldCheck, Layers3, Server, UserRound, Network, ChartNoAxesColumnIncreasing, ArrowRight } from 'lucide-react';

const SERVICES = [
  ['01','Security Assessment',ShieldCheck,'Review your current security posture and identify important weaknesses.'],
  ['02','Vulnerability Assessment',Layers3,'Identify and prioritize security issues across authorized websites and systems.'],
  ['03','Website & Infrastructure Hardening',Server,'Improve configurations, access controls and essential security protections.'],
  ['04','Email & Account Security',UserRound,'Strengthen authentication, email security and account protection.'],
  ['05','Security Health Check',Network,'A practical review covering accounts, backups, exposure and key business risks.'],
  ['06','Security Awareness',ChartNoAxesColumnIncreasing,'Help teams recognize phishing, account risks and common digital threats.'],
];

export function ServicesGrid({ onSelectService }) {
  return (
    <section id="services" className="px-services">
      <div className="container">
        <div className="px-section-head">
          <div>
            <div className="px-kicker" style={{marginBottom:6}}>WHAT WE DO</div>
            <h2 className="px-section-title">Practical cybersecurity for real businesses.</h2>
          </div>
          <p className="px-section-copy">Focused services designed to identify risk, improve security, and give businesses a clear path forward.</p>
          <a className="px-text-link" href="#services">View All Services <ArrowRight size={13}/></a>
        </div>
        <div className="px-services-grid">
          {SERVICES.map(([id,title,Icon,desc])=>(
            <article key={id} className="px-service-card" onClick={()=>onSelectService?.({id,title})}>
              <div className="px-service-top"><span className="px-service-id">{id}</span><Icon className="px-service-icon" size={22}/></div>
              <h3>{title}</h3>
              <p>{desc}</p>
              <div className="px-service-arrow"><ArrowRight size={14}/></div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
