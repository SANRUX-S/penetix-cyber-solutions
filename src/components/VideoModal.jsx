import React from 'react';
import { X, ShieldCheck, Play } from 'lucide-react';
import { PenetixLogo } from './BrandLogo';

export function VideoModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: '#0c1117',
          color: '#ffffff',
          borderRadius: '16px',
          width: '100%',
          maxWidth: '640px',
          overflow: 'hidden',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '18px 24px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <PenetixLogo variant="light" size="sm" showTagline={false} />
          <button
            onClick={onClose}
            aria-label="Close video player"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#94a3b8',
              padding: '4px',
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Video simulation viewport */}
        <div
          style={{
            position: 'relative',
            aspectRatio: '16/9',
            backgroundColor: '#000000',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          <img
            src="/assets/alpine_landscape.jpg"
            alt="PENETIX Company Story"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              opacity: 0.6,
            }}
          />

          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'radial-gradient(circle, rgba(16, 185, 129, 0.15) 0%, rgba(0,0,0,0.6) 80%)',
            }}
          />

          <div
            style={{
              position: 'relative',
              zIndex: 2,
              textAlign: 'center',
              padding: '20px',
            }}
          >
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                backgroundColor: '#ffffff',
                color: '#111827',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px',
                boxShadow: '0 0 30px rgba(255, 255, 255, 0.4)',
                cursor: 'pointer',
              }}
              onClick={() => alert('Playing PENETIX company story presentation.')}
            >
              <Play size={24} fill="#111827" style={{ marginLeft: '3px' }} />
            </div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#ffffff', marginBottom: '4px' }}>
              The PENETIX Philosophy
            </h3>
            <p style={{ fontSize: '0.82rem', color: '#cbd5e1' }}>
              Practical cybersecurity assessments, clarity without fear, and building a safer tomorrow.
            </p>
          </div>
        </div>

        {/* Footer info */}
        <div style={{ padding: '20px 24px', backgroundColor: '#111822', fontSize: '0.8rem', color: '#94a3b8' }}>
          Duration: 2 mins 14 secs • Narrated by PENETIX Executive Security Engineering
        </div>
      </div>
    </div>
  );
}
