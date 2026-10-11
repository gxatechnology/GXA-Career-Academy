import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  GXALogoHorizontal,
  GXALogoStacked,
  GXALogoIcon,
  GXALogoWithTagline,
  GXAEmblem,
} from '../components/GXALogo';
import {
  Sparkles,
  Copy,
  Check,
  Download,
  ArrowRight,
  ShieldCheck,
  Palette,
  Type,
  Layout,
  Maximize2,
  FileCode,
  CheckCircle2,
  AlertTriangle,
  ExternalLink,
  Layers,
} from 'lucide-react';

export const BrandGuidelinesPage: React.FC = () => {
  const { navigateTo, showToast } = useApp();

  // Background preview states for the 4 variations
  const [bgPreview, setBgPreview] = useState<{ [key: string]: 'light' | 'dark' | 'slate' }>({
    v1: 'light',
    v2: 'light',
    v3: 'dark',
    v4: 'light',
  });

  // Use image asset vs vector emblem toggle
  const [useImageEmblem, setUseImageEmblem] = useState<boolean>(false);

  // Copied feedback states
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copyToClipboard = (text: string, label: string) => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      setCopiedKey(label);
      showToast(`${label} copied to clipboard`);
      setTimeout(() => setCopiedKey(null), 2500);
    } catch {
      showToast(`${label}: Copy triggered`);
    }
  };

  const downloadSvg = (svgContent: string, filename: string) => {
    const blob = new Blob([svgContent], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast(`Downloaded ${filename}`);
  };

  // Raw SVG templates for pure standalone export
  const rawHorizontalSvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 160" width="640" height="160" fill="none">
  <!-- GXA Career Academy — Variation 1: Primary Horizontal Logo -->
  <g transform="translate(20, 20)">
    <!-- GXA Vector Emblem -->
    <path d="M 120 45 C 108 24, 86 12, 60 12 C 20 12, 0 42, 0 90 C 0 138, 26 166, 68 166 C 98 166, 120 148, 128 120 L 128 90 L 70 90 L 70 120 L 96 120 C 94 132, 82 140, 68 140 C 46 140, 32 122, 32 90 C 32 58, 48 38, 68 38 C 82 38, 94 46, 102 60 Z" fill="#000825"/>
    <path d="M 108 12 L 150 12 L 202 92 L 170 92 Z" fill="#1D4ED8"/>
    <path d="M 105 166 L 138 166 L 174 102 L 148 102 Z" fill="#1D4ED8"/>
    <path d="M 194 12 L 228 12 L 192 72 L 172 72 Z" fill="#1D4ED8"/>
    <path d="M 102 166 C 124 162, 152 144, 182 112 C 212 80, 238 50, 256 28 L 268 36 C 248 60, 220 92, 188 124 C 154 158, 124 170, 102 166 Z" fill="#94A3B8"/>
    <path d="M 252 64 L 294 14 L 244 26 L 258 42 Z" fill="#1D4ED8"/>
    <path d="M 252 26 L 286 26 L 348 166 L 308 166 L 292 126 L 240 126 L 226 166 L 188 166 Z" fill="#000825"/>
    <path d="M 250 74 L 278 108 L 234 108 Z" fill="#1D4ED8"/>
  </g>
  <!-- Architectural Divider -->
  <line x1="390" y1="35" x2="390" y2="125" stroke="#CBD5E1" stroke-width="2"/>
  <!-- Wordmark -->
  <text x="415" y="94" font-family="system-ui, -apple-system, 'Plus Jakarta Sans', sans-serif" font-weight="900" font-size="44" fill="#000825" letter-spacing="-1">GXA Career <tspan fill="#1D4ED8">Academy</tspan></text>
</svg>`;

  const rawStackedSvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 420" width="500" height="420" fill="none">
  <!-- GXA Career Academy — Variation 2: Stacked Institutional Logo -->
  <g transform="translate(100, 30) scale(0.85)">
    <path d="M 120 45 C 108 24, 86 12, 60 12 C 20 12, 0 42, 0 90 C 0 138, 26 166, 68 166 C 98 166, 120 148, 128 120 L 128 90 L 70 90 L 70 120 L 96 120 C 94 132, 82 140, 68 140 C 46 140, 32 122, 32 90 C 32 58, 48 38, 68 38 C 82 38, 94 46, 102 60 Z" fill="#000825"/>
    <path d="M 108 12 L 150 12 L 202 92 L 170 92 Z" fill="#1D4ED8"/>
    <path d="M 105 166 L 138 166 L 174 102 L 148 102 Z" fill="#1D4ED8"/>
    <path d="M 194 12 L 228 12 L 192 72 L 172 72 Z" fill="#1D4ED8"/>
    <path d="M 102 166 C 124 162, 152 144, 182 112 C 212 80, 238 50, 256 28 L 268 36 C 248 60, 220 92, 188 124 C 154 158, 124 170, 102 166 Z" fill="#94A3B8"/>
    <path d="M 252 64 L 294 14 L 244 26 L 258 42 Z" fill="#1D4ED8"/>
    <path d="M 252 26 L 286 26 L 348 166 L 308 166 L 292 126 L 240 126 L 226 166 L 188 166 Z" fill="#000825"/>
    <path d="M 250 74 L 278 108 L 234 108 Z" fill="#1D4ED8"/>
  </g>
  <text x="250" y="240" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-weight="900" font-size="36" fill="#000825" letter-spacing="-0.5">GXA Career <tspan fill="#1D4ED8">Academy</tspan></text>
  <line x1="80" y1="268" x2="160" y2="268" stroke="#1D4ED8" stroke-width="1.5" opacity="0.4"/>
  <text x="250" y="273" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-weight="700" font-size="16" fill="#1D4ED8" letter-spacing="1">Learn Today. Lead Tomorrow.</text>
  <line x1="340" y1="268" x2="420" y2="268" stroke="#1D4ED8" stroke-width="1.5" opacity="0.4"/>
  <text x="250" y="315" text-anchor="middle" font-family="monospace" font-weight="700" font-size="12" fill="#64748B" letter-spacing="3">GXA TECHNOLOGY • ACADEMIC &amp; PROFESSIONAL PRESS</text>
</svg>`;

  const rawIconSvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="256" height="256" fill="none">
  <!-- GXA Career Academy — Variation 3: Compact GXA Icon -->
  <rect width="256" height="256" rx="56" fill="#000825"/>
  <rect x="1" y="1" width="254" height="254" rx="55" stroke="#1E293B" stroke-width="2"/>
  <g transform="translate(24, 48) scale(0.6)">
    <path d="M 120 45 C 108 24, 86 12, 60 12 C 20 12, 0 42, 0 90 C 0 138, 26 166, 68 166 C 98 166, 120 148, 128 120 L 128 90 L 70 90 L 70 120 L 96 120 C 94 132, 82 140, 68 140 C 46 140, 32 122, 32 90 C 32 58, 48 38, 68 38 C 82 38, 94 46, 102 60 Z" fill="#FFFFFF"/>
    <path d="M 108 12 L 150 12 L 202 92 L 170 92 Z" fill="#1D4ED8"/>
    <path d="M 105 166 L 138 166 L 174 102 L 148 102 Z" fill="#1D4ED8"/>
    <path d="M 194 12 L 228 12 L 192 72 L 172 72 Z" fill="#1D4ED8"/>
    <path d="M 102 166 C 124 162, 152 144, 182 112 C 212 80, 238 50, 256 28 L 268 36 C 248 60, 220 92, 188 124 C 154 158, 124 170, 102 166 Z" fill="#94A3B8"/>
    <path d="M 252 64 L 294 14 L 244 26 L 258 42 Z" fill="#1D4ED8"/>
    <path d="M 252 26 L 286 26 L 348 166 L 308 166 L 292 126 L 240 126 L 226 166 L 188 166 Z" fill="#FFFFFF"/>
    <path d="M 250 74 L 278 108 L 234 108 Z" fill="#1D4ED8"/>
  </g>
</svg>`;

  const rawTaglineSvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 180" width="720" height="180" fill="none">
  <!-- GXA Career Academy — Variation 4: Horizontal Logo with Tagline -->
  <g transform="translate(20, 25)">
    <path d="M 120 45 C 108 24, 86 12, 60 12 C 20 12, 0 42, 0 90 C 0 138, 26 166, 68 166 C 98 166, 120 148, 128 120 L 128 90 L 70 90 L 70 120 L 96 120 C 94 132, 82 140, 68 140 C 46 140, 32 122, 32 90 C 32 58, 48 38, 68 38 C 82 38, 94 46, 102 60 Z" fill="#000825"/>
    <path d="M 108 12 L 150 12 L 202 92 L 170 92 Z" fill="#1D4ED8"/>
    <path d="M 105 166 L 138 166 L 174 102 L 148 102 Z" fill="#1D4ED8"/>
    <path d="M 194 12 L 228 12 L 192 72 L 172 72 Z" fill="#1D4ED8"/>
    <path d="M 102 166 C 124 162, 152 144, 182 112 C 212 80, 238 50, 256 28 L 268 36 C 248 60, 220 92, 188 124 C 154 158, 124 170, 102 166 Z" fill="#94A3B8"/>
    <path d="M 252 64 L 294 14 L 244 26 L 258 42 Z" fill="#1D4ED8"/>
    <path d="M 252 26 L 286 26 L 348 166 L 308 166 L 292 126 L 240 126 L 226 166 L 188 166 Z" fill="#000825"/>
    <path d="M 250 74 L 278 108 L 234 108 Z" fill="#1D4ED8"/>
  </g>
  <line x1="390" y1="30" x2="390" y2="150" stroke="#CBD5E1" stroke-width="2"/>
  <text x="415" y="74" font-family="system-ui, -apple-system, sans-serif" font-weight="900" font-size="38" fill="#000825" letter-spacing="-1">GXA Career <tspan fill="#1D4ED8">Academy</tspan></text>
  <text x="415" y="106" font-family="system-ui, -apple-system, sans-serif" font-weight="700" font-size="18" fill="#1D4ED8" letter-spacing="0.5">Learn Today. Lead Tomorrow.</text>
  <text x="415" y="132" font-family="monospace" font-weight="700" font-size="12" fill="#64748B" letter-spacing="2">A GXA TECHNOLOGY PLATFORM</text>
</svg>`;

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24 text-[#000825]">
      {/* 1. Academic Institutional Header */}
      <section className="bg-[#000825] text-white pt-14 pb-16 px-4 sm:px-6 lg:px-8 border-b border-slate-800 relative overflow-hidden">
        {/* Subtle background ambient grid */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#1D4ED8_1px,transparent_1px)] [background-size:24px_24px]" />

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1D4ED8]/20 border border-[#1D4ED8]/40 text-[#60A5FA] text-xs font-bold uppercase tracking-wider mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Official Brand Identity &amp; Logo System</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="max-w-2xl space-y-4">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
                GXA Career Academy
              </h1>
              <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed">
                Official institutional brand design specifications, vector geometry rules, and the four
                authoritative logo variations designed for high-resolution web, certificates, mobile applications,
                and print publications.
              </p>
            </div>

            {/* Quick Metadata Box */}
            <div className="bg-[#101F45]/90 border border-slate-700 rounded-2xl p-5 space-y-2.5 text-xs text-slate-300 shrink-0 lg:w-80 shadow-xl backdrop-blur-md">
              <div className="flex items-center justify-between border-b border-slate-700 pb-2">
                <span className="font-semibold text-slate-400">Official Brand:</span>
                <span className="font-bold text-white">GXA Career Academy</span>
              </div>
              <div className="flex items-center justify-between border-b border-slate-700 pb-2">
                <span className="font-semibold text-slate-400">Official Tagline:</span>
                <span className="font-bold text-[#60A5FA]">Learn Today. Lead Tomorrow.</span>
              </div>
              <div className="flex items-center justify-between border-b border-slate-700 pb-2">
                <span className="font-semibold text-slate-400">Parent Company:</span>
                <span className="font-bold text-white">GXA Technology</span>
              </div>
              <div className="flex items-center justify-between pt-0.5">
                <span className="font-semibold text-slate-400">Emblem Mode:</span>
                <button
                  onClick={() => setUseImageEmblem(!useImageEmblem)}
                  className="px-2 py-0.5 rounded bg-blue-600/40 text-blue-300 hover:bg-blue-600/60 transition-colors font-mono font-bold"
                >
                  {useImageEmblem ? 'Asset Image' : 'Vector SVG'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Four Logo Variations Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20">
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl space-y-12">
          <div>
            <div className="flex items-center justify-between flex-wrap gap-4 mb-2">
              <h2 className="text-2xl sm:text-3xl font-black text-[#000825] tracking-tight">
                The Four Official Logo Variations
              </h2>
              <div className="text-xs font-semibold text-slate-500">
                Preserving the original emblem • Tailored for specific layout contexts
              </div>
            </div>
            <p className="text-sm text-slate-600 max-w-3xl leading-relaxed">
              Every variation maintains the prominent <strong>GXA</strong> geometric identity with its upward
              career ascent vector, balanced against the authoritative <strong>Career Academy</strong> wordmark
              and the official academic motto.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-10">
            {/* VARIATION 1 */}
            <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
              <div className="bg-slate-50 border-b border-slate-200 px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-[#000825] text-white text-xs font-black flex items-center justify-center">
                      1
                    </span>
                    <h3 className="font-black text-base sm:text-lg text-[#000825]">
                      Primary Horizontal Logo
                    </h3>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Primary mark for website headers, navigation bars, app bars, and digital screens.
                  </p>
                </div>

                {/* Background switcher and export controls */}
                <div className="flex items-center gap-2">
                  <div className="flex items-center bg-slate-200 rounded-lg p-1 text-xs">
                    {(['light', 'dark', 'slate'] as const).map((bg) => (
                      <button
                        key={bg}
                        onClick={() => setBgPreview({ ...bgPreview, v1: bg })}
                        className={`px-2.5 py-1 rounded text-xs font-bold capitalize transition-colors ${
                          bgPreview.v1 === bg ? 'bg-white text-[#000825] shadow-xs' : 'text-slate-600 hover:text-black'
                        }`}
                      >
                        {bg}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => copyToClipboard(rawHorizontalSvg, 'Horizontal Logo SVG')}
                    className="p-2 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-700 transition-colors"
                    title="Copy SVG Code"
                  >
                    {copiedKey === 'Horizontal Logo SVG' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>

                  <button
                    onClick={() => downloadSvg(rawHorizontalSvg, 'gxa-career-academy-horizontal.svg')}
                    className="p-2 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-700 transition-colors"
                    title="Download SVG File"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Live Canvas Preview */}
              <div
                className={`py-14 px-6 sm:px-12 flex items-center justify-center transition-colors min-h-[160px] ${
                  bgPreview.v1 === 'dark'
                    ? 'bg-[#000825]'
                    : bgPreview.v1 === 'slate'
                    ? 'bg-slate-100'
                    : 'bg-white'
                }`}
              >
                <GXALogoHorizontal
                  theme={bgPreview.v1 === 'dark' ? 'dark' : 'light'}
                  size="lg"
                  useImageEmblem={useImageEmblem}
                />
              </div>

              <div className="bg-slate-50 px-6 py-3 border-t border-slate-200 text-xs text-slate-600 flex items-center justify-between flex-wrap gap-2">
                <span><strong>Proportions:</strong> 4:1 horizontal ratio</span>
                <span><strong>Clear Space:</strong> Minimum 16px padding on all sides</span>
                <span><strong>Primary Font:</strong> Modern Sans-Serif (Black &amp; Extra-Bold)</span>
              </div>
            </div>

            {/* VARIATION 2 */}
            <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
              <div className="bg-slate-50 border-b border-slate-200 px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-[#000825] text-white text-xs font-black flex items-center justify-center">
                      2
                    </span>
                    <h3 className="font-black text-base sm:text-lg text-[#000825]">
                      Stacked Institutional Logo
                    </h3>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Official insignia for Certificates of Accomplishment, Diplomas, Awards, and Formal Press.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex items-center bg-slate-200 rounded-lg p-1 text-xs">
                    {(['light', 'dark', 'slate'] as const).map((bg) => (
                      <button
                        key={bg}
                        onClick={() => setBgPreview({ ...bgPreview, v2: bg })}
                        className={`px-2.5 py-1 rounded text-xs font-bold capitalize transition-colors ${
                          bgPreview.v2 === bg ? 'bg-white text-[#000825] shadow-xs' : 'text-slate-600 hover:text-black'
                        }`}
                      >
                        {bg}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => copyToClipboard(rawStackedSvg, 'Stacked Institutional Logo SVG')}
                    className="p-2 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-700 transition-colors"
                    title="Copy SVG Code"
                  >
                    {copiedKey === 'Stacked Institutional Logo SVG' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>

                  <button
                    onClick={() => downloadSvg(rawStackedSvg, 'gxa-career-academy-stacked.svg')}
                    className="p-2 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-700 transition-colors"
                    title="Download SVG File"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Live Canvas Preview */}
              <div
                className={`py-14 px-6 sm:px-12 flex items-center justify-center transition-colors min-h-[220px] ${
                  bgPreview.v2 === 'dark'
                    ? 'bg-[#000825]'
                    : bgPreview.v2 === 'slate'
                    ? 'bg-slate-100'
                    : 'bg-white'
                }`}
              >
                <GXALogoStacked
                  theme={bgPreview.v2 === 'dark' ? 'dark' : 'light'}
                  size="md"
                  useImageEmblem={useImageEmblem}
                />
              </div>

              <div className="bg-slate-50 px-6 py-3 border-t border-slate-200 text-xs text-slate-600 flex items-center justify-between flex-wrap gap-2">
                <span><strong>Alignment:</strong> Symmetrical Center Stack</span>
                <span><strong>Motto:</strong> Learn Today. Lead Tomorrow.</span>
                <span><strong>Press Subline:</strong> GXA TECHNOLOGY • ACADEMIC &amp; PROFESSIONAL PRESS</span>
              </div>
            </div>

            {/* VARIATION 3 */}
            <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
              <div className="bg-slate-50 border-b border-slate-200 px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-[#000825] text-white text-xs font-black flex items-center justify-center">
                      3
                    </span>
                    <h3 className="font-black text-base sm:text-lg text-[#000825]">
                      Compact GXA Icon
                    </h3>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    1:1 Square icon for App Launcher, Favicons, Mobile PWA Badge, and Social Media Avatars.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex items-center bg-slate-200 rounded-lg p-1 text-xs">
                    {(['dark', 'light', 'slate'] as const).map((bg) => (
                      <button
                        key={bg}
                        onClick={() => setBgPreview({ ...bgPreview, v3: bg })}
                        className={`px-2.5 py-1 rounded text-xs font-bold capitalize transition-colors ${
                          bgPreview.v3 === bg ? 'bg-white text-[#000825] shadow-xs' : 'text-slate-600 hover:text-black'
                        }`}
                      >
                        {bg}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => copyToClipboard(rawIconSvg, 'Compact GXA Icon SVG')}
                    className="p-2 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-700 transition-colors"
                    title="Copy SVG Code"
                  >
                    {copiedKey === 'Compact GXA Icon SVG' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>

                  <button
                    onClick={() => downloadSvg(rawIconSvg, 'gxa-career-academy-icon.svg')}
                    className="p-2 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-700 transition-colors"
                    title="Download SVG File"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Live Canvas Preview */}
              <div
                className={`py-12 px-6 sm:px-12 flex items-center justify-center gap-8 transition-colors min-h-[160px] flex-wrap ${
                  bgPreview.v3 === 'dark'
                    ? 'bg-[#000825]'
                    : bgPreview.v3 === 'slate'
                    ? 'bg-slate-100'
                    : 'bg-white'
                }`}
              >
                <div className="flex flex-col items-center gap-2">
                  <GXALogoIcon size={84} useImageEmblem={useImageEmblem} />
                  <span className="text-[11px] font-mono text-slate-400">84px (App Launcher)</span>
                </div>

                <div className="flex flex-col items-center gap-2">
                  <GXALogoIcon size={56} useImageEmblem={useImageEmblem} />
                  <span className="text-[11px] font-mono text-slate-400">56px (Standard)</span>
                </div>

                <div className="flex flex-col items-center gap-2">
                  <GXALogoIcon size={36} useImageEmblem={useImageEmblem} />
                  <span className="text-[11px] font-mono text-slate-400">36px (Favicon/Avatar)</span>
                </div>
              </div>

              <div className="bg-slate-50 px-6 py-3 border-t border-slate-200 text-xs text-slate-600 flex items-center justify-between flex-wrap gap-2">
                <span><strong>Aspect Ratio:</strong> 1:1 Solid Midnight Navy container</span>
                <span><strong>Symbol:</strong> Upward Ascent Monogram</span>
                <span><strong>Radius:</strong> 22% Squircle Border Radius</span>
              </div>
            </div>

            {/* VARIATION 4 */}
            <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
              <div className="bg-slate-50 border-b border-slate-200 px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-[#000825] text-white text-xs font-black flex items-center justify-center">
                      4
                    </span>
                    <h3 className="font-black text-base sm:text-lg text-[#000825]">
                      Horizontal Logo with Official Tagline
                    </h3>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Wide authoritative lockup for Hero sections, expansive footers, press kits, and stationery.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex items-center bg-slate-200 rounded-lg p-1 text-xs">
                    {(['light', 'dark', 'slate'] as const).map((bg) => (
                      <button
                        key={bg}
                        onClick={() => setBgPreview({ ...bgPreview, v4: bg })}
                        className={`px-2.5 py-1 rounded text-xs font-bold capitalize transition-colors ${
                          bgPreview.v4 === bg ? 'bg-white text-[#000825] shadow-xs' : 'text-slate-600 hover:text-black'
                        }`}
                      >
                        {bg}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => copyToClipboard(rawTaglineSvg, 'Horizontal Logo with Tagline SVG')}
                    className="p-2 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-700 transition-colors"
                    title="Copy SVG Code"
                  >
                    {copiedKey === 'Horizontal Logo with Tagline SVG' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>

                  <button
                    onClick={() => downloadSvg(rawTaglineSvg, 'gxa-career-academy-with-tagline.svg')}
                    className="p-2 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-700 transition-colors"
                    title="Download SVG File"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Live Canvas Preview */}
              <div
                className={`py-14 px-6 sm:px-12 flex items-center justify-center transition-colors min-h-[180px] ${
                  bgPreview.v4 === 'dark'
                    ? 'bg-[#000825]'
                    : bgPreview.v4 === 'slate'
                    ? 'bg-slate-100'
                    : 'bg-white'
                }`}
              >
                <GXALogoWithTagline
                  theme={bgPreview.v4 === 'dark' ? 'dark' : 'light'}
                  size="lg"
                  useImageEmblem={useImageEmblem}
                />
              </div>

              <div className="bg-slate-50 px-6 py-3 border-t border-slate-200 text-xs text-slate-600 flex items-center justify-between flex-wrap gap-2">
                <span><strong>Elements:</strong> Emblem + Wordmark + Tagline + Parent Company</span>
                <span><strong>Official Tagline:</strong> Learn Today. Lead Tomorrow.</span>
                <span><strong>Parent Badge:</strong> A GXA Technology Platform</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Official Colour Palette */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center gap-2">
            <Palette className="w-5 h-5 text-[#EA580C]" />
            <h2 className="text-xl sm:text-2xl font-black text-[#072118]">
              Official Colour Palette
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#52635B] leading-relaxed max-w-3xl">
            The GXA Career Academy visual identity is anchored by Deep Forest Pine for institutional integrity,
            energised by Warm Terracotta Orange for vibrant career ambition, and balanced with Emerald Green and Alabaster neutrals for clarity and growth.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Deep Forest Pine */}
            <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-2xs">
              <div className="h-24 bg-[#072118] p-3 flex items-end justify-between text-white">
                <span className="text-xs font-bold font-mono">#072118</span>
              </div>
              <div className="p-4 space-y-1">
                <div className="font-bold text-sm text-[#072118]">Deep Forest Pine</div>
                <div className="text-[11px] text-[#52635B]">Primary Institutional Foundation</div>
                <div className="text-[11px] text-slate-400 font-mono">RGB: 7, 33, 24</div>
                <button
                  onClick={() => copyToClipboard('#072118', 'Forest Pine Hex')}
                  className="mt-2 text-xs font-semibold text-[#EA580C] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <Copy className="w-3 h-3" /> Copy Hex
                </button>
              </div>
            </div>

            {/* Warm Terracotta Orange */}
            <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-2xs">
              <div className="h-24 bg-[#EA580C] p-3 flex items-end justify-between text-white">
                <span className="text-xs font-bold font-mono">#EA580C</span>
              </div>
              <div className="p-4 space-y-1">
                <div className="font-bold text-sm text-[#072118]">Terracotta Orange</div>
                <div className="text-[11px] text-[#52635B]">Vibrant Career Catalyst</div>
                <div className="text-[11px] text-slate-400 font-mono">RGB: 234, 88, 12</div>
                <button
                  onClick={() => copyToClipboard('#EA580C', 'Terracotta Orange Hex')}
                  className="mt-2 text-xs font-semibold text-[#EA580C] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <Copy className="w-3 h-3" /> Copy Hex
                </button>
              </div>
            </div>

            {/* Emerald Green */}
            <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-2xs">
              <div className="h-24 bg-[#059669] p-3 flex items-end justify-between text-white">
                <span className="text-xs font-bold font-mono">#059669</span>
              </div>
              <div className="p-4 space-y-1">
                <div className="font-bold text-sm text-[#072118]">Emerald Green</div>
                <div className="text-[11px] text-[#52635B]">Mastery, Verified &amp; Growth</div>
                <div className="text-[11px] text-slate-400 font-mono">RGB: 5, 150, 105</div>
                <button
                  onClick={() => copyToClipboard('#059669', 'Emerald Green Hex')}
                  className="mt-2 text-xs font-semibold text-[#059669] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <Copy className="w-3 h-3" /> Copy Hex
                </button>
              </div>
            </div>

            {/* Warm Alabaster Neutral */}
            <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-2xs">
              <div className="h-24 bg-[#F9FAF7] border-b border-slate-200 p-3 flex items-end justify-between text-[#072118]">
                <span className="text-xs font-bold font-mono">#F9FAF7</span>
              </div>
              <div className="p-4 space-y-1">
                <div className="font-bold text-sm text-[#072118]">Warm Alabaster</div>
                <div className="text-[11px] text-[#52635B]">Tactile Editorial Neutral</div>
                <div className="text-[11px] text-slate-400 font-mono">RGB: 249, 250, 247</div>
                <button
                  onClick={() => copyToClipboard('#F9FAF7', 'Warm Alabaster Hex')}
                  className="mt-2 text-xs font-semibold text-[#EA580C] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <Copy className="w-3 h-3" /> Copy Hex
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Typography & Construction Rules */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Typography Specs */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-5">
          <div className="flex items-center gap-2">
            <Type className="w-5 h-5 text-[#1D4ED8]" />
            <h3 className="text-lg sm:text-xl font-black text-[#000825]">
              Typography Hierarchy
            </h3>
          </div>
          <div className="space-y-4 text-xs">
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
              <div className="font-display font-black text-lg text-[#000825]">
                GXA — Extra Bold Display (Weight 900)
              </div>
              <p className="text-slate-600 mt-1">
                Commanding visual presence. Used exclusively for the master acronym.
              </p>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
              <div className="font-display font-bold text-lg text-[#000825]">
                Career <span className="text-[#1D4ED8]">Academy</span> — Refined Wordmark (Weight 800)
              </div>
              <p className="text-slate-600 mt-1">
                Optical kerning set at -0.02em. Dual-tone treatment with Midnight Navy &amp; Cobalt Blue.
              </p>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
              <div className="font-sans font-semibold text-sm text-[#1D4ED8]">
                Learn Today. Lead Tomorrow. — Tagline (Weight 600)
              </div>
              <p className="text-slate-600 mt-1">
                Modern academic motto. Always formatted in title case with period punctuation.
              </p>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
              <div className="font-mono font-bold text-xs text-slate-500 uppercase tracking-widest">
                GXA-CERT-2026-X82 — Monospace Metadata (Weight 700)
              </div>
              <p className="text-slate-600 mt-1">
                Monospaced font used for credential IDs, timestamps, and legal registrations.
              </p>
            </div>
          </div>
        </div>

        {/* Clear Space & Size Constraints */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-5">
          <div className="flex items-center gap-2">
            <Layout className="w-5 h-5 text-[#1D4ED8]" />
            <h3 className="text-lg sm:text-xl font-black text-[#000825]">
              Clear Space &amp; Minimum Dimensions
            </h3>
          </div>

          <div className="space-y-4 text-xs text-slate-600 leading-relaxed">
            <div className="flex items-start gap-3 p-3.5 bg-slate-50 rounded-xl border border-slate-200">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900 block text-xs">Clear Space Formula (1X)</strong>
                Keep a minimum exclusion margin equal to the height of the upward arrowhead mark around the entire perimeter of any logo lockup.
              </div>
            </div>

            <div className="flex items-start gap-3 p-3.5 bg-slate-50 rounded-xl border border-slate-200">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900 block text-xs">Minimum Digital Size</strong>
                Horizontal logo must not be rendered below 28px in height. Compact icon remains sharp down to 16px favicon.
              </div>
            </div>

            <div className="flex items-start gap-3 p-3.5 bg-slate-50 rounded-xl border border-slate-200">
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900 block text-xs">Usage Prohibitions</strong>
                Never skew, stretch, rotate, or recolor the emblem. Do not substitute non-brand gradients or add outer drop shadows.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Return to Platform Footer Bar */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 text-center">
        <div className="bg-[#101F45] text-white p-8 rounded-3xl border border-slate-700 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-left space-y-1">
            <div className="text-lg font-black text-white">Ready to explore GXA Career Academy?</div>
            <div className="text-xs text-slate-300">
              Access online courses, verified eBooks, applied AI laboratories, and accredited certifications.
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigateTo('/')}
              className="px-5 py-2.5 bg-[#1D4ED8] hover:bg-blue-600 text-white font-bold text-xs rounded-xl transition-all cursor-pointer shadow-md flex items-center gap-2"
            >
              <span>Visit Homepage</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => navigateTo('/verify')}
              className="px-4 py-2.5 bg-white/10 hover:bg-white/15 text-white font-semibold text-xs rounded-xl transition-all cursor-pointer"
            >
              Credential Registry
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BrandGuidelinesPage;
