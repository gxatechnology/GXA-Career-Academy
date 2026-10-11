import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  BookOpen,
  FileText,
  CheckCircle2,
  Download,
  ShoppingCart,
  ShieldCheck,
  Eye,
  ArrowRight,
  Lock,
  ChevronDown,
  ChevronUp,
  X,
  ExternalLink,
  Layers,
  Award,
  Sparkles,
  Zap,
  Clock,
  Check,
} from 'lucide-react';
import { SecurePaymentShieldIllustration } from '../components/EducationalGraphics';
import { DigitalMarketingMasteryCover } from '../components/BookCoverVector';

export const EBookDetailPage: React.FC<{ slug: string }> = ({ slug }) => {
  const { ebooks, navigateTo, addToCart } = useApp();
  const book = ebooks.find((b) => b.slug === slug) || ebooks[0];

  const [expandedTOC, setExpandedTOC] = useState<number | null>(0);
  const [showPreviewModal, setShowPreviewModal] = useState(false);

  if (!book) {
    return (
      <div className="py-24 text-center bg-[#FCFDFF] min-h-[60vh] flex flex-col items-center justify-center">
        <h2 className="font-display text-2xl font-bold text-[#000825]">Publication Not Found</h2>
        <p className="text-xs text-slate-500 mt-2">The requested monograph does not exist or has been archived.</p>
        <button
          onClick={() => navigateTo('/ebooks')}
          className="mt-6 px-6 py-2.5 bg-[#000825] text-white rounded-lg text-xs font-semibold hover:bg-[#101F45] transition-colors cursor-pointer"
        >
          Browse All Monographs
        </button>
      </div>
    );
  }

  const handleBuyNow = () => {
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
  };

  const discountPct = Math.round(((book.originalPrice - book.price) / book.originalPrice) * 100);

  return (
    <div className="flex flex-col w-full bg-[#FCFDFF] text-[#000825] pb-24">
      {/* 1. BREADCRUMB STRIP */}
      <section className="bg-[#F8FAFC] border-b border-slate-200 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between text-xs text-slate-500 font-mono">
          <div className="flex items-center gap-2 truncate pr-4">
            <button onClick={() => navigateTo('/')} className="hover:text-[#1D4ED8] transition-colors cursor-pointer">Home</button>
            <span>/</span>
            <button onClick={() => navigateTo('/ebooks')} className="hover:text-[#1D4ED8] transition-colors cursor-pointer">Monographs</button>
            <span>/</span>
            <span className="text-[#000825] font-semibold truncate font-sans">{book.title}</span>
          </div>
          <span className="shrink-0 bg-slate-200 text-slate-800 px-2 py-0.5 rounded text-[11px] font-semibold">
            {book.edition?.split(' ')[0] || '2026'} Edition
          </span>
        </div>
      </section>

      {/* 2. PRODUCT HERO (2 Columns) */}
      <section className="py-10 md:py-14 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column (5 cols): 3D Perspective Book Stage */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative w-full max-w-md p-8 bg-slate-50 rounded-3xl border border-slate-200 flex flex-col items-center shadow-xs">
              <div className="absolute top-4 left-4 z-20 flex flex-col gap-1 items-start">
                <span className="text-[#000825] text-[11px] font-bold uppercase tracking-wider flex items-center gap-1 font-mono">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#1D4ED8]" />
                  GXA Press Original
                </span>
                <span className="text-slate-500 text-[10px] font-semibold">
                  {book.edition || '2026 Revised Edition'}
                </span>
              </div>

              <div className="absolute top-4 right-4 z-20 text-slate-500 text-xs font-mono font-medium">
                <span>{book.pages || 400} Pages</span>
              </div>

              {/* Book Perspective Stage */}
              <div
                onClick={() => navigateTo(`/ebooks/${book.slug}/preview`)}
                className="my-6 py-2 relative group cursor-pointer"
              >
                <div className="relative w-60 sm:w-64 h-84 sm:h-96 rounded-r-2xl rounded-l-xs shadow-2xl overflow-hidden flex flex-col justify-between group-hover:scale-102 transition-transform duration-300 border border-black/10 bg-[#072118]">
                  {book.id === 'digital-marketing-mastery' ? (
                    <DigitalMarketingMasteryCover
                      title={book.title}
                      authorName={book.authorName}
                      pages={book.pages}
                      edition={book.edition}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <img src={book.coverImage} alt={book.title} className="w-full h-full object-cover" />
                  )}
                  <div className="absolute inset-0 bg-[#072118]/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-xs">
                    <span className="bg-white text-[#072118] px-4 py-2 rounded-lg text-xs font-bold shadow-lg flex items-center gap-1.5">
                      <Eye className="w-4 h-4 text-[#EA580C]" />
                      Look Inside ({book.previewSamplePages || 35} Pages)
                    </span>
                  </div>
                </div>
              </div>

              {/* Format Guarantee Specs */}
              <div className="w-full flex items-center justify-center gap-2 flex-wrap text-xs text-slate-700">
                <span className="bg-white px-3 py-1 rounded-lg border border-slate-200 shadow-xs flex items-center gap-1.5 font-medium">
                  <FileText className="w-3.5 h-3.5 text-red-600" /> High-Res PDF
                </span>
                <span className="bg-white px-3 py-1 rounded-lg border border-slate-200 shadow-xs flex items-center gap-1.5 font-medium">
                  <BookOpen className="w-3.5 h-3.5 text-[#1D4ED8]" /> In-Browser Reader
                </span>
                <span className="bg-white px-3 py-1 rounded-lg border border-slate-200 shadow-xs flex items-center gap-1.5 font-medium">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> DRM-Free Personal License
                </span>
              </div>

              <button
                onClick={() => navigateTo(`/ebooks/${book.slug}/preview`)}
                className="w-full mt-5 py-3 px-4 bg-white hover:bg-slate-100 text-[#1D4ED8] text-xs font-bold rounded-xl transition-all shadow-xs flex items-center justify-center gap-2 border border-slate-300 cursor-pointer"
              >
                <BookOpen className="w-4 h-4" />
                <span>Read Free Sample Chapter ({book.previewSamplePages || 35} Pages)</span>
              </button>
            </div>
          </div>

          {/* Right Column (7 cols): Editorial Info & Conversion Deck */}
          <div className="lg:col-span-7 flex flex-col justify-start space-y-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono">
                <span className="font-semibold uppercase tracking-wider text-[#1D4ED8] bg-blue-50 px-2.5 py-0.5 rounded border border-blue-200">
                  {book.category}
                </span>
                <span className="text-slate-500">·</span>
                <span className="text-slate-600 font-sans font-medium flex items-center gap-1">
                  First Print Edition • Verified Monograph
                </span>
              </div>

              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#000825] tracking-tight leading-tight">
                {book.title}
              </h1>

              {book.subtitle && (
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                  {book.subtitle}
                </p>
              )}
            </div>

            {/* Author Attribution Card */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#000825] text-cyan-400 flex items-center justify-center font-bold text-xs shadow-xs font-mono">
                  {(book.authorName || 'TA').split(' ').map(n => n[0]).join('').slice(0, 2)}
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold block font-mono">Primary Author</span>
                  <span className="text-sm font-bold text-[#000825]">{book.authorName}</span>
                  {book.authorCredentials && (
                    <span className="text-xs text-slate-500 block">{book.authorCredentials}</span>
                  )}
                </div>
              </div>

              <div className="text-xs text-slate-500 font-mono space-y-0.5">
                <div>Pages: <strong className="text-slate-800">{book.pages || 400}</strong></div>
                <div>Format: <strong className="text-slate-800">Printable PDF (14 MB)</strong></div>
              </div>
            </div>

            {/* Pricing & Checkout Deck */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-slate-100 pb-4">
                <div className="flex items-baseline gap-3">
                  <span className="font-display text-3xl sm:text-4xl font-bold text-[#000825]">
                    ₹{book.price.toLocaleString('en-IN')}
                  </span>
                  {book.originalPrice > book.price && (
                    <span className="text-sm sm:text-base text-slate-400 line-through">
                      ₹{book.originalPrice.toLocaleString('en-IN')}
                    </span>
                  )}
                  {discountPct > 0 && (
                    <span className="text-xs font-mono font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
                      SAVE {discountPct}%
                    </span>
                  )}
                </div>
                <span className="text-xs text-slate-500 font-mono">Includes Tax Invoice & Lifetime Updates</span>
              </div>

              {/* Bonus Items Notice */}
              <div className="bg-slate-50 p-3.5 rounded-xl flex items-center justify-between text-xs text-slate-700 border border-slate-200">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#1D4ED8] shrink-0" />
                  <span>Includes {book.bonusItems?.length || 1} Production Toolkits & JSON Prompt Bundles</span>
                </div>
                <span className="text-[11px] font-mono font-bold text-emerald-700 bg-emerald-100/60 px-2 py-0.5 rounded">
                  Included Free
                </span>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
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
                  }}
                  className="py-3 px-4 bg-slate-100 hover:bg-slate-200 text-[#000825] text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ShoppingCart className="w-4 h-4 text-slate-600" />
                  <span>Add to Cart</span>
                </button>
                <button
                  onClick={handleBuyNow}
                  className="py-3 px-4 bg-[#EA580C] hover:bg-[#C2410C] text-white text-xs font-semibold rounded-lg transition-colors shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Zap className="w-4 h-4 text-orange-200" />
                  <span>Instant Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="pt-2 text-xs text-slate-500 flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 font-mono text-[11px]">
                <span className="flex items-center gap-1 text-emerald-600 font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5" /> Instant Delivery & Watermark
                </span>
                <span>Gateways: UPI · Cards · NetBanking · PayPal</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. APPLIED CURRICULUM OUTCOMES */}
      <section className="py-12 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="max-w-3xl">
            <span className="text-xs font-mono uppercase tracking-wider text-[#1D4ED8] font-semibold">
              Curriculum Specifications
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#000825] mt-1">
              What You Will Master Inside This Monograph
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
              Written without generic marketing filler. Each section focuses on deterministic execution, tactical formulas, and structural architecture diagrams.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {(book.outcomes || [
              'Master core strategic frameworks designed for modern high-performance execution.',
              'Gain end-to-end tactical clarity through battle-tested real-world case studies.',
              'Download verifiable implementation templates ready for direct workplace deployment.',
              'Accelerate professional leverage and career trajectories with expert-level mastery.',
            ]).map((outcome, idx) => (
              <div key={idx} className="flex items-start gap-3.5 p-4 bg-slate-50 rounded-xl border border-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <p className="text-xs sm:text-sm text-slate-800 leading-relaxed">{outcome}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. INTERACTIVE TABLE OF CONTENTS */}
      <section className="py-12 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-[#1D4ED8] font-semibold">
                Syllabus Architecture
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#000825] mt-1">
                Complete Table of Contents
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Explore all {(book.tableOfContents || []).length} parts spanning {book.pages || 400} pages.
              </p>
            </div>
            <button
              onClick={() => navigateTo(`/ebooks/${book.slug}/preview`)}
              className="text-xs font-semibold text-[#1D4ED8] hover:underline flex items-center gap-1 font-mono cursor-pointer"
            >
              <span>Read Sample Pages Online</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {(book.tableOfContents || []).map((part: any, idx: number) => {
              const isOpen = expandedTOC === idx;

              return (
                <div key={part.partNumber || idx} className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
                  <button
                    onClick={() => setExpandedTOC(isOpen ? null : idx)}
                    className="w-full p-4 sm:p-5 flex items-center justify-between text-left hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-3 min-w-0 pr-4">
                      <span className="text-xs font-mono font-bold text-[#1D4ED8] bg-blue-50 px-2 py-0.5 rounded border border-blue-200 shrink-0">
                        {part.partNumber || `Part ${idx + 1}`}
                      </span>
                      <div>
                        <h3 className="font-display text-sm sm:text-base font-bold text-[#000825]">{part.title}</h3>
                        <span className="text-xs text-slate-500 font-mono">{part.pagesRange || `${part.chapters?.length || 4} Chapters`}</span>
                      </div>
                    </div>
                    {isOpen ? <ChevronUp className="w-4 h-4 text-slate-500 shrink-0" /> : <ChevronDown className="w-4 h-4 text-slate-500 shrink-0" />}
                  </button>

                  {isOpen && (
                    <div className="p-4 sm:p-5 pt-0 bg-slate-50 border-t border-slate-100 space-y-2 text-xs">
                      {(part.chapters || []).map((ch: any, cIdx: number) => (
                        <div key={cIdx} className="flex items-center justify-between py-2 border-b border-slate-200/60 last:border-none">
                          <span className="text-slate-800 font-medium">{ch.title}</span>
                          {ch.isPreviewAvailable ? (
                            <button
                              onClick={() => navigateTo(`/ebooks/${book.slug}/preview`)}
                              className="text-[#1D4ED8] font-semibold hover:underline font-mono shrink-0 ml-4 cursor-pointer"
                            >
                              Read Free Excerpt
                            </button>
                          ) : (
                            <span className="text-slate-400 font-mono shrink-0 ml-4">Page {ch.page}</span>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. BONUS TOOLKITS & SPECIFICATIONS */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Bonus Toolkits (7 cols) */}
          <div className="lg:col-span-7 bg-[#000825] text-white p-6 sm:p-8 rounded-2xl border border-slate-800 space-y-6">
            <div>
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-cyan-400">
                Authorized Bonus Toolkits
              </span>
              <h3 className="font-display text-xl sm:text-2xl font-bold text-white mt-1">
                Supplementary Implementation Toolkits
              </h3>
              <p className="text-xs text-slate-300 mt-1">Included inside the instant digital asset bundle with zero extra surcharge:</p>
            </div>

            <div className="space-y-3">
              {(book.bonusItems || [
                { title: 'Interactive ROI Modeling Sheet', value: 499, description: 'Pre-formulated dynamic spreadsheets to calculate lifetime customer values.' },
                { title: 'Prompt Library JSON Bundle', value: 299, description: 'Direct import file for Cursor, LangChain, and production prompt registries.' },
              ]).map((bonus, i) => (
                <div key={i} className="p-4 bg-slate-900/80 rounded-xl border border-slate-800 flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <span className="text-[10px] text-cyan-400 font-mono uppercase tracking-wider font-semibold">
                      Bonus 0{i + 1} · Value: ₹{bonus.value}
                    </span>
                    <h4 className="font-display text-sm font-bold text-white">{bonus.title}</h4>
                    <p className="text-xs text-slate-300 leading-relaxed">{bonus.description}</p>
                  </div>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-1" />
                </div>
              ))}
            </div>
          </div>

          {/* Publication Specifications (5 cols) */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="font-display text-lg font-bold text-[#072118] pb-2 border-b border-[#E2E8E4]">
              Technical Specifications & Catalog Data
            </h3>

            <div className="space-y-3 text-xs font-mono">
              <div className="flex justify-between py-1.5 border-b border-[#E2E8E4]">
                <span className="text-[#6B7C72]">Catalog Ref / ISBN:</span>
                <span className="font-bold text-[#072118] text-right">{book.specifications?.isbn || 'Pending Pre-Press Allocation'}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-[#E2E8E4]">
                <span className="text-[#6B7C72]">Publisher:</span>
                <span className="font-bold text-[#072118] text-right">{book.specifications?.publisher || 'GXA Technology Publishing, New Delhi'}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-[#E2E8E4]">
                <span className="text-[#6B7C72]">Release Edition:</span>
                <span className="font-bold text-[#072118] text-right">{book.specifications?.edition || book.edition || '2026 Revised Edition'}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-[#E2E8E4]">
                <span className="text-[#6B7C72]">Delivered Formats:</span>
                <span className="font-bold text-[#072118] text-right">{book.specifications?.formats || 'High-Res PDF + In-Browser Reader'}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-[#E2E8E4]">
                <span className="text-[#6B7C72]">Language:</span>
                <span className="font-bold text-[#072118] text-right">{book.specifications?.language || 'English'}</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-[#6B7C72]">Usage Rights:</span>
                <span className="font-bold text-[#072118] text-right">{book.specifications?.rights || 'DRM-Free Single-User License'}</span>
              </div>
            </div>

            <div className="pt-2">
              <SecurePaymentShieldIllustration className="w-full h-auto" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
