import React, { useState, useEffect } from 'react';
import { PenetixLogo } from './BrandLogo';
import { ArrowRight, Menu, X } from 'lucide-react';

export function Navbar({ onOpenAssessment }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Services', href: '#services' },
    { label: 'Approach', href: '#approach' },
    { label: 'Company', href: '#company' },
    { label: 'Resources', href: '#resources' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        backgroundColor: isScrolled ? 'rgba(251, 251, 249, 0.92)' : 'transparent',
        backdropFilter: isScrolled ? 'blur(16px)' : 'none',
        WebkitBackdropFilter: isScrolled ? 'blur(16px)' : 'none',
        borderBottom: isScrolled ? '1px solid rgba(0, 0, 0, 0.06)' : '1px solid transparent',
        transition: 'all 0.3s ease',
        padding: '16px 0',
      }}
    >
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Brand Logo */}
        <a href="#home" style={{ display: 'flex', alignItems: 'center' }}>
          <PenetixLogo variant="dark" />
        </a>

        {/* Desktop Navigation Links */}
        <nav
          style={{
            display: 'none',
            alignItems: 'center',
            gap: '32px',
          }}
          className="desktop-nav"
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              style={{
                fontSize: '0.86rem',
                fontWeight: link.label === 'Home' ? '600' : '400',
                color: link.label === 'Home' ? '#111827' : '#4b5563',
                transition: 'color var(--transition-fast)',
                position: 'relative',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#111827')}
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = link.label === 'Home' ? '#111827' : '#4b5563')
              }
            >
              {link.label}
              {link.label === 'Home' && (
                <span
                  style={{
                    position: 'absolute',
                    bottom: '-6px',
                    left: 0,
                    right: 0,
                    height: '2px',
                    backgroundColor: '#111827',
                    borderRadius: '1px',
                  }}
                />
              )}
            </a>
          ))}
        </nav>

        {/* Right Actions: Status Badge & Assessment Button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          {/* Status Badge */}
          <div
            className="status-pill status-pill-desktop"
            style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            <div className="status-dot-pulse" />
            <span style={{ fontSize: '0.75rem', fontWeight: 500, color: '#374151' }}>
              Available for Security Assessments
            </span>
          </div>

          {/* CTA Button */}
          <button
            onClick={onOpenAssessment}
            className="btn-primary"
            style={{
              padding: '9px 18px',
              fontSize: '0.82rem',
              fontWeight: 500,
            }}
          >
            <span>Start an Assessment</span>
            <ArrowRight size={14} />
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="mobile-toggle-btn"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              display: 'none',
              padding: '6px',
              color: '#111827',
            }}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            backgroundColor: '#ffffff',
            borderBottom: '1px solid var(--border-subtle)',
            padding: '24px 28px',
            boxShadow: '0 12px 24px rgba(0, 0, 0, 0.08)',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              style={{
                fontSize: '1rem',
                fontWeight: 500,
                color: '#111827',
                padding: '8px 0',
                borderBottom: '1px solid #f3f4f6',
              }}
            >
              {link.label}
            </a>
          ))}
          <div style={{ paddingTop: '8px' }}>
            <div className="status-pill" style={{ marginBottom: '16px' }}>
              <div className="status-dot-pulse" />
              <span>Available for Security Assessments</span>
            </div>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAssessment();
              }}
              className="btn-primary"
              style={{ width: '100%', justifyContent: 'center' }}
            >
              <span>Start an Assessment</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      )}

      <style>{`
        @media (min-width: 900px) {
          .desktop-nav {
            display: flex !important;
          }
          .mobile-toggle-btn {
            display: none !important;
          }
        }
        @media (max-width: 899px) {
          .status-pill-desktop {
            display: none !important;
          }
          .mobile-toggle-btn {
            display: block !important;
          }
        }
      `}</style>
    </header>
  );
}
