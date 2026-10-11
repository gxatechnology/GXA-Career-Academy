import React from 'react';

/**
 * =========================================================================
 * GXA Career Academy — Educational Graphics & Custom Vector Library
 * Clean, lightweight, editorial SVG illustrations in Midnight Navy (#000825),
 * GXA Cobalt Blue (#1D4ED8), Chrome Silver (#94A3B8), and Off-White (#F8FAFC).
 * =========================================================================
 */

interface GraphicProps {
  className?: string;
  size?: number | string;
}

/**
 * 1. Technical Full-Stack & AI Architecture Blueprint
 * Shows layered production architecture: UI -> API Gateway -> RAG Vector Pipeline -> Cloud DB
 */
export const CodeArchitectureIllustration: React.FC<GraphicProps> = ({
  className = 'w-full h-auto max-w-md',
}) => {
  return (
    <svg
      viewBox="0 0 460 280"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`select-none ${className}`}
      aria-label="Technical Architecture Blueprint"
    >
      <rect width="460" height="280" rx="16" fill="#050B17" />
      <rect x="1" y="1" width="458" height="278" rx="15" stroke="#1E293B" strokeWidth="1.5" />

      {/* Grid background lines */}
      <path d="M 40 0 L 40 280 M 120 0 L 120 280 M 200 0 L 200 280 M 280 0 L 280 280 M 360 0 L 360 280 M 420 0 L 420 280" stroke="#0F172A" strokeWidth="1" strokeDasharray="4 4" />
      <path d="M 0 50 L 460 50 M 0 110 L 460 110 M 0 170 L 460 170 M 0 230 L 460 230" stroke="#0F172A" strokeWidth="1" strokeDasharray="4 4" />

      {/* Top Header bar with status nodes */}
      <rect x="20" y="18" width="420" height="28" rx="6" fill="#0A1224" stroke="#1E293B" strokeWidth="1" />
      <circle cx="36" cy="32" r="4" fill="#EF4444" opacity="0.8" />
      <circle cx="50" cy="32" r="4" fill="#F59E0B" opacity="0.8" />
      <circle cx="64" cy="32" r="4" fill="#10B981" opacity="0.8" />
      <text x="82" y="36" fill="#64748B" fontSize="10" fontFamily="monospace" fontWeight="600">SYS_ARCH // RAG_FASTAPI_NEXTJS_PIPELINE</text>
      <rect x="360" y="24" width="70" height="16" rx="4" fill="#1D4ED8" fillOpacity="0.2" stroke="#1D4ED8" strokeWidth="0.8" />
      <text x="395" y="35" fill="#60A5FA" fontSize="8" fontFamily="monospace" fontWeight="700" textAnchor="middle">READY : 200</text>

      {/* Layer 1: Client Front-End */}
      <rect x="30" y="70" width="115" height="75" rx="8" fill="#0F172A" stroke="#1D4ED8" strokeWidth="1.2" />
      <rect x="40" y="80" width="95" height="18" rx="4" fill="#1D4ED8" fillOpacity="0.25" />
      <text x="87" y="93" fill="#93C5FD" fontSize="10" fontFamily="system-ui, sans-serif" fontWeight="800" textAnchor="middle">Next.js Client</text>
      <text x="87" y="112" fill="#64748B" fontSize="8.5" fontFamily="monospace" textAnchor="middle">React 19 • SSR</text>
      <text x="87" y="128" fill="#475569" fontSize="8" fontFamily="monospace" textAnchor="middle">Tailwind • Audio API</text>

      {/* Connector Arrow 1 -> 2 */}
      <path d="M 145 107 L 175 107" stroke="#1D4ED8" strokeWidth="2" strokeDasharray="3 3" />
      <polygon points="175,103 182,107 175,111" fill="#1D4ED8" />

      {/* Layer 2: API Gateway & Auth */}
      <rect x="185" y="70" width="110" height="75" rx="8" fill="#0F172A" stroke="#334155" strokeWidth="1.2" />
      <rect x="195" y="80" width="90" height="18" rx="4" fill="#334155" fillOpacity="0.6" />
      <text x="240" y="93" fill="#F8FAFC" fontSize="10" fontFamily="system-ui, sans-serif" fontWeight="800" textAnchor="middle">FastAPI Core</text>
      <text x="240" y="112" fill="#64748B" fontSize="8.5" fontFamily="monospace" textAnchor="middle">Pydantic Schema</text>
      <text x="240" y="128" fill="#10B981" fontSize="8" fontFamily="monospace" textAnchor="middle">Bearer Auth Guard</text>

      {/* Connector Arrow 2 -> 3 */}
      <path d="M 295 107 L 325 107" stroke="#1D4ED8" strokeWidth="2" strokeDasharray="3 3" />
      <polygon points="325,103 332,107 325,111" fill="#1D4ED8" />

      {/* Layer 3: Vector Embeddings & LLM Orchestrator */}
      <rect x="335" y="70" width="95" height="75" rx="8" fill="#0F172A" stroke="#2563EB" strokeWidth="1.2" />
      <rect x="343" y="80" width="79" height="18" rx="4" fill="#1D4ED8" fillOpacity="0.3" />
      <text x="382" y="93" fill="#60A5FA" fontSize="9.5" fontFamily="system-ui, sans-serif" fontWeight="800" textAnchor="middle">Vector Store</text>
      <text x="382" y="112" fill="#64748B" fontSize="8.5" fontFamily="monospace" textAnchor="middle">Chroma / PGVector</text>
      <text x="382" y="128" fill="#F59E0B" fontSize="8" fontFamily="monospace" textAnchor="middle">Cosine Sim : 0.94</text>

      {/* Downward routing lines to Bottom Services */}
      <path d="M 240 145 L 240 180 M 382 145 L 382 180" stroke="#334155" strokeWidth="1.5" />
      <circle cx="240" cy="180" r="3" fill="#1D4ED8" />
      <circle cx="382" cy="180" r="3" fill="#10B981" />

      {/* Bottom Service Bar */}
      <rect x="150" y="185" width="280" height="65" rx="8" fill="#0A1224" stroke="#1E293B" strokeWidth="1" />
      <rect x="160" y="195" width="120" height="45" rx="6" fill="#0F172A" stroke="#334155" strokeWidth="0.8" />
      <text x="220" y="213" fill="#E2E8F0" fontSize="9" fontFamily="system-ui, sans-serif" fontWeight="700" textAnchor="middle">PostgreSQL Database</text>
      <text x="220" y="228" fill="#64748B" fontSize="8" fontFamily="monospace" textAnchor="middle">ACID Transactions</text>

      <rect x="295" y="195" width="125" height="45" rx="6" fill="#0F172A" stroke="#1D4ED8" strokeWidth="0.8" />
      <text x="357" y="213" fill="#60A5FA" fontSize="9" fontFamily="system-ui, sans-serif" fontWeight="700" textAnchor="middle">Signed Token Vault</text>
      <text x="357" y="228" fill="#10B981" fontSize="8" fontFamily="monospace" textAnchor="middle">15m Expire • Watermark</text>

      {/* Pulse Status Indicator */}
      <circle cx="45" cy="205" r="5" fill="#10B981" />
      <circle cx="45" cy="205" r="9" fill="#10B981" opacity="0.2" />
      <text x="60" y="209" fill="#CBD5E1" fontSize="9" fontFamily="monospace" fontWeight="600">SERVICES ONLINE</text>
      <text x="60" y="224" fill="#64748B" fontSize="8" fontFamily="monospace">Latency: 28ms avg</text>
    </svg>
  );
};

