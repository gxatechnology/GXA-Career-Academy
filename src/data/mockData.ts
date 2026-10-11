import { Author, EBook, Course, AIPrompt, FreeResource, BlogPost, CareerRoadmap } from '../types';

export const GXA_LOGO_URL = 'https://lh3.googleusercontent.com/aida/AEtjO1UmHEU0ENCz_lK7KpQ49XQ6OLIFIs2SlzCcdFumFv3T5gzefAYwb8Ovfn2O2rYqvspyS36oqr5mnoTmW_QpkzAMRVzo5dH8o83thiZCuQRbm_yHHx4_4DR1Ml1yXVyu8rHOQaXLNl8tWCkC6doctj6d2Gk6tURMs_Uof9i9b1ryF-_ztkwKc0YeRqVD1vtY8JkX27kJBJmfSgqOdmgvio_rdjU8o_mmaf2eSyyHLKabsY5DlF6cH6rQ5YU';

export const AUTHORS_DATA: Author[] = [
  {
    id: 'tauqeer-ashraf',
    name: 'Tauqeer Ashraf',
    title: 'Founder & Lead Technical Architect',
    credentials: 'MCA (Master of Computer Applications)',
    experience: '10+ Years Building Digital Ecosystems',
    bio: 'Founder of GXA Career Academy and Head of Engineering at GXA Technology. Author of Digital Marketing Mastery. Over the last decade, he has directed performance media architectures, automated CRM pipelines, and built high-converting sales engines for Indian D2C leaders and high-growth education companies.',
    photoUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDSitWJmS3xJ6G99a29XcwEFY2P3HTuoiELcoZGfOkk0j5rVYby8hJ86_f87OnYaUujeRl6p89DqcOfoymLa9wyLSjn73PFcaP4SpgvqvE0Y_ZxIXw2JnsG65bUIyCmKwRikW63bXgFgEFp4k3FuDGspPlTit4Y44LYaLK1BOv1YoWUvNjzLFlq4o3cb6hOjU5PlT8oORnuc2YZEZt6UXQ8lAgUBieu0z_xDhbFkkphBVbo6s4_kkzY',
    role: 'Founder',
    publishedBooksCount: 3,
  },
  {
    id: 'dr-revant-gautam',
    name: 'Dr. Revant Gautam',
    title: 'Author & Technical Advisory Lead',
    credentials: 'Author & Technical Advisory Lead, GXA Career Academy',
    experience: 'Author of THE WHY Series & Technical Advisor',
    bio: 'Author of THE WHY series and Technical Advisory Lead for GXA Career Academy, advising on technical curriculum design and systems strategy.',
    photoUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBldPm3VjAOvT_MzYZSYQ6IQXJVNcqtAE23PX5F3ID4yMPjrd6PrfwrSQQbOLWsbWLalHrsto2Wu1VHmj-pAVm71c_jAQ_J8oYSXuUXdNCPAp99CSqACAgU2CZzJ9VVB9FLygnhkXiNS1tRc6kTYbd6F-VPM3n5Kk-mBhLqkNVvMWii5n9RI6mm0foomXreeFhN4miDiifJH2ScJgMCH8JP-5vjkhGJBEEUb72Gm8e1WS7mc3lXGqYC',
    role: 'Author & Advisor',
    publishedBooksCount: 2,
  },
];

