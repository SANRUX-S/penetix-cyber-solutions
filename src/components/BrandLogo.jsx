import React from 'react';

export function PenetixLogo({ variant = 'dark', showTagline = true, size = 'md' }) {
  const isDark = variant === 'light'; // light text for dark backgrounds
  
  const iconSizes = {
    sm: 24,
    md: 32,
    lg: 40
  };

  const currentSize = iconSizes[size] || 32;

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
      {/* Precision Geometric P / Shield Mark */}
      <svg
        width={currentSize}
        height={currentSize}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ flexShrink: 0 }}
      >
        {/* Outer sharp faceted shield */}
        <path
          d="M8 8 L32 8 L32 20 C32 28 20 34 20 34 C20 34 8 28 8 20 Z"
          fill={isDark ? '#ffffff' : '#0c1117'}
        />
        {/* Inner geometric negative space defining the P cut and security core */}
        <path
          d="M14 13 H24 C26.2 13 28 14.8 28 17 C28 19.2 26.2 21 24 21 H18 V29 H14 V13 Z"
          fill={isDark ? '#0c1117' : '#ffffff'}
        />
        <rect
          x="18"
          y="16"
          width="5"
          height="3"
          rx="1"
          fill={isDark ? '#ffffff' : '#0c1117'}
        />
      </svg>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <span
          style={{
            fontFamily: 'var(--font-primary)',
            fontSize: size === 'lg' ? '1.35rem' : size === 'sm' ? '1.05rem' : '1.2rem',
            fontWeight: '800',
            letterSpacing: '0.08em',
            lineHeight: 1.1,
            color: isDark ? '#ffffff' : '#0c1117',
          }}
        >
          PENETIX
        </span>
        {showTagline && (
          <span
            style={{
              fontFamily: 'var(--font-primary)',
              fontSize: '0.52rem',
              fontWeight: '600',
              letterSpacing: '0.18em',
              color: isDark ? '#94a3b8' : '#6b7280',
              marginTop: '2px',
              textTransform: 'uppercase',
            }}
          >
            SECURE TODAY. STRONGER TOMORROW.
          </span>
        )}
      </div>
    </div>
  );
}
