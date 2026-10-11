import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { GXA_LOGO_URL } from '../data/mockData';
import { GXALogoWithTagline } from './GXALogo';

export const Footer: React.FC = () => {
  const { navigateTo, showToast } = useApp();
  const [newsletterEmail, setNewsletterEmail] = useState('');

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      showToast(`Welcome voucher ₹100 issued to ${newsletterEmail.trim()}!`);
      setNewsletterEmail('');
    }
  };

  return (
    <footer className="w-full bg-[#F1F5F2] pt-12 pb-8 border-t border-[#E2E8E4] mt-auto max-w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full min-w-0">
        {/* Welcome Grant Card */}
        <div className="bg-white p-5 sm:p-8 rounded-2xl mb-12 shadow-xs border border-[#E2E8E4] flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 min-w-0">
          <div className="max-w-xl min-w-0">
            <div className="flex items-center gap-2 text-[#EA580C] mb-1">
              <span className="material-symbols-outlined">redeem</span>
              <span className="text-xs uppercase tracking-wider font-bold">Exclusive Welcome Grant</span>
            </div>
            <h4 className="font-display text-xl sm:text-2xl font-bold text-[#072118] break-words">
              Subscribe &amp; Receive ₹100 Learning Credit
            </h4>
            <p className="text-xs sm:text-sm text-[#4E5D54] mt-1 leading-relaxed">
              Get curated syllabus drops, early bird textbook pre-orders, and an instant ₹100 voucher applied to your account.
            </p>
          </div>
          <div className="w-full lg:w-auto flex-1 max-w-md min-w-0">
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row items-stretch gap-2 w-full min-w-0">
              <input
                className="min-w-0 flex-1 px-4 py-2.5 bg-[#F9FAF7] rounded-xl text-xs sm:text-sm text-[#121E17] focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#EA580C] border border-[#E2E8E4]"
                placeholder="Enter your academic or work email"
                type="email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                required
              />
              <button
                className="px-5 py-2.5 bg-[#EA580C] text-white font-semibold text-xs sm:text-sm rounded-xl hover:bg-[#C2410C] transition-colors flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap shadow-sm shrink-0"
                type="submit"
              >
                <span>Claim ₹100</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </form>
            <span className="text-[11px] text-[#6B7C72] block mt-1.5">
              Instant credit applicable at checkout. We respect your privacy and never share your email.
            </span>
          </div>
        </div>

        {/* 8-Column Footer Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6 mb-12 min-w-0">
          {/* Brand Col */}
          <div className="col-span-2 md:col-span-4 lg:col-span-2 min-w-0">
            <button
              onClick={() => navigateTo('/')}
              className="flex items-center mb-3 text-left cursor-pointer hover:opacity-90 transition-opacity max-w-full min-w-0"
              title="GXA Career Academy Home"
              aria-label="GXA Career Academy Home"
            >
              <GXALogoWithTagline size="md" className="max-w-full" />
            </button>
            <p className="text-xs font-semibold text-[#059669] mb-1">
              Online Courses | eBooks | AI Learning | Professional Skills | Career Guidance | Certifications
            </p>
            <p className="text-xs text-[#4E5D54] mt-1 mb-4 leading-relaxed">
              An authoritative learning ecosystem engineered by <strong>GXA Technology</strong> for future-ready tech leadership, applied AI systems, and career acceleration.
            </p>
            <div className="flex items-center gap-3 text-[#4E5D54]">
              <span className="material-symbols-outlined text-xl hover:text-[#EA580C] cursor-pointer">school</span>
              <span className="material-symbols-outlined text-xl hover:text-[#EA580C] cursor-pointer">terminal</span>
              <span className="material-symbols-outlined text-xl hover:text-[#EA580C] cursor-pointer">psychology</span>
              <span className="material-symbols-outlined text-xl hover:text-[#EA580C] cursor-pointer">language</span>
            </div>
          </div>

          {/* eBooks */}
          <div className="flex flex-col gap-2">
            <span className="text-xs font-bold text-[#072118] uppercase tracking-wider mb-1">eBooks</span>
            <button onClick={() => navigateTo('/ebooks')} className="text-xs text-[#4E5D54] hover:text-[#EA580C] text-left">Explore All Books</button>
            <button onClick={() => navigateTo('/ebooks/category/digital-marketing')} className="text-xs text-[#4E5D54] hover:text-[#EA580C] text-left">Digital Marketing</button>
            <button onClick={() => navigateTo('/ebooks/category/artificial-intelligence')} className="text-xs text-[#4E5D54] hover:text-[#EA580C] text-left">AI &amp; Prompting</button>
            <button onClick={() => navigateTo('/ebooks/category/career-development')} className="text-xs text-[#4E5D54] hover:text-[#EA580C] text-left">Career Strategy</button>
            <button onClick={() => navigateTo('/ebooks/digital-marketing-mastery/preview')} className="text-xs text-[#4E5D54] hover:text-[#EA580C] text-left">Free Chapter Reader</button>
          </div>

          {/* Courses */}
          <div className="flex flex-col gap-2">
            <span className="text-xs font-bold text-[#072118] uppercase tracking-wider mb-1">Courses</span>
            <button onClick={() => navigateTo('/courses')} className="text-xs text-[#4E5D54] hover:text-[#EA580C] text-left">Explore Cohorts</button>
            <button onClick={() => navigateTo('/courses/fullstack-modern-ai-apps')} className="text-xs text-[#4E5D54] hover:text-[#EA580C] text-left">Full-Stack AI Apps</button>
            <button onClick={() => navigateTo('/courses/digital-growth-marketing-bootcamp')} className="text-xs text-[#4E5D54] hover:text-[#EA580C] text-left">Growth Marketing</button>
            <button onClick={() => navigateTo('/courses/prompt-engineering-enterprise')} className="text-xs text-[#4E5D54] hover:text-[#EA580C] text-left">Prompt Engineering</button>
            <button onClick={() => navigateTo('/learn/fullstack-modern-ai-apps/w1-l1')} className="text-xs text-[#4E5D54] hover:text-[#EA580C] text-left">Course Player Demo</button>
          </div>

          {/* AI Learning */}
          <div className="flex flex-col gap-2">
            <span className="text-xs font-bold text-[#072118] uppercase tracking-wider mb-1">AI Hub</span>
            <button onClick={() => navigateTo('/ai-learning')} className="text-xs text-[#4E5D54] hover:text-[#EA580C] text-left">AI Learning Hub</button>
            <button onClick={() => navigateTo('/ai-learning/prompts')} className="text-xs text-[#4E5D54] hover:text-[#EA580C] text-left">Prompt Library</button>
            <button onClick={() => navigateTo('/ai-learning/assistant')} className="text-xs text-[#4E5D54] hover:text-[#EA580C] text-left">AI Study Assistant</button>
            <button onClick={() => navigateTo('/ai-learning')} className="text-xs text-[#4E5D54] hover:text-[#EA580C] text-left">Interactive Playground</button>
          </div>

          {/* Pathways */}
          <div className="flex flex-col gap-2">
            <span className="text-xs font-bold text-[#072118] uppercase tracking-wider mb-1">Pathways</span>
            <button onClick={() => navigateTo('/career-guidance')} className="text-xs text-[#4E5D54] hover:text-[#EA580C] text-left">Career Guidance</button>
            <button onClick={() => navigateTo('/careers/ai-engineer')} className="text-xs text-[#4E5D54] hover:text-[#EA580C] text-left">AI Engineer Roadmap</button>
            <button onClick={() => navigateTo('/careers/digital-growth-leader')} className="text-xs text-[#4E5D54] hover:text-[#EA580C] text-left">Growth Leader Matrix</button>
            <button onClick={() => navigateTo('/learning-paths')} className="text-xs text-[#4E5D54] hover:text-[#EA580C] text-left">Structured Syllabi</button>
          </div>

          {/* Resources */}
          <div className="flex flex-col gap-2">
            <span className="text-xs font-bold text-[#072118] uppercase tracking-wider mb-1">Resources</span>
            <button onClick={() => navigateTo('/resources')} className="text-xs text-[#4E5D54] hover:text-[#EA580C] text-left">Free Cheat Sheets</button>
            <button onClick={() => navigateTo('/blog')} className="text-xs text-[#4E5D54] hover:text-[#EA580C] text-left">Tech Insights Blog</button>
            <button onClick={() => navigateTo('/faq')} className="text-xs text-[#4E5D54] hover:text-[#EA580C] text-left">Help &amp; FAQ</button>
            <button onClick={() => navigateTo('/contact')} className="text-xs text-[#4E5D54] hover:text-[#EA580C] text-left">Contact Us</button>
          </div>

          {/* Company & Authors */}
          <div className="flex flex-col gap-2">
            <span className="text-xs font-bold text-[#072118] uppercase tracking-wider mb-1">Company</span>
            <button onClick={() => navigateTo('/about')} className="text-xs text-[#4E5D54] hover:text-[#EA580C] text-left">About GXA</button>
            <button onClick={() => navigateTo('/brand')} className="text-xs text-[#EA580C] font-bold hover:underline text-left">Brand Identity &amp; Logo</button>
            <button onClick={() => navigateTo('/authors')} className="text-xs text-[#4E5D54] hover:text-[#EA580C] text-left">Founders &amp; Authors</button>
            <button onClick={() => navigateTo('/dashboard')} className="text-xs text-[#4E5D54] hover:text-[#EA580C] text-left">Student Portal</button>
            <button onClick={() => navigateTo('/verify')} className="text-xs text-[#4E5D54] hover:text-[#EA580C] text-left">Academic Credential Registry</button>
          </div>
        </div>

        {/* Security & Indian Payment Assurance Strip */}
        <div className="bg-white p-4 rounded-xl border border-[#E2E8E4] flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8 min-w-0">
          <div className="flex items-center gap-3 min-w-0">
            <span className="material-symbols-outlined text-[#059669] text-2xl shrink-0">verified_user</span>
            <div className="min-w-0">
              <span className="text-xs font-bold text-[#072118] block truncate">100% Secure Checkout</span>
              <span className="text-[11px] text-[#6B7C72] block">Instant delivery for eBooks &amp; instant course activation across India</span>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-xs min-w-0">
            <span className="text-[#6B7C72] uppercase font-bold text-[10px] shrink-0">Accepted Payments:</span>
            <span className="bg-[#E8EFEA] px-2 py-1 rounded text-[#072118] font-semibold flex items-center gap-1 text-[11px] shrink-0">
              <span className="material-symbols-outlined text-sm text-[#059669]">bolt</span>
              UPI
            </span>
            <span className="bg-[#E8EFEA] px-2 py-1 rounded text-[#072118] font-semibold flex items-center gap-1 text-[11px] shrink-0">
              <span className="material-symbols-outlined text-sm text-[#EA580C]">credit_card</span>
              Razorpay
            </span>
            <span className="bg-[#E8EFEA] px-2 py-1 rounded text-[#072118] font-semibold flex items-center gap-1 text-[11px] shrink-0">
              <span className="material-symbols-outlined text-sm text-[#059669]">account_balance</span>
              Net Banking
            </span>
          </div>
        </div>

        {/* Copyright and Legal Attributions */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 pt-4 border-t border-[#E2E8E4] text-xs text-[#6B7C72]">
          <p className="text-center md:text-left">
            © {new Date().getFullYear()} GXA Career Academy. An Educational Initiative by GXA Technology. All Rights Reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-[11px]">
            <button onClick={() => navigateTo('/about')} className="hover:text-[#EA580C] transition-colors cursor-pointer">About Us</button>
            <button onClick={() => navigateTo('/terms')} className="hover:text-[#EA580C] transition-colors cursor-pointer">Terms of Service</button>
            <button onClick={() => navigateTo('/privacy')} className="hover:text-[#EA580C] transition-colors cursor-pointer">Privacy Policy</button>
            <button onClick={() => navigateTo('/refund-policy')} className="hover:text-[#EA580C] transition-colors cursor-pointer">Refund Policy</button>
            <button onClick={() => navigateTo('/shipping-policy')} className="hover:text-[#EA580C] transition-colors cursor-pointer">Shipping &amp; Delivery</button>
            <button onClick={() => navigateTo('/contact')} className="hover:text-[#EA580C] transition-colors cursor-pointer">Support Desk</button>
          </div>
        </div>
      </div>
    </footer>
  );
};
