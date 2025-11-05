import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom'; // ✅ CHANGE TO HashRouter
import { HelmetProvider } from 'react-helmet-async';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <HashRouter> {/* ✅ CHANGE TO HashRouter */}
        <App />
      </HashRouter>
    </HelmetProvider>
  </StrictMode>
);