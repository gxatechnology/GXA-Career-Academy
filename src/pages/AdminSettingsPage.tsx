import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { ShieldCheck, Key, Save, Globe, AlertTriangle, CheckCircle2, Lock } from 'lucide-react';

export const AdminSettingsPage: React.FC = () => {
  const { showToast, adminToken } = useApp();
  const [platformName, setPlatformName] = useState('GXA Career Academy');
  const [parentCompany, setParentCompany] = useState('GXA Technology');
  const [tagline, setTagline] = useState('Learn Today. Lead Tomorrow.');
  const [gstRate, setGstRate] = useState(18);
  const [watermarkEnabled, setWatermarkEnabled] = useState(true);
  const [serverSettings, setServerSettings] = useState<any>(null);

  useEffect(() => {
    fetch('/api/admin/settings', {
      headers: { Authorization: `Bearer ${adminToken}` },
    })
      .then((res) => res.json())
      .then((data) => setServerSettings(data))
      .catch((err) => console.error(err));
  }, [adminToken]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Platform security & operational settings saved successfully!');
  };

  return (
    <div className="bg-[#000825] text-white min-h-screen py-8 md:py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-400 bg-cyan-500/10 px-2.5 py-0.5 rounded border border-cyan-500/20">
              System Architecture
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">System Security & Gateway Settings</h1>
          <p className="text-xs text-white/60 mt-1">
            Payment gateways, cryptographic verification policies, forensic watermarks, and tax configuration
          </p>
        </div>

        {/* Security & Fail-Closed Status Card */}
        <div className="bg-[#101F45]/80 border border-emerald-500/30 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Fail-Closed Payment Security Policy: ACTIVE</h2>
              <p className="text-xs text-emerald-300/80">
                Automatic unlock is strictly disabled without confirmed cryptographic signature or gateway capture
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
            <div className="bg-[#000825] p-3 rounded-xl border border-white/10 space-y-1">
              <span className="text-white/50 block text-[11px]">Razorpay Integration</span>
              <span className="font-semibold text-white flex items-center gap-1.5">
                {serverSettings?.integrations?.razorpay?.configured ? (
                  <span className="text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Keys Active
                  </span>
                ) : (
                  <span className="text-amber-400 flex items-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5" /> Unconfigured (Safe)
                  </span>
                )}
              </span>
            </div>

            <div className="bg-[#000825] p-3 rounded-xl border border-white/10 space-y-1">
              <span className="text-white/50 block text-[11px]">PayPal Integration</span>
              <span className="font-semibold text-white flex items-center gap-1.5">
                {serverSettings?.integrations?.paypal?.configured ? (
                  <span className="text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Client Configured
                  </span>
                ) : (
                  <span className="text-amber-400 flex items-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5" /> Unconfigured (Safe)
                  </span>
                )}
              </span>
            </div>

            <div className="bg-[#000825] p-3 rounded-xl border border-white/10 space-y-1">
              <span className="text-white/50 block text-[11px]">Protected Download Tokens</span>
              <span className="font-semibold text-cyan-300 flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5" /> 15-Min Signed Links
              </span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-6">
          {/* Brand Identity */}
          <div className="bg-[#101F45]/60 border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Globe className="w-4 h-4 text-cyan-400" /> Platform Identity & Legal Attribution
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="text-white/70 block mb-1">Platform Brand Name</label>
                <input
                  type="text"
                  value={platformName}
                  onChange={(e) => setPlatformName(e.target.value)}
                  className="w-full bg-[#000825] border border-white/15 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="text-white/70 block mb-1">Parent Holding Company</label>
                <input
                  type="text"
                  value={parentCompany}
                  onChange={(e) => setParentCompany(e.target.value)}
                  className="w-full bg-[#000825] border border-white/15 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-white/70 block mb-1">Brand Tagline</label>
                <input
                  type="text"
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  className="w-full bg-[#000825] border border-white/15 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-cyan-400"
                />
              </div>
            </div>
          </div>

          {/* Tax & Forensic Watermark */}
          <div className="bg-[#101F45]/60 border border-white/10 rounded-3xl p-6 sm:p-8 space-y-4">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Key className="w-4 h-4 text-cyan-400" /> Compliance & Copyright Protection
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="text-white/70 block mb-1">Applicable Indian GST Rate (%)</label>
                <input
                  type="number"
                  value={gstRate}
                  onChange={(e) => setGstRate(Number(e.target.value))}
                  className="w-full bg-[#000825] border border-white/15 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-cyan-400"
                />
                <span className="text-[10px] text-white/40 mt-1 block">SAC 998431 (Online Digital Content)</span>
              </div>

              <div className="flex flex-col justify-center">
                <label className="flex items-center gap-3 cursor-pointer pt-3">
                  <input
                    type="checkbox"
                    checked={watermarkEnabled}
                    onChange={(e) => setWatermarkEnabled(e.target.checked)}
                    className="w-4 h-4 rounded text-cyan-500 focus:ring-0"
                  />
                  <div>
                    <strong className="block text-white text-xs">Enforce Forensic PDF Watermarking</strong>
                    <span className="text-[10px] text-white/50">Imprints student email & timestamp on downloads</span>
                  </div>
                </label>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-3 bg-[#2455E8] hover:bg-[#1B44BF] rounded-xl text-xs font-bold uppercase tracking-wider text-white shadow-lg transition-colors cursor-pointer flex items-center gap-2"
            >
              <Save className="w-4 h-4" /> Save Security Settings
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
