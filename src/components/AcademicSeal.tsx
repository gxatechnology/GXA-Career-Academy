import React from 'react';

interface AcademicSealProps {
  isVerified?: boolean;
  size?: number;
  className?: string;
}

export const AcademicSeal: React.FC<AcademicSealProps> = ({
  isVerified = true,
  size = 110,
  className = '',
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 160 160"
      className={`select-none shrink-0 ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="gxaTerracottaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FB923C" />
          <stop offset="50%" stopColor="#EA580C" />
          <stop offset="100%" stopColor="#C2410C" />
        </linearGradient>
        <linearGradient id="gxaEmeraldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#34D399" />
          <stop offset="50%" stopColor="#059669" />
          <stop offset="100%" stopColor="#065F46" />
        </linearGradient>
      </defs>

      {/* 1. Outer Elegant Circular Borders */}
      <circle cx="80" cy="80" r="76" fill="none" stroke="url(#gxaTerracottaGrad)" strokeWidth="2.5" />
      <circle cx="80" cy="80" r="72" fill="none" stroke="#10B981" strokeWidth="0.8" strokeDasharray="3 2" />

      {/* 2. Deep Forest Pine Centre Circle */}
      <circle cx="80" cy="80" r="68" fill="#072118" stroke="#EA580C" strokeWidth="1" />

      {/* 3. Subtle Symmetrical Emerald Laurel Leaves */}
      {/* Left Laurel Branch */}
      <g fill="#059669" stroke="#059669">
        <path d="M 23 80 C 23 57, 34 40, 48 31" fill="none" strokeWidth="1.2" strokeLinecap="round" />
        <ellipse cx="24" cy="74" rx="3.5" ry="1.8" transform="rotate(-30 24 74)" />
        <ellipse cx="26" cy="62" rx="3.5" ry="1.8" transform="rotate(-45 26 62)" />
        <ellipse cx="32" cy="50" rx="3.5" ry="1.8" transform="rotate(-60 32 50)" />
        <ellipse cx="40" cy="40" rx="3.5" ry="1.8" transform="rotate(-75 40 40)" />
        <ellipse cx="49" cy="33" rx="3" ry="1.5" transform="rotate(-85 49 33)" />

        <path d="M 23 80 C 23 103, 34 120, 48 129" fill="none" strokeWidth="1.2" strokeLinecap="round" />
        <ellipse cx="24" cy="86" rx="3.5" ry="1.8" transform="rotate(30 24 86)" />
        <ellipse cx="26" cy="98" rx="3.5" ry="1.8" transform="rotate(45 26 98)" />
        <ellipse cx="32" cy="110" rx="3.5" ry="1.8" transform="rotate(60 32 110)" />
        <ellipse cx="40" cy="120" rx="3.5" ry="1.8" transform="rotate(75 40 120)" />
        <ellipse cx="49" cy="127" rx="3" ry="1.5" transform="rotate(85 49 127)" />
      </g>

      {/* Right Laurel Branch */}
      <g fill="#059669" stroke="#059669">
        <path d="M 137 80 C 137 57, 126 40, 112 31" fill="none" strokeWidth="1.2" strokeLinecap="round" />
        <ellipse cx="136" cy="74" rx="3.5" ry="1.8" transform="rotate(30 136 74)" />
        <ellipse cx="134" cy="62" rx="3.5" ry="1.8" transform="rotate(45 134 62)" />
        <ellipse cx="128" cy="50" rx="3.5" ry="1.8" transform="rotate(60 128 50)" />
        <ellipse cx="120" cy="40" rx="3.5" ry="1.8" transform="rotate(75 120 40)" />
        <ellipse cx="111" cy="33" rx="3" ry="1.5" transform="rotate(85 111 33)" />

        <path d="M 137 80 C 137 103, 126 120, 112 129" fill="none" strokeWidth="1.2" strokeLinecap="round" />
        <ellipse cx="136" cy="86" rx="3.5" ry="1.8" transform="rotate(-30 136 86)" />
        <ellipse cx="134" cy="98" rx="3.5" ry="1.8" transform="rotate(-45 134 98)" />
        <ellipse cx="128" cy="110" rx="3.5" ry="1.8" transform="rotate(-60 128 110)" />
        <ellipse cx="120" cy="120" rx="3.5" ry="1.8" transform="rotate(-75 120 120)" />
        <ellipse cx="111" cy="127" rx="3" ry="1.5" transform="rotate(-85 111 127)" />
      </g>

      {/* 4. Top Text: GXA CAREER ACADEMY */}
      <text
        x="80"
        y="42"
        textAnchor="middle"
        fill="#FED7AA"
        fontSize="8"
        fontWeight="800"
        letterSpacing="1.2"
        fontFamily="system-ui, -apple-system, sans-serif"
      >
        GXA CAREER ACADEMY
      </text>

      {/* 5. Small Academic Cap Icon in Center */}
      <g transform="translate(80, 58)">
        <polygon points="0,-7 14,0 0,7 -14,0" fill="#EA580C" />
        <path d="M -8,1 L -8,6 Q 0,10 8,6 L 8,1" fill="#C2410C" />
        <path d="M 10,0 L 14,7 L 13,10" fill="none" stroke="#FED7AA" strokeWidth="1.2" strokeLinecap="round" />
        <circle cx="13" cy="11" r="1" fill="#FED7AA" />
      </g>

      {/* 6. Center Text: VERIFIED / PENDING */}
      {isVerified ? (
        <g>
          <rect
            x="36"
            y="76"
            width="88"
            height="18"
            rx="3"
            fill="rgba(5, 150, 105, 0.4)"
            stroke="#10B981"
            strokeWidth="0.8"
          />
          <text
            x="80"
            y="89"
            textAnchor="middle"
            fill="#FFFFFF"
            fontSize="10"
            fontWeight="900"
            letterSpacing="2.5"
            fontFamily="system-ui, -apple-system, sans-serif"
          >
            VERIFIED
          </text>
        </g>
      ) : (
        <g>
          <rect
            x="32"
            y="76"
            width="96"
            height="18"
            rx="3"
            fill="rgba(148, 163, 184, 0.2)"
            stroke="#94A3B8"
            strokeWidth="0.8"
          />
          <text
            x="80"
            y="89"
            textAnchor="middle"
            fill="#CBD5E1"
            fontSize="8.5"
            fontWeight="800"
            letterSpacing="1.5"
            fontFamily="system-ui, -apple-system, sans-serif"
          >
            PENDING
          </text>
        </g>
      )}

      {/* 7. Bottom Text: ACADEMIC REGISTRY */}
      <text
        x="80"
        y="118"
        textAnchor="middle"
        fill="#A7F3D0"
        fontSize="7.5"
        fontWeight="800"
        letterSpacing="1.2"
        fontFamily="system-ui, -apple-system, sans-serif"
      >
        ACADEMIC REGISTRY
      </text>

      {/* Tiny decorative stars */}
      <text x="80" y="132" textAnchor="middle" fill="#EA580C" fontSize="7">
        ★ ★ ★
      </text>
    </svg>
  );
};