/**
 * 2. Neural Attention & AI Cognitive Pipeline Graphic
 */
export const AIModelNeuralIllustration: React.FC<GraphicProps> = ({
  className = 'w-full h-auto max-w-sm',
}) => {
  return (
    <svg
      viewBox="0 0 380 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`select-none ${className}`}
      aria-label="AI Cognitive Architecture"
    >
      <rect width="380" height="240" rx="16" fill="#000825" />
      <rect x="1" y="1" width="378" height="238" rx="15" stroke="#1E293B" strokeWidth="1.5" />

      {/* Ambient Neural Circles */}
      <circle cx="60" cy="80" r="14" fill="#1E293B" stroke="#1D4ED8" strokeWidth="2" />
      <circle cx="60" cy="160" r="14" fill="#1E293B" stroke="#1D4ED8" strokeWidth="2" />
      <text x="60" y="84" fill="#93C5FD" fontSize="8" fontFamily="monospace" fontWeight="800" textAnchor="middle">T_IN</text>
      <text x="60" y="164" fill="#93C5FD" fontSize="8" fontFamily="monospace" fontWeight="800" textAnchor="middle">CTX</text>

      {/* Hidden Layer Nodes */}
      <circle cx="160" cy="50" r="12" fill="#0F172A" stroke="#3B82F6" strokeWidth="1.5" />
      <circle cx="160" cy="120" r="16" fill="#1D4ED8" stroke="#60A5FA" strokeWidth="2" />
      <circle cx="160" cy="190" r="12" fill="#0F172A" stroke="#3B82F6" strokeWidth="1.5" />
      <text x="160" y="125" fill="#FFFFFF" fontSize="9" fontFamily="monospace" fontWeight="800" textAnchor="middle">ATTN</text>

      {/* Synthesis Nodes */}
      <circle cx="260" cy="80" r="14" fill="#0F172A" stroke="#10B981" strokeWidth="2" />
      <circle cx="260" cy="160" r="14" fill="#0F172A" stroke="#10B981" strokeWidth="2" />
      <text x="260" y="84" fill="#A7F3D0" fontSize="8" fontFamily="monospace" fontWeight="800" textAnchor="middle">RAG</text>
      <text x="260" y="164" fill="#A7F3D0" fontSize="8" fontFamily="monospace" fontWeight="800" textAnchor="middle">EVAL</text>

      {/* Output Node */}
      <circle cx="330" cy="120" r="18" fill="#10B981" fillOpacity="0.2" stroke="#10B981" strokeWidth="2" />
      <text x="330" y="124" fill="#34D399" fontSize="9" fontFamily="monospace" fontWeight="900" textAnchor="middle">OUT</text>

      {/* Synaptic Interconnections */}
      <path d="M 74 80 L 148 50 M 74 80 L 144 120 M 74 80 L 148 190" stroke="#1D4ED8" strokeWidth="1.2" opacity="0.5" />
      <path d="M 74 160 L 148 50 M 74 160 L 144 120 M 74 160 L 148 190" stroke="#1D4ED8" strokeWidth="1.2" opacity="0.5" />
      <path d="M 172 50 L 246 80 M 172 50 L 246 160" stroke="#3B82F6" strokeWidth="1.2" opacity="0.5" />
      <path d="M 176 120 L 246 80 M 176 120 L 246 160" stroke="#60A5FA" strokeWidth="1.8" />
      <path d="M 172 190 L 246 80 M 172 190 L 246 160" stroke="#3B82F6" strokeWidth="1.2" opacity="0.5" />
      <path d="M 274 80 L 312 120 M 274 160 L 312 120" stroke="#10B981" strokeWidth="1.5" />

      {/* Bottom Technical Spec Label */}
      <rect x="25" y="202" width="330" height="22" rx="4" fill="#0A1224" stroke="#1E293B" strokeWidth="0.8" />
      <text x="190" y="216" fill="#94A3B8" fontSize="8.5" fontFamily="monospace" textAnchor="middle">
        PARAM: 70B • CONTEXT: 128K TOKENS • TEMPERATURE: 0.2
      </text>
    </svg>
  );
};

/**
 * 3. Digital Marketing Funnel & Curriculum Attribution Model
 * Conceptual educational model depicting acquisition, engagement, conversion, and retention
 */
