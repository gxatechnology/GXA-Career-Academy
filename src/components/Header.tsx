import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { GXALogoHorizontal } from './GXALogo';

export const Header: React.FC = () => {
  const { currentPath, navigateTo, cartCount, user, logout } = useApp();
  const [showAnnouncement, setShowAnnouncement] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);

  const userDropdownRef = useRef<HTMLDivElement>(null);
  const moreDropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        userDropdownRef.current &&
        !userDropdownRef.current.contains(e.target as Node)
      ) {
        setUserDropdownOpen(false);
      }
      if (
        moreDropdownRef.current &&
        !moreDropdownRef.current.contains(e.target as Node)
      ) {
        setMoreDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  // Global keyboard shortcut: Cmd+K / Ctrl+K opens search, Esc closes
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchModalOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setSearchModalOpen(false);
        setMobileMenuOpen(false);
        setUserDropdownOpen(false);
        setMoreDropdownOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
    setMoreDropdownOpen(false);
  }, [currentPath]);

  // Primary navigation items (always shown on desktop)
  const primaryNavLinks = [
    { label: 'Home', path: '/' },
    { label: 'eBooks', path: '/ebooks' },
    { label: 'Courses', path: '/courses' },
    { label: 'AI Learning Hub', path: '/ai-learning' },
    { label: 'Career Guidance', path: '/career-guidance' },
  ];

  // Secondary navigation items (in "More" dropdown on medium desktop, inline on wide desktop)
  const secondaryNavLinks = [
    { label: 'Free Resources', path: '/resources' },
    { label: 'About', path: '/about' },
  ];

  // All 7 links for mobile drawer and wide desktop
  const allNavLinks = [...primaryNavLinks, ...secondaryNavLinks];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSearchModalOpen(false);
      setMobileMenuOpen(false);
      navigateTo(`/ebooks?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  const isActive = (path: string) => {
    if (path === '/') return currentPath === '/';
    return currentPath.startsWith(path);
  };

  const isSecondaryActive = secondaryNavLinks.some((link) => isActive(link.path));

  return (
    <header className="sticky top-0 z-50 w-full max-w-full">
      {/* 1. Announcement Bar */}
      {showAnnouncement && (
        <aside
          className="w-full bg-[#072118] text-white py-1.5 px-3 sm:px-4 shadow-sm"
          id="top-announcement-bar"
        >
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 min-w-0">
            <div className="flex-1 text-center text-[11px] sm:text-xs font-medium flex items-center justify-center gap-1.5 flex-wrap min-w-0">
              <span className="material-symbols-outlined text-sm text-[#FB923C] shrink-0">
                rocket_launch
              </span>
              <span className="truncate sm:whitespace-normal">
                New Release: Complete Generative AI &amp; Prompt Engineering Master Toolkit is now live |{' '}
                <button
                  onClick={() => navigateTo('/courses')}
                  className="underline text-[#FB923C] hover:text-white transition-colors font-semibold cursor-pointer inline"
                >
                  Explore Bundles
                </button>
              </span>
            </div>
            <button
              aria-label="Dismiss announcement"
              className="text-white hover:text-[#FB923C] transition-colors p-1 rounded shrink-0 cursor-pointer"
              onClick={() => setShowAnnouncement(false)}
              type="button"
            >
              <span className="material-symbols-outlined text-sm">close</span>
            </button>
          </div>
        </aside>
      )}

      {/* 2. Main Navigation Bar */}
      <div className="h-16 sm:h-20 w-full bg-white/95 backdrop-blur-xl border-b border-[#E2E8E4] shadow-[0_1px_8px_rgba(7,33,24,0.03)]">
        <div className="max-w-7xl mx-auto h-full px-3 sm:px-6 lg:px-8 flex items-center justify-between gap-2 sm:gap-4 min-w-0">
          {/* Left: Brand Logo & Desktop Navigation */}
          <div className="flex items-center gap-3 lg:gap-6 min-w-0 shrink">
            <button
              onClick={() => navigateTo('/')}
              className="flex items-center shrink-0 cursor-pointer transition-opacity hover:opacity-90 text-left min-w-0"
              title="GXA Career Academy Home"
              aria-label="GXA Career Academy Home"
            >
              <GXALogoHorizontal size="md" />
            </button>

            {/* Wide Desktop: All 7 Navigation Links (>= 1440px / 2xl) */}
            <nav className="hidden 2xl:flex items-center gap-1 min-w-0" aria-label="Main Navigation">
              {allNavLinks.map((link) => (
                <button
                  key={link.path}
                  onClick={() => navigateTo(link.path)}
                  className={`px-2.5 py-1.5 text-xs 2xl:text-sm font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                    isActive(link.path)
                      ? 'bg-[#ECFDF5] text-[#047857]'
                      : 'text-[#4E5D54] hover:text-[#072118] hover:bg-[#F1F5F2]'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </nav>

            {/* Medium Desktop: Primary Links + "More" Dropdown (1200px to 1439px / xl) */}
            <nav className="hidden xl:flex 2xl:hidden items-center gap-0.5 min-w-0" aria-label="Main Navigation">
              {primaryNavLinks.map((link) => (
                <button
                  key={link.path}
                  onClick={() => navigateTo(link.path)}
                  className={`px-2 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                    isActive(link.path)
                      ? 'bg-[#ECFDF5] text-[#047857]'
                      : 'text-[#4E5D54] hover:text-[#072118] hover:bg-[#F1F5F2]'
                  }`}
                >
                  {link.label}
                </button>
              ))}

              {/* "More" Secondary Navigation Dropdown */}
              <div className="relative shrink-0" ref={moreDropdownRef}>
                <button
                  onClick={() => setMoreDropdownOpen(!moreDropdownOpen)}
                  className={`px-2 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap flex items-center gap-1 ${
                    isSecondaryActive || moreDropdownOpen
                      ? 'bg-[#ECFDF5] text-[#047857]'
                      : 'text-[#4E5D54] hover:text-[#072118] hover:bg-[#F1F5F2]'
                  }`}
                  aria-expanded={moreDropdownOpen}
                  aria-label="More menu items"
                >
                  <span>More</span>
                  <span className={`material-symbols-outlined text-sm transition-transform duration-200 ${moreDropdownOpen ? 'rotate-180' : ''}`}>
                    expand_more
                  </span>
                </button>

                {moreDropdownOpen && (
                  <div className="absolute left-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-[#E2E8E4] py-1.5 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                    {secondaryNavLinks.map((link) => (
                      <button
                        key={link.path}
                        onClick={() => {
                          setMoreDropdownOpen(false);
                          navigateTo(link.path);
                        }}
                        className={`w-full text-left px-3.5 py-2 text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                          isActive(link.path)
                            ? 'bg-[#ECFDF5] text-[#047857]'
                            : 'text-[#4E5D54] hover:text-[#072118] hover:bg-[#F1F5F2]'
                        }`}
                      >
                        <span>{link.label}</span>
                        {isActive(link.path) && (
                          <span className="w-1.5 h-1.5 rounded-full bg-[#047857]" />
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </nav>
          </div>

          {/* Right: Search, Cart, Auth & Mobile Menu Trigger */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 lg:gap-3 shrink-0">
            {/* Desktop Quick Search Trigger (hidden on mobile/tablet) */}
            <button
              onClick={() => setSearchModalOpen(true)}
              className="hidden lg:flex items-center bg-[#F1F5F2] hover:bg-[#E8EFEA] px-2.5 xl:px-3 py-1.5 rounded-xl shadow-2xs w-36 xl:w-44 2xl:w-52 text-left transition-colors cursor-pointer border border-[#E2E8E4] shrink"
              aria-label="Open global search dialog"
            >
              <span className="material-symbols-outlined text-[#6B7C72] text-lg mr-2 shrink-0">
                search
              </span>
              <span className="text-xs text-[#6B7C72] flex-1 truncate select-none">
                Search catalog...
              </span>
              <kbd className="text-[10px] bg-white text-[#4E5D54] px-1.5 py-0.5 rounded shadow-2xs font-mono border border-[#E2E8E4] shrink-0">
                ⌘K
              </kbd>
            </button>

            {/* Mobile / Tablet Search Icon Button */}
            <button
              onClick={() => setSearchModalOpen(true)}
              aria-label="Search catalog"
              className="lg:hidden p-1.5 sm:p-2 text-[#4E5D54] hover:text-[#072118] hover:bg-[#F1F5F2] rounded-xl transition-colors cursor-pointer shrink-0"
            >
              <span className="material-symbols-outlined text-xl sm:text-2xl">search</span>
            </button>

            {/* Cart Icon Button */}
            <button
              onClick={() => navigateTo('/cart')}
              aria-label={`Shopping cart with ${cartCount} items`}
              className="relative p-1.5 sm:p-2 text-[#4E5D54] hover:text-[#072118] hover:bg-[#F1F5F2] rounded-xl transition-colors cursor-pointer shrink-0"
            >
              <span className="material-symbols-outlined text-xl sm:text-2xl">shopping_cart</span>
              {cartCount > 0 && (
                <span className="absolute top-0.5 right-0.5 sm:top-1 sm:right-1 bg-[#EA580C] text-white text-[9px] sm:text-[10px] font-bold w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full flex items-center justify-center shadow-xs">
                  {cartCount}
                </span>
              )}
            </button>

            <div className="h-6 w-px bg-[#E2E8E4] hidden xl:block shrink-0" />

            {/* Authenticated User Profile Dropdown */}
            {user ? (
              <div className="relative shrink-0" ref={userDropdownRef}>
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-1.5 sm:gap-2 p-1 rounded-full hover:ring-2 hover:ring-[#EA580C]/30 transition-all cursor-pointer"
                  aria-expanded={userDropdownOpen}
                  aria-label="Open user account menu"
                >
                  <img
                    src={user.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80'}
                    alt={user.name}
                    className="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover shadow-2xs border border-white shrink-0"
                  />
                  <span className="hidden xl:inline text-xs font-semibold text-[#072118] max-w-[100px] truncate">
                    {user.name}
                  </span>
                  <span
                    className={`hidden sm:inline-block text-[10px] px-1.5 py-0.5 rounded-full font-bold uppercase shrink-0 ${
                      user.role === 'admin'
                        ? 'bg-[#072118] text-[#34D399]'
                        : 'bg-[#ECFDF5] text-[#047857]'
                    }`}
                  >
                    {user.role}
                  </span>
                </button>

                {/* Dropdown Menu */}
                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-[#E2E8E4] py-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                    <div className="px-4 py-2 border-b border-[#F1F5F2]">
                      <div className="font-bold text-sm text-[#072118]">{user.name}</div>
                      <div className="text-xs text-[#6B7C72] truncate">{user.email}</div>
                    </div>

                    <div className="py-1">
                      <button
                        onClick={() => {
                          setUserDropdownOpen(false);
                          navigateTo('/dashboard');
                        }}
                        className="w-full text-left px-4 py-2 text-xs font-semibold text-[#121E17] hover:bg-[#F1F5F2] flex items-center gap-2 cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-base text-[#059669]">
                          dashboard
                        </span>
                        Student Dashboard
                      </button>
                      <button
                        onClick={() => {
                          setUserDropdownOpen(false);
                          navigateTo('/dashboard/library');
                        }}
                        className="w-full text-left px-4 py-2 text-xs font-semibold text-[#121E17] hover:bg-[#F1F5F2] flex items-center gap-2 cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-base text-[#059669]">
                          menu_book
                        </span>
                        My Digital Library
                      </button>
                      <button
                        onClick={() => {
                          setUserDropdownOpen(false);
                          navigateTo('/dashboard/courses');
                        }}
                        className="w-full text-left px-4 py-2 text-xs font-semibold text-[#121E17] hover:bg-[#F1F5F2] flex items-center gap-2 cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-base text-[#059669]">
                          school
                        </span>
                        My Enrolled Courses
                      </button>
                      <button
                        onClick={() => {
                          setUserDropdownOpen(false);
                          navigateTo('/dashboard/orders');
                        }}
                        className="w-full text-left px-4 py-2 text-xs font-semibold text-[#121E17] hover:bg-[#F1F5F2] flex items-center gap-2 cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-base text-[#059669]">
                          receipt_long
                        </span>
                        Orders &amp; Invoices
                      </button>
                    </div>

                    <div className="py-1 border-t border-[#F1F5F2]">
                      <button
                        onClick={() => {
                          setUserDropdownOpen(false);
                          logout();
                        }}
                        className="w-full text-left px-4 py-2 text-xs font-semibold text-[#DC2626] hover:bg-[#FEF2F2] flex items-center gap-2 cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-base">logout</span>
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* Guest Actions: Login + Get Started */
              <div className="hidden lg:flex items-center gap-1.5 xl:gap-2 shrink-0">
                <button
                  onClick={() => navigateTo('/auth')}
                  className="px-2.5 xl:px-3 py-1.5 text-xs font-bold text-[#121E17] hover:text-[#EA580C] transition-colors cursor-pointer whitespace-nowrap"
                >
                  Login
                </button>
                <button
                  onClick={() => navigateTo('/auth')}
                  className="inline-flex items-center justify-center px-3.5 py-1.5 xl:py-2 bg-[#EA580C] text-white text-xs font-bold rounded-xl hover:bg-[#C2410C] transition-all shadow-xs cursor-pointer whitespace-nowrap active:scale-[0.98]"
                >
                  Get Started
                </button>
              </div>
            )}

            {/* Mobile / Tablet Hamburger Menu Toggle (< 1280px / xl) */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 text-[#4E5D54] hover:text-[#072118] hover:bg-[#F1F5F2] rounded-lg cursor-pointer shrink-0 transition-colors"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
            >
              <span className="material-symbols-outlined text-2xl">
                {mobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>

        {/* 3. Responsive Mobile & Tablet Drawer Menu */}
        {mobileMenuOpen && (
          <div className="xl:hidden fixed inset-x-0 top-full bg-white/98 backdrop-blur-xl border-b border-[#E2E8E4] shadow-2xl z-40 max-h-[calc(100vh-5rem)] overflow-y-auto animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-3">
              {/* Mobile Quick Search Input */}
              <form onSubmit={handleSearchSubmit} className="relative w-full">
                <input
                  type="text"
                  placeholder="Search eBooks, courses, topics..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 bg-[#F1F5F2] rounded-xl text-xs text-[#072118] focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#059669] border border-[#E2E8E4]"
                />
                <span className="material-symbols-outlined absolute left-2.5 top-2.5 text-lg text-[#6B7C72]">
                  search
                </span>
              </form>

              {/* Guest Authentication CTA Buttons (Mobile) */}
              {!user && (
                <div className="grid grid-cols-2 gap-2 pt-1 pb-2 border-b border-[#F1F5F2]">
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      navigateTo('/auth');
                    }}
                    className="py-2.5 px-3 bg-[#F1F5F2] hover:bg-[#E8EFEA] text-[#072118] rounded-xl text-xs font-bold text-center transition-colors cursor-pointer border border-[#E2E8E4]"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      navigateTo('/auth');
                    }}
                    className="py-2.5 px-3 bg-[#EA580C] hover:bg-[#C2410C] text-white rounded-xl text-xs font-bold text-center transition-colors cursor-pointer shadow-xs"
                  >
                    Get Started
                  </button>
                </div>
              )}

              {/* Logged in User Bar (Mobile) */}
              {user && (
                <div className="p-3 bg-[#F9FAF7] rounded-xl border border-[#E2E8E4] flex items-center justify-between">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <img
                      src={user.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80'}
                      alt={user.name}
                      className="w-8 h-8 rounded-full object-cover shrink-0"
                    />
                    <div className="min-w-0">
                      <div className="font-bold text-xs text-[#072118] truncate">{user.name}</div>
                      <div className="text-[10px] text-[#6B7C72] truncate">{user.email}</div>
                    </div>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-full font-bold uppercase bg-[#ECFDF5] text-[#047857] shrink-0">
                    {user.role}
                  </span>
                </div>
              )}

              {/* All 7 Navigation Links */}
              <div className="flex flex-col gap-1 py-1">
                {allNavLinks.map((link) => (
                  <button
                    key={link.path}
                    onClick={() => {
                      setMobileMenuOpen(false);
                      navigateTo(link.path);
                    }}
                    className={`text-left px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-colors flex items-center justify-between cursor-pointer ${
                      isActive(link.path)
                        ? 'bg-[#ECFDF5] text-[#047857]'
                        : 'text-[#4E5D54] hover:bg-[#F1F5F2] hover:text-[#072118]'
                    }`}
                  >
                    <span>{link.label}</span>
                    {isActive(link.path) && (
                      <span className="material-symbols-outlined text-base text-[#047857]">
                        check
                      </span>
                    )}
                  </button>
                ))}
              </div>

              {/* Footer Portal Links */}
              <div className="border-t border-[#F1F5F2] pt-3 flex flex-col gap-1.5">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    navigateTo('/dashboard');
                  }}
                  className="text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold text-[#121E17] hover:bg-[#F1F5F2] flex items-center gap-2 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-base text-[#059669]">
                    dashboard
                  </span>
                  <span>Student Dashboard</span>
                </button>

                {user && (
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      logout();
                    }}
                    className="text-left px-3.5 py-2 rounded-xl text-xs font-semibold text-[#DC2626] hover:bg-[#FEF2F2] flex items-center gap-2 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-base">logout</span>
                    <span>Sign Out</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 4. Global Search Modal */}
      {searchModalOpen && (
        <div
          className="fixed inset-0 bg-[#072118]/60 backdrop-blur-sm z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 animate-in fade-in duration-150"
          onClick={() => setSearchModalOpen(false)}
        >
          <div
            className="bg-white rounded-2xl max-w-xl w-full p-4 sm:p-5 shadow-2xl border border-[#E2E8E4] animate-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            <form onSubmit={handleSearchSubmit} className="flex items-center gap-3 border-b border-[#F1F5F2] pb-3">
              <span className="material-symbols-outlined text-2xl text-[#EA580C] shrink-0">search</span>
              <input
                type="text"
                autoFocus
                placeholder="Search eBooks, Courses, Prompts, Topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 text-sm sm:text-base text-[#072118] focus:outline-none placeholder:text-[#6B7C72] min-w-0"
              />
              <button
                type="button"
                onClick={() => setSearchModalOpen(false)}
                className="text-xs bg-[#F1F5F2] hover:bg-[#E8EFEA] px-2 py-1 rounded text-[#4E5D54] shrink-0 cursor-pointer"
              >
                ESC
              </button>
            </form>
            <div className="pt-4 flex flex-col gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#6B7C72]">
                Suggested Searches:
              </span>
              <div className="flex flex-wrap gap-2">
                {[
                  'Digital Marketing Mastery',
                  'THE WHY Career Guidance',
                  'Prompt Engineering',
                  'RAG Vector Databases',
                  'Full-Stack AI Applications'
                ].map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => {
                      setSearchModalOpen(false);
                      navigateTo(`/ebooks?q=${encodeURIComponent(item)}`);
                    }}
                    className="text-xs bg-[#F1F5F2] hover:bg-[#FFEDD5] hover:text-[#C2410C] px-3 py-1.5 rounded-lg text-[#121E17] transition-colors cursor-pointer"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
