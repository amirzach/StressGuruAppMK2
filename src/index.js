import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Lazy loading the App component (Optional, for performance)
const LazyApp = React.lazy(() => import('./App'));

// Root element and render setup
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      {/* Wrap with Suspense for lazy loading */}
      <Suspense fallback={<div>Loading...</div>}>
        <LazyApp />
      </Suspense>
    </BrowserRouter>
  </React.StrictMode>
);

// For measuring performance (Optional)
reportWebVitals();
