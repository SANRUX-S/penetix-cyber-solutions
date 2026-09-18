import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ServicesGrid } from './components/ServicesGrid';
import { SecuritySystemOrbit } from './components/SecuritySystemOrbit';
import { ApproachTimeline } from './components/ApproachTimeline';
import { SecurityScorecard } from './components/SecurityScorecard';
import { WhyPenetix } from './components/WhyPenetix';
import { ResourcesSection } from './components/ResourcesSection';
import { Footer } from './components/Footer';
import { AssessmentModal } from './components/AssessmentModal';
import { SampleReportModal } from './components/SampleReportModal';
import { VideoModal } from './components/VideoModal';
import { Mail, ShieldCheck, LifeBuoy, Send } from 'lucide-react';

function PageShell({ children, footer=true }) {
  return <>
    <main className="six-page-main">{children}</main>
    {footer && <Footer/>}
  </>;
}

function HomePage() {
  const [assessment,setAssessment]=useState(false);
  const [video,setVideo]=useState(false);
  return <PageShell>
    <section className="six-page-screen home-screen">
      <Hero onOpenAssessment={()=>setAssessment(true)} onWatchStory={()=>setVideo(true)}/>
    </section>
    <AssessmentModal isOpen={assessment} onClose={()=>setAssessment(false)}/>
    <VideoModal isOpen={video} onClose={()=>setVideo(false)}/>
  </PageShell>;
}

function ServicesPage() {
  const [assessment,setAssessment]=useState(false);
  return <PageShell>
    <section className="six-page-screen services-screen">
      <ServicesGrid onSelectService={()=>setAssessment(true)}/>
    </section>
    <AssessmentModal isOpen={assessment} onClose={()=>setAssessment(false)}/>
  </PageShell>;
}

function ApproachPage() {
  return <PageShell>
    <section className="six-page-screen approach-screen">
      <SecuritySystemOrbit onExploreApproach={()=>{}}/>
      <div className="approach-bottom-strip">
        <ApproachTimeline onLearnMore={()=>{}}/>
      </div>
    </section>
  </PageShell>;
}

function CompanyPage() {
  const [report,setReport]=useState(false);
  return <PageShell>
    <section className="six-page-screen company-screen">
      <SecurityScorecard onViewSampleReport={()=>setReport(true)}/>
      <div className="company-bottom-strip"><WhyPenetix/></div>
    </section>
    <SampleReportModal isOpen={report} onClose={()=>setReport(false)}/>
  </PageShell>;
}

function ResourcesPage() {
  return <PageShell>
    <section className="six-page-screen resources-screen">
      <div className="resource-page-lead container">
        <div className="px-kicker">PENETIX RESOURCES</div>
        <h1>Learn. Stay informed.<br/><span>Build stronger security.</span></h1>
        <p>Clear, practical guidance for modern businesses — without unnecessary noise.</p>
      </div>
      <ResourcesSection onSelectResource={()=>{}}/>
    </section>
  </PageShell>;
}

function ContactPage() {
  const [sent,setSent]=useState(false);
  return <PageShell>
    <section className="six-page-screen contact-screen">
      <div className="container contact-reference-grid">
        <div className="contact-reference-copy">
          <div className="px-kicker">CONTACT PENETIX</div>
          <h1>Start with a clear<br/><span>security conversation.</span></h1>
          <p>Tell us what you want to assess, strengthen or improve. We will keep the scope practical and clear.</p>

          <div className="contact-reference-cards">
            <div><ShieldCheck size={22}/><strong>Security Assessment</strong><span>Authorized reviews and practical recommendations.</span></div>
            <div><Mail size={22}/><strong>New Business</strong><span>Questions about services, scope or a new project.</span></div>
            <div><LifeBuoy size={22}/><strong>Support</strong><span>Technical or maintenance questions for agreed work.</span></div>
          </div>
        </div>

        <form className="contact-reference-form" onSubmit={(e)=>{e.preventDefault();setSent(true)}}>
          <div className="contact-form-head"><span>PENETIX / CONTACT</span><b>01</b></div>
          <label>Name<input required placeholder="Your name"/></label>
          <label>Email<input required type="email" placeholder="you@company.com"/></label>
          <label>Company<input placeholder="Company / brand"/></label>
          <label>What do you need?<textarea required rows="5" placeholder="Tell us about the project or security review..."/></label>
          <button type="submit">Send Request <Send size={14}/></button>
          {sent && <p className="contact-form-ready">Request captured in the interface. Connect the production email/API endpoint before public launch.</p>}
        </form>
      </div>
    </section>
  </PageShell>;
}

function NotFound() {
  return <PageShell>
    <section className="six-page-screen notfound-screen">
      <div className="container">
        <div className="px-kicker">404 / PENETIX</div>
        <h1>Page not found.</h1>
        <a href="/">Return Home</a>
      </div>
    </section>
  </PageShell>;
}

export default function App() {
  let path=(window.location.pathname.replace(/\/+$/,'')||'/').toLowerCase();

  const redirects={
    '/hosting':'/services',
    '/solutions':'/approach',
    '/about':'/company',
    '/start-project':'/contact'
  };
  if(redirects[path]) {
    window.history.replaceState({},'',redirects[path]);
    path=redirects[path];
  }

  let Page=NotFound;
  if(path==='/') Page=HomePage;
  else if(path==='/services') Page=ServicesPage;
  else if(path==='/approach') Page=ApproachPage;
  else if(path==='/company') Page=CompanyPage;
  else if(path==='/resources') Page=ResourcesPage;
  else if(path==='/contact') Page=ContactPage;

  return <div className="six-page-app">
    <Navbar onOpenAssessment={()=>{window.location.href='/contact'}}/>
    <Page/>
  </div>;
}
