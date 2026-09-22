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

const routeFromLocation = () => {
  const path = window.location.pathname.replace(/\/+$/, '') || '/';
  const hash = window.location.hash;

  if (path === '/hosting') return 'hosting';
  if (path === '/web-development') return 'webdev';

  // Keep old shared links working while using real paths going forward.
  if (hash === '#/hosting' || hash === '#hosting') return 'hosting';
  if (
    hash.startsWith('#/web-development') ||
    hash === '#/pricing' ||
    hash === '#pricing' ||
    hash === '#web-development'
  ) return 'webdev';

  return 'home';
};

const setMeta = (selector, attribute, value) => {
  let element = document.head.querySelector(selector);
  if (!element) {
    element = document.createElement('meta');
    const [key, rawName] = attribute.split('=');
    element.setAttribute(key, rawName.replace(/["']/g, ''));
    document.head.appendChild(element);
  }
  element.setAttribute('content', value);
};

export default function App() {
  const [route, setRoute] = useState(routeFromLocation);
  const [dialog, setDialog] = useState(null);

  const navigate = (newRoute, targetSection) => {
    if (newRoute === 'hosting') {
      window.history.pushState({}, '', '/hosting');
      setRoute('hosting');
      window.scrollTo({ top: 0, behavior: 'instant' });
      return;
    }

    if (newRoute === 'webdev') {
      const url = targetSection === 'pricing' ? '/web-development#pricing' : '/web-development';
      window.history.pushState({}, '', url);
      setRoute('webdev');
      if (targetSection === 'pricing') {
        window.setTimeout(() => {
          document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 60);
      } else {
        window.scrollTo({ top: 0, behavior: 'instant' });
      }
      return;
    }

    const hash = targetSection ? `#${targetSection}` : '';
    window.history.pushState({}, '', `/${hash}`);
    setRoute('home');

    if (targetSection) {
      window.setTimeout(() => {
        document.getElementById(targetSection)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 60);
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  };

  const contact = (service) =>
    setDialog({ type: 'contact', service: typeof service === 'string' ? service : undefined });
  const openWebDev = () => navigate('webdev');

  useEffect(() => {
    // Convert legacy hash-route links to clean paths once loaded.
    if (window.location.pathname === '/') {
      if (window.location.hash === '#/hosting' || window.location.hash === '#hosting') {
        window.history.replaceState({}, '', '/hosting');
      } else if (window.location.hash.startsWith('#/web-development')) {
        const wantsPricing = window.location.hash.includes('pricing');
        window.history.replaceState({}, '', wantsPricing ? '/web-development#pricing' : '/web-development');
      }
    }

    const syncRoute = () => {
      setRoute(routeFromLocation());
    };

    window.addEventListener('popstate', syncRoute);
    window.addEventListener('hashchange', syncRoute);
    return () => {
      window.removeEventListener('popstate', syncRoute);
      window.removeEventListener('hashchange', syncRoute);
    };
  }, []);

  useEffect(() => {
    const seo = {
      home: {
        title: 'PENETIX — Security without the noise.',
        description:
          'Practical cybersecurity assessments, hardening and risk reduction for growing businesses. Understand your exposure and strengthen what matters.',
        path: '/',
      },
      webdev: {
        title: 'Secure Web Development & Pricing | PENETIX',
        description:
          'Security-focused React, Next.js and Vite web development with transparent packages, modern performance practices and scalable architecture.',
        path: '/web-development',
      },
      hosting: {
        title: 'Managed Hosting — Coming Soon | PENETIX',
        description:
          'PENETIX managed hosting is in development. Join the conversation for future security-focused hosting, monitoring and managed infrastructure.',
        path: '/hosting',
      },
    }[route];

    document.title = seo.title;
    setMeta('meta[name="description"]', 'name="description"', seo.description);
    setMeta('meta[property="og:title"]', 'property="og:title"', seo.title);
    setMeta('meta[property="og:description"]', 'property="og:description"', seo.description);
    setMeta(
      'meta[property="og:url"]',
      'property="og:url"',
      `${window.location.origin}${seo.path}`
    );

    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', `${window.location.origin}${seo.path}`);
  }, [route]);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -24px 0px' }
    );
    const elements = document.querySelectorAll('[data-reveal]');
    elements.forEach((element) => {
      element.classList.add('will-reveal');
      observer.observe(element);
    });
    return () => {
      observer.disconnect();
      elements.forEach((element) => element.classList.remove('will-reveal'));
    };
  }, [route]);

  useEffect(() => {
    if (route === 'webdev' && window.location.hash === '#pricing') {
      window.setTimeout(() => {
        document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 80);
    }
  }, [route]);

  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Navbar
        onContact={contact}
        currentRoute={route}
        onNavigate={navigate}
        onWebDev={openWebDev}
      />
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
            <FinalCTA
              onContact={contact}
              onLegal={(key) => setDialog({ type: 'legal', key })}
            />
          </>
        )}
      </main>
      <SiteDialog
        dialog={dialog}
        onClose={() => setDialog(null)}
        onContact={contact}
        onNavigate={navigate}
      />
    </>
  );
}
