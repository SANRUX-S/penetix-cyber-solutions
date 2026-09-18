import React from 'react';
import { ArrowRight } from 'lucide-react';

export function ResourcesSection({ onSelectResource }) {
  const resources = [
    {
      id: 1,
      title: 'Cybersecurity Basics',
      description: 'Key concepts every business should know.',
      image: '/assets/alpine_landscape.jpg',
    },
    {
      id: 2,
      title: 'Website Security Checklists',
      description: 'A practical checklist for stronger websites.',
      image: '/assets/architecture_glass.jpg',
    },
    {
      id: 3,
      title: 'Email Security Guide',
      description: 'Simple steps for safer communication.',
      image: '/assets/security_keyboard.jpg',
    },
    {
      id: 4,
      title: 'Business Security Checklist',
      description: 'A quick guide to improve your security.',
      image: '/assets/hero_sphere.jpg',
    },
  ];

  return (
    <section
      id="resources"
      style={{
        paddingTop: '80px',
        paddingBottom: '80px',
        backgroundColor: '#fbfbf9',
      }}
    >
      <div className="container">
        {/* Section Header */}
        <div style={{ marginBottom: '40px' }}>
          <p className="eyebrow" style={{ marginBottom: '12px' }}>
            RESOURCES
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
            Learn, stay informed, <br />
            build stronger security.
          </h2>
        </div>

        {/* 4 Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '20px',
          }}
          className="resources-grid-layout"
        >
          {resources.map((item) => (
            <div
              key={item.id}
              onClick={() => onSelectResource && onSelectResource(item)}
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '12px',
                border: '1px solid #eaecf0',
                padding: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                cursor: 'pointer',
                transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.02)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#cbd5e1';
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.06)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#eaecf0';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.02)';
              }}
            >
              {/* Thumbnail Image */}
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  flexShrink: 0,
                  backgroundColor: '#f3f4f6',
                }}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              </div>

              {/* Title & Description */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <h4
                  style={{
                    fontSize: '0.88rem',
                    fontWeight: 700,
                    color: '#111827',
                    marginBottom: '4px',
                    lineHeight: 1.25,
                  }}
                >
                  {item.title}
                </h4>
                <p
                  style={{
                    fontSize: '0.78rem',
                    color: '#4b5563',
                    lineHeight: 1.4,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {item.description}
                  </span>
                  <ArrowRight size={12} style={{ flexShrink: 0 }} />
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (min-width: 1024px) {
          .resources-grid-layout {
            grid-template-columns: repeat(4, 1fr) !important;
          }
        }
      `}</style>
    </section>
  );
}
