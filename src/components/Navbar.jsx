import { useEffect, useRef, useState } from 'react';
import {
  ArrowRight,
  ChevronDown,
  Menu,
  X,
  ShieldCheck,
  Layers3,
  Globe2,
  Server,
  Cloud,
  KeyRound,
  Sparkles,
} from 'lucide-react';
import Logo from './Logo.jsx';

const featuredServices = [
  {
    title: 'Security Assessment',
    description: 'Comprehensive review of posture & weakness detection.',
    icon: ShieldCheck,
  },
  {
    title: 'Vulnerability Assessment',
    description: 'Deep vulnerability identification across web systems & assets.',
    icon: Layers3,
  },
  {
    title: 'Website Security Review',
    description: 'Configuration, authentication, headers, and OWASP defenses.',
    icon: Globe2,
  },
  {
    title: 'Infrastructure Hardening',
    description: 'Server configs, access control, and attack surface reduction.',
    icon: Server,
  },
  {
    title: 'Cloud & Hosting Security',
    description: 'Protection review for cloud environments and server instances.',
    icon: Cloud,
  },
  {
    title: 'Email & Access Security',
    description: 'Phishing defense, MFA enforcement, and zero-trust identity.',
    icon: KeyRound,
  },
];

export default function Navbar({ onContact, currentRoute = 'home', onNavigate, onWebDev }) {
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [active, setActive] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef(null);
  const closeTimerRef = useRef(null);

  // Active section scroll tracking
  useEffect(() => {
    if (currentRoute === 'hosting') {
      setActive('hosting');
      return;
    }
    if (currentRoute === 'webdev') {
      setActive('webdev');
      return;
    }
    let pending = false;
    const update = () => {
      pending = false;
      setScrolled(window.scrollY > 20);
      if (currentRoute === 'hosting') {
        setActive('hosting');
        return;
      }
      if (currentRoute === 'webdev') {
        setActive('webdev');
        return;
      }
      const position = window.scrollY + window.innerHeight * 0.38;
      const sections = ['home', 'services', 'approach', 'resources', 'contact'];
      let current = 'home';
      for (const id of sections) {
        const node = document.getElementById(id);
        if (node && node.offsetTop <= position) current = id;
      }
      setActive(current);
    };
    let frame;
    const scroll = () => {
      if (!pending) {
        pending = true;
        frame = requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener('scroll', scroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', scroll);
      cancelAnimationFrame(frame);
    };
  }, [currentRoute]);

  // Handle escape key and window resize
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setOpen(false);
        setServicesOpen(false);
      }
    };
    const handleResize = () => {
      if (window.innerWidth > 980) {
        setOpen(false);
      }
    };
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setServicesOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('resize', handleResize);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleMouseEnter = () => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    setServicesOpen(true);
  };

  const handleMouseLeave = () => {
    closeTimerRef.current = setTimeout(() => {
      setServicesOpen(false);
    }, 150);
  };

  const contact = (serviceName) => {
    setOpen(false);
    setServicesOpen(false);
    onContact(serviceName);
  };

  const handleHomeClick = (e) => {
    e.preventDefault();
    setOpen(false);
    setServicesOpen(false);
    if (currentRoute !== 'home') {
      if (onNavigate) onNavigate('home', 'home');
      else window.location.href = '/#home';
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      window.history.replaceState(null, '', '#home');
      setActive('home');
    }
  };

  const handleServicesNav = (e) => {
    e.preventDefault();
    setOpen(false);
    setServicesOpen(false);
    if (currentRoute !== 'home') {
      if (onNavigate) onNavigate('home', 'services');
      else window.location.href = '/#services';
    } else {
      const el = document.getElementById('services');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      window.history.replaceState(null, '', '#services');
      setActive('services');
    }
  };

  const handleServiceSelect = (serviceTitle) => {
    setOpen(false);
    setServicesOpen(false);
    if (currentRoute !== 'home') {
      if (onNavigate) onNavigate('home', 'services');
    } else {
      const el = document.getElementById('services');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
    contact(serviceTitle);
  };

  const handleWebDevClick = (e) => {
    e.preventDefault();
    setOpen(false);
    setServicesOpen(false);
    if (onNavigate) {
      onNavigate('webdev');
    } else if (onWebDev) {
      onWebDev();
    } else {
      window.location.href = '/web-development';
    }
  };

  const handleHostingClick = (e) => {
    e.preventDefault();
    setOpen(false);
    setServicesOpen(false);
    if (onNavigate) onNavigate('hosting');
    else window.location.href = '/hosting';
  };

  const handleSectionClick = (e, sectionId) => {
    e.preventDefault();
    setOpen(false);
    setServicesOpen(false);
    if (sectionId === 'contact') {
      if (currentRoute !== 'home') {
        if (onNavigate) onNavigate('home', 'contact');
      } else {
        const el = document.getElementById('contact');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
        window.history.replaceState(null, '', '#contact');
      }
      return;
    }

    if (currentRoute !== 'home') {
      if (onNavigate) onNavigate('home', sectionId);
      else window.location.href = `/#${sectionId}`;
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      window.history.replaceState(null, '', `#${sectionId}`);
      setActive(sectionId);
    }
  };

  return (
    <header className={`navbar${scrolled ? ' is-scrolled' : ''}`}>
      <div className="nav-inner">
        {/* Brand Logo */}
        <Logo onClick={handleHomeClick} />

        {/* Desktop Navigation Links: Home | Services ▾ | Web Development | Hosting | Approach | Resources | Contact Us */}
        <nav
          aria-label="Main navigation"
          className={`nav-links${open ? ' is-open' : ''}`}
          id="main-menu"
        >
          {/* 1. Home */}
          <a
            href="#home"
            aria-current={currentRoute !== 'hosting' && active === 'home' ? 'location' : undefined}
            onClick={handleHomeClick}
          >
            Home
          </a>

          {/* 2. Services ▾ with interactive dropdown */}
          <div
            className="nav-dropdown-wrapper"
            ref={dropdownRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <button
              type="button"
              className={`nav-dropdown-trigger${active === 'services' && currentRoute !== 'hosting' ? ' is-active' : ''}`}
              aria-expanded={servicesOpen}
              aria-haspopup="true"
              onClick={() => setServicesOpen(!servicesOpen)}
            >
              <span onClick={handleServicesNav}>Services</span>
              <ChevronDown size={13} className="nav-chevron" aria-hidden="true" />
            </button>

            {/* Floating Glassmorphic Dropdown (Sleek Vertical Downward List) */}
            {servicesOpen && (
              <div className="nav-dropdown-menu" role="menu">
                <div className="nav-dropdown-header">
                  <span className="nav-dropdown-label">Security Services</span>
                </div>
                <div className="nav-dropdown-list">
                  {featuredServices.map(({ title, description, icon: Icon }) => (
                    <button
                      key={title}
                      type="button"
                      className="nav-dropdown-item"
                      role="menuitem"
                      onClick={() => handleServiceSelect(title)}
                    >
                      <span className="nav-dropdown-item-icon">
                        <Icon size={15} strokeWidth={1.75} />
                      </span>
                      <span className="nav-dropdown-item-text">
                        <strong>{title}</strong>
                        <p>{description}</p>
                      </span>
                      <ArrowRight size={13} className="nav-item-arrow" />
                    </button>
                  ))}
                </div>
                <div className="nav-dropdown-footer">
                  <button
                    type="button"
                    className="nav-dropdown-all-btn"
                    onClick={handleServicesNav}
                  >
                    <span>View all 12 services</span>
                    <ArrowRight size={13} />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Mobile expandable accordion for Services */}
          <div className="mobile-services-section">
            <button
              type="button"
              className="mobile-services-toggle"
              onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
            >
              <span>Services</span>
              <ChevronDown
                size={16}
                style={{
                  transform: mobileServicesOpen ? 'rotate(180deg)' : 'none',
                  transition: 'transform 0.2s ease',
                }}
              />
            </button>
            {mobileServicesOpen && (
              <div className="mobile-services-sublist">
                {featuredServices.map(({ title, icon: Icon }) => (
                  <button
                    key={title}
                    type="button"
                    className="mobile-service-subitem"
                    onClick={() => handleServiceSelect(title)}
                  >
                    <Icon size={15} />
                    <span>{title}</span>
                  </button>
                ))}
                <button
                  type="button"
                  className="mobile-service-subitem view-all"
                  onClick={handleServicesNav}
                >
                  <ArrowRight size={14} />
                  <span>View All 12 Services →</span>
                </button>
              </div>
            )}
          </div>

          {/* 3. Web Development */}
          <a
            href="#/web-development"
            className={`nav-link-webdev${currentRoute === 'webdev' || active === 'webdev' ? ' is-active' : ''}`}
            aria-current={currentRoute === 'webdev' ? 'location' : undefined}
            onClick={handleWebDevClick}
          >
            Web Development
          </a>

          {/* 4. Hosting */}
          <a
            href="#/hosting"
            aria-current={currentRoute === 'hosting' ? 'location' : undefined}
            onClick={handleHostingClick}
          >
            Hosting
          </a>

          {/* 5. Approach */}
          <a
            href="#approach"
            aria-current={currentRoute !== 'hosting' && active === 'approach' ? 'location' : undefined}
            onClick={(e) => handleSectionClick(e, 'approach')}
          >
            Approach
          </a>

          {/* 6. Resources */}
          <a
            href="#resources"
            aria-current={currentRoute !== 'hosting' && active === 'resources' ? 'location' : undefined}
            onClick={(e) => handleSectionClick(e, 'resources')}
          >
            Resources
          </a>

          {/* 7. Contact Us */}
          <a
            href="#contact"
            aria-current={currentRoute !== 'hosting' && active === 'contact' ? 'location' : undefined}
            onClick={(e) => handleSectionClick(e, 'contact')}
          >
            Contact Us
          </a>

          {/* Mobile Assessment Button */}
          <button
            className="mobile-assessment"
            onClick={() => contact()}
          >
            Start an Assessment <ArrowRight size={15} />
          </button>
        </nav>

        {/* Right Action: [Start an Assessment →] */}
        <div className="nav-actions">
          <button className="nav-cta" onClick={() => contact()}>
            Start an Assessment <ArrowRight size={14} />
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="main-menu"
          aria-label={open ? 'Close navigation' : 'Open navigation'}
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
    </header>
  );
}

