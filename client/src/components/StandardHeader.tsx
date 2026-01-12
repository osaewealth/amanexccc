import React, { useState, useEffect, useRef } from 'react';
import { Search, Menu, ArrowRight, ChevronDown, X, Phone, Briefcase, Globe, ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import logo from '@/assets/logo.png';
import { useLocation } from 'wouter';

export default function StandardHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const [location] = useLocation();

  // Helper function to check if current route matches
  const isActiveRoute = (path: string) => {
    if (path === '/') {
      return location === '/' || location === '';
    }
    return location.startsWith(path);
  };

  useEffect(() => {
    let ticking = false;

    const updateScrollState = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      setIsScrolled(scrollTop > 50);
      ticking = false;
    };

    const requestTick = () => {
      if (!ticking) {
        requestAnimationFrame(updateScrollState);
        ticking = true;
      }
    };

    window.addEventListener('scroll', requestTick, { passive: true });
    return () => window.removeEventListener('scroll', requestTick);
  }, []);

  // Click outside handler for search dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
        setSearchQuery('');
      }
    };

    if (isSearchOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSearchOpen]);

  // Click outside handler for mobile menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery.trim())}`;
    }
    setIsSearchOpen(false);
    setSearchQuery('');
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
      }`}
    >
              <div className="w-full px-4 sm:px-6 lg:px-8 lg:max-w-7xl lg:mx-auto">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div className="flex items-center">
            <a href="/">
              <img
                src={logo}
                alt="Amanex Logo"
                className="h-16 w-auto"
              />
            </a>
          </div>

          {/* Desktop Navigation - Show on desktop (1080px+) */}
          <nav className="hidden lg:flex items-center space-x-8">
            <a href="/" className={`relative text-coty-navy font-medium transition-all duration-300 hover:after:w-full after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-coty-navy after:left-0 after:-bottom-1 after:transition-all after:duration-300 hover:scale-105 ${
              isActiveRoute('/') ? 'after:w-full' : ''
            } hover:after:w-full`}>Home</a>
            <a href="/about-us" className={`relative text-coty-navy font-medium transition-all duration-300 hover:after:w-full after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-coty-navy after:left-0 after:-bottom-1 after:transition-all after:duration-300 hover:scale-105 ${
              isActiveRoute('/about-us') ? 'after:w-full' : ''
            } hover:after:w-full`}>About Us</a>
            <a href="/our-story" className={`relative text-coty-navy font-medium transition-all duration-300 hover:after:w-full after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-coty-navy after:left-0 after:-bottom-1 after:transition-all after:duration-300 hover:scale-105 ${
              isActiveRoute('/our-story') ? 'after:w-full' : ''
            } hover:after:w-full`}>Our Story</a>
            <a href="/our-brands" className={`relative text-coty-navy font-medium transition-all duration-300 hover:after:w-full after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-coty-navy after:left-0 after:-bottom-1 after:transition-all after:duration-300 hover:scale-105 ${
              isActiveRoute('/our-brands') ? 'after:w-full' : ''
            } hover:after:w-full`}>Our Brands</a>
            <a href="/our-impact" className={`relative text-coty-navy font-medium transition-all duration-300 hover:after:w-full after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-coty-navy after:left-0 after:-bottom-1 after:transition-all after:duration-300 hover:scale-105 ${
              isActiveRoute('/our-impact') ? 'after:w-full' : ''
            } hover:after:w-full`}>Our Impact</a>
            <a href="/contact-us" className={`relative text-coty-navy font-medium transition-all duration-300 hover:after:w-full after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-coty-navy after:left-0 after:-bottom-1 after:transition-all after:duration-300 hover:scale-105 ${
              isActiveRoute('/contact-us') ? 'after:w-full' : ''
            } hover:after:w-full`}>Contact Us</a>
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            <div className="hidden lg:flex items-center space-x-4">
              {/* Open Positions Button */}
              <a href="/careers" className="w-fit flex items-center gap-4 px-6 py-3 bg-coty-navy text-white text-sm font-medium rounded-br-3xl hover:bg-transparent hover:text-coty-navy border border-coty-navy transition-colors duration-300">
                OPEN POSITIONS
              </a>
            </div>

            {/* Animated Search Field - Desktop Only */}
            <div className="relative hidden lg:block" ref={searchRef}>
              <Button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="w-fit flex items-center gap-4 px-6 py-3 bg-coty-navy text-white text-sm font-medium rounded-br-3xl hover:bg-transparent hover:text-coty-navy border border-coty-navy transition-colors duration-300"
              >
                <Search className="h-5 w-5" />
              </Button>
              
              {/* Search Dropdown */}
              {isSearchOpen && (
                <div className="absolute right-0 top-full mt-2 bg-white border border-coty-navy rounded-lg shadow-lg animate-in slide-in-from-top-2 duration-300 z-50 min-w-[300px]">
                  <form onSubmit={handleSearchSubmit} className="p-4">
                    <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg px-3 py-2">
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="What can we help you find?"
                        className="flex-1 bg-transparent border-none outline-none text-coty-navy placeholder-coty-gray text-sm"
                        autoFocus
                      />
                      <Button
                        type="button"
                        onClick={() => {
                          setIsSearchOpen(false);
                          setSearchQuery('');
                        }}
                        className="ml-2 p-1 text-white bg-coty-navy hover:bg-coty-gray rounded-full transition-colors duration-200"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </form>
                </div>
              )}
            </div>

              {/* Enhanced Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`lg:hidden p-2 rounded-md text-coty-navy transition-all duration-300 hover:scale-110 active:scale-95 ${
                  isMobileMenuOpen ? 'rotate-90' : ''
                }`}
                aria-label="Toggle mobile menu"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>

          {/* Enhanced Mobile Navigation Menu */}
        {isMobileMenuOpen && (
            <>
              {/* Full Page Overlay - Click anywhere to close */}
              <div 
                className="fixed inset-0 bg-black bg-opacity-20 z-40 lg:hidden"
                onClick={closeMobileMenu}
              />
              
              {/* Mobile Menu Panel */}
              <div className="lg:hidden bg-white/90 backdrop-blur-md shadow-2xl rounded-2xl mt-2 py-6 border border-white/20 relative z-50">
                <nav className="flex flex-col space-y-6 px-6">
                  <a 
                    href="/" 
                    onClick={closeMobileMenu}
                    className={`text-center text-lg font-medium transition-all duration-300 hover:scale-105 hover:text-coty-mint transform hover:-translate-y-1 ${
                      isActiveRoute('/') ? 'text-coty-navy font-semibold' : 'text-coty-navy'
                    }`}
                  >
                    Home
                  </a>
                  <a 
                    href="/about-us" 
                    onClick={closeMobileMenu}
                    className={`text-center text-lg font-medium transition-all duration-300 hover:scale-105 hover:text-coty-mint transform hover:-translate-y-1 ${
                      isActiveRoute('/about-us') ? 'text-coty-navy font-semibold' : 'text-coty-navy'
                    }`}
                  >
                    About Us
                  </a>
                  <a 
                    href="/our-story" 
                    onClick={closeMobileMenu}
                    className={`text-center text-lg font-medium transition-all duration-300 hover:scale-105 hover:text-coty-mint transform hover:-translate-y-1 ${
                      isActiveRoute('/our-story') ? 'text-coty-navy font-semibold' : 'text-coty-navy'
                    }`}
                  >
                    Our Story
                  </a>
                  <a 
                    href="/our-brands" 
                    onClick={closeMobileMenu}
                    className={`text-center text-lg font-medium transition-all duration-300 hover:scale-105 hover:text-coty-mint transform hover:-translate-y-1 ${
                      isActiveRoute('/our-brands') ? 'text-coty-navy font-semibold' : 'text-coty-navy'
                    }`}
                  >
                    Our Brands
                  </a>
                  <a 
                    href="/our-impact" 
                    onClick={closeMobileMenu}
                    className={`text-center text-lg font-medium transition-all duration-300 hover:scale-105 hover:text-coty-mint transform hover:-translate-y-1 ${
                      isActiveRoute('/our-impact') ? 'text-coty-navy font-semibold' : 'text-coty-navy'
                    }`}
                  >
                    Our Impact
                  </a>
                  <a 
                    href="/contact-us" 
                    onClick={closeMobileMenu}
                    className={`text-center text-lg font-medium transition-all duration-300 hover:scale-105 hover:text-coty-mint transform hover:-translate-y-1 ${
                      isActiveRoute('/contact-us') ? 'text-coty-navy font-semibold' : 'text-coty-navy'
                    }`}
                  >
                    Contact Us
                  </a>
                  <div className="pt-4 border-t border-gray-200/50">
                    <a 
                      href="/careers" 
                      onClick={closeMobileMenu}
                      className="block w-full text-center px-6 py-4 bg-coty-navy text-white text-sm font-medium rounded-br-3xl hover:bg-coty-mint hover:text-coty-navy border border-coty-navy transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                    >
                  OPEN POSITIONS
                </a>
              </div>
            </nav>
          </div>
            </>
        )}
      </div>
    </header>
    </>
  );
} 