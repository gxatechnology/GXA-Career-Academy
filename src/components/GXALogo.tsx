import React, { useState } from 'react';
import { GXA_LOGO_URL } from '../data/mockData';

export interface GXALogoProps {
  variant?: 'horizontal' | 'stacked' | 'icon' | 'horizontal-tagline' | 'monochrome';
  theme?: 'light' | 'dark' | 'transparent';
  size?: 'sm' | 'md' | 'lg' | 'xl' | number;
  showTagline?: boolean;
  useImageEmblem?: boolean;
  className?: string;
  onClick?: () => void;
}

/**
 * Pure Scalable Vector Emblem for GXA
 * Crafted according to world-class brand identity standards:
 * - Geometric 'G' in Midnight Navy (#000825) or pure white (dark mode)
 * - Dynamic 'X' with upward career ascent trajectory in GXA Cobalt Blue (#1D4ED8)
 * - Refined silver metallic accent symbolizing precision and momentum
 * - Architectural 'A' with cobalt blue inner triangular core
 */
export const GXAEmblem: React.FC<{
  className?: string;
  isMonochrome?: boolean;
  isDark?: boolean;
  useImage?: boolean;
}> = ({ className = 'h-10 w-auto', isMonochrome = false, isDark = false, useImage = false }) => {
  if (useImage) {
    return (
      <img
        src={GXA_LOGO_URL}
        alt="GXA Career Academy Official Emblem"
        className={`object-contain ${className}`}
        loading="eager"
      />
    );
  }

  const navyColor = isMonochrome ? (isDark ? '#FFFFFF' : '#072118') : (isDark ? '#FFFFFF' : '#072118');
  const orangeColor = isMonochrome ? (isDark ? '#FFFFFF' : '#072118') : '#EA580C';
  const greenColor = isMonochrome ? (isDark ? '#FFFFFF' : '#072118') : '#059669';
  const silverStart = isMonochrome ? (isDark ? '#CBD5E1' : '#64748B') : '#E2E8F0';
  const silverMid = isMonochrome ? (isDark ? '#FFFFFF' : '#334155') : '#FFFFFF';
  const silverEnd = isMonochrome ? (isDark ? '#94A3B8' : '#94A3B8') : '#94A3B8';

  const uid = React.useId().replace(/:/g, '');

  return (
    <svg
      viewBox="0 0 500 280"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="GXA Emblem"
      role="img"
    >
      <defs>
        {/* Platinum Metallic 3D Swoosh Gradient */}
        <linearGradient id={`silverBevel-${uid}`} x1="150" y1="240" x2="380" y2="60" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={silverStart} />
          <stop offset="40%" stopColor={silverMid} />
          <stop offset="75%" stopColor={silverEnd} />
          <stop offset="100%" stopColor={silverStart} />
        </linearGradient>

        {/* Dynamic Warm Terracotta Orange Gradient for Arrow & X */}
        <linearGradient id={`orangeGrad-${uid}`} x1="170" y1="50" x2="390" y2="230" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FB923C" />
          <stop offset="100%" stopColor="#EA580C" />
        </linearGradient>

        {/* Dynamic Emerald Green Gradient */}
        <linearGradient id={`greenGrad-${uid}`} x1="170" y1="50" x2="390" y2="230" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#10B981" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>

        {/* Upward Career Arrow Surge Gradient */}
        <linearGradient id={`arrowTipGrad-${uid}`} x1="330" y1="100" x2="415" y2="35" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#F97316" />
          <stop offset="100%" stopColor="#EA580C" />
        </linearGradient>
      </defs>

      {/* ================= LETTER G ================= */}
      <path
        d="M 170 85 
           C 156 58, 128 44, 94 44 
           C 44 44, 10 82, 10 144 
           C 10 206, 44 242, 98 242 
           C 138 242, 168 220, 178 184 
           L 178 140 
           L 100 140 
           L 100 182 
           L 136 182 
           C 132 198, 116 208, 96 208 
           C 66 208, 46 184, 46 144 
           C 46 104, 66 80, 96 80 
           C 116 80, 132 90, 142 108 
           Z"
        fill={navyColor}
      />

      {/* ================= LETTER X (Terracotta Orange & Emerald foundation) ================= */}
      {/* Upper-left to lower-right arm of X */}
      <path
        d="M 152 44 
           L 214 44 
           L 288 156 
           L 242 156 
           Z"
        fill={isMonochrome ? navyColor : `url(#orangeGrad-${uid})`}
      />

      {/* Lower-left upward arm of X */}
      <path
        d="M 148 242 
           L 194 242 
           L 246 162 
           L 210 162 
           Z"
        fill={isMonochrome ? navyColor : `url(#orangeGrad-${uid})`}
      />

      {/* Upper-right branch of X */}
      <path
        d="M 272 44 
           L 322 44 
           L 270 126 
           L 242 126 
           Z"
        fill={isMonochrome ? navyColor : `url(#greenGrad-${uid})`}
      />

      {/* ================= DYNAMIC CAREER ASCENT SWOOSH (Platinum Bevel) ================= */}
      <path
        d="M 144 242 
           C 174 238, 214 214, 256 172 
           C 298 130, 334 90, 360 60 
           L 376 72 
           C 348 104, 308 148, 264 190 
           C 218 234, 176 248, 144 242 
           Z"
        fill={isMonochrome ? navyColor : `url(#silverBevel-${uid})`}
      />

      {/* Silver Accent Highlight Edge */}
      <path
        d="M 174 232 
           C 218 214, 268 168, 318 114 
           C 340 90, 360 70, 370 58 
           L 376 64 
           C 364 78, 342 100, 320 124 
           C 270 178, 220 222, 174 232 
           Z"
        fill={isMonochrome ? silverEnd : '#FFFFFF'}
        opacity={isMonochrome ? 0.6 : 0.85}
      />

      {/* Upward Career Arrow Surge Tip (Symbol of Learning & Upward Mobility) */}
      <path
        d="M 354 108 
           L 412 38 
           L 342 56 
           L 362 76 
           Z"
        fill={isMonochrome ? orangeColor : `url(#arrowTipGrad-${uid})`}
      />

      {/* Secondary Dynamic Ascending Wing Under Arrow */}
      <path
        d="M 216 200 
           C 258 172, 302 132, 342 88 
           L 348 92 
           C 306 138, 260 178, 218 204 
           Z"
        fill={isMonochrome ? greenColor : '#059669'}
      />

      {/* ================= LETTER A ================= */}
      {/* Outer frame of A */}
      <path
        d="M 356 60 
           L 402 60 
           L 486 242 
           L 432 242 
           L 410 192 
           L 340 192 
           L 320 242 
           L 270 242 
           Z"
        fill={navyColor}
      />

      {/* Solid Emerald Green Inner Triangular Core of A */}
      <path
        d="M 354 122 
           L 392 166 
           L 332 166 
           Z"
        fill={isMonochrome ? (isDark ? '#FFFFFF' : '#072118') : '#059669'}
      />
    </svg>
  );
};

