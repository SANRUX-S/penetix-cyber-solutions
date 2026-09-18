import React from 'react';
import { ArrowRight } from 'lucide-react';

export function PreFooterCta({ onOpenAssessment, onContact }) {
  return (
    <section
      id="contact"
      style={{
        backgroundColor: '#0c1117',
        color: '#ffffff',
        padding: '50px 0',
        position: 'relative',
        overflow: 'hidden',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
      }}
    >
      {/* Subtle mountain backdrop overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'url(/assets/alpine_landscape.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.12,
          filter: 'grayscale(100%)',
          pointerEvents: 'none',
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '32px',
          }}
        >
          {/* Left: Call to action copy */}
          <div style={{ maxWidth: '460px' }}>
            <h3
              style={{
                fontSize: '0.96rem',
                fontWeight: 800,
                letterSpacing: '0.08em',
                color: '#ffffff',
                textTransform: 'uppercase',
                marginBottom: '6px',
              }}
            >
              KNOW YOUR RISK. STRENGTHEN WHAT MATTERS.
            </h3>
            <p style={{ fontSize: '0.84rem', color: '#94a3b8' }}>
              Start with a practical security review and a clear plan forward.
            </p>
          </div>

          {/* Center: Action Buttons */}
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '14px' }}>
            <button
              onClick={onOpenAssessment}
              className="btn-primary btn-green"
              style={{
                padding: '11px 22px',
                fontSize: '0.86rem',
                fontWeight: 600,
              }}
            >
              <span>Start a Security Review</span>
              <ArrowRight size={15} />
            </button>

            <button
              onClick={onContact}
              className="btn-outline btn-dark-outline"
              style={{
                padding: '10px 20px',
                fontSize: '0.86rem',
                fontWeight: 500,
              }}
            >
              <span>Contact PENETIX</span>
              <ArrowRight size={14} />
            </button>
          </div>

          {/* Right: Tagline */}
          <div
            style={{
              fontSize: '0.66rem',
              fontWeight: 700,
              letterSpacing: '0.14em',
              color: '#64748b',
              textTransform: 'uppercase',
            }}
          >
            A SAFER TOMORROW TOGETHER.
          </div>
        </div>
      </div>
    </section>
  );
}