export const GrowthMarketingFunnelIllustration: React.FC<GraphicProps> = ({
  className = 'w-full h-auto max-w-sm',
}) => {
  return (
    <svg
      viewBox="0 0 380 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`select-none ${className}`}
      aria-label="Conceptual Marketing Funnel Framework"
    >
      <rect width="380" height="240" rx="16" fill="#072118" />
      <rect x="1" y="1" width="378" height="238" rx="15" stroke="#0D3829" strokeWidth="1.5" />

      {/* Funnel Stage 1: Acquisition (Wide) */}
      <polygon points="30,40 350,40 310,80 70,80" fill="#EA580C" fillOpacity="0.85" stroke="#FDBA74" strokeWidth="1" />
      <text x="190" y="63" fill="#FFFFFF" fontSize="10" fontFamily="system-ui, sans-serif" fontWeight="800" textAnchor="middle">
        STAGE 1: AUDIENCE DISCOVERY &amp; ACQUISITION
      </text>

      {/* Funnel Stage 2: Engagement & Activation */}
      <polygon points="72,85 308,85 272,125 108,125" fill="#EA580C" fillOpacity="0.65" stroke="#FED7AA" strokeWidth="1" />
      <text x="190" y="108" fill="#FFF7ED" fontSize="9.5" fontFamily="system-ui, sans-serif" fontWeight="700" textAnchor="middle">
        STAGE 2: ENGAGEMENT &amp; INTERACTIVE CONTENT
      </text>

      {/* Funnel Stage 3: Conversion */}
      <polygon points="110,130 270,130 240,170 140,170" fill="#059669" fillOpacity="0.75" stroke="#6EE7B7" strokeWidth="1" />
      <text x="190" y="153" fill="#FFFFFF" fontSize="9" fontFamily="system-ui, sans-serif" fontWeight="700" textAnchor="middle">
        STAGE 3: CONVERSION &amp; DIRECT APPLICATION
      </text>

      {/* Funnel Stage 4: Retention & LTV (Base) */}
      <polygon points="142,175 238,175 220,205 160,205" fill="#10B981" fillOpacity="0.4" stroke="#10B981" strokeWidth="1.2" />
      <text x="190" y="194" fill="#34D399" fontSize="8.5" fontFamily="system-ui, sans-serif" fontWeight="800" textAnchor="middle">
        STAGE 4: SKILL RETENTION &amp; COMPOUNDING
      </text>

      {/* Conceptual Framework Tag */}
      <rect x="250" y="172" width="115" height="24" rx="4" fill="#0A2C21" stroke="#0D3829" strokeWidth="0.8" />
      <text x="307" y="187" fill="#34D399" fontSize="7.5" fontFamily="monospace" fontWeight="700" textAnchor="middle">
        CONCEPTUAL MODEL
      </text>
      <text x="307" y="210" fill="#A7F3D0" fontSize="7.5" fontFamily="system-ui" textAnchor="middle">Illustrative Syllabus</text>
    </svg>
  );
};

/**
 * 4. Technical Monograph / EBook Publishing Vector
 */
export const EBookReaderIllustration: React.FC<GraphicProps> = ({
  className = 'w-full h-auto max-w-sm',
}) => {
  return (
    <svg
      viewBox="0 0 360 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`select-none ${className}`}
      aria-label="Technical Monograph Vector"
    >
      <rect width="360" height="240" rx="16" fill="#F8FAFC" />
      <rect x="1" y="1" width="358" height="238" rx="15" stroke="#E2E8F0" strokeWidth="1.5" />

      {/* Open Book Spread Background */}
      <path d="M 40 50 Q 180 60 180 70 L 180 205 Q 180 195 40 185 Z" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.2" />
      <path d="M 320 50 Q 180 60 180 70 L 180 205 Q 180 195 320 185 Z" fill="#F1F5F9" stroke="#CBD5E1" strokeWidth="1.2" />

      {/* Book Spine Center Shadow */}
      <line x1="180" y1="65" x2="180" y2="205" stroke="#94A3B8" strokeWidth="2" opacity="0.6" />

      {/* Bookmark Ribbon */}
      <path d="M 172 45 L 172 130 L 180 120 L 188 130 L 188 45 Z" fill="#D97706" />

      {/* Left Page Text Lines */}
      <rect x="55" y="80" width="85" height="6" rx="2" fill="#000825" />
      <line x1="55" y1="100" x2="160" y2="100" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
      <line x1="55" y1="112" x2="155" y2="112" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
      <line x1="55" y1="124" x2="145" y2="124" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
      <line x1="55" y1="136" x2="158" y2="136" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
      <line x1="55" y1="148" x2="130" y2="148" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />

      {/* Right Page Code Snippet Box */}
      <rect x="200" y="80" width="105" height="65" rx="4" fill="#072118" />
      <circle cx="210" cy="90" r="2" fill="#EF4444" />
      <circle cx="216" cy="90" r="2" fill="#F59E0B" />
      <circle cx="222" cy="90" r="2" fill="#10B981" />
      <line x1="208" y1="102" x2="280" y2="102" stroke="#A7F3D0" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="208" y1="112" x2="295" y2="112" stroke="#34D399" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="216" y1="122" x2="265" y2="122" stroke="#FED7AA" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="208" y1="132" x2="245" y2="132" stroke="#6EE7B7" strokeWidth="1.5" strokeLinecap="round" />

      {/* DRM-Free & Verified Watermark Stamp */}
      <rect x="200" y="160" width="105" height="24" rx="4" fill="#EA580C" fillOpacity="0.12" stroke="#EA580C" strokeWidth="0.8" />
      <text x="252" y="175" fill="#C2410C" fontSize="8" fontFamily="monospace" fontWeight="800" textAnchor="middle">
        VERIFIED ISBN • DRM-FREE
      </text>
    </svg>
  );
};

/**
 * 5. Stepped Career Pathway & Roadmap Vector
 * Illustrative milestone progression without speculative or unverified salary claims
 */