export const INITIAL_EBOOKS: EBook[] = [
  {
    id: 'digital-marketing-mastery',
    slug: 'digital-marketing-mastery',
    title: 'Digital Marketing Mastery (2026 Edition)',
    subtitle: 'From Organic Acquisition to Paid Scalability & AI-Driven Automation: The Comprehensive Field Guide for Modern Marketers & High-Growth Entrepreneurs.',
    category: 'Digital Marketing',
    categorySlug: 'digital-marketing',
    authorId: 'tauqeer-ashraf',
    authorName: 'Tauqeer Ashraf (MCA)',
    authorCredentials: '10+ Years Growth Architect',
    price: 499,
    originalPrice: 999,
    pages: 445,
    edition: '2026 Revised & Expanded Edition',
    status: 'published',
    rating: 4.94,
    reviewsCount: 1840,
    coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD8fwC1e9z-xhvuOo4ULKyTX-AdHOw_9-2bEdwPPRrGlWNnb09jFUm5fuNNLuNdQEg4tm06t6a7qpHnjRFdLwLaWNo7y6xrN-Dp5rmy3ymkjt7kD2MCZZeByV3ybO_vHdUKz1jeuuXRqdnfyZv5h5XBwJyQStEsKXQvLGYB6aONlU3kofG28V9ho7yf7xi5H5IR-8JbrQOcVOPylZtmnsQAFa-gJjGu34v4nO3Y0aTNzPfIjspL92EZ',
    description: 'Zero filler. High-signal technical workflows, framework diagrams, and tactical roadmaps written directly for execution. Covers programmatic ads, SEO indexing algorithms, funnel economics, and real Indian market case studies.',
    outcomes: [
      'Search Engine Domination & Topical Authority: Build unshakeable semantic SEO topical clusters and dominate programmatic keyword intent.',
      'Performance Media Engineering (Meta & Google): Master Meta Advantage+ shopping campaigns, Google Performance Max bidding matrices, and LinkedIn B2B targeting.',
      'Conversion Rate Optimization (CRO) & Funnel Math: Execute heuristic landing page audits, quantitative A/B testing protocols, and behavioral pricing psychology.',
      'Generative AI & Marketing Autonomous Agents: Integrate LLM-driven prompt chains for automated competitor reconnaissance and dynamic ad-copy permutations.',
      'Retention Engineering & Lifecycle Maximization: Design multi-branch automated Klaviyo & WhatsApp communication triggers for high recurring LTV.'
    ],
    tableOfContents: [
      {
        partNumber: 'Part 01',
        title: 'Foundations of Customer Psychology & Market Research',
        pagesRange: 'Pages 1 – 65',
        chaptersCount: 5,
        chapters: [
          { title: 'The Neurochemistry of Purchase Decisions & Cognitive Biases', page: 1, isPreviewAvailable: true },
          { title: 'Identifying Market Whitespace Through Voice-of-Customer Mining', page: 15 },
          { title: 'Defining Quantitative Ideal Customer Profiles (ICPs) for B2B vs B2C', page: 28 },
          { title: 'The Strategic Moat: Value Propositions That Neutralize Price Resistance', page: 42 },
          { title: 'Competitive Dissection: Reverse-Engineering Rival Ad Spends & Funnels', page: 54 }
        ]
      },
      {
        partNumber: 'Part 02',
        title: 'Search Engine Domination & Organic Content Engines',
        pagesRange: 'Pages 66 – 150',
        chaptersCount: 6,
        chapters: [
          { title: 'Modern Semantic Search & Vector Embeddings in Google SGE', page: 66 },
          { title: 'Programmatic SEO: Scaling to 10,000 High-Intent Landing Pages', page: 82 },
          { title: 'Technical Auditing: Core Web Vitals, Crawl Budgets & JS Rendering', page: 101 },
          { title: 'The 1-to-20 Omnichannel Content Repurposing Matrix', page: 118 },
          { title: 'Digital PR & High-Authority Editorial Backlink Acquisition', page: 136 }
        ]
      },
      {
        partNumber: 'Part 03',
        title: 'Paid Media Engineering: Meta, Google, & LinkedIn Funnels',
        pagesRange: 'Pages 151 – 260',
        chaptersCount: 7,
        chapters: [
          { title: 'The Mathematics of CAC, ROAS & Cashflow Acceleration', page: 151 },
          { title: 'Meta Ads Engine: Creative Testing Sandboxes & Andromeda Scaling', page: 168 },
          { title: 'Google Ads Mastery: High-Intent Search & Performance Max Demystified', page: 194 },
          { title: 'High-Ticket B2B Lead Gen on LinkedIn: Account-Based Targeting SOP', page: 222 },
          { title: 'Cross-Platform Conversion API (CAPI) & Server-Side Tagging', page: 246 }
        ]
      },
      {
        partNumber: 'Part 04',
        title: 'Retention, Email Automation & Lifetime Value Optimization',
        pagesRange: 'Pages 261 – 340',
        chaptersCount: 5,
        chapters: [
          { title: 'Building the 7 Core Automated Email Sequences in Klaviyo/Mailchimp', page: 261 },
          { title: 'WhatsApp Commerce & Conversational Re-Engagement in India', page: 285 },
          { title: 'Cohort Retention Curves & Predicting Churn Triggers', page: 304 },
          { title: 'Subscription & Recurring Revenue Retention Playbooks', page: 322 }
        ]
      },
      {
        partNumber: 'Part 05',
        title: 'Generative AI for High-Velocity Marketing',
        pagesRange: 'Pages 341 – 410',
        chaptersCount: 5,
        chapters: [
          { title: 'Engineering Custom GPTs for Brand Voice & Persona Synthesis', page: 341 },
          { title: 'Autonomous Creative Pipeline: Midjourney & Sora for Ad Creatives', page: 360 },
          { title: 'AI-Driven CRO: Dynamic Heatmaps and Algorithmic Copy Variations', page: 382 },
          { title: 'Ethics, Hallucination Prevention & Regulatory Compliance', page: 398 }
        ]
      },
      {
        partNumber: 'Part 06',
        title: 'Agency Playbooks & Client Acquisition SOPs',
        pagesRange: 'Pages 411 – 445',
        chaptersCount: 4,
        chapters: [
          { title: 'Pitching & Closing ₹2L - ₹10L/Month Digital Retainers', page: 411 },
          { title: 'The 90-Day High-Performance Agency Operating System (AOS)', page: 424 },
          { title: 'Master Service Agreement (MSA) & Statement of Work (SOW) Templates', page: 436 }
        ]
      }
    ],
    specifications: {
      isbn: 'Pending Official Allocation (Pre-Press Verification)',
      publisher: 'GXA Technology Publishing, New Delhi',
      edition: '2026 Revised & Expanded Edition',
      formats: 'Printable PDF (28 MB) + ePub (8 MB) + Notion SOP Pack',
      language: 'English (INR ₹ Case Studies & Global Examples)',
      rights: 'DRM-Free • Compatible with Kindle, iOS, Android, PC'
    },
    bonusItems: [
      { title: 'AI Prompt Pack for Marketers', value: 599, description: '150+ battle-tested system prompts for ChatGPT & Claude to write high-converting Meta copy.' },
      { title: 'CAC/LTV Financial Forecasting Model', value: 499, description: 'Plug-and-play Google Sheets model to calculate payback windows and break-even ad expenditures.' },
      { title: 'Agency Contract & SOW Templates', value: 402, description: 'Attorney-drafted retainer agreements, NDAs, and scope-creep guardrails adapted for digital services.' }
    ],
    previewSamplePages: 35,
    previewExcerpts: {
      chapter: 'Chapter 1.2',
      heading: 'Foundations of Customer Psychology & Behavioral Anchoring',
      content: [
        'Modern performance marketing does not fail at the bidding algorithm; it fails in the pre-attentive subconscious. When an Indian consumer evaluates high-ticket SaaS subscriptions or aspirational consumer durables, their initial frame of reference is determined not by raw utility, but by anchored pricing benchmarks established within the first 1.8 seconds of ad exposure.',
        'Conversion is never an act of persuasion. It is the tactical elimination of prospective buyer regret before purchase intent decays.',
        'By deconstructing consumer heuristics, we distinguish between System 1 (Impulsive/Heuristic) response models commonly seen in quick-commerce flash sales, and System 2 (Reflective/Evaluative) friction pathways typical in B2B procurement across tier-1 technology hubs.'
      ],
      calloutTitle: 'Cognitive Heuristic Triad',
      calloutBody: 'Loss Aversion Multiplier: Pain of lost savings is weighted 2.1x higher than equivalent discount bonuses in urban metros. The Default Effect: Pre-selected annual billing plans retain 38% higher baseline adoption when framed against monthly equivalents.'
    },
    downloadFileName: 'GXA-Digital-Marketing-Mastery-2026.pdf'
  },
  {
    id: 'the-why-career-guidance',
    slug: 'the-why-career-guidance',
    title: 'THE WHY — Career Guidance',
    subtitle: 'The Definitive Strategic Roadmap for Tech Professionals Navigating High-Income Career Inflection Points.',
    category: 'Career Development',
    categorySlug: 'career-development',
    authorId: 'dr-revant-gautam',
    authorName: 'Dr. Revant Gautam',
    authorCredentials: 'Author & Technical / IT Expert',
    price: 299,
    originalPrice: 599,
    pages: 218,
    edition: '2026 Edition',
    status: 'published',
    rating: 4.88,
    reviewsCount: 1140,
    coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAqI4HTqDzNGy9wh3etPajoM0BTAFT2eBpYsIh3V-y9LOJKiJHsWzYvj6FHTWv5WLgE9vCBhKqThrGx7YxUlMmCtHOTsxzIu_gT4PeOfYlI2v7bz7ePegjD0PBZo62dTZoMK4Z9pL1o1-NZWVN0KE-x1qWeU3ZMvvW9plyp8vNi40Zcb3-BLErCAQA-Vss8QHrvXY44zXStZmmCl61QTksjD4V1gwsm7VoumEazs9T3UXHV4AZrM8mH',
    description: 'A scientific, purpose-driven matrix navigating high-paying engineering, product, and tech transition paradigms. Built around real salary telemetry across Bangalore, Hyderabad, and Pune.',
    outcomes: [
      'Self-Audit Framework: Discover your technical archetype and high-leverage skill multipliers.',
      'Compensation Engineering: Real salary benchmarks, equity structures, and negotiation strategies.',
      'Executive Presence: Transforming from individual contributor to engineering leadership.',
      'Transition Playbook: Moving into AI/ML and Product Management with zero fluff.'
    ],
    tableOfContents: [
      {
        partNumber: 'Part 01',
        title: 'Diagnosing Career Inertia',
        pagesRange: 'Pages 1 – 50',
        chaptersCount: 3,
        chapters: [
          { title: 'The Illusion of the Linear Ladder', page: 1, isPreviewAvailable: true },
          { title: 'Skill Inflation vs Moat Construction', page: 18 },
          { title: 'Identifying Your Core Leverage Points', page: 34 }
        ]
      },
      {
        partNumber: 'Part 02',
        title: 'The High-Income Engineering Matrix',
        pagesRange: 'Pages 51 – 130',
        chaptersCount: 4,
        chapters: [
          { title: 'Decoding Tech Compensation in India & Remote Roles', page: 51 },
          { title: 'The Staff Engineer & Principal Architect Pathway', page: 75 },
          { title: 'Navigating Layoffs & Market Contraction Safely', page: 102 }
        ]
      },
      {
        partNumber: 'Part 03',
        title: 'Actionable Career Acceleration Playbook',
        pagesRange: 'Pages 131 – 218',
        chaptersCount: 4,
        chapters: [
          { title: 'The 90-Day Transition Sprint', page: 131 },
          { title: 'Resume & Portfolio Dissection: What Hiring Bar Raisers Want', page: 160 },
          { title: 'Negotiating ₹25L to ₹60L+ Packages Confidently', page: 190 }
        ]
      }
    ],
    specifications: {
      isbn: 'Pending Official Allocation (Pre-Press Verification)',
      publisher: 'GXA Technology Publishing, New Delhi',
      edition: '2026 Edition',
      formats: 'Printable PDF (18 MB) + ePub (6 MB)',
      language: 'English',
      rights: 'DRM-Free • Multi-device compatibility'
    },
    bonusItems: [
      { title: 'Self-Assessment Career Scorecard (Notion)', value: 299, description: 'Interactive worksheet calculating your leverage ratio across modern technical domains.' },
      { title: 'Executive Resume & Cover Templates', value: 199, description: 'ATS-optimized templates verified by senior hiring managers across Bangalore tech hubs.' }
    ],
    previewSamplePages: 25,
    previewExcerpts: {
      chapter: 'Chapter 1',
      heading: 'The Illusion of the Linear Ladder',
      content: [
        'The single most dangerous misconception among software engineers in their 20s and 30s is the belief that incremental competence guarantees proportional compensation. It does not. The economic value of software talent follows an extreme power-law distribution.',
        'Understanding THE WHY behind corporate allocation decisions is what separates developers stuck in mid-level bands from strategic technical leads commanding executive compensation.'
      ]
    },
    downloadFileName: 'GXA-THE-WHY-Career-Guidance.pdf'
  },
  {
    id: 'prompt-engineering-playbook',
    slug: 'prompt-engineering-playbook',
    title: 'Prompt Engineering & Generative AI',
    subtitle: 'Context Windows, Multi-Shot Frameworks, System Message Formatting, and Production LLM Orchestration Playbooks.',
    category: 'Artificial Intelligence',
    categorySlug: 'artificial-intelligence',
    authorId: 'tauqeer-ashraf',
    authorName: 'GXA AI Research Lab & Tauqeer Ashraf',
    authorCredentials: 'Applied Intelligence Engineering',
    price: 199,
    originalPrice: 399,
    pages: 165,
    edition: '2026 High-Impact Edition',
    status: 'published',
    rating: 5.0,
    reviewsCount: 420,
    coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCfzGffC4uOL7qKVE-e6i0KGc46UJIslbGx93tFflH-JfDyDfemOlyqAF5DJlVj8OvZf2YCA5_fMRX7MbaoaJNuALinWLRlyAm53Sol9g6DMjzrM3LkGRHpsK1-tcaw0euLpiVYrcJ3e2iI7hWIRfLycyWuLWi5MgvmkxvSyVBZPppUe9KbnePeNzzN1-nYCdSMkXJoFNGdWa0Ru60176pXcYBpr3Wgc-eN3PLkDjwkn-MRXp3_GToS',
    description: '120+ verified copy-paste prompts, few-shot schemas, strict JSON schema output generators, and ReAct agent planning recipes for GPT-4o, Claude 3.5 Sonnet, and Gemini 1.5 Pro.',
    outcomes: [
      'Chain-of-Thought (CoT) and Self-Consistency: Eliminate model hallucinations in complex logic.',
      'Strict JSON Schema Enforcement: Guarantees 100% parseable structured responses.',
      'System Role Conditioning: Elicit staff-level software architecture and legal/financial audits.',
      'RAG Context Ingestion: Prompt templates for hybrid retrieval and citation grounding.'
    ],
    tableOfContents: [
      {
        partNumber: 'Part 01',
        title: 'Anatomy of Modern Prompts',
        pagesRange: 'Pages 1 – 45',
        chaptersCount: 3,
        chapters: [
          { title: 'Context Window Optimization & Attention Sinks', page: 1, isPreviewAvailable: true },
          { title: 'Zero-Shot vs Few-Shot: Empirical Benchmark Comparisons', page: 18 },
          { title: 'System Prompt Hardening against Jailbreaks', page: 32 }
        ]
      },
      {
        partNumber: 'Part 02',
        title: 'Structured Output & Function Calling',
        pagesRange: 'Pages 46 – 110',
        chaptersCount: 4,
        chapters: [
          { title: 'JSON Schema Steering & Pydantic Validation', page: 46 },
          { title: 'DSPy & Programmatic Prompt Optimization', page: 72 },
          { title: 'ReAct Loops and Multi-Tool Agentic Choreography', page: 94 }
        ]
      },
      {
        partNumber: 'Part 03',
        title: '120+ Battle-Tested Production Templates',
        pagesRange: 'Pages 111 – 165',
        chaptersCount: 3,
        chapters: [
          { title: 'Code Review & Security Audit Prompts', page: 111 },
          { title: 'Marketing Copy & SEO Strategy Prompts', page: 130 },
          { title: 'Data Analysis & SQL Generation Prompts', page: 148 }
        ]
      }
    ],
    specifications: {
      isbn: '978-93-89241-94-6',
      publisher: 'GXA Technology Publishing, New Delhi',
      edition: '2026 High-Impact Edition',
      formats: 'Printable PDF (14 MB) + JSON Template Bundle',
      language: 'English',
      rights: 'DRM-Free Personal License'
    },
    bonusItems: [
      { title: '120+ Ready-to-Paste Prompts JSON File', value: 299, description: 'Direct import for Cursor, VS Code, and LangChain prompt libraries.' }
    ],
    previewSamplePages: 20,
    previewExcerpts: {
      chapter: 'Chapter 1',
      heading: 'Context Window Optimization & Attention Sinks',
      content: [
        'Modern language models boast millions of tokens in nominal context windows, yet in real benchmarks, reasoning degrades when critical constraints are placed arbitrarily in the middle of long documents.',
        'This playbook establishes the architectural rules of priming: system role positioning, delimiter isolation, and few-shot calibration that keep LLM outputs deterministic.'
      ]
    },
    downloadFileName: 'GXA-Prompt-Engineering-Playbook.pdf'
  }
];

