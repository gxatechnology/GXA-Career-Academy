import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Clock,
  BookOpen,
  Award,
  CheckCircle2,
  PlayCircle,
  FileText,
  Code2,
  HelpCircle,
  ArrowRight,
  ShieldCheck,
  Lock,
  ChevronDown,
  Sparkles,
  User,
  Users,
  Check,
  Download,
} from 'lucide-react';
import { AcademicSeal } from '../components/AcademicSeal';
import {
  CodeArchitectureIllustration,
  AcademicDiplomaIllustration,
} from '../components/EducationalGraphics';

export const CourseDetailPage: React.FC<{ slug: string }> = ({ slug }) => {
  const { courses, navigateTo, addToCart, hasAccessToCourse } = useApp();
  const course = courses.find((c) => c.slug === slug) || courses[0];

  const [activeModuleIndex, setActiveModuleIndex] = useState<number>(0);
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  if (!course) {
    return (
      <div className="py-24 text-center bg-[#FCFDFF] min-h-[60vh] flex flex-col items-center justify-center">
        <h2 className="font-display text-2xl font-bold text-[#000825]">Course Not Found</h2>
        <p className="text-xs text-slate-500 mt-2">The requested curriculum does not exist or has been archived.</p>
        <button
          onClick={() => navigateTo('/courses')}
          className="mt-6 px-6 py-2.5 bg-[#000825] text-white rounded-lg text-xs font-semibold hover:bg-[#101F45] transition-colors cursor-pointer"
        >
          Browse All Courses
        </button>
      </div>
    );
  }

  const isEnrolled = hasAccessToCourse(course.id);

  const handleEnrollNow = () => {
    addToCart({
      id: course.id,
      type: 'course',
      title: course.title,
      price: course.price,
      originalPrice: course.originalPrice,
      image: course.thumbnail,
      authorOrInstructor: course.instructorName,
      slug: course.slug,
    });
    navigateTo('/cart');
  };

  const modules = course.modules || [];
  const totalLessons = modules.reduce((acc, m) => acc + (m.lessons?.length || 0), 0);

  const faqs = [
    {
      q: 'When do live sessions and lab reviews take place?',
      a: 'Cohort code-along sessions are conducted on weekend mornings (Saturdays & Sundays, 10:00 AM – 1:00 PM IST). All sessions are recorded in 1080p and published to the Student Portal within 2 hours with timestamped notes.'
    },
    {
      q: 'What are the completion criteria for the verified certificate?',
      a: 'To earn the official Certificate of Accomplishment, learners must mark at least 80% of lessons as completed, submit all capstone project repositories, and achieve a passing score of 80% or higher on the end-of-module assessments.'
    },
    {
      q: 'Do I retain lifetime access to course recordings and code repositories?',
      a: 'Yes. Once enrolled, you receive permanent, asynchronous access to all lesson videos, code repositories, architecture diagrams, and future curriculum patch updates at no recurring charge.'
    },
    {
      q: 'How does the refund guarantee operate?',
      a: 'We offer an unconditional 7-day refund guarantee following batch commencement. If the curriculum does not meet your technical expectations, you can request a 100% refund with zero penalties.'
    }
  ];

  return (
    <div className="flex flex-col w-full bg-[#F9FAF7] text-[#121E17] pb-24">
      {/* 1. BREADCRUMB & HEADER STRIP */}
      <section className="bg-gradient-to-b from-[#F2F6F3] to-[#F9FAF7] border-b border-[#E2E8E4] py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between text-xs text-[#52635B] font-mono">
          <div className="flex items-center gap-2 truncate pr-4">
            <button onClick={() => navigateTo('/')} className="hover:text-[#EA580C] transition-colors">Home</button>
            <span>/</span>
            <button onClick={() => navigateTo('/courses')} className="hover:text-[#EA580C] transition-colors">Courses</button>
            <span>/</span>
            <span className="text-[#072118] font-semibold truncate font-sans">{course.title}</span>
          </div>
          <span className="shrink-0 bg-[#EBF2EC] text-[#059669] px-2.5 py-0.5 rounded text-[11px] font-semibold border border-emerald-200">
            {course.format || 'Live Cohort'}
          </span>
        </div>
      </section>

      {/* 2. HERO OVERVIEW & STICKY ENROLLMENT DECK */}
      <section className="py-10 md:py-14 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column (8 cols): Title, Description, Outcomes, Instructor */}
          <div className="lg:col-span-8 space-y-8">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="font-mono uppercase tracking-wider font-semibold text-[#1D4ED8] bg-blue-50 px-2.5 py-1 rounded border border-blue-200">
                  {course.category}
                </span>
                <span className="font-semibold text-slate-700 bg-slate-100 px-2.5 py-1 rounded">
                  {course.level} Tier
                </span>
                {course.language && (
                  <span className="text-slate-600 bg-slate-100 px-2.5 py-1 rounded font-medium">
                    {course.language}
                  </span>
                )}
              </div>

              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#000825] tracking-tight leading-tight">
                {course.title}
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
                {course.description}
              </p>

              {/* Instructor Bio Bar */}
              <div className="pt-2 flex items-center gap-3">
                <img
                  src={course.instructorPhoto}
                  alt={course.instructorName}
                  className="w-12 h-12 rounded-xl object-cover border border-slate-300 shadow-xs"
                />
                <div>
                  <h3 className="font-display font-bold text-sm text-[#000825]">{course.instructorName}</h3>
                  <p className="text-xs text-slate-500 font-medium">{course.instructorTitle}</p>
                </div>
              </div>
            </div>

            {/* Quick Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 border-y border-slate-200 py-4 font-mono text-xs text-slate-600">
              <div>
                <span className="text-slate-400 block text-[11px] uppercase">Duration</span>
                <strong className="text-[#000825] text-base font-bold font-display">{course.durationWeeks || 8} Weeks</strong>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px] uppercase">Lab Hours</span>
                <strong className="text-[#000825] text-base font-bold font-display">{course.liveHours || 24} Hours</strong>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px] uppercase">Curriculum</span>
                <strong className="text-[#000825] text-base font-bold font-display">{modules.length} Modules ({totalLessons} Lessons)</strong>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px] uppercase">Certificate</span>
                <strong className="text-emerald-700 text-base font-bold font-display">Included</strong>
              </div>
            </div>

            {/* Prerequisites & Target Audience Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
              <div className="bg-[#F8FAFC] p-5 rounded-xl border border-slate-200 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-[#000825]">
                  <CheckCircle2 className="w-4 h-4 text-[#1D4ED8]" />
                  <span>Prerequisites</span>
                </div>
                <ul className="text-xs text-slate-600 space-y-1.5 list-disc list-inside">
                  {course.prerequisites?.map((pre, i) => (
                    <li key={i} className="leading-relaxed">{pre}</li>
                  )) || (
                    <li>Familiarity with software development and programming fundamentals.</li>
                  )}
                </ul>
              </div>

              <div className="bg-[#F8FAFC] p-5 rounded-xl border border-slate-200 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-[#000825]">
                  <Users className="w-4 h-4 text-[#1D4ED8]" />
                  <span>Target Audience</span>
                </div>
                <ul className="text-xs text-slate-600 space-y-1.5 list-disc list-inside">
                  {course.targetAudience?.map((aud, i) => (
                    <li key={i} className="leading-relaxed">{aud}</li>
                  )) || (
                    <li>Software developers, engineers, and tech founders scaling production systems.</li>
                  )}
                </ul>
              </div>
            </div>

            {/* Skills Covered Tags */}
            {course.skillsCovered && course.skillsCovered.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 font-mono">
                  Applied Competencies & Technologies
                </h4>
                <div className="flex flex-wrap gap-2">
                  {course.skillsCovered.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-white border border-slate-200 text-[#000825] rounded-lg text-xs font-medium font-mono"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column (4 cols): Sticky Enrollment & Checkout Card */}
          <div className="lg:col-span-4 lg:sticky lg:top-24">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 shadow-sm space-y-6">
              {/* Thumbnail Preview */}
              <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-900 border border-slate-200">
                <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-white/90 text-[#000825] flex items-center justify-center shadow-md">
                    <PlayCircle className="w-6 h-6 fill-current text-[#1D4ED8]" />
                  </div>
                </div>
              </div>

              {/* Price & Discount */}
              <div className="space-y-1">
                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="font-display text-3xl font-bold text-[#072118]">
                      ₹{course.price.toLocaleString('en-IN')}
                    </span>
                    {course.originalPrice > course.price && (
                      <span className="text-sm text-slate-400 line-through ml-2 font-mono">
                        ₹{course.originalPrice.toLocaleString('en-IN')}
                      </span>
                    )}
                  </div>
                  {course.originalPrice > course.price && (
                    <span className="text-xs font-mono text-emerald-800 bg-[#ECFDF5] px-2 py-0.5 rounded border border-[#A7F3D0] font-semibold">
                      SAVE {Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100)}%
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-[#6B7C72] font-mono">
                  One-time tuition fee • Includes GST invoice & permanent access
                </p>
              </div>

              {/* CTA Action */}
              {isEnrolled ? (
                <div className="space-y-2">
                  <div className="p-3 bg-[#ECFDF5] border border-[#A7F3D0] rounded-xl text-xs text-[#047857] font-semibold flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#059669] shrink-0" />
                    <span>You have an active verified enrolment for this track.</span>
                  </div>
                  <button
                    onClick={() => navigateTo(`/learn/${course.id}`)}
                    className="w-full py-3.5 bg-[#059669] hover:bg-[#047857] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <PlayCircle className="w-4 h-4" />
                    <span>Enter Learning Studio</span>
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <button
                    onClick={handleEnrollNow}
                    className="w-full py-3.5 bg-[#EA580C] hover:bg-[#C2410C] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
                  >
                    <span>Enroll Now (Instant Access)</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <p className="text-[10px] text-center text-[#6B7C72] font-mono">
                    Instant activation via UPI, Cards, Net Banking & Razorpay
                  </p>
                </div>
              )}

              {/* Trust Value Points */}
              <div className="pt-4 border-t border-[#E2E8E4] space-y-2.5 text-xs text-[#4E5D54]">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#059669]" />
                  <span>100% Fail-Closed Payment Security</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-[#EA580C]" />
                  <span>Verifiable Certificate upon Completion</span>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-[#059669]" />
                  <span>{course.resourcesCount || 16} Downloadable Toolkits & Sandboxes</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#059669]" />
                  <span>Lifetime Asynchronous Replay Access</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. STEP-BY-STEP DETAILED CURRICULUM ACCORDION */}
      <section className="py-16 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="max-w-2xl">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#1D4ED8]">
              Syllabus Structure
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#000825] mt-1 tracking-tight">
              Detailed Curriculum & Lesson Breakdown
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
              Explore weekly modules, theoretical lectures, hands-on lab codebases, and assessment checkpoints.
            </p>
          </div>

          <div className="space-y-4 max-w-4xl">
            {modules.map((mod, idx) => {
              const isOpen = activeModuleIndex === idx;

              return (
                <div
                  key={mod.title}
                  className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs transition-all"
                >
                  {/* Module Accordion Header */}
                  <button
                    onClick={() => setActiveModuleIndex(isOpen ? -1 : idx)}
                    className="w-full p-5 sm:p-6 text-left flex items-start sm:items-center justify-between gap-4 hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    <div className="flex items-start sm:items-center gap-3.5">
                      <div className="w-8 h-8 rounded-lg bg-slate-100 text-[#000825] font-mono font-bold text-xs flex items-center justify-center shrink-0 border border-slate-200">
                        0{idx + 1}
                      </div>
                      <div>
                        <h3 className="font-display text-sm sm:text-base font-bold text-[#000825]">
                          {mod.title}
                        </h3>
                        <p className="text-xs text-slate-500 font-mono mt-0.5">
                          {mod.duration} • {mod.lessons?.length || 0} Lessons
                        </p>
                      </div>
                    </div>

                    <ChevronDown
                      className={`w-5 h-5 text-slate-400 transition-transform duration-200 shrink-0 ${
                        isOpen ? 'rotate-180 text-[#1D4ED8]' : ''
                      }`}
                    />
                  </button>

                  {/* Module Lessons Body */}
                  {isOpen && (
                    <div className="border-t border-slate-100 p-5 sm:p-6 bg-[#F8FAFC] space-y-4 text-xs">
                      {/* Topics Overview */}
                      {mod.topics && mod.topics.length > 0 && (
                        <div>
                          <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-slate-500 block mb-1">
                            Key Core Competencies
                          </span>
                          <ul className="space-y-1 text-slate-700">
                            {mod.topics.map((t, tIdx) => (
                              <li key={tIdx} className="flex items-start gap-2">
                                <span className="text-[#1D4ED8] font-bold">•</span>
                                <span>{t}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Lab Title Callout */}
                      {mod.labTitle && (
                        <div className="p-3 bg-white border border-slate-200 rounded-lg">
                          <strong className="block text-[11px] font-mono uppercase tracking-wider text-[#1D4ED8]">
                            Practical Sandbox Lab
                          </strong>
                          <p className="text-slate-800 font-medium mt-0.5">{mod.labTitle}</p>
                        </div>
                      )}

                      {/* Lessons List */}
                      <div className="space-y-2 pt-1">
                        <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-slate-500 block">
                          Lessons Breakdown
                        </span>
                        {mod.lessons.map((les) => (
                          <div
                            key={les.id}
                            className="bg-white p-3 rounded-lg border border-slate-200 flex items-center justify-between gap-3"
                          >
                            <div className="flex items-center gap-2.5 min-w-0">
                              {les.type === 'video' && <PlayCircle className="w-4 h-4 text-[#1D4ED8] shrink-0" />}
                              {les.type === 'code' && <Code2 className="w-4 h-4 text-emerald-600 shrink-0" />}
                              {les.type === 'reading' && <FileText className="w-4 h-4 text-amber-600 shrink-0" />}
                              {les.type === 'quiz' && <HelpCircle className="w-4 h-4 text-purple-600 shrink-0" />}
                              {!les.type && <PlayCircle className="w-4 h-4 text-slate-400 shrink-0" />}

                              <span className="font-medium text-slate-800 truncate">{les.title}</span>
                            </div>

                            <div className="flex items-center gap-2 shrink-0 text-[11px] font-mono text-slate-500">
                              <span>{les.duration}</span>
                              {les.isPreview ? (
                                <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-1.5 py-0.5 rounded font-semibold text-[10px]">
                                  FREE PREVIEW
                                </span>
                              ) : (
                                <Lock className="w-3.5 h-3.5 text-slate-400" />
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. PRODUCTION CAPSTONE PROJECTS SHOWCASE */}
      {course.capstones && course.capstones.length > 0 && (
        <section className="py-16 bg-[#F8FAFC] border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
              <div className="max-w-2xl">
                <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#1D4ED8]">
                  Real-World Deliverables
                </span>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#000825] mt-1 tracking-tight">
                  Production Capstones Built in this Track
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                  You will not build trivial todo apps. Every capstone represents an enterprise architecture deployable to cloud infrastructure.
                </p>
              </div>

              {/* Technical Blueprint Vector Card */}
              <div className="w-full lg:w-[420px] shrink-0">
                <CodeArchitectureIllustration className="w-full h-auto drop-shadow-md" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {course.capstones.map((cap) => (
                <div
                  key={cap.title}
                  className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col justify-between shadow-xs"
                >
                  <div className="space-y-4">
                    <div className="relative aspect-video rounded-lg overflow-hidden bg-slate-900 border border-slate-200">
                      <img src={cap.image} alt={cap.title} className="w-full h-full object-cover" />
                      <div className="absolute top-2.5 left-2.5 bg-[#000825] text-white px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider">
                        {cap.badge}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-display font-bold text-base text-[#000825]">{cap.title}</h3>
                      <p className="text-xs text-slate-600 leading-relaxed mt-1">{cap.description}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-4 mt-4 border-t border-slate-100">
                    {cap.tags.map((tag) => (
                      <span key={tag} className="bg-slate-100 text-slate-700 text-[11px] font-mono px-2 py-0.5 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 5. ACADEMIC CERTIFICATE SPECIFICATION */}
      <section className="py-16 bg-white border-b border-[#E2E8E4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#072118] text-white rounded-3xl p-8 sm:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border border-[#0D3829] shadow-md">
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#34D399]">
                Official Credential Standard
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Verifiable Certificate of Accomplishment
              </h2>
              <p className="text-xs sm:text-sm text-emerald-100/80 leading-relaxed max-w-2xl">
                Issued exclusively upon verification of completed curriculum milestones and passing grades on module assessments. Dual endorsed by Lead Technical Architect <strong>Tauqeer Ashraf (MCA)</strong> and Technical Advisory Lead <strong>Dr. Revant Gautam</strong>.
              </p>
              <div className="pt-2 flex flex-wrap gap-4 text-xs text-emerald-200/70 font-mono">
                <span>• Unique Registry Serial ID</span>
                <span>• LinkedIn Credential Ready</span>
                <span>• Permanent Verification Record</span>
              </div>
            </div>

            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-sm">
                <AcademicDiplomaIllustration className="w-full h-auto drop-shadow-xl" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. COURSE FAQS */}
      <section className="py-16 bg-[#F8FAFC] border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#1D4ED8]">
              Curriculum Clarifications
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#000825] mt-1 tracking-tight">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div key={faq.q} className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
                <button
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between text-xs sm:text-sm font-bold text-[#000825] hover:text-[#1D4ED8] transition-colors cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform ${
                      activeFaq === idx ? 'rotate-180 text-[#1D4ED8]' : ''
                    }`}
                  />
                </button>
                {activeFaq === idx && (
                  <div className="px-5 pb-5 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