export const CareerLadderIllustration: React.FC<GraphicProps> = ({
  className = 'w-full h-auto max-w-sm',
}) => {
  return (
    <svg
      viewBox="0 0 380 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`select-none ${className}`}
      aria-label="Career Advancement Pathway"
    >
      <rect width="380" height="240" rx="16" fill="#000825" />
      <rect x="1" y="1" width="378" height="238" rx="15" stroke="#1E293B" strokeWidth="1.5" />

      {/* Stepped Architectural Pathway */}
      {/* Step 1: Foundation */}
      <rect x="35" y="155" width="85" height="55" rx="6" fill="#0F172A" stroke="#334155" strokeWidth="1" />
      <text x="77" y="175" fill="#94A3B8" fontSize="8.5" fontFamily="system-ui" fontWeight="700" textAnchor="middle">TIER 01</text>
      <text x="77" y="190" fill="#FFFFFF" fontSize="9" fontFamily="system-ui" fontWeight="800" textAnchor="middle">Core Development</text>
      <text x="77" y="202" fill="#64748B" fontSize="7.5" fontFamily="monospace" textAnchor="middle">Full-Stack Basics</text>

      {/* Connector 1 -> 2 */}
      <path d="M 120 180 L 145 150" stroke="#1D4ED8" strokeWidth="2" strokeDasharray="3 3" />

      {/* Step 2: Senior Specialist */}
      <rect x="145" y="110" width="95" height="60" rx="6" fill="#0F172A" stroke="#1D4ED8" strokeWidth="1.5" />
      <text x="192" y="130" fill="#60A5FA" fontSize="8.5" fontFamily="system-ui" fontWeight="700" textAnchor="middle">TIER 02</text>
      <text x="192" y="145" fill="#FFFFFF" fontSize="9.5" fontFamily="system-ui" fontWeight="800" textAnchor="middle">Applied AI Lead</text>
      <text x="192" y="160" fill="#10B981" fontSize="8" fontFamily="monospace" textAnchor="middle">RAG &amp; Microservices</text>

      {/* Connector 2 -> 3 */}
      <path d="M 240 135 L 265 95" stroke="#10B981" strokeWidth="2" />

      {/* Step 3: Systems & Growth Architect (Peak) */}
      <rect x="260" y="50" width="90" height="70" rx="8" fill="#1D4ED8" fillOpacity="0.25" stroke="#10B981" strokeWidth="2" />
      <circle cx="305" cy="40" r="14" fill="#10B981" />
      <path d="M 300 40 L 304 44 L 311 36" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <text x="305" y="75" fill="#34D399" fontSize="8.5" fontFamily="system-ui" fontWeight="800" textAnchor="middle">TIER 03</text>
      <text x="305" y="90" fill="#FFFFFF" fontSize="9.5" fontFamily="system-ui" fontWeight="900" textAnchor="middle">Systems Architect</text>
      <text x="305" y="105" fill="#FDE047" fontSize="8" fontFamily="monospace" fontWeight="700" textAnchor="middle">Enterprise Strategy</text>

      {/* Bottom Growth Axis Line */}
      <line x1="30" y1="220" x2="350" y2="220" stroke="#1E293B" strokeWidth="1.5" />
      <polygon points="350,217 356,220 350,223" fill="#1E293B" />
      <text x="190" y="233" fill="#64748B" fontSize="8" fontFamily="monospace" textAnchor="middle">
        ILLUSTRATIVE CAREER ROADMAP • CONCEPTUAL SKILL HIERARCHY
      </text>
    </svg>
  );
};

/**
 * 6. Course Completion Certificate Graphic
 * Conveys verified curriculum completion without unapproved accreditation claims
 */
export const AcademicDiplomaIllustration: React.FC<GraphicProps> = ({
  className = 'w-full h-auto max-w-sm',
}) => {
  return (
    <svg
      viewBox="0 0 360 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`select-none ${className}`}
      aria-label="Course Completion Credential"
    >
      <rect width="360" height="240" rx="16" fill="#000825" />
      <rect x="1" y="1" width="358" height="238" rx="15" stroke="#1E293B" strokeWidth="1.5" />

      {/* Parchment Certificate Canvas */}
      <rect x="40" y="30" width="280" height="180" rx="8" fill="#FFFFFF" stroke="#D97706" strokeWidth="2" />
      <rect x="46" y="36" width="268" height="168" rx="6" fill="none" stroke="#101F45" strokeWidth="0.8" strokeDasharray="3 2" />

      {/* Header Wordmark */}
      <text x="180" y="60" fill="#101F45" fontSize="11" fontFamily="system-ui" fontWeight="900" letterSpacing="1" textAnchor="middle">
        GXA CAREER ACADEMY
      </text>
      <text x="180" y="72" fill="#D97706" fontSize="7.5" fontFamily="monospace" fontWeight="700" textAnchor="middle">
        CERTIFICATE OF COURSE COMPLETION
      </text>

      {/* Ribbon Bar */}
      <line x1="80" y1="85" x2="280" y2="85" stroke="#1D4ED8" strokeWidth="1" />

      {/* Conferred Text */}
      <text x="180" y="105" fill="#64748B" fontSize="7.5" fontFamily="system-ui" textAnchor="middle">THIS IS CONFERRED UPON</text>
      <text x="180" y="125" fill="#101F45" fontSize="13" fontFamily="system-ui" fontWeight="900" textAnchor="middle">Enrolled Student</text>
      <line x1="120" y1="133" x2="240" y2="133" stroke="#D97706" strokeWidth="0.8" />

      {/* Course Title Line */}
      <text x="180" y="148" fill="#475569" fontSize="8" fontFamily="system-ui" fontWeight="600" textAnchor="middle">
        Curriculum Completion • Production Systems Track
      </text>

      {/* Seal Stamp Bottom Left */}
      <circle cx="95" cy="175" r="16" fill="#D97706" />
      <circle cx="95" cy="175" r="13" fill="#F59E0B" />
      <text x="95" y="178" fill="#FFFFFF" fontSize="6.5" fontFamily="monospace" fontWeight="900" textAnchor="middle">VERIFIED</text>

      {/* Signatures Bottom Right */}
      <line x1="210" y1="180" x2="270" y2="180" stroke="#101F45" strokeWidth="1" />
      <text x="240" y="190" fill="#64748B" fontSize="7" fontFamily="system-ui" textAnchor="middle">Technical Directorate</text>
    </svg>
  );
};

