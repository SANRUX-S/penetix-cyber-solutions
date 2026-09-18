import React, { useState, useEffect } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, Shield, Mail, Globe, Database, HardDrive, Smartphone, Key } from 'lucide-react';

export function SecuritySystemOrbit({ onExploreApproach }) {
  const systemLayers = [
    {
      id: 'identity',
      label: 'Identity',
      icon: Key,
      x: 35, // percentage coords for the perspective radar
      y: 12,
      number: '01 / 07',
      title: 'Identity & Authentication',
      description: 'Enforce strong credentials, multi-factor authentication (MFA), and role-based zero trust identities.',
      tag: 'IDENTITY DEFENSE',
    },
    {
      id: 'website',
      label: 'Website',
      icon: Globe,
      x: 82,
      y: 20,
      number: '02 / 07',
      title: 'Website & Web Applications',
      description: 'Safeguard your customer-facing digital presence against injection, CSRF, DDoS, and logic flaws.',
      tag: 'EXTERNAL ATTACK SURFACE',
    },
    {
      id: 'email',
      label: 'Email',
      icon: Mail,
      x: 88,
      y: 52,
      number: '03 / 07',
      title: 'Email & Communications',
      description: 'Protect your communication and prevent phishing, spoofing, and unauthorized mailbox access.',
      tag: 'COMMUNICATION SECURITY',
    },
    {
      id: 'data',
      label: 'Data',
      icon: Database,
      x: 80,
      y: 80,
      number: '04 / 07',
      title: 'Data Protection & Encryption',
      description: 'Ensure critical customer databases and intellectual property are encrypted at rest and in transit.',
      tag: 'CORE ASSET PROTECTION',
    },
    {
      id: 'backups',
      label: 'Backups',
      icon: HardDrive,
      x: 48,
      y: 92,
      number: '05 / 07',
      title: 'Immutable Backups & Recovery',
      description: 'Maintain verified, isolated disaster-recovery snapshots to guarantee business continuity from ransomware.',
      tag: 'RESILIENCE & RECOVERY',
    },
    {
      id: 'devices',
      label: 'Devices',
      icon: Smartphone,
      x: 18,
      y: 78,
      number: '06 / 07',
      title: 'Endpoint & Device Security',
      description: 'Harden laptops, workstations, and mobile devices against malware, unpatched CVEs, and data leakage.',
      tag: 'ENDPOINT INTEGRITY',
    },
    {
      id: 'access',
      label: 'Access',
      icon: Shield,
      x: 14,
      y: 45,
      number: '07 / 07',
      title: 'Access Control & Perimeter',
      description: 'Restrict network ingress, VPN conduits, and privileged accounts using least-privilege principles.',
      tag: 'ACCESS GOVERNANCE',
    },
  ];

  const [activeIndex, setActiveIndex] = useState(2); // default to Email (03 / 07) as shown in preview

  const activeLayer = systemLayers[activeIndex];

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? systemLayers.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === systemLayers.length - 1 ? 0 : prev + 1));
  };

  return (
    <section
      id="approach"
      style={{
        backgroundColor: '#0c1117',
        color: '#ffffff',
        paddingTop: '80px',
        paddingBottom: '90px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Ambient background glow */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '600px',
          height: '350px',
          background: 'radial-gradient(circle, rgba(16, 185, 129, 0.12) 0%, rgba(12, 17, 23, 0) 70%)',
          pointerEvents: 'none',
        }}
      />

      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '40px',
            alignItems: 'center',
          }}
          className="system-grid-layout"
        >
          {/* Left Column: Heading & Copy */}
          <div style={{ maxWidth: '340px' }}>
            <p className="eyebrow eyebrow-dark" style={{ marginBottom: '14px', color: '#94a3b8' }}>
              SECURITY IN MOTION
            </p>
            <h2
              style={{
                fontSize: 'clamp(2rem, 3.4vw, 2.7rem)',
                fontWeight: 800,
                color: '#ffffff',
                lineHeight: 1.12,
                letterSpacing: '-0.02em',
                marginBottom: '16px',
              }}
            >
              Security is a system.
            </h2>
            <p
              style={{
                fontSize: '0.94rem',
                color: '#94a3b8',
                lineHeight: 1.6,
                marginBottom: '32px',
              }}
            >
              Strong security comes from multiple layers working together.
            </p>
            <button
              onClick={onExploreApproach}
              className="btn-outline btn-dark-outline"
              style={{
                fontSize: '0.86rem',
                padding: '11px 22px',
                borderRadius: 'var(--radius-pill)',
              }}
            >
              <span>Explore Our Approach</span>
              <ArrowRight size={15} />
            </button>
          </div>

          {/* Center Column: 3D Layered Orbital Radar System with Nodes */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '460px',
              height: '360px',
              margin: '0 auto',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/* Perspective tilted orbital rings SVG */}
            <svg
              viewBox="0 0 500 400"
              style={{
                width: '100%',
                height: '100%',
                position: 'absolute',
                top: 0,
                left: 0,
              }}
            >
              <defs>
                {/* Center Core Metallic Gradient */}
                <radialGradient id="coreGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#34d399" stopOpacity="0.8" />
                  <stop offset="40%" stopColor="#059669" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#0c1117" stopOpacity="0" />
                </radialGradient>
                <linearGradient id="orbitStroke" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="rgba(255, 255, 255, 0.3)" />
                  <stop offset="50%" stopColor="rgba(16, 185, 129, 0.5)" />
                  <stop offset="100%" stopColor="rgba(255, 255, 255, 0.1)" />
                </linearGradient>
              </defs>

              {/* Concentric Elliptical Orbit Rings */}
              <ellipse
                cx="250"
                cy="200"
                rx="220"
                ry="110"
                fill="none"
                stroke="rgba(255, 255, 255, 0.1)"
                strokeWidth="1.5"
                strokeDasharray="4 4"
              />
              <ellipse
                cx="250"
                cy="200"
                rx="180"
                ry="85"
                fill="none"
                stroke="url(#orbitStroke)"
                strokeWidth="1.2"
              />
              <ellipse
                cx="250"
                cy="200"
                rx="130"
                ry="60"
                fill="rgba(16, 185, 129, 0.03)"
                stroke="rgba(255, 255, 255, 0.15)"
                strokeWidth="1"
              />
              <ellipse
                cx="250"
                cy="200"
                rx="75"
                ry="36"
                fill="none"
                stroke="rgba(16, 185, 129, 0.4)"
                strokeWidth="1"
              />

              {/* Connecting dashed radar crosshairs */}
              <line
                x1="250"
                y1="70"
                x2="250"
                y2="330"
                stroke="rgba(255, 255, 255, 0.08)"
                strokeWidth="1"
                strokeDasharray="2 4"
              />
              <line
                x1="40"
                y1="200"
                x2="460"
                y2="200"
                stroke="rgba(255, 255, 255, 0.08)"
                strokeWidth="1"
                strokeDasharray="2 4"
              />

              {/* Center Radiant Core Circle */}
              <circle cx="250" cy="200" r="46" fill="url(#coreGlow)" />
            </svg>

            {/* Center Core Metallic Sphere with P Logo */}
            <div
              style={{
                position: 'absolute',
                width: '68px',
                height: '68px',
                borderRadius: '50%',
                background: 'radial-gradient(circle at 35% 35%, #475569, #0f172a 80%)',
                boxShadow: '0 0 35px rgba(16, 185, 129, 0.4), inset 0 2px 4px rgba(255, 255, 255, 0.3)',
                border: '1.5px solid rgba(255, 255, 255, 0.35)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 10,
              }}
            >
              {/* PENETIX P emblem */}
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                <path
                  d="M5 4H14C16.8 4 19 6.2 19 9C19 11.8 16.8 14 14 14H9V20H5V4Z"
                  fill="#ffffff"
                />
                <rect x="9" y="8" width="5" height="2" rx="0.5" fill="#0f172a" />
              </svg>
            </div>

            {/* Interactive Radar Nodes Overlay */}
            {systemLayers.map((layer, idx) => {
              const isSelected = activeIndex === idx;

              return (
                <div
                  key={layer.id}
                  onClick={() => setActiveIndex(idx)}
                  style={{
                    position: 'absolute',
                    left: `${layer.x}%`,
                    top: `${layer.y}%`,
                    transform: 'translate(-50%, -50%)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    zIndex: 20,
                    transition: 'all 0.25s ease',
                  }}
                >
                  {/* Glowing Node Dot */}
                  <div
                    style={{
                      width: isSelected ? '10px' : '7px',
                      height: isSelected ? '10px' : '7px',
                      borderRadius: '50%',
                      backgroundColor: isSelected ? '#10b981' : '#34d399',
                      boxShadow: isSelected
                        ? '0 0 14px #10b981, 0 0 4px #ffffff'
                        : '0 0 6px rgba(52, 211, 153, 0.6)',
                      transition: 'all 0.2s ease',
                    }}
                  />

                  {/* Node Label Text */}
                  <span
                    style={{
                      fontSize: '0.78rem',
                      fontWeight: isSelected ? 700 : 500,
                      color: isSelected ? '#ffffff' : '#cbd5e1',
                      textShadow: '0 1px 4px rgba(0, 0, 0, 0.8)',
                      letterSpacing: '0.02em',
                      backgroundColor: isSelected ? 'rgba(255, 255, 255, 0.08)' : 'transparent',
                      padding: '2px 6px',
                      borderRadius: '4px',
                    }}
                  >
                    {layer.label}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Right Column: Layer Inspector Card with Stepper Controls */}
          <div style={{ maxWidth: '360px', justifySelf: 'end', width: '100%' }}>
            <div
              className="glass-panel-dark"
              style={{
                borderRadius: '16px',
                padding: '28px 24px',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                position: 'relative',
              }}
            >
              {/* Card Sub-tag */}
              <p
                style={{
                  fontSize: '0.66rem',
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  color: '#94a3b8',
                  textTransform: 'uppercase',
                  marginBottom: '20px',
                }}
              >
                A STRONGER, MORE RESILIENT BUSINESS
              </p>

              {/* Active Layer Header with Icon and Title */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  marginBottom: '16px',
                }}
              >
                <div
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '10px',
                    backgroundColor: 'rgba(16, 185, 129, 0.12)',
                    border: '1px solid rgba(16, 185, 129, 0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#10b981',
                  }}
                >
                  <activeLayer.icon size={22} strokeWidth={2} />
                </div>
                <div>
                  <h3
                    style={{
                      fontSize: '1.2rem',
                      fontWeight: 700,
                      color: '#ffffff',
                      lineHeight: 1.2,
                    }}
                  >
                    {activeLayer.label}
                  </h3>
                  <span style={{ fontSize: '0.72rem', color: '#10b981', fontWeight: 600 }}>
                    {activeLayer.tag}
                  </span>
                </div>
              </div>

              {/* Description */}
              <p
                style={{
                  fontSize: '0.86rem',
                  color: '#94a3b8',
                  lineHeight: 1.55,
                  marginBottom: '28px',
                  minHeight: '52px',
                }}
              >
                {activeLayer.description}
              </p>

              {/* Stepper Navigation: Left / Right buttons & Current Index */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingTop: '16px',
                  borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <button
                    onClick={handlePrev}
                    aria-label="Previous security layer"
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(255, 255, 255, 0.06)',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      color: '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      transition: 'all var(--transition-fast)',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.15)')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.06)')}
                  >
                    <ChevronLeft size={16} />
                  </button>

                  <button
                    onClick={handleNext}
                    aria-label="Next security layer"
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(255, 255, 255, 0.06)',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      color: '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      transition: 'all var(--transition-fast)',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.15)')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.06)')}
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>

                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.82rem',
                    color: '#cbd5e1',
                    fontWeight: 600,
                  }}
                >
                  {activeLayer.number}
                </span>
              </div>
            </div>

            {/* Bottom Caption */}
            <p
              style={{
                fontSize: '0.74rem',
                color: '#64748b',
                marginTop: '12px',
                textAlign: 'center',
              }}
            >
              Each layer matters. Stronger together.
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 1024px) {
          .system-grid-layout {
            grid-template-columns: 1fr 1.3fr 1.1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
