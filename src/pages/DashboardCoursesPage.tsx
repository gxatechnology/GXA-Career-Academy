import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Video, Play, Award, CheckCircle2, Clock, ArrowRight, Download, Eye, BookOpen } from 'lucide-react';
import { CertificateModal } from '../components/CertificateModal';
import {
  downloadCertificatePDF,
  CertificateData,
  DEFAULT_LEFT_SIGNATORY,
  DEFAULT_RIGHT_SIGNATORY,
} from '../services/certificateService';
import { Course } from '../types';
import confetti from 'canvas-confetti';
import {
  EmptyStateIllustration,
  AcademicDiplomaIllustration,
} from '../components/EducationalGraphics';

export const DashboardCoursesPage: React.FC = () => {
  const { courses, navigateTo, user, showToast, hasAccessToCourse } = useApp();
  const [selectedCertCourse, setSelectedCertCourse] = useState<Course | null>(null);
  const [studentCertName, setStudentCertName] = useState(user?.name || 'Enrolled Student');

  // Strict entitlement check: only display courses with verified enrolment
  const enrolledCourses = courses.filter((c) => hasAccessToCourse(c.id));

  // Helper to compute actual progress from local completion records
  const getCourseProgress = (course: Course) => {
    const totalLessons =
      course.modules?.reduce((acc, m) => acc + (m.lessons?.length || 0), 0) ||
      course.curriculum?.reduce((acc, c) => acc + (c.lessons?.length || 0), 0) ||
      10;

    const storageKey = `gxa_completed_${user?.id || 'guest'}_${course.id}`;
    let completedCount = 0;
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        completedCount = JSON.parse(saved).length;
      }
    } catch {
      completedCount = 0;
    }

    if (course.status === 'completed') return 100;
    if (totalLessons === 0) return 0;
    return Math.min(100, Math.round((completedCount / totalLessons) * 100));
  };

  const handleDownloadCertificate = (course: Course) => {
    try {
      const studentName = user?.name || studentCertName || 'Enrolled Student';
      const certId = `GXA-CERT-2026-${(course.slug || course.id).toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 8)}-${Math.floor(1000 + Math.random() * 9000)}`;
      const currentOrigin = typeof window !== 'undefined' ? window.location.origin : 'https://gxacareeracademy.com';
      const certData: CertificateData = {
        certificateId: certId,
        studentName,
        courseTitle: course.title,
        courseCategory: course.category,
        duration: course.duration || `${course.durationWeeks || 8} Weeks`,
        grade: 'Excellence (100% Distinction)',
        issueDate: new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' }),
        verificationUrl: `${currentOrigin}/verify/${certId}`,
        isVerified: true,
        leftSignatory: DEFAULT_LEFT_SIGNATORY,
        rightSignatory: DEFAULT_RIGHT_SIGNATORY,
      };
      downloadCertificatePDF(certData);
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#1D4ED8', '#14B8D4', '#5848E5', '#F59E0B'],
      });
      showToast(`Downloading official Certificate for "${course.title}"`);
    } catch (err) {
      console.error('Failed to generate certificate PDF:', err);
      showToast('Error generating certificate PDF. Please try again.');
    }
  };

  return (
    <div className="bg-[#000825] text-white min-h-screen py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-white/10 pb-4 overflow-x-auto text-xs font-semibold">
          {[
            { label: 'Overview', path: '/dashboard', active: false },
            { label: 'My Digital Library', path: '/dashboard/library', active: false },
            { label: 'Enrolled Courses', path: '/dashboard/courses', active: true },
            { label: 'Orders & Receipts', path: '/dashboard/orders', active: false },
            { label: 'Profile & Settings', path: '/dashboard/settings', active: false },
          ].map((tab, idx) => (
            <button
              key={idx}
              onClick={() => navigateTo(tab.path)}
              className={`px-4 py-2 rounded-xl whitespace-nowrap transition-colors cursor-pointer ${
                tab.active
                  ? 'bg-[#1D4ED8] text-white font-bold'
                  : 'bg-white/5 hover:bg-white/10 text-white/60 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white font-display">Enrolled Courses</h1>
          <p className="text-xs text-white/60 mt-1 font-sans">
            Access your verified interactive video lessons, code workbenches, and academic certificates
          </p>
        </div>

        {/* Courses Cards */}
        {enrolledCourses.length === 0 ? (
          <div className="bg-[#070F28] border border-slate-800 rounded-3xl p-10 text-center max-w-xl mx-auto space-y-4 shadow-xl">
            <EmptyStateIllustration
              title="No Enrolled Courses in Account"
              description="You have not enrolled in any programs yet. Complete verified checkout on any live cohort or self-paced masterclass to unlock lesson streaming, capstones, and certificates."
              className="text-white"
            />
            <button
              onClick={() => navigateTo('/courses')}
              className="px-6 py-3 bg-[#1D4ED8] hover:bg-[#1E40AF] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md inline-flex items-center gap-2 cursor-pointer"
            >
              <Video className="w-4 h-4" /> Explore Course Curriculum
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {enrolledCourses.map((course) => {
              const progress = getCourseProgress(course);
              const isEligible = progress >= 80 || course.status === 'completed';

              return (
                <div
                  key={course.id}
                  className="bg-[#070F28] border border-slate-800 rounded-3xl p-6 md:p-8 flex flex-col justify-between hover:border-cyan-500/40 transition-all shadow-xl"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4 text-xs font-mono">
                      <span className="font-bold text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-3 py-1 rounded-full uppercase tracking-wider text-[10px]">
                        {course.category}
                      </span>
                      <span className="text-white/50 flex items-center gap-1 font-sans">
                        <Clock className="w-3.5 h-3.5 text-cyan-400" /> {course.duration || `${course.durationWeeks || 8} Weeks`}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-2 leading-snug font-display">{course.title}</h3>
                    <p className="text-xs text-white/60 line-clamp-2 mb-6 font-sans leading-relaxed">{course.description}</p>

                    {/* Progress bar */}
                    <div className="space-y-2 mb-6">
                      <div className="flex justify-between text-xs font-semibold font-mono">
                        <span className="text-white/70">Curriculum Progress</span>
                        <span className={isEligible ? 'text-emerald-400 flex items-center gap-1' : 'text-cyan-400'}>
                          {isEligible && <CheckCircle2 className="w-3.5 h-3.5" />}
                          {progress}% {isEligible ? '· Certificate Unlocked' : ''}
                        </span>
                      </div>
                      <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            isEligible
                              ? 'bg-gradient-to-r from-emerald-500 to-cyan-400'
                              : 'bg-gradient-to-r from-[#1D4ED8] to-cyan-400'
                          }`}
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2 text-xs">
                      <Award className="w-4 h-4 text-amber-400" />
                      <span className={isEligible ? 'text-amber-300 font-semibold' : 'text-white/50'}>
                        {isEligible ? 'Certificate Ready' : 'Certificate at ≥80% Completion'}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {isEligible && (
                        <button
                          onClick={() => handleDownloadCertificate(course)}
                          className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-md cursor-pointer"
                          title="Download official PDF Certificate of Completion"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>Download PDF</span>
                        </button>
                      )}
                      {isEligible && (
                        <button
                          onClick={() => setSelectedCertCourse(course)}
                          className="p-2 bg-white/5 hover:bg-white/10 text-amber-300 hover:text-white rounded-xl text-xs font-semibold transition-colors border border-amber-500/20 cursor-pointer"
                          title="Preview & Customize Name on Certificate"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                      )}
                      <button
                        onClick={() => navigateTo(`/learn/${course.id}`)}
                        className="px-4 py-2 bg-[#1D4ED8] hover:bg-[#1E40AF] text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors shadow-xs cursor-pointer"
                      >
                        <Play className="w-3.5 h-3.5 fill-current" />
                        <span>Continue Learning</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Certificate Modal */}
      {selectedCertCourse && (
        <CertificateModal
          isOpen={!!selectedCertCourse}
          onClose={() => setSelectedCertCourse(null)}
          certificateData={{
            certificateId: `GXA-CERT-2026-${(selectedCertCourse.slug || selectedCertCourse.id).toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 8)}-${Math.floor(1000 + Math.random() * 9000)}`,
            studentName: studentCertName,
            courseTitle: selectedCertCourse.title,
            courseCategory: selectedCertCourse.category,
            duration: selectedCertCourse.duration || `${selectedCertCourse.durationWeeks || 8} Weeks`,
            grade: 'Excellence (100% Distinction)',
            issueDate: new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' }),
            verificationUrl: `${typeof window !== 'undefined' ? window.location.origin : 'https://gxacareeracademy.com'}/verify/GXA-CERT-2026-${(selectedCertCourse.slug || selectedCertCourse.id).toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 8)}-9214`,
            isVerified: true,
            leftSignatory: DEFAULT_LEFT_SIGNATORY,
            rightSignatory: DEFAULT_RIGHT_SIGNATORY,
          }}
          onNameChange={(newName) => setStudentCertName(newName)}
        />
      )}
    </div>
  );
};
