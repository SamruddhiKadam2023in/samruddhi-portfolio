import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

const root = document.getElementById('root');
if (!root) throw new Error('Root element #root not found');

// ScrollManager restores positions itself once each page has rendered.
if ('scrollRestoration' in window.history) window.history.scrollRestoration = 'manual';

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
