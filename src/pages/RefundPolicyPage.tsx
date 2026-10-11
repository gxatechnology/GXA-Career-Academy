import React from 'react';
import { useApp } from '../context/AppContext';
import { RefreshCw, ArrowLeft, ShieldCheck, CheckCircle2, AlertCircle } from 'lucide-react';

export const RefundPolicyPage: React.FC = () => {
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
          <span className="text-[#000825] font-semibold">Cancellation & Refund Policy</span>
        </div>

        {/* Header */}
        <div className="bg-white p-8 rounded-2xl border border-[#E5EAF2] shadow-xs">
          <div className="inline-flex items-center gap-1.5 bg-[#DDE1FF] text-[#144CE0] px-3 py-1 rounded-md text-xs font-bold uppercase mb-3">
            <RefreshCw className="w-3.5 h-3.5" /> Fair Transparency
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-[#000825] tracking-tight">
            Cancellation & Refund Policy
          </h1>
          <p className="text-xs text-[#64748B] mt-2">
            Last Updated: {new Date().toLocaleDateString('en-IN', { month: 'long', day: 'numeric', year: 'numeric' })} • Applicable across all purchases in India (INR ₹)
          </p>
          <p className="text-sm text-[#45464E] mt-4 leading-relaxed">
            At <strong>GXA Career Academy</strong> (an educational initiative of GXA Technology), we strive to provide complete clarity regarding refunds and cancellations for both our instant digital monographs and live interactive cohort courses.
          </p>
        </div>

        {/* Content Sections */}
        <div className="bg-white p-8 rounded-2xl border border-[#E5EAF2] shadow-xs space-y-8 text-sm text-[#45464E] leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#000825] flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-[#2455E8]/10 text-[#2455E8] flex items-center justify-center text-xs font-bold">1</span>
              Digital eBooks & Downloadable Monographs
            </h2>
            <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 text-amber-950 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div className="text-xs leading-relaxed">
                <strong>Instant Digital Nature:</strong> Because digital eBooks and PDF monographs are delivered instantly to your device upon transaction completion, <strong>completed eBook purchases are non-refundable once the file link is generated or downloaded</strong>.
              </div>
            </div>
            <p className="text-xs text-[#64748B]">
              <strong>Defective or Corrupted Files:</strong> If your downloaded PDF is corrupt, illegible, or has missing chapters, please contact our support desk within 7 days of purchase. We will immediately issue a verified replacement download link.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#000825] flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-[#2455E8]/10 text-[#2455E8] flex items-center justify-center text-xs font-bold">2</span>
              Live Cohort Courses & Bootcamps
            </h2>
            <p>
              We want you to feel fully confident in our curriculum. For live cohort courses:
            </p>
            <div className="bg-[#F7F9FC] p-4 rounded-xl border border-[#E5EAF2] space-y-3 text-xs">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>7-Day Course Guarantee:</strong> If within the first 7 calendar days of cohort commencement you find the course does not meet your expectations, you may request a 100% refund of the course tuition.</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#2455E8] shrink-0 mt-0.5" />
                <span><strong>Batch Rescheduling:</strong> If work or academic commitments prevent you from attending, you may request a free transfer to the next scheduled cohort batch at no additional cost.</span>
              </div>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#000825] flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-[#2455E8]/10 text-[#2455E8] flex items-center justify-center text-xs font-bold">3</span>
              Refund Processing Timeline
            </h2>
            <p>
              Approved refunds are credited back to the original source method (Bank Account via UPI, Debit Card, or Credit Card via Razorpay) within <strong>5 to 7 business days</strong> in accordance with Reserve Bank of India (RBI) payment settlement guidelines.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#000825] flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-[#2455E8]/10 text-[#2455E8] flex items-center justify-center text-xs font-bold">4</span>
              How to Request a Refund
            </h2>
            <p>
              Email <strong>support@gxacareeracademy.com</strong> with:
            </p>
            <ol className="list-decimal pl-5 space-y-1 text-xs text-[#45464E]">
              <li>Your registered email address.</li>
              <li>Order ID (e.g., ORD-GXA-...).</li>
              <li>A brief description of your request reason.</li>
            </ol>
          </section>

          <div className="pt-6 border-t border-[#ECEEF1] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#64748B]">
            <div>Support Desk Hours: Monday – Saturday, 10:00 AM – 7:00 PM IST</div>
            <button
              onClick={() => navigateTo('/contact')}
              className="text-[#2455E8] font-bold hover:underline"
            >
              Open Support Ticket →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
