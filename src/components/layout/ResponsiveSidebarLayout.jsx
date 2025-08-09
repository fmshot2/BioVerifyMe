// src/components/layout/ResponsiveSidebarLayout.jsx
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '../ui/button';
import { cn } from '../../lib/utils';

const ResponsiveSidebarLayout = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: '📊' },
    { name: 'Users', href: '/users', icon: '👥' },
    { name: 'Settings', href: '/settings', icon: '⚙️' },
    { name: 'Profile', href: '/profile', icon: '👤' }
  ];

  const isActive = (path) => location.pathname === path;

  const SidebarContent = () => (
    <>
      {/* Sidebar Header */}
      <div className="flex h-16 items-center border-b px-6">
        <h2 className="text-lg font-semibold">My App</h2>
        {isMobile && (
          <Button
            variant="ghost"
            size="icon"
            className="ml-auto"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            ✕
          </Button>
        )}
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
            <p className="font-medium">John Doe</p>
            <p className="text-muted-foreground">john@example.com</p>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <div className="flex h-screen bg-background">
      {/* Desktop Sidebar */}
      {!isMobile && (
        <div className="flex h-full w-64 flex-col border-r bg-background">
          <SidebarContent />
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
            <SidebarContent />
          </div>
        </>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation Bar */}
        <header className="h-16 border-b bg-background px-6 flex items-center">
          {isMobile && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(true)}
              className="mr-4"
            >
              ☰
            </Button>
          )}
          <h1 className="text-xl font-semibold">Welcome to My App</h1>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default ResponsiveSidebarLayout;