/**
 * =========================================================================
 * VARIATION 1: PRIMARY HORIZONTAL LOGO
 * Purpose: Website headers, navigation bars, top app bars
 * Characteristics:
 * - GXA emblem prominently on the left
 * - Subtle vertical architectural divider
 * - Bold 'GXA' + 'Career Academy' wordmark with optical kerning
 * - High readability at compact desktop and mobile sizes
 * =========================================================================
 */
export const GXALogoHorizontal: React.FC<{
  theme?: 'light' | 'dark' | 'transparent';
  useImageEmblem?: boolean;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | number;
}> = ({ theme = 'light', useImageEmblem = false, className = '', size = 'md' }) => {
  const isDark = theme === 'dark';
  const forestTextColor = isDark ? '#FFFFFF' : '#072118';
  const orangeTextColor = '#EA580C';
  const dividerColor = isDark ? 'rgba(255,255,255,0.2)' : 'rgba(7, 33, 24, 0.15)';

  const heightClass =
    size === 'sm' ? 'h-6 sm:h-8' : size === 'lg' ? 'h-10 sm:h-12' : 'h-6 xs:h-7 sm:h-9 md:h-10';

  return (
    <div className={`inline-flex items-center gap-1.5 sm:gap-2.5 select-none min-w-0 ${className}`}>
      {/* GXA Emblem */}
      <GXAEmblem
        className={`${heightClass} w-auto shrink-0`}
        isDark={isDark}
        useImage={useImageEmblem}
      />

      {/* Subtle Architectural Divider */}
      <div
        className="w-[1.5px] self-stretch my-1 shrink-0 transition-colors"
        style={{ backgroundColor: dividerColor }}
      />

      {/* Typographic Wordmark */}
      <div className="flex flex-col justify-center text-left leading-none min-w-0">
        <div className="font-display font-black tracking-tight flex items-baseline gap-1 sm:gap-1.5 whitespace-nowrap">
          <span
            className="text-xs xs:text-sm sm:text-base md:text-xl lg:text-2xl font-black tracking-tight"
            style={{ color: forestTextColor }}
          >
            GXA
          </span>
          <span
            className="text-xs xs:text-sm sm:text-base md:text-xl lg:text-2xl font-black tracking-tight"
            style={{ color: forestTextColor }}
          >
            Career
          </span>
          <span
            className="text-xs xs:text-sm sm:text-base md:text-xl lg:text-2xl font-black tracking-tight"
            style={{ color: orangeTextColor }}
          >
            Academy
          </span>
        </div>
      </div>
    </div>
  );
};

