import React from 'react';
import { useApp } from '../context/AppContext';
import { AUTHORS_DATA } from '../data/mockData';
import { Award, BookOpen, ExternalLink, Linkedin, ArrowRight, ShieldCheck } from 'lucide-react';

export const AuthorsPage: React.FC = () => {
  const { navigateTo } = useApp();

  return (
    <div className="bg-[#000825] text-white min-h-screen py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
            <Award className="w-3.5 h-3.5" /> Proven Authority
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight">
            Founders, Authors & Mentors
          </h1>
          <p className="text-white/70 text-base md:text-lg">
            GXA educational assets are written and taught by practitioners who have scaled real products, built enterprise AI pipelines, and generated measurable revenue.
          </p>
        </div>

        {/* Authors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {AUTHORS_DATA.map((author) => (
            <div
              key={author.id}
              className="bg-[#101F45]/60 border border-white/10 rounded-3xl p-8 flex flex-col justify-between hover:border-cyan-500/40 transition-all shadow-xl"
            >
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <img
                    src={author.photoUrl}
                    alt={author.name}
                    className="w-20 h-20 rounded-2xl object-cover border-2 border-cyan-400/30 shadow-lg"
                  />
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                      {author.role}
                    </span>
                    <h3 className="text-xl font-bold text-white mt-1.5">{author.name}</h3>
                    <p className="text-xs text-white/50">{author.title}</p>
                  </div>
                </div>

                <div className="bg-white/5 rounded-2xl p-4 border border-white/10 mb-6 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-white/50">Experience</span>
                    <span className="font-semibold text-white">{author.experience}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-white/50">Academic Credentials</span>
                    <span className="font-semibold text-cyan-300">{author.credentials}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-white/50">Published Works</span>
                    <span className="font-semibold text-white">{author.publishedBooksCount} Books</span>
                  </div>
                </div>

                <p className="text-xs text-white/70 leading-relaxed mb-6">
                  {author.bio}
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <button
                  onClick={() => navigateTo('/ebooks')}
                  className="text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                >
                  View Authored Books <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
