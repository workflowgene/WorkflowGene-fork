import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Button from './Button';
import Icon from '../AppIcon';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const navigationItems = [
    { name: 'Home', path: '/homepage', icon: 'Home' },
    { name: 'Features', path: '/features', icon: 'Zap' },
    { name: 'Industries', path: '/industries', icon: 'Building2' },
    { name: 'Pricing', path: '/pricing', icon: 'DollarSign' },
    { name: 'Contact', path: '/contact', icon: 'MessageCircle' }
  ];

  const secondaryItems = [
    { name: 'About', path: '/about', icon: 'Info' },
    { name: 'Resources', path: '/resources', icon: 'BookOpen' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const isActivePath = (path) => {
    return location?.pathname === path;
  };

  const Logo = () => (
    <Link to="/homepage" className="flex items-center space-x-3 group" onClick={closeMenu}>
      <div className="relative">
        <div className="w-50 h-10 rounded-genetic-md flex items-center justify-center">
          <img src="/assets/logos/WorkflowGene Logo.png" />
        </div>
      </div>
    </Link>
  );

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-genetic-normal ${
        isScrolled 
          ? 'bg-background/95 backdrop-blur-genetic shadow-organic-md border-b border-border' 
          : 'bg-background/80 backdrop-blur-sm'
      }`}
    >
      <div className="w-full">
        <div className="flex items-center justify-between h-16 px-6 lg:px-8">
          {/* Logo */}
          <Logo />

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigationItems?.map((item) => (
              <Link
                key={item?.path}
                to={item?.path}
                className={`relative px-3 py-2 text-sm font-genetic-medium transition-all duration-genetic-normal nav-genetic ${
                  isActivePath(item?.path)
                    ? 'text-primary' :'text-text-secondary hover:text-text-primary'
                }`}
              >
                {item?.name}
              </Link>
            ))}
            
            {/* More Menu */}
            <div className="relative group">
              <button className="flex items-center space-x-1 px-3 py-2 text-sm font-genetic-medium text-text-secondary hover:text-text-primary transition-colors duration-genetic-normal">
                <span>Company</span>
                <Icon name="ChevronDown" size={16} />
              </button>
              
              <div className="absolute top-full right-0 mt-2 w-48 bg-popover border border-border rounded-genetic-md shadow-organic-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-genetic-normal">
                <div className="py-2">
                  {secondaryItems?.map((item) => (
                    <Link
                      key={item?.path}
                      to={item?.path}
                      className={`flex items-center space-x-3 px-4 py-2 text-sm font-genetic-medium transition-colors duration-genetic-normal ${
                        isActivePath(item?.path)
                          ? 'text-primary bg-muted' :'text-text-secondary hover:text-text-primary hover:bg-muted'
                      }`}
                    >
                      <Icon name={item?.icon} size={16} />
                      <span>{item?.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center space-x-4">
            <Button variant="ghost" size="sm">
              Sign In
            </Button>
            <Button 
              variant="default" 
              size="sm" 
              className="btn-organic"
              iconName="ArrowRight"
              iconPosition="right"
            >
              Start Free Trial
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="lg:hidden p-2 rounded-genetic-md text-text-secondary hover:text-text-primary hover:bg-muted transition-all duration-genetic-normal micro-evolution"
            aria-label="Toggle menu"
          >
            <Icon name={isMenuOpen ? "X" : "Menu"} size={24} />
          </button>
        </div>

        {/* Mobile Navigation */}
        <div 
          className={`lg:hidden transition-all duration-genetic-normal overflow-hidden ${
            isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="px-6 py-4 bg-surface border-t border-border">
            <nav className="space-y-2">
              {navigationItems?.map((item) => (
                <Link
                  key={item?.path}
                  to={item?.path}
                  onClick={closeMenu}
                  className={`flex items-center space-x-3 px-3 py-3 rounded-genetic-md text-sm font-genetic-medium transition-all duration-genetic-normal ${
                    isActivePath(item?.path)
                      ? 'text-primary bg-primary/10' :'text-text-secondary hover:text-text-primary hover:bg-muted'
                  }`}
                >
                  <Icon name={item?.icon} size={18} />
                  <span>{item?.name}</span>
                </Link>
              ))}
              
              {secondaryItems?.map((item) => (
                <Link
                  key={item?.path}
                  to={item?.path}
                  onClick={closeMenu}
                  className={`flex items-center space-x-3 px-3 py-3 rounded-genetic-md text-sm font-genetic-medium transition-all duration-genetic-normal ${
                    isActivePath(item?.path)
                      ? 'text-primary bg-primary/10' :'text-text-secondary hover:text-text-primary hover:bg-muted'
                  }`}
                >
                  <Icon name={item?.icon} size={18} />
                  <span>{item?.name}</span>
                </Link>
              ))}
            </nav>
            
            <div className="mt-6 pt-4 border-t border-border space-y-3">
              <Button 
                variant="ghost" 
                size="sm" 
                fullWidth
                onClick={closeMenu}
              >
                Sign In
              </Button>
              <Button 
                variant="default" 
                size="sm" 
                fullWidth
                className="btn-organic"
                iconName="ArrowRight"
                iconPosition="right"
                onClick={closeMenu}
              >
                Start Free Trial
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;