/**
 * =========================================================================
 * VARIATION 2: STACKED INSTITUTIONAL LOGO
 * Purpose: Official Certificates, Diplomas, Awards, Formal Promotional Materials
 * Characteristics:
 * - Centered GXA Emblem with prominent presence
 * - Authoritative 'GXA CAREER ACADEMY' uppercase wordmark
 * - Official Tagline: 'Learn Today. Lead Tomorrow.' flanked by elegant rules
 * - Academic Press Subtitle: 'GXA TECHNOLOGY • ACADEMIC & PROFESSIONAL PRESS'
 * =========================================================================
 */
export const GXALogoStacked: React.FC<{
  theme?: 'light' | 'dark';
  useImageEmblem?: boolean;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}> = ({ theme = 'light', useImageEmblem = false, className = '', size = 'md' }) => {
  const isDark = theme === 'dark';
  const forestColor = isDark ? '#FFFFFF' : '#072118';
  const orangeColor = '#EA580C';
  const greenTaglineColor = '#059669';
  const subtextColor = isDark ? '#A7F3D0' : '#4E5D54';

  const emblemHeight = size === 'sm' ? 'h-12' : size === 'lg' ? 'h-24' : 'h-16';

  return (
    <div className={`flex flex-col items-center text-center select-none ${className}`}>
      {/* Centered GXA Emblem */}
      <GXAEmblem
        className={`${emblemHeight} w-auto mb-2.5 shrink-0`}
        isDark={isDark}
        useImage={useImageEmblem}
      />

      {/* Prominent GXA Career Academy Wordmark */}
      <div className="font-display font-black tracking-tight flex items-center justify-center gap-1.5 sm:gap-2">
        <span className="text-xl sm:text-2xl lg:text-3xl font-black" style={{ color: forestColor }}>
          GXA Career
        </span>
        <span className="text-xl sm:text-2xl lg:text-3xl font-black" style={{ color: orangeColor }}>
          Academy
        </span>
      </div>

      {/* Official Tagline with Symmetrical Rules */}
      <div className="flex items-center justify-center gap-2.5 mt-1.5 w-full max-w-xs">
        <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-[#059669]/50" />
        <span
          className="text-xs sm:text-sm font-bold tracking-wide font-sans shrink-0"
          style={{ color: greenTaglineColor }}
        >
          Learn Today. Lead Tomorrow.
        </span>
        <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-[#059669]/50" />
      </div>

      {/* Academic Press Subtitle */}
      <div
        className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.2em] mt-2 font-bold"
        style={{ color: subtextColor }}
      >
        GXA TECHNOLOGY • ACADEMIC & PROFESSIONAL PRESS
      </div>
    </div>
  );
};

/**
 * =========================================================================
 * VARIATION 3: COMPACT GXA ICON
 * Purpose: App icons, Favicons, Mobile PWA launcher, Social Avatars (1:1 aspect ratio)
 * Characteristics:
 * - Square squircle with rounded corners (1:1)
 * - Deep Forest Green (#072118) background with subtle emerald border
 * - Centered high-contrast GXA emblem with upward trajectory arrow
 * =========================================================================
 */
export const GXALogoIcon: React.FC<{
  size?: number;
  className?: string;
  rounded?: boolean;
  border?: boolean;
  useImageEmblem?: boolean;
}> = ({ size = 56, className = '', rounded = true, border = true, useImageEmblem = false }) => {
  return (
    <div
      className={`inline-flex items-center justify-center bg-[#072118] p-2.5 shadow-md select-none shrink-0 ${
        rounded ? 'rounded-2xl' : 'rounded-none'
      } ${border ? 'border border-emerald-800/80 shadow-[0_4px_12px_rgba(7,33,24,0.35)]' : ''} ${className}`}
      style={{ width: size, height: size }}
      title="GXA Career Academy Icon"
    >
      <GXAEmblem
        className="w-full h-full object-contain"
        isDark={true}
        useImage={useImageEmblem}
      />
    </div>
  );
};

/**
 * =========================================================================
 * VARIATION 4: HORIZONTAL LOGO WITH TAGLINE
 * Purpose: Hero sections, expansive footers, press releases, corporate identity
 * Characteristics:
 * - Prominent GXA Emblem on the left
 * - Line 1: 'GXA Career Academy' prominent brand title
 * - Line 2: Exact Official Tagline 'Learn Today. Lead Tomorrow.'
 * - Line 3: Parent Company & Platform Descriptor badge
 * =========================================================================
 */
export const GXALogoWithTagline: React.FC<{
  theme?: 'light' | 'dark';
  useImageEmblem?: boolean;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}> = ({ theme = 'light', useImageEmblem = false, className = '', size = 'md' }) => {
  const isDark = theme === 'dark';
  const forestTextColor = isDark ? '#FFFFFF' : '#072118';
  const orangeTextColor = '#EA580C';
  const taglineColor = '#059669';
  const descriptorColor = isDark ? '#A7F3D0' : '#4E5D54';
  const dividerColor = isDark ? 'rgba(255,255,255,0.2)' : 'rgba(7, 33, 24, 0.15)';

  const emblemHeight =
    size === 'sm' ? 'h-8 sm:h-9' : size === 'lg' ? 'h-10 sm:h-12 md:h-14' : 'h-8 sm:h-10 md:h-11';

  return (
    <div className={`inline-flex items-center gap-2.5 sm:gap-3.5 select-none min-w-0 max-w-full ${className}`}>
      {/* GXA Emblem */}
      <GXAEmblem
        className={`${emblemHeight} w-auto shrink-0`}
        isDark={isDark}
        useImage={useImageEmblem}
      />

      {/* Architectural Divider */}
      <div
        className="w-[1.5px] self-stretch my-0.5 shrink-0 transition-colors"
        style={{ backgroundColor: dividerColor }}
      />

      {/* Lockup Content */}
      <div className="flex flex-col justify-center text-left min-w-0">
        {/* Brand Name */}
        <div className="font-display font-black tracking-tight flex items-baseline gap-1 sm:gap-1.5 leading-none whitespace-nowrap">
          <span
            className="text-base sm:text-lg md:text-2xl font-black tracking-tight"
            style={{ color: forestTextColor }}
          >
            GXA
          </span>
          <span
            className="text-base sm:text-lg md:text-2xl font-black tracking-tight"
            style={{ color: forestTextColor }}
          >
            Career
          </span>
          <span
            className="text-base sm:text-lg md:text-2xl font-black tracking-tight"
            style={{ color: orangeTextColor }}
          >
            Academy
          </span>
        </div>

        {/* Official Tagline */}
        <div className="flex items-center gap-1.5 mt-1 sm:mt-1.5 leading-none whitespace-nowrap">
          <span
            className="text-[10px] sm:text-xs font-bold tracking-wide font-sans"
            style={{ color: taglineColor }}
          >
            Learn Today. Lead Tomorrow.
          </span>
        </div>

        {/* Parent Company & Descriptor */}
        <div
          className="text-[8px] sm:text-[10px] font-mono tracking-wider uppercase font-semibold mt-0.5 sm:mt-1 leading-none whitespace-nowrap"
          style={{ color: descriptorColor }}
        >
          A GXA Technology Platform
        </div>
      </div>
    </div>
  );
};

/**
 * Variation 5 (Utility): Monochrome Official Vector (For black-and-white print, stamps, legal documents)
 */
export const GXALogoMonochrome: React.FC<{
  isDark?: boolean;
  className?: string;
  showTagline?: boolean;
}> = ({ isDark = false, className = '', showTagline = true }) => {
  const textColor = isDark ? '#FFFFFF' : '#000000';

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      <GXAEmblem className="h-10 w-auto shrink-0" isMonochrome={true} isDark={isDark} />
      <div className="w-[1.5px] self-stretch my-1 bg-current opacity-40 shrink-0" />
      <div className="flex flex-col text-left leading-none" style={{ color: textColor }}>
        <span className="font-display font-black text-xl tracking-tight">
          GXA Career Academy
        </span>
        {showTagline && (
          <span className="text-[10px] font-semibold tracking-wider font-sans mt-1 opacity-80">
            Learn Today. Lead Tomorrow.
          </span>
        )}
      </div>
    </div>
  );
};

