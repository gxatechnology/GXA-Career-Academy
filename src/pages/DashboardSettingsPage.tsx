import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { User, Mail, Shield, Bell, Key, CheckCircle } from 'lucide-react';

export const DashboardSettingsPage: React.FC = () => {
  const { user, navigateTo, showToast } = useApp();
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState('');
  const [notifyEmail, setNotifyEmail] = useState(true);
  const [notifyCourseUpdates, setNotifyCourseUpdates] = useState(true);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Profile information successfully updated! ✅');
  };

  return (
    <div className="bg-[#000825] text-white min-h-screen py-8 md:py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-white/10 pb-4 overflow-x-auto text-xs font-semibold">
          {[
            { label: 'Overview', path: '/dashboard', active: false },
            { label: 'My Digital Library', path: '/dashboard/library', active: false },
            { label: 'Enrolled Courses', path: '/dashboard/courses', active: false },
            { label: 'Orders & Receipts', path: '/dashboard/orders', active: false },
            { label: 'Profile & Settings', path: '/dashboard/settings', active: true },
          ].map((tab, idx) => (
            <button
              key={idx}
              onClick={() => navigateTo(tab.path)}
              className={`px-4 py-2 rounded-xl whitespace-nowrap transition-colors ${
                tab.active
                  ? 'bg-primary-600 text-white font-bold'
                  : 'bg-white/5 hover:bg-white/10 text-white/60 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">Profile & Account Settings</h1>
          <p className="text-xs text-white/60 mt-1">
            Manage your personal data, credentials, and notification preferences
          </p>
        </div>

        <form onSubmit={handleSave} className="space-y-6">
          <div className="bg-[#101F45]/60 border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <User className="w-4 h-4 text-cyan-400" /> Personal Information
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="text-white/70 block mb-1">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#000825] border border-white/15 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="text-white/70 block mb-1">Registered Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#000825] border border-white/15 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="text-white/70 block mb-1">Contact Phone</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-[#000825] border border-white/15 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="text-white/70 block mb-1">Account Role</label>
                <input
                  type="text"
                  disabled
                  value="Verified Student"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white/40 cursor-not-allowed"
                />
              </div>
            </div>
          </div>

          <div className="bg-[#101F45]/60 border border-white/10 rounded-3xl p-6 sm:p-8 space-y-4">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Bell className="w-4 h-4 text-cyan-400" /> Notifications & Communications
            </h2>

            <div className="space-y-3 text-xs">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifyEmail}
                  onChange={(e) => setNotifyEmail(e.target.checked)}
                  className="w-4 h-4 rounded text-cyan-500 focus:ring-0"
                />
                <span className="text-white/80">Receive email alerts for new eBook chapters and curriculum updates</span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifyCourseUpdates}
                  onChange={(e) => setNotifyCourseUpdates(e.target.checked)}
                  className="w-4 h-4 rounded text-cyan-500 focus:ring-0"
                />
                <span className="text-white/80">Receive weekly study streak reminders and prompt engineering releases</span>
              </label>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-3 bg-primary-600 hover:bg-primary-500 font-bold rounded-xl text-xs uppercase tracking-wider text-white shadow-lg transition-colors"
            >
              Save Profile Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
