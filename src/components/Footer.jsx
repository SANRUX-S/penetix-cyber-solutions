import React from 'react';
import { PenetixLogo } from './BrandLogo';

export function Footer() {
  const currentYear = 2026;

  const footerLinks = {
    company: [
      { label: 'About', href: '#company' },
      { label: 'Our Approach', href: '#approach' },
      { label: 'Careers', href: '#careers' },
      { label: 'Contact', href: '#contact' },
    ],
    services: [
      { label: 'Security Assessment', href: '#services' },
      { label: 'Vulnerability Assessment', href: '#services' },
      { label: 'Infrastructure Hardening', href: '#services' },
      { label: 'Email Security', href: '#services' },
      { label: 'Security Awareness', href: '#services' },
    ],
    resources: [
      { label: 'Articles', href: '#resources' },
      { label: 'Guides', href: '#resources' },
      { label: 'Checklists', href: '#resources' },
      { label: 'Updates', href: '#resources' },
    ],
    legal: [
      { label: 'Privacy Policy', href: '#privacy' },
      { label: 'Terms of Service', href: '#terms' },
    ],
  };

  return (
    <footer
      style={{
        backgroundColor: '#ffffff',
        borderTop: '1px solid var(--border-subtle)',
        paddingTop: '60px',
        paddingBottom: '36px',
        color: '#111827',
      }}
    >
      <div className="container">
        {/* Main Columns */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
            gap: '36px',
            marginBottom: '60px',
          }}
          className="footer-grid-layout"
        >
          {/* Col 1: Brand & Logo */}
          <div style={{ minWidth: '180px' }}>
            <PenetixLogo variant="dark" size="md" />
          </div>

          {/* Col 2: Company */}
          <div>
            <h5
              style={{
                fontSize: '0.8rem',
                fontWeight: 700,
                color: '#111827',
                marginBottom: '16px',
              }}
            >
              Company
            </h5>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {footerLinks.company.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    style={{
                      fontSize: '0.78rem',
                      color: '#4b5563',
                      transition: 'color var(--transition-fast)',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#111827')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = '#4b5563')}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Services */}
          <div>
            <h5
              style={{
                fontSize: '0.8rem',
                fontWeight: 700,
                color: '#111827',
                marginBottom: '16px',
              }}
            >
              Services
            </h5>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {footerLinks.services.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    style={{
                      fontSize: '0.78rem',
                      color: '#4b5563',
                      transition: 'color var(--transition-fast)',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#111827')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = '#4b5563')}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Resources */}
          <div>
            <h5
              style={{
                fontSize: '0.8rem',
                fontWeight: 700,
                color: '#111827',
                marginBottom: '16px',
              }}
            >
              Resources
            </h5>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {footerLinks.resources.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    style={{
                      fontSize: '0.78rem',
                      color: '#4b5563',
                      transition: 'color var(--transition-fast)',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#111827')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = '#4b5563')}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 5: Legal */}
          <div>
            <h5
              style={{
                fontSize: '0.8rem',
                fontWeight: 700,
                color: '#111827',
                marginBottom: '16px',
              }}
            >
              Legal
            </h5>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {footerLinks.legal.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    style={{
                      fontSize: '0.78rem',
                      color: '#4b5563',
                      transition: 'color var(--transition-fast)',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#111827')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = '#4b5563')}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 6: Follow Us (LinkedIn & X icons) */}
          <div>
            <h5
              style={{
                fontSize: '0.8rem',
                fontWeight: 700,
                color: '#111827',
                marginBottom: '16px',
              }}
            >
              Follow Us
            </h5>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              {/* LinkedIn Icon */}
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                aria-label="PENETIX on LinkedIn"
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '6px',
                  backgroundColor: '#f3f4f6',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#111827',
                  transition: 'all var(--transition-fast)',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#e5e7eb')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#f3f4f6')}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>

              {/* X / Twitter Icon */}
              <a
                href="https://x.com"
                target="_blank"
                rel="noreferrer"
                aria-label="PENETIX on X"
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '6px',
                  backgroundColor: '#f3f4f6',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#111827',
                  transition: 'all var(--transition-fast)',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#e5e7eb')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#f3f4f6')}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Line */}
        <div
          style={{
            paddingTop: '28px',
            borderTop: '1px solid var(--border-subtle)',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
          }}
        >
          <p style={{ fontSize: '0.74rem', color: '#6b7280' }}>
            © {currentYear} PENETIX. All rights reserved.
          </p>

          <div
            style={{
              fontSize: '0.62rem',
              fontWeight: 700,
              letterSpacing: '0.14em',
              color: '#9ca3af',
              textTransform: 'uppercase',
              textAlign: 'right',
            }}
          >
            <div style={{ width: '28px', height: '1px', backgroundColor: '#9ca3af', marginLeft: 'auto', marginBottom: '4px' }} />
            A SAFER TOMORROW<br />TOGETHER.
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 1024px) {
          .footer-grid-layout {
            grid-template-columns: 1.8fr 1fr 1.2fr 1fr 1fr 1fr !important;
          }
        }
      `}</style>
    </footer>
  );
}
