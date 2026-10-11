import React from 'react';
import { useApp } from '../context/AppContext';
import { Compass, BookOpen, Video, ArrowRight, Award, CheckCircle2, IndianRupee } from 'lucide-react';

export const LearningPathsPage: React.FC = () => {
  const { navigateTo } = useApp();

  const paths = [
    {
      id: 'path-ai-specialist',
      title: 'Full-Stack Generative AI Specialist',
      level: 'Beginner to Advanced',
      duration: '4-6 Months',
      description: 'Go from basic prompt formulations to creating multi-agent orchestration architectures, RAG pipelines, and automated business workflows.',
      badge: 'Most Popular',
      steps: [
        { title: 'Foundations of Prompt Engineering', type: 'eBook', ref: '/ebooks/prompt-engineering' },
        { title: 'Prompt Engineering Masterclass', type: 'Course', ref: '/courses/prompt-engineering-masterclass' },
        { title: 'Multi-Agent Autonomous Systems', type: 'Lab', ref: '/ai-learning/prompts' },
        { title: 'Capstone: Enterprise AI Solution', type: 'Certification', ref: '/dashboard/courses' },
      ],
      totalValue: 9999,
      bundledPrice: 1999,
    },
    {
      id: 'path-growth-marketer',
      title: 'Performance Marketing & Growth Architect',
      level: 'Intermediate',
      duration: '3-5 Months',
      description: 'Master paid acquisition, high-converting funnel copy, attribution analytics, and creative testing for high-growth tech companies.',
      badge: 'High Industry Demand',
      steps: [
        { title: 'Digital Marketing Mastery (445 Pages)', type: 'eBook', ref: '/ebooks/digital-marketing-mastery' },
        { title: 'Full-Stack Digital Marketing & Growth', type: 'Course', ref: '/courses/full-stack-digital-marketing' },
        { title: 'Funnel Optimization Cheatsheet', type: 'Resource', ref: '/resources' },
        { title: 'Live Client Audit Simulation', type: 'Capstone', ref: '/courses' },
      ],
      totalValue: 8499,
      bundledPrice: 1699,
    },
    {
      id: 'path-career-leadership',
      title: 'Strategic Career Navigator & Executive Presence',
      level: 'All Levels',
      duration: '2-3 Months',
      description: 'Uncover career leverage, design undeniable portfolios, master interview negotiation, and build sustainable executive confidence.',
      badge: 'Foundational',
      steps: [
        { title: 'THE WHY — Career Guidance', type: 'eBook', ref: '/ebooks/the-why-career-guidance' },
        { title: 'Product Management Roadmap', type: 'Roadmap', ref: '/careers/product-management' },
        { title: 'Interview Negotiation Playbook', type: 'Resource', ref: '/resources' },
      ],
      totalValue: 4999,
      bundledPrice: 999,
    },
  ];

  return (
    <div className="bg-[#000825] text-white min-h-screen py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
            <Compass className="w-3.5 h-3.5" /> Structured Trajectories
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight">
            Curated Learning Paths
          </h1>
          <p className="text-white/70 text-base md:text-lg">
            Stop guessing what to learn next. Follow cohesive, end-to-end curriculum trajectories that integrate our books, courses, and practical capstones.
          </p>
        </div>

        {/* Learning Paths List */}
        <div className="space-y-10">
          {paths.map((p) => (
            <div
              key={p.id}
              className="bg-[#101F45]/60 border border-white/10 rounded-3xl p-8 lg:p-10 hover:border-cyan-500/40 transition-all shadow-xl"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-white/10">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                      {p.badge}
                    </span>
                    <span className="text-xs text-white/50">{p.level} • {p.duration}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white">{p.title}</h3>
                  <p className="text-sm text-white/70 max-w-2xl">{p.description}</p>
                </div>

                <div className="text-right lg:border-l lg:border-white/10 lg:pl-8 flex lg:flex-col justify-between items-end">
                  <div>
                    <span className="text-xs text-white/50 line-through">₹{p.totalValue}</span>
                    <div className="text-2xl font-bold text-emerald-400">₹{p.bundledPrice}</div>
                    <span className="text-[10px] text-cyan-400 font-medium">Save {(100 - (p.bundledPrice / p.totalValue) * 100).toFixed(0)}%</span>
                  </div>
                  <button
                    onClick={() => navigateTo('/courses')}
                    className="mt-3 px-6 py-2.5 bg-primary-600 hover:bg-primary-500 text-white rounded-xl text-xs font-bold transition-colors"
                  >
                    Enroll in Path
                  </button>
                </div>
              </div>

              {/* Steps progression */}
              <div className="pt-6">
                <h4 className="text-xs font-bold uppercase tracking-wider text-white/60 mb-4">Trajectory Progression</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {p.steps.map((st, i) => (
                    <div
                      key={i}
                      onClick={() => navigateTo(st.ref)}
                      className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl p-4 cursor-pointer transition-colors group flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider">Step 0{i + 1}</span>
                          <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded text-white/60">{st.type}</span>
                        </div>
                        <h5 className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors">{st.title}</h5>
                      </div>
                      <div className="mt-4 flex items-center gap-1 text-[11px] text-white/40 group-hover:text-cyan-400">
                        <span>Explore</span>
                        <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
