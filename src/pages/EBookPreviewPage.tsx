import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  BookOpen,
  Menu,
  Sun,
  Moon,
  ChevronLeft,
  ChevronRight,
  ShoppingCart,
  ShieldCheck,
  ArrowLeft,
  Minus,
  Plus,
  Zap,
  Sparkles,
  FileText,
  Lock,
} from 'lucide-react';

export const EBookPreviewPage: React.FC<{ slug: string }> = ({ slug }) => {
  const { ebooks, navigateTo, addToCart } = useApp();
  const book = ebooks.find((b) => b.slug === slug) || ebooks[0];

  const [themeMode, setThemeMode] = useState<'light' | 'sepia' | 'dark'>('light');
  const [viewMode, setViewMode] = useState<'spread' | 'single'>('spread');
  const [zoomLevel, setZoomLevel] = useState(100);
  const [currentPage, setCurrentPage] = useState(14);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const totalPreviewPages = book.previewSamplePages || 35;

  const handleNextSpread = () => {
    if (currentPage < totalPreviewPages - 1) {
      setCurrentPage((prev) => Math.min(prev + (viewMode === 'spread' ? 2 : 1), totalPreviewPages));
    }
  };

  const handlePrevSpread = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => Math.max(prev - (viewMode === 'spread' ? 2 : 1), 1));
    }
  };

  return (
    <div className="flex flex-col w-full pb-20 bg-[#FCFDFF]">
      {/* 1. TOP READER UTILITY CONTROL DECK */}
      <div className="sticky top-20 z-40 w-full bg-white/95 backdrop-blur-md shadow-xs border border-slate-200 rounded-2xl px-4 py-3 mb-6 flex flex-wrap items-center justify-between gap-3">
        {/* Book Meta & TOC Toggle */}
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1.5 text-slate-600 hover:text-[#000825] hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            title="Toggle Table of Contents"
          >
            <Menu className="w-5 h-5" />
          </button>

          <button
            onClick={() => navigateTo(`/ebooks/${book.slug}`)}
            className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-[#1D4ED8] font-mono cursor-pointer shrink-0"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Overview</span>
          </button>

          <div className="h-4 w-px bg-slate-200 hidden sm:block shrink-0" />

          <div className="hidden sm:flex flex-col min-w-0">
            <span className="text-[10px] text-[#1D4ED8] font-bold uppercase tracking-wider font-mono">
              Academic Reader Preview
            </span>
            <h1 className="font-display text-xs font-bold text-[#000825] truncate max-w-xs">
              {book.title}
            </h1>
          </div>
        </div>

        {/* Reader Tools Controls */}
        <div className="flex items-center gap-2">
          {/* Spread vs Single Toggle */}
          <div className="flex items-center bg-slate-100 p-0.5 rounded-lg text-xs font-semibold">
            <button
              onClick={() => setViewMode('single')}
              className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
                viewMode === 'single' ? 'bg-white text-[#1D4ED8] shadow-xs' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Single
            </button>
            <button
              onClick={() => setViewMode('spread')}
              className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
                viewMode === 'spread' ? 'bg-white text-[#1D4ED8] shadow-xs' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Spread
            </button>
          </div>

          {/* Zoom Buttons */}
          <div className="hidden md:flex items-center bg-slate-100 rounded-lg px-2 py-0.5 text-xs">
            <button
              onClick={() => setZoomLevel((prev) => Math.max(prev - 10, 80))}
              className="p-1 text-slate-500 hover:text-slate-900 cursor-pointer"
              title="Zoom Out"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="w-12 text-center font-mono font-bold text-[#000825]">{zoomLevel}%</span>
            <button
              onClick={() => setZoomLevel((prev) => Math.min(prev + 10, 130))}
              className="p-1 text-slate-500 hover:text-slate-900 cursor-pointer"
              title="Zoom In"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Theme Palette Modes */}
          <div className="flex items-center bg-slate-100 p-0.5 rounded-lg">
            <button
              onClick={() => setThemeMode('light')}
              className={`p-1.5 rounded transition-colors cursor-pointer ${
                themeMode === 'light' ? 'bg-white text-[#1D4ED8] shadow-xs' : 'text-slate-500 hover:text-slate-900'
              }`}
              title="Clean White Canvas"
            >
              <Sun className="w-4 h-4" />
            </button>
            <button
              onClick={() => setThemeMode('sepia')}
              className={`p-1.5 rounded transition-colors cursor-pointer text-xs font-serif font-bold ${
                themeMode === 'sepia' ? 'bg-[#FAF4EB] text-[#433422] shadow-xs' : 'text-slate-500 hover:text-slate-900'
              }`}
              title="Warm Scholarly Sepia"
            >
              Aa
            </button>
            <button
              onClick={() => setThemeMode('dark')}
              className={`p-1.5 rounded transition-colors cursor-pointer ${
                themeMode === 'dark' ? 'bg-[#000825] text-white shadow-xs' : 'text-slate-500 hover:text-slate-900'
              }`}
              title="Deep Midnight Navy Focus"
            >
              <Moon className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* 2. SPLIT-SCREEN READER STAGE */}
      <div className="flex items-start gap-6 w-full relative mb-12">
        {/* Collapsible Sidebar */}
        {sidebarOpen && (
          <aside className="w-72 lg:w-80 flex-shrink-0 bg-white rounded-2xl border border-slate-200 shadow-xs p-5 flex flex-col gap-4">
            <div className="bg-[#000825] text-white rounded-xl p-3.5 font-mono">
              <div className="flex justify-between text-xs font-bold mb-1.5">
                <span className="text-cyan-400">Sample Read Access</span>
                <span>{currentPage} / {totalPreviewPages} Pgs</span>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-cyan-400 h-full transition-all duration-300"
                  style={{ width: `${(currentPage / totalPreviewPages) * 100}%` }}
                />
              </div>
              <div className="mt-2 text-[10px] text-slate-400 flex justify-between font-sans">
                <span>Total: {book.pages || 400} Pages</span>
                <span className="text-emerald-400 font-semibold">Free Chapter Excerpt</span>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#000825] mb-2 font-mono">
                Table of Contents
              </h4>
              <div className="space-y-1.5 max-h-96 overflow-y-auto pr-1 text-xs divide-y divide-slate-100">
                {(book.tableOfContents || []).map((part: any, pIdx: number) => (
                  <div key={part.partNumber || pIdx} className="pt-2 first:pt-0">
                    <span className="font-bold text-[#1D4ED8] block text-[11px] font-mono">
                      {part.partNumber || `Part 0${pIdx + 1}`}: {part.title}
                    </span>
                    <div className="pl-2 mt-1 space-y-1">
                      {(part.chapters || []).map((ch: any) => (
                        <div
                          key={ch.title}
                          className="text-slate-600 hover:text-[#1D4ED8] cursor-pointer flex justify-between text-[11px] py-0.5"
                        >
                          <span className="truncate pr-2">{ch.title}</span>
                          <span className="text-slate-400 font-mono shrink-0">p.{ch.page}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 text-xs">
              <span className="text-slate-400 block text-[10px] uppercase font-mono font-semibold">Author Attribution</span>
              <strong className="text-[#000825] block mt-0.5">{book.authorName}</strong>
              <span className="text-[11px] text-slate-500">{book.authorCredentials}</span>
            </div>
          </aside>
        )}

        {/* Center Reader Pages Canvas */}
        <main className="flex-1 min-w-0 flex flex-col items-center">
          <div
            className={`w-full transition-all duration-300 rounded-2xl p-6 sm:p-10 shadow-xs border ${
              themeMode === 'light'
                ? 'bg-white text-slate-900 border-slate-200'
                : themeMode === 'sepia'
                ? 'bg-[#FAF4EB] text-[#433422] border-[#E8DFC8]'
                : 'bg-[#000825] text-white border-slate-800'
            }`}
            style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top center' }}
          >
            <div
              className={`w-full grid gap-8 ${
                viewMode === 'spread' ? 'grid-cols-1 xl:grid-cols-2' : 'grid-cols-1 max-w-3xl mx-auto'
              }`}
            >
              {/* Left Page (Page 14) */}
              <article className="flex flex-col justify-between h-full select-text pr-0 xl:pr-4">
                <div>
                  <div className="flex justify-between text-[11px] font-mono opacity-60 pb-2 mb-4 border-b border-current">
                    <span>PART 01 • STRATEGIC ARCHITECTURE</span>
                    <span>PAGE {currentPage}</span>
                  </div>

                  <span className="text-xs font-mono font-bold text-[#1D4ED8] uppercase tracking-wider block mb-1">
                    Chapter 1.2
                  </span>
                  <h2 className="font-display text-xl sm:text-2xl font-bold leading-tight mb-4">
                    Foundations of Systems Architecture & Cognitive Moats
                  </h2>
                  <p className="text-xs sm:text-sm leading-relaxed mb-4 opacity-90">
                    High-performance systems do not fail at the bidding algorithm; they fail in early boundary modeling. When architecting digital acquisition engines or production microservices, your deterministic frame of reference is established in the first layer of abstraction.
                  </p>

                  <blockquote className="p-4 rounded-xl my-4 bg-current/5 border-l-4 border-[#1D4ED8] text-xs sm:text-sm font-serif italic">
                    "Predictability is never an accident of execution. It is the tactical elimination of unexpected states before runtime commences."
                    <span className="block mt-1 font-sans not-italic text-[10px] font-bold opacity-75 font-mono">
                      — {book.authorName}, Chapter 1 Field Protocol
                    </span>
                  </blockquote>

                  <p className="text-xs sm:text-sm leading-relaxed opacity-90">
                    By deconstructing system bottlenecks, we distinguish between high-velocity heuristic responses and stateful verification pathways designed for long-term data integrity and audit readiness.
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-current/10 flex justify-between text-[10px] opacity-60 font-mono">
                  <span>GXA Career Academy Verified Monograph</span>
                  <span>Free Sample Edition • Licensed Copy</span>
                </div>
              </article>

              {/* Right Page (Page 15) in Spread mode */}
              {viewMode === 'spread' && (
                <article className="flex flex-col justify-between h-full select-text pl-0 xl:pl-4 border-t xl:border-t-0 xl:border-l border-current/10 pt-6 xl:pt-0">
                  <div>
                    <div className="flex justify-between text-[11px] font-mono opacity-60 pb-2 mb-4 border-b border-current">
                      <span>PAGE {currentPage + 1}</span>
                      <span>{book.title.slice(0, 30).toUpperCase()}</span>
                    </div>

                    <h3 className="font-display text-base font-bold mb-2">
                      Exhibit 1.4: Latency Bounds & Conversion Velocity
                    </h3>
                    <p className="text-xs leading-relaxed opacity-85 mb-4">
                      The model below plots system latency and acquisition friction against payback timelines:
                    </p>

                    {/* SVG Graphic illustration */}
                    <div className="p-4 rounded-xl bg-current/5 mb-4 flex flex-col items-center">
                      <svg className="w-full h-36" viewBox="0 0 400 140" fill="none">
                        <line x1="30" y1="20" x2="30" y2="120" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" opacity="0.3" />
                        <line x1="30" y1="120" x2="380" y2="120" stroke="currentColor" strokeWidth="1" opacity="0.3" />
                        <path d="M 30 100 C 120 95, 200 65, 370 30" stroke="#1D4ED8" strokeWidth="3" strokeLinecap="round" />
                        <path d="M 30 35 C 120 45, 220 85, 370 110" stroke="#000825" strokeWidth="2" strokeDasharray="4 4" />
                        <circle cx="210" cy="62" r="4" fill="#1D4ED8" />
                        <text x="220" y="58" fill="currentColor" fontSize="10" fontWeight="bold">Optimal Inflection Boundary</text>
                      </svg>
                      <div className="flex items-center gap-4 text-[10px] opacity-75 mt-2 font-mono">
                        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#1D4ED8]" /> Conversion Intent</span>
                        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-slate-400" /> Cost Per Result Decay</span>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-current/5 border border-current/10 text-xs leading-relaxed">
                      <strong className="text-[#1D4ED8] block mb-1 font-semibold">GXA Practical Architecture Note</strong>
                      Always enforce strict schema validation at the perimeter. Verifying payload bounds before invoking downstream database layers eliminates cascading errors and prevents silent corruption.
                    </div>
                  </div>

                  <div className="pt-6 mt-6 border-t border-current/10 flex justify-between text-[10px] opacity-60 font-mono">
                    <span>Section 1: Core Architecture</span>
                    <span>Sample Edition • GXA Career Academy</span>
                  </div>
                </article>
              )}
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <button
              onClick={handlePrevSpread}
              disabled={currentPage <= 1}
              className="px-4 py-2 bg-white text-[#000825] border border-slate-200 rounded-lg text-xs font-semibold shadow-xs hover:bg-slate-50 disabled:opacity-40 cursor-pointer flex items-center gap-1.5"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            <span className="text-xs font-semibold text-slate-500 font-mono">
              Pages <strong className="text-[#000825]">{currentPage} - {currentPage + (viewMode === 'spread' ? 1 : 0)}</strong> of {totalPreviewPages}
            </span>

            <button
              onClick={handleNextSpread}
              disabled={currentPage >= totalPreviewPages}
              className="px-4 py-2 bg-white text-[#000825] border border-slate-200 rounded-lg text-xs font-semibold shadow-xs hover:bg-slate-50 disabled:opacity-40 cursor-pointer flex items-center gap-1.5"
            >
              <span>Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </main>
      </div>

      {/* 3. STICKY BOTTOM PURCHASE BAR */}
      <div className="sticky bottom-4 z-40 w-full max-w-7xl mx-auto px-4">
        <div className="bg-[#000825] text-white rounded-2xl p-4 sm:p-5 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-4 border border-slate-800">
          <div>
            <span className="bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 px-2.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider inline-block">
              Free Sample Chapter ({totalPreviewPages} Pages)
            </span>
            <h3 className="font-display text-base font-bold text-white mt-1">
              Unlock the complete {book.pages || 400}-page master edition
            </h3>
            <p className="text-xs text-slate-400">
              Includes full chapters, printable high-res PDF, bonus code spreadsheets, and lifetime errata updates.
            </p>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <div className="text-right">
              {book.originalPrice > book.price && (
                <span className="text-xs text-slate-400 line-through">₹{book.originalPrice.toLocaleString('en-IN')}</span>
              )}
              <div className="font-display text-2xl font-bold text-white">
                ₹{book.price.toLocaleString('en-IN')}
              </div>
            </div>

            <button
              onClick={() => {
                addToCart({
                  id: book.id,
                  type: 'ebook',
                  title: book.title,
                  price: book.price,
                  originalPrice: book.originalPrice,
                  image: book.coverImage,
                  authorOrInstructor: book.authorName,
                  slug: book.slug,
                });
                navigateTo('/cart');
              }}
              className="px-6 py-2.5 bg-[#1D4ED8] hover:bg-[#1E40AF] text-white rounded-lg text-xs font-bold transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
            >
              <Zap className="w-4 h-4 text-cyan-300" />
              <span>Purchase Full Edition</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
