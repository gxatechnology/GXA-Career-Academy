import React from 'react';
import { useApp } from '../context/AppContext';
import { Sparkles, Bot, Terminal, BookOpen, ArrowRight, Zap, Target, Cpu, CheckCircle } from 'lucide-react';
import { AI_PROMPTS } from '../data/mockData';
import { AIModelNeuralIllustration } from '../components/EducationalGraphics';

export const AILearningPage: React.FC = () => {
  const { navigateTo } = useApp();

  return (
    <div className="bg-[#000825] text-white min-h-screen py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-5 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              Empowering Modern Intelligence
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
              AI Learning Ecosystem
            </h1>
            <p className="text-base md:text-lg text-white/70 max-w-xl">
              Master the transformative power of Generative AI, prompt engineering frameworks, 
              and intelligent agent architecture with hands-on tools built specifically for students and professionals.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <button
                onClick={() => navigateTo('/ai-learning/assistant')}
                className="px-6 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:opacity-90 rounded-xl font-bold text-sm flex items-center gap-2 shadow-lg shadow-blue-600/30 transition-all hover:scale-[1.02] cursor-pointer"
              >
                <Bot className="w-4 h-4 text-cyan-300" />
                Launch AI Study Assistant
              </button>
              <button
                onClick={() => navigateTo('/ai-learning/prompts')}
                className="px-6 py-3.5 bg-white/10 hover:bg-white/15 border border-white/20 rounded-xl font-bold text-sm flex items-center gap-2 transition-colors cursor-pointer"
              >
                <Terminal className="w-4 h-4 text-cyan-400" />
                Explore Prompt Library
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 flex justify-center">
            <AIModelNeuralIllustration className="w-full h-auto drop-shadow-2xl" />
          </div>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-[#101F45]/60 border border-white/10 rounded-2xl p-8 hover:border-cyan-500/50 transition-all group">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-6 group-hover:scale-110 transition-transform">
              <Bot className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Interactive AI Study Assistant</h3>
            <p className="text-sm text-white/60 mb-6 leading-relaxed">
              Trained on comprehensive course syllabi and academic curricula. Get step-by-step mathematical reasoning, code explanations, and instant concept breakdowns.
            </p>
            <button
              onClick={() => navigateTo('/ai-learning/assistant')}
              className="text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1.5"
            >
              Try Assistant Now <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="bg-[#101F45]/60 border border-white/10 rounded-2xl p-8 hover:border-indigo-500/50 transition-all group">
            <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 mb-6 group-hover:scale-110 transition-transform">
              <Terminal className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Curated Prompt Library</h3>
            <p className="text-sm text-white/60 mb-6 leading-relaxed">
              Hundreds of production-tested prompts across Coding, Copywriting, Marketing, Research, and Executive Summarization. Copy directly with one click.
            </p>
            <button
              onClick={() => navigateTo('/ai-learning/prompts')}
              className="text-xs font-bold text-indigo-400 hover:text-indigo-300 flex items-center gap-1.5"
            >
              Browse Prompts <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="bg-[#101F45]/60 border border-white/10 rounded-2xl p-8 hover:border-primary-500/50 transition-all group">
            <div className="w-12 h-12 rounded-xl bg-primary-500/10 border border-primary-500/30 flex items-center justify-center text-primary-400 mb-6 group-hover:scale-110 transition-transform">
              <Cpu className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Industry AI Certifications</h3>
            <p className="text-sm text-white/60 mb-6 leading-relaxed">
              Rigorous capstone projects covering prompt design patterns, multimodal models, context engineering, and real enterprise automation workflows.
            </p>
            <button
              onClick={() => navigateTo('/courses/prompt-engineering-masterclass')}
              className="text-xs font-bold text-primary-400 hover:text-primary-300 flex items-center gap-1.5"
            >
              View Masterclass <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Popular Prompts Preview */}
        <div className="bg-[#101F45]/40 border border-white/10 rounded-3xl p-8 md:p-12 space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">Featured Tooling</span>
              <h2 className="text-2xl md:text-3xl font-bold text-white mt-1">Trending AI Prompts</h2>
            </div>
            <button
              onClick={() => navigateTo('/ai-learning/prompts')}
              className="text-sm font-semibold text-white/70 hover:text-white flex items-center gap-1"
            >
              View All 150+ Prompts <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {AI_PROMPTS.slice(0, 4).map((item) => (
              <div key={item.id} className="bg-white/5 border border-white/10 rounded-xl p-5 hover:bg-white/10 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold px-2 py-0.5 rounded bg-primary-600/30 text-cyan-300 border border-primary-500/30">
                    {item.category}
                  </span>
                  <span className="text-[11px] text-white/40">{item.copiesCount} copies</span>
                </div>
                <h4 className="font-bold text-white text-base mb-2">{item.title}</h4>
                <div className="bg-black/40 rounded-lg p-3 font-mono text-xs text-white/80 line-clamp-3 mb-3 border border-white/5">
                  {item.promptText}
                </div>
                <button
                  onClick={() => navigateTo('/ai-learning/prompts')}
                  className="text-xs font-bold text-cyan-400 hover:underline"
                >
                  Inspect & Copy Template →
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