/**
 * 7. Universal Editorial Empty State Graphic
 * Used when a bookshelf, course list, or search has no matching items
 */
export const EmptyStateIllustration: React.FC<{
  title?: string;
  description?: string;
  className?: string;
}> = ({
  title = 'No Records Found',
  description = 'There are currently no items matching your criteria in the academic registry.',
  className = 'w-full max-w-sm mx-auto',
}) => {
  return (
    <div className={`flex flex-col items-center text-center p-8 ${className}`}>
      <svg
        viewBox="0 0 240 180"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-48 h-auto mb-4 select-none"
        aria-hidden="true"
      >
        <circle cx="120" cy="90" r="75" fill="#F1F5F9" />
        <circle cx="120" cy="90" r="55" fill="#E2E8F0" opacity="0.6" />

        {/* Stack of Documents */}
        <rect x="75" y="55" width="80" height="95" rx="6" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.5" />
        <rect x="85" y="45" width="80" height="95" rx="6" fill="#F8FAFC" stroke="#94A3B8" strokeWidth="1.5" />
        <rect x="95" y="35" width="80" height="95" rx="6" fill="#FFFFFF" stroke="#000825" strokeWidth="1.8" />

        {/* Lines on Front Document */}
        <line x1="110" y1="52" x2="160" y2="52" stroke="#1D4ED8" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="110" y1="64" x2="155" y2="64" stroke="#CBD5E1" strokeWidth="2" strokeLinecap="round" />
        <line x1="110" y1="74" x2="165" y2="74" stroke="#CBD5E1" strokeWidth="2" strokeLinecap="round" />
        <line x1="110" y1="84" x2="145" y2="84" stroke="#CBD5E1" strokeWidth="2" strokeLinecap="round" />

        {/* Circular Magnifier */}
        <circle cx="155" cy="115" r="24" fill="#FFFFFF" stroke="#1D4ED8" strokeWidth="3" />
        <line x1="172" y1="132" x2="192" y2="152" stroke="#1D4ED8" strokeWidth="3.5" strokeLinecap="round" />
        <circle cx="155" cy="115" r="16" fill="#1D4ED8" fillOpacity="0.1" />
        <text x="155" y="120" fill="#1D4ED8" fontSize="16" fontFamily="system-ui" fontWeight="900" textAnchor="middle">?</text>
      </svg>
      <h3 className="font-display text-lg font-bold text-[#000825] mb-1">{title}</h3>
      <p className="text-xs text-slate-500 max-w-xs leading-relaxed">{description}</p>
    </div>
  );
};

/**
 * 8. 256-Bit SSL & Indian Payment Security Shield
 */
export const SecurePaymentShieldIllustration: React.FC<GraphicProps> = ({
  className = 'w-full h-auto max-w-sm',
}) => {
  return (
    <svg
      viewBox="0 0 320 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`select-none ${className}`}
      aria-label="Secure Payment Encryption"
    >
      <rect width="320" height="200" rx="16" fill="#000825" />
      <rect x="1" y="1" width="318" height="198" rx="15" stroke="#1E293B" strokeWidth="1.5" />

      {/* Security Shield */}
      <path
        d="M 160 30 L 220 52 C 220 105, 195 145, 160 162 C 125 145, 100 105, 100 52 Z"
        fill="#0F172A"
        stroke="#10B981"
        strokeWidth="2.5"
      />

      {/* Internal Padlock */}
      <rect x="142" y="92" width="36" height="28" rx="4" fill="#10B981" />
      <path d="M 148 92 L 148 78 C 148 72, 172 72, 172 78 L 172 92" stroke="#34D399" strokeWidth="3.5" fill="none" strokeLinecap="round" />
      <circle cx="160" cy="104" r="3" fill="#000825" />
      <line x1="160" y1="107" x2="160" y2="114" stroke="#000825" strokeWidth="2" />

      {/* Badge Tags Left and Right */}
      <rect x="25" y="70" width="60" height="22" rx="4" fill="#1D4ED8" fillOpacity="0.2" stroke="#1D4ED8" strokeWidth="0.8" />
      <text x="55" y="84" fill="#93C5FD" fontSize="8" fontFamily="monospace" fontWeight="800" textAnchor="middle">UPI / QR</text>

      <rect x="25" y="105" width="60" height="22" rx="4" fill="#334155" stroke="#475569" strokeWidth="0.8" />
      <text x="55" y="119" fill="#E2E8F0" fontSize="8" fontFamily="monospace" fontWeight="700" textAnchor="middle">RAZORPAY</text>

      <rect x="235" y="70" width="60" height="22" rx="4" fill="#10B981" fillOpacity="0.2" stroke="#10B981" strokeWidth="0.8" />
      <text x="265" y="84" fill="#6EE7B7" fontSize="8" fontFamily="monospace" fontWeight="800" textAnchor="middle">256-BIT</text>

      <rect x="235" y="105" width="60" height="22" rx="4" fill="#334155" stroke="#475569" strokeWidth="0.8" />
      <text x="265" y="119" fill="#E2E8F0" fontSize="8" fontFamily="monospace" fontWeight="700" textAnchor="middle">FAIL-SAFE</text>

      {/* Bottom Text */}
      <text x="160" y="185" fill="#94A3B8" fontSize="8.5" fontFamily="monospace" textAnchor="middle">
        INSTANT TOKENIZED FULFILLMENT • ENCRYPTED
      </text>
    </svg>
  );
};

/**
 * 9. Course Learning Progress & Mastery Illustration
 * Depicts active video lecture playback, milestone code checkpoint, and distinction progress
 */
