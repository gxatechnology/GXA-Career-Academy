import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { GXA_LOGO_URL } from '../data/mockData';
import { GXALogoHorizontal } from './GXALogo';

export const Header: React.FC = () => {
  const { currentPath, navigateTo, cartCount, user, logout } = useApp();
  const [showAnnouncement, setShowAnnouncement] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'eBooks', path: '/ebooks' },
    { label: 'Courses', path: '/courses' },
    { label: 'AI Learning Hub', path: '/ai-learning' },
    { label: 'Career Guidance', path: '/career-guidance' },
    { label: 'Free Resources', path: '/resources' },
    { label: 'About', path: '/about' },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSearchModalOpen(false);
      navigateTo(`/ebooks?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  const isActive = (path: string) => {
    if (path === '/') return currentPath === '/';
    return currentPath.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-50">
      {/* 1. Announcement Bar */}
      {showAnnouncement && (
        <aside
          className="w-full bg-[#072118] text-white py-1.5 px-4 shadow-sm"
          id="top-announcement-bar"
        >
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
            <div className="flex-1 text-center text-xs font-medium flex items-center justify-center gap-1.5 flex-wrap">
              <span className="material-symbols-outlined text-sm text-[#FB923C]">rocket_launch</span>
              <span>
                New Release: Complete Generative AI & Prompt Engineering Master Toolkit is now live |{' '}
                <button
                  onClick={() => navigateTo('/courses')}
                  className="underline text-[#FB923C] hover:text-white transition-colors font-semibold"
                >
                  Explore Curated Bundles
                </button>
              </span>
            </div>
            <button
              aria-label="Dismiss announcement"
              className="text-white hover:text-[#FB923C] transition-colors p-1 rounded"
              onClick={() => setShowAnnouncement(false)}
              type="button"
            >
              <span className="material-symbols-outlined text-sm">close</span>
            </button>
          </div>
        </aside>
      )}

      {/* 2. Main Navigation Bar */}
      <div className="h-20 w-full bg-white/95 backdrop-blur-xl border-b border-[#E2E8E4] shadow-[0_1px_8px_rgba(7,33,24,0.03)]">
        <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          {/* Logo & Brand Identity */}
          <div className="flex items-center gap-6">
            <button
              onClick={() => navigateTo('/')}
              className="flex items-center flex-shrink-0 cursor-pointer transition-opacity hover:opacity-90 text-left"
              title="GXA Career Academy Home"
              aria-label="GXA Career Academy Home"
            >
              <GXALogoHorizontal size="md" />
            </button>

            {/* Desktop Navigation Links */}
            <nav className="hidden xl:flex items-center gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.path}
                  onClick={() => navigateTo(link.path)}
                  className={`px-3 py-1.5 text-sm font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                    isActive(link.path)
                      ? 'bg-[#ECFDF5] text-[#047857]'
                      : 'text-[#4E5D54] hover:text-[#072118] hover:bg-[#F1F5F2]'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Right Action Icons & Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Quick Search Input (Click opens modal) */}
            <button
              onClick={() => setSearchModalOpen(true)}
              className="hidden md:flex items-center bg-[#F1F5F2] hover:bg-[#E8EFEA] px-3 py-1.5 rounded-xl shadow-xs w-48 lg:w-56 text-left transition-colors cursor-pointer border border-[#E2E8E4]"
            >
              <span className="material-symbols-outlined text-[#6B7C72] text-lg mr-2">search</span>
              <span className="text-xs text-[#6B7C72] flex-1 select-none">Search catalog...</span>
              <kbd className="text-[10px] bg-white text-[#4E5D54] px-1.5 py-0.5 rounded shadow-xs font-mono border border-[#E2E8E4]">
                ⌘K
              </kbd>
            </button>

            {/* Cart Icon */}
            <button
              onClick={() => navigateTo('/cart')}
              aria-label="Cart"
              className="relative p-2 text-[#4E5D54] hover:text-[#072118] hover:bg-[#F1F5F2] rounded-xl transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-2xl">shopping_cart</span>
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 bg-[#EA580C] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            <div className="h-6 w-px bg-[#E2E8E4] hidden sm:block"></div>

            {/* User Profile / Admin / Login */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 p-1 rounded-full hover:ring-2 hover:ring-[#EA580C]/30 transition-all cursor-pointer"
                >
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-8 h-8 rounded-full object-cover shadow-xs border border-white"
                  />
                  <span className="hidden lg:inline text-xs font-semibold text-[#072118]">
                    {user.name}
                  </span>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold uppercase ${
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
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-[#E2E8E4] py-2 z-50">
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
                        className="w-full text-left px-4 py-2 text-xs font-semibold text-[#121E17] hover:bg-[#F1F5F2] flex items-center gap-2"
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
                        className="w-full text-left px-4 py-2 text-xs font-semibold text-[#121E17] hover:bg-[#F1F5F2] flex items-center gap-2"
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
                        className="w-full text-left px-4 py-2 text-xs font-semibold text-[#121E17] hover:bg-[#F1F5F2] flex items-center gap-2"
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
                        className="w-full text-left px-4 py-2 text-xs font-semibold text-[#121E17] hover:bg-[#F1F5F2] flex items-center gap-2"
                      >
                        <span className="material-symbols-outlined text-base text-[#059669]">
                          receipt_long
                        </span>
                        Orders & Invoices
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
              <div className="flex items-center gap-2">
                <button
                  onClick={() => navigateTo('/auth')}
                  className="hidden sm:inline-flex px-3 py-1.5 text-xs font-bold text-[#121E17] hover:text-[#EA580C] transition-colors cursor-pointer"
                >
                  Login
                </button>
                <button
                  onClick={() => navigateTo('/auth')}
                  className="inline-flex items-center justify-center px-4 py-2 bg-[#EA580C] text-white text-xs font-bold rounded-xl hover:bg-[#C2410C] transition-all shadow-sm cursor-pointer"
                >
                  Get Started
                </button>
              </div>
            )}

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 text-[#4E5D54] hover:text-[#072118] rounded-lg cursor-pointer"
              aria-label="Toggle menu"
            >
              <span className="material-symbols-outlined text-2xl">
                {mobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Slide-Down Menu */}
        {mobileMenuOpen && (
          <div className="xl:hidden bg-white border-b border-[#E2E8E4] px-4 py-4 shadow-xl flex flex-col gap-2">
            <div className="mb-2">
              <input
                type="text"
                placeholder="Search catalog..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSearchSubmit(e);
                }}
                className="w-full px-3 py-2 bg-[#F1F5F2] rounded-xl text-xs text-[#072118] focus:outline-none"
              />
            </div>

            {navLinks.map((link) => (
              <button
                key={link.path}
                onClick={() => {
                  setMobileMenuOpen(false);
                  navigateTo(link.path);
                }}
                className={`text-left px-3 py-2 rounded-lg text-sm font-semibold ${
                  isActive(link.path)
                    ? 'bg-[#ECFDF5] text-[#047857]'
                    : 'text-[#4E5D54] hover:bg-[#F1F5F2]'
                }`}
              >
                {link.label}
              </button>
            ))}

            <div className="border-t border-[#F1F5F2] pt-3 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  navigateTo('/dashboard');
                }}
                className="text-left px-3 py-2 rounded-lg text-sm font-semibold text-[#121E17] hover:bg-[#F1F5F2] flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-sm text-[#059669]">dashboard</span>
                Student Dashboard
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Global Search Modal */}
      {searchModalOpen && (
        <div
          className="fixed inset-0 bg-[#072118]/60 backdrop-blur-sm z-50 flex items-start justify-center pt-24 px-4"
          onClick={() => setSearchModalOpen(false)}
        >
          <div
            className="bg-white rounded-2xl max-w-xl w-full p-5 shadow-2xl border border-[#E2E8E4]"
            onClick={(e) => e.stopPropagation()}
          >
            <form onSubmit={handleSearchSubmit} className="flex items-center gap-3 border-b border-[#F1F5F2] pb-3">
              <span className="material-symbols-outlined text-2xl text-[#EA580C]">search</span>
              <input
                type="text"
                autoFocus
                placeholder="Search eBooks, Courses, Prompts, Topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 text-base text-[#072118] focus:outline-none placeholder:text-[#6B7C72]"
              />
              <button
                type="button"
                onClick={() => setSearchModalOpen(false)}
                className="text-xs bg-[#F1F5F2] hover:bg-[#E8EFEA] px-2 py-1 rounded text-[#4E5D54]"
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
                    className="text-xs bg-[#F1F5F2] hover:bg-[#FFEDD5] hover:text-[#C2410C] px-3 py-1.5 rounded-lg text-[#121E17] transition-colors"
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
