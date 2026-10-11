import React from 'react';

interface BookCoverVectorProps {
  title?: string;
  subtitle?: string;
  authorName?: string;
  category?: string;
  pages?: number;
  edition?: string;
  className?: string;
  variant?: 'featured' | 'card' | 'compact' | 'detail';
}

/**
 * Genuine Book Cover Vector Component for GXA Technical Monographs
 * Renders an authentic, physical-grade editorial book cover with:
 * - Rich deep forest pine cloth texture (#072118)
 * - Terracotta orange spine and academic accents (#EA580C)
 * - Fine metallic emerald and warm stone precision rulings
 * - Official GXA Career Academy press insignia
 * - Guaranteed 100% clean of any legacy branding
 */
export const DigitalMarketingMasteryCover: React.FC<BookCoverVectorProps> = ({
  title = 'Digital Marketing Mastery',
  subtitle = 'Organic Acquisition, Paid Scalability & AI Automation',
  authorName = 'Tauqeer Ashraf (MCA)',
  edition = '2026 Revised Edition',
  pages = 445,
  className = 'w-full h-full',
  variant = 'card',
}) => {
  return (
    <svg
      viewBox="0 0 400 520"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`select-none ${className}`}
      aria-label={`${title} Official Book Cover`}
      role="img"
    >
      <defs>
        {/* Book cover rich forest green cloth gradient */}
        <linearGradient id="dmm-cover-bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0A2C21" />
          <stop offset="50%" stopColor="#072118" />
          <stop offset="100%" stopColor="#041610" />
        </linearGradient>

        {/* Spine 3D shadow gradient */}
        <linearGradient id="dmm-spine-fold" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#000000" stopOpacity="0.45" />
          <stop offset="3%" stopColor="#FFFFFF" stopOpacity="0.15" />
          <stop offset="6%" stopColor="#000000" stopOpacity="0.3" />
          <stop offset="10%" stopColor="#000000" stopOpacity="0.0" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0.15" />
        </linearGradient>

        {/* Terracotta gradient for accent elements */}
        <linearGradient id="dmm-terracotta" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#EA580C" />
          <stop offset="100%" stopColor="#C2410C" />
        </linearGradient>

        {/* Emerald foil accent */}
        <linearGradient id="dmm-emerald-foil" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#34D399" />
          <stop offset="50%" stopColor="#10B981" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>

        {/* Subtle grid pattern */}
        <pattern id="dmm-cover-grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#10B981" strokeWidth="0.5" strokeOpacity="0.08" />
        </pattern>
      </defs>

      {/* Book Hardcover Base */}
      <rect width="400" height="520" rx="8" fill="url(#dmm-cover-bg)" />
      
      {/* Subtle Cloth Grid Pattern Overlay */}
      <rect width="400" height="520" rx="8" fill="url(#dmm-cover-grid)" />

      {/* Outer Border Inset (Book Binder's Deboss Rule) */}
      <rect x="18" y="18" width="364" height="484" rx="4" stroke="#10B981" strokeWidth="1" strokeOpacity="0.3" />
      <rect x="22" y="22" width="356" height="476" rx="2" stroke="#EA580C" strokeWidth="0.8" strokeOpacity="0.4" />

      {/* Left Spine Accent Ribbon */}
      <rect x="0" y="0" width="26" height="520" fill="#030E0A" />
      <rect x="22" y="0" width="4" height="520" fill="url(#dmm-terracotta)" />

      {/* Top Academic Press Seal Header */}
      <g transform="translate(42, 38)">
        <rect x="0" y="0" width="168" height="22" rx="4" fill="#0D3829" stroke="#10B981" strokeWidth="0.8" strokeOpacity="0.5" />
        <circle cx="11" cy="11" r="4" fill="#EA580C" />
        <text x="24" y="15" fill="#A7F3D0" fontSize="9" fontFamily="system-ui, sans-serif" fontWeight="800" letterSpacing="1.2">
          GXA CAREER ACADEMY
        </text>
      </g>

      {/* Edition Stamp */}
      <g transform="translate(270, 38)">
        <rect x="0" y="0" width="94" height="22" rx="4" fill="#EA580C" fillOpacity="0.2" stroke="#EA580C" strokeWidth="0.8" />
        <text x="47" y="15" fill="#FB923C" fontSize="8.5" fontFamily="monospace" fontWeight="700" textAnchor="middle" letterSpacing="0.8">
          2026 EDITION
        </text>
      </g>

      {/* Ornamental Thin Divider */}
      <line x1="42" y1="76" x2="364" y2="76" stroke="#10B981" strokeWidth="1" strokeOpacity="0.35" />

      {/* Volume & Field Classification */}
      <text x="42" y="98" fill="#FB923C" fontSize="10.5" fontFamily="monospace" fontWeight="700" letterSpacing="2">
        MONOGRAPH VOL. 01 // GROWTH ENGINEERING
      </text>

      {/* Book Main Title */}
      <g transform="translate(42, 118)">
        <text x="0" y="32" fill="#FFFFFF" fontSize="34" fontFamily="'Plus Jakarta Sans', system-ui, sans-serif" fontWeight="900" letterSpacing="-0.5">
          DIGITAL
        </text>
        <text x="0" y="68" fill="#FFFFFF" fontSize="34" fontFamily="'Plus Jakarta Sans', system-ui, sans-serif" fontWeight="900" letterSpacing="-0.5">
          MARKETING
        </text>
        <text x="0" y="104" fill="url(#dmm-terracotta)" fontSize="34" fontFamily="'Plus Jakarta Sans', system-ui, sans-serif" fontWeight="900" letterSpacing="-0.5">
          MASTERY
        </text>
      </g>

      {/* Subtitle / Field Guide Description */}
      <text x="42" y="248" fill="#CBD5E1" fontSize="11.5" fontFamily="system-ui, sans-serif" fontWeight="500">
        Organic Acquisition, Paid Scalability &amp;
      </text>
      <text x="42" y="266" fill="#94A3B8" fontSize="11" fontFamily="system-ui, sans-serif" fontWeight="400">
        AI-Driven Automation for High-Growth Leaders
      </text>

      {/* Central Visual Architecture Diagram (Applied Growth Engine) */}
      <g transform="translate(42, 285)">
        <rect x="0" y="0" width="322" height="120" rx="8" fill="#051812" stroke="#10B981" strokeWidth="1" strokeOpacity="0.4" />
        
        {/* Node 1: Organic & SEO */}
        <rect x="12" y="16" width="88" height="42" rx="5" fill="#0A2C21" stroke="#10B981" strokeWidth="0.8" />
        <text x="56" y="33" fill="#34D399" fontSize="8.5" fontFamily="monospace" fontWeight="800" textAnchor="middle">SEO CLUSTERS</text>
        <text x="56" y="47" fill="#6EE7B7" fontSize="7.5" fontFamily="system-ui" textAnchor="middle">Topical Depth</text>

        {/* Node 2: Performance Media */}
        <rect x="117" y="16" width="88" height="42" rx="5" fill="#182A1B" stroke="#EA580C" strokeWidth="0.8" />
        <text x="161" y="33" fill="#FB923C" fontSize="8.5" fontFamily="monospace" fontWeight="800" textAnchor="middle">PAID MEDIA</text>
        <text x="161" y="47" fill="#FDBA74" fontSize="7.5" fontFamily="system-ui" textAnchor="middle">Meta &amp; Google</text>

        {/* Node 3: AI Copilot & Funnels */}
        <rect x="222" y="16" width="88" height="42" rx="5" fill="#0A2C21" stroke="#10B981" strokeWidth="0.8" />
        <text x="266" y="33" fill="#34D399" fontSize="8.5" fontFamily="monospace" fontWeight="800" textAnchor="middle">AI AGENTS</text>
        <text x="266" y="47" fill="#6EE7B7" fontSize="7.5" fontFamily="system-ui" textAnchor="middle">Automated LTV</text>

        {/* Connecting Arrows */}
        <line x1="100" y1="37" x2="117" y2="37" stroke="#EA580C" strokeWidth="1.5" strokeDasharray="2 2" />
        <line x1="205" y1="37" x2="222" y2="37" stroke="#10B981" strokeWidth="1.5" strokeDasharray="2 2" />

        {/* Lower Metric Bar */}
        <line x1="12" y1="72" x2="310" y2="72" stroke="#10B981" strokeWidth="0.5" strokeOpacity="0.3" />
        <text x="18" y="88" fill="#A7F3D0" fontSize="8.5" fontFamily="monospace" fontWeight="700">
          EXECUTION: 6 PARTS • 31 CHAPTERS • 445 PAGES
        </text>
        <text x="18" y="104" fill="#94A3B8" fontSize="8" fontFamily="system-ui">
          Full Python &amp; SQL scripts • Notion Funnel SOPs • DRM-Free
        </text>
        <rect x="248" y="80" width="62" height="24" rx="4" fill="#EA580C" />
        <text x="279" y="96" fill="#FFFFFF" fontSize="8.5" fontFamily="system-ui" fontWeight="800" textAnchor="middle">
          FIELD GUIDE
        </text>
      </g>

      {/* Author & Credential Block */}
      <g transform="translate(42, 424)">
        <text x="0" y="16" fill="#A7F3D0" fontSize="13" fontFamily="system-ui, sans-serif" fontWeight="800">
          {authorName}
        </text>
        <text x="0" y="32" fill="#6EE7B7" fontSize="9.5" fontFamily="system-ui, sans-serif" fontWeight="500">
          10+ Years Growth Architect • Head of Engineering
        </text>
        <text x="0" y="47" fill="#94A3B8" fontSize="8" fontFamily="system-ui, sans-serif" fontWeight="400">
          GXA Career Academy Digital Publication Series
        </text>
      </g>

      {/* Bottom Imprint / Academic Footer */}
      <g transform="translate(42, 484)">
        <line x1="0" y1="0" x2="322" y2="0" stroke="#10B981" strokeWidth="1" strokeOpacity="0.35" />
        <text x="0" y="16" fill="#A7F3D0" fontSize="8.5" fontFamily="monospace" fontWeight="700" letterSpacing="0.8">
          GXA TECHNOLOGY PRESS
        </text>
        <text x="322" y="16" fill="#FB923C" fontSize="8" fontFamily="monospace" fontWeight="600" textAnchor="end">
          PRE-PRESS DIGITAL EDITION
        </text>
      </g>

      {/* Book 3D Spine and Page Sheen Overlay */}
      <rect width="400" height="520" rx="8" fill="url(#dmm-spine-fold)" pointerEvents="none" />
    </svg>
  );
};

export default DigitalMarketingMasteryCover;
