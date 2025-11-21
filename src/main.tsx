import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { ErrorBoundary } from './components/ErrorBoundary';
import App from './App.tsx';
import './index.css';

// Hide circular elements and elements with masks
function hideCircularElements() {
  document.querySelectorAll('*').forEach(el => {
    const computedStyle = window.getComputedStyle(el);
    if (
      computedStyle.borderRadius === '50%' ||
      computedStyle.maskImage !== 'none'
    ) {
      (el as HTMLElement).style.display = 'none';
    }
  });
}

// Run on mount and after DOM updates
if (typeof window !== 'undefined') {
  hideCircularElements();
  
  // Use MutationObserver to catch dynamically added elements
  const observer = new MutationObserver(() => {
    hideCircularElements();
  });
  
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <ThemeProvider>
          <LanguageProvider>
            <App />
          </LanguageProvider>
        </ThemeProvider>
      </BrowserRouter>
    </ErrorBoundary>
  </StrictMode>
);