export const INITIAL_COURSES: Course[] = [
  {
    id: 'fullstack-modern-ai-apps',
    slug: 'fullstack-modern-ai-apps',
    title: 'Full-Stack Modern AI Applications: Build & Deploy Production RAG, LangChain, FastAPI & Next.js Systems',
    category: 'AI & Full-Stack Systems',
    categorySlug: 'ai-fullstack',
    instructorName: 'Tauqeer Ashraf (MCA)',
    instructorTitle: 'Lead AI Architect & Head of Engineering, GXA Labs',
    instructorPhoto: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCRXEUqI-YHvxYMt045VpdkJdY2rZChoVTIu5Mfi--qKD3WyaacTTCkeslgKPy9WDBOj7UhSPHZNKLWc2xDFoXY-4zMLAZaUhFQutjpgkWGonU-twHGiStI1XlIDjdzmNIRyKTCCwVS7iFF-_rHH50iXjH_i_FBgTw_v_Q0CRr4DIqGSA0AQ9CYtO5oGQW887dowd14lPDhmTujWffPbvPwakFp7TzRy2aZvXGiA-O2HeyBd2VMx4IA',
    price: 3499,
    originalPrice: 8999,
    durationWeeks: 8,
    liveHours: 32,
    level: 'Intermediate',
    format: 'Live Cohort',
    rating: 4.92,
    enrolledCount: 428,
    batchCap: 30,
    seatsLeft: 7,
    nextBatchDate: 'June 14, 2025',
    thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCEM56DFO0hI2eJGr-uFJgJf_BBBTfO4wom3Pgk5PiLm5w7SijE9FWzmef-V8N3gLAymrRm_U6wAk-gvY0AZRb1fBdDyRS5WnEq_naCmuDCE2pgbY2epeHnidf3xf7USWvRbfxGMBIjFIfHTSn_yrVCiwywIVM9DEs3MoRYLMiNF23XX88uqfyJgydNs5EnZiHGATIlLqAiC6DUYKeXPXFmgN5AP-m7yac_YO0-rp1T0CilS1zmc5xp',
    description: 'Master the architectural transition from experimental AI prototypes to rock-solid, production-grade microservices. Engineer resilient multi-agent workflows, implement sub-100ms vector search indexes, and deliver low-latency web interfaces trusted by enterprises.',
    status: 'published',
    language: 'English (with Live Bilingual Q&A)',
    prerequisites: ['Proficiency with Python 3 syntax & async functions', 'Basic REST API and HTTP client comprehension', 'Command line and Git workflow experience'],
    targetAudience: ['Full-stack developers transitioning to production AI/LLM engineering', 'Backend architects designing low-latency RAG and agent services', 'Technical founders seeking enterprise-grade AI architecture templates'],
    skillsCovered: ['FastAPI Async', 'Pydantic v2', 'pgvector & HNSW', 'Pinecone', 'LangGraph', 'RAGAS Benchmarking', 'vLLM & Docker', 'Multi-Provider Failover'],
    resourcesCount: 18,
    hasAssessment: true,
    certificateEligible: true,
    capstones: [
      {
        title: 'Enterprise Hybrid RAG Engine',
        badge: 'Capstone 01',
        description: 'Sub-millisecond semantic document retriever leveraging Pinecone, Cohere Rerank v3, and cross-encoder scoring with conversational memory buffers.',
        tags: ['Pinecone', 'FastAPI', 'Cohere Rerank'],
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCAsCvhWzaZLt51f-2xkHyqsXGk8qDMBq37YFZ8MTPbImYNnW4ySsbVN_Nn38Ld9xC-iYYtKAK3N1B6VhvwICHSrbHv3ZBSS9oRlvXp3bmccDtchV-sBBmLuMY714XhoP5LrC0L4pl8MNl6RmkQSJI1NGhrhSUgMeNKSYZEF5SpDJ8A2Ca8EHRxb8UIvtcqi2Md8jXIPmN_m1JCj2mhBUUQxWzsoCdjLlRC55a90ivTKsHGSpQd2l3-'
      },
      {
        title: 'Autonomous LangGraph Customer Agent',
        badge: 'Capstone 02',
        description: 'Multi-agent cyclic graph system with human-in-the-loop fallback checkpoints, database CRUD tool executions, and stateful trace persistence.',
        tags: ['LangGraph', 'PostgreSQL', 'LangSmith'],
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB6URedPygGj2lWaVDLF4BFRitZ_5dCMyj4G-hTw3zmMsEB2u2nOT01YbqSKr9EZbx03e0yUzfNrD1nHAEtiHIy4CQRpTKgKtATWmf18q8GC9QJO9enBlMqBufGvwkq9pwV1VFXuZrCnlqAmpuOqP6z9i5b23znaFYSaHFoC5AdXzWdA5E_C-xdZcv2osIWYi0nACqgl1MC-Rr-qAdL0-bTfoZfzl7L072P88FcOQm0paIzyUVstA9P'
      },
      {
        title: 'Multi-Modal Vision & Doc Parser',
        badge: 'Capstone 03',
        description: 'Zero-shot structural extraction pipeline transforming scanned financial reports and messy balance sheets into strictly typed Pydantic models.',
        tags: ['GPT-4o Vision', 'Pydantic v2', 'Next.js 15'],
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBSSb7kt6mhAqab0BJg32ePaWr7JxebLTzvJzuqUaPzj1xuYwxPJuM45TBZN45Qo33YHG68yQ3jqEEZS0GRy4IDzJRu-GrbUj6KUpKWfJINq3tsTQAeVGH4r6Aq0dBo4OLItORRbnQtP_tWhyrjaSzm8_5AQUXqNppjAuM6G0273U6cypykO8L1lnFVV04EpWxaIMwWwdomXRIM7JBTG8XvV51nMx3J0emUNhU3D0tSsmCKu9M-AguE'
      },
      {
        title: 'Local LLM vLLM Inference Server',
        badge: 'Capstone 04',
        description: 'Containerized deployment of quantized Mistral & Llama-3 checkpoints on Docker with PagedAttention and OpenAI-compatible proxy streaming.',
        tags: ['vLLM', 'Docker', 'Ollama'],
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAGiIlBuFTT7A4TGg0H_ln8dWq8_YJQn4TM0dnIq_tF7lE5LtRljhuL08dIbGfu1VeWWT91Ygb6WQx2cYot-TzU0K0nzaHiyt49Sjv2tuWcBk6xPyCGcRbO2Vg-DcIfHMjW2cTUyQ5o3lKRI7zpAPcluql3uoZoUYIqdwlnlLJTjaMV8M9C4AVZLQ6yGTnOyutU-R4dyTkXkkpsBvZHZPci3fw4AMBewFogEcIac65bX9DdQEw0jOpQ'
      }
    ],
    modules: [
      {
        week: 1,
        title: 'Modern AI Foundations & High-Throughput APIs',
        topics: [
          'Next-Token Prediction intuition and tokenomics',
          'Production FastAPI: Pydantic v2 schemas, streaming Server-Sent Events (SSE)',
          'Managing API costs and building reliable fallback switches across Anthropic & OpenAI'
        ],
        labTitle: 'Build an async resilient streaming API proxy server handling 500 req/sec',
        duration: '4h Live + Code Along',
        lessons: [
          {
            id: 'w1-l1',
            title: 'Tokenomics, Latency Profiles & Context Window Geometry',
            duration: '55m',
            type: 'video',
            isPreview: true,
            content: 'In this core foundational lecture, we dissect how byte-pair encoding (BPE) handles multilingual inputs, how context window boundaries behave under stress, and why prompt positioning directly influences cache hit rates on modern LLM inference endpoints.',
            codeSnippet: `# Token Calculation Example using tiktoken
import tiktoken

enc = tiktoken.get_encoding("cl100k_base")
prompt = "Analyze the provided PostgreSQL schema for unindexed foreign keys."
tokens = enc.encode(prompt)
print(f"Token count: {len(tokens)} | Estimated Input Cost: \${len(tokens) * 0.0000025:.6f}")`
          },
          {
            id: 'w1-l2',
            title: 'FastAPI Async Pipeline Architecture & Streaming SSE',
            duration: '65m',
            type: 'code',
            isPreview: true,
            content: 'Build a production-grade FastAPI microservice that streams chunks from upstream LLMs to clients using Server-Sent Events (SSE) with keep-alive heartbeats and graceful timeout handling.',
            codeSnippet: `from fastapi import FastAPI
from fastapi.responses import StreamingResponse
import asyncio

app = FastAPI()

async def event_generator():
    chunks = ["Architecting ", "resilient ", "AI ", "systems ", "with ", "FastAPI."]
    for chunk in chunks:
        yield f"data: {chunk}\\n\\n"
        await asyncio.sleep(0.08)

@app.get("/stream-chat")
async def stream():
    return StreamingResponse(event_generator(), media_type="text/event-stream")`
          },
          {
            id: 'w1-l3',
            title: 'Module 1 Knowledge Assessment & Mastery Check',
            duration: '20m',
            type: 'quiz',
            quizQuestions: [
              {
                id: 'q1-1',
                question: 'Which index structure in pgvector provides fast approximate nearest neighbor lookups using hierarchical graphs?',
                options: ['IVFFlat', 'HNSW (Hierarchical Navigable Small World)', 'B-Tree', 'GIN'],
                correctIndex: 1,
                explanation: 'HNSW builds multi-layer graphs that provide sub-10ms query times at the cost of higher build time and memory usage.'
              },
              {
                id: 'q1-2',
                question: 'When implementing streaming responses with FastAPI, what media type should be specified for SSE?',
                options: ['application/json', 'text/event-stream', 'multipart/form-data', 'application/octet-stream'],
                correctIndex: 1,
                explanation: 'Server-Sent Events strictly mandate the text/event-stream MIME type to stream data over a single HTTP connection.'
              }
            ]
          }
        ]
      },
      {
        week: 2,
        title: 'Advanced Embeddings, Vector Spaces & pgvector',
        topics: [
          'Dense Embeddings vs Sparse Vectors (BM25 / SPLADE)',
          'Semantic chunking heuristics and parent-document referencing',
          'Configuring PostgreSQL with pgvector: HNSW vs IVFFlat indexes'
        ],
        labTitle: 'Index 100,000 PDF documents in pgvector and query via sub-50ms hybrid filters',
        duration: '4h Live + Code Along',
        lessons: [
          {
            id: 'w2-l1',
            title: 'Embedding Dimensionality & Cosine Similarity Mathematics',
            duration: '60m',
            type: 'video',
            content: 'Deep dive into high-dimensional geometric spaces, comparing cosine similarity, dot product, and Euclidean L2 distance for text retrieval.'
          },
          {
            id: 'w2-l2',
            title: 'PostgreSQL pgvector Setup & Index Tuning',
            duration: '75m',
            type: 'code',
            content: 'Implement hybrid search combining full-text search tsvector with dense vector embeddings in a single PostgreSQL query.',
            codeSnippet: `-- Combined Hybrid Search Query
SELECT id, title,
  (0.7 * (1 - (embedding <=> $1)) + 0.3 * ts_rank_cd(text_search_vector, plainto_tsquery('english', $2))) AS hybrid_score
FROM documents
ORDER BY hybrid_score DESC
LIMIT 10;`
          },
          {
            id: 'w2-l3',
            title: 'Module 2 Retrieval Architecture Assessment',
            duration: '20m',
            type: 'quiz',
            quizQuestions: [
              {
                id: 'q2-1',
                question: 'What is the primary benefit of Hybrid Search over pure vector search in technical documentation?',
                options: ['Lower memory usage', 'Accurate matching of exact keywords, error codes, and SKU numbers while preserving semantic context', 'Faster indexing speed', 'No need for an embedding model'],
                correctIndex: 1,
                explanation: 'Vector models often struggle with exact alphanumeric tokens like error codes (e.g. ERR-502-V2); combining dense vectors with sparse keyword matching solves this.'
              }
            ]
          }
        ]
      },
      {
        week: 3,
        title: 'Production RAG Architectures & Re-ranking',
        topics: [
          'Overcoming hallucination and the Lost in the Middle phenomenon',
          'Multi-Query Expander, HyDE, and Cohere Rerank v3',
          'Managing conversation state with Redis memory clusters'
        ],
        labTitle: 'Complete Capstone 1 with end-to-end evaluation via RAGAS metrics',
        duration: '4h Live + Code Along',
        lessons: [
          {
            id: 'w3-l1',
            title: 'Advanced RAG Patterns: HyDE & Cross-Encoders',
            duration: '60m',
            type: 'video',
            content: 'Explore Hypothetical Document Embeddings (HyDE) and cross-encoder re-ranking algorithms that dramatically boost Top-3 recall.'
          },
          {
            id: 'w3-l2',
            title: 'RAGAS Benchmarking & Synthetic Test Generation',
            duration: '70m',
            type: 'reading',
            content: 'Benchmark production retrieval pipelines using quantitative metrics: Faithfulness, Answer Relevance, Context Precision, and Context Recall.'
          }
        ]
      },
      {
        week: 4,
        title: 'Autonomous Agents with LangGraph & Tool Calling',
        topics: [
          'Designing cyclic decision engines with conditional router edges',
          'Structuring deterministic tool calling with dynamic schema validation',
          'Human-in-the-loop escalation gates for sensitive actions'
        ],
        labTitle: 'Construct a live support dispatch agent querying SQL databases safely',
        duration: '4h Live + Code Along',
        lessons: [
          {
            id: 'w4-l1',
            title: 'LangGraph Statecharts & Checkpointing',
            duration: '75m',
            type: 'code',
            content: 'Build cyclical multi-step reasoning agents that pause execution for human verification before issuing sensitive mutations.',
            codeSnippet: `from langgraph.graph import StateGraph, END
from typing import TypedDict, Annotated

class AgentState(TypedDict):
    input: str
    plan: list[str]
    current_step: int
    result: str

workflow = StateGraph(AgentState)
# Define cyclical graph nodes and conditional router edges here`
          },
          {
            id: 'w4-l2',
            title: 'Final Capstone Project Evaluation & Certification Exam',
            duration: '45m',
            type: 'quiz',
            quizQuestions: [
              {
                id: 'q4-1',
                question: 'Why are cyclic state graphs (LangGraph) preferred over simple DAG chains for production agents?',
                options: ['They use less CPU memory', 'They enable feedback loops, error retries, and dynamic replanning based on intermediate tool outputs', 'They bypass token context limits', 'They do not require API keys'],
                correctIndex: 1,
                explanation: 'Production agent workflows require self-correction loops when a tool returns an error or incomplete payload.'
              },
              {
                id: 'q4-2',
                question: 'Which mechanism prevents unauthorized state mutations in enterprise LLM tool pipelines?',
                options: ['Increasing temperature', 'Pydantic strict schema validation and Human-in-the-loop execution gates', 'Using longer prompts', 'Disabling logging'],
                correctIndex: 1,
                explanation: 'Strict validation schemas and explicit human approval steps guard against unintended destructive commands.'
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'digital-growth-marketing-bootcamp',
    slug: 'digital-growth-marketing-bootcamp',
    title: 'Digital Growth Marketing Bootcamp',
    category: 'Performance & Scale',
    categorySlug: 'growth-marketing',
    instructorName: 'Tauqeer Ashraf (MCA)',
    instructorTitle: 'Founder, GXA Career Academy | Ex-Growth Lead',
    instructorPhoto: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDSitWJmS3xJ6G99a29XcwEFY2P3HTuoiELcoZGfOkk0j5rVYby8hJ86_f87OnYaUujeRl6p89DqcOfoymLa9wyLSjn73PFcaP4SpgvqvE0Y_ZxIXw2JnsG65bUIyCmKwRikW63bXgFgEFp4k3FuDGspPlTit4Y44LYaLK1BOv1YoWUvNjzLFlq4o3cb6hOjU5PlT8oORnuc2YZEZt6UXQ8lAgUBieu0z_xDhbFkkphBVbo6s4_kkzY',
    price: 2499,
    originalPrice: 5999,
    durationWeeks: 6,
    liveHours: 24,
    level: 'All Levels',
    format: 'Live Cohort',
    rating: 4.96,
    enrolledCount: 1120,
    batchCap: 40,
    seatsLeft: 12,
    nextBatchDate: 'July 02, 2025',
    thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCpCLd9ex8A4obsGgIJQZYh-ZEAUFsTSSS4xA2cmdydDY5I56Pi_kCtsuh_16zPlu-VIhnL3QHMeMKgxOaNNW-DQr8T72J58I5NBHSSzSZ7TwhooukAUixTD9gXKyV2zUVFjTjMqMZu2uxHS2QJinkFPvuBal-u1ytvBMSmZAx4YiTod4L4tC03EIS-LYKj56KKSqsIq0mXVXLfxE8p3i7ajDCCWNhjU-9gtPUrQ_099aGY0_oLqpHW',
    description: 'Master programmatic Google Ads, programmatic SEO, funnel attribution with Meta Pixel CAPI, and generative content automation at scale.',
    status: 'published',
    language: 'English & Hindi Live Guidance',
    prerequisites: ['Basic marketing familiarity or running a small business/startup', 'Comfort with basic spreadsheet calculations'],
    targetAudience: ['Performance marketers scaling Meta and Google ad budgets profitably', 'Startup founders needing predictable customer acquisition systems', 'Freelancers and agency operators transitioning to high-ticket retainers'],
    skillsCovered: ['Meta Advantage+ CAPI', 'Google Ads PMax', 'Programmatic SEO', 'CAC/LTV Financial Models', 'WhatsApp Business Flows'],
    resourcesCount: 14,
    hasAssessment: true,
    certificateEligible: true,
    capstones: [
      {
        title: 'Full-Funnel Unit Economics & Attribution Model',
        badge: 'Capstone 01',
        description: 'Comprehensive financial forecasting spreadsheet calculating blended CAC, payback cycles, and ROAS across paid and organic channels.',
        tags: ['Attribution', 'Excel/Sheets', 'CAC Math'],
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCAsCvhWzaZLt51f-2xkHyqsXGk8qDMBq37YFZ8MTPbImYNnW4ySsbVN_Nn38Ld9xC-iYYtKAK3N1B6VhvwICHSrbHv3ZBSS9oRlvXp3bmccDtchV-sBBmLuMY714XhoP5LrC0L4pl8MNl6RmkQSJI1NGhrhSUgMeNKSYZEF5SpDJ8A2Ca8EHRxb8UIvtcqi2Md8jXIPmN_m1JCj2mhBUUQxWzsoCdjLlRC55a90ivTKsHGSpQd2l3-'
      }
    ],
    modules: [
      {
        week: 1,
        title: 'Funnel Architecture & Economic Modeling',
        topics: ['CAC/LTV Math', 'Payback Periods', 'Attribution Modeling'],
        labTitle: 'Build a dynamic CAC forecasting spreadsheet',
        duration: '4h Live',
        lessons: [
          {
            id: 'gm-w1-l1',
            title: 'Foundations of Unit Economics & Cashflow Acceleration',
            duration: '60m',
            type: 'video',
            isPreview: true,
            content: 'Learn why customer acquisition models collapse without disciplined payback window constraints and how to model blended vs paid CAC accurately.'
          },
          {
            id: 'gm-w1-l2',
            title: 'Modeling Ad Spend Scalability & Diminishing Marginal Returns',
            duration: '60m',
            type: 'reading',
            content: 'A deep architectural dive into audience saturation curves, creative fatigue metrics, and pacing budgets across Meta and Google bidding engines.'
          },
          {
            id: 'gm-w1-l3',
            title: 'Unit Economics Knowledge Check',
            duration: '15m',
            type: 'quiz',
            quizQuestions: [
              {
                id: 'gmq-1',
                question: 'If a SaaS product has a CAC of ₹6,000 and an ARPU of ₹1,000/month with 5% monthly churn, what is the LTV:CAC ratio?',
                options: ['1.5x', '3.33x', '5.0x', '0.8x'],
                correctIndex: 1,
                explanation: 'LTV = ARPU / Churn Rate = ₹1,000 / 0.05 = ₹20,000. LTV:CAC = ₹20,000 / ₹6,000 = 3.33x, which represents a healthy unit economics threshold.'
              }
            ]
          }
        ]
      },
      {
        week: 2,
        title: 'Meta Advantage+ Engineering & Conversion API (CAPI)',
        topics: ['Server-Side Tagging', 'Stripe & Razorpay Webhook Attribution', 'Creative Sandboxes'],
        labTitle: 'Deploy a Cloudflare Worker for Meta Conversion API deduplication',
        duration: '4h Live',
        lessons: [
          { id: 'gm-w2-l1', title: 'Server-Side Tagging vs Browser Pixels in post-iOS14', duration: '60m', type: 'video' },
          { id: 'gm-w2-l2', title: 'Hands-on CAPI Webhook Forwarding Setup', duration: '75m', type: 'code' }
        ]
      },
      {
        week: 3,
        title: 'Programmatic SEO & Scalable Content Engines',
        topics: ['Database-Driven Landing Pages', 'Next.js Dynamic Routing', 'Search Console Indexing'],
        labTitle: 'Generate 1,000 high-intent landing pages with dynamic metadata',
        duration: '4h Live',
        lessons: [
          { id: 'gm-w3-l1', title: 'Information Gain & Entity Architecture for Search', duration: '60m', type: 'video' },
          { id: 'gm-w3-l2', title: 'Programmatic Site Structure in Next.js', duration: '60m', type: 'code' }
        ]
      },
      {
        week: 4,
        title: 'WhatsApp Commerce & Automated Retention Loops',
        topics: ['WhatsApp Cloud API', 'Automated Cart Recovery', 'Cohort Retention'],
        labTitle: 'Build a multi-step conversational checkout recovery flow',
        duration: '4h Live',
        lessons: [
          { id: 'gm-w4-l1', title: 'WhatsApp Business API Integration & Template Approvals', duration: '60m', type: 'video' },
          { id: 'gm-w4-l2', title: 'Final Growth Certification Assessment', duration: '30m', type: 'quiz', quizQuestions: [
            {
              id: 'gmq-2',
              question: 'Why is Conversions API (CAPI) deduplication essential when both browser pixels and server events fire?',
              options: ['To avoid paying twice for ads', 'To prevent Meta from counting the same conversion twice while filling in ad-blocker gaps', 'To speed up page loading', 'To enable dark mode'],
              correctIndex: 1,
              explanation: 'Deduplication using a shared event_id ensures that Meta merges browser and server events into a single verified conversion.'
            }
          ]}
        ]
      }
    ]
  },
  {
    id: 'prompt-engineering-enterprise',
    slug: 'prompt-engineering-enterprise',
    title: 'Prompt Engineering for Enterprise LLM Pipelines',
    category: 'Generative AI Mastery',
    categorySlug: 'prompt-engineering',
    instructorName: 'GXA AI Faculty',
    instructorTitle: 'Master Toolkit Instructors (Lead: Tauqeer Ashraf)',
    instructorPhoto: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBldPm3VjAOvT_MzYZSYQ6IQXJVNcqtAE23PX5F3ID4yMPjrd6PrfwrSQQbOLWsbWLalHrsto2Wu1VHmj-pAVm71c_jAQ_J8oYSXuUXdNCPAp99CSqACAgU2CZzJ9VVB9FLygnhkXiNS1tRc6kTYbd6F-VPM3n5Kk-mBhLqkNVvMWii5n9RI6mm0foomXreeFhN4miDiifJH2ScJgMCH8JP-5vjkhGJBEEUb72Gm8e1WS7mc3lXGqYC',
    price: 1499,
    originalPrice: 3999,
    durationWeeks: 4,
    liveHours: 16,
    level: 'Beginner to Intermediate',
    format: 'Self-Paced Masterclass',
    rating: 4.94,
    enrolledCount: 2840,
    thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD1KdMRGwjDF-HZPLZUP1VlfsVEpOS0jKPH4c_V0t75JJ0LLXacC5ORT0xeRYzUvpvI0kN1YlA0gIqp-fWkTcGgU_8IRzpWVKptd9xD3-Mw3HTQpAYLQaqwLRAcDxHM6xOvjs_KuvFrre5bU0lUcra6ErzlBpFMDSloNXb77wfzlQhXrgaPsTmnImXV6dat73-jFgTyUUy6ne3nPxbOH9b8-z1OFBvs4PTaFPUHhQ3GTGJ0bHmJ2HLm',
    description: 'Deterministic outputs, Chain-of-Thought chaining, DSPy optimization, system guardrails, and evaluating hallucination metrics in production.',
    status: 'published',
    language: 'English',
    prerequisites: ['No specialized coding prerequisites; basic familiarity with generative AI chat interfaces'],
    targetAudience: ['Software engineers and technical leads needing deterministic LLM responses', 'Product managers drafting strict PRDs and prompt specifications', 'Researchers and knowledge workers seeking high-speed synthesis workflows'],
    skillsCovered: ['System Role Priming', 'Few-Shot Calibration', 'Strict JSON Schemas', 'DSPy Optimization', 'Prompt Security Guardrails'],
    resourcesCount: 16,
    hasAssessment: true,
    certificateEligible: true,
    capstones: [
      {
        title: 'Production RFC Technical Auditor Prompt Suite',
        badge: 'Capstone Project',
        description: 'Hardened system prompt specification that audits software architecture documents and outputs RFC-compliant JSON severity matrices with zero hallucinations.',
        tags: ['JSON Schema', 'System Prompts', 'Security'],
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBSSb7kt6mhAqab0BJg32ePaWr7JxebLTzvJzuqUaPzj1xuYwxPJuM45TBZN45Qo33YHG68yQ3jqEEZS0GRy4IDzJRu-GrbUj6KUpKWfJINq3tsTQAeVGH4r6Aq0dBo4OLItORRbnQtP_tWhyrjaSzm8_5AQUXqNppjAuM6G0273U6cypykO8L1lnFVV04EpWxaIMwWwdomXRIM7JBTG8XvV51nMx3J0emUNhU3D0tSsmCKu9M-AguE'
      }
    ],
    modules: [
      {
        week: 1,
        title: 'Anatomy of Modern Context Windows & Attention Sinks',
        topics: ['Token Priming', 'Delimiter Isolation', 'Position Bias'],
        labTitle: 'Benchmark attention degradation using needle-in-a-haystack tests',
        duration: '4h Masterclass',
        lessons: [
          {
            id: 'pe-w1-l1',
            title: 'Context Window Geometry & Attention Dynamics',
            duration: '45m',
            type: 'video',
            isPreview: true,
            content: 'Understand why placing crucial instructions in the middle of long documents leads to cognitive neglect and how to anchor critical constraints effectively.'
          },
          {
            id: 'pe-w1-l2',
            title: 'System Role Hardening & Jailbreak Resistance',
            duration: '50m',
            type: 'reading',
            content: 'Defend your applications against indirect prompt injections and jailbreaks using strict delimiter syntax and negative constraint framing.'
          }
        ]
      },
      {
        week: 2,
        title: 'Few-Shot Calibration & Strict JSON Schema Enforcement',
        topics: ['In-Context Learning', 'Grammar Steering', 'Pydantic Validations'],
        labTitle: 'Generate guaranteed parseable JSON payloads without regex fallbacks',
        duration: '4h Masterclass',
        lessons: [
          {
            id: 'pe-w2-l1',
            title: 'Grammar-Guided Decoding & Pydantic Steering',
            duration: '60m',
            type: 'code',
            content: 'How modern inference engines enforce deterministic JSON schemas using constrained decoding grammars.',
            codeSnippet: `from pydantic import BaseModel, Field

class ArchitectureAudit(BaseModel):
    security_score: int = Field(ge=0, le=100)
    vulnerabilities: list[str]
    mitigations: list[str]
    is_production_ready: bool`
          },
          {
            id: 'pe-w2-l2',
            title: 'Schema Steering Assessment',
            duration: '15m',
            type: 'quiz',
            quizQuestions: [
              {
                id: 'peq-1',
                question: 'What is the most reliable way to guarantee that an LLM outputs valid, parseable JSON in production?',
                options: ['Asking nicely in the prompt', 'Providing constrained decoding grammars or JSON Schema response_format parameters supported by the API', 'Putting JSON in capital letters', 'Setting temperature to 1.0'],
                correctIndex: 1,
                explanation: 'Native JSON schema response formatting forces the token sampler to only select valid JSON tokens at each decoding step.'
              }
            ]
          }
        ]
      },
      {
        week: 3,
        title: 'Chain-of-Thought (CoT) & DSPy Optimization',
        topics: ['Self-Consistency', 'Programmatic Optimization', 'Few-Shot Compilers'],
        labTitle: 'Compile a DSPy pipeline that automatically tunes prompt examples',
        duration: '4h Masterclass',
        lessons: [
          { id: 'pe-w3-l1', title: 'Reasoning Trajectories: Zero-Shot vs Few-Shot CoT', duration: '55m', type: 'video' },
          { id: 'pe-w3-l2', title: 'Hands-on DSPy Teleprompter Compilation', duration: '65m', type: 'code' }
        ]
      },
      {
        week: 4,
        title: 'Production Guardrails & Certification Assessment',
        topics: ['NeMo Guardrails', 'Hallucination Benchmarks', 'Final Exam'],
        labTitle: 'Deploy a real-time guardrail proxy evaluating safety thresholds',
        duration: '4h Masterclass',
        lessons: [
          { id: 'pe-w4-l1', title: 'Enterprise Safety Policies & Moderation Layers', duration: '50m', type: 'reading' },
          { id: 'pe-w4-l2', title: 'Enterprise Prompt Mastery Certification Exam', duration: '30m', type: 'quiz', quizQuestions: [
            {
              id: 'peq-2',
              question: 'In DSPy, what does a Teleprompter (Optimizer) do?',
              options: ['Displays text for a video presenter', 'Automatically compiles and selects optimal few-shot demonstrations based on a metric function', 'Deletes old prompts', 'Formats HTML output'],
              correctIndex: 1,
              explanation: 'DSPy Teleprompters systematically optimize demonstration selection and instruction wording against evaluation benchmarks.'
            }
          ]}
        ]
      }
    ]
  }
];

export const INITIAL_PROMPTS: AIPrompt[] = [
  {
    id: 'react-code-reviewer',
    title: 'Senior React/TypeScript Code Reviewer & Security Auditor',
    domain: 'Software Architecture',
    category: 'code',
    systemRole: 'Staff Frontend Architect & AppSec Reviewer',
    description: 'Evaluates AST structures, memory leaks in useEffect, re-render cascades, and strict accessibility violations before code merges.',
    templateText: `You are a Staff Frontend Architect and Security Specialist at GXA Technology.
Analyze the input React/TypeScript code focusing strictly on:
1. React 18/19 rendering behavior: Stale closures, unnecessary memoization, suspense boundaries.
2. Strict Type Safety: Prohibit {{type_exceptions}}. Enforce strict generic constraints.
3. Security: Check for unescaped HTML, insecure postMessage events, and unvalidated URL routing parameters.

File under review: {{component_file}}
Code Diff:
{{code_snippet}}`,
    variables: [
      { name: 'component_file', defaultValue: 'CheckoutPaymentSheet.tsx', description: 'Name of the component file' },
      { name: 'type_exceptions', defaultValue: 'any, unknown, non-null assertions', description: 'Disallowed type exemptions' },
      { name: 'code_snippet', defaultValue: '// Paste component diff here', description: 'Input code snippet' }
    ],
    models: ['Claude 3.5 Sonnet', 'GPT-4o', 'Gemini 1.5 Pro'],
    usageCount: 3412,
    benchmarkScore: 98.4
  },
  {
    id: 'rag-grounded-synthesizer',
    title: 'Retrieval-Augmented Generation (RAG) System Prompt with Grounding Checks',
    domain: 'AI & Vector Systems',
    category: 'architecture',
    systemRole: 'Grounded RAG Synthesizer',
    description: 'Hardened system prompt prohibiting parametric hallucination by mandating verbatim citation anchors from vector-search chunks.',
    templateText: `You are a grounded RAG synthesizer with zero tolerance for hallucinations.
Answer the user request using ONLY facts stated in: {{context_chunks}}.

Rules:
1. If facts are absent or inconclusive, output: "I cannot verify this with the provided sources."
2. Every declarative claim must end with a citation bracket: [Doc: {{doc_id}}].
3. Disregard external parametric knowledge.`,
    variables: [
      { name: 'context_chunks', defaultValue: '{{Retrieved context from vector DB}}', description: 'Context retrieved from vector database' },
      { name: 'doc_id', defaultValue: 'doc_492', description: 'Document ID reference' }
    ],
    models: ['Claude 3.5 Sonnet', 'GPT-4o'],
    usageCount: 4120,
    benchmarkScore: 99.2
  },
  {
    id: 'b2b-case-study',
    title: 'High-Intent B2B SaaS Case Study Generator',
    domain: 'Content & Growth Marketing',
    category: 'content',
    systemRole: 'B2B Growth Strategist',
    description: 'Extracts customer pain points, ROI metrics, and architectural transformation into high-converting case narratives.',
    templateText: `Generate a high-converting 3-stage case study narrative for:
Client Vertical: {{client_vertical}}
Challenge Metrics: {{challenge_metrics}}
Implemented Solution: {{solution}}

Follow the PAS (Problem-Agitate-Solution) framework with quantitative business impact.`,
    variables: [
      { name: 'client_vertical', defaultValue: 'Indian FinTech Neo-Bank', description: 'Industry vertical' },
      { name: 'challenge_metrics', defaultValue: 'CAC exceeded ₹840 with 42% KYC drop-off', description: 'Initial baseline metrics' },
      { name: 'solution', defaultValue: 'Psychological priming & WhatsApp instant onboarding', description: 'Implemented solution' }
    ],
    models: ['GPT-4o', 'Gemini 1.5 Pro'],
    usageCount: 2890,
    benchmarkScore: 96.8
  },
  {
    id: 'sql-query-optimizer',
    title: 'Complex SQL Query Optimizer & Execution Plan Explainer',
    domain: 'Data & Databases',
    category: 'data',
    systemRole: 'Principal Database Reliability Engineer',
    description: 'Ingests raw EXPLAIN ANALYZE traces, isolates sequential scans and costly nested joins, and rewrites queries for sub-second execution.',
    templateText: `Analyze this slow database query: {{slow_sql_query}}
Engine: {{database_engine}}

Provide a step-by-step optimization plan:
1. Identify scan anomalies and disk spills.
2. Recommend covering indexes with specific column orders.
3. Output the rewritten query utilizing window functions or CTEs.`,
    variables: [
      { name: 'slow_sql_query', defaultValue: 'SELECT * FROM orders JOIN users ON orders.user_id = users.id WHERE orders.created_at > NOW() - INTERVAL 30 DAY', description: 'Slow SQL query' },
      { name: 'database_engine', defaultValue: 'PostgreSQL 16', description: 'Target database engine' }
    ],
    models: ['Claude 3.5 Sonnet', 'GPT-4o'],
    usageCount: 2154,
    benchmarkScore: 97.5
  },
  {
    id: 'india-freelance-tax',
    title: 'Indian Tax & GST Compliance Summary Prompt for Freelancers',
    domain: 'Finance & Compliance',
    category: 'career',
    systemRole: 'Indian Chartered Accountant & Tax Consultant',
    description: 'Evaluates Section 44ADA presumptive taxation limits, LUT filings for export of services in USD, and invoicing rules for Indian developers.',
    templateText: `Act as a senior Indian Chartered Accountant specializing in cross-border software export.
Evaluate an annual consulting turnover of: {{annual_revenue_inr}}

Analyze:
1. Section 44ADA 50% presumptive profit margin eligibility.
2. GST filing via Letter of Undertaking (LUT) for zero-rated overseas remittances.
3. Advance tax payment schedule deadlines (15% by June, 45% by Sept, 75% by Dec, 100% by March).`,
    variables: [
      { name: 'annual_revenue_inr', defaultValue: '₹24,00,000', description: 'Annual turnover in INR' }
    ],
    models: ['GPT-4o', 'Gemini 1.5 Pro'],
    usageCount: 1940,
    benchmarkScore: 98.1
  }
];

export const FREE_RESOURCES: FreeResource[] = [
  {
    id: 'study-planners',
    title: 'Printable Academic Study Planner & Notion Template',
    type: 'Notion',
    category: 'Student Productivity',
    fileSize: '2.4 MB',
    downloadUrl: '#',
    description: 'Structured weekly review system, assignment tracker, and cognitive sprint scheduler optimized for technical courses.'
  },
  {
    id: 'resume-templates',
    title: 'ATS-Optimized Engineering Resume Template (Google Docs & Figma)',
    type: 'Template',
    category: 'Career Essentials',
    fileSize: '1.8 MB',
    downloadUrl: '#',
    description: 'Verified formatting that successfully bypasses automated screening algorithms at top tech enterprises across India.'
  },
  {
    id: 'ai-prompt-deck',
    title: '50+ High-Utility AI Prompt Cheatsheet for Students & Engineers',
    type: 'PDF',
    category: 'Artificial Intelligence',
    fileSize: '3.6 MB',
    downloadUrl: '#',
    description: 'System instructions for paper summarization, code debugging, and mock technical interview simulations.'
  },
  {
    id: 'practice-worksheets',
    title: 'Data Structures & Algorithms 100-Problem Drill Sheets',
    type: 'PDF',
    category: 'Computer Science',
    fileSize: '5.1 MB',
    downloadUrl: '#',
    description: 'Curated coding drills covering array pointers, tree traversals, dynamic programming, and system complexity bounds.'
  },
  {
    id: 'interview-guide',
    title: 'Top 100 Indian Tech FAANG/MNC Interview Questions & Solutions',
    type: 'PDF',
    category: 'Career Guidance',
    fileSize: '4.2 MB',
    downloadUrl: '#',
    description: 'Real interview transcripts and system design challenges asked across top Bengaluru and Hyderabad tech campuses.'
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'prompt-engineering-vs-generators-2025',
    title: 'Why Prompt Engineering Will Outlive Prompt Generators in 2025',
    author: 'Tauqeer Ashraf (MCA)',
    authorRole: 'Founder, GXA Career Academy',
    date: 'May 18, 2025',
    readTime: '6 min read',
    category: 'AI Trends',
    coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBbEJqZQexN_o0T1n5RQUTi5gpBO5cqJ0x0PTdgosoicB5B5WUlG4oJ4KVsbV6cS7ZwaukWqoG5V5BopJO8dkDetV0dD3JRh1vgLKehwwShVnhpjs-Z9vLevUGyhfyOP_H2tPTvf1oFfGZKjiygiDP33lPlmKC3zle0DEgwDouc5bpUz6tW_rNDOoKREXOFKkhxMiTGJsxww7UIYdRMfu5FYk4vzMK-tAjR2aHPyfYU3wfIXTrxlegg',
    excerpt: 'Why foundational logic understanding remains the true competitive advantage over automated template copycats as enterprise LLM architectures mature.',
    content: [
      'The software industry has witnessed a flood of automated prompt builders promising one-click perfection. Yet in production pipelines handling millions of customer requests, these simplistic tools collapse under unpredictable edge cases.',
      'Prompt engineering is not about crafting flowery English sentences. It is an applied discipline of system architecture: managing context windows, establishing semantic boundaries, enforcing strictly parseable schema tokens, and architecting multi-step feedback loops.',
      'Engineers who grasp how self-consistency, chain-of-thought, and DSPy optimization work under the hood will continue to command premium compensation, while superficial prompt hobbyists will be easily automated away.'
    ]
  },
  {
    slug: 'tech-compensation-guide-india-2025',
    title: 'The 2025 Compensation Guide: Navigating India’s High-Tech Hiring Market',
    author: 'Dr. Revant Gautam',
    authorRole: 'Author & Technical / IT Expert',
    date: 'May 12, 2025',
    readTime: '8 min read',
    category: 'Career Strategy',
    coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA8EsGeqZSpBc4A8omqBwwHvOAlEPADSqk9wfmQXIU7nJ2w7d4aur3VROS9TmheENQAEENIu0MrMaJyWctEGXfCeq17WUb-xoLyGCLUNKdL1VBwhFSrKUkP1_Tituw2mBFyIVm830QnP3IhAKihZo1pkb5YNX0Vb_xNow1nvK4DwIN2Eq0A5XBAiIovQhxyczN09Tzyd4YGpIA-DvCu9iDd9TaJ_HSkCWXYGc_BpK0Q_AzxyyTbvYPi',
    excerpt: 'Real telemetry on compensation packages across Bangalore, Hyderabad, and Pune for engineers with applied AI capability and modern full-stack skills.',
    content: [
      'Hiring in 2025 has sharply decoupled into two distinct tiers: commoditized frontend/backend developers facing salary compression, and full-stack systems architects with applied AI engineering skills commanding record-high compensation packages.',
      'Our analysis across 140 venture-backed Indian tech firms indicates median base packages of ₹18 LPA to ₹32 LPA for engineers capable of building real RAG pipelines, deploying pgvector databases, and fine-tuning open-weights models.',
      'Negotiation power stems from demonstrating portfolio-grade capstones and verified GitHub contributions over static resumes.'
    ]
  },
  {
    slug: 'decoding-search-generative-experience',
    title: 'Decoding Search Engine Generative Experience: An Action Manual',
    author: 'Tauqeer Ashraf (MCA)',
    authorRole: 'Founder, GXA Career Academy',
    date: 'May 04, 2025',
    readTime: '5 min read',
    category: 'Digital Growth',
    coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuACFcKQfbOGR4YcnIeFcgEuYRne-NTxecF8PBJlCtVsMUJdWHbL-4z61szPFC5E_VXZSFKDWIdEq4juFwX8F88-HhULM7aAIpH2wwER0Ib01_54p0JjyNm-2AQZeZejs67MRYHE55IkfcEnFBNBhGmGhcRF4T_UxzFC-xjoO5HzJIUh0HLUewE46_SfPJo4TEeIdNmQSqVUUWNd3WA4_iypQRok8EKKycrDkrvml-m9U7v7ViEdcxAZ',
    excerpt: 'How modern marketing engineers must restructure content to be cited directly in AI synthesized search cards and generative knowledge graphs.',
    content: [
      'Traditional blue-link SEO is evolving into Generative Engine Optimization (GEO). Search engines no longer solely rank pages based on keyword density and generic backlink counts; they ingest full content vectors into neural synthesis engines.',
      'To earn citations in Google SGE and AI Overviews, technical marketers must structure content using schema-grounded facts, definitive authoritative quotes, and verified tabular benchmarks.',
      'The manual provides exact HTML semantic markup patterns and prompt evaluation harnesses to audit your content topical authority.'
    ]
  }
];

export const CAREER_ROADMAPS: CareerRoadmap[] = [
  {
    slug: 'ai-engineer',
    title: 'Lead AI & Full-Stack Systems Engineer',
    salaryRange: '₹14 - 28 LPA',
    difficulty: 'Advanced',
    timelineMonths: 6,
    description: 'Transition from conventional web development into high-leverage LLMOps, vector search engineering, and multi-agent system orchestration.',
    keySkills: [
      'Python 3.11+, Async FastAPI, Pydantic v2',
      'Dense/Sparse Vector Embeddings, Pinecone, pgvector',
      'LangGraph Cyclic Agent Workflows, LangSmith Tracing',
      'Open Weights Self-Hosting (Ollama, vLLM, Docker)',
      'Next.js 15 Streaming Generative UI'
    ],
    phases: [
      {
        phaseNumber: 1,
        title: 'Foundations & API Engineering (Month 1-2)',
        topics: ['Tokenomics & Context Geometries', 'Async FastAPI microservices', 'Streaming Server-Sent Events', 'Prompt Injection Defense']
      },
      {
        phaseNumber: 2,
        title: 'Information Retrieval & Vector Databases (Month 3-4)',
        topics: ['Semantic Chunking Heuristics', 'PostgreSQL pgvector HNSW indexing', 'Cross-Encoder Re-ranking with Cohere', 'RAGAS Evaluation Benchmarks']
      },
      {
        phaseNumber: 3,
        title: 'Autonomous Agents & Production LLMOps (Month 5-6)',
        topics: ['LangGraph State Machines', 'Deterministic Tool Calling', 'vLLM Local Deployment with Docker', 'Production CI/CD & Guardrails']
      }
    ]
  },
  {
    slug: 'digital-growth-leader',
    title: 'Digital Growth Marketing Leader',
    salaryRange: '₹12 - 24 LPA',
    difficulty: 'Intermediate',
    timelineMonths: 4,
    description: 'Master data-driven customer acquisition modeling, programmatic SEO, paid media algorithms, and multi-channel attribution across India.',
    keySkills: [
      'Customer Acquisition Cost (CAC) & Payback Modeling',
      'Meta Advantage+ and Conversions API (CAPI)',
      'Google Performance Max Bidding Matrices',
      'Programmatic SEO & Knowledge Graph Optimization',
      'Automated Retention Funnels via WhatsApp & Klaviyo'
    ],
    phases: [
      {
        phaseNumber: 1,
        title: 'Unit Economics & Attribution (Month 1)',
        topics: ['Financial forecasting spreadsheets', 'CAPI Server-Side Tagging', 'Heuristic CRO audits']
      },
      {
        phaseNumber: 2,
        title: 'Algorithmic Paid Media (Month 2-3)',
        topics: ['Meta Andromeda creative testing', 'Google High-Intent Search & PMax', 'LinkedIn B2B Account-Based Marketing']
      },
      {
        phaseNumber: 3,
        title: 'Retention Loops & Scaling (Month 4)',
        topics: ['Multi-branch WhatsApp automation', 'Cohort analysis & Churn prevention', 'Agency operating systems']
      }
    ]
  },
  {
    slug: 'cloud-data-architect',
    title: 'Cloud & Platform Data Architect',
    salaryRange: '₹16 - 32 LPA',
    difficulty: 'Advanced',
    timelineMonths: 6,
    description: 'Build enterprise-grade resilient cloud environments, Kubernetes microservices, multi-region database replication, and FinOps telemetry.',
    keySkills: [
      'Terraform Infrastructure as Code (IaC)',
      'Amazon Web Services (AWS) & Google Cloud Platform (GCP)',
      'Kubernetes (EKS/GKE), Istio Service Mesh, ArgoCD',
      'Snowflake & BigQuery Lakehouses',
      'FinOps Cloud Cost Optimization'
    ],
    phases: [
      {
        phaseNumber: 1,
        title: 'Infrastructure as Code Foundations (Month 1-2)',
        topics: ['Terraform Cloud modular architecture', 'Multi-VPC networking & Peering', 'IAM zero-trust policies']
      },
      {
        phaseNumber: 2,
        title: 'Container Orchestration & GitOps (Month 3-4)',
        topics: ['Kubernetes cluster provisioning', 'ArgoCD continuous delivery', 'Istio mTLS service mesh']
      },
      {
        phaseNumber: 3,
        title: 'Enterprise Reliability & FinOps (Month 5-6)',
        topics: ['Prometheus/Grafana observability', 'Disaster recovery playbooks', 'FinOps automated budget guards']
      }
    ]
  },
  {
    slug: 'product-designer',
    title: 'AI Product & Design Systems Lead',
    salaryRange: '₹10 - 22 LPA',
    difficulty: 'Intermediate',
    timelineMonths: 4,
    description: 'Bridge generative user interfaces, design token governance, and accessible high-conversion SaaS web applications.',
    keySkills: [
      'Advanced Figma Tokens & Variables',
      'Generative UI Streaming UX Patterns',
      'WCAG 2.1 AAA Accessibility Standards',
      'Design System Engineering & Micro-Interactions',
      'User Research & Quantitative A/B Audits'
    ],
    phases: [
      {
        phaseNumber: 1,
        title: 'Design Systems & Token Architecture (Month 1-2)',
        topics: ['Atomic design systems', 'Color science & Contrast ratios', 'Figma auto-layout mastery']
      },
      {
        phaseNumber: 2,
        title: 'AI Interaction Patterns (Month 3-4)',
        topics: ['Generative canvas UX', 'Streaming state indicators', 'Voice and multimodal input mechanics']
      }
    ]
  }
];

export const AI_PROMPTS = [
  {
    id: 'p-1',
    title: 'Senior React/TypeScript Code Reviewer & Security Auditor',
    category: 'Coding',
    description: 'Evaluates AST structures, memory leaks in useEffect, re-render cascades, and strict accessibility violations before code merges.',
    promptText: `Act as a Staff Frontend Architect and Security Specialist at GXA Technology.
Analyze the provided React/TypeScript code focusing strictly on:
1. React 18/19 rendering behavior: Stale closures, unnecessary memoization, suspense boundaries.
2. Strict Type Safety: Prohibit any, unknown, non-null assertions. Enforce strict generic constraints.
3. Security: Check for unescaped HTML, insecure postMessage events, and unvalidated URL routing parameters.`,
    tags: ['react', 'typescript', 'security'],
    copiesCount: 3412
  },
  {
    id: 'p-2',
    title: 'Retrieval-Augmented Generation (RAG) Grounded Synthesizer',
    category: 'Education',
    description: 'Hardened system prompt prohibiting parametric hallucination by mandating citation anchors from vector-search chunks.',
    promptText: `You are a grounded RAG synthesizer with zero tolerance for hallucinations.
Answer the user request using ONLY facts stated in: {{context_chunks}}.

Rules:
1. If facts are absent or inconclusive, output: "I cannot verify this with the provided sources."
2. Every declarative claim must end with a citation bracket: [Doc: {{doc_id}}].
3. Disregard external parametric knowledge.`,
    tags: ['rag', 'embeddings', 'citations'],
    copiesCount: 4120
  },
  {
    id: 'p-3',
    title: 'High-Intent B2B SaaS Case Study Generator',
    category: 'Marketing',
    description: 'Extracts customer pain points, ROI metrics, and architectural transformation into high-converting case narratives.',
    promptText: `Generate a high-converting 3-stage case study narrative for:
Client Vertical: {{client_vertical}}
Challenge Metrics: {{challenge_metrics}}
Implemented Solution: {{solution}}

Follow the PAS (Problem-Agitate-Solution) framework with quantitative business impact metrics.`,
    tags: ['marketing', 'cro', 'saas'],
    copiesCount: 2890
  },
  {
    id: 'p-4',
    title: 'Complex SQL Query Optimizer & Execution Plan Explainer',
    category: 'Coding',
    description: 'Ingests raw EXPLAIN ANALYZE traces, isolates sequential scans and costly nested joins, and rewrites queries for sub-second execution.',
    promptText: `Analyze this slow database query: {{slow_sql_query}}
Engine: {{database_engine}}

Provide a step-by-step optimization plan:
1. Identify scan anomalies and disk spills.
2. Recommend covering indexes with specific column orders.
3. Output the rewritten query utilizing window functions or CTEs.`,
    tags: ['sql', 'postgres', 'optimization'],
    copiesCount: 2154
  },
  {
    id: 'p-5',
    title: 'Indian Tech Career Transition Strategy & Resume Auditor',
    category: 'Career Guidance',
    description: 'Assesses career progression, skills gap analysis, and tailored compensation benchmarks for Bengaluru/NCR tech roles.',
    promptText: `You are an Executive Tech Career Coach at GXA Technology.
Review my background: {{current_experience_and_skills}}
Target Role: {{target_role_e_g_lead_ai_architect}}

Generate:
1. Exact 90-day skill acquisition roadmap.
2. Portfolio capstone recommendation with verifiable GitHub artifacts.
3. Indian tech salary benchmark range (in LPA) for Tier-1 product firms.`,
    tags: ['career', 'roadmap', 'resume'],
    copiesCount: 1980
  }
];

export const FAQ_ITEMS = [
  {
    category: 'eBooks & Digital Library',
    question: 'How do I access and download my purchased eBooks?',
    answer: 'Immediately upon checkout completion, your digital book is automatically unlocked in your Student Dashboard -> Digital Library. You can read it directly inside our web reader with dark/light themes, or click "Download Watermarked PDF" for offline reading on any device.'
  },
  {
    category: 'eBooks & Digital Library',
    question: 'What is the dynamic forensic watermark on downloads?',
    answer: 'To protect intellectual property and author copyrights, every downloaded PDF is generated with an unobtrusive digital watermark embedding your registered email address, transaction reference, and acquisition timestamp.'
  },
  {
    category: 'Courses & Learning',
    question: 'Do courses include live cohort sessions or self-paced videos?',
    answer: 'GXA Career Academy features both self-paced deep-dive masterclasses and intensive cohort-based live bootcamps. All live sessions are recorded in full 1080p HD and uploaded to your dashboard with lifetime replay access.'
  },
  {
    category: 'Courses & Learning',
    question: 'Will I receive a verifiable certificate upon completion?',
    answer: 'Yes! After finishing all video modules and passing the capstone assessment or prompt evaluation test, you will receive an official verifiable digital credential with a unique certificate ID that can be shared on LinkedIn.'
  },
  {
    category: 'Payments & Security',
    question: 'What payment methods are supported for Indian learners?',
    answer: 'We support all major Indian payment methods through our secure Razorpay gateway: UPI (Google Pay, PhonePe, Paytm, CRED), RuPay/Visa/Mastercard credit and debit cards, and Net Banking across 50+ Indian banks.'
  },
  {
    category: 'Payments & Security',
    question: 'Can I get a GST tax invoice with my company GSTIN?',
    answer: 'Yes, during checkout you can enter your business GSTIN. Our system automatically generates an 18% Integrated GST tax invoice complete with SAC codes (998431) ready for corporate tax credits.'
  },
  {
    category: 'Refunds & Guarantees',
    question: 'What is your refund policy?',
    answer: 'We offer an unconditional 7-day money-back guarantee on all online courses if you have completed less than 25% of the curriculum. Due to the immediate delivery of downloadable PDF assets, eBook purchases are non-refundable once downloaded, but you can preview full sample chapters before purchasing.'
  }
];

