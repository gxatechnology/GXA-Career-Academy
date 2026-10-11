import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { AUTHORS_DATA, BLOG_POSTS, FREE_RESOURCES, GXA_LOGO_URL } from '../data/mockData';
import { AcademicSeal } from '../components/AcademicSeal';
import {
  AIModelNeuralIllustration,
  AcademicDiplomaIllustration,
  CodeArchitectureIllustration,
  GrowthMarketingFunnelIllustration,
  EBookReaderIllustration,
} from '../components/EducationalGraphics';
import { GXALogoWithTagline } from '../components/GXALogo';
import { DigitalMarketingMasteryCover } from '../components/BookCoverVector';

export const HomePage: React.FC = () => {
  const { navigateTo, addToCart, ebooks, courses } = useApp();
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [selectedExcerptBookId, setSelectedExcerptBookId] = useState<string>('digital-marketing-mastery');

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const categories = [
    { name: 'Artificial Intelligence', icon: 'smart_toy', count: '18 Titles', path: '/ebooks/category/artificial-intelligence' },
    { name: 'Digital Marketing', icon: 'campaign', count: '14 Titles', path: '/ebooks/category/digital-marketing' },
    { name: 'Prompt Engineering', icon: 'terminal', count: '12 Titles', path: '/ai-learning/prompts' },
    { name: 'Career Development', icon: 'trending_up', count: '9 Titles', path: '/career-guidance' },
    { name: 'Programming & Web', icon: 'code', count: '22 Modules', path: '/courses' },
    { name: 'Data Science & ML', icon: 'database', count: '15 Modules', path: '/courses' },
    { name: 'Business & Leadership', icon: 'storefront', count: '11 Titles', path: '/ebooks' },
    { name: 'Technical Communication', icon: 'record_voice_over', count: '8 Titles', path: '/resources' },
    { name: 'Cloud & Infrastructure', icon: 'cloud', count: '10 Modules', path: '/courses' },
    { name: 'Academic & Exam Prep', icon: 'school', count: '16 Kits', path: '/resources' },
  ];

  const faqs = [
    {
      q: 'How does digital delivery work upon completing purchase?',
      a: 'Deliveries are instantaneous and automated. As soon as your payment confirms through UPI or Razorpay, a secured download token is issued directly to your browser and sent to your email. You can immediately save the DRM-free PDF and ePub binaries, which also remain permanently accessible inside your Student Dashboard.'
    },
    {
      q: 'Who authors the technical monographs and curriculum on GXA Career Academy?',
      a: 'Every monograph, syllabus, and repository is authored directly by practicing software engineers, technical architects (such as Tauqeer Ashraf, MCA), and academic researchers (such as Dr. Revant Gautam). We do not aggregate generic syndicated content or unvetted third-party courses.'
    },
    {
      q: 'Which payment methods are accepted for customers across India?',
      a: 'We support all major Indian digital payment rails through Razorpay, including instant UPI (Google Pay, PhonePe, Paytm, CRED, BHIM), RuPay, Visa, MasterCard, and Net Banking across 50+ commercial banks. For international customers, PayPal processing is available.'
    },
    {
      q: 'How does academic certificate verification function for employers?',
      a: 'Upon passing course milestones and practical assessments, students are conferred an official Certificate of Accomplishment. Each credential carries a tamper-evident serial ID and an immutable verification URL resolving to our registry at /verify/:id, enabling instantaneous verification without manual transcripts.'
    },
    {
      q: 'What is the refund policy for digital books and cohorts?',
      a: 'Due to the immediate distribution of DRM-free digital files (PDF, ePub, Notion SOPs), eBook sales are final once downloaded. For online cohorts and live bootcamps, we provide a full, unconditional refund window during the first 7 days following program kickoff.'
    }
  ];

  // Flagship book for hero spotlight
  const flagshipBook = ebooks.find((b) => b.id === 'digital-marketing-mastery') || ebooks[0];

  return (
    <div className="flex flex-col w-full max-w-full overflow-x-clip bg-[#F9FAF7] text-[#121E17]">
      {/* 1. HERO SECTION: Editorial Masterhead & Flagship Monograph */}
      <section className="relative pt-12 pb-20 border-b border-[#E2E8E4] bg-gradient-to-b from-[#F2F6F3] to-[#F9FAF7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Column: Authoritative Editorial Statement */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              <div className="flex items-center gap-2.5 text-xs font-semibold tracking-wider uppercase text-[#059669]">
                <span className="bg-[#ECFDF5] px-2.5 py-1 rounded-md border border-[#A7F3D0] text-[#047857]">GXA Technology Press</span>
                <span className="text-slate-300">/</span>
                <span className="text-[#4E5D54] font-medium">Applied Technical Education</span>
              </div>

              <h1 className="font-display text-4xl sm:text-5xl lg:text-[3.5rem] font-bold text-[#072118] tracking-tight leading-[1.12]">
                Engineering Rigor for the Modern Practitioner.
              </h1>

              <p className="text-base sm:text-lg text-[#4E5D54] max-w-2xl leading-relaxed font-normal">
                Authoritative monographs, production architecture blueprints, and applied learning cohorts authored by practicing technical architects and researchers across India.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => navigateTo('/ebooks')}
                  className="px-7 py-3.5 bg-[#EA580C] hover:bg-[#C2410C] text-white rounded-xl text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer shadow-sm hover:shadow-orange-500/20 active:scale-[0.98]"
                >
                  <span>Explore Technical Monographs</span>
                  <span className="material-symbols-outlined text-base">arrow_forward</span>
                </button>

                <button
                  onClick={() => navigateTo('/courses')}
                  className="px-7 py-3.5 bg-white text-[#072118] border border-[#059669]/40 hover:border-[#059669] hover:bg-[#ECFDF5] rounded-xl text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer shadow-2xs"
                >
                  <span className="material-symbols-outlined text-base text-[#059669]">school</span>
                  <span>View Applied Cohorts</span>
                </button>
              </div>

              {/* Trust & Delivery Credentials */}
              <div className="pt-6 border-t border-[#E2E8E4] grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-[#4E5D54]">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#ECFDF5] text-[#059669] flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-base">bolt</span>
                  </div>
                  <div>
                    <strong className="block text-[#072118] font-semibold">Instant Delivery</strong>
                    <span>Direct PDF &amp; ePub via UPI</span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#FFF7ED] text-[#EA580C] flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-base">terminal</span>
                  </div>
                  <div>
                    <strong className="block text-[#072118] font-semibold">100% Executable Code</strong>
                    <span>Verified sandbox architectures</span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#ECFDF5] text-[#059669] flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-base">verified</span>
                  </div>
                  <div>
                    <strong className="block text-[#072118] font-semibold">Verifiable Credentials</strong>
                    <span>Academic registry lookups</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Physical-Grade Book Presentation */}
            <div className="lg:col-span-5">
              {flagshipBook && (
                <div className="bg-white rounded-2xl border border-[#E2E8E4] p-6 sm:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.06)] flex flex-col gap-6 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#EA580C]/10 to-transparent rounded-bl-full pointer-events-none" />
                  
                  <div className="flex items-start justify-between gap-4 border-b border-[#F1F5F2] pb-4">
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#EA580C] bg-[#FFF7ED] px-2.5 py-0.5 rounded-full border border-[#FFEDD5] inline-block mb-1">
                        Featured Publication
                      </span>
                      <h3 className="font-display text-xl font-bold text-[#072118] mt-0.5">
                        {flagshipBook.title}
                      </h3>
                      <span className="text-xs text-[#6B7C72] font-medium">
                        By {flagshipBook.authorName}
                      </span>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="font-display text-2xl font-bold text-[#072118]">
                        ₹{flagshipBook.price}
                      </span>
                      <span className="text-xs text-slate-400 line-through block">
                        ₹{flagshipBook.originalPrice}
                      </span>
                    </div>
                  </div>

                  {/* Book Mockup Frame */}
                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-[#072118] border border-[#E2E8E4] group shadow-inner">
                    <DigitalMarketingMasteryCover
                      title={flagshipBook.title}
                      authorName={flagshipBook.authorName}
                      pages={flagshipBook.pages}
                      edition={flagshipBook.edition}
                      className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                    />
                    <div className="absolute bottom-3 left-3 bg-[#072118]/90 backdrop-blur-sm text-white px-3 py-1 rounded-lg text-xs font-medium border border-emerald-900/50 flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-sm text-[#34D399]">menu_book</span>
                      <span>{flagshipBook.pages} Pages • DRM-Free PDF + ePub</span>
                    </div>
                  </div>

                  {/* Highlights Summary */}
                  <div className="text-xs text-[#4E5D54] space-y-2">
                    <p className="line-clamp-2 leading-relaxed">
                      {flagshipBook.description}
                    </p>
                    <div className="flex flex-wrap gap-x-3 gap-y-1 pt-1 text-[11px] text-[#6B7C72] font-mono">
                      <span className="text-[#059669] font-bold">2026 Revised Edition</span>
                      <span>•</span>
                      <span>445 Pages (DRM-Free)</span>
                      <span>•</span>
                      <span>6 Parts &amp; 31 Chapters</span>
                    </div>
                  </div>

                  {/* CTA Actions */}
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <button
                      onClick={() => navigateTo(`/ebooks/${flagshipBook.slug}/preview`)}
                      className="py-2.5 px-4 bg-[#F1F5F2] hover:bg-[#E8EFEA] text-[#072118] rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer border border-[#E2E8E4]"
                    >
                      <span className="material-symbols-outlined text-base text-[#059669]">menu_book</span>
                      <span>Read Sample</span>
                    </button>

                    <button
                      onClick={() =>
                        addToCart({
                          id: flagshipBook.id,
                          type: 'ebook',
                          title: flagshipBook.title,
                          price: flagshipBook.price,
                          originalPrice: flagshipBook.originalPrice,
                          image: flagshipBook.coverImage,
                          authorOrInstructor: flagshipBook.authorName,
                          slug: flagshipBook.slug,
                        })
                      }
                      className="py-2.5 px-4 bg-[#EA580C] hover:bg-[#C2410C] text-white rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-sm active:scale-[0.98]"
                    >
                      <span className="material-symbols-outlined text-base">shopping_bag</span>
                      <span>Add to Cart</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 2. INSTITUTIONAL PILLARS: High-Signal Editorial Matrix */}
      <section className="py-16 bg-white border-b border-[#E2E8E4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex flex-col gap-2.5 p-4 rounded-xl hover:bg-[#F9FAF7] transition-colors border border-transparent hover:border-[#E2E8E4]">
              <span className="text-xs font-mono font-bold text-[#EA580C]">01 / METHODOLOGY</span>
              <h3 className="font-display text-lg font-bold text-[#072118]">Production-Tested Code</h3>
              <p className="text-xs sm:text-sm text-[#4E5D54] leading-relaxed font-normal">
                Every code repository, prompt architecture, and technical schema is executed and verified in clean cloud sandboxes prior to publishing.
              </p>
            </div>

            <div className="flex flex-col gap-2.5 p-4 rounded-xl hover:bg-[#F9FAF7] transition-colors border border-transparent hover:border-[#E2E8E4]">
              <span className="text-xs font-mono font-bold text-[#059669]">02 / AUTHORSHIP</span>
              <h3 className="font-display text-lg font-bold text-[#072118]">Practitioner Led</h3>
              <p className="text-xs sm:text-sm text-[#4E5D54] leading-relaxed font-normal">
                Authored by active technical architects, MCA educators, and doctorate researchers directly operating in modern engineering environments.
              </p>
            </div>

            <div className="flex flex-col gap-2.5 p-4 rounded-xl hover:bg-[#F9FAF7] transition-colors border border-transparent hover:border-[#E2E8E4]">
              <span className="text-xs font-mono font-bold text-[#EA580C]">03 / PERMANENCE</span>
              <h3 className="font-display text-lg font-bold text-[#072118]">DRM-Free Ownership</h3>
              <p className="text-xs sm:text-sm text-[#4E5D54] leading-relaxed font-normal">
                Digital publications are delivered without restrictive proprietary reader locks. Read on Kindle, iPad, Boox, Android, or desktop.
              </p>
            </div>

            <div className="flex flex-col gap-2.5 p-4 rounded-xl hover:bg-[#F9FAF7] transition-colors border border-transparent hover:border-[#E2E8E4]">
              <span className="text-xs font-mono font-bold text-[#059669]">04 / CREDENTIALS</span>
              <h3 className="font-display text-lg font-bold text-[#072118]">Verifiable Authority</h3>
              <p className="text-xs sm:text-sm text-[#4E5D54] leading-relaxed font-normal">
                Certificates are cryptographically hashed and linked to our central verification registry for instant employer auditing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. TECHNICAL MONOGRAPHS: Real Publications Catalog */}
      <section className="py-20 bg-[#F9FAF7] border-b border-[#E2E8E4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-12">
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#059669] bg-[#ECFDF5] px-2.5 py-1 rounded-md border border-[#A7F3D0]">
                GXA Publications Catalog
              </span>
              <h2 className="font-display text-3xl font-bold text-[#072118] mt-2 tracking-tight">
                Authoritative Technical Monographs
              </h2>
            </div>
            <button
              onClick={() => navigateTo('/ebooks')}
              className="text-xs font-semibold text-[#EA580C] hover:text-[#C2410C] flex items-center gap-1 cursor-pointer transition-colors"
            >
              <span>View All {ebooks.length} Titles</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>

          {/* Upgraded High-Value Book Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {ebooks.slice(0, 3).map((book) => (
              <div
                key={book.id}
                className="bg-white rounded-2xl border border-[#E2E8E4] p-6 flex flex-col justify-between hover:border-[#059669]/50 hover:shadow-[0_12px_32px_rgba(7,33,24,0.08)] hover:-translate-y-1 transition-all duration-300 shadow-xs group"
              >
                <div className="flex flex-col gap-4">
                  {/* Cover */}
                  <div
                    onClick={() => navigateTo(`/ebooks/${book.slug}`)}
                    className="relative aspect-[3/4] rounded-xl overflow-hidden bg-slate-100 border border-[#E2E8E4] cursor-pointer group shadow-sm"
                  >
                    {book.id === 'digital-marketing-mastery' ? (
                      <DigitalMarketingMasteryCover
                        title={book.title}
                        authorName={book.authorName}
                        pages={book.pages}
                        edition={book.edition}
                        className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                      />
                    ) : (
                      <img
                        src={book.coverImage}
                        alt={book.title}
                        className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                      />
                    )}
                    <div className="absolute top-2.5 left-2.5 bg-[#072118]/90 text-white px-2.5 py-0.5 rounded-md text-[10px] font-mono uppercase tracking-wider backdrop-blur-sm border border-white/10">
                      {book.category}
                    </div>
                    <div className="absolute bottom-2.5 right-2.5 bg-white/95 backdrop-blur-sm text-[#072118] px-2.5 py-0.5 rounded-md text-[11px] font-semibold border border-[#E2E8E4] shadow-xs">
                      {book.pages} Pages
                    </div>
                  </div>

                  {/* Metadata & Title */}
                  <div className="flex flex-col gap-1">
                    <span className="text-xs text-[#059669] font-bold">{book.authorName}</span>
                    <h3
                      onClick={() => navigateTo(`/ebooks/${book.slug}`)}
                      className="font-display text-base font-bold text-[#072118] group-hover:text-[#EA580C] transition-colors cursor-pointer leading-snug"
                    >
                      {book.title}
                    </h3>
                    <p className="text-xs text-[#4E5D54] line-clamp-2 mt-1 leading-relaxed">
                      {book.description}
                    </p>
                  </div>
                </div>

                {/* Pricing & Actions */}
                <div className="pt-6 border-t border-[#F1F5F2] flex flex-col gap-3">
                  <div className="flex items-baseline justify-between">
                    <div>
                      <span className="font-display text-2xl font-bold text-[#072118]">₹{book.price}</span>
                      <span className="text-xs text-slate-400 line-through ml-2">₹{book.originalPrice}</span>
                    </div>
                    <span className="text-[11px] font-mono text-emerald-800 bg-[#ECFDF5] px-2.5 py-0.5 rounded-full border border-[#A7F3D0] font-bold">
                      SAVE {Math.round(((book.originalPrice - book.price) / book.originalPrice) * 100)}%
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => navigateTo(`/ebooks/${book.slug}/preview`)}
                      className="py-2.5 px-3 bg-[#F1F5F2] hover:bg-[#E8EFEA] text-[#072118] rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-1 cursor-pointer border border-[#E2E8E4]"
                    >
                      <span className="material-symbols-outlined text-sm text-[#059669]">visibility</span>
                      <span>Sample</span>
                    </button>
                    <button
                      onClick={() =>
                        addToCart({
                          id: book.id,
                          type: 'ebook',
                          title: book.title,
                          price: book.price,
                          originalPrice: book.originalPrice,
                          image: book.coverImage,
                          authorOrInstructor: book.authorName,
                          slug: book.slug,
                        })
                      }
                      className="py-2.5 px-3 bg-[#EA580C] hover:bg-[#C2410C] text-white rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-1 cursor-pointer shadow-sm active:scale-[0.98]"
                    >
                      <span className="material-symbols-outlined text-sm">shopping_bag</span>
                      <span>Buy Now</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. CHAPTER EXCERPT INSPECTOR: Scholarly Sample Inspection */}
      <section className="py-20 bg-white border-b border-[#E2E8E4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#072118] text-white rounded-3xl p-8 sm:p-12 shadow-md border border-emerald-950 relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start relative z-10">
              <div className="lg:col-span-5 flex flex-col gap-4">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#34D399]">
                  Scholarly Sample Inspection
                </span>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight leading-snug">
                  Read an Excerpt from Our Publications
                </h3>
                <p className="text-xs sm:text-sm text-emerald-100/80 leading-relaxed">
                  We don’t believe in black-box marketing claims. Inspect real passages from our monographs before deciding to purchase.
                </p>

                {/* Book Switcher Tabs */}
                <div className="flex flex-col gap-2 pt-2">
                  {ebooks.slice(0, 3).map((book) => (
                    <button
                      key={book.id}
                      onClick={() => setSelectedExcerptBookId(book.id)}
                      className={`text-left p-3.5 rounded-xl text-xs transition-colors flex items-center justify-between cursor-pointer border ${
                        selectedExcerptBookId === book.id
                          ? 'bg-white/15 border-[#34D399] text-white font-semibold'
                          : 'bg-white/5 border-transparent text-emerald-200/60 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      <div>
                        <div className="font-medium">{book.title}</div>
                        <div className="text-[11px] text-emerald-300/70">By {book.authorName}</div>
                      </div>
                      {selectedExcerptBookId === book.id && (
                        <span className="material-symbols-outlined text-sm text-[#34D399]">arrow_forward</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Excerpt Display Panel */}
              <div className="lg:col-span-7 bg-white/10 border border-white/15 rounded-2xl p-6 sm:p-8 font-serif leading-relaxed text-slate-100 text-sm backdrop-blur-sm shadow-inner">
                {(() => {
                  const currentBook = ebooks.find((b) => b.id === selectedExcerptBookId) || flagshipBook;
                  const excerpts = currentBook.previewExcerpts;
                  return (
                    <div className="flex flex-col gap-4">
                      <div className="flex items-center justify-between border-b border-white/15 pb-3 font-sans text-xs text-emerald-200/70 font-mono">
                        <span>{excerpts?.chapter || 'Chapter Selection'}</span>
                        <span className="text-[#FB923C] font-semibold">{currentBook.category}</span>
                      </div>
                      <h4 className="font-display font-sans text-lg font-bold text-white">
                        {excerpts?.heading || currentBook.subtitle}
                      </h4>
                      {excerpts?.content?.map((paragraph, idx) => (
                        <p key={idx} className="text-xs sm:text-sm text-emerald-50/90 leading-relaxed font-sans">
                          {paragraph}
                        </p>
                      ))}
                      {excerpts?.calloutBody && (
                        <div className="bg-[#EA580C]/15 border-l-3 border-[#FB923C] p-3.5 my-2 font-sans text-xs text-orange-100 rounded-r-lg">
                          <strong className="block text-[#FED7AA] mb-1">{excerpts.calloutTitle || 'Key Architectural Law'}</strong>
                          {excerpts.calloutBody}
                        </div>
                      )}
                      <div className="pt-4 border-t border-white/15 flex items-center justify-between font-sans">
                        <span className="text-xs text-emerald-200/70">
                          Full publication available in PDF &amp; ePub.
                        </span>
                        <button
                          onClick={() => navigateTo(`/ebooks/${currentBook.slug}`)}
                          className="text-xs font-semibold text-[#FB923C] hover:text-white flex items-center gap-1 cursor-pointer"
                        >
                          <span>Complete Syllabus ({currentBook.pages}p)</span>
                          <span className="material-symbols-outlined text-sm">arrow_forward</span>
                        </button>
                      </div>
                    </div>
                  );
                })()}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. APPLIED COHORTS & COURSES: Real Practical Tracks */}
      <section className="py-20 bg-white border-b border-[#E2E8E4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#EA580C] bg-[#FFF7ED] px-2.5 py-1 rounded-md border border-[#FFEDD5]">
                Instructor-Led Programs
              </span>
              <h2 className="font-display text-3xl font-bold text-[#072118] mt-2 tracking-tight">
                High-Impact Applied Cohorts
              </h2>
            </div>
            <button
              onClick={() => navigateTo('/courses')}
              className="text-xs font-semibold text-[#059669] hover:text-[#047857] flex items-center gap-1 cursor-pointer transition-colors"
            >
              <span>Explore All {courses.length} Tracks</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>

          {/* Upgraded High-Value Course Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {courses.slice(0, 3).map((course) => (
              <div
                key={course.id}
                className="bg-white rounded-2xl border border-[#E2E8E4] p-6 flex flex-col justify-between hover:border-[#EA580C]/50 hover:shadow-[0_12px_32px_rgba(234,88,12,0.08)] hover:-translate-y-1 transition-all duration-300 shadow-xs group"
              >
                <div className="flex flex-col gap-4">
                  <div
                    onClick={() => navigateTo(`/courses/${course.slug}`)}
                    className="relative aspect-video rounded-xl overflow-hidden bg-[#072118] border border-[#E2E8E4] cursor-pointer group shadow-sm"
                  >
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                    />
                    <div className="absolute top-2.5 left-2.5 bg-[#072118]/90 text-white px-2.5 py-0.5 rounded-md text-[10px] font-mono uppercase tracking-wider backdrop-blur-sm border border-white/10">
                      {course.format}
                    </div>
                    <div className="absolute bottom-2.5 right-2.5 bg-white/95 backdrop-blur-sm text-[#072118] px-2.5 py-0.5 rounded-md text-[11px] font-semibold border border-[#E2E8E4] shadow-xs">
                      {course.durationWeeks} Weeks • {course.liveHours}h Labs
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-1.5 text-xs text-[#059669] font-bold">
                      <span className="material-symbols-outlined text-sm">school</span>
                      <span>By {course.instructorName}</span>
                    </div>
                    <h3
                      onClick={() => navigateTo(`/courses/${course.slug}`)}
                      className="font-display text-base font-bold text-[#072118] group-hover:text-[#EA580C] transition-colors cursor-pointer leading-snug"
                    >
                      {course.title}
                    </h3>
                    <p className="text-xs text-[#4E5D54] line-clamp-2 mt-1 leading-relaxed">
                      {course.description}
                    </p>
                  </div>
                </div>

                <div className="pt-6 border-t border-[#F1F5F2] flex flex-col gap-3">
                  <div className="flex items-baseline justify-between">
                    <div>
                      <span className="font-display text-2xl font-bold text-[#072118]">₹{course.price}</span>
                      <span className="text-xs text-slate-400 line-through ml-2">₹{course.originalPrice}</span>
                    </div>
                    <span className="text-[11px] font-mono text-emerald-800 bg-[#ECFDF5] px-2.5 py-0.5 rounded-full border border-[#A7F3D0] font-bold">
                      SAVE {Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100)}%
                    </span>
                  </div>

                  <button
                    onClick={() => navigateTo(`/courses/${course.slug}`)}
                    className="w-full py-3 bg-[#072118] hover:bg-[#0D3829] text-white rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-sm active:scale-[0.98]"
                  >
                    <span>View Curriculum &amp; Enroll</span>
                    <span className="material-symbols-outlined text-sm text-[#34D399]">arrow_forward</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. APPLIED AI RESEARCH WORKBENCH: Technical Frameworks Preview */}
      <section className="py-20 bg-[#F9FAF7] border-b border-[#E2E8E4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-12">
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-wider text-[#059669] bg-[#ECFDF5] px-2.5 py-1 rounded-md border border-[#A7F3D0]">
              GXA Applied Intelligence Lab
            </span>
            <h2 className="font-display text-3xl font-bold text-[#072118] mt-2 tracking-tight">
              Production LLM &amp; Prompt Engineering Toolkits
            </h2>
            <p className="text-sm text-[#4E5D54] mt-2 leading-relaxed">
              Move beyond generic chatbot queries. Master context conditioning, few-shot schemas, strict JSON validation, and multi-agent coordination.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Prompt Engineering Frameworks', desc: 'Chain-of-thought, zero-shot, few-shot conditioning, and strict JSON parse templates.', icon: 'terminal', path: '/ai-learning/prompts' },
              { title: 'Autonomous Agent Tool Calling', desc: 'ReAct loops, function binding, vector embeddings, and retrieval-augmented pipelines.', icon: 'smart_toy', path: '/ai-learning' },
              { title: 'AI for Engineering Leads', desc: 'Codebase architecture auditing, automated PR review prompts, and technical debt analysis.', icon: 'memory', path: '/ai-learning' },
              { title: 'Marketing Acquisition Models', desc: 'Algorithmic copy generation, customer psychographic personas, and landing page analysis.', icon: 'campaign', path: '/ai-learning' },
              { title: 'Academic Synthesis & Research', desc: 'Literature review extraction, paper summarization, and conceptual synthesis tools.', icon: 'school', path: '/ai-learning/assistant' },
              { title: 'Responsible AI & Data Governance', desc: 'Hallucination prevention, copyright frameworks, PII sanitization, and security guardrails.', icon: 'shield', path: '/ai-learning' },
            ].map((card) => (
              <button
                key={card.title}
                onClick={() => navigateTo(card.path)}
                className="bg-white p-6 rounded-2xl border border-[#E2E8E4] hover:border-[#059669]/50 hover:shadow-md text-left flex flex-col justify-between transition-all group cursor-pointer shadow-xs"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#F1F5F2] text-[#072118] flex items-center justify-center mb-4 group-hover:bg-[#059669] group-hover:text-white transition-colors">
                    <span className="material-symbols-outlined text-xl">{card.icon}</span>
                  </div>
                  <h4 className="font-display text-base font-bold text-[#072118] group-hover:text-[#059669] transition-colors">
                    {card.title}
                  </h4>
                  <p className="text-xs text-[#4E5D54] mt-2 leading-relaxed">{card.desc}</p>
                </div>
                <div className="pt-4 mt-4 border-t border-[#F1F5F2] flex items-center gap-1 text-xs font-semibold text-[#EA580C]">
                  <span>Access Toolkit</span>
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </div>
              </button>
            ))}
          </div>

          {/* Prompt Workbench Terminal & Neural Vector Display */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 flex justify-center">
              <AIModelNeuralIllustration className="w-full h-auto drop-shadow-lg" />
            </div>

            <div className="lg:col-span-7 bg-[#072118] text-white rounded-2xl p-6 sm:p-8 font-mono border border-emerald-950 shadow-md">
              <div className="flex items-center justify-between border-b border-emerald-900/60 pb-4 mb-4 text-xs">
                <div className="flex items-center gap-2 text-emerald-200/70">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#EA580C]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
                  <span className="ml-2 text-emerald-100">gxa-prompt-sandbox // system_spec.v2</span>
                </div>
                <span className="text-[#34D399] font-semibold">Strict JSON Schema Output</span>
              </div>

              <div className="space-y-3 text-xs leading-relaxed text-emerald-100/90">
                <p className="text-emerald-300/70">// Example Prompt Engineering Blueprint from GXA Research Manual</p>
                <div className="bg-black/40 p-4 rounded-xl border border-emerald-900/40 text-emerald-300">
                  <code>
                    SYSTEM_PROMPT: &quot;You are an enterprise systems architect. Analyze the provided microservice topology for single-point failures and return an RFC-compliant JSON object containing [failure_modes], [mitigation_matrix], and [telemetry_alarms]. Reject conversational commentary.&quot;
                  </code>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-emerald-900/60 flex flex-wrap items-center justify-between gap-4 font-sans">
                <span className="text-xs text-emerald-200/70">
                  Included in the Prompt Engineering Playbook &amp; AI Learning Hub.
                </span>
                <button
                  onClick={() => navigateTo('/ai-learning/prompts')}
                  className="px-4 py-2.5 bg-[#EA580C] text-white rounded-xl text-xs font-semibold hover:bg-[#C2410C] transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
                >
                  <span>Launch Interactive Prompts Library</span>
                  <span className="material-symbols-outlined text-sm">terminal</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. AUTHORS & ACADEMIC LEADERSHIP */}
      <section className="py-20 bg-white border-b border-[#E2E8E4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-12">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-[#059669] bg-[#ECFDF5] px-2.5 py-1 rounded-md border border-[#A7F3D0]">
              Academic &amp; Industry Leadership
            </span>
            <h2 className="font-display text-3xl font-bold text-[#072118] mt-2 tracking-tight">
              Authors &amp; Technical Specialists
            </h2>
            <p className="text-sm text-[#4E5D54] mt-2 leading-relaxed">
              Direct access to operating leads who have spent decades engineering scalable software architectures and authoring seminal monographs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {AUTHORS_DATA.map((author) => (
              <div
                key={author.id}
                className="bg-[#F9FAF7] p-8 rounded-2xl border border-[#E2E8E4] flex flex-col sm:flex-row gap-6 items-center sm:items-start hover:border-[#059669]/40 transition-colors"
              >
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden shrink-0 border border-[#E2E8E4] shadow-xs">
                  <img src={author.photoUrl} alt={author.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex flex-col gap-2 text-center sm:text-left">
                  <div>
                    <h3 className="font-display text-lg font-bold text-[#072118]">{author.name}</h3>
                    <span className="text-xs text-[#EA580C] font-semibold block">{author.title}</span>
                    <span className="text-xs text-[#6B7C72] font-mono">{author.credentials}</span>
                  </div>
                  <p className="text-xs text-[#4E5D54] leading-relaxed font-normal mt-1">
                    {author.bio}
                  </p>
                  <div className="flex items-center justify-center sm:justify-start gap-3 pt-2 text-xs font-medium text-[#072118]">
                    <span className="bg-white px-3 py-1 rounded-lg border border-[#E2E8E4] font-semibold">
                      {author.publishedBooksCount} Publications
                    </span>
                    <span className="bg-white px-3 py-1 rounded-lg border border-[#E2E8E4] font-semibold">
                      {author.experience}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. ACADEMIC VERIFICATION & CERTIFICATION STANDARDS */}
      <section className="py-20 bg-[#F9FAF7] border-b border-[#E2E8E4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 flex flex-col gap-6">
              <span className="text-xs font-bold uppercase tracking-wider text-[#059669] bg-[#ECFDF5] px-2.5 py-1 rounded-md border border-[#A7F3D0]">
                Institutional Governance
              </span>
              <h2 className="font-display text-3xl font-bold text-[#072118] tracking-tight">
                Academic Credential Verification Registry
              </h2>
              <p className="text-sm text-[#4E5D54] leading-relaxed">
                Certificates conferred by GXA Career Academy acknowledge completion of practical laboratories and milestones. Each credential carries an assigned serial identifier for institutional reference.
              </p>

              <div className="space-y-4 text-xs text-[#4E5D54]">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#ECFDF5] text-[#059669] flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-base">verified</span>
                  </div>
                  <div>
                    <strong className="block text-[#072118] font-semibold">Credential Registry Lookup</strong>
                    <span>
                      Each certificate references a unique serial identifier format mapped to <code className="bg-[#E8EFEA] px-1 py-0.5 rounded text-[11px] font-mono text-[#072118]">/verify/:certificateId</code>.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#FFF7ED] text-[#EA580C] flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-base">policy</span>
                  </div>
                  <div>
                    <strong className="block text-[#072118] font-semibold">Dual Faculty Endorsement</strong>
                    <span>
                      Signed independently by Founder Tauqeer Ashraf (MCA) and Technical Advisory Lead Dr. Revant Gautam.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#ECFDF5] text-[#059669] flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-base">military_tech</span>
                  </div>
                  <div>
                    <strong className="block text-[#072118] font-semibold">Official Academic Seal</strong>
                    <span>
                      Rendered in high-precision vector geometry with prestige emerald and terracotta security accents.
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => navigateTo('/verify')}
                  className="px-6 py-3 bg-[#072118] hover:bg-[#0D3829] text-white rounded-xl text-xs font-semibold transition-colors flex items-center gap-2 cursor-pointer w-fit shadow-sm"
                >
                  <span>Open Credential Verification Portal</span>
                  <span className="material-symbols-outlined text-sm text-[#34D399]">search</span>
                </button>
              </div>
            </div>

            {/* Academic Seal & Diploma Visual Display */}
            <div className="lg:col-span-5 flex flex-col items-center gap-6">
              <div className="w-full max-w-sm">
                <AcademicDiplomaIllustration className="w-full h-auto drop-shadow-md" />
              </div>
              <div className="bg-white p-6 rounded-2xl border border-[#E2E8E4] shadow-sm flex items-center text-left gap-4 max-w-sm w-full">
                <AcademicSeal isVerified={true} size={70} />
                <div className="space-y-0.5">
                  <h4 className="font-display font-bold text-xs text-[#072118]">
                    Academic Standards Verification
                  </h4>
                  <span className="text-[10px] font-mono text-[#6B7C72] uppercase tracking-wider block">
                    GXA Technology Standard SOP
                  </span>
                  <span className="text-[10px] text-[#059669] font-bold block">
                    Tamper-Evident Digital Record
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. FREE HIGH-UTILITY RESOURCES: Real Downloadable Toolkits */}
      <section className="py-20 bg-white border-b border-[#E2E8E4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#059669] bg-[#ECFDF5] px-2.5 py-1 rounded-md border border-[#A7F3D0]">
                Open-Access Toolkits
              </span>
              <h2 className="font-display text-3xl font-bold text-[#072118] mt-2 tracking-tight">
                Free Technical Resources
              </h2>
            </div>
            <button
              onClick={() => navigateTo('/resources')}
              className="text-xs font-semibold text-[#EA580C] hover:text-[#C2410C] flex items-center gap-1 cursor-pointer transition-colors"
            >
              <span>View All Free Downloads</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {FREE_RESOURCES.map((res) => (
              <div
                key={res.id}
                className="bg-[#F9FAF7] p-5 rounded-2xl border border-[#E2E8E4] flex flex-col justify-between group hover:border-[#059669]/50 hover:shadow-md hover:-translate-y-1 transition-all"
              >
                <div className="flex flex-col gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white border border-[#E2E8E4] flex items-center justify-center text-[#059669] group-hover:bg-[#059669] group-hover:text-white transition-colors shadow-2xs">
                    <span className="material-symbols-outlined text-xl">download</span>
                  </div>
                  <h4 className="font-display text-xs font-bold text-[#072118] leading-snug">
                    {res.title}
                  </h4>
                  <span className="text-[11px] font-mono text-[#6B7C72]">
                    {res.type} • {res.fileSize}
                  </span>
                </div>
                <button
                  onClick={() => navigateTo('/resources')}
                  className="mt-6 py-2 px-3 bg-white text-[#EA580C] border border-[#E2E8E4] group-hover:border-[#EA580C] group-hover:bg-[#FFF7ED] rounded-xl text-xs font-bold text-center transition-colors cursor-pointer shadow-2xs"
                >
                  Download Free
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. TECHNICAL ARTICLES & BLOG: Real Insights */}
      <section className="py-20 bg-[#F9FAF7] border-b border-[#E2E8E4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#EA580C] bg-[#FFF7ED] px-2.5 py-1 rounded-md border border-[#FFEDD5]">
                Editorial Perspectives
              </span>
              <h2 className="font-display text-3xl font-bold text-[#072118] mt-2 tracking-tight">
                Latest Technical Insights
              </h2>
            </div>
            <button
              onClick={() => navigateTo('/blog')}
              className="text-xs font-semibold text-[#059669] hover:text-[#047857] flex items-center gap-1 cursor-pointer transition-colors"
            >
              <span>Explore All Articles</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {BLOG_POSTS.map((post) => (
              <article
                key={post.slug}
                onClick={() => navigateTo(`/blog/${post.slug}`)}
                className="bg-white rounded-2xl border border-[#E2E8E4] overflow-hidden hover:border-[#059669]/50 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group cursor-pointer shadow-xs"
              >
                <div className="flex flex-col">
                  <div className="relative aspect-video overflow-hidden bg-slate-100 border-b border-[#E2E8E4]">
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                    />
                    <span className="absolute top-2.5 left-2.5 bg-[#072118]/90 text-white text-[10px] px-2.5 py-0.5 rounded-md font-mono uppercase tracking-wider backdrop-blur-sm border border-white/10">
                      {post.category}
                    </span>
                  </div>

                  <div className="p-6 flex flex-col gap-2">
                    <div className="flex items-center gap-3 text-xs text-[#6B7C72] font-mono">
                      <span>{post.date}</span>
                      <span>•</span>
                      <span>{post.readTime}</span>
                    </div>
                    <h3 className="font-display text-base font-bold text-[#072118] group-hover:text-[#EA580C] transition-colors leading-snug">
                      {post.title}
                    </h3>
                    <p className="text-xs text-[#4E5D54] line-clamp-3 leading-relaxed mt-1">
                      {post.excerpt}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-2 flex items-center gap-1 text-xs font-semibold text-[#EA580C]">
                  <span>Read Article</span>
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 11. FAQ ACCORDION: Direct Clarifications */}
      <section className="py-20 bg-white border-b border-[#E2E8E4]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-10">
          <div className="text-center max-w-xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-[#059669] bg-[#ECFDF5] px-2.5 py-1 rounded-md border border-[#A7F3D0]">
              Platform Inquiries
            </span>
            <h2 className="font-display text-3xl font-bold text-[#072118] mt-2 tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-sm text-[#4E5D54] mt-2 leading-relaxed">
              Clear information regarding formats, delivery protocols, credentials, and payment options.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            {faqs.map((faq, idx) => (
              <div
                key={faq.q}
                className="bg-[#F9FAF7] rounded-2xl border border-[#E2E8E4] overflow-hidden"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-6 text-left flex items-center justify-between font-display text-sm sm:text-base font-bold text-[#072118] hover:text-[#EA580C] transition-colors cursor-pointer"
                  type="button"
                >
                  <span>{faq.q}</span>
                  <span
                    className={`material-symbols-outlined text-[#EA580C] transition-transform duration-200 ${
                      activeFaq === idx ? 'rotate-180' : ''
                    }`}
                  >
                    expand_more
                  </span>
                </button>
                {activeFaq === idx && (
                  <div className="px-6 pb-6 text-xs sm:text-sm text-[#4E5D54] leading-relaxed border-t border-[#E2E8E4] pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 12. INSTITUTIONAL CALL TO ACTION: Deep Forest Editorial Finish */}
      <section className="py-20 bg-[#072118] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center gap-6">
          <div className="flex justify-center">
            <GXALogoWithTagline theme="dark" size="lg" />
          </div>

          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Learn Today. Lead Tomorrow.
          </h2>

          <p className="text-sm sm:text-base text-emerald-100/80 max-w-2xl leading-relaxed">
            Gain immediate access to verified technical publications, applied cohorts, and verifiable academic certifications engineered under GXA Technology.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={() => navigateTo('/ebooks')}
              className="px-8 py-3.5 bg-[#EA580C] hover:bg-[#C2410C] text-white rounded-xl text-sm font-semibold transition-colors flex items-center gap-2 cursor-pointer shadow-sm active:scale-[0.98]"
            >
              <span>Explore Technical Monographs</span>
              <span className="material-symbols-outlined text-base">auto_stories</span>
            </button>
            <button
              onClick={() => navigateTo('/resources')}
              className="px-8 py-3.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-sm font-semibold transition-colors flex items-center gap-2 cursor-pointer border border-white/20"
            >
              <span>Download Free Toolkits</span>
              <span className="material-symbols-outlined text-base">download</span>
            </button>
          </div>

          <div className="pt-6 border-t border-emerald-900/60 text-xs text-emerald-300/70 flex flex-wrap items-center justify-center gap-6">
            <span>Instant PDF &amp; ePub Activation</span>
            <span>•</span>
            <span>Verifiable Academic Hash</span>
            <span>•</span>
            <span>Zero Lockin DRM-Free</span>
          </div>
        </div>
      </section>
    </div>
  );
};
