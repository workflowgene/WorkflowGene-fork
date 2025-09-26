import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';

const ThemeToggle = () => {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    // Get saved theme or default to light
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    applyTheme(savedTheme);
  }, []);

  const applyTheme = (newTheme) => {
    const root = document.documentElement;
    
    if (newTheme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    
    localStorage.setItem('theme', newTheme);
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    applyTheme(newTheme);
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-genetic-md hover:bg-muted transition-colors duration-genetic-normal"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      <Icon 
        name={theme === 'light' ? 'Moon' : 'Sun'} 
        size={20} 
        className="text-text-secondary hover:text-text-primary transition-colors" 
      />
    </button>
  );
};

export default ThemeToggle;