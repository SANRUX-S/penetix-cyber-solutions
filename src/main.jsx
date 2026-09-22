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
        <div style={{ padding: 32, background: '#0a0a0c', color: '#fff', minHeight: '100vh', fontFamily: 'sans-serif', display: 'grid', placeItems: 'center' }}>
          <div style={{ maxWidth: 560, textAlign: 'center' }}>
            <h2 style={{ marginBottom: 12 }}>Something went wrong</h2>
            <p style={{ color: '#a1a1aa', lineHeight: 1.6 }}>
              We could not load this page correctly. Please refresh and try again.
            </p>
            <button
              onClick={() => { window.history.replaceState({}, '', '/'); window.location.reload(); }}
              style={{ marginTop: 20, padding: '10px 24px', background: '#fff', color: '#000', border: 'none', borderRadius: 9999, fontWeight: 600, cursor: 'pointer' }}
            >
              Return Home
            </button>
          </div>
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
