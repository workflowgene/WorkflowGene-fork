import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../AppIcon';
import { useAuth } from '../auth/AuthProvider';
import { signOut } from '../../lib/auth';

const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const { profile } = useAuth();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const menuItems = [
    { name: 'Profile', path: '/dashboard/profile', icon: 'User' },
    { name: 'Settings', path: '/dashboard/settings', icon: 'Settings' },
    { name: 'Billing', path: '/dashboard/billing', icon: 'CreditCard' },
    { name: 'Help', path: '/help', icon: 'HelpCircle' }
  ];

  const handleSignOut = async () => {
    await signOut();
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-3 p-2 rounded-genetic-md hover:bg-muted transition-colors duration-genetic-normal"
      >
        <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
          <span className="text-white font-semibold text-sm">
            {profile?.first_name?.[0]}{profile?.last_name?.[0]}
          </span>
        </div>
        <Icon name="ChevronDown" size={16} className="text-text-secondary" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-popover border border-border rounded-genetic-md shadow-organic-lg z-50">
          <div className="p-4 border-b border-border">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                <span className="text-white font-semibold">
                  {profile?.first_name?.[0]}{profile?.last_name?.[0]}
                </span>
              </div>
              <div>
                <p className="font-medium text-text-primary">
                  {profile?.first_name} {profile?.last_name}
                </p>
                <p className="text-sm text-text-secondary">
                  {profile?.email}
                </p>
              </div>
            </div>
          </div>

          <div className="py-2">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className="flex items-center space-x-3 px-4 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-muted transition-colors duration-genetic-normal"
              >
                <Icon name={item.icon} size={16} />
                <span>{item.name}</span>
              </Link>
            ))}
          </div>

          <div className="border-t border-border py-2">
            <button
              onClick={handleSignOut}
              className="flex items-center space-x-3 px-4 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-muted transition-colors duration-genetic-normal w-full text-left"
            >
              <Icon name="LogOut" size={16} />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;