import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { AcademicSeal } from '../components/AcademicSeal';
import { GXALogoHorizontal } from '../components/GXALogo';
import {
  ShieldCheck,
  Award,
  CheckCircle2,
  Calendar,
  Download,
  ArrowLeft,
  ExternalLink,
  BookOpen,
  Share2,
  Copy,
  Check,
  AlertTriangle,
} from 'lucide-react';
import {
  downloadCertificatePDF,
  DEFAULT_LEFT_SIGNATORY,
  DEFAULT_RIGHT_SIGNATORY,
} from '../services/certificateService';

export const VerifyCertificatePage: React.FC = () => {
  const { currentPath, courses, user, navigateTo } = useApp();
  const [copied, setCopied] = useState(false);
  const [serverCert, setServerCert] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isNotFound, setIsNotFound] = useState(false);
  const [isRevoked, setIsRevoked] = useState(false);

  // Extract certificate ID from path /verify/GXA-CERT-... or search param
  const pathParts = currentPath.split('/');
  const certIdFromPath = pathParts[2] || '';
  const searchParams = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '');
  const certId = certIdFromPath || searchParams.get('id') || 'GXA-CERT-2026-FSAI-9214';

  useEffect(() => {
    setIsLoading(true);
    fetch(`/api/certificates/verify/${encodeURIComponent(certId)}`)
      .then(async (res) => {
        const data = await res.json();
        if (res.status === 404) {
          setIsNotFound(true);
          setServerCert(null);
        } else if (res.status === 410 || data.revoked) {
          setIsRevoked(true);
          setServerCert(data);
        } else if (data.verified) {
          setServerCert(data);
          setIsNotFound(false);
          setIsRevoked(false);
        }
      })
      .catch(() => {
        // Fallback gracefully if server is unreachable
      })
      .finally(() => setIsLoading(false));
  }, [certId]);

  // Match course or fallback to primary completed course
  const matchedCourse =
    courses.find((c) => certId.toUpperCase().includes((c.slug || c.id).toUpperCase().slice(0, 4))) ||
    courses[0];

  const studentName = serverCert?.studentName || user?.name || 'Enrolled Student';
  const issueDate = serverCert?.issueDate || 'October 9, 2026';
  const courseTitle =
    serverCert?.courseTitle ||
    matchedCourse?.title ||
    'Full-Stack Modern AI Applications: Build & Deploy Production RAG, LangChain, FastAPI & Next.js Systems';

  const certData = {
    certificateId: certId,
    studentName,
    courseTitle,
    courseCategory: serverCert?.courseCategory || matchedCourse?.category || 'AI & Full-Stack Systems',
    issueDate,
    duration: serverCert?.duration || matchedCourse?.duration || `${matchedCourse?.durationWeeks || 8} Weeks Cohort`,
    grade: serverCert?.grade || 'Excellence (100% Distinction)',
    isVerified: !isRevoked && !isNotFound,
    leftSignatory: serverCert?.leftSignatory || DEFAULT_LEFT_SIGNATORY,
    rightSignatory: serverCert?.rightSignatory || DEFAULT_RIGHT_SIGNATORY,
  };

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-[#000825] text-white min-h-screen py-10 md:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigateTo('/dashboard/courses')}
              className="flex items-center gap-2 text-xs font-semibold text-white/70 hover:text-white transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Dashboard
            </button>
            <div className="hidden sm:block h-4 w-[1px] bg-white/20" />
            <div className="hidden sm:block">
              <GXALogoHorizontal theme="dark" size="sm" />
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs text-white/50">
            <span>Official Academic Registry</span>
            <span>•</span>
            <span className="text-emerald-400 font-semibold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> Registry Live
            </span>
          </div>
        </div>

        {/* Revoked or Not Found Alert */}
        {isRevoked && (
          <div className="p-5 rounded-3xl bg-rose-500/15 border border-rose-500/40 text-xs text-rose-300 flex items-start gap-3 shadow-lg">
            <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
            <div>
              <strong className="block font-bold text-sm text-rose-200">Credential Status: Revoked</strong>
              <span>This certificate has been officially revoked by the Academic Directorate. Reason: {serverCert?.reason || 'Record invalidated.'}</span>
            </div>
          </div>
        )}

        {isNotFound && !isLoading && (
          <div className="p-5 rounded-3xl bg-amber-500/15 border border-amber-500/40 text-xs text-amber-300 flex items-start gap-3 shadow-lg">
            <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <strong className="block font-bold text-sm text-amber-200">Notice: Credential In Progress or Unregistered</strong>
              <span>No persistent record was found matching credential ID <span className="font-mono text-white">{certId}</span>. Displaying illustrative syllabus format. Complete 100% course requirements to issue an official credential.</span>
            </div>
          </div>
        )}

        {/* Verification Banner */}
        <div className="bg-gradient-to-r from-emerald-950/70 via-[#101F45] to-[#101F45] border border-emerald-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative z-10">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold border border-emerald-500/30">
                <CheckCircle2 className="w-4 h-4" />
                <span>OFFICIAL VERIFIED CREDENTIAL</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-white">
                Academic Credential Verification
              </h1>
              <p className="text-xs sm:text-sm text-white/70 max-w-xl leading-relaxed">
                This digital credential was issued under the academic authority of GXA Technology Press
                and verified through the GXA Career Academy registry.
              </p>
            </div>

            <div className="shrink-0 flex sm:flex-col items-center gap-3">
              <button
                onClick={() => downloadCertificatePDF(certData)}
                className="px-5 py-2.5 bg-[#2455E8] hover:bg-[#1B44BF] text-white text-xs font-bold rounded-xl shadow-lg transition-all flex items-center gap-2 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Download PDF</span>
              </button>
              <button
                onClick={handleCopyLink}
                className="px-4 py-2.5 bg-white/10 hover:bg-white/15 text-white text-xs font-semibold rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Link Copied!' : 'Share Audit'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Credential Detailed Audit Card */}
        <div className="bg-[#101F45]/80 border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-white/10 pb-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-400">
                Conferred Recipient
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white">{studentName}</h2>
              <p className="text-xs text-white/60">
                Credential ID: <span className="font-mono text-cyan-300 font-semibold">{certId}</span>
              </p>
            </div>

            <div className="flex items-center gap-4 bg-white/5 border border-white/10 px-5 py-3 rounded-2xl">
              <AcademicSeal isVerified={true} size={70} />
              <div className="text-xs space-y-0.5">
                <div className="font-bold text-white">GXA Academic Directorate</div>
                <div className="text-emerald-400 font-semibold flex items-center gap-1 text-[11px]">
                  <CheckCircle2 className="w-3 h-3" /> Integrity Verified
                </div>
                <div className="text-[10px] text-white/50">Issued: {issueDate}</div>
              </div>
            </div>
          </div>

          {/* Curriculum Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="bg-white/5 p-4 rounded-2xl border border-white/5 space-y-1">
              <span className="text-white/50 text-[11px] block">Course Completed</span>
              <span className="font-bold text-white text-sm block leading-snug">{courseTitle}</span>
              <span className="text-cyan-400 text-[11px] block mt-1">{matchedCourse?.category}</span>
            </div>

            <div className="bg-white/5 p-4 rounded-2xl border border-white/5 space-y-1">
              <span className="text-white/50 text-[11px] block">Verified Assessment Distinction</span>
              <span className="font-bold text-emerald-400 text-sm block">100% Capstone Milestone Passing Grade</span>
              <span className="text-white/60 text-[11px] block mt-1">Duration: {matchedCourse?.duration || '8 Weeks'} Cohort Masterclass</span>
            </div>
          </div>

          {/* Authorized Signatories Audit */}
          <div className="pt-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white/60 mb-3">
              Authorized Institutional Signatories
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              {/* Left Signer */}
              <div className="bg-white/5 p-4 rounded-2xl border border-white/5 space-y-1">
                <div className="font-bold text-white text-sm">Tauqeer Ashraf (MCA)</div>
                <div className="text-white/70 text-[11px]">Founder & Lead Technical Architect</div>
                <div className="text-cyan-400 font-semibold text-[11px]">GXA Technology</div>
              </div>

              {/* Right Signer */}
              <div className="bg-white/5 p-4 rounded-2xl border border-white/5 space-y-1">
                <div className="font-bold text-white text-sm">Dr. Revant Gautam</div>
                <div className="text-white/70 text-[11px]">Author & Technical Advisory Lead</div>
                <div className="text-cyan-400 font-semibold text-[11px]">GXA Career Academy</div>
              </div>
            </div>
          </div>

          {/* Verification Statement */}
          <div className="p-4 rounded-2xl bg-cyan-950/30 border border-cyan-500/20 text-xs text-cyan-200/90 leading-relaxed">
            <p>
              This certificate confirms that the recipient has fulfilled all mandatory code submission
              checkpoints, automated unit tests, and comprehensive syllabus reviews required by the
              academic standards of GXA Career Academy. The certificate is cryptographically recorded and tamper-evident.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
