import React, { useState, useEffect, useRef } from 'react';
import {
  CertificateData,
  downloadCertificatePDF,
  DEFAULT_LEFT_SIGNATORY,
  DEFAULT_RIGHT_SIGNATORY,
} from '../services/certificateService';
import { AcademicSeal } from './AcademicSeal';
import {
  Award,
  Download,
  Printer,
  Check,
  Copy,
  X,
  ShieldCheck,
  Sparkles,
  User,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Minimize2,
  RefreshCw,
  ExternalLink,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { GXA_LOGO_URL } from '../data/mockData';
import { GXALogoStacked } from './GXALogo';

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  certificateData: CertificateData;
  onNameChange?: (name: string) => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  isOpen,
  onClose,
  certificateData,
  onNameChange,
}) => {
  const [studentName, setStudentName] = useState(certificateData.studentName?.trim() || 'Enrolled Student');
  const [isEditingName, setIsEditingName] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [downloading, setDownloading] = useState(false);

  // Zoom & Scaled responsive preview state
  const [zoomMode, setZoomMode] = useState<'fit' | '100' | '125'>('fit');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState<number>(840);

  // Measure preview container for proportional mobile scaling
  useEffect(() => {
    if (!isOpen) return;

    const updateWidth = () => {
      if (containerRef.current) {
        const measured = containerRef.current.clientWidth;
        if (measured > 0) {
          setContainerWidth(measured);
        }
      }
    };

    updateWidth();
    const timer = setTimeout(updateWidth, 100);
    window.addEventListener('resize', updateWidth);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', updateWidth);
    };
  }, [isOpen, isFullscreen]);

  // Sync incoming student name
  useEffect(() => {
    if (certificateData.studentName) {
      setStudentName(certificateData.studentName.trim());
    }
  }, [certificateData.studentName]);

  if (!isOpen) return null;

  const currentOrigin = typeof window !== 'undefined' ? window.location.origin : 'https://gxacareeracademy.com';
  const resolvedVerifyUrl =
    certificateData.verificationUrl || `${currentOrigin}/verify/${certificateData.certificateId}`;

  const currentData: CertificateData = {
    ...certificateData,
    studentName: studentName.trim() || 'Enrolled Student',
    leftSignatory: certificateData.leftSignatory || DEFAULT_LEFT_SIGNATORY,
    rightSignatory: certificateData.rightSignatory || DEFAULT_RIGHT_SIGNATORY,
    verificationUrl: resolvedVerifyUrl,
    isVerified: certificateData.isVerified !== false,
  };

  // Canonical Certificate Resolution: 840px × 594px (A4 Landscape 297mm × 210mm @ 1.414:1)
  const canonicalWidth = 840;
  const canonicalHeight = 594;

  const fitScale = Math.min(1, Math.max(0.32, (containerWidth - 24) / canonicalWidth));
  const activeScale = zoomMode === '100' ? 1.0 : zoomMode === '125' ? 1.25 : fitScale;
  const isZoomed = zoomMode !== 'fit';

  const handleDownloadPDF = () => {
    setDownloading(true);
    try {
      downloadCertificatePDF(currentData);
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#EA580C', '#10B981', '#059669', '#FB923C'],
      });
    } catch (e) {
      console.error('Failed to generate PDF:', e);
    } finally {
      setTimeout(() => setDownloading(false), 800);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(resolvedVerifyUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleNameSave = () => {
    setIsEditingName(false);
    if (onNameChange && studentName.trim()) {
      onNameChange(studentName.trim());
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-[#072118]/85 backdrop-blur-md flex flex-col items-center justify-center p-2 sm:p-4 overflow-y-auto animate-fadeIn"
      onClick={onClose}
    >
      <div
        className={`bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-[#E2E8E4] overflow-hidden flex flex-col my-auto transition-all duration-200 ${
          isFullscreen ? 'w-full h-full max-w-none rounded-none' : 'max-w-5xl w-full'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Modal Action Toolbar */}
        <div className="bg-[#072118] text-white px-4 sm:px-6 py-3.5 flex items-center justify-between gap-3 border-b border-white/10 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center shrink-0">
              <Award className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div>
              <h3 className="font-display text-xs sm:text-sm md:text-base font-bold text-white leading-tight">
                Certificate of Accomplishment
              </h3>
              <p className="text-[10px] sm:text-[11px] text-white/60 hidden sm:block">
                GXA Technology Academic & Professional Verification
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Zoom Controls */}
            <div className="flex items-center bg-white/10 rounded-xl p-0.5 border border-white/10 text-xs">
              <button
                onClick={() => setZoomMode('fit')}
                className={`px-2 py-1 rounded-lg text-[11px] font-semibold transition-colors ${
                  zoomMode === 'fit' ? 'bg-[#EA580C] text-white' : 'text-white/70 hover:text-white'
                }`}
                title="Fit to Screen (Responsive)"
              >
                Fit
              </button>
              <button
                onClick={() => setZoomMode('100')}
                className={`px-2 py-1 rounded-lg text-[11px] font-semibold transition-colors ${
                  zoomMode === '100' ? 'bg-[#EA580C] text-white' : 'text-white/70 hover:text-white'
                }`}
                title="Actual Size 100%"
              >
                100%
              </button>
              <button
                onClick={() => setZoomMode(zoomMode === '125' ? 'fit' : '125')}
                className={`p-1 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors ${
                  zoomMode === '125' ? 'text-emerald-300' : ''
                }`}
                title="Zoom 125%"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Fullscreen Toggle */}
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-white/80 hover:text-white border border-white/10 transition-colors hidden sm:flex"
              title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen Preview'}
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>

            {/* Close Modal */}
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl text-white/70 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Certificate Visual Canvas Preview Area */}
        <div
          ref={containerRef}
          className={`bg-[#F4F7F4] p-2 sm:p-5 flex flex-col items-center justify-center relative select-none ${
            isZoomed ? 'overflow-auto max-h-[72vh]' : 'overflow-hidden'
          }`}
          style={{ minHeight: `${Math.min(520, canonicalHeight * fitScale + 30)}px` }}
        >
          {/* Scaled Wrapper: Constrained so it never overflows horizontally on mobile */}
          <div
            style={{
              width: isZoomed ? `${canonicalWidth * activeScale}px` : `${canonicalWidth * fitScale}px`,
              height: isZoomed ? `${canonicalHeight * activeScale}px` : `${canonicalHeight * fitScale}px`,
              position: 'relative',
              transition: 'width 0.2s ease, height 0.2s ease',
            }}
            className="flex-shrink-0"
          >
            {/* Canonical 840x594 Certificate Document */}
            <div
              id="gxa-printable-certificate"
              style={{
                width: `${canonicalWidth}px`,
                height: `${canonicalHeight}px`,
                transform: `scale(${activeScale})`,
                transformOrigin: 'top left',
              }}
              className="bg-white rounded-2xl border-4 border-[#072118] relative shadow-2xl flex flex-col justify-between overflow-hidden p-8"
            >
              {/* Inner Double Borders (Terracotta + Emerald) */}
              <div className="absolute inset-2 border-2 border-[#EA580C] pointer-events-none rounded-xl" />
              <div className="absolute inset-3.5 border border-[#10B981]/40 pointer-events-none rounded-lg" />

              {/* Four Symmetrical Corner Ornaments */}
              <div className="absolute top-4 left-4 w-2.5 h-2.5 rounded-full bg-[#EA580C] shadow-xs" />
              <div className="absolute top-4 right-4 w-2.5 h-2.5 rounded-full bg-[#EA580C] shadow-xs" />
              <div className="absolute bottom-4 left-4 w-2.5 h-2.5 rounded-full bg-[#EA580C] shadow-xs" />
              <div className="absolute bottom-4 right-4 w-2.5 h-2.5 rounded-full bg-[#EA580C] shadow-xs" />

              {/* 1. Header: Parent Company & Platform */}
              <div className="text-center relative z-10 pt-1">
                <GXALogoStacked size="sm" />
                <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-[#EA580C] to-transparent mx-auto mt-2" />
              </div>

              {/* 2. Certificate Title & Conferred Recipient */}
              <div className="text-center my-auto py-2 relative z-10 space-y-1.5">
                <span className="text-[11px] font-extrabold tracking-widest uppercase text-[#072118] bg-[#E8F0EC] px-4 py-1 rounded-full inline-block">
                  CERTIFICATE OF ACCOMPLISHMENT
                </span>

                <p className="text-[11px] text-[#52635B] tracking-wide uppercase pt-1 font-medium">
                  This is proudly conferred upon
                </p>

                {/* Recipient Full Name */}
                <div className="relative group inline-block py-1">
                  {isEditingName ? (
                    <div className="flex items-center gap-2 justify-center">
                      <input
                        type="text"
                        value={studentName}
                        onChange={(e) => setStudentName(e.target.value)}
                        className="text-center font-display text-3xl font-extrabold text-[#072118] border-b-2 border-[#EA580C] focus:outline-none bg-transparent px-3 py-0.5"
                        autoFocus
                      />
                      <button
                        onClick={handleNameSave}
                        className="px-3 py-1 bg-[#EA580C] text-white text-xs font-bold rounded-lg shadow-sm cursor-pointer"
                      >
                        Save
                      </button>
                    </div>
                  ) : (
                    <div
                      onClick={() => setIsEditingName(true)}
                      className="cursor-pointer flex items-center justify-center gap-2 group"
                      title="Click to edit recipient name"
                    >
                      <h2 className="font-display text-3xl font-extrabold text-[#072118] tracking-tight">
                        {currentData.studentName}
                      </h2>
                      <User className="w-4 h-4 text-[#52635B] opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  )}
                  <div className="w-56 h-0.5 bg-[#EA580C] mx-auto mt-1" />
                </div>

                {/* Certificate Completion Statement */}
                <p className="text-[11px] text-[#45464E] max-w-xl mx-auto leading-relaxed pt-1">
                  for successfully fulfilling all completion requirements, capstone project reviews,
                  and practical code implementation milestones with verified distinction in:
                </p>

                {/* Course Title (Naturally Wrapped) */}
                <h3 className="font-display text-lg font-black text-[#047857] px-6 max-w-2xl mx-auto leading-snug">
                  {currentData.courseTitle}
                </h3>

                {/* Course Details */}
                <div className="text-[10px] text-[#52635B] font-medium flex items-center justify-center gap-2 flex-wrap pt-0.5">
                  <span>Track: {currentData.courseCategory || 'Applied AI'}</span>
                  <span>•</span>
                  <span>Duration: {currentData.duration || '8 Weeks Cohort'}</span>
                  <span>•</span>
                  <span className="text-emerald-700 font-bold">Grade: {currentData.grade || '100% Distinction'}</span>
                </div>
              </div>

              {/* 3. Signatures & Central Circular Seal */}
              <div className="relative z-10 grid grid-cols-3 items-end gap-4 text-center px-2 pb-1">
                {/* LEFT SIGNATURE: Tauqeer Ashraf */}
                <div className="flex flex-col items-center text-[10px]">
                  <div className="font-serif italic text-sm text-[#072118] mb-1 border-b border-[#94A3B8] pb-0.5 w-36 text-center">
                    {currentData.leftSignatory?.name || 'Tauqeer Ashraf'}
                  </div>
                  <div className="font-bold text-[#072118] text-[11px]">
                    {currentData.leftSignatory?.printedName || 'Tauqeer Ashraf (MCA)'}
                  </div>
                  <div className="text-[9.5px] text-[#52635B] leading-tight">
                    {currentData.leftSignatory?.title || 'Founder & Lead Technical Architect'}
                  </div>
                  <div className="text-[9px] text-[#85988F] font-medium">
                    {currentData.leftSignatory?.organization || 'GXA Technology'}
                  </div>
                </div>

                {/* CENTRAL CIRCULAR ACADEMIC SEAL */}
                <div className="flex flex-col items-center justify-center">
                  <AcademicSeal
                    isVerified={currentData.isVerified}
                    size={110}
                    className="drop-shadow-md"
                  />
                </div>

                {/* RIGHT SIGNATURE: Dr. Revant Gautam */}
                <div className="flex flex-col items-center text-[10px]">
                  <div className="font-serif italic text-sm text-[#072118] mb-1 border-b border-[#94A3B8] pb-0.5 w-36 text-center">
                    {currentData.rightSignatory?.name || 'Dr. Revant Gautam'}
                  </div>
                  <div className="font-bold text-[#072118] text-[11px]">
                    {currentData.rightSignatory?.printedName || 'Dr. Revant Gautam'}
                  </div>
                  <div className="text-[9.5px] text-[#52635B] leading-tight">
                    {currentData.rightSignatory?.title || 'Author & Technical Advisory Lead'}
                  </div>
                  <div className="text-[9px] text-[#85988F] font-medium">
                    {currentData.rightSignatory?.organization || 'GXA Career Academy'}
                  </div>
                </div>
              </div>

              {/* 4. Bottom Security & Telemetry Footer */}
              <div className="pt-2.5 border-t border-[#E2E8E4] flex items-center justify-between text-[9px] text-[#52635B] font-mono">
                <span>Certificate ID: {currentData.certificateId}</span>
                <span>Issued: {currentData.issueDate || 'October 2026'}</span>
                <span className="flex items-center gap-1 text-emerald-700 font-sans font-bold">
                  <ShieldCheck className="w-3.5 h-3.5" /> Verified Credential
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Bottom Action Controls */}
        <div className="bg-white px-4 sm:px-6 py-3.5 border-t border-[#E2E8E4] flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="text-[11px] sm:text-xs text-[#52635B] flex items-center gap-1.5 text-center sm:left">
            <Sparkles className="w-4 h-4 text-orange-500 shrink-0 hidden sm:inline" />
            <span>Click recipient name in preview to customize print name if needed</span>
          </div>

          <div className="flex items-center gap-2 flex-wrap justify-center sm:justify-end w-full sm:w-auto">
            <button
              onClick={handleCopyLink}
              className="px-3.5 py-2 bg-[#F1F5F2] hover:bg-[#E2E8E4] text-[#072118] text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
              title="Copy verification link"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedLink ? 'Copied!' : 'Copy Verify URL'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="px-3.5 py-2 bg-[#F1F5F2] hover:bg-[#E2E8E4] text-[#072118] text-xs font-bold rounded-xl transition-colors items-center gap-1.5 cursor-pointer hidden md:flex"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print</span>
            </button>

            <button
              onClick={handleDownloadPDF}
              disabled={downloading}
              className="px-5 py-2 bg-[#EA580C] hover:bg-[#C2410C] text-white text-xs font-bold rounded-xl transition-all shadow-md flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <Download className="w-4 h-4" />
              <span>{downloading ? 'Exporting PDF...' : 'Download PDF Certificate'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
