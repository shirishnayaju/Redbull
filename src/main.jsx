import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

// Force scroll to top on initial load
if (typeof window !== 'undefined') {
  // Reset scroll position immediately
  window.scrollTo(0, 0);
  
  // Also handle browser back/forward navigation
  window.addEventListener('popstate', () => {
    window.scrollTo(0, 0);
  });
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);