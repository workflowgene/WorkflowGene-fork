import React, { useState, useEffect } from 'react';
import Button from '../ui/Button';
import Icon from '../AppIcon';

const PWAInstaller = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Check if app is already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
    }

    // Listen for the beforeinstallprompt event
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallPrompt(true);
    };

    // Listen for app installed event
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setShowInstallPrompt(false);
      setDeferredPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      setIsInstalled(true);
    }
    
    setDeferredPrompt(null);
    setShowInstallPrompt(false);
  };

  const dismissPrompt = () => {
    setShowInstallPrompt(false);
    localStorage.setItem('pwa-install-dismissed', 'true');
  };

  // Don't show if already installed or user dismissed
  if (isInstalled || !showInstallPrompt || localStorage.getItem('pwa-install-dismissed')) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 bg-card border border-border rounded-genetic-lg shadow-organic-lg p-4 max-w-sm z-50">
      <div className="flex items-start space-x-3">
        <div className="w-10 h-10 bg-primary/10 rounded-genetic-md flex items-center justify-center flex-shrink-0">
          <Icon name="Smartphone" size={20} className="text-primary" />
        </div>
        
        <div className="flex-1">
          <h4 className="font-semibold text-text-primary mb-1">
            Install WorkflowGene App
          </h4>
          <p className="text-sm text-text-secondary mb-3">
            Get faster access and work offline with our mobile app
          </p>
          
          <div className="flex space-x-2">
            <Button
              variant="default"
              size="sm"
              onClick={handleInstallClick}
              iconName="Download"
              iconPosition="left"
            >
              Install
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={dismissPrompt}
              iconName="X"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PWAInstaller;