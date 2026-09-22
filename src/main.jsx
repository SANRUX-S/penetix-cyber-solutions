import React from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource/plus-jakarta-sans/latin-400.css';
import '@fontsource/plus-jakarta-sans/latin-500.css';
import '@fontsource/plus-jakarta-sans/latin-600.css';
import '@fontsource/plus-jakarta-sans/latin-700.css';
import '@fontsource/space-grotesk/latin-400.css';
import '@fontsource/space-grotesk/latin-500.css';
import App from './App.jsx';
import './styles/globals.css';
import './styles/home.css';
import './styles/hosting.css';
import './styles/benefits.css';
import './styles/pricing.css';
import './styles/tailwind.css';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught:", error, errorInfo);
    this.setState({ errorInfo });
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 32, background: '#0a0a0c', color: '#fff', minHeight: '100vh', fontFamily: 'sans-serif' }}>
          <h2 style={{ color: '#ef4444', marginBottom: 12 }}>⚠️ Something went wrong in the application</h2>
          <p style={{ color: '#fbbf24', fontSize: 16 }}>{String(this.state.error?.message || this.state.error)}</p>
          <pre style={{ background: '#18181b', padding: 16, borderRadius: 8, overflow: 'auto', fontSize: 13, color: '#e4e4e7', marginTop: 16 }}>
            {this.state.error?.stack}
          </pre>
          <button
            onClick={() => { window.location.hash = '#home'; window.location.reload(); }}
            style={{ marginTop: 20, padding: '10px 24px', background: '#fff', color: '#000', border: 'none', borderRadius: 9999, fontWeight: 600, cursor: 'pointer' }}
          >
            Reset to Home
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);
