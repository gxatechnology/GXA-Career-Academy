import React from 'react';
import { useApp } from '../context/AppContext';
import { ShieldCheck, ArrowLeft, FileText, CheckCircle2 } from 'lucide-react';

export const TermsPage: React.FC = () => {
  const { navigateTo } = useApp();

  return (
    <div className="w-full bg-[#F7F9FC] min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-[#64748B]">
          <button onClick={() => navigateTo('/')} className="hover:text-[#2455E8] flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
          </button>
          <span>/</span>
          <span className="text-[#000825] font-semibold">Terms of Service</span>
        </div>

        {/* Header */}
        <div className="bg-white p-8 rounded-2xl border border-[#E5EAF2] shadow-xs">
          <div className="inline-flex items-center gap-1.5 bg-[#DDE1FF] text-[#144CE0] px-3 py-1 rounded-md text-xs font-bold uppercase mb-3">
            <FileText className="w-3.5 h-3.5" /> Legal Agreement
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-[#000825] tracking-tight">
            Terms of Service
          </h1>
          <p className="text-xs text-[#64748B] mt-2">
            Last Updated: {new Date().toLocaleDateString('en-IN', { month: 'long', day: 'numeric', year: 'numeric' })} • Effective Immediately
          </p>
          <p className="text-sm text-[#45464E] mt-4 leading-relaxed">
            Welcome to GXA Career Academy (&quot;Platform&quot;), an authoritative digital knowledge and educational platform operated by <strong>GXA Technology</strong> (&quot;Company&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;), registered in New Delhi, India. By accessing our website, purchasing digital eBooks, enrolling in cohort courses, or utilizing our AI learning tools, you agree to comply with and be bound by these Terms of Service.
          </p>
        </div>

        {/* Content Sections */}
        <div className="bg-white p-8 rounded-2xl border border-[#E5EAF2] shadow-xs space-y-8 text-sm text-[#45464E] leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#000825] flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-[#2455E8]/10 text-[#2455E8] flex items-center justify-center text-xs font-bold">1</span>
              Acceptance of Agreement & Eligibility
            </h2>
            <p>
              By creating an account, making a payment in Indian Rupees (INR ₹), or accessing content on GXA Career Academy, you confirm that you are at least 18 years old or possess legal parental/guardian consent, and that you have full legal capacity to enter into binding agreements under the laws of the Republic of India.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#000825] flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-[#2455E8]/10 text-[#2455E8] flex items-center justify-center text-xs font-bold">2</span>
              Digital Products & Intellectual Property Rights
            </h2>
            <p>
              All monographs, digital eBooks, video lectures, source code repositories, prompt engineering frameworks, and curriculum materials hosted on GXA Career Academy are the exclusive intellectual property of GXA Technology and its designated authors.
            </p>
            <div className="bg-[#F7F9FC] p-4 rounded-xl border border-[#E5EAF2] space-y-2 text-xs">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#2455E8] shrink-0 mt-0.5" />
                <span><strong>Personal License:</strong> Your purchase grants a non-exclusive, non-transferable, single-user license for personal study and professional reference.</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#2455E8] shrink-0 mt-0.5" />
                <span><strong>Prohibited Uses:</strong> You may not redistribute, resell, upload to file-sharing networks, sub-license, scrape, or commercially exploit any platform materials without prior written authorization from GXA Technology.</span>
              </div>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#000825] flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-[#2455E8]/10 text-[#2455E8] flex items-center justify-center text-xs font-bold">3</span>
              Pricing, Currency & Payment Processing
            </h2>
            <p>
              All prices listed on the platform are denominated in Indian Rupees (INR ₹) inclusive of applicable Goods and Services Tax (GST) unless explicitly noted otherwise. Payments are processed securely via verified Indian payment infrastructure including Razorpay, UPI (Google Pay, PhonePe, Paytm, CRED), RuPay, and major domestic/international cards.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#000825] flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-[#2455E8]/10 text-[#2455E8] flex items-center justify-center text-xs font-bold">4</span>
              AI Tools & Study Assistant Acceptable Use
            </h2>
            <p>
              The AI Learning Hub, Prompt Library, and AI Study Assistant are provided to augment learner comprehension. Users agree not to prompt the AI to generate malicious payloads, reverse-engineer proprietary models, or produce defamatory or unlawful material.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#000825] flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-[#2455E8]/10 text-[#2455E8] flex items-center justify-center text-xs font-bold">5</span>
              Governing Law & Dispute Resolution
            </h2>
            <p>
              These Terms of Service are governed by and construed in accordance with the substantive laws of India. Any dispute, claim, or controversy arising out of or relating to your use of GXA Career Academy shall be subject to the exclusive jurisdiction of the competent courts in New Delhi, India.
            </p>
          </section>

          <div className="pt-6 border-t border-[#ECEEF1] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#64748B]">
            <div>Questions regarding these Terms? Contact <strong>legal@gxacareeracademy.com</strong></div>
            <button
              onClick={() => navigateTo('/contact')}
              className="text-[#2455E8] font-bold hover:underline"
            >
              Contact Support Desk →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
