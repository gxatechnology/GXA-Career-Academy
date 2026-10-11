import React from 'react';
import { useApp } from '../context/AppContext';
import { Truck, ArrowLeft, Download, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const ShippingPolicyPage: React.FC = () => {
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
          <span className="text-[#000825] font-semibold">Digital Delivery & Shipping Policy</span>
        </div>

        {/* Header */}
        <div className="bg-white p-8 rounded-2xl border border-[#E5EAF2] shadow-xs">
          <div className="inline-flex items-center gap-1.5 bg-[#DDE1FF] text-[#144CE0] px-3 py-1 rounded-md text-xs font-bold uppercase mb-3">
            <Truck className="w-3.5 h-3.5" /> Instant Delivery
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-[#000825] tracking-tight">
            Digital Delivery & Shipping Policy
          </h1>
          <p className="text-xs text-[#64748B] mt-2">
            Last Updated: {new Date().toLocaleDateString('en-IN', { month: 'long', day: 'numeric', year: 'numeric' })} • Instant Electronic Delivery Across All Indian States & UTs
          </p>
          <p className="text-sm text-[#45464E] mt-4 leading-relaxed">
            GXA Career Academy exclusively provides <strong>100% digital educational products and live virtual training</strong>. We do not dispatch physical parcels or printed paper books via postal courier.
          </p>
        </div>

        {/* Content Sections */}
        <div className="bg-white p-8 rounded-2xl border border-[#E5EAF2] shadow-xs space-y-8 text-sm text-[#45464E] leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#000825] flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-[#2455E8]/10 text-[#2455E8] flex items-center justify-center text-xs font-bold">1</span>
              Immediate Electronic Fulfillment (Zero Shipping Cost)
            </h2>
            <p>
              Since all catalog items are digital, <strong>shipping charges are always ₹0 (Free)</strong>. Delivery is executed in real-time across three synchronized channels:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="bg-[#F7F9FC] p-4 rounded-xl border border-[#E5EAF2]">
                <div className="font-bold text-[#000825] mb-1 flex items-center gap-1.5">
                  <Download className="w-4 h-4 text-[#2455E8]" /> On-Screen Access
                </div>
                <div>Instant PDF download button displayed immediately on your order confirmation page.</div>
              </div>
              <div className="bg-[#F7F9FC] p-4 rounded-xl border border-[#E5EAF2]">
                <div className="font-bold text-[#000825] mb-1 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#2455E8]" /> Student Bookshelf
                </div>
                <div>Permanent addition to your personal dashboard under &quot;My Digital Library&quot;.</div>
              </div>
              <div className="bg-[#F7F9FC] p-4 rounded-xl border border-[#E5EAF2]">
                <div className="font-bold text-[#000825] mb-1 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#2455E8]" /> Email Confirmation
                </div>
                <div>Automated tax invoice and backup download links dispatched to your inbox within seconds.</div>
              </div>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#000825] flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-[#2455E8]/10 text-[#2455E8] flex items-center justify-center text-xs font-bold">2</span>
              Course Activation Timelines
            </h2>
            <p>
              When enrolling in cohort courses or self-paced masterclasses, course credentials and access to the lesson player are activated instantaneously upon payment verification. You will receive immediate dashboard access to prep materials and video players.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#000825] flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-[#2455E8]/10 text-[#2455E8] flex items-center justify-center text-xs font-bold">3</span>
              Troubleshooting Delivery Issues
            </h2>
            <p>
              If you have successfully made a payment but have not received your download link or confirmation email within 5 minutes:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs text-[#45464E]">
              <li>Check your Spam / Promotions folders for an email from <code>notifications@gxacareeracademy.com</code>.</li>
              <li>Log in to your account and visit <code>/dashboard/library</code> to see if the title appears.</li>
              <li>Contact our helpdesk at <strong>orders@gxacareeracademy.com</strong> with your UPI reference or Razorpay payment ID.</li>
            </ul>
          </section>

          <div className="pt-6 border-t border-[#ECEEF1] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#64748B]">
            <div>Delivery Partner: Automated Cloud Delivery Infrastructure (AWS / GCP CDN)</div>
            <button
              onClick={() => navigateTo('/contact')}
              className="text-[#2455E8] font-bold hover:underline"
            >
              Contact Order Support →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
