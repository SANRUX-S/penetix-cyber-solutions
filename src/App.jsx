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

export function App() {
  const [assessmentModalOpen, setAssessmentModalOpen] = useState(false);
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [videoModalOpen, setVideoModalOpen] = useState(false);

  const handleOpenAssessment = () => {
    setAssessmentModalOpen(true);
  };

  const handleOpenReport = () => {
    setReportModalOpen(true);
  };

  const handleOpenVideo = () => {
    setVideoModalOpen(true);
  };

  const handleSelectService = (service) => {
    setAssessmentModalOpen(true);
  };

  const handleSelectResource = (resource) => {
    alert(`Viewing Resource: "${resource.title}". In production, this opens the full technical whitepaper or security checklist.`);
  };

  const handleScrollToApproach = () => {
    const el = document.getElementById('approach-timeline');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-main)' }}>
      {/* Top Fixed / Sticky Navigation */}
      <Navbar onOpenAssessment={handleOpenAssessment} />

      {/* Main Page Body */}
      <main style={{ flex: 1 }}>
        {/* Hero Section with 3D Chrome Sphere Visual & Alpine Panorama */}
        <Hero
          onOpenAssessment={handleOpenAssessment}
          onWatchStory={handleOpenVideo}
        />

        {/* 6 Services Grid Section */}
        <ServicesGrid onSelectService={handleSelectService} />

        {/* 3D Interactive Defense System Radar Section ("Security is a system") */}
        <SecuritySystemOrbit onExploreApproach={handleScrollToApproach} />

        {/* Structured 4-Step Approach Timeline */}
        <ApproachTimeline onLearnMore={handleScrollToApproach} />

        {/* Security Posture Dashboard & Sample Review Showcase */}
        <SecurityScorecard onViewSampleReport={handleOpenReport} />

        {/* 4 Value Pillars: Why Penetix */}
        <WhyPenetix />

        {/* Educational Resources & Guides */}
        <ResourcesSection onSelectResource={handleSelectResource} />

        {/* Dark Pre-Footer Call-To-Action Banner */}
        <PreFooterCta
          onOpenAssessment={handleOpenAssessment}
          onContact={handleOpenAssessment}
        />
      </main>

      {/* Corporate Multi-Column Footer */}
      <Footer />

      {/* Interactive Modals */}
      <AssessmentModal
        isOpen={assessmentModalOpen}
        onClose={() => setAssessmentModalOpen(false)}
      />

      <SampleReportModal
        isOpen={reportModalOpen}
        onClose={() => setReportModalOpen(false)}
      />

      <VideoModal
        isOpen={videoModalOpen}
        onClose={() => setVideoModalOpen(false)}
      />
    </div>
  );
}

export default App;
