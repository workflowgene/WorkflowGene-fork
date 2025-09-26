import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';

const OfflineIndicator = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showOfflineMessage, setShowOfflineMessage] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setShowOfflineMessage(false);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setShowOfflineMessage(true);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (isOnline && !showOfflineMessage) return null;

  return (
    <div className={`fixed top-20 left-1/2 transform -translate-x-1/2 z-50 px-4 py-2 rounded-genetic-md shadow-organic-lg transition-all duration-300 ${
      isOnline ? 'bg-success text-white' : 'bg-warning text-white'
    }`}>
      <div className="flex items-center space-x-2">
        <Icon 
          name={isOnline ? 'Wifi' : 'WifiOff'} 
          size={16} 
          className="text-white" 
        />
        <span className="text-sm font-medium">
          {isOnline ? 'Back online' : 'Working offline'}
        </span>
      </div>
    </div>
  );
};

export default OfflineIndicator;