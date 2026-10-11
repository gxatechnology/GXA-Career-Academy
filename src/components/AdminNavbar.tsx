import React from 'react';
import { useApp } from '../context/AppContext';
import { GXA_LOGO_URL } from '../data/mockData';
import { ShieldCheck, LogOut, ExternalLink } from 'lucide-react';

export const AdminNavbar: React.FC = () => {
  const { currentPath, navigateTo, adminLogout } = useApp();

  const adminNavItems = [
    { label: 'Overview', path: '/admin' },
    { label: 'Orders & Reconcile', path: '/admin/orders' },
    { label: 'eBooks Catalog', path: '/admin/ebooks' },
    { label: 'Courses Management', path: '/admin/courses' },
    { label: 'Enrolled Students', path: '/admin/students' },
    { label: 'Categories & Content', path: '/admin/content' },
    { label: 'Audit & Telemetry', path: '/admin/analytics' },
    { label: 'Security & Settings', path: '/admin/settings' },
  ];

  const isActive = (path: string) => {
    if (path === '/admin') return currentPath === '/admin';
    return currentPath.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-50 bg-[#0B1528] border-b border-white/10 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Control Bar */}
        <div className="h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigateTo('/admin')}
              className="flex items-center gap-2.5 text-left cursor-pointer"
            >
              <img src={GXA_LOGO_URL} alt="GXA Logo" className="h-8 w-auto object-contain" />
              <div className="flex flex-col">
                <span className="font-display text-sm font-extrabold text-white tracking-tight flex items-center gap-1.5">
                  GXA Career Academy
                  <span className="text-[10px] bg-cyan-500/20 text-cyan-300 font-mono px-2 py-0.5 rounded border border-cyan-500/30">
                    ADMIN
                  </span>
                </span>
                <span className="text-[10px] text-white/50 font-mono">
                  Internal Operations Console
                </span>
              </div>
            </button>
          </div>

          <div className="flex items-center gap-3 text-xs">
            {/* Fail-closed security badge */}
            <div className="hidden md:flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-lg text-[11px] font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Fail-Closed Enforced</span>
            </div>

            {/* Link to view public site in clean tab */}
            <button
              onClick={() => navigateTo('/')}
              className="hidden sm:flex items-center gap-1 px-3 py-1.5 bg-white/5 hover:bg-white/10 text-white/70 hover:text-white rounded-lg transition-colors cursor-pointer"
              title="View Public Storefront"
            >
              <span>View Storefront</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>

            {/* Logout button */}
            <button
              onClick={adminLogout}
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-rose-500/15 hover:bg-rose-500/25 text-rose-300 border border-rose-500/30 rounded-lg font-semibold transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Exit Admin</span>
            </button>
          </div>
        </div>

        {/* Admin Navigation Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto pb-2 pt-1 border-t border-white/5 scrollbar-none text-xs">
          {adminNavItems.map((item) => (
            <button
              key={item.path}
              onClick={() => navigateTo(item.path)}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors cursor-pointer font-medium ${
                isActive(item.path)
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                  : 'text-white/70 hover:text-white hover:bg-white/5'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
};