export const CourseLearningProgressIllustration: React.FC<GraphicProps> = ({
  className = 'w-full h-auto max-w-sm',
}) => {
  return (
    <svg
      viewBox="0 0 380 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`select-none ${className}`}
      aria-label="Course Learning Progress Illustration"
    >
      <rect width="380" height="220" rx="16" fill="#000825" />
      <rect x="1" y="1" width="378" height="218" rx="15" stroke="#1E293B" strokeWidth="1.5" />

      {/* Screen Frame */}
      <rect x="25" y="25" width="220" height="135" rx="8" fill="#0A1224" stroke="#1D4ED8" strokeWidth="1.2" />
      
      {/* Video / IDE Header */}
      <rect x="25" y="25" width="220" height="20" rx="8" fill="#0F172A" />
      <circle cx="37" cy="35" r="3" fill="#EF4444" />
      <circle cx="47" cy="35" r="3" fill="#F59E0B" />
      <circle cx="57" cy="35" r="3" fill="#10B981" />
      <text x="70" y="38" fill="#64748B" fontSize="8" fontFamily="monospace">production_system.ts • 1080p</text>

      {/* Code / Visual Wave Area */}
      <rect x="35" y="55" width="120" height="8" rx="2" fill="#1D4ED8" fillOpacity="0.4" />
      <rect x="35" y="68" width="160" height="6" rx="2" fill="#1E293B" />
      <rect x="45" y="78" width="90" height="6" rx="2" fill="#334155" />
      <rect x="45" y="88" width="140" height="6" rx="2" fill="#1E293B" />
      <rect x="35" y="98" width="80" height="6" rx="2" fill="#10B981" fillOpacity="0.5" />

      {/* Play/Progress Scrub Bar */}
      <rect x="35" y="130" width="200" height="5" rx="2.5" fill="#1E293B" />
      <rect x="35" y="130" width="135" height="5" rx="2.5" fill="#1D4ED8" />
      <circle cx="170" cy="132.5" r="5" fill="#60A5FA" />
      <text x="35" y="148" fill="#94A3B8" fontSize="8" fontFamily="monospace">14:28 / 22:15</text>
      <text x="210" y="148" fill="#10B981" fontSize="8" fontFamily="monospace" textAnchor="end">65% DONE</text>

      {/* Milestone Badges on Right */}
      <rect x="260" y="25" width="95" height="42" rx="8" fill="#0F172A" stroke="#1E293B" strokeWidth="1" />
      <text x="307" y="42" fill="#60A5FA" fontSize="8" fontFamily="monospace" fontWeight="700" textAnchor="middle">CHECKPOINT</text>
      <text x="307" y="56" fill="#10B981" fontSize="9" fontFamily="system-ui" fontWeight="800" textAnchor="middle">Passed 100%</text>

      <rect x="260" y="75" width="95" height="42" rx="8" fill="#0F172A" stroke="#1E293B" strokeWidth="1" />
      <text x="307" y="92" fill="#94A3B8" fontSize="8" fontFamily="monospace" textAnchor="middle">QUIZ SCORE</text>
      <text x="307" y="106" fill="#FBBF24" fontSize="9" fontFamily="system-ui" fontWeight="800" textAnchor="middle">Grade: A+</text>

      <rect x="260" y="125" width="95" height="35" rx="8" fill="#1D4ED8" fillOpacity="0.2" stroke="#1D4ED8" strokeWidth="1" />
      <text x="307" y="142" fill="#93C5FD" fontSize="8" fontFamily="monospace" fontWeight="700" textAnchor="middle">CERTIFICATE</text>
      <text x="307" y="152" fill="#FFFFFF" fontSize="7.5" fontFamily="system-ui" textAnchor="middle">Ready on Capstone</text>

      {/* Bottom Technical Spec */}
      <rect x="25" y="175" width="330" height="28" rx="6" fill="#0A1224" stroke="#1E293B" strokeWidth="1" />
      <circle cx="42" cy="189" r="4" fill="#10B981" />
      <text x="54" y="193" fill="#E2E8F0" fontSize="9" fontFamily="system-ui" fontWeight="600">Continuous Cohort Progress Tracker</text>
      <text x="340" y="193" fill="#64748B" fontSize="8.5" fontFamily="monospace" textAnchor="end">Tamper-Proof Ledger</text>
    </svg>
  );
};

/**
 * 10. Student Dashboard Welcome & Analytics Graphic
 * Displays learning milestones, active enrollments, and academic velocity
 */
export const StudentDashboardWelcomeGraphic: React.FC<GraphicProps> = ({
  className = 'w-full h-auto max-w-sm',
}) => {
  return (
    <svg
      viewBox="0 0 380 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`select-none ${className}`}
      aria-label="Student Learning Analytics"
    >
      <rect width="380" height="220" rx="16" fill="#000825" />
      <rect x="1" y="1" width="378" height="218" rx="15" stroke="#1E293B" strokeWidth="1.5" />

      {/* Grid Pattern */}
      <line x1="30" y1="160" x2="350" y2="160" stroke="#1E293B" strokeWidth="1" strokeDasharray="3 3" />
      <line x1="30" y1="110" x2="350" y2="110" stroke="#1E293B" strokeWidth="1" strokeDasharray="3 3" />
      <line x1="30" y1="60" x2="350" y2="60" stroke="#1E293B" strokeWidth="1" strokeDasharray="3 3" />

      {/* Analytics Bars */}
      <rect x="50" y="120" width="22" height="40" rx="4" fill="#1E293B" />
      <rect x="90" y="90" width="22" height="70" rx="4" fill="#1D4ED8" fillOpacity="0.5" />
      <rect x="130" y="70" width="22" height="90" rx="4" fill="#1D4ED8" />
      <rect x="170" y="45" width="22" height="115" rx="4" fill="#2563EB" />
      <rect x="210" y="35" width="22" height="125" rx="4" fill="#3B82F6" />
      <rect x="250" y="55" width="22" height="105" rx="4" fill="#10B981" />
      <rect x="290" y="30" width="22" height="130" rx="4" fill="#10B981" fillOpacity="0.8" />

      {/* Trend Curve */}
      <path
        d="M 61 115 Q 141 65 221 32 T 301 25"
        stroke="#FDE047"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <circle cx="301" cy="25" r="5" fill="#FDE047" />

      {/* Day Labels */}
      <text x="61" y="178" fill="#64748B" fontSize="8" fontFamily="monospace" textAnchor="middle">MON</text>
      <text x="101" y="178" fill="#64748B" fontSize="8" fontFamily="monospace" textAnchor="middle">TUE</text>
      <text x="141" y="178" fill="#64748B" fontSize="8" fontFamily="monospace" textAnchor="middle">WED</text>
      <text x="181" y="178" fill="#64748B" fontSize="8" fontFamily="monospace" textAnchor="middle">THU</text>
      <text x="221" y="178" fill="#64748B" fontSize="8" fontFamily="monospace" textAnchor="middle">FRI</text>
      <text x="261" y="178" fill="#64748B" fontSize="8" fontFamily="monospace" textAnchor="middle">SAT</text>
      <text x="301" y="178" fill="#34D399" fontSize="8" fontFamily="monospace" fontWeight="700" textAnchor="middle">SUN</text>

      {/* Metric Overlay Pills */}
      <rect x="30" y="188" width="145" height="22" rx="4" fill="#0A1224" stroke="#1E293B" strokeWidth="0.8" />
      <text x="102" y="202" fill="#93C5FD" fontSize="8" fontFamily="monospace" textAnchor="middle">WEEKLY ACTIVITY LOG</text>

      <rect x="195" y="188" width="155" height="22" rx="4" fill="#0A1224" stroke="#1E293B" strokeWidth="0.8" />
      <text x="272" y="202" fill="#34D399" fontSize="8" fontFamily="monospace" fontWeight="700" textAnchor="middle">ILLUSTRATIVE PROGRESS</text>
    </svg>
  );
};

/**
 * 11. Free Educational Resources & Code Cheatsheets Graphic
 */
export const FreeResourcesBundleGraphic: React.FC<GraphicProps> = ({
  className = 'w-full h-auto max-w-sm',
}) => {
  return (
    <svg
      viewBox="0 0 360 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`select-none ${className}`}
      aria-label="Free Educational Resources Bundle"
    >
      <rect width="360" height="220" rx="16" fill="#000825" />
      <rect x="1" y="1" width="358" height="218" rx="15" stroke="#1E293B" strokeWidth="1.5" />

      {/* Layered Cheatsheet cards */}
      {/* Back card */}
      <rect x="50" y="30" width="180" height="120" rx="8" fill="#0F172A" stroke="#334155" strokeWidth="1.2" transform="rotate(-6 50 30)" />
      
      {/* Middle card */}
      <rect x="80" y="35" width="180" height="120" rx="8" fill="#101F45" stroke="#1D4ED8" strokeWidth="1.2" transform="rotate(3 80 35)" />
      
      {/* Front Card */}
      <rect x="110" y="45" width="190" height="125" rx="8" fill="#050B17" stroke="#2563EB" strokeWidth="1.5" />
      <rect x="120" y="55" width="170" height="18" rx="4" fill="#1D4ED8" fillOpacity="0.25" />
      <text x="205" y="68" fill="#60A5FA" fontSize="8.5" fontFamily="monospace" fontWeight="700" textAnchor="middle">OPEN REFERENCE // PDF &amp; MARKDOWN</text>
      
      <line x1="125" y1="88" x2="285" y2="88" stroke="#334155" strokeWidth="2" strokeLinecap="round" />
      <line x1="125" y1="98" x2="260" y2="98" stroke="#334155" strokeWidth="2" strokeLinecap="round" />
      <line x1="125" y1="108" x2="275" y2="108" stroke="#334155" strokeWidth="2" strokeLinecap="round" />
      <line x1="125" y1="118" x2="230" y2="118" stroke="#334155" strokeWidth="2" strokeLinecap="round" />

      {/* Free Badge */}
      <rect x="235" y="132" width="55" height="24" rx="6" fill="#10B981" />
      <text x="262" y="148" fill="#FFFFFF" fontSize="9" fontFamily="system-ui" fontWeight="900" textAnchor="middle">100% FREE</text>

      {/* Bottom Footer Info */}
      <rect x="25" y="180" width="310" height="26" rx="6" fill="#0A1224" stroke="#1E293B" strokeWidth="0.8" />
      <text x="180" y="196" fill="#94A3B8" fontSize="8.5" fontFamily="monospace" textAnchor="middle">
        NO CREDIT CARD REQUIRED • INSTANT REPO DOWNLOAD
      </text>
    </svg>
  );
};

/**
 * 12. Career Guidance Matrix & Skills Progression Graphic
 * Illustrative role matrix without unverified salary claims
 */
