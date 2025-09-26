import React from "react";
import { useEffect } from 'react';
import Routes from "./Routes";
import { initGA } from './lib/analytics';
import PWAInstaller from './components/pwa/PWAInstaller';
import OfflineIndicator from './components/pwa/OfflineIndicator';

function App() {
  useEffect(() => {
    // Initialize Google Analytics
    initGA();

    // Register service worker for PWA
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
          .then((registration) => {
            console.log('SW registered: ', registration);
          })
          .catch((registrationError) => {
            console.log('SW registration failed: ', registrationError);
          });
      });
    }
  }, []);

  return (
    <>
      <Routes />
      <PWAInstaller />
      <OfflineIndicator />
    </>
  );
}

export default App;
