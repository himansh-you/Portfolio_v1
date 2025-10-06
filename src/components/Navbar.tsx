import React, { useState, useEffect, useRef } from 'react';

interface NavItem {
  label: string;
  href: string;
  external?: boolean;
}

const navItems: NavItem[] = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Blog', href: '/blog', external: true },
  { label: 'Contact', href: '#contact' },
];

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [showGreeting, setShowGreeting] = useState(true);
  const [greeting, setGreeting] = useState('');
  const navRef = useRef<HTMLDivElement>(null);

  // Get time-based greeting
  useEffect(() => {
    const getGreeting = () => {
      const hour = new Date().getHours();
      if (hour < 12) return 'Good Morning';
      if (hour < 17) return 'Good Afternoon';
      return 'Good Evening';
    };

    setGreeting(getGreeting());

    // Hide greeting after 3 seconds
    const timer = setTimeout(() => {
      setShowGreeting(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  // Enhanced active section detection with throttling
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'projects', 'contact'];
      const navbarHeight = 80; // h-20 = 80px
      let current = 'hero';
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Check if section is in the "active zone" (just below navbar)
          if (rect.top <= navbarHeight + 50 && rect.bottom > navbarHeight + 50) {
            current = section;
            break;
          }
        }
      }
      
      setActiveSection(current);
    };

    // Throttle scroll events for performance
    let timeoutId: ReturnType<typeof setTimeout>;
    const throttledScroll = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(handleScroll, 10);
    };

    handleScroll();
    window.addEventListener('scroll', throttledScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', throttledScroll);
      clearTimeout(timeoutId);
    };
  }, []);

  // Smooth scrolling with navbar offset
  const handleNavClick = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.getElementById(href.substring(1));
      if (element) {
        const navbarHeight = 80; // h-20 = 80px
        const offsetTop = element.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
        window.scrollTo({ top: offsetTop, behavior: 'smooth' });
      }
    }
    setIsMenuOpen(false);
  };

  // Close mobile menu on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isMenuOpen]);

  // Close mobile menu on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMenuOpen]);

  const isActiveLink = (href: string) => {
    if (href === '/blog') return false;
    const section = href.substring(1);
    return activeSection === section;
  };

  return (
    <nav 
      ref={navRef}
      className="sticky top-0 z-50 bg-white/70 backdrop-blur-md border-b border-white/20 shadow-sm transition-all duration-300"
      style={{
        backdropFilter: 'blur(12px) saturate(180%)',
        WebkitBackdropFilter: 'blur(12px) saturate(180%)',
      }}
    >
      <div className="container mx-auto px-6">
        <div className="relative h-20 flex items-center justify-between overflow-hidden">
          
          {/* Greeting Message - Appears first then slides away */}
          <div 
            className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ease-in-out ${
              showGreeting 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 -translate-y-full pointer-events-none'
            }`}
          >
            <p className="font-lilita text-2xl sm:text-3xl md:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-yellow-500 to-orange-500 animate-pulse">
              {greeting}! 👋 Welcome
            </p>
          </div>

          {/* Normal Navbar Content - Slides in after greeting */}
          <div 
            className={`absolute inset-0 flex items-center justify-between transition-all duration-700 ease-in-out ${
              showGreeting 
                ? 'opacity-0 translate-y-full pointer-events-none' 
                : 'opacity-100 translate-y-0'
            }`}
          >
            {/* Brand */}
            <div className="font-lilita text-2xl sm:text-3xl font-normal text-gray-900 tracking-tight">
              Himanshu Gupta
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center">
              <div className="flex items-center gap-6 lg:gap-8">
                {navItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={(e) => {
                      if (!item.external) {
                        e.preventDefault();
                        handleNavClick(item.href);
                      }
                    }}
                    className={`px-4 py-2 text-base font-medium transition-all duration-200 rounded-lg relative
                      ${isActiveLink(item.href)
                        ? 'text-gray-900 drop-shadow-md font-semibold bg-white/50 scale-105 after:absolute after:bottom-0 after:left-1/2 after:transform after:-translate-x-1/2 after:w-6 after:h-0.5 after:bg-gradient-to-r after:from-orange-500 after:to-yellow-500 after:rounded-full'
                        : 'text-gray-700'
                      }
                      hover:text-orange-600 hover:bg-white/40 hover:drop-shadow-md hover:scale-105
                    `}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-800 hover:text-orange-600 transition-all p-2.5 rounded-lg hover:bg-white/40 active:scale-95"
                aria-label="Toggle menu"
                aria-expanded={isMenuOpen}
              >
                <svg
                  className="w-7 h-7"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                >
                  {isMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu - Enhanced with staggered animations */}
        <div 
          className={`md:hidden overflow-hidden transition-all duration-300 ease-out ${
            isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div 
            className="py-5 border-t border-white/20 bg-white/80 backdrop-blur-md rounded-b-xl mb-2"
            style={{
              backdropFilter: 'blur(12px) saturate(180%)',
              WebkitBackdropFilter: 'blur(12px) saturate(180%)',
            }}
          >
            {navItems.map((item, idx) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => {
                  if (!item.external) {
                    e.preventDefault();
                  }
                  handleNavClick(item.href);
                }}
                className={`block py-3.5 px-5 text-lg transition-all duration-300 rounded-lg mx-2 my-1 transform
                  ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}
                  ${isActiveLink(item.href)
                    ? 'text-gray-900 font-semibold bg-white/60 drop-shadow-sm scale-[1.02]'
                    : 'text-gray-700'
                  }
                  hover:text-orange-600 hover:bg-white/50 hover:drop-shadow-sm active:scale-95
                `}
                style={{ transitionDelay: isMenuOpen ? `${idx * 50}ms` : '0ms' }}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;