export const CareerGuidanceMatrixGraphic: React.FC<GraphicProps> = ({
  className = 'w-full h-auto max-w-sm',
}) => {
  return (
    <svg
      viewBox="0 0 380 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`select-none ${className}`}
      aria-label="Career Guidance Matrix Graphic"
    >
      <rect width="380" height="220" rx="16" fill="#000825" />
      <rect x="1" y="1" width="378" height="218" rx="15" stroke="#1E293B" strokeWidth="1.5" />

      {/* Header */}
      <text x="30" y="32" fill="#60A5FA" fontSize="9" fontFamily="monospace" fontWeight="700">TECHNICAL ROLE PROGRESSION MATRIX</text>
      
      {/* Track 1: AI Systems */}
      <rect x="30" y="46" width="320" height="34" rx="6" fill="#0F172A" stroke="#1D4ED8" strokeWidth="1" />
      <text x="42" y="66" fill="#FFFFFF" fontSize="10" fontFamily="system-ui" fontWeight="800">Generative AI Architect</text>
      <rect x="230" y="53" width="108" height="20" rx="4" fill="#1D4ED8" fillOpacity="0.3" />
      <text x="284" y="67" fill="#93C5FD" fontSize="8.5" fontFamily="monospace" fontWeight="800" textAnchor="middle">RAG &amp; Agents</text>

      {/* Track 2: Full-Stack Cloud */}
      <rect x="30" y="88" width="320" height="34" rx="6" fill="#0F172A" stroke="#334155" strokeWidth="1" />
      <text x="42" y="108" fill="#E2E8F0" fontSize="10" fontFamily="system-ui" fontWeight="700">Full-Stack Cloud Lead</text>
      <rect x="230" y="95" width="108" height="20" rx="4" fill="#334155" fillOpacity="0.5" />
      <text x="284" y="109" fill="#E2E8F0" fontSize="8.5" fontFamily="monospace" fontWeight="700" textAnchor="middle">Next.js &amp; Microservices</text>

      {/* Track 3: Growth & Performance */}
      <rect x="30" y="130" width="320" height="34" rx="6" fill="#0F172A" stroke="#10B981" strokeWidth="1" />
      <text x="42" y="150" fill="#E2E8F0" fontSize="10" fontFamily="system-ui" fontWeight="700">Data Growth Strategist</text>
      <rect x="230" y="137" width="108" height="20" rx="4" fill="#10B981" fillOpacity="0.2" />
      <text x="284" y="151" fill="#34D399" fontSize="8.5" fontFamily="monospace" fontWeight="800" textAnchor="middle">Analytics &amp; SEO</text>

      {/* Bottom Advice */}
      <rect x="30" y="174" width="320" height="26" rx="6" fill="#0A1224" stroke="#1E293B" strokeWidth="0.8" />
      <circle cx="45" cy="187" r="4" fill="#3B82F6" />
      <text x="56" y="191" fill="#94A3B8" fontSize="8" fontFamily="system-ui">
        Curriculum milestone framework mapped to industry architectural competency requirements.
      </text>
    </svg>
  );
};

/**
 * 13. Auth Portal Security Shield & Privacy Vector
 */
export const AuthSecurityBannerGraphic: React.FC<GraphicProps> = ({
  className = 'w-full h-auto max-w-sm',
}) => {
  return (
    <svg
      viewBox="0 0 340 180"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`select-none ${className}`}
      aria-label="Auth Security Graphic"
    >
      <rect width="340" height="180" rx="16" fill="#050B17" />
      <rect x="1" y="1" width="338" height="178" rx="15" stroke="#1E293B" strokeWidth="1.5" />

      {/* Center Keyhole Shield */}
      <circle cx="170" cy="70" r="38" fill="#0F172A" stroke="#1D4ED8" strokeWidth="2" />
      <path d="M 170 54 C 163 54, 158 59, 158 66 C 158 70, 161 74, 165 76 L 163 88 L 177 88 L 175 76 C 179 74, 182 70, 182 66 C 182 59, 177 54, 170 54 Z" fill="#60A5FA" />

      {/* Orbiting Security nodes */}
      <circle cx="85" cy="70" r="14" fill="#0F172A" stroke="#10B981" strokeWidth="1.5" />
      <text x="85" y="74" fill="#34D399" fontSize="8" fontFamily="monospace" fontWeight="700" textAnchor="middle">JWT</text>
      <line x1="100" y1="70" x2="131" y2="70" stroke="#1E293B" strokeWidth="1.5" strokeDasharray="3 3" />

      <circle cx="255" cy="70" r="14" fill="#0F172A" stroke="#3B82F6" strokeWidth="1.5" />
      <text x="255" y="74" fill="#93C5FD" fontSize="8" fontFamily="monospace" fontWeight="700" textAnchor="middle">MFA</text>
      <line x1="209" y1="70" x2="240" y2="70" stroke="#1E293B" strokeWidth="1.5" strokeDasharray="3 3" />

      {/* Bottom Text */}
      <rect x="25" y="128" width="290" height="32" rx="6" fill="#0A1224" stroke="#1E293B" strokeWidth="0.8" />
      <text x="170" y="145" fill="#E2E8F0" fontSize="8.5" fontFamily="system-ui" fontWeight="700" textAnchor="middle">
        ACADEMIC PRIVACY &amp; ENCRYPTION GUARANTEE
      </text>
      <text x="170" y="154" fill="#64748B" fontSize="7.5" fontFamily="monospace" textAnchor="middle">
        No third-party tracking • Fail-closed entitlement store
      </text>
    </svg>
  );
};

/**
 * 14. Support & Academic Advisory Desk Graphic
 */
export const ContactSupportHubGraphic: React.FC<GraphicProps> = ({
  className = 'w-full h-auto max-w-sm',
}) => {
  return (
    <svg
      viewBox="0 0 340 180"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`select-none ${className}`}
      aria-label="Support Desk Graphic"
    >
      <rect width="340" height="180" rx="16" fill="#000825" />
      <rect x="1" y="1" width="338" height="178" rx="15" stroke="#1E293B" strokeWidth="1.5" />

      {/* Headset / Chat Console */}
      <circle cx="170" cy="65" r="32" fill="#0F172A" stroke="#1D4ED8" strokeWidth="2" />
      <path d="M 152 65 C 152 55, 160 48, 170 48 C 180 48, 188 55, 188 65 L 188 75 C 188 80, 184 84, 180 84 L 175 84" stroke="#60A5FA" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <rect x="146" y="60" width="8" height="16" rx="3" fill="#1D4ED8" />
      <rect x="186" y="60" width="8" height="16" rx="3" fill="#1D4ED8" />

      {/* Response Advisory Tag */}
      <rect x="90" y="112" width="160" height="22" rx="4" fill="#1D4ED8" fillOpacity="0.2" stroke="#1D4ED8" strokeWidth="0.8" />
      <text x="170" y="126" fill="#93C5FD" fontSize="8.5" fontFamily="monospace" fontWeight="700" textAnchor="middle">
        STUDENT &amp; ADVISORY DESK
      </text>

      {/* Bottom text */}
      <text x="170" y="156" fill="#94A3B8" fontSize="8" fontFamily="system-ui" textAnchor="middle">
        Technical Curriculum Support &amp; Enrolment Guidance
      </text>
    </svg>
  );
};