/**
 * Master GXALogo Component
 * Seamlessly exposes all official brand identity variations
 */
export const GXALogo: React.FC<GXALogoProps> = ({
  variant = 'horizontal',
  theme = 'light',
  size = 'md',
  showTagline = true,
  useImageEmblem = false,
  className = '',
  onClick,
}) => {
  const content = (() => {
    switch (variant) {
      case 'stacked':
        return (
          <GXALogoStacked
            theme={theme === 'dark' ? 'dark' : 'light'}
            useImageEmblem={useImageEmblem}
            className={className}
          />
        );
      case 'icon':
        return (
          <GXALogoIcon
            useImageEmblem={useImageEmblem}
            className={className}
          />
        );
      case 'horizontal-tagline':
        return (
          <GXALogoWithTagline
            theme={theme === 'dark' ? 'dark' : 'light'}
            useImageEmblem={useImageEmblem}
            className={className}
          />
        );
      case 'monochrome':
        return (
          <GXALogoMonochrome
            isDark={theme === 'dark'}
            className={className}
            showTagline={showTagline}
          />
        );
      case 'horizontal':
      default:
        return (
          <GXALogoHorizontal
            theme={theme}
            useImageEmblem={useImageEmblem}
            className={className}
            size={typeof size === 'string' && (size === 'sm' || size === 'lg') ? size : 'md'}
          />
        );
    }
  })();

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className="cursor-pointer transition-opacity hover:opacity-90 inline-flex items-center text-left focus:outline-none"
        aria-label="GXA Career Academy"
      >
        {content}
      </button>
    );
  }

  return content;
};

export default GXALogo;
