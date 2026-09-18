import React from 'react';
import { ArrowRight } from 'lucide-react';

export function ApproachTimeline({ onLearnMore }) {
  const steps = [
    {
      id: '01',
      title: 'Scope',
      description: 'Understand the business, systems and assessment boundaries.',
    },
    {
      id: '02',
      title: 'Assess',
      description: 'Identify meaningful risks and weaknesses.',
    },
    {
      id: '03',
      title: 'Prioritize',
      description: 'Separate important issues from unnecessary noise.',
    },
    {
      id: '04',
      title: 'Improve',
      description: 'Provide practical actions to strengthen security.',
    },
  ];

  return (
    <section
      id="approach-timeline"
      style={{
        paddingTop: '70px',
        paddingBottom: '80px',
        backgroundColor: '#ffffff',
        borderBottom: '1px solid var(--border-subtle)',
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
            marginBottom: '56px',
          }}
        >
          <div>
            <p className="eyebrow" style={{ marginBottom: '12px' }}>
              OUR APPROACH
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
              A clear path from risk <br />
              to improvement.
            </h2>
          </div>

          <div style={{ maxWidth: '420px' }}>
            <p style={{ fontSize: '0.88rem', color: '#4b5563', lineHeight: 1.5, marginBottom: '8px' }}>
              We follow a structured, transparent approach to ensure real security improvements for your business.
            </p>
            <button
              onClick={onLearnMore}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '0.84rem',
                fontWeight: 600,
                color: '#111827',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
              }}
            >
              <span>Learn More</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>

        {/* 4 Steps Horizontal Flow */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '24px',
            position: 'relative',
          }}
          className="approach-steps-grid"
        >
          {steps.map((step, idx) => (
            <div
              key={step.id}
              style={{
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {/* Stepper Node Header with Connecting Line */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '18px',
                  position: 'relative',
                }}
              >
                {/* Number Circle Badge */}
                <div
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '50%',
                    backgroundColor: '#111827',
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: '0.86rem',
                    fontFamily: 'var(--font-mono)',
                    flexShrink: 0,
                    zIndex: 2,
                  }}
                >
                  {step.id}
                </div>

                {/* Connecting horizontal line to next node */}
                {idx < steps.length - 1 && (
                  <div
                    style={{
                      flex: 1,
                      height: '1px',
                      backgroundColor: '#cbd5e1',
                      marginLeft: '12px',
                      marginRight: '12px',
                      position: 'relative',
                    }}
                    className="step-connector"
                  >
                    {/* Small chevron arrow on the line */}
                    <div
                      style={{
                        position: 'absolute',
                        right: 0,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        width: '5px',
                        height: '5px',
                        borderTop: '1px solid #94a3b8',
                        borderRight: '1px solid #94a3b8',
                        transformOrigin: 'center',
                        rotate: '45deg',
                      }}
                    />
                  </div>
                )}
              </div>

              {/* Step Title */}
              <h3
                style={{
                  fontSize: '1.05rem',
                  fontWeight: 700,
                  color: '#111827',
                  marginBottom: '8px',
                }}
              >
                {step.title}
              </h3>

              {/* Step Subtext */}
              <p
                style={{
                  fontSize: '0.84rem',
                  color: '#4b5563',
                  lineHeight: 1.5,
                }}
              >
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .step-connector {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
}
