import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import {
  BookOpen,
  Search,
  SlidersHorizontal,
  ArrowRight,
  Eye,
  ShoppingCart,
  ShieldCheck,
  CheckCircle2,
  RotateCcw,
  LayoutGrid,
  List,
  Star,
  Download,
  FileText,
  Clock,
  Sparkles,
  ChevronRight,
} from 'lucide-react';
import { EmptyStateIllustration, EBookReaderIllustration } from '../components/EducationalGraphics';
import { DigitalMarketingMasteryCover } from '../components/BookCoverVector';

export const EBooksPage: React.FC<{ categoryFilter?: string }> = ({ categoryFilter }) => {
  const { ebooks, navigateTo, addToCart } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>(categoryFilter || 'all');
  const [priceMax, setPriceMax] = useState<number>(1000);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<string>('popularity');

  const categories = [
    { label: 'All Disciplines', value: 'all', count: ebooks.filter((b) => b.status === 'published').length },
    {
      label: 'Digital Marketing',
      value: 'Digital Marketing',
      count: ebooks.filter((b) => b.status === 'published' && b.category === 'Digital Marketing').length,
    },
    {
      label: 'Artificial Intelligence',
      value: 'Artificial Intelligence',
      count: ebooks.filter((b) => b.status === 'published' && b.category === 'Artificial Intelligence').length,
    },
    {
      label: 'Career Development',
      value: 'Career Development',
      count: ebooks.filter((b) => b.status === 'published' && b.category === 'Career Development').length,
    },
  ];

  const filteredEBooks = useMemo(() => {
    return ebooks
      .filter((book) => {
        // Status draft check: hide draft books from general purchase
        if (book.status !== 'published') return false;

        // Category check
        if (selectedCategory !== 'all' && book.category !== selectedCategory && book.categorySlug !== selectedCategory) {
          return false;
        }

        // Price check
        if (book.price > priceMax) return false;

        // Search check
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchTitle = book.title.toLowerCase().includes(q);
          const matchAuthor = (book.authorName || book.author || '').toLowerCase().includes(q);
          const matchCat = book.category.toLowerCase().includes(q);
          const matchDesc = (book.description || book.shortDescription || '').toLowerCase().includes(q);
          if (!matchTitle && !matchAuthor && !matchCat && !matchDesc) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
        return (b.reviewsCount || 0) - (a.reviewsCount || 0);
      });
  }, [ebooks, selectedCategory, priceMax, searchQuery, sortBy]);

  const resetFilters = () => {
    setSelectedCategory('all');
    setPriceMax(1000);
    setSearchQuery('');
    setSortBy('popularity');
  };

  const hasActiveFilters = selectedCategory !== 'all' || priceMax < 1000 || searchQuery !== '' || sortBy !== 'popularity';

  return (
    <div className="flex flex-col w-full bg-[#F9FAF7] text-[#121E17] pb-24">
      {/* 1. EDITORIAL HEADER */}
      <section className="bg-gradient-to-b from-[#F2F6F3] to-[#F9FAF7] border-b border-[#E2E8E4] py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#EA580C] mb-2 font-mono">
                <span className="bg-orange-100/70 text-[#C2410C] px-2.5 py-0.5 rounded-full border border-orange-200">GXA Publishing Press</span>
                <span className="text-slate-300">/</span>
                <span className="text-[#52635B] font-sans">Engineering &amp; Strategy Monographs</span>
              </div>
              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#072118] tracking-tight leading-tight">
                Curated Technical Monographs &amp; Architecture Guides
              </h1>
              <p className="text-sm sm:text-base text-[#52635B] mt-3 leading-relaxed">
                Authored directly by industry founders and advisory leads. High-signal field guides containing verified code implementations, system architecture diagrams, and field-tested standard operating procedures.
              </p>

              {/* Quick Search */}
              <div className="mt-8 max-w-xl relative">
                <div className="flex items-center bg-white rounded-xl border border-[#CBD5CD] shadow-sm px-3.5 py-2.5 focus-within:border-[#EA580C] focus-within:ring-2 focus-within:ring-orange-200 transition-all">
                  <Search className="w-5 h-5 text-[#85988F] shrink-0" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by publication title, author, framework, or chapter topic..."
                    className="w-full bg-transparent px-3 text-xs sm:text-sm text-[#072118] placeholder-[#85988F] focus:outline-none"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="text-xs text-[#85988F] hover:text-[#072118] font-mono px-2 cursor-pointer"
                    >
                      Clear
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 hidden lg:flex justify-end">
              <div className="w-full max-w-sm rounded-2xl overflow-hidden shadow-lg border border-[#E2E8E4] bg-white p-2">
                <EBookReaderIllustration className="w-full h-auto" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. DISCOVERY & FILTERING BAR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <div className="bg-white rounded-2xl border border-[#E2E8E4] p-5 shadow-sm space-y-4">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-[#F0F4F1] pb-4">
            {/* Discipline Categories */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0 scrollbar-none">
              {categories.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => setSelectedCategory(cat.value)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                    selectedCategory === cat.value
                      ? 'bg-[#072118] text-white shadow-xs'
                      : 'bg-[#F1F5F2] hover:bg-[#E2E8E4] text-[#121E17]'
                  }`}
                >
                  {cat.label} ({cat.count})
                </button>
              ))}
            </div>

            {/* Sort & View Mode */}
            <div className="flex items-center justify-between lg:justify-end gap-3 shrink-0">
              <span className="text-xs text-[#52635B] font-mono">
                {filteredEBooks.length} {filteredEBooks.length === 1 ? 'Title' : 'Titles'}
              </span>

              <div className="flex items-center gap-2">
                <span className="text-xs text-[#52635B] hidden sm:inline">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-[#F8FAF8] border border-[#CBD5CD] rounded-lg text-xs font-semibold text-[#121E17] px-3 py-1.5 focus:outline-none focus:border-[#EA580C] cursor-pointer"
                >
                  <option value="popularity">Popularity (Most Read)</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>

              {/* Grid / List Switcher */}
              <div className="flex items-center bg-[#F1F5F2] p-1 rounded-lg">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded transition-colors cursor-pointer ${
                    viewMode === 'grid' ? 'bg-white text-[#EA580C] shadow-xs' : 'text-[#52635B] hover:text-[#072118]'
                  }`}
                  title="Grid View"
                >
                  <LayoutGrid className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 rounded transition-colors cursor-pointer ${
                    viewMode === 'list' ? 'bg-white text-[#EA580C] shadow-xs' : 'text-[#52635B] hover:text-[#072118]'
                  }`}
                  title="List View"
                >
                  <List className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Secondary Controls: Price Ceiling Slider */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-1 text-xs">
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <span className="text-[#52635B] font-medium">Price Ceiling:</span>
              <input
                type="range"
                min="199"
                max="1000"
                step="50"
                value={priceMax}
                onChange={(e) => setPriceMax(Number(e.target.value))}
                className="w-32 sm:w-44 accent-[#EA580C] cursor-pointer"
              />
              <span className="font-mono font-bold text-[#072118]">Under ₹{priceMax}</span>
            </div>

            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="text-xs text-[#EA580C] hover:underline flex items-center gap-1 font-semibold cursor-pointer ml-auto"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Filters</span>
              </button>
            )}
          </div>
        </div>

        {/* 3. CATALOG LISTINGS */}
        {filteredEBooks.length === 0 ? (
          <div className="bg-white rounded-2xl border border-[#E2E8E4] p-8 sm:p-12 text-center my-8 shadow-xs">
            <EmptyStateIllustration
              title="No publications match your criteria"
              description="Try adjusting your category selection or increasing the price ceiling to view all monographs."
            />
            <button
              onClick={resetFilters}
              className="mt-4 px-5 py-2.5 bg-[#072118] text-white rounded-lg text-xs font-semibold hover:bg-[#0D3829] transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 my-8">
            {filteredEBooks.map((book) => {
              const discountPct = Math.round(((book.originalPrice - book.price) / book.originalPrice) * 100);

              return (
                <article
                  key={book.id}
                  className="bg-white rounded-2xl border border-[#E2E8E4] hover:border-emerald-300 hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group"
                >
                  <div className="p-6">
                    {/* Perspective Book Cover Stage */}
                    <div
                      onClick={() => navigateTo(`/ebooks/${book.slug}`)}
                      className="relative w-full aspect-[4/5] rounded-xl overflow-hidden bg-[#F4F7F4] border border-[#E2E8E4] flex items-center justify-center p-4 cursor-pointer group-hover:bg-[#EBF2EC] transition-colors"
                    >
                      {book.id === 'digital-marketing-mastery' ? (
                        <div className="h-full aspect-[3/4] shadow-md rounded-r-md group-hover:scale-103 transition-transform duration-300 overflow-hidden">
                          <DigitalMarketingMasteryCover
                            title={book.title}
                            authorName={book.authorName}
                            pages={book.pages}
                            edition={book.edition}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ) : (
                        <img
                          src={book.coverImage}
                          alt={book.title}
                          className="h-full object-contain shadow-md rounded-r-md group-hover:scale-103 transition-transform duration-300"
                        />
                      )}

                      {/* Top Badges */}
                      <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                        <span className="px-2 py-0.5 rounded bg-[#072118] text-white text-[10px] font-mono uppercase tracking-wider">
                          {book.edition?.split(' ')[0] || '2026'} Edition
                        </span>
                      </div>

                      {discountPct > 0 && (
                        <div className="absolute top-3 right-3 bg-[#059669] text-white px-2 py-0.5 rounded text-[10px] font-mono font-semibold">
                          SAVE {discountPct}%
                        </div>
                      )}

                      <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-sm text-[#072118] px-2 py-0.5 rounded text-[11px] font-medium border border-[#E2E8E4]">
                        {book.pages || 400} Pages
                      </div>
                    </div>

                    {/* Book Metadata */}
                    <div className="space-y-2.5 mt-5">
                      <div className="flex items-center justify-between text-[11px] font-mono text-[#059669]">
                        <span className="font-semibold uppercase tracking-wider">{book.category}</span>
                        <span className="text-amber-600 font-sans font-semibold flex items-center gap-0.5">
                          ★ {book.rating || 4.9}
                        </span>
                      </div>

                      <h2
                        onClick={() => navigateTo(`/ebooks/${book.slug}`)}
                        className="font-display text-base font-bold text-[#072118] hover:text-[#EA580C] transition-colors cursor-pointer leading-snug line-clamp-2"
                      >
                        {book.title}
                      </h2>

                      <div className="text-xs text-[#52635B]">
                        <span className="font-semibold text-[#072118]">By {book.authorName || book.author}</span>
                        {book.authorCredentials && (
                          <span className="block text-[11px] text-[#85988F] mt-0.5">
                            {book.authorCredentials}
                          </span>
                        )}
                      </div>

                      <p className="text-xs text-[#52635B] line-clamp-2 leading-relaxed pt-1">
                        {book.description || book.shortDescription}
                      </p>
                    </div>
                  </div>

                  {/* Pricing & Actions */}
                  <div className="p-6 pt-0 border-t border-[#F0F4F1] mt-auto">
                    <div className="flex items-baseline justify-between py-4">
                      <div>
                        <span className="font-display text-2xl font-bold text-[#072118]">
                          ₹{book.price.toLocaleString('en-IN')}
                        </span>
                        {book.originalPrice > book.price && (
                          <span className="text-xs text-[#85988F] line-through ml-2">
                            ₹{book.originalPrice.toLocaleString('en-IN')}
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] font-mono text-[#52635B] bg-[#EBF2EC] px-2 py-0.5 rounded">
                        DRM-Free PDF
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => navigateTo(`/ebooks/${book.slug}/preview`)}
                        className="py-2.5 px-3 bg-[#F1F5F2] hover:bg-[#E2E8E4] text-[#072118] rounded-lg text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5 text-[#52635B]" />
                        <span>Look Inside</span>
                      </button>
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
                        className="py-2.5 px-3 bg-[#EA580C] hover:bg-[#C2410C] text-white rounded-lg text-xs font-semibold transition-colors flex items-center justify-center gap-1 cursor-pointer shadow-sm"
                      >
                        <ShoppingCart className="w-3.5 h-3.5" />
                        <span>Get eBook</span>
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          /* List Mode */
          <div className="space-y-4 my-8">
            {filteredEBooks.map((book) => {
              const discountPct = Math.round(((book.originalPrice - book.price) / book.originalPrice) * 100);

              return (
                <article
                  key={book.id}
                  className="bg-white rounded-2xl border border-[#E2E8E4] hover:border-emerald-300 p-6 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6 transition-all"
                >
                  <div className="flex items-start gap-5">
                    {book.id === 'digital-marketing-mastery' ? (
                      <div
                        onClick={() => navigateTo(`/ebooks/${book.slug}`)}
                        className="w-24 h-32 rounded-lg border border-[#E2E8E4] shadow-sm cursor-pointer shrink-0 overflow-hidden"
                      >
                        <DigitalMarketingMasteryCover
                          title={book.title}
                          authorName={book.authorName}
                          pages={book.pages}
                          edition={book.edition}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <img
                        src={book.coverImage}
                        alt={book.title}
                        onClick={() => navigateTo(`/ebooks/${book.slug}`)}
                        className="w-24 h-32 object-cover rounded-lg border border-[#E2E8E4] shadow-sm cursor-pointer shrink-0"
                      />
                    )}
                    <div className="space-y-1.5 max-w-xl">
                      <div className="flex items-center gap-2 text-xs font-mono text-[#059669]">
                        <span className="font-semibold uppercase tracking-wider">{book.category}</span>
                        <span>·</span>
                        <span className="text-[#52635B]">{book.pages || 400} Pages</span>
                        <span>·</span>
                        <span className="text-amber-600 font-sans font-semibold">★ {book.rating || 4.9}</span>
                      </div>
                      <h2
                        onClick={() => navigateTo(`/ebooks/${book.slug}`)}
                        className="font-display text-base font-bold text-[#072118] hover:text-[#EA580C] transition-colors cursor-pointer leading-snug"
                      >
                        {book.title}
                      </h2>
                      <p className="text-xs text-[#072118] font-medium">
                        By {book.authorName} {book.authorCredentials && `· ${book.authorCredentials}`}
                      </p>
                      <p className="text-xs text-[#52635B] line-clamp-2 leading-relaxed">
                        {book.description || book.shortDescription}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row md:flex-col items-end gap-3 shrink-0 w-full md:w-auto border-t md:border-t-0 pt-4 md:pt-0">
                    <div>
                      <span className="font-display text-2xl font-bold text-[#072118]">
                        ₹{book.price.toLocaleString('en-IN')}
                      </span>
                      {book.originalPrice > book.price && (
                        <span className="text-xs text-[#85988F] line-through ml-2">
                          ₹{book.originalPrice.toLocaleString('en-IN')}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2 w-full sm:w-auto">
                      <button
                        onClick={() => navigateTo(`/ebooks/${book.slug}/preview`)}
                        className="py-2 px-3.5 bg-[#F1F5F2] hover:bg-[#E2E8E4] text-[#072118] rounded-lg text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Look Inside</span>
                      </button>
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
                        className="py-2 px-4 bg-[#EA580C] hover:bg-[#C2410C] text-white rounded-lg text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                      >
                        <ShoppingCart className="w-3.5 h-3.5" />
                        <span>Get eBook</span>
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* 4. EDITORIAL PUBLISHING SPECIFICATIONS CALLOUT */}
        <div className="bg-[#072118] text-white rounded-3xl p-8 sm:p-10 border border-[#0D3829] flex flex-col lg:flex-row items-center justify-between gap-8 my-12 shadow-xl">
          <div className="space-y-3 max-w-xl">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#34D399]">
              GXA Technology Publishing Standard
            </span>
            <h3 className="font-display text-xl sm:text-2xl font-bold text-white tracking-tight">
              Looking to Reference Complete Syllabi or Course Curriculums?
            </h3>
            <p className="text-xs sm:text-sm text-emerald-100/70 leading-relaxed">
              Every monograph corresponds to live cohorts and deep-dive sandboxes taught directly by the authoring faculty.
            </p>
            <div className="pt-2">
              <button
                onClick={() => navigateTo('/courses')}
                className="px-6 py-3 bg-[#EA580C] hover:bg-[#C2410C] text-white rounded-lg text-xs font-semibold transition-colors flex items-center gap-2 cursor-pointer shadow-sm"
              >
                <span>Explore Applied Courses</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="w-full lg:w-80 shrink-0">
            <EBookReaderIllustration className="w-full h-auto drop-shadow-lg" />
          </div>
        </div>
      </section>
    </div>
  );
};
