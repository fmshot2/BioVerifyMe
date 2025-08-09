// src/components/Sidebar/Sidebar.jsx
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '../ui/button';
import { cn } from '../../lib/utils';

const Sidebar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDesktopSidebarExpanded, setIsDesktopSidebarExpanded] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    // Listen for mobile menu toggle from navbar
    const handleToggleMobileMenu = () => {
      setIsMobileMenuOpen(prev => !prev);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    window.addEventListener('toggleMobileMenu', handleToggleMobileMenu);
    
    return () => {
      window.removeEventListener('resize', checkScreenSize);
      window.removeEventListener('toggleMobileMenu', handleToggleMobileMenu);
    };
  }, []);

  // Update body class when sidebar state changes
  useEffect(() => {
    if (!isMobile) {
      document.body.classList.toggle('sidebar-collapsed', !isDesktopSidebarExpanded);
    } else {
      document.body.classList.remove('sidebar-collapsed');
    }
  }, [isDesktopSidebarExpanded, isMobile]);

  const navigation = [
    { name: 'Home', href: '/', icon: '🏠' },
    { name: 'Events', href: '/events', icon: '📅' },
    { name: 'Users', href: '/users', icon: '👥' },
    { name: 'About', href: '/about', icon: 'ℹ️' },
    { name: 'Gallery', href: '/galleries', icon: '🖼️' },
    { name: 'Services', href: '/services', icon: '🛠️' },
    { name: 'Testimonials', href: '/testimonials', icon: '💬' },
    { name: 'Speakers', href: '/speakers', icon: '🎤' },
    { name: 'Statistics', href: '/statistics', icon: '📊' },
    { name: 'Volunteers', href: '/volunteers', icon: '🤝' },
    { name: 'Vulcanisers', href: '/vulcs', icon: '🔧' },
    { name: 'Config', href: '/config', icon: '⚙️' },
    { name: 'Profile', href: '/profile', icon: '👤' }
  ];

  const isActive = (path) => location.pathname === path;

  const handleToggleExpansion = () => {
    setIsDesktopSidebarExpanded(prev => {
      const newState = !prev;
      // Dispatch event to notify RootLayout of state change
      const event = new CustomEvent('sidebarStateChanged', { 
        detail: { expanded: newState } 
      });
      window.dispatchEvent(event);
      return newState;
    });
  };

  const FullSidebarContent = () => (
    <>
      {/* Sidebar Header */}
      <div className="flex h-16 items-center border-b px-6">
        <h2 className="text-lg font-semibold">My App</h2>
        <Button
          variant="ghost"
          size="icon"
          className="ml-auto"
          onClick={() => {
            if (isMobile) {
              setIsMobileMenuOpen(false);
            } else {
              handleToggleExpansion();
            }
          }}
        >
          {isMobile ? '✕' : '☰'}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-4">
        {navigation.map((item) => (
          <Link 
            key={item.name} 
            to={item.href}
            onClick={() => isMobile && setIsMobileMenuOpen(false)}
          >
            <div
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                isActive(item.href) 
                  ? "bg-accent text-accent-foreground" 
                  : "text-muted-foreground"
              )}
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.name}</span>
            </div>
          </Link>
        ))}
      </nav>

      {/* Sidebar Footer */}
      <div className="border-t p-4">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-primary" />
          <div className="flex-1 text-sm">
            <p className="font-medium">Admin User</p>
            <p className="text-muted-foreground">admin@example.com</p>
          </div>
        </div>
      </div>
    </>
  );

  const CollapsedSidebarContent = () => (
    <>
      {/* Collapsed Sidebar Header */}
      <div className="flex h-16 items-center justify-center border-b">
        <Button
          variant="ghost"
          size="icon"
          onClick={handleToggleExpansion}
          className="h-10 w-10 hover:bg-accent"
        >
          ☰
        </Button>
      </div>

      {/* Collapsed Navigation */}
      <nav className="flex-1 space-y-1 px-2 py-4">
        {navigation.map((item) => (
          <Link 
            key={item.name} 
            to={item.href}
            title={item.name}
          >
            <div
              className={cn(
                "flex items-center justify-center rounded-md p-2 text-lg font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                isActive(item.href) 
                  ? "bg-accent text-accent-foreground" 
                  : "text-muted-foreground"
              )}
            >
              <span>{item.icon}</span>
            </div>
          </Link>
        ))}
      </nav>

      {/* Collapsed Sidebar Footer */}
      <div className="border-t p-2 flex justify-center">
        <div className="h-8 w-8 rounded-full bg-primary" />
      </div>
    </>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      {!isMobile && (
        <div 
          className={cn(
            "flex h-screen flex-col border-r bg-background fixed left-0 top-0 z-40 transition-all duration-300 ease-in-out",
            isDesktopSidebarExpanded ? "w-64" : "w-16"
          )}
        >
          {isDesktopSidebarExpanded ? <FullSidebarContent /> : <CollapsedSidebarContent />}
        </div>
      )}

      {/* Mobile Sidebar Overlay */}
      {isMobile && isMobileMenuOpen && (
        <>
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 w-64 bg-background border-r z-50 flex flex-col">
            <FullSidebarContent />
          </div>
        </>
      )}
    </>
  );
};

export default Sidebar;