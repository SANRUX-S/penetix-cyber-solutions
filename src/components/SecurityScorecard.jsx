import React from 'react';
import { Check, ArrowRight } from 'lucide-react';

export function SecurityScorecard({ onViewSampleReport }) {
  // SVG circular gauge calculation for 82/100
  const radius = 46;
  const circumference = 2 * Math.PI * radius;
  const score = 82;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  const severityItems = [
    { label: 'Critical', count: 0, color: '#ef4444' },
    { label: 'High', count: 2, color: '#f97316' },
    { label: 'Medium', count: 4, color: '#eab308' },
    { label: 'Low', count: 6, color: '#10b981' },
  ];

  return (
    <section
      id="scorecard"
      style={{
        paddingTop: '80px',
        paddingBottom: '80px',
        backgroundColor: '#fbfbf9',
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '32px',
            alignItems: 'stretch',
          }}
          className="scorecard-grid-layout"
        >
          {/* Left Column: Value Copy & Checklist */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              paddingRight: '12px',
            }}
          >
            <p className="eyebrow" style={{ marginBottom: '14px' }}>
              SEE THE DIFFERENCE
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
              See your security <br />
              more clearly.
            </h2>
            <p
              style={{
                fontSize: '0.94rem',
                color: '#4b5563',
                lineHeight: 1.6,
                marginBottom: '32px',
              }}
            >
              Cybersecurity shouldn't feel confusing. PENETIX turns technical findings into clear priorities and practical actions.
            </p>

            {/* Checklist */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {[
                'Identify what matters',
                'Understand the risk',
                'Know what to fix next',
              ].map((item) => (
                <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div
                    style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(16, 185, 129, 0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#0d5c3a',
                      flexShrink: 0,
                    }}
                  >
                    <Check size={14} strokeWidth={3} />
                  </div>
                  <span style={{ fontSize: '0.92rem', fontWeight: 600, color: '#1f2937' }}>
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Center Column: Dark Glass Sample Security Review Card */}
          <div
            className="glass-panel-dark"
            style={{
              borderRadius: '16px',
              padding: '32px 28px',
              backgroundColor: '#111822',
              color: '#ffffff',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.25)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
            }}
          >
            <div>
              {/* Header */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '28px',
                }}
              >
                <span
                  style={{
                    fontSize: '0.74rem',
                    fontWeight: 700,
                    letterSpacing: '0.12em',
                    color: '#94a3b8',
                    textTransform: 'uppercase',
                  }}
                >
                  SAMPLE SECURITY REVIEW
                </span>
                <ArrowRight size={14} color="#94a3b8" />
              </div>

              {/* Gauge & Metrics Row */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1.1fr 1.1fr 0.9fr',
                  gap: '16px',
                  alignItems: 'center',
                  marginBottom: '24px',
                }}
                className="gauge-row-layout"
              >
                {/* Security Posture Label */}
                <div>
                  <div style={{ fontSize: '0.78rem', color: '#94a3b8', marginBottom: '6px' }}>
                    Security Posture
                  </div>
                  <div
                    style={{
                      fontSize: '1.45rem',
                      fontWeight: 700,
                      color: '#ffffff',
                      lineHeight: 1.1,
                    }}
                  >
                    Moderate
                  </div>
                </div>

                {/* Circular Gauge */}
                <div
                  style={{
                    position: 'relative',
                    width: '110px',
                    height: '110px',
                    margin: '0 auto',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <svg width="110" height="110" viewBox="0 0 110 110" style={{ transform: 'rotate(-90deg)' }}>
                    <defs>
                      <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#34d399" />
                        <stop offset="100%" stopColor="#059669" />
                      </linearGradient>
                    </defs>
                    {/* Background Track */}
                    <circle
                      cx="55"
                      cy="55"
                      r={radius}
                      stroke="rgba(255, 255, 255, 0.1)"
                      strokeWidth="8"
                      fill="none"
                    />
                    {/* Progress Fill */}
                    <circle
                      cx="55"
                      cy="55"
                      r={radius}
                      stroke="url(#gaugeGradient)"
                      strokeWidth="8"
                      strokeDasharray={circumference}
                      strokeDashoffset={strokeDashoffset}
                      strokeLinecap="round"
                      fill="none"
                      style={{ transition: 'stroke-dashoffset 1s ease' }}
                    />
                  </svg>

                  {/* Center Score Text */}
                  <div
                    style={{
                      position: 'absolute',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <span
                      style={{
                        fontSize: '1.45rem',
                        fontWeight: 800,
                        fontFamily: 'var(--font-mono)',
                        lineHeight: 1,
                        color: '#ffffff',
                      }}
                    >
                      {score}
                    </span>
                    <span style={{ fontSize: '0.66rem', color: '#94a3b8', marginTop: '2px' }}>
                      /100
                    </span>
                  </div>
                </div>

                {/* Severity Breakdown */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {severityItems.map((item) => (
                    <div
                      key={item.label}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        fontSize: '0.78rem',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span
                          style={{
                            width: '6px',
                            height: '6px',
                            borderRadius: '50%',
                            backgroundColor: item.color,
                          }}
                        />
                        <span style={{ color: '#cbd5e1' }}>{item.label}</span>
                      </div>
                      <span
                        style={{
                          fontWeight: 700,
                          fontFamily: 'var(--font-mono)',
                          color: '#ffffff',
                        }}
                      >
                        {item.count}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Status Note */}
              <p style={{ fontSize: '0.82rem', color: '#94a3b8', lineHeight: 1.4, marginBottom: '20px' }}>
                Good foundation, with key areas to improve.
              </p>
            </div>

            {/* Bottom Actions */}
            <div>
              <p
                style={{
                  fontSize: '0.64rem',
                  color: '#64748b',
                  marginBottom: '16px',
                  fontStyle: 'italic',
                }}
              >
                Example assessment summary. Not a real customer result.
              </p>

              <button
                onClick={onViewSampleReport}
                className="btn-outline"
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  backgroundColor: '#ffffff',
                  color: '#111827',
                  fontWeight: 600,
                  fontSize: '0.84rem',
                  border: 'none',
                }}
              >
                <span>View a Sample Report</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>

          {/* Right Column: Architectural Image Showcase */}
          <div
            style={{
              position: 'relative',
              borderRadius: '16px',
              overflow: 'hidden',
              minHeight: '340px',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)',
            }}
          >
            <img
              src="/assets/architecture_glass.jpg"
              alt="Modern Corporate Security Center Architecture"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
              }}
            />

            {/* Subtle Gradient Overlay */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.1) 40%, rgba(0, 0, 0, 0.7) 100%)',
              }}
            />

            {/* Top Left Floating Text */}
            <div
              style={{
                position: 'absolute',
                top: '24px',
                left: '24px',
                color: '#ffffff',
                textShadow: '0 1px 3px rgba(0, 0, 0, 0.7)',
              }}
            >
              <div
                style={{
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  letterSpacing: '0.18em',
                  lineHeight: 1.5,
                }}
              >
                PEOPLE<br />
                IDEAS<br />
                SECURITY<br />
                PROGRESS
              </div>
            </div>

            {/* Bottom Right Floating Badge */}
            <div
              style={{
                position: 'absolute',
                bottom: '24px',
                right: '24px',
                color: '#ffffff',
                textAlign: 'right',
                maxWidth: '180px',
              }}
            >
              <div
                style={{
                  fontSize: '0.74rem',
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  lineHeight: 1.3,
                  textShadow: '0 1px 4px rgba(0, 0, 0, 0.8)',
                }}
              >
                BUILT FOR A SAFER DIGITAL TOMORROW.
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 1024px) {
          .scorecard-grid-layout {
            grid-template-columns: 1fr 1.2fr 1fr !important;
          }
        }
        @media (max-width: 480px) {
          .gauge-row-layout {
            grid-template-columns: 1fr !important;
            text-align: center;
          }
        }
      `}</style>
    </section>
  );
}
