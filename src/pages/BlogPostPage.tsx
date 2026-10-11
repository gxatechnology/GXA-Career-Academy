import React from 'react';
import { useApp } from '../context/AppContext';
import { BLOG_POSTS } from '../data/mockData';
import { ArrowLeft, Calendar, Clock, Share2, Bookmark, Check, ArrowRight } from 'lucide-react';

export const BlogPostPage: React.FC<{ slug: string }> = ({ slug }) => {
  const { navigateTo, showToast } = useApp();
  const post = BLOG_POSTS.find((p) => p.slug === slug) || BLOG_POSTS[0];

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    showToast('Article link copied to clipboard!');
  };

  return (
    <div className="bg-[#000825] text-white min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-10">
        {/* Navigation */}
        <button
          onClick={() => navigateTo('/blog')}
          className="flex items-center gap-2 text-xs font-semibold text-white/60 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Journal
        </button>

        {/* Article Header */}
        <header className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
              {post.category}
            </span>
            <span className="text-xs text-white/50 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" /> {post.date}
            </span>
            <span className="text-xs text-white/50 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> {post.readTime}
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-black text-white leading-tight">
            {post.title}
          </h1>

          <div className="flex items-center justify-between pt-4 border-t border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary-600 flex items-center justify-center font-bold text-white shadow">
                {post.author[0]}
              </div>
              <div>
                <span className="text-sm font-bold text-white block">{post.author}</span>
                <span className="text-[11px] text-white/50">GXA Research & Editorial</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleShare}
                className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 transition-colors"
                title="Share Article"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </header>

        {/* Cover Photo */}
        <div className="aspect-[21/9] w-full rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
          <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover" />
        </div>

        {/* Article Body */}
        <div className="prose prose-invert prose-cyan max-w-none text-white/80 leading-relaxed space-y-6 text-base">
          <p className="text-lg font-medium text-white/90 leading-relaxed border-l-4 border-cyan-400 pl-4 italic">
            "{post.summary || post.excerpt}"
          </p>

          <p>
            In modern technology ecosystems, deterministic outcomes depend less on raw computational power and increasingly on structured, semantic protocols. As institutions and practitioners integrate large language models and high-dimensional automation frameworks into business intelligence, systematic rigor replaces prompt guessing.
          </p>

          <h2 className="text-2xl font-bold text-white mt-8 mb-4">The Architectural Shift</h2>
          <p>
            Traditional search queries assumed keyword matching. Conversely, high-reasoning transformer architectures require hierarchical framing:
          </p>

          <ul className="list-disc list-inside space-y-2 text-white/70">
            <li><strong>Role Specification:</strong> Framing the precise persona, constraints, and vocabulary scope.</li>
            <li><strong>Task Boundary:</strong> Explicit negative constraints to eliminate hallucination vectors.</li>
            <li><strong>Few-Shot Demonstration:</strong> Grounding the expected JSON or markdown structure.</li>
            <li><strong>Reasoning Space:</strong> Allocating scratchpad tokens for intermediate reflection.</li>
          </ul>

          <div className="bg-[#101F45]/80 border border-white/10 rounded-2xl p-6 font-mono text-xs text-cyan-300">
            {`// Strategic Prompt Architecture Pattern
[SYSTEM_CONTEXT]: Senior Product Analyst at GXA
[OUTPUT_FORMAT]: STRICT JSON Schema
[CONSTRAINT]: Avoid corporate buzzwords; provide quantifiable metrics only.
[TASK]: Evaluate the 3 highest leverage conversion opportunities.`}
          </div>

          <h2 className="text-2xl font-bold text-white mt-8 mb-4">Market Application in 2026</h2>
          <p>
            For professionals operating in fast-growing digital economies like India, mastering these architectural patterns elevates standard contributors into irreplaceable systems architects.
          </p>
        </div>

        {/* Next Read / Back */}
        <div className="pt-10 border-t border-white/10 flex items-center justify-between">
          <button
            onClick={() => navigateTo('/blog')}
            className="text-xs font-bold text-white/70 hover:text-white flex items-center gap-1.5"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Journal
          </button>
          <button
            onClick={() => navigateTo('/courses')}
            className="text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1.5"
          >
            Explore Related Courses <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
