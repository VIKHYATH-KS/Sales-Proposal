import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from './AppIcon';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navigationItems = [
    { label: 'Dashboard', path: '/dashboard', icon: 'LayoutDashboard' },
    { label: 'Create Proposal', path: '/upload-document', icon: 'FileUp' },
    { label: 'Proposals', path: '/proposal-preview', icon: 'FileText' },
    { label: 'Settings', path: '/settings', icon: 'Settings' }
  ];

  const isActive = (path) => {
    if (path === '/upload-document') {
      return location?.pathname === '/upload-document' || location?.pathname === '/proposal-generation';
    }
    return location?.pathname === path;
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header className="header-nav">
        <div className="header-container">
          <Link to="/dashboard" className="header-logo">
            <div className="header-logo-icon">
              <Icon name="FileText" size={24} color="var(--color-primary)" />
            </div>
            <span className="header-logo-text">Sales Proposal Generator</span>
          </Link>

          <nav className="header-nav-list">
            {navigationItems?.map((item) => (
              <Link
                key={item?.path}
                to={item?.path}
                className={`header-nav-item ${isActive(item?.path) ? 'active' : ''}`}
              >
                {item?.label}
              </Link>
            ))}
          </nav>

          <div className="header-actions">
            <button
              className="header-mobile-toggle"
              onClick={toggleMobileMenu}
              aria-label="Toggle mobile menu"
            >
              <Icon name={isMobileMenuOpen ? 'X' : 'Menu'} size={24} />
            </button>
          </div>
        </div>
      </header>
      {isMobileMenuOpen && (
        <>
          <div 
            className="mobile-menu-overlay" 
            onClick={closeMobileMenu}
            aria-hidden="true"
          />
          <nav className="mobile-menu">
            <div className="mobile-menu-header">
              <span className="text-lg font-semibold">Menu</span>
              <button
                className="mobile-menu-close"
                onClick={closeMobileMenu}
                aria-label="Close menu"
              >
                <Icon name="X" size={24} />
              </button>
            </div>
            <div className="mobile-menu-nav">
              {navigationItems?.map((item) => (
                <Link
                  key={item?.path}
                  to={item?.path}
                  className={`mobile-menu-item ${isActive(item?.path) ? 'active' : ''}`}
                  onClick={closeMobileMenu}
                >
                  <Icon name={item?.icon} size={20} className="inline-block mr-3" />
                  {item?.label}
                </Link>
              ))}
            </div>
          </nav>
        </>
      )}
    </>
  );
};

export default Header;