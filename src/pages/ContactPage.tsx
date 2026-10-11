import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Mail, Phone, MapPin, Send, MessageSquare, Clock, CheckCircle } from 'lucide-react';
import { ContactSupportHubGraphic } from '../components/EducationalGraphics';

export const ContactPage: React.FC = () => {
  const { showToast } = useApp();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Course & eBook Inquiries',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    showToast('Your message has been received! Our support team will respond within 4 hours.');
  };

  return (
    <div className="bg-[#000825] text-white min-h-screen py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
            <MessageSquare className="w-3.5 h-3.5" /> Direct Support & Enterprise
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight">
            Connect With GXA Career Academy
          </h1>
          <p className="text-white/70 text-base md:text-lg">
            Have questions about digital book delivery, course certifications, corporate training licenses, or author partnerships?
          </p>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Details */}
          <div className="space-y-6">
            <div className="bg-[#101F45]/60 border border-white/10 rounded-3xl p-8 space-y-6">
              <h3 className="text-xl font-bold text-white">Contact Information</h3>

              <div className="space-y-4 text-sm">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-white/50 block">Official Support Email</span>
                    <a href="mailto:support@gxacareeracademy.com" className="text-white font-medium hover:text-cyan-400">
                      support@gxacareeracademy.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary-500/10 text-primary-400 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-white/50 block">Student Helpline (India)</span>
                    <span className="text-white font-medium">+91 98765 43210</span>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-white/50 block">GXA Technology Headquarters</span>
                    <span className="text-white font-medium">Cyber City, Gurugram, NCR Delhi, India</span>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-white/50 block">Operating Hours</span>
                    <span className="text-white font-medium">Monday – Saturday: 9:00 AM – 7:00 PM IST</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-primary-950/80 to-indigo-950/80 border border-white/10 rounded-3xl p-6">
              <h4 className="text-sm font-bold text-white mb-2">Instant WhatsApp Assistance</h4>
              <p className="text-xs text-white/60 mb-4">Chat with our admission counsellors on WhatsApp for fast guidance.</p>
              <button
                onClick={() => showToast('Opening WhatsApp support helpline...')}
                className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-600 font-bold text-white rounded-xl text-xs transition-colors"
              >
                Chat on WhatsApp (+91 98765 43210)
              </button>
            </div>

            <div className="pt-2">
              <ContactSupportHubGraphic className="w-full h-auto drop-shadow-md" />
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-2 bg-[#101F45]/60 border border-white/10 rounded-3xl p-8 lg:p-12">
            {isSubmitted ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-white">Inquiry Received Successfully!</h3>
                <p className="text-sm text-white/60 max-w-md mx-auto">
                  Thank you for reaching out. A senior learning advisor will review your query and connect via email or phone shortly.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="px-6 py-2.5 bg-primary-600 hover:bg-primary-500 text-white rounded-xl text-xs font-bold"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="text-xs font-semibold text-white/70 block mb-2">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Priya Sharma"
                      className="w-full bg-[#000825] border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-cyan-400"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-white/70 block mb-2">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. priya@gmail.com"
                      className="w-full bg-[#000825] border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="text-xs font-semibold text-white/70 block mb-2">Phone Number</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 9876543210"
                      className="w-full bg-[#000825] border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-cyan-400"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-white/70 block mb-2">Topic / Area of Interest</label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full bg-[#000825] border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-cyan-400"
                    >
                      <option>Course & eBook Inquiries</option>
                      <option>Payment & Invoice Issue</option>
                      <option>Corporate / Institutional Licensing</option>
                      <option>Author & Mentor Partnership</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-white/70 block mb-2">Your Detailed Message *</label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe how we can assist you..."
                    className="w-full bg-[#000825] border border-white/15 rounded-xl p-4 text-sm text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-primary-600 to-indigo-600 hover:opacity-90 font-bold rounded-xl text-xs uppercase tracking-wider text-white shadow-lg transition-all"
                >
                  Submit Inquiry
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
