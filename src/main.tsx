import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './design-kit/global.css';
import { App } from './App';
import { AppStateProvider } from './state/AppState';
import { ToastProvider } from './state/ToastContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AppStateProvider>
        <div className="app-frame">
          <ToastProvider>
            <App />
          </ToastProvider>
        </div>
      </AppStateProvider>
    </BrowserRouter>
  </StrictMode>,
);
