import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import {
  Search,
  Filter,
  SlidersHorizontal,
  BookOpen,
  Clock,
  Award,
  PlayCircle,
  ArrowRight,
  CheckCircle2,
  Calendar,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  RotateCcw,
} from 'lucide-react';
import {
  EmptyStateIllustration,
  CareerLadderIllustration,
  CodeArchitectureIllustration,
} from '../components/EducationalGraphics';

export const CoursesPage: React.FC<{ categoryFilter?: string }> = ({ categoryFilter }) => {
  const { courses, navigateTo, hasAccessToCourse, addToCart } = useApp();

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>(categoryFilter || 'all');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [selectedFormat, setSelectedFormat] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');

  // Categories list from actual data
  const categories = useMemo(() => {
    const set = new Set<string>();
    courses.forEach((c) => {
      if (c.category) set.add(c.category);
    });
    return Array.from(set);
  }, [courses]);

  // Filtered & Sorted Courses
  const filteredCourses = useMemo(() => {
    return courses
      .filter((course) => {
        // Search
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchesTitle = course.title.toLowerCase().includes(q);
          const matchesDesc = course.description.toLowerCase().includes(q);
          const matchesInstructor = (course.instructorName || course.instructor || '').toLowerCase().includes(q);
          const matchesSkills = course.skillsCovered?.some((s) => s.toLowerCase().includes(q));
          if (!matchesTitle && !matchesDesc && !matchesInstructor && !matchesSkills) return false;
        }

        // Category
        if (selectedCategory !== 'all') {
          if (course.category !== selectedCategory && course.categorySlug !== selectedCategory) return false;
        }

        // Difficulty Level
        if (selectedLevel !== 'all') {
          if (!course.level.toLowerCase().includes(selectedLevel.toLowerCase())) return false;
        }

        // Format
        if (selectedFormat !== 'all') {
          if (course.format !== selectedFormat) return false;
        }

        // Price Range
        if (priceRange === 'under-2000' && course.price >= 2000) return false;
        if (priceRange === '2000-3000' && (course.price < 2000 || course.price > 3000)) return false;
        if (priceRange === 'above-3000' && course.price <= 3000) return false;

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
        return 0; // Default featured order
      });
  }, [courses, searchQuery, selectedCategory, selectedLevel, selectedFormat, priceRange, sortBy]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedLevel('all');
    setSelectedFormat('all');
    setPriceRange('all');
    setSortBy('featured');
  };

  const hasActiveFilters =
    searchQuery !== '' ||
    selectedCategory !== 'all' ||
    selectedLevel !== 'all' ||
    selectedFormat !== 'all' ||
    priceRange !== 'all' ||
    sortBy !== 'featured';

  return (
    <div className="flex flex-col w-full bg-[#F9FAF7] text-[#121E17] pb-24">
      {/* 1. EDITORIAL HEADER */}
      <section className="bg-gradient-to-b from-[#F2F6F3] to-[#F9FAF7] border-b border-[#E2E8E4] py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#059669] mb-2 font-mono">
                <span className="bg-[#ECFDF5] px-2.5 py-0.5 rounded border border-[#A7F3D0]">GXA Applied Academy</span>
                <span className="text-slate-300">/</span>
                <span className="text-[#4E5D54] font-sans">Engineering Curriculum</span>
              </div>
              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#072118] tracking-tight leading-tight">
                Production Cohorts &amp; Masterclasses
              </h1>
              <p className="text-sm sm:text-base text-[#4E5D54] mt-3 leading-relaxed">
                Curriculums authored by operating software architects and IT leaders. Each track features executable sandbox code, real-world capstone blueprints, and verifiable academic certification.
              </p>

              {/* Quick Search Bar */}
              <div className="mt-8 max-w-xl relative">
                <div className="flex items-center bg-white rounded-xl border border-[#E2E8E4] shadow-xs px-3.5 py-2.5 focus-within:border-[#EA580C] focus-within:ring-1 focus-within:ring-[#EA580C] transition-all">
                  <Search className="w-5 h-5 text-[#6B7C72] shrink-0" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by topic, instructor, framework (e.g. FastAPI, pgvector)..."
                    className="w-full bg-transparent px-3 text-xs sm:text-sm text-[#072118] placeholder-[#6B7C72] focus:outline-none"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="text-xs text-[#6B7C72] hover:text-[#072118] font-mono px-2"
                    >
                      Clear
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 hidden lg:flex justify-end">
              <div className="w-full max-w-md shadow-lg rounded-2xl overflow-hidden border border-[#E2E8E4]">
                <CodeArchitectureIllustration className="w-full h-auto" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. DISCOVERY & FILTERING DECK */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <div className="bg-white rounded-2xl border border-[#E2E8E4] p-5 shadow-xs space-y-4">
          {/* Top Bar: Categories Tabs & Sort Selector */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-[#F1F5F2] pb-4">
            {/* Category Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0 scrollbar-none">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  selectedCategory === 'all'
                    ? 'bg-[#072118] text-white shadow-xs'
                    : 'bg-[#F1F5F2] hover:bg-[#E8EFEA] text-[#4E5D54]'
                }`}
              >
                All Domains ({courses.length})
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-[#072118] text-white shadow-xs'
                      : 'bg-[#F1F5F2] hover:bg-[#E8EFEA] text-[#4E5D54]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Sort & Result Count */}
            <div className="flex items-center justify-between lg:justify-end gap-3 shrink-0">
              <span className="text-xs text-[#6B7C72] font-mono">
                {filteredCourses.length} {filteredCourses.length === 1 ? 'Course' : 'Courses'}
              </span>
              <div className="flex items-center gap-2">
                <span className="text-xs text-[#6B7C72] hidden sm:inline">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e: any) => setSortBy(e.target.value)}
                  className="bg-[#F1F5F2] border border-[#E2E8E4] rounded-xl text-xs font-semibold text-[#072118] px-3 py-1.5 focus:outline-none focus:border-[#EA580C] cursor-pointer"
                >
                  <option value="featured">Featured Order</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
            </div>
          </div>

          {/* Secondary Filters: Level, Format, Price Range */}
          <div className="flex flex-wrap items-center gap-3 pt-1 text-xs">
            {/* Level Filter */}
            <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5">
              <span className="text-slate-500 font-medium">Difficulty:</span>
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="bg-transparent font-semibold text-slate-800 focus:outline-none cursor-pointer"
              >
                <option value="all">All Levels</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>

            {/* Format Filter */}
            <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5">
              <span className="text-slate-500 font-medium">Format:</span>
              <select
                value={selectedFormat}
                onChange={(e) => setSelectedFormat(e.target.value)}
                className="bg-transparent font-semibold text-slate-800 focus:outline-none cursor-pointer"
              >
                <option value="all">All Formats</option>
                <option value="Live Cohort">Live Cohorts</option>
                <option value="Self-Paced Masterclass">Self-Paced</option>
              </select>
            </div>

            {/* Price Filter */}
            <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5">
              <span className="text-slate-500 font-medium">Pricing:</span>
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="bg-transparent font-semibold text-slate-800 focus:outline-none cursor-pointer"
              >
                <option value="all">All Prices</option>
                <option value="under-2000">Under ₹2,000</option>
                <option value="2000-3000">₹2,000 – ₹3,000</option>
                <option value="above-3000">Above ₹3,000</option>
              </select>
            </div>

            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="text-xs text-[#1D4ED8] hover:underline flex items-center gap-1 ml-auto font-semibold cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset All Filters</span>
              </button>
            )}
          </div>
        </div>

        {/* 3. COURSE CATALOG GRID */}
        {filteredCourses.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-12 text-center my-8 shadow-xs">
            <EmptyStateIllustration
              title="No courses match your filter criteria"
              description="Try resetting your category or difficulty filters to browse all available engineering tracks."
            />
            <button
              onClick={resetFilters}
              className="mt-4 px-5 py-2.5 bg-[#000825] text-white rounded-lg text-xs font-semibold hover:bg-[#101F45] transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 my-8">
            {filteredCourses.map((course) => {
              const isEnrolled = hasAccessToCourse(course.id);

              // Calculate total real lesson count from modules
              const modulesCount = course.modules?.length || 0;
              const totalLessonsCount =
                course.modules?.reduce((acc, m) => acc + (m.lessons?.length || 0), 0) ||
                course.curriculum?.reduce((acc, c) => acc + (c.lessons?.length || 0), 0) ||
                0;

              return (
                <article
                  key={course.id}
                  className="bg-white rounded-2xl border border-[#E2E8E4] hover:border-[#EA580C]/40 hover:shadow-[0_12px_32px_rgba(7,33,24,0.08)] hover:-translate-y-1 transition-all duration-300 shadow-xs flex flex-col justify-between overflow-hidden group"
                >
                  <div>
                    {/* Course Media Thumbnail Frame */}
                    <div
                      onClick={() => navigateTo(`/courses/${course.slug}`)}
                      className="relative aspect-video overflow-hidden bg-[#072118] border-b border-[#E2E8E4] cursor-pointer"
                    >
                      <img
                        src={course.thumbnail}
                        alt={course.title}
                        className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                      />

                      {/* Top Badges */}
                      <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                        <span className="px-2.5 py-0.5 rounded-md bg-[#072118]/90 text-white text-[10px] font-mono uppercase tracking-wider backdrop-blur-sm border border-white/10">
                          {course.format || 'Live Cohort'}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-md bg-white/95 backdrop-blur-sm text-[#072118] text-[10px] font-bold border border-[#E2E8E4] shadow-xs">
                          {course.level}
                        </span>
                      </div>

                      {/* Enrolled Status Overlay */}
                      {isEnrolled && (
                        <div className="absolute top-3 right-3 bg-[#059669] text-white px-2.5 py-0.5 rounded-md text-[11px] font-semibold flex items-center gap-1 shadow-sm">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Enrolled</span>
                        </div>
                      )}

                      {/* Bottom Duration Badge */}
                      <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-sm text-[#072118] px-2.5 py-0.5 rounded-md text-[11px] font-semibold border border-[#E2E8E4] flex items-center gap-1 shadow-xs">
                        <Clock className="w-3.5 h-3.5 text-[#059669]" />
                        <span>{course.durationWeeks || 8} Weeks • {course.liveHours || 24}h Labs</span>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-6 space-y-3">
                      <div className="flex items-center justify-between text-[11px] font-mono text-[#059669]">
                        <span className="font-bold uppercase tracking-wider">{course.category}</span>
                        {course.language && (
                          <span className="text-[#6B7C72] font-sans">{course.language}</span>
                        )}
                      </div>

                      <h2
                        onClick={() => navigateTo(`/courses/${course.slug}`)}
                        className="font-display text-base font-bold text-[#072118] group-hover:text-[#EA580C] transition-colors cursor-pointer leading-snug line-clamp-2"
                      >
                        {course.title}
                      </h2>

                      {/* Instructor Meta */}
                      <div className="flex items-center gap-2 pt-0.5">
                        <img
                          src={course.instructorPhoto}
                          alt={course.instructorName || 'Instructor'}
                          className="w-6 h-6 rounded-full object-cover border border-[#E2E8E4]"
                        />
                        <div className="text-xs">
                          <span className="font-semibold text-[#072118]">{course.instructorName}</span>
                          <span className="text-[11px] text-[#6B7C72] block truncate max-w-[200px]">
                            {course.instructorTitle}
                          </span>
                        </div>
                      </div>

                      <p className="text-xs text-[#4E5D54] line-clamp-2 leading-relaxed pt-1">
                        {course.description}
                      </p>

                      {/* Module & Lesson Stats */}
                      <div className="pt-3 border-t border-[#F1F5F2] flex items-center justify-between text-xs text-[#6B7C72] font-mono">
                        <span>{modulesCount} Modules</span>
                        <span>•</span>
                        <span>{totalLessonsCount} Lessons</span>
                        <span>•</span>
                        <span className="flex items-center gap-0.5 text-amber-600 font-bold font-sans">
                          ★ {course.rating || 4.9}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Card Bottom / Action Deck */}
                  <div className="p-6 pt-0 mt-auto">
                    <div className="flex items-baseline justify-between border-t border-[#F1F5F2] pt-4 mb-4">
                      <div>
                        <span className="font-display text-2xl font-bold text-[#072118]">
                          ₹{course.price.toLocaleString('en-IN')}
                        </span>
                        {course.originalPrice > course.price && (
                          <span className="text-xs text-slate-400 line-through ml-2">
                            ₹{course.originalPrice.toLocaleString('en-IN')}
                          </span>
                        )}
                      </div>
                      {course.originalPrice > course.price && (
                        <span className="text-[11px] font-mono text-emerald-800 bg-[#ECFDF5] px-2.5 py-0.5 rounded-full border border-[#A7F3D0] font-bold">
                          SAVE {Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100)}%
                        </span>
                      )}
                    </div>

                    {isEnrolled ? (
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() => navigateTo(`/courses/${course.slug}`)}
                          className="py-2.5 px-3 bg-[#F1F5F2] hover:bg-[#E8EFEA] text-[#072118] rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-1 cursor-pointer border border-[#E2E8E4]"
                        >
                          <span>Syllabus</span>
                        </button>
                        <button
                          onClick={() => navigateTo(`/learn/${course.id}`)}
                          className="py-2.5 px-3 bg-[#059669] hover:bg-[#047857] text-white rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                        >
                          <PlayCircle className="w-3.5 h-3.5" />
                          <span>Continue</span>
                        </button>
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() => navigateTo(`/courses/${course.slug}`)}
                          className="py-2.5 px-3 bg-[#F1F5F2] hover:bg-[#E8EFEA] text-[#072118] rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-1 cursor-pointer border border-[#E2E8E4]"
                        >
                          <span>Syllabus</span>
                        </button>
                        <button
                          onClick={() => {
                            addToCart({
                              id: course.id,
                              type: 'course',
                              title: course.title,
                              price: course.price,
                              originalPrice: course.originalPrice,
                              image: course.thumbnail,
                              authorOrInstructor: course.instructorName,
                              slug: course.slug,
                            });
                            navigateTo('/cart');
                          }}
                          className="py-2.5 px-3 bg-[#EA580C] hover:bg-[#C2410C] text-white rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-1 cursor-pointer shadow-sm active:scale-[0.98]"
                        >
                          <span>Enroll Now</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* 4. LEARNING PATHS EDITORIAL CALLOUT BANNER */}
        <div className="bg-[#072118] text-white rounded-3xl p-8 sm:p-10 border border-[#0D3829] flex flex-col lg:flex-row items-center justify-between gap-8 my-12 shadow-xl">
          <div className="space-y-3 max-w-xl">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#34D399]">
              Structured Multi-Course Roadmap
            </span>
            <h3 className="font-display text-xl sm:text-2xl font-bold text-white tracking-tight">
              Looking for a Complete Career Transformation Path?
            </h3>
            <p className="text-xs sm:text-sm text-emerald-100/80 leading-relaxed">
              Explore sequential milestone syllabi mapping courses, monographs, and cloud sandboxes into coherent 6-month career outcomes.
            </p>
            <div className="pt-2">
              <button
                onClick={() => navigateTo('/learning-paths')}
                className="px-6 py-3 bg-[#EA580C] hover:bg-[#C2410C] text-white rounded-xl text-xs font-semibold transition-colors flex items-center gap-2 cursor-pointer shadow-sm active:scale-[0.98]"
              >
                <span>Explore Learning Pathways</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="w-full lg:w-80 shrink-0">
            <CareerLadderIllustration className="w-full h-auto drop-shadow-lg" />
          </div>
        </div>
      </section>
    </div>
  );
};
