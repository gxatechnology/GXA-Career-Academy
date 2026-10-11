import React from 'react';
import { useApp } from '../context/AppContext';
import { ShieldCheck, Target, Award, Users, BookOpen, Sparkles, Building, Globe } from 'lucide-react';
import { AUTHORS_DATA } from '../data/mockData';

export const AboutPage: React.FC = () => {
  const { navigateTo } = useApp();

  return (
    <div className="bg-[#F9FAF7] text-[#121E17] min-h-screen py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        {/* Hero */}
        <div className="text-center max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-100/70 border border-orange-200 text-[#C2410C] text-xs font-semibold uppercase tracking-wider">
            <Building className="w-3.5 h-3.5" /> GXA Technology Venture
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-[#072118] tracking-tight">
            Learn Today. Lead Tomorrow.
          </h1>
          <p className="text-[#52635B] text-base md:text-xl leading-relaxed">
            GXA Career Academy was engineered with a clear mandate: bridge the critical gap between theoretical education and real-world tech leverage through rigorous digital books, applied courses, and verified career tracks.
          </p>
        </div>

        {/* Mission & Vision Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white border border-[#E2E8E4] rounded-3xl p-8 lg:p-10 space-y-4 shadow-sm hover:border-emerald-300 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-orange-100 border border-orange-200 flex items-center justify-center text-[#EA580C]">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold text-[#072118]">Our Mission</h3>
            <p className="text-sm text-[#52635B] leading-relaxed">
              To democratise elite technological and professional knowledge for millions of ambitious Indian and global learners. We eliminate superficial tutorials in favor of comprehensive, actionable, battle-tested curricula designed by verified practitioners.
            </p>
          </div>

          <div className="bg-white border border-[#E2E8E4] rounded-3xl p-8 lg:p-10 space-y-4 shadow-sm hover:border-emerald-300 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 border border-emerald-200 flex items-center justify-center text-[#059669]">
              <Globe className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold text-[#072118]">Our Vision</h3>
            <p className="text-sm text-[#52635B] leading-relaxed">
              To serve as the authoritative digital learning ecosystem where modern professionals gain verifiable mastery over AI engineering, performance marketing, product leadership, and strategic career growth.
            </p>
          </div>
        </div>

        {/* Institutional Pillars */}
        <div className="space-y-8">
          <div className="text-center">
            <span className="text-xs font-bold uppercase tracking-wider text-[#EA580C]">Core Architecture</span>
            <h2 className="text-3xl font-bold text-[#072118] mt-1">The Pillars of GXA Career Academy</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'Practical Depth',
                desc: 'Every eBook exceeds 100+ pages of detailed frameworks, case studies, and actionable checklists.',
                icon: BookOpen,
              },
              {
                title: 'Industry Authority',
                desc: 'Created exclusively by technology founders, senior engineering leads, and growth architects.',
                icon: Award,
              },
              {
                title: 'AI-First Integration',
                desc: 'Our interactive assistant and prompt library bring immediate modern leverage into each course.',
                icon: Sparkles,
              },
              {
                title: 'Outcome-Oriented',
                desc: 'Structured curricula and project-based milestones designed for practical industry readiness.',
                icon: ShieldCheck,
              },
            ].map((p, i) => (
              <div key={i} className="bg-white border border-[#E2E8E4] rounded-2xl p-6 space-y-3 shadow-sm hover:border-orange-300 transition-all">
                <p.icon className="w-6 h-6 text-[#EA580C]" />
                <h4 className="font-bold text-[#072118] text-base">{p.title}</h4>
                <p className="text-xs text-[#52635B] leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Leadership & Authors Highlight */}
        <div className="bg-[#072118] text-white rounded-3xl p-8 lg:p-12 space-y-8 shadow-xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#34D399]">Intellectual Leadership</span>
              <h2 className="text-3xl font-bold text-white mt-1">Meet Our Authors &amp; Mentors</h2>
            </div>
            <button
              onClick={() => navigateTo('/authors')}
              className="px-5 py-2.5 bg-[#EA580C] hover:bg-[#C2410C] rounded-xl text-xs font-bold text-white transition-colors cursor-pointer shadow-sm"
            >
              View Full Author Profiles
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {AUTHORS_DATA.map((author) => (
              <div key={author.id} className="bg-white/10 border border-white/10 rounded-2xl p-6 flex items-center gap-4">
                <img
                  src={author.photoUrl}
                  alt={author.name}
                  className="w-16 h-16 rounded-2xl object-cover border border-white/20 shrink-0"
                />
                <div>
                  <h4 className="font-bold text-white text-sm">{author.name}</h4>
                  <p className="text-xs text-[#34D399] font-medium">{author.role}</p>
                  <p className="text-[11px] text-white/60 mt-1">{author.credentials}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
