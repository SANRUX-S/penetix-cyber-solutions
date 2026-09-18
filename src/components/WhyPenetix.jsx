import React from 'react';
import { MessageSquare, Hexagon, Lock, BarChart3 } from 'lucide-react';

export function WhyPenetix() {
  const pillars = [
    {
      title: 'Clear Communication',
      description: 'Straightforward insights, without jargon.',
      icon: MessageSquare,
    },
    {
      title: 'Practical Recommendations',
      description: 'Actions you can implement, not just theory.',
      icon: Hexagon,
    },
    {
      title: 'Confidential Handling',
      description: 'Your information stays private and secure.',
      icon: Lock,
    },
    {
      title: 'Business-Focused Security',
      description: 'Solutions that support your real goals.',
      icon: BarChart3,
    },
  ];

  return (
    <section
      id="company"
      style={{
        paddingTop: '80px',
        paddingBottom: '80px',
        backgroundColor: '#ffffff',
        borderTop: '1px solid var(--border-subtle)',
        borderBottom: '1px solid var(--border-subtle)',
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '56px',
            alignItems: 'center',
          }}
          className="why-grid-layout"
        >
          {/* Left Column: Heading & Mission */}
          <div style={{ maxWidth: '440px' }}>
            <p className="eyebrow" style={{ marginBottom: '14px' }}>
              WHY PENETIX
            </p>
            <h2
              style={{
                fontSize: 'clamp(2.1rem, 3.4vw, 2.7rem)',
                fontWeight: 800,
                letterSpacing: '-0.02em',
                color: '#111827',
                lineHeight: 1.15,
                marginBottom: '18px',
              }}
            >
              Security built around <br />
              clarity, not fear.
            </h2>
            <p
              style={{
                fontSize: '0.96rem',
                color: '#4b5563',
                lineHeight: 1.6,
              }}
            >
              We focus on practical improvements that help businesses reduce risk without unnecessary complexity.
            </p>
          </div>

          {/* Right Column: 2x2 Grid of Value Pillars */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '36px 32px',
            }}
          >
            {pillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.title}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                  }}
                >
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '8px',
                      backgroundColor: '#f3f4f6',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#111827',
                    }}
                  >
                    <Icon size={20} strokeWidth={1.8} />
                  </div>

                  <div>
                    <h3
                      style={{
                        fontSize: '1rem',
                        fontWeight: 700,
                        color: '#111827',
                        marginBottom: '6px',
                        lineHeight: 1.25,
                      }}
                    >
                      {pillar.title}
                    </h3>
                    <p
                      style={{
                        fontSize: '0.86rem',
                        color: '#4b5563',
                        lineHeight: 1.5,
                      }}
                    >
                      {pillar.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 960px) {
          .why-grid-layout {
            grid-template-columns: 1fr 1.3fr !important;
          }
        }
      `}</style>
    </section>
  );
}
