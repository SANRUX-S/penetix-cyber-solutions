import React, { useState } from 'react';
import {
  ShieldCheck,
  Layers,
  Server,
  UserCheck,
  Network,
  TrendingUp,
  ArrowRight,
  ArrowUpRight,
} from 'lucide-react';

export function ServicesGrid({ onSelectService }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const services = [
    {
      id: '01',
      title: 'Security Assessment',
      icon: ShieldCheck,
      description: 'Review your current security posture and identify important weaknesses.',
      category: 'Assessment',
    },
    {
      id: '02',
      title: 'Vulnerability Assessment',
      icon: Layers,
      description: 'Identify and prioritize security issues across authorized websites and systems.',
      category: 'Analysis',
    },
    {
      id: '03',
      title: 'Website & Infrastructure Hardening',
      icon: Server,
      description: 'Improve configurations, access controls and essential security protections.',
      category: 'Hardening',
    },
    {
      id: '04',
      title: 'Email & Account Security',
      icon: UserCheck,
      description: 'Strengthen authentication, email security and account protection.',
      category: 'Protection',
    },
    {
      id: '05',
      title: 'Security Health Check',
      icon: Network,
      description: 'A practical review covering accounts, backups, exposure and key business risks.',
      category: 'Audit',
    },
    {
      id: '06',
      title: 'Security Awareness',
      icon: TrendingUp,
      description: 'Help teams recognize phishing, account risks and common digital threats.',
      category: 'Training',
    },
  ];

  return (
    <section
      id="services"
      style={{
        paddingTop: '60px',
        paddingBottom: '80px',
        backgroundColor: '#fcfcfb',
      }}
    >
      <div className="container">
        {/* Section Header */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            gap: '24px',
            marginBottom: '48px',
          }}
        >
          <div>
            <p className="eyebrow" style={{ marginBottom: '12px' }}>
              WHAT WE DO
            </p>
            <h2
              style={{
                fontSize: 'clamp(2rem, 3.2vw, 2.6rem)',
                fontWeight: 800,
                letterSpacing: '-0.02em',
                color: '#111827',
                lineHeight: 1.15,
              }}
            >
              Practical cybersecurity for real businesses.
            </h2>
          </div>

          <div style={{ maxWidth: '420px', textAlign: 'left' }}>
            <p style={{ fontSize: '0.88rem', color: '#4b5563', lineHeight: 1.5, marginBottom: '8px' }}>
              Focused services designed to identify risk, improve security, and give businesses a clear path forward.
            </p>
            <a
              href="#services"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '0.84rem',
                fontWeight: 600,
                color: '#111827',
                transition: 'gap var(--transition-fast)',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.gap = '9px')}
              onMouseLeave={(e) => (e.currentTarget.style.gap = '6px')}
            >
              <span>View All Services</span>
              <ArrowRight size={14} />
            </a>
          </div>
        </div>

        {/* 6 Services Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '20px',
          }}
          className="services-grid-wrapper"
        >
          {services.map((service, index) => {
            const Icon = service.icon;
            const isHovered = hoveredIndex === index;

            return (
              <div
                key={service.id}
                onClick={() => onSelectService && onSelectService(service)}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                style={{
                  backgroundColor: '#ffffff',
                  border: isHovered ? '1px solid #cbd5e1' : '1px solid #e5e7eb',
                  borderRadius: '12px',
                  padding: '28px 24px',
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  minHeight: '210px',
                  cursor: 'pointer',
                  transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                  transform: isHovered ? 'translateY(-3px)' : 'translateY(0)',
                  boxShadow: isHovered
                    ? '0 12px 28px -4px rgba(0, 0, 0, 0.07)'
                    : '0 1px 3px rgba(0, 0, 0, 0.02)',
                }}
              >
                {/* Top Row: Numeric ID and Line Icon */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    marginBottom: '20px',
                  }}
                >
                  <span
                    style={{
                      fontSize: '1.25rem',
                      fontWeight: 800,
                      fontFamily: 'var(--font-mono)',
                      color: isHovered ? '#111827' : '#374151',
                      letterSpacing: '-0.02em',
                    }}
                  >
                    {service.id}
                  </span>

                  <div
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '8px',
                      backgroundColor: isHovered ? '#f3f4f6' : 'transparent',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: isHovered ? '#0b382c' : '#4b5563',
                      transition: 'all var(--transition-fast)',
                    }}
                  >
                    <Icon size={22} strokeWidth={1.75} />
                  </div>
                </div>

                {/* Middle: Title and Description */}
                <div>
                  <h3
                    style={{
                      fontSize: '1.05rem',
                      fontWeight: 700,
                      color: '#111827',
                      marginBottom: '10px',
                      lineHeight: 1.25,
                    }}
                  >
                    {service.title}
                  </h3>

                  <p
                    style={{
                      fontSize: '0.84rem',
                      color: '#4b5563',
                      lineHeight: 1.5,
                      marginBottom: '16px',
                    }}
                  >
                    {service.description}
                  </p>
                </div>

                {/* Bottom Row: Hover Arrow Link */}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    paddingTop: '8px',
                  }}
                >
                  <div
                    style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      backgroundColor: isHovered ? '#111827' : 'transparent',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: isHovered ? '#ffffff' : '#9ca3af',
                      transition: 'all 0.2s ease',
                      transform: isHovered ? 'translateX(2px)' : 'none',
                    }}
                  >
                    <ArrowRight size={15} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        @media (min-width: 900px) {
          .services-grid-wrapper {
            grid-template-columns: repeat(3, 1fr) !important;
          }
        }
      `}</style>
    </section>
  );
}
