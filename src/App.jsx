import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ServicesGrid } from './components/ServicesGrid';
import { SecuritySystemOrbit } from './components/SecuritySystemOrbit';
import { SecurityScorecard } from './components/SecurityScorecard';
import { WhyPenetix } from './components/WhyPenetix';
import { ResourcesSection } from './components/ResourcesSection';
import { PreFooterCta } from './components/PreFooterCta';
import { Footer } from './components/Footer';
import { AssessmentModal } from './components/AssessmentModal';
import { SampleReportModal } from './components/SampleReportModal';
import { VideoModal } from './components/VideoModal';
import { ContactPage, NotFoundPage } from './pages/SitePages';

function HomePage(){
  const [assessmentModalOpen,setAssessmentModalOpen]=useState(false);
  const [videoModalOpen,setVideoModalOpen]=useState(false);
  return <>
    <main style={{flex:1}}>
      <Hero onOpenAssessment={()=>setAssessmentModalOpen(true)} onWatchStory={()=>setVideoModalOpen(true)}/>
    </main>
    <Footer/>
    <AssessmentModal isOpen={assessmentModalOpen} onClose={()=>setAssessmentModalOpen(false)}/>
    <VideoModal isOpen={videoModalOpen} onClose={()=>setVideoModalOpen(false)}/>
  </>;
}

function ServicesPage(){
  const [assessmentModalOpen,setAssessmentModalOpen]=useState(false);
  return <>
    <main style={{flex:1}} className="single-route-page">
      <ServicesGrid onSelectService={()=>setAssessmentModalOpen(true)}/>
    </main>
    <Footer/>
    <AssessmentModal isOpen={assessmentModalOpen} onClose={()=>setAssessmentModalOpen(false)}/>
  </>;
}

function ApproachPage(){
  return <>
    <main style={{flex:1}} className="single-route-page">
      <SecuritySystemOrbit onExploreApproach={()=>{}}/>
    </main>
    <Footer/>
  </>;
}

function CompanyPage(){
  const [reportModalOpen,setReportModalOpen]=useState(false);
  return <>
    <main style={{flex:1}} className="single-route-page">
      <SecurityScorecard onViewSampleReport={()=>setReportModalOpen(true)}/>
      <WhyPenetix/>
    </main>
    <Footer/>
    <SampleReportModal isOpen={reportModalOpen} onClose={()=>setReportModalOpen(false)}/>
  </>;
}

function ResourcesPage(){
  return <>
    <main style={{flex:1}} className="single-route-page">
      <ResourcesSection onSelectResource={()=>{}}/>
    </main>
    <Footer/>
  </>;
}

function ContactRoute(){
  return <>
    <main style={{flex:1}} className="single-route-page">
      <ContactPage/>
      <PreFooterCta onOpenAssessment={()=>{window.location.href='/contact'}} onContact={()=>{window.location.href='/contact'}}/>
    </main>
    <Footer/>
  </>;
}

export function App(){
  let path=(window.location.pathname.replace(/\/+$/,'')||'/').toLowerCase();

  // Keep older public URLs working while the visible site uses the six-page reference structure.
  if(path==='/hosting') { window.history.replaceState({},'', '/services'); path='/services'; }
  if(path==='/solutions') { window.history.replaceState({},'', '/approach'); path='/approach'; }
  if(path==='/about') { window.history.replaceState({},'', '/company'); path='/company'; }
  if(path==='/start-project') { window.history.replaceState({},'', '/contact'); path='/contact'; }

  let page;
  if(path==='/') page=<HomePage/>;
  else if(path==='/services') page=<ServicesPage/>;
  else if(path==='/approach') page=<ApproachPage/>;
  else if(path==='/company') page=<CompanyPage/>;
  else if(path==='/resources') page=<ResourcesPage/>;
  else if(path==='/contact') page=<ContactRoute/>;
  else page=<><main style={{flex:1}}><NotFoundPage/></main><Footer/></>;

  return <div style={{minHeight:'100vh',display:'flex',flexDirection:'column'}}>
    <Navbar onOpenAssessment={()=>{window.location.href='/contact'}}/>
    {page}
  </div>;
}
export default App;
