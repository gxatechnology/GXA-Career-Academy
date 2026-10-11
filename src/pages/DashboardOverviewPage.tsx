import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { BookOpen, Video, Award, Clock, ArrowRight, Sparkles, Download, CheckCircle2, TrendingUp } from 'lucide-react';
import { CertificateModal } from '../components/CertificateModal';
import { DEFAULT_LEFT_SIGNATORY, DEFAULT_RIGHT_SIGNATORY } from '../services/certificateService';
import { StudentDashboardWelcomeGraphic } from '../components/EducationalGraphics';

export const DashboardOverviewPage: React.FC = () => {
  const { user, ebooks, courses, navigateTo, hasAccessToCourse, hasAccessToEBook } = useApp();
  const [showCertModal, setShowCertModal] = useState(false);
  const [studentCertName, setStudentCertName] = useState(user?.name || 'Enrolled Student');

  const myBooks = ebooks.filter((b) => hasAccessToEBook(b.id)).slice(0, 2);
  const myCourses = courses.filter((c) => hasAccessToCourse(c.id)).slice(0, 2);

  return (
    <div className="bg-[#000825] text-white min-h-screen py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Dashboard Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-white/10 pb-4 overflow-x-auto text-xs font-semibold">
          {[
            { label: 'Overview', path: '/dashboard', active: true },
            { label: 'My Digital Library', path: '/dashboard/library', active: false },
            { label: 'Enrolled Courses', path: '/dashboard/courses', active: false },
            { label: 'Orders & Receipts', path: '/dashboard/orders', active: false },
            { label: 'Profile & Settings', path: '/dashboard/settings', active: false },
          ].map((tab, idx) => (
            <button
              key={idx}
              onClick={() => navigateTo(tab.path)}
              className={`px-4 py-2 rounded-xl whitespace-nowrap transition-colors ${
                tab.active
                  ? 'bg-primary-600 text-white font-bold'
                  : 'bg-white/5 hover:bg-white/10 text-white/60 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-primary-900/60 to-indigo-950/80 border border-white/10 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-400">Student Portal</span>
            <h1 className="text-2xl sm:text-3xl font-black text-white">
              Welcome back, {user?.name || 'Learner'}! 👋
            </h1>
            <p className="text-xs text-white/70 max-w-xl">
              Access your enrolled courses, digital eBooks, and verifiable academic certificates.
            </p>
          </div>
          <button
            onClick={() => navigateTo('/ai-learning/assistant')}
            className="px-5 py-3 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl flex items-center gap-2 transition-colors shrink-0 shadow-lg cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" /> Launch AI Assistant
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'eBooks in Library', value: `${myBooks.length} Active`, sub: 'Instant PDF Access', icon: BookOpen, clickable: true, onClick: () => navigateTo('/dashboard/library') },
            { label: 'Enrolled Courses', value: `${myCourses.length} Programs`, sub: 'Verified Syllabi', icon: Video, clickable: true, onClick: () => navigateTo('/dashboard/courses') },
            { label: 'Active Study Track', value: myCourses.length > 0 ? 'In Progress' : 'No Enrolments', sub: 'Practical Modules', icon: Clock, clickable: false },
            { label: 'Certificates', value: `${myCourses.filter(c => c.status === 'completed').length} Earned`, sub: 'Verified Credentials', icon: Award, clickable: myCourses.some(c => c.status === 'completed'), onClick: () => setShowCertModal(true), highlight: myCourses.some(c => c.status === 'completed') },
          ].map((st, i) => (
            <div
              key={i}
              onClick={st.onClick}
              className={`bg-[#101F45]/60 border rounded-2xl p-5 space-y-2 transition-all ${
                st.clickable ? 'cursor-pointer hover:border-cyan-400 hover:scale-[1.02]' : ''
              } ${
                st.highlight ? 'border-amber-500/40 bg-gradient-to-br from-[#101F45]/80 to-amber-950/20' : 'border-white/10'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-white/50">{st.label}</span>
                <st.icon className={`w-4 h-4 ${st.highlight ? 'text-amber-400' : 'text-cyan-400'}`} />
              </div>
              <div className="text-xl font-bold text-white flex items-center justify-between">
                <span>{st.value}</span>
                {st.clickable && <span className="text-xs text-cyan-400 opacity-60">→</span>}
              </div>
              <div className={`text-[10px] ${st.highlight ? 'text-amber-300 font-semibold' : 'text-emerald-400'}`}>
                {st.sub}
              </div>
            </div>
          ))}
        </div>

        {/* Continue Learning Course */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white">Continue Learning</h2>
            <button
              onClick={() => navigateTo('/dashboard/courses')}
              className="text-xs text-cyan-400 hover:underline flex items-center gap-1 cursor-pointer"
            >
              All Courses <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {myCourses.length === 0 ? (
            <div className="bg-[#101F45]/40 border border-white/10 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-3 text-center md:text-left max-w-md">
                <span className="text-[11px] font-mono text-cyan-400 font-semibold uppercase tracking-wider">Academic Tracker</span>
                <h3 className="text-xl font-bold text-white">Start Your Learning Velocity Today</h3>
                <p className="text-xs text-white/60">You are not currently enrolled in any active course curricula. Explore our verified masterclasses in Full-Stack AI, Microservices, and Digital Growth.</p>
                <button
                  onClick={() => navigateTo('/courses')}
                  className="px-5 py-2.5 bg-[#2455E8] hover:bg-[#1B44BF] text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
                >
                  Explore Course Catalog →
                </button>
              </div>
              <div className="w-full max-w-sm shrink-0">
                <StudentDashboardWelcomeGraphic className="w-full h-auto drop-shadow-lg" />
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {myCourses.map((c) => (
                <div
                  key={c.id}
                  className="bg-[#101F45]/60 border border-white/10 rounded-2xl p-6 flex flex-col justify-between hover:border-cyan-500/30 transition-colors shadow-lg"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3 text-xs">
                      <span className="font-semibold text-cyan-300">{c.category}</span>
                      <span className="text-white/50">{c.modules?.length || c.curriculum?.length || 4} Modules</span>
                    </div>
                    <h3 className="text-base font-bold text-white mb-2">{c.title}</h3>
                    <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden mb-2">
                      <div className="bg-cyan-400 h-full w-2/5 rounded-full" />
                    </div>
                    <div className="flex justify-between text-[11px] text-white/50">
                      <span>40% Completed</span>
                      <span>Last lesson: Core Architecture</span>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-white/10 flex justify-end">
                    <button
                      onClick={() => navigateTo(`/learn/${c.id}/l1`)}
                      className="px-4 py-2 bg-primary-600 hover:bg-primary-500 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
                    >
                      Resume Lesson →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Digital Library Quick Access */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white">My Digital Bookshelf</h2>
            <button
              onClick={() => navigateTo('/dashboard/library')}
              className="text-xs text-cyan-400 hover:underline flex items-center gap-1"
            >
              View Full Library <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {myBooks.map((b) => (
              <div
                key={b.id}
                className="bg-[#101F45]/60 border border-white/10 rounded-2xl p-5 flex gap-4 items-center shadow-lg"
              >
                <img
                  src={b.coverImage}
                  alt={b.title}
                  className="w-16 h-24 object-cover rounded-xl border border-white/10 shrink-0"
                />
                <div className="flex-1 min-w-0 space-y-1">
                  <span className="text-[10px] uppercase font-bold text-cyan-400">{b.category}</span>
                  <h4 className="font-bold text-sm text-white truncate">{b.title}</h4>
                  <p className="text-xs text-white/50">{b.pages || b.totalPages || 400} Pages • PDF Ready</p>
                  <div className="flex gap-2 pt-2">
                    <button
                      onClick={() => navigateTo(`/ebooks/${b.slug}/preview`)}
                      className="px-3 py-1.5 bg-primary-600 hover:bg-primary-500 rounded-lg text-[11px] font-bold text-white"
                    >
                      Read Now
                    </button>
                    <button
                      onClick={() => navigateTo(`/ebooks/${b.slug}`)}
                      className="px-3 py-1.5 bg-white/5 hover:bg-white/10 rounded-lg text-[11px] text-white/70"
                    >
                      Book Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Verified PDF Certificate Modal */}
      <CertificateModal
        isOpen={showCertModal}
        onClose={() => setShowCertModal(false)}
        certificateData={{
          certificateId: 'GXA-CERT-2026-FSAI-9214',
          studentName: studentCertName,
          courseTitle: 'Full-Stack Modern AI Applications: Build & Deploy Production RAG, LangChain, FastAPI & Next.js Systems',
          courseCategory: 'AI & Full-Stack Systems',
          duration: '8 Weeks Cohort',
          grade: 'Excellence (100% Distinction)',
          issueDate: new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' }),
          verificationUrl: `${typeof window !== 'undefined' ? window.location.origin : 'https://gxacareeracademy.com'}/verify/GXA-CERT-2026-FSAI-9214`,
          isVerified: true,
          leftSignatory: DEFAULT_LEFT_SIGNATORY,
          rightSignatory: DEFAULT_RIGHT_SIGNATORY,
        }}
        onNameChange={(newName) => setStudentCertName(newName)}
      />
    </div>
  );
};
