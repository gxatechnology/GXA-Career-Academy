import React from 'react';
import { useApp } from '../context/AppContext';
import { CAREER_ROADMAPS } from '../data/mockData';
import { Compass, Briefcase, TrendingUp, IndianRupee, ArrowRight, Award, CheckCircle2 } from 'lucide-react';
import {
  CareerLadderIllustration,
  CareerGuidanceMatrixGraphic,
} from '../components/EducationalGraphics';

export const CareerGuidancePage: React.FC = () => {
  const { navigateTo } = useApp();

  return (
    <div className="bg-[#000825] text-white min-h-screen py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header with Career Illustration */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
              <Compass className="w-3.5 h-3.5" />
              Strategic Direction
            </div>
            <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight">
              High-Impact Career Roadmaps
            </h1>
            <p className="text-white/70 text-base md:text-lg max-w-xl">
              Architected for the modern technology ecosystem. Clear milestone-driven trajectories with industry role expectations, production skills, and verified course certifications.
            </p>
          </div>
          <div className="lg:col-span-5 flex justify-center">
            <CareerLadderIllustration className="w-full h-auto drop-shadow-xl" />
          </div>
        </div>

        {/* Roadmaps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {CAREER_ROADMAPS.map((roadmap) => {
            const phases = roadmap.phases || [];
            const salary = roadmap.salaryRange || roadmap.salaryRangeIndia || '₹14 - 28 LPA';

            return (
              <div
                key={roadmap.slug}
                className="bg-[#101F45]/60 border border-white/10 rounded-3xl p-8 hover:border-cyan-500/40 transition-all flex flex-col justify-between shadow-xl"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-3 py-1 rounded-full">
                      {roadmap.title}
                    </span>
                    <span className="text-xs text-white/50">{phases.length} Strategic Milestones</span>
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-2">{roadmap.title}</h3>
                  <p className="text-sm text-white/70 mb-6 leading-relaxed">{roadmap.description}</p>

                  <div className="grid grid-cols-2 gap-4 bg-white/5 border border-white/10 rounded-2xl p-4 mb-6">
                    <div>
                      <span className="text-[11px] text-white/50 block font-medium">Illustrative Role Benchmark</span>
                      <span className="text-base font-bold text-emerald-400 flex items-center gap-1 mt-0.5">
                        <IndianRupee className="w-4 h-4" /> {salary}
                      </span>
                    </div>
                    <div>
                      <span className="text-[11px] text-white/50 block font-medium">Timeline to Readiness</span>
                      <span className="text-base font-bold text-cyan-400 mt-0.5 block">{roadmap.timelineMonths || 6} Months</span>
                    </div>
                  </div>

                  <div className="space-y-3 mb-6">
                    <span className="text-xs font-bold uppercase tracking-wider text-white/60 block">Key Milestones</span>
                    {phases.slice(0, 3).map((p, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-white/80">
                        <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-semibold text-white">{p.title}: </span>
                          <span>{p.topics?.join(', ')}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                <div className="flex flex-wrap gap-1.5">
                  {roadmap.keySkills.slice(0, 3).map((s, idx) => (
                    <span key={idx} className="text-[10px] bg-white/5 px-2.5 py-1 rounded text-white/70">
                      {s}
                    </span>
                  ))}
                </div>
                <button
                  onClick={() => navigateTo(`/careers/${roadmap.slug}`)}
                  className="px-5 py-2.5 bg-primary-600 hover:bg-primary-500 rounded-xl text-xs font-bold text-white flex items-center gap-2 shadow transition-colors"
                >
                  View Full Roadmap <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
        </div>

        {/* Industry Competency Matrix Graphic */}
        <div className="bg-[#101F45]/60 border border-white/10 rounded-3xl p-6 sm:p-8 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-xl">
          <div className="space-y-3 max-w-xl text-left">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-cyan-400">
              Technical Skill Matrix
            </span>
            <h3 className="text-2xl font-bold text-white">
              Role Competencies &amp; Architectural Trajectories
            </h3>
            <p className="text-sm text-white/70 leading-relaxed">
              Curriculum progression milestones aligned with systems engineering expectations across modern product development and AI teams.
            </p>
          </div>
          <div className="w-full max-w-md shrink-0">
            <CareerGuidanceMatrixGraphic className="w-full h-auto drop-shadow-md" />
          </div>
        </div>

        {/* 1-on-1 Mentorship Banner */}
        <div className="bg-gradient-to-r from-primary-900/60 to-indigo-900/60 border border-primary-500/30 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2 max-w-xl">
            <h3 className="text-2xl font-bold text-white">Need Personalised Career Mentoring?</h3>
            <p className="text-sm text-white/70 leading-relaxed">
              Book a portfolio or resume teardown session with senior technology leaders and authors from GXA Technology.
            </p>
          </div>
          <button
            onClick={() => navigateTo('/contact')}
            className="px-6 py-3.5 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold rounded-xl text-xs uppercase tracking-wider transition-colors shrink-0 shadow-lg"
          >
            Request Career Consultation
          </button>
        </div>
      </div>
    </div>
  );
};
