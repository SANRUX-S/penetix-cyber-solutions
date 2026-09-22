import { useEffect, useState } from 'react';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import ServicesSection from './components/ServicesSection.jsx';
import SecuritySystemSection from './components/SecuritySystemSection.jsx';
import ApproachSection from './components/ApproachSection.jsx';
import SecurityReviewSection from './components/SecurityReviewSection.jsx';
import WhyPenetixSection from './components/WhyPenetixSection.jsx';
import ResourcesSection from './components/ResourcesSection.jsx';
import FinalCTA from './components/FinalCTA.jsx';
import HostingPage from './components/HostingPage.jsx';
import WebDevPage from './components/WebDevPage.jsx';
import SiteDialog from './components/SiteDialog.jsx';

const getInitialRoute = () => {
  const hash = window.location.hash;
  if (hash === '#/hosting' || hash === '#hosting') return 'hosting';
  if (hash.startsWith('#/web-development') || hash === '#/pricing' || hash === '#pricing' || hash === '#web-development') return 'webdev';
  return 'home';
};

export default function App() {
  const [route, setRoute] = useState(getInitialRoute);
  const [dialog, setDialog] = useState(null);

  const navigate = (newRoute, targetSection) => {
    if (newRoute === 'hosting') {
      setRoute('hosting');
      window.location.hash = '#/hosting';
      window.scrollTo({ top: 0, behavior: 'instant' });
    } else if (newRoute === 'webdev') {
      setRoute('webdev');
      if (targetSection === 'pricing') {
        window.location.hash = '#/web-development/pricing';
      } else {
        window.location.hash = '#/web-development';
      }
      window.scrollTo({ top: 0, behavior: 'instant' });
    } else {
      setRoute('home');
      if (targetSection) {
        window.location.hash = `#${targetSection}`;
        setTimeout(() => {
          const el = document.getElementById(targetSection);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        }, 50);
      } else {
        window.location.hash = '#home';
        window.scrollTo({ top: 0, behavior: 'instant' });
      }
    }
  };

  const contact = (service) => setDialog({ type: 'contact', service: typeof service === 'string' ? service : undefined });
  const openWebDev = () => navigate('webdev');

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#/hosting' || hash === '#hosting') {
        setRoute('hosting');
        window.scrollTo({ top: 0, behavior: 'instant' });
      } else if (hash.startsWith('#/web-development') || hash === '#/pricing' || hash === '#pricing' || hash === '#web-development') {
        setRoute('webdev');
        window.scrollTo({ top: 0, behavior: 'instant' });
      } else {
        setRoute('home');
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('popstate', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('popstate', handleHashChange);
    };
  }, []);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); } });
    }, { threshold: .08, rootMargin: '0px 0px -24px 0px' });
    const elements = document.querySelectorAll('[data-reveal]');
    elements.forEach(element => { element.classList.add('will-reveal'); observer.observe(element); });
    return () => { observer.disconnect(); elements.forEach(element => element.classList.remove('will-reveal')); };
  }, [route]);

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <Navbar onContact={contact} currentRoute={route} onNavigate={navigate} onWebDev={openWebDev} />
      <main id="main-content">
        {route === 'hosting' ? (
          <HostingPage
            onContact={contact}
            onLegal={(key) => setDialog({ type: 'legal', key })}
            onNavigateHome={(targetSection) => navigate('home', targetSection)}
          />
        ) : route === 'webdev' ? (
          <WebDevPage
            onContact={contact}
            onLegal={(key) => setDialog({ type: 'legal', key })}
            onNavigateHome={(targetSection) => navigate('home', targetSection)}
          />
        ) : (
          <>
            <Hero onContact={contact} onStory={() => setDialog({ type: 'story' })} />
            <ServicesSection onContact={contact} />
            <SecuritySystemSection />
            <ApproachSection />
            <SecurityReviewSection onReport={() => setDialog({ type: 'report' })} />
            <WhyPenetixSection />
            <ResourcesSection />
            <FinalCTA onContact={contact} onLegal={(key) => setDialog({ type: 'legal', key })} />
          </>
        )}
      </main>
      <SiteDialog dialog={dialog} onClose={() => setDialog(null)} onContact={contact} onNavigate={navigate} />
    </>
  );
}
