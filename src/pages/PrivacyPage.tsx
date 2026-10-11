import React from 'react';
import { useApp } from '../context/AppContext';
import { ShieldCheck, ArrowLeft, Lock, CheckCircle2 } from 'lucide-react';

export const PrivacyPage: React.FC = () => {
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
          <span className="text-[#000825] font-semibold">Privacy Policy</span>
        </div>

        {/* Header */}
        <div className="bg-white p-8 rounded-2xl border border-[#E5EAF2] shadow-xs">
          <div className="inline-flex items-center gap-1.5 bg-[#DDE1FF] text-[#144CE0] px-3 py-1 rounded-md text-xs font-bold uppercase mb-3">
            <Lock className="w-3.5 h-3.5" /> Data Protection
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-[#000825] tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-xs text-[#64748B] mt-2">
            Last Updated: {new Date().toLocaleDateString('en-IN', { month: 'long', day: 'numeric', year: 'numeric' })} • Compliance with Digital Personal Data Protection Act (DPDP Act, India)
          </p>
          <p className="text-sm text-[#45464E] mt-4 leading-relaxed">
            GXA Career Academy, operated by <strong>GXA Technology</strong>, is committed to safeguarding your personal data and digital privacy. This policy details how we collect, store, process, and protect information when you browse our platform, purchase digital learning materials, or interact with our services.
          </p>
        </div>

        {/* Content Sections */}
        <div className="bg-white p-8 rounded-2xl border border-[#E5EAF2] shadow-xs space-y-8 text-sm text-[#45464E] leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#000825] flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-[#2455E8]/10 text-[#2455E8] flex items-center justify-center text-xs font-bold">1</span>
              Information We Collect
            </h2>
            <p>We collect only the essential information needed to fulfill digital learning orders and enhance your user experience:</p>
            <ul className="list-disc pl-5 space-y-1 text-xs">
              <li><strong>Contact & Account Data:</strong> Name, academic or corporate email address, mobile number (for SMS/WhatsApp order confirmations).</li>
              <li><strong>Transaction Telemetry:</strong> Transaction ID, order total in INR, and payment status returned by Razorpay or UPI gateways. We never store credit/debit card numbers or UPI PINs on our servers.</li>
              <li><strong>Academic Progress:</strong> Lesson completion status, quiz attempts, and digital certificate hashes issued in your name.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#000825] flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-[#2455E8]/10 text-[#2455E8] flex items-center justify-center text-xs font-bold">2</span>
              How We Use Your Information
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="bg-[#F7F9FC] p-3 rounded-xl border border-[#E5EAF2]">
                <div className="font-bold text-[#000825] mb-1">Fulfillment & Access</div>
                <div>Generating secured PDF download links and activating your digital bookshelf.</div>
              </div>
              <div className="bg-[#F7F9FC] p-3 rounded-xl border border-[#E5EAF2]">
                <div className="font-bold text-[#000825] mb-1">Legal Invoicing & GST</div>
                <div>Issuing verifiable tax invoices under the Ministry of Corporate Affairs regulations.</div>
              </div>
              <div className="bg-[#F7F9FC] p-3 rounded-xl border border-[#E5EAF2]">
                <div className="font-bold text-[#000825] mb-1">Curriculum Updates</div>
                <div>Notifying you when new chapters, errata, or code repositories are released.</div>
              </div>
              <div className="bg-[#F7F9FC] p-3 rounded-xl border border-[#E5EAF2]">
                <div className="font-bold text-[#000825] mb-1">Fraud Prevention</div>
                <div>Detecting anomalous login attempts and preventing unauthorized file distribution.</div>
              </div>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#000825] flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-[#2455E8]/10 text-[#2455E8] flex items-center justify-center text-xs font-bold">3</span>
              Data Protection & Zero-Selling Guarantee
            </h2>
            <p>
              <strong>We never sell, rent, or trade your personal information to third-party advertisers or lead-generation brokers.</strong> Data is shared only with verified service providers essential to operations (e.g., Razorpay for payment processing, AWS/GCP for encrypted file hosting).
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#000825] flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-[#2455E8]/10 text-[#2455E8] flex items-center justify-center text-xs font-bold">4</span>
              Your Rights Under Indian DPDP Act
            </h2>
            <p>
              You maintain the absolute right to request access to your recorded data, correction of inaccurate details, or permanent deletion of your account and learning telemetry by emailing our Data Grievance Officer at <strong>privacy@gxacareeracademy.com</strong>.
            </p>
          </section>

          <div className="pt-6 border-t border-[#ECEEF1] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#64748B]">
            <div>Data Grievance Officer: GXA Technology, New Delhi, India</div>
            <button
              onClick={() => navigateTo('/contact')}
              className="text-[#2455E8] font-bold hover:underline"
            >
              Contact Privacy Team →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
