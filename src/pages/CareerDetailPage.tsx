import React from 'react';
import { useApp } from '../context/AppContext';
import { CAREER_ROADMAPS } from '../data/mockData';
import { ArrowLeft, Compass, CheckCircle2, IndianRupee, BookOpen, Clock, Target, ArrowRight } from 'lucide-react';

export const CareerDetailPage: React.FC<{ slug: string }> = ({ slug }) => {
  const { navigateTo } = useApp();
  const roadmap = CAREER_ROADMAPS.find((r) => r.slug === slug) || CAREER_ROADMAPS[0];

  return (
    <div className="bg-[#000825] text-white min-h-screen py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-12">
        {/* Top Back Nav */}
        <button
          onClick={() => navigateTo('/career-guidance')}
          className="flex items-center gap-2 text-xs font-semibold text-white/60 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to All Career Roadmaps
        </button>

        {/* Header Hero */}
        <div className="bg-[#101F45]/70 border border-white/10 rounded-3xl p-8 md:p-12 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
            <Compass className="w-3.5 h-3.5" /> Career Roadmap Specification
          </div>

          <h1 className="text-3xl md:text-5xl font-black text-white">{roadmap.title}</h1>
          <p className="text-base text-white/70 max-w-3xl leading-relaxed">{roadmap.description}</p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-white/10">
            <div className="bg-white/5 p-4 rounded-xl">
              <span className="text-[11px] text-white/50 block font-medium">Illustrative Compensation Benchmark</span>
              <span className="text-lg font-bold text-emerald-400 flex items-center gap-1 mt-1">
                <IndianRupee className="w-4 h-4" /> {roadmap.salaryRange || roadmap.salaryRangeIndia || '₹14 - 28 LPA'}
              </span>
            </div>
            <div className="bg-white/5 p-4 rounded-xl">
              <span className="text-[11px] text-white/50 block font-medium">Core Industry Demand</span>
              <span className="text-lg font-bold text-cyan-400 mt-1 block">Very High (Top 5%)</span>
            </div>
            <div className="bg-white/5 p-4 rounded-xl">
              <span className="text-[11px] text-white/50 block font-medium">Recommended Preparation</span>
              <span className="text-lg font-bold text-indigo-300 mt-1 block">{roadmap.timelineMonths || 6} Months Dedicated</span>
            </div>
          </div>
        </div>

        {/* Milestone Timeline */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-white">Execution Milestones & Phases</h2>
          <div className="relative border-l-2 border-primary-500/40 ml-4 md:ml-6 pl-6 md:pl-8 space-y-10">
            {(roadmap.phases || []).map((p, idx) => (
              <div key={idx} className="relative group">
                <div className="absolute -left-[31px] md:-left-[39px] top-1.5 w-6 h-6 rounded-full bg-primary-600 border-4 border-[#000825] flex items-center justify-center text-[10px] font-bold text-white shadow">
                  {idx + 1}
                </div>
                <div className="bg-[#101F45]/60 border border-white/10 rounded-2xl p-6 group-hover:border-cyan-500/40 transition-colors">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <h3 className="text-lg font-bold text-white">{p.title}</h3>
                    <span className="text-xs font-mono text-cyan-300 bg-cyan-950/60 border border-cyan-800/40 px-2.5 py-1 rounded">
                      Phase {p.phaseNumber}
                    </span>
                  </div>
                  <div className="space-y-1 mt-2">
                    {p.topics?.map((topic, tIdx) => (
                      <p key={tIdx} className="text-sm text-white/70 leading-relaxed">• {topic}</p>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Skill Stacking Matrix */}
        <div className="bg-[#101F45]/60 border border-white/10 rounded-3xl p-8 space-y-6">
          <h3 className="text-xl font-bold text-white">Required Skill Matrix</h3>
          <div className="flex flex-wrap gap-2.5">
            {roadmap.keySkills.map((skill, idx) => (
              <span
                key={idx}
                className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-semibold text-white/90 flex items-center gap-2"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Recommended Supporting Materials */}
        <div className="bg-gradient-to-r from-primary-950 to-indigo-950 border border-white/15 rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider block mb-1">Recommended Starting Point</span>
            <h4 className="text-xl font-bold text-white">THE WHY — Career Guidance (eBook)</h4>
            <p className="text-xs text-white/60 mt-1 max-w-lg">
              Detailed breakdown of intrinsic motivation, market leverage, and high-income skill architecture.
            </p>
          </div>
          <button
            onClick={() => navigateTo('/ebooks/the-why-career-guidance')}
            className="px-6 py-3 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl flex items-center gap-2 shrink-0 transition-colors"
          >
            Explore eBook <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
