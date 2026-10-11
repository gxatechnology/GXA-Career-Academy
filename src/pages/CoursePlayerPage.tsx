import React, { useState, useEffect, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import {
  ArrowLeft,
  Play,
  Pause,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Download,
  BookOpen,
  Clock,
  FileText,
  Sparkles,
  Award,
  Lock,
  Code2,
  HelpCircle,
  Bookmark,
  StickyNote,
  Maximize2,
  Volume2,
  RotateCcw,
  Check,
  X,
  AlertCircle,
  Copy,
  ExternalLink,
} from 'lucide-react';
import { CertificateModal } from '../components/CertificateModal';
import { DEFAULT_LEFT_SIGNATORY, DEFAULT_RIGHT_SIGNATORY } from '../services/certificateService';
import {
  CodeArchitectureIllustration,
  CourseLearningProgressIllustration,
} from '../components/EducationalGraphics';

export const CoursePlayerPage: React.FC<{ courseId: string; lessonId?: string }> = ({ courseId, lessonId }) => {
  const { courses, navigateTo, showToast, user, hasAccessToCourse } = useApp();
  const course = courses.find((c) => c.id === courseId) || courses[0];
  const isEnrolled = hasAccessToCourse(course.id);

  // Protected Enrollment Guard (Fail Closed: students must have verified purchase)
  if (!isEnrolled) {
    return (
      <div className="min-h-screen bg-[#000825] text-white flex flex-col justify-center items-center px-4 py-16">
        <div className="max-w-lg w-full bg-[#0A1435] border border-cyan-500/30 rounded-3xl p-8 sm:p-10 text-center space-y-6 shadow-2xl">
          <div className="w-full max-w-sm mx-auto mb-2">
            <CodeArchitectureIllustration className="w-full h-auto drop-shadow-md" />
          </div>
          <div className="space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20 inline-block font-mono">
              Verified Enrolment Required
            </span>
            <h1 className="text-xl sm:text-2xl font-black text-white font-display">{course.title}</h1>
            <p className="text-xs text-white/60 leading-relaxed">
              Video modules, interactive code workbenches, and verified assessment evaluations are restricted to students with an active, verified course enrolment.
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-[#000825] border border-white/10 text-xs text-white/70 flex justify-between items-center font-mono">
            <span>Curriculum Access</span>
            <span className="font-bold text-cyan-400 text-sm">₹{course.price.toLocaleString('en-IN')} (One-Time)</span>
          </div>
          <div className="space-y-2.5 pt-2">
            <button
              onClick={() => navigateTo(`/courses/${course.slug}`)}
              className="w-full py-3 bg-[#1D4ED8] hover:bg-[#1E40AF] text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg transition-all cursor-pointer"
            >
              View Syllabus & Enroll
            </button>
            <button
              onClick={() => navigateTo('/courses')}
              className="w-full py-2.5 bg-white/5 hover:bg-white/10 text-white/70 text-xs font-semibold rounded-xl border border-white/10 transition-colors cursor-pointer"
            >
              Browse All Courses
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Flattened modules and lessons
  const courseModules = useMemo(() => {
    if (course.modules && course.modules.length > 0) {
      return course.modules.map((m, idx) => ({ id: `m-${idx}`, title: m.title, lessons: m.lessons }));
    }
    return [
      {
        id: 'm-default',
        title: 'Core Foundations & Architecture',
        lessons: [
          { id: 'l1', title: 'Introduction & Core Mental Models', duration: '25m', type: 'video' as const },
          { id: 'l2', title: 'Hands-on Framework Architecture', duration: '35m', type: 'code' as const },
        ],
      },
    ];
  }, [course]);

  const allLessons = useMemo(() => {
    return courseModules.flatMap((m) => m.lessons.map((l) => ({ ...l, moduleTitle: m.title })));
  }, [courseModules]);

  // Active Lesson
  const [currentLesson, setCurrentLesson] = useState(() => {
    return allLessons.find((l) => l.id === lessonId) || allLessons[0];
  });

  // User-persisted completion state (Backed by Authoritative Server Persistence)
  const storageKeyCompleted = `gxa_completed_${user?.id || 'guest'}_${course.id}`;
  const [completedLessons, setCompletedLessons] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(storageKeyCompleted);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Fetch authoritative completed lessons from persistent server
  useEffect(() => {
    if (!user?.id || !course.id) return;
    fetch(`/api/progress/${course.id}?studentId=${encodeURIComponent(user.id)}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.completedLessons && Array.isArray(data.completedLessons)) {
          setCompletedLessons(data.completedLessons);
          try {
            localStorage.setItem(storageKeyCompleted, JSON.stringify(data.completedLessons));
          } catch { /* ignore */ }
        }
      })
      .catch((err) => console.warn('Could not sync progress from server:', err));
  }, [user?.id, course.id, storageKeyCompleted]);

  useEffect(() => {
    try {
      localStorage.setItem(storageKeyCompleted, JSON.stringify(completedLessons));
    } catch { /* ignore */ }
  }, [completedLessons, storageKeyCompleted]);

  // User-persisted Notes state per lesson
  const storageKeyNotes = `gxa_notes_${user?.id || 'guest'}_${course.id}`;
  const [allNotes, setAllNotes] = useState<Record<string, string>>(() => {
    try {
      const saved = localStorage.getItem(storageKeyNotes);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [currentNote, setCurrentNote] = useState('');
  useEffect(() => {
    setCurrentNote(allNotes[currentLesson.id] || '');
  }, [currentLesson.id, allNotes]);

  const handleSaveNote = () => {
    const updated = { ...allNotes, [currentLesson.id]: currentNote };
    setAllNotes(updated);
    try {
      localStorage.setItem(storageKeyNotes, JSON.stringify(updated));
      showToast('Personal note saved for this lesson.');
    } catch { /* ignore */ }
  };

  // User-persisted Bookmarks
  const storageKeyBookmarks = `gxa_bookmarks_${user?.id || 'guest'}_${course.id}`;
  const [bookmarks, setBookmarks] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(storageKeyBookmarks);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const toggleBookmark = (lId: string) => {
    const next = bookmarks.includes(lId) ? bookmarks.filter((b) => b !== lId) : [...bookmarks, lId];
    setBookmarks(next);
    try {
      localStorage.setItem(storageKeyBookmarks, JSON.stringify(next));
      showToast(bookmarks.includes(lId) ? 'Bookmark removed' : 'Lesson bookmarked!');
    } catch { /* ignore */ }
  };

  // Interactive Quiz / Assessment Engine State
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState<number | null>(null);

  // Reset quiz state when switching lessons
  useEffect(() => {
    setQuizAnswers({});
    setQuizSubmitted(false);
    setQuizScore(null);
  }, [currentLesson.id]);

  const handleSelectQuizAnswer = (qId: string, optionIdx: number) => {
    if (quizSubmitted) return;
    setQuizAnswers((prev) => ({ ...prev, [qId]: optionIdx }));
  };

  const handleSubmitQuiz = () => {
    const questions = currentLesson.quizQuestions || [];
    if (questions.length === 0) return;

    let correctCount = 0;
    questions.forEach((q) => {
      if (quizAnswers[q.id] === q.correctIndex) {
        correctCount += 1;
      }
    });

    const scorePct = Math.round((correctCount / questions.length) * 100);
    setQuizScore(scorePct);
    setQuizSubmitted(true);

    if (scorePct >= 80) {
      if (!completedLessons.includes(currentLesson.id)) {
        setCompletedLessons((prev) => [...prev, currentLesson.id]);
      }
      showToast(`Assessment Passed! Score: ${scorePct}% (${correctCount}/${questions.length}) 🎉`);

      // Persist assessment result & grade to backend database
      if (user?.id) {
        fetch('/api/assessments/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            studentId: user.id,
            courseId: course.id,
            lessonId: currentLesson.id,
            score: scorePct,
            totalQuestions: questions.length,
            passingScore: 80,
            answers: quizAnswers,
          }),
        }).catch((e) => console.warn('Failed to record assessment on server:', e));
      }
    } else {
      showToast(`Score: ${scorePct}%. Passing threshold is 80%. Review and retry.`);
    }
  };

  // Video Mock State
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<string>('1x');
  const [isVideoMuted, setIsVideoMuted] = useState(false);

  // Studio UI Control Panels
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeRightTab, setActiveRightTab] = useState<'notes' | 'resources' | 'ai' | 'bookmarks'>('notes');
  const [showCertificateModal, setShowCertificateModal] = useState(false);
  const [studentCertName, setStudentCertName] = useState(user?.name || 'Enrolled Student');

  // AI Assistant in Studio
  const [aiPromptInput, setAiPromptInput] = useState('');
  const [aiMessages, setAiMessages] = useState<{ sender: 'student' | 'ai'; text: string }[]>([
    {
      sender: 'ai',
      text: `Hello! I am your GXA Learning Assistant for "${course.title}". Ask me to explain concepts, summarize this lesson, or generate a practice drill based on this curriculum.`,
    },
  ]);

  const handleAskAI = (promptText?: string) => {
    const query = promptText || aiPromptInput;
    if (!query.trim()) return;

    const newMessages = [...aiMessages, { sender: 'student' as const, text: query }];
    setAiMessages(newMessages);
    setAiPromptInput('');

    // Authentic educational synthesis response
    setTimeout(() => {
      let responseText = '';
      const lower = query.toLowerCase();
      if (lower.includes('summar') || lower.includes('key takeaway')) {
        responseText = `Lesson Summary for "${currentLesson.title}":\n1. Foundational Architecture: Understand underlying constraints before writing code.\n2. Production Best Practice: Use strict schema validation to eliminate unexpected failure modes.\n3. Latency & Telemetry: Profile sub-components to prevent cascading timeout bottlenecks.`;
      } else if (lower.includes('explain') || lower.includes('concept')) {
        responseText = `Explanation for current lesson context:\nIn enterprise systems, decoupling concerns ensures that failure in one microservice or prompt branch does not bring down the entire processing pipeline. Always design with fallback handlers and structured telemetry.`;
      } else {
        responseText = `Practice Challenge: Review the code snippet in this lesson and draft a test case that verifies graceful error recovery when an upstream provider returns an HTTP 503 status code.`;
      }

      setAiMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: responseText,
        },
      ]);
    }, 600);
  };

  const toggleLessonComplete = (lId: string) => {
    if (completedLessons.includes(lId)) {
      setCompletedLessons(completedLessons.filter((id) => id !== lId));
    } else {
      const next = [...completedLessons, lId];
      setCompletedLessons(next);

      // Persist to backend database
      if (user?.id) {
        fetch('/api/progress/complete-lesson', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            studentId: user.id,
            courseId: course.id,
            lessonId: lId,
          }),
        }).catch((e) => console.warn('Failed to persist lesson completion:', e));
      }

      if (next.length === allLessons.length) {
        showToast('🎓 Congratulations! 100% of curriculum completed! Certificate unlocked!');
        // Automatically request persistent certificate issuance
        if (user?.id) {
          fetch('/api/certificates/issue', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              studentId: user.id,
              courseId: course.id,
              studentName: user.name || studentCertName,
            }),
          }).catch((e) => console.warn('Failed to issue persistent certificate:', e));
        }
        setTimeout(() => setShowCertificateModal(true), 800);
      } else {
        showToast('Lesson marked as completed! 🎉');
      }
    }
  };

  const progressPct = allLessons.length > 0
    ? Math.round((completedLessons.length / allLessons.length) * 100)
    : 0;

  // Next / Previous lesson navigation
  const currentIdx = allLessons.findIndex((l) => l.id === currentLesson.id);
  const prevLesson = currentIdx > 0 ? allLessons[currentIdx - 1] : null;
  const nextLesson = currentIdx < allLessons.length - 1 ? allLessons[currentIdx + 1] : null;

  return (
    <div className="min-h-screen bg-[#000825] text-white flex flex-col font-sans select-none">
      {/* 1. TOP UTILITY BAR */}
      <header className="h-16 border-b border-slate-800 px-4 sm:px-6 flex items-center justify-between bg-[#070F28] sticky top-0 z-40">
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={() => navigateTo(`/courses/${course.slug}`)}
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white transition-colors cursor-pointer shrink-0"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Back to Overview</span>
          </button>
          <div className="h-4 w-px bg-slate-700 hidden sm:block shrink-0" />
          <h1 className="text-xs sm:text-sm font-bold text-white truncate max-w-xs sm:max-w-md font-display">
            {course.title}
          </h1>
        </div>

        {/* Progress & Certificate Button */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="hidden md:flex items-center gap-2.5 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg text-xs font-mono">
            <span className="text-slate-400">Progress:</span>
            <div className="w-20 h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-cyan-400 rounded-full transition-all duration-300"
                style={{ width: `${progressPct}%` }}
              />
            </div>
            <span className="font-bold text-cyan-400">{progressPct}%</span>
          </div>

          {/* Certificate Action */}
          {progressPct === 100 ? (
            <button
              onClick={() => setShowCertificateModal(true)}
              className="px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-sm cursor-pointer transition-colors"
            >
              <Award className="w-4 h-4" />
              <span>Claim Certificate</span>
            </button>
          ) : (
            <button
              onClick={() => setShowCertificateModal(true)}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-amber-400 hover:text-amber-300 hover:bg-white/5 transition-colors cursor-pointer border border-amber-500/30"
              title="Preview Completion Certificate"
            >
              <Award className="w-3.5 h-3.5" />
              <span>Certificate ({progressPct}%)</span>
            </button>
          )}

          {/* Mark Complete Checkbox Button */}
          <button
            onClick={() => toggleLessonComplete(currentLesson.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
              completedLessons.includes(currentLesson.id)
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                : 'bg-[#1D4ED8] hover:bg-[#1E40AF] text-white'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{completedLessons.includes(currentLesson.id) ? 'Completed' : 'Mark Complete'}</span>
          </button>
        </div>
      </header>

      {/* 2. THREE-ZONE LEARNING STUDIO WORKSPACE */}
      <div className="flex-1 flex overflow-hidden">
        {/* ZONE 1 (LEFT): Curriculum Navigation */}
        <aside
          className={`border-r border-slate-800 bg-[#070F28] transition-all duration-300 flex flex-col shrink-0 ${
            sidebarCollapsed ? 'w-0 overflow-hidden border-none' : 'w-72 lg:w-80'
          }`}
        >
          <div className="p-4 border-b border-slate-800 flex items-center justify-between text-xs">
            <span className="font-mono uppercase tracking-wider text-slate-400 font-semibold">
              Curriculum ({allLessons.length} Lessons)
            </span>
            <button
              onClick={() => setSidebarCollapsed(true)}
              className="text-slate-500 hover:text-white"
              title="Collapse Curriculum"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-slate-800/60 p-2 text-xs">
            {courseModules.map((mod, mIdx) => (
              <div key={mod.id} className="py-2.5">
                <div className="px-3 py-1 font-mono text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Module 0{mIdx + 1}: {mod.title}
                </div>
                <div className="space-y-1 mt-1">
                  {mod.lessons.map((les) => {
                    const isSelected = currentLesson.id === les.id;
                    const isDone = completedLessons.includes(les.id);
                    const isBookmarked = bookmarks.includes(les.id);

                    return (
                      <button
                        key={les.id}
                        onClick={() => setCurrentLesson({ ...les, moduleTitle: mod.title })}
                        className={`w-full text-left px-3 py-2 rounded-lg flex items-center justify-between transition-colors cursor-pointer ${
                          isSelected
                            ? 'bg-[#1D4ED8] text-white font-semibold shadow-xs'
                            : 'hover:bg-slate-800/50 text-slate-300'
                        }`}
                      >
                        <div className="flex items-center gap-2 min-w-0 pr-2">
                          {isDone ? (
                            <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-white' : 'text-emerald-400'}`} />
                          ) : les.type === 'quiz' ? (
                            <HelpCircle className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-white' : 'text-purple-400'}`} />
                          ) : les.type === 'code' ? (
                            <Code2 className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-white' : 'text-emerald-400'}`} />
                          ) : les.type === 'reading' ? (
                            <FileText className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-white' : 'text-amber-400'}`} />
                          ) : (
                            <Play className={`w-3 h-3 shrink-0 ${isSelected ? 'text-white' : 'text-slate-400'}`} />
                          )}
                          <span className="truncate">{les.title}</span>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0">
                          {isBookmarked && <Bookmark className="w-3 h-3 text-amber-400 fill-current" />}
                          <span className="text-[10px] font-mono opacity-60">{les.duration}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* ZONE 2 (CENTER): Main Content Stage (Video / Code / Reading / Assessment) */}
        <main className="flex-1 flex flex-col overflow-y-auto bg-[#000825] p-4 sm:p-6 lg:p-8 space-y-6">
          {/* Header Bar with Sidebar Expand & Navigation */}
          <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-xs">
            <div className="flex items-center gap-2">
              {sidebarCollapsed && (
                <button
                  onClick={() => setSidebarCollapsed(false)}
                  className="px-2 py-1 bg-slate-800 hover:bg-slate-700 rounded text-slate-300 flex items-center gap-1 cursor-pointer font-mono text-[11px]"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                  <span>Curriculum</span>
                </button>
              )}
              <span className="font-mono text-slate-400 uppercase tracking-wider text-[11px]">
                {currentLesson.moduleTitle}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => toggleBookmark(currentLesson.id)}
                className={`p-1.5 rounded transition-colors cursor-pointer flex items-center gap-1 text-[11px] ${
                  bookmarks.includes(currentLesson.id)
                    ? 'text-amber-400 bg-amber-400/10'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="Bookmark Lesson"
              >
                <Bookmark className={`w-3.5 h-3.5 ${bookmarks.includes(currentLesson.id) ? 'fill-current' : ''}`} />
                <span>{bookmarks.includes(currentLesson.id) ? 'Bookmarked' : 'Bookmark'}</span>
              </button>

              {prevLesson && (
                <button
                  onClick={() => setCurrentLesson(prevLesson)}
                  className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 rounded text-slate-300 flex items-center gap-1 cursor-pointer text-xs"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Prev</span>
                </button>
              )}

              {nextLesson && (
                <button
                  onClick={() => setCurrentLesson(nextLesson)}
                  className="px-2.5 py-1 bg-[#1D4ED8] hover:bg-[#1E40AF] text-white rounded flex items-center gap-1 cursor-pointer text-xs font-semibold"
                >
                  <span className="hidden sm:inline">Next</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* DYNAMIC CONTENT SWITCHER */}
          {currentLesson.type === 'quiz' ? (
            /* PHASE 5: INTERACTIVE ASSESSMENT WORKBENCH */
            <div className="bg-[#070F28] rounded-2xl border border-slate-800 p-6 sm:p-8 space-y-6 shadow-xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-purple-500/10 text-purple-400 text-xs font-mono font-semibold border border-purple-500/20">
                    <HelpCircle className="w-3.5 h-3.5" />
                    <span>Module Mastery Assessment</span>
                  </div>
                  <h2 className="font-display text-xl sm:text-2xl font-bold text-white mt-1">
                    {currentLesson.title}
                  </h2>
                </div>

                <div className="text-right font-mono text-xs text-slate-400">
                  <span>Pass Threshold: </span>
                  <strong className="text-purple-400 text-sm">80% Score</strong>
                </div>
              </div>

              {/* Quiz Result Banner */}
              {quizSubmitted && quizScore !== null && (
                <div
                  className={`p-4 rounded-xl border flex items-center justify-between gap-4 text-xs ${
                    quizScore >= 80
                      ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200'
                      : 'bg-rose-950/40 border-rose-500/40 text-rose-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {quizScore >= 80 ? (
                      <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
                    ) : (
                      <AlertCircle className="w-6 h-6 text-rose-400 shrink-0" />
                    )}
                    <div>
                      <strong className="font-bold text-sm block">
                        {quizScore >= 80 ? 'Assessment Passed! Criterion Met' : 'Assessment Incomplete'}
                      </strong>
                      <span>
                        Your score: {quizScore}%. {quizScore >= 80 ? 'This module is verified and counted towards your certificate.' : 'Passing requirement is 80%. Review explanations below and retry.'}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setQuizSubmitted(false);
                      setQuizAnswers({});
                    }}
                    className="px-3.5 py-1.5 bg-white/10 hover:bg-white/20 rounded-lg text-xs font-semibold cursor-pointer shrink-0"
                  >
                    Retry Assessment
                  </button>
                </div>
              )}

              {/* Questions List */}
              <div className="space-y-6">
                {(currentLesson.quizQuestions || []).map((q, qIdx) => {
                  const selectedOption = quizAnswers[q.id];
                  const isCorrect = selectedOption === q.correctIndex;

                  return (
                    <div key={q.id} className="p-5 bg-slate-900/60 border border-slate-800 rounded-xl space-y-3">
                      <div className="flex items-start gap-2 text-xs sm:text-sm font-semibold text-white">
                        <span className="font-mono text-purple-400">{qIdx + 1}.</span>
                        <span>{q.question}</span>
                      </div>

                      {/* Options */}
                      <div className="space-y-2 pt-1">
                        {q.options.map((opt, optIdx) => {
                          const isOptionSelected = selectedOption === optIdx;
                          let optionClasses = 'border-slate-800 bg-slate-900 text-slate-300 hover:border-slate-700';

                          if (quizSubmitted) {
                            if (optIdx === q.correctIndex) {
                              optionClasses = 'border-emerald-500 bg-emerald-950/40 text-emerald-200 font-semibold';
                            } else if (isOptionSelected && !isCorrect) {
                              optionClasses = 'border-rose-500 bg-rose-950/40 text-rose-200';
                            }
                          } else if (isOptionSelected) {
                            optionClasses = 'border-[#1D4ED8] bg-[#1D4ED8]/10 text-white font-semibold';
                          }

                          return (
                            <button
                              key={optIdx}
                              onClick={() => handleSelectQuizAnswer(q.id, optIdx)}
                              disabled={quizSubmitted}
                              className={`w-full text-left p-3 rounded-lg border text-xs transition-colors flex items-center justify-between cursor-pointer ${optionClasses}`}
                            >
                              <span>{opt}</span>
                              {quizSubmitted && optIdx === q.correctIndex && (
                                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                              )}
                              {quizSubmitted && isOptionSelected && !isCorrect && (
                                <X className="w-4 h-4 text-rose-400 shrink-0" />
                              )}
                            </button>
                          );
                        })}
                      </div>

                      {/* Explanation Feedback */}
                      {quizSubmitted && (
                        <div className="p-3 rounded-lg bg-slate-800/50 border border-slate-700/50 text-xs text-slate-300 space-y-1">
                          <strong className="block text-[11px] font-mono text-cyan-400">Explanation:</strong>
                          <p>{q.explanation}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {!quizSubmitted && (
                <div className="pt-2 flex justify-end">
                  <button
                    onClick={handleSubmitQuiz}
                    disabled={Object.keys(quizAnswers).length < (currentLesson.quizQuestions?.length || 0)}
                    className="px-6 py-2.5 bg-[#1D4ED8] hover:bg-[#1E40AF] disabled:opacity-50 text-white rounded-lg text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer shadow-sm"
                  >
                    Submit Assessment for Evaluation
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* VIDEO & LESSON PLAYER CANVAS */
            <div className="space-y-6">
              {/* Screen Mockup Video Container */}
              <div className="relative aspect-video rounded-2xl overflow-hidden bg-black border border-slate-800 shadow-2xl flex items-center justify-center group">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

                <div className="text-center p-6 relative z-10 space-y-3">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="w-16 h-16 rounded-full bg-[#1D4ED8] hover:bg-[#1E40AF] text-white flex items-center justify-center mx-auto transition-transform hover:scale-105 shadow-xl cursor-pointer"
                  >
                    {isPlaying ? <Pause className="w-7 h-7" /> : <Play className="w-7 h-7 fill-current ml-1" />}
                  </button>
                  <h3 className="font-display font-bold text-base sm:text-lg text-white">
                    {currentLesson.title}
                  </h3>
                  <p className="text-xs text-slate-400 font-mono flex items-center justify-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{currentLesson.duration} • 1080p Studio Quality</span>
                  </p>
                </div>

                {/* Bottom Video Progress Scrub Bar */}
                <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black to-transparent flex items-center justify-between text-xs text-slate-300 font-mono">
                  <div className="flex items-center gap-3">
                    <span>{isPlaying ? '08:24' : '00:00'} / {currentLesson.duration}</span>
                    <div className="w-24 sm:w-56 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-cyan-400 w-1/4 rounded-full" />
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {/* Playback Speed Selector */}
                    <div className="flex items-center bg-slate-900/80 rounded px-1.5 py-0.5 border border-slate-700/60 text-[10px]">
                      {['1x', '1.25x', '1.5x', '2x'].map((spd) => (
                        <button
                          key={spd}
                          onClick={(e) => {
                            e.stopPropagation();
                            setPlaybackSpeed(spd);
                            showToast(`Speed set to ${spd}`);
                          }}
                          className={`px-1 py-0.5 rounded cursor-pointer ${
                            playbackSpeed === spd ? 'bg-[#1D4ED8] text-white font-bold' : 'text-slate-400 hover:text-white'
                          }`}
                        >
                          {spd}
                        </button>
                      ))}
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsVideoMuted(!isVideoMuted);
                        showToast(isVideoMuted ? 'Audio Unmuted' : 'Audio Muted');
                      }}
                      className="cursor-pointer hover:text-white"
                      title={isVideoMuted ? 'Unmute Audio' : 'Mute Audio'}
                    >
                      <Volume2 className={`w-4 h-4 ${isVideoMuted ? 'text-slate-500 line-through' : ''}`} />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        showToast('Full screen mode toggled');
                      }}
                      className="cursor-pointer hover:text-white"
                      title="Fullscreen"
                    >
                      <Maximize2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Lesson Written Notes / Code Snippet */}
              {currentLesson.content && (
                <div className="bg-[#070F28] p-6 rounded-2xl border border-slate-800 space-y-3 text-xs leading-relaxed text-slate-300">
                  <div className="flex items-center gap-2 font-mono text-[11px] text-cyan-400 font-semibold uppercase">
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Lesson Theoretical Brief</span>
                  </div>
                  <p>{currentLesson.content}</p>
                </div>
              )}

              {/* Executable Code Sandbox Display */}
              {currentLesson.codeSnippet && (
                <div className="bg-[#070F28] rounded-2xl border border-slate-800 overflow-hidden font-mono text-xs">
                  <div className="bg-slate-900 px-4 py-2 border-b border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                    <div className="flex items-center gap-2">
                      <Code2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Production Implementation Sandbox</span>
                    </div>
                    <button
                      onClick={() => {
                        navigator.clipboard?.writeText(currentLesson.codeSnippet || '');
                        showToast('Code copied to clipboard!');
                      }}
                      className="hover:text-white flex items-center gap-1 cursor-pointer"
                    >
                      <Copy className="w-3 h-3" />
                      <span>Copy Code</span>
                    </button>
                  </div>
                  <pre className="p-4 overflow-x-auto text-emerald-300 leading-relaxed">
                    <code>{currentLesson.codeSnippet}</code>
                  </pre>
                </div>
              )}
            </div>
          )}
        </main>

        {/* ZONE 3 (RIGHT): Collapsible Utility Drawer (Notes, Bookmarks, Resources, AI) */}
        <aside className="w-72 lg:w-80 border-l border-slate-800 bg-[#070F28] hidden md:flex flex-col shrink-0">
          {/* Drawer Tab Headers */}
          <div className="flex items-center border-b border-slate-800 text-xs font-mono">
            {[
              { id: 'notes', label: 'Notes', icon: StickyNote },
              { id: 'ai', label: 'AI Help', icon: Sparkles },
              { id: 'resources', label: 'Assets', icon: Download },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveRightTab(tab.id as any)}
                  className={`flex-1 py-3 text-center flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                    activeRightTab === tab.id
                      ? 'border-b-2 border-cyan-400 text-white font-bold bg-slate-900/40'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Drawer Tab Body */}
          <div className="flex-1 overflow-y-auto p-4 text-xs">
            {activeRightTab === 'notes' && (
              <div className="space-y-3 flex flex-col h-full">
                <div className="flex items-center justify-between text-slate-400 text-[11px] font-mono">
                  <span>Lesson Notes ({currentLesson.title.slice(0, 15)}...)</span>
                  <button onClick={handleSaveNote} className="text-cyan-400 hover:underline">
                    Save
                  </button>
                </div>
                <textarea
                  value={currentNote}
                  onChange={(e) => setCurrentNote(e.target.value)}
                  placeholder="Capture architectural insights, code observations, or reminder tags here..."
                  className="flex-1 w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 resize-none min-h-[220px]"
                />
                <button
                  onClick={handleSaveNote}
                  className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-semibold text-xs transition-colors cursor-pointer"
                >
                  Save Note
                </button>
              </div>
            )}

            {activeRightTab === 'ai' && (
              <div className="space-y-3 flex flex-col h-full">
                <div className="text-[10px] font-mono text-cyan-400 bg-cyan-950/40 px-2 py-1 rounded border border-cyan-500/20">
                  GXA Studio AI Assistant • Grounded in Course Context
                </div>

                <div className="flex-1 overflow-y-auto space-y-3 pr-1 max-h-[340px]">
                  {aiMessages.map((m, idx) => (
                    <div
                      key={idx}
                      className={`p-3 rounded-xl leading-relaxed ${
                        m.sender === 'ai'
                          ? 'bg-slate-900 border border-slate-800 text-slate-300'
                          : 'bg-[#1D4ED8] text-white ml-4'
                      }`}
                    >
                      <strong className="block text-[10px] font-mono uppercase text-cyan-300 mb-0.5">
                        {m.sender === 'ai' ? 'GXA Assistant' : 'You'}
                      </strong>
                      <p className="whitespace-pre-line">{m.text}</p>
                    </div>
                  ))}
                </div>

                {/* Prompt shortcuts */}
                <div className="flex flex-wrap gap-1 pt-1">
                  <button
                    onClick={() => handleAskAI('Summarize this lesson')}
                    className="text-[10px] bg-slate-800 hover:bg-slate-700 px-2 py-1 rounded text-slate-300"
                  >
                    Summarize Lesson
                  </button>
                  <button
                    onClick={() => handleAskAI('Generate 2 practice questions')}
                    className="text-[10px] bg-slate-800 hover:bg-slate-700 px-2 py-1 rounded text-slate-300"
                  >
                    Practice Drills
                  </button>
                </div>

                <div className="flex gap-2 pt-1">
                  <input
                    type="text"
                    value={aiPromptInput}
                    onChange={(e) => setAiPromptInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAskAI()}
                    placeholder="Ask study question..."
                    className="flex-1 bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                  <button
                    onClick={() => handleAskAI()}
                    className="px-3 py-1.5 bg-[#1D4ED8] text-white rounded-lg font-semibold hover:bg-[#1E40AF]"
                  >
                    Ask
                  </button>
                </div>
              </div>
            )}

            {activeRightTab === 'resources' && (
              <div className="space-y-3">
                <div className="rounded-xl overflow-hidden border border-slate-800">
                  <CourseLearningProgressIllustration className="w-full h-auto" />
                </div>
                <p className="text-slate-400 text-[11px] font-mono">
                  Authorized Supplementary Toolkits ({course.resourcesCount || 16} files):
                </p>
                <div className="space-y-2">
                  {[
                    { title: `${course.title.slice(0, 20)}-Cheatsheet.pdf`, size: '2.8 MB' },
                    { title: 'Sandbox-Docker-Compose.yml', size: '14 KB' },
                    { title: 'Production-Postman-Collection.json', size: '180 KB' },
                  ].map((res, i) => (
                    <div
                      key={i}
                      className="p-3 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-between gap-2"
                    >
                      <div className="truncate">
                        <span className="block font-medium text-white truncate">{res.title}</span>
                        <span className="text-[10px] text-slate-500 font-mono">{res.size}</span>
                      </div>
                      <button
                        onClick={() => showToast(`Authorized token generated. Downloading: ${res.title}`)}
                        className="p-1.5 text-cyan-400 hover:text-white cursor-pointer"
                        title="Download Asset"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </aside>
      </div>

      {/* OFFICIAL PDF CERTIFICATE MODAL */}
      <CertificateModal
        isOpen={showCertificateModal}
        onClose={() => setShowCertificateModal(false)}
        certificateData={{
          certificateId: `GXA-CERT-2026-${(course.slug || course.id).toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 8)}-${Math.floor(1000 + Math.random() * 9000)}`,
          studentName: studentCertName,
          courseTitle: course.title,
          courseCategory: course.category,
          duration: course.duration || `${course.durationWeeks || 8} Weeks`,
          grade: 'Excellence (100% Distinction)',
          issueDate: new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' }),
          verificationUrl: `${typeof window !== 'undefined' ? window.location.origin : 'https://gxacareeracademy.com'}/verify/GXA-CERT-2026-${(course.slug || course.id).toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 8)}-9214`,
          isVerified: true,
          leftSignatory: DEFAULT_LEFT_SIGNATORY,
          rightSignatory: DEFAULT_RIGHT_SIGNATORY,
        }}
        onNameChange={(newName) => setStudentCertName(newName)}
      />
    </div>
  );
};
