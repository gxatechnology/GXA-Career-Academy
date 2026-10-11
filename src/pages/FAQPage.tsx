import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { HelpCircle, ChevronDown, ChevronUp, Search, MessageSquare } from 'lucide-react';
import { FAQ_ITEMS } from '../data/mockData';
import { EmptyStateIllustration } from '../components/EducationalGraphics';

export const FAQPage: React.FC = () => {
  const { navigateTo } = useApp();
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'eBooks & Digital Library', 'Courses & Learning', 'Payments & Security', 'Refunds & Guarantees'];

  const filtered = FAQ_ITEMS.filter((item) => {
    const matchCat = activeCategory === 'All' || item.category === activeCategory;
    const matchSearch = item.question.toLowerCase().includes(search.toLowerCase()) || item.answer.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="bg-[#000825] text-white min-h-screen py-12 md:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5" /> Support Centre
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-white/70 text-base">
            Everything you need to know about eBook deliveries, course lifetime access, Razorpay payments, and GST invoicing.
          </p>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 text-white/40 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search questions (e.g., download PDF, refund policy, GST bill)..."
            className="w-full bg-[#101F45]/70 border border-white/10 rounded-2xl pl-12 pr-4 py-3 text-sm text-white focus:outline-none focus:border-cyan-400"
          />
        </div>

        {/* Categories Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActiveCategory(c)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                activeCategory === c
                  ? 'bg-cyan-500 text-slate-950 font-bold'
                  : 'bg-white/5 hover:bg-white/10 text-white/70'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Accordion FAQ Items */}
        {filtered.length === 0 ? (
          <div className="bg-[#101F45]/40 border border-white/10 rounded-2xl p-8 text-center shadow-lg">
            <EmptyStateIllustration
              title="No answers match your search"
              description="Try searching with other terms such as 'download', 'refund', 'certificate', or 'UPI'."
              className="text-white"
            />
            <button
              onClick={() => { setSearch(''); setActiveCategory('All'); }}
              className="mt-4 px-5 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-xl text-xs transition-colors cursor-pointer"
            >
              Reset Search & Filters
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div
                  key={idx}
                  className="bg-[#101F45]/60 border border-white/10 rounded-2xl overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                    className="w-full text-left p-6 flex items-center justify-between gap-4 font-bold text-base text-white hover:text-cyan-300 transition-colors"
                  >
                    <span>{faq.question}</span>
                    {isOpen ? <ChevronUp className="w-5 h-5 text-cyan-400 shrink-0" /> : <ChevronDown className="w-5 h-5 text-white/40 shrink-0" />}
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 text-sm text-white/70 leading-relaxed border-t border-white/5 pt-4">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Still Have Questions CTA */}
        <div className="bg-gradient-to-r from-primary-950/80 to-indigo-950/80 border border-white/10 rounded-3xl p-8 text-center space-y-4">
          <h3 className="text-xl font-bold text-white">Still have questions?</h3>
          <p className="text-xs text-white/60 max-w-md mx-auto">
            Our student experience and technical team is ready to assist you round the clock.
          </p>
          <button
            onClick={() => navigateTo('/contact')}
            className="px-6 py-2.5 bg-primary-600 hover:bg-primary-500 rounded-xl text-xs font-bold text-white transition-colors"
          >
            Contact Customer Support
          </button>
        </div>
      </div>
    </div>
  );
};
