import React from 'react';
import { ArrowRight, Play, Check, Users, Lock } from 'lucide-react';

export function Hero({ onOpenAssessment, onWatchStory }) {
  return (
    <section
      id="home"
      style={{
        position: 'relative',
        paddingTop: '40px',
        paddingBottom: '80px',
        overflow: 'hidden',
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '48px',
            alignItems: 'center',
          }}
          className="hero-grid"
        >
          {/* Left Column: Copy & Actions */}
          <div style={{ maxWidth: '580px' }}>
            {/* Eyebrow */}
            <p className="eyebrow" style={{ marginBottom: '20px', color: '#6b7280' }}>
              CYBERSECURITY FOR MODERN BUSINESSES
            </p>

            {/* Main Headline */}
            <h1
              style={{
                fontFamily: 'var(--font-primary)',
                fontSize: 'clamp(2.6rem, 4.5vw, 3.8rem)',
                fontWeight: '800',
                lineHeight: 1.08,
                letterSpacing: '-0.03em',
                color: '#111827',
                marginBottom: '24px',
              }}
            >
              Security without <br />
              the noise. <br />
              <span style={{ color: '#111827' }}>Clarity. Protection. </span>
              <span style={{ color: '#0d5c3a' }}>Confidence.</span>
            </h1>

            {/* Subtitle Description */}
            <p
              style={{
                fontSize: '1.02rem',
                lineHeight: 1.6,
                color: '#4b5563',
                marginBottom: '36px',
                fontWeight: 400,
              }}
            >
              Practical cybersecurity assessments, hardening and risk reduction for growing businesses.
              <br />
              Understand your exposure. Fix what matters. Build stronger security.
            </p>

            {/* Action Buttons */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                gap: '16px',
                marginBottom: '48px',
              }}
            >
              <button
                onClick={onOpenAssessment}
                className="btn-primary btn-green"
                style={{
                  padding: '13px 26px',
                  fontSize: '0.92rem',
                  fontWeight: 600,
                }}
              >
                <span>Start a Security Review</span>
                <ArrowRight size={16} />
              </button>

              <button
                onClick={onWatchStory}
                className="btn-outline"
                style={{
                  padding: '12px 24px',
                  fontSize: '0.92rem',
                  fontWeight: 500,
                }}
              >
                <div
                  style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    backgroundColor: '#111827',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#ffffff',
                    marginRight: '2px',
                  }}
                >
                  <Play size={10} fill="#ffffff" style={{ marginLeft: '1px' }} />
                </div>
                <span>Watch Our Story</span>
              </button>
            </div>

            {/* Trust Indicators Row */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                gap: '28px',
                paddingTop: '16px',
                borderTop: '1px solid var(--border-subtle)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div
                  style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    border: '1.5px solid #10b981',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#10b981',
                  }}
                >
                  <Check size={12} strokeWidth={3} />
                </div>
                <span style={{ fontSize: '0.86rem', fontWeight: 600, color: '#374151' }}>
                  Clear Reporting
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Users size={18} color="#4b5563" />
                <span style={{ fontSize: '0.86rem', fontWeight: 600, color: '#374151' }}>
                  Business Focused
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Lock size={17} color="#4b5563" />
                <span style={{ fontSize: '0.86rem', fontWeight: 600, color: '#374151' }}>
                  Confidential by Design
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: High-Fidelity 3D Metallic Sphere with Alpine Panorama & Metadata */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              minHeight: '440px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/* Main Visual Card Container */}
            <div
              style={{
                position: 'relative',
                width: '100%',
                maxWidth: '560px',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)',
                border: '1px solid rgba(0, 0, 0, 0.08)',
                backgroundColor: '#e5e7eb',
              }}
            >
              {/* Image Asset */}
              <img
                src="/assets/hero_sphere.jpg"
                alt="PENETIX 3D Security Core and Alpine Architecture"
                style={{
                  width: '100%',
                  height: 'auto',
                  display: 'block',
                  objectFit: 'cover',
                  transform: 'scale(1.01)',
                  transition: 'transform 0.6s ease',
                }}
              />

              {/* Top Left Metadata Badge */}
              <div
                style={{
                  position: 'absolute',
                  top: '24px',
                  left: '24px',
                  backgroundColor: 'rgba(255, 255, 255, 0.85)',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  padding: '8px 14px',
                  borderRadius: '6px',
                  border: '1px solid rgba(255, 255, 255, 0.4)',
                }}
              >
                <div style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.12em', color: '#111827' }}>
                  PENETIX
                </div>
                <div
                  style={{
                    fontSize: '0.58rem',
                    fontWeight: 600,
                    letterSpacing: '0.14em',
                    color: '#4b5563',
                    marginTop: '2px',
                    fontFamily: 'var(--font-mono)',
                  }}
                >
                  SECURITY SYSTEM 001
                </div>
                <div
                  style={{
                    height: '1px',
                    backgroundColor: '#111827',
                    width: '32px',
                    marginTop: '4px',
                  }}
                />
              </div>

              {/* Bottom Right Floating Minimalist Architecture Caption */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '20px',
                  right: '20px',
                  textAlign: 'right',
                  color: 'rgba(255, 255, 255, 0.95)',
                  textShadow: '0 1px 4px rgba(0, 0, 0, 0.6)',
                }}
              >
                <div
                  style={{
                    fontSize: '0.62rem',
                    fontWeight: 700,
                    letterSpacing: '0.16em',
                    lineHeight: 1.4,
                  }}
                >
                  ASSESS<br />
                  HARDEN<br />
                  PROTECT<br />
                  IMPROVE
                </div>
                <div
                  style={{
                    fontSize: '1.4rem',
                    fontWeight: 800,
                    fontFamily: 'var(--font-mono)',
                    lineHeight: 1,
                    marginTop: '4px',
                    color: '#ffffff',
                  }}
                >
                  01
                </div>
                <div
                  style={{
                    fontSize: '0.55rem',
                    letterSpacing: '0.15em',
                    marginTop: '4px',
                    maxWidth: '160px',
                    fontWeight: 600,
                  }}
                >
                  A SAFER DIGITAL WORLD BUILDS BRIGHTER TOMORROWS.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 960px) {
          .hero-grid {
            grid-template-columns: 1.15fr 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
