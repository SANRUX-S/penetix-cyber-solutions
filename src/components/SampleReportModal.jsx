import React from 'react';
import { X, ShieldAlert, CheckCircle2, AlertTriangle, FileText, Download } from 'lucide-react';
import { PenetixLogo } from './BrandLogo';

export function SampleReportModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          width: '100%',
          maxWidth: '680px',
          maxHeight: '90vh',
          overflowY: 'auto',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          border: '1px solid #e5e7eb',
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '20px 24px',
            borderBottom: '1px solid #f3f4f6',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            position: 'sticky',
            top: 0,
            backgroundColor: '#ffffff',
            zIndex: 10,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <PenetixLogo size="sm" showTagline={false} />
            <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#6b7280' }}>
              Executive Sample Report #PNTX-2026-084
            </span>
          </div>

          <button
            onClick={onClose}
            aria-label="Close sample report"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#6b7280',
              padding: '4px',
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: '28px' }}>
          {/* Executive Overview Banner */}
          <div
            style={{
              backgroundColor: '#0c1117',
              color: '#ffffff',
              borderRadius: '12px',
              padding: '24px',
              marginBottom: '24px',
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '20px',
            }}
          >
            <div>
              <span style={{ fontSize: '0.72rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                Overall Assessment
              </span>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginTop: '4px', color: '#ffffff' }}>
                Posture: Moderate (82 / 100)
              </h3>
              <p style={{ fontSize: '0.84rem', color: '#94a3b8', marginTop: '4px' }}>
                Zero critical vulnerabilities identified. 2 high-priority configuration gaps detected.
              </p>
            </div>

            <button
              onClick={() => alert('Sample Executive PDF download simulated.')}
              className="btn-primary"
              style={{
                backgroundColor: '#ffffff',
                color: '#111827',
                fontSize: '0.82rem',
                padding: '9px 16px',
              }}
            >
              <Download size={14} />
              <span>Download PDF</span>
            </button>
          </div>

          {/* Key Findings List */}
          <div style={{ marginBottom: '28px' }}>
            <h4 style={{ fontSize: '0.94rem', fontWeight: 700, color: '#111827', marginBottom: '14px' }}>
              Identified Observations & Recommendations
            </h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {/* Finding 1 */}
              <div
                style={{
                  border: '1px solid #fee2e2',
                  backgroundColor: '#fff5f5',
                  borderRadius: '8px',
                  padding: '16px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                  <span
                    style={{
                      fontSize: '0.68rem',
                      fontWeight: 700,
                      backgroundColor: '#ef4444',
                      color: '#ffffff',
                      padding: '2px 8px',
                      borderRadius: '4px',
                    }}
                  >
                    HIGH
                  </span>
                  <strong style={{ fontSize: '0.88rem', color: '#991b1b' }}>
                    Permissive SPF and Missing DMARC Quarantine Policy
                  </strong>
                </div>
                <p style={{ fontSize: '0.8rem', color: '#7f1d1d', lineHeight: 1.4 }}>
                  Business email domains lack rigorous enforcement policies, permitting external unauthorized parties to spoof company executive communications.
                </p>
              </div>

              {/* Finding 2 */}
              <div
                style={{
                  border: '1px solid #ffedd5',
                  backgroundColor: '#fffaf0',
                  borderRadius: '8px',
                  padding: '16px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                  <span
                    style={{
                      fontSize: '0.68rem',
                      fontWeight: 700,
                      backgroundColor: '#f97316',
                      color: '#ffffff',
                      padding: '2px 8px',
                      borderRadius: '4px',
                    }}
                  >
                    HIGH
                  </span>
                  <strong style={{ fontSize: '0.88rem', color: '#9a3412' }}>
                    Unrestricted Inbound SSH / Management Access on Perimeter
                  </strong>
                </div>
                <p style={{ fontSize: '0.8rem', color: '#7c2d12', lineHeight: 1.4 }}>
                  Port 22 directly exposed to public IP space without IP restriction or jump bastion host controls.
                </p>
              </div>

              {/* Finding 3 */}
              <div
                style={{
                  border: '1px solid #fef3c7',
                  backgroundColor: '#fffbeb',
                  borderRadius: '8px',
                  padding: '16px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                  <span
                    style={{
                      fontSize: '0.68rem',
                      fontWeight: 700,
                      backgroundColor: '#eab308',
                      color: '#ffffff',
                      padding: '2px 8px',
                      borderRadius: '4px',
                    }}
                  >
                    MEDIUM
                  </span>
                  <strong style={{ fontSize: '0.88rem', color: '#854d0e' }}>
                    Missing Content Security Policy (CSP) Headers on Main Web Application
                  </strong>
                </div>
                <p style={{ fontSize: '0.8rem', color: '#713f12', lineHeight: 1.4 }}>
                  Browser security headers can be enhanced to prevent potential cross-site scripting vulnerabilities.
                </p>
              </div>
            </div>
          </div>

          {/* Remediation Timeline */}
          <div
            style={{
              padding: '18px',
              backgroundColor: '#f9fafb',
              borderRadius: '8px',
              border: '1px solid #e5e7eb',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <CheckCircle2 size={16} color="#10b981" />
              <strong style={{ fontSize: '0.86rem', color: '#111827' }}>
                Clear Next Actions Provided
              </strong>
            </div>
            <p style={{ fontSize: '0.8rem', color: '#4b5563', lineHeight: 1.5 }}>
              PENETIX reports give engineering teams copy-pasteable DNS records, firewall rules, and validation checks. No ambiguity, just measurable hardening.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
