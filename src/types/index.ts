export interface Author {
  id: string;
  name: string;
  title: string;
  credentials: string;
  experience: string;
  bio: string;
  photoUrl: string;
  role: 'Founder' | 'Author & Advisor' | 'Research Lead';
  publishedBooksCount: number;
}

export interface EBook {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  category: string;
  categorySlug?: string;
  authorId?: string;
  authorName?: string;
  author?: string;
  authorRole?: string;
  authorCredentials?: string;
  price: number;
  originalPrice: number;
  pages?: number;
  totalPages?: number;
  edition?: string;
  status: 'published' | 'draft' | 'Draft' | 'Published';
  rating: number;
  reviewsCount: number;
  coverImage: string;
  description?: string;
  shortDescription?: string;
  longDescription?: string;
  outcomes?: string[];
  tags?: string[];
  tableOfContents?: any[];
  specifications?: {
    isbn: string;
    publisher: string;
    edition: string;
    formats: string;
    language: string;
    rights: string;
  };
  bonusItems?: { title: string; value: number; description: string }[];
  previewSamplePages?: number;
  previewExcerpts?: {
    chapter: string;
    heading: string;
    content: string[];
    calloutTitle?: string;
    calloutBody?: string;
  };
  downloadFileName?: string;
  featured?: boolean;
}

export interface Course {
  id: string;
  slug: string;
  title: string;
  category: string;
  categorySlug?: string;
  instructorName?: string;
  instructor?: string;
  instructorTitle?: string;
  instructorBio?: string;
  instructorPhoto?: string;
  price: number;
  originalPrice: number;
  durationWeeks?: number;
  liveHours?: number;
  duration?: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels' | 'Beginner to Advanced' | string;
  format?: 'Live Cohort' | 'Self-Paced Masterclass';
  rating: number;
  enrolledCount?: number;
  studentsCount?: number;
  batchCap?: number;
  seatsLeft?: number;
  nextBatchDate?: string;
  thumbnail: string;
  description: string;
  learningOutcomes?: string[];
  requirements?: string[];
  capstones?: {
    title: string;
    badge: string;
    description: string;
    tags: string[];
    image: string;
  }[];
  modules?: {
    week: number;
    title: string;
    topics: string[];
    labTitle: string;
    duration: string;
    lessons: {
      id: string;
      title: string;
      duration: string;
      completed?: boolean;
      videoUrl?: string;
      isPreview?: boolean;
      type?: 'video' | 'reading' | 'code' | 'quiz';
      content?: string;
      codeSnippet?: string;
      quizQuestions?: {
        id: string;
        question: string;
        options: string[];
        correctIndex: number;
        explanation: string;
      }[];
    }[];
  }[];
  curriculum?: {
    id: string;
    title: string;
    lessons: {
      id: string;
      title: string;
      duration: string;
      isPreview?: boolean;
      type?: 'video' | 'reading' | 'code' | 'quiz';
    }[];
  }[];
  status?: 'published' | 'draft' | 'completed' | 'in-progress' | string;
  language?: string;
  prerequisites?: string[];
  targetAudience?: string[];
  skillsCovered?: string[];
  resourcesCount?: number;
  hasAssessment?: boolean;
  certificateEligible?: boolean;
}

export interface AIPrompt {
  id: string;
  title: string;
  domain?: string;
  category: string;
  systemRole?: string;
  description: string;
  templateText?: string;
  promptText?: string;
  variables?: { name: string; defaultValue: string; description: string }[];
  models?: string[];
  usageCount?: number;
  copiesCount?: number;
  benchmarkScore?: number;
  tags?: string[];
}

export interface FreeResource {
  id: string;
  title: string;
  type: string;
  category: string;
  fileSize: string;
  downloadUrl?: string;
  description: string;
  downloadsCount?: number;
}

export interface CartItem {
  id: string;
  type: string;
  title: string;
  price: number;
  originalPrice?: number;
  image?: string;
  coverImage?: string;
  authorOrInstructor?: string;
  author?: string;
  slug?: string;
}

export interface Order {
  id?: string;
  orderId?: string;
  createdAt?: string;
  date?: string;
  items: CartItem[];
  subtotal?: number;
  discount?: number;
  couponCode?: string;
  gstAmount?: number;
  total: number;
  paymentMethod: string;
  status: string;
  razorpayPaymentId?: string;
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
}

export interface BlogPost {
  id?: string;
  slug: string;
  title: string;
  author: string;
  authorRole?: string;
  date: string;
  readTime: string;
  category: string;
  coverImage: string;
  excerpt?: string;
  summary?: string;
  content?: string[];
}

export interface CareerRoadmap {
  id?: string;
  slug: string;
  title: string;
  salaryRange?: string;
  salaryRangeIndia?: string;
  difficulty?: string;
  timelineMonths?: number;
  description: string;
  keySkills: string[];
  phases?: { phaseNumber: number; title: string; topics: string[] }[];
  milestones?: { phase: string; duration: string; description: string }[];
}
