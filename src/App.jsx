import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ServicesGrid } from './components/ServicesGrid';
import { SecuritySystemOrbit } from './components/SecuritySystemOrbit';
import { ApproachTimeline } from './components/ApproachTimeline';
import { SecurityScorecard } from './components/SecurityScorecard';
import { WhyPenetix } from './components/WhyPenetix';
import { ResourcesSection } from './components/ResourcesSection';
import { PreFooterCta } from './components/PreFooterCta';
import { Footer } from './components/Footer';
import { AssessmentModal } from './components/AssessmentModal';
import { SampleReportModal } from './components/SampleReportModal';
import { VideoModal } from './components/VideoModal';
import {
  ServicesPage, HostingPage, SolutionsPage, AboutPage, ContactPage, StartProjectPage,
  ResourcesPage, PrivacyPage, TermsPage, SecurityAuthorizationPage, NotFoundPage
} from './pages/SitePages';

function HomePage(){
  const [assessmentModalOpen,setAssessmentModalOpen]=useState(false);
  const [reportModalOpen,setReportModalOpen]=useState(false);
  const [videoModalOpen,setVideoModalOpen]=useState(false);
  const openAssessment=()=>setAssessmentModalOpen(true);
  const scrollApproach=()=>document.getElementById('approach-timeline')?.scrollIntoView({behavior:'smooth'});
  return <>
    <Navbar onOpenAssessment={openAssessment}/>
    <main>
      <Hero onOpenAssessment={openAssessment} onWatchStory={()=>setVideoModalOpen(true)}/>
      <ServicesGrid onSelectService={openAssessment}/>
      <SecuritySystemOrbit onExploreApproach={scrollApproach}/>
      <ApproachTimeline onLearnMore={scrollApproach}/>
      <SecurityScorecard onViewSampleReport={()=>setReportModalOpen(true)}/>
      <WhyPenetix/>
      <ResourcesSection onSelectResource={()=>{window.location.href='/resources'}}/>
      <PreFooterCta onOpenAssessment={openAssessment} onContact={()=>{window.location.href='/contact'}}/>
    </main>
    <Footer/>
    <AssessmentModal isOpen={assessmentModalOpen} onClose={()=>setAssessmentModalOpen(false)}/>
    <SampleReportModal isOpen={reportModalOpen} onClose={()=>setReportModalOpen(false)}/>
    <VideoModal isOpen={videoModalOpen} onClose={()=>setVideoModalOpen(false)}/>
  </>
}

const routeMap={
  '/services':ServicesPage,
  '/hosting':HostingPage,
  '/solutions':SolutionsPage,
  '/approach':SolutionsPage,
  '/about':AboutPage,
  '/company':AboutPage,
  '/contact':ContactPage,
  '/start-project':StartProjectPage,
  '/resources':ResourcesPage,
  '/privacy':PrivacyPage,
  '/terms':TermsPage,
  '/security-authorization':SecurityAuthorizationPage,
};

export function App(){
  const path=(window.location.pathname.replace(/\/+$/,'')||'/').toLowerCase();
  if(path==='/') return <HomePage/>;
  const Page=routeMap[path]||NotFoundPage;
  return <div style={{minHeight:'100vh',display:'flex',flexDirection:'column'}}>
    <Navbar/>
    <Page/>
    <Footer/>
  </div>
}
export default App;
