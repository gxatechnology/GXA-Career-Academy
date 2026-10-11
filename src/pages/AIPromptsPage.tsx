import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { AI_PROMPTS } from '../data/mockData';
import { Terminal, Copy, Check, Search, Filter, Sparkles, BookOpen } from 'lucide-react';

export const AIPromptsPage: React.FC = () => {
  const { showToast } = useApp();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = ['All', 'Coding', 'Marketing', 'Education', 'Career Guidance', 'Data Analysis'];

  const filtered = AI_PROMPTS.filter((p) => {
    const matchesCategory = selectedCategory === 'All' || p.category.toLowerCase().includes(selectedCategory.toLowerCase());
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase()) || p.description.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    showToast('Prompt copied to clipboard! 📋');
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <div className="bg-[#000825] text-white min-h-screen py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
            <Terminal className="w-3.5 h-3.5" />
            Prompt Architecture
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight">
            Curated AI Prompt Library
          </h1>
          <p className="text-white/70 text-sm md:text-base">
            Copy battle-tested prompt templates designed for high-precision outputs across ChatGPT, Claude, and Gemini.
          </p>
        </div>

        {/* Search & Categories Bar */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-[#101F45]/70 p-4 rounded-2xl border border-white/10">
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search prompt templates..."
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-xs md:text-sm text-white placeholder-white/40 focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setSelectedCategory(c)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                  selectedCategory === c
                    ? 'bg-cyan-500 text-slate-950 shadow-md font-bold'
                    : 'bg-white/5 hover:bg-white/10 text-white/70'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Prompt Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item) => {
            const isCopied = copiedId === item.id;
            return (
              <div
                key={item.id}
                className="bg-[#101F45]/60 border border-white/10 rounded-2xl p-6 flex flex-col justify-between hover:border-cyan-500/40 transition-all shadow-lg"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded bg-white/5 text-cyan-300 border border-white/10">
                      {item.category}
                    </span>
                    <span className="text-[10px] text-white/40">{item.copiesCount} uses</span>
                  </div>

                  <h3 className="text-base font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-xs text-white/60 mb-4">{item.description}</p>

                  <div className="relative bg-black/40 border border-white/10 rounded-xl p-3.5 text-xs font-mono text-cyan-200/90 whitespace-pre-wrap leading-relaxed max-h-48 overflow-y-auto mb-4">
                    {item.promptText}
                  </div>
                </div>

                <div className="pt-2 border-t border-white/10 flex items-center justify-between">
                  <div className="flex flex-wrap gap-1.5">
                    {item.tags.map((tag) => (
                      <span key={tag} className="text-[10px] text-white/40 bg-white/5 px-2 py-0.5 rounded">
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => handleCopy(item.id, item.promptText)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                      isCopied
                        ? 'bg-emerald-500 text-white'
                        : 'bg-primary-600 hover:bg-primary-500 text-white shadow'
                    }`}
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-3.5 h-3.5" /> Copied
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" /> Copy Prompt
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
