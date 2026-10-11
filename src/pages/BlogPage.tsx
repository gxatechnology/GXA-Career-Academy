import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { BLOG_POSTS } from '../data/mockData';
import { BookOpen, Calendar, Clock, ArrowRight, Search, Tag } from 'lucide-react';

export const BlogPage: React.FC = () => {
  const { navigateTo } = useApp();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Prompt Engineering', 'Marketing Strategy', 'Career Guidance'];

  const filtered = BLOG_POSTS.filter((post) => {
    const text = post.summary || post.excerpt || '';
    const matchCat = selectedCategory === 'All' || post.category.toLowerCase().includes(selectedCategory.toLowerCase());
    const matchSearch = post.title.toLowerCase().includes(search.toLowerCase()) || text.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="bg-[#000825] text-white min-h-screen py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5" /> GXA Knowledge Journal
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight">
            Latest Educational Articles & Insights
          </h1>
          <p className="text-white/70 text-base md:text-lg">
            Deep-dive technical perspectives, marketing case studies, and career strategies authored by GXA technologists.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-[#101F45]/60 p-4 rounded-2xl border border-white/10">
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search articles by title, keyword..."
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-xs md:text-sm text-white placeholder-white/40 focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setSelectedCategory(c)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                  selectedCategory === c
                    ? 'bg-cyan-500 text-slate-950 font-bold'
                    : 'bg-white/5 hover:bg-white/10 text-white/70'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filtered.map((post) => (
            <article
              key={post.slug}
              onClick={() => navigateTo(`/blog/${post.slug}`)}
              className="bg-[#101F45]/60 border border-white/10 rounded-3xl overflow-hidden hover:border-cyan-500/40 transition-all flex flex-col justify-between cursor-pointer group shadow-xl"
            >
              <div>
                <div className="aspect-video w-full overflow-hidden relative">
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-[#000825]/80 backdrop-blur-md px-2.5 py-1 rounded text-[11px] font-semibold text-cyan-400 border border-white/10">
                    {post.category}
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-4 text-[11px] text-white/50 mb-3">
                    <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {post.date}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {post.readTime}</span>
                  </div>

                  <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors mb-3 leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-xs text-white/60 line-clamp-3 leading-relaxed">
                    {post.summary || post.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-white/5 mt-4 flex items-center justify-between text-xs">
                <span className="text-white/50 font-medium">By {post.author}</span>
                <span className="text-cyan-400 font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Read Article <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};
