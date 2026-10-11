import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ShieldCheck, Lock, Mail, Key, AlertTriangle, ArrowRight, RefreshCw, Eye, EyeOff } from 'lucide-react';
import { GXA_LOGO_URL } from '../data/mockData';

export const AdminLoginPage: React.FC = () => {
  const { adminLogin, navigateTo } = useApp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mfaCode, setMfaCode] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setLoading(true);

    try {
      const result = await adminLogin(email, password, mfaCode);
      if (!result.success) {
        setErrorMessage(result.error || 'Authentication denied. Verify credentials.');
      } else {
        navigateTo('/admin');
      }
    } catch {
      setErrorMessage('Security gateway communication error.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#000825] text-white min-h-screen flex items-center justify-center p-4 py-16 selection:bg-cyan-500 selection:text-black">
      <div className="w-full max-w-md space-y-6">
        {/* Security Shield Header */}
        <div className="text-center space-y-2">
          <div className="flex justify-center mb-3">
            <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-lg shadow-cyan-950/50">
              <ShieldCheck className="w-8 h-8" />
            </div>
          </div>
          <div className="flex items-center justify-center gap-2">
            <img src={GXA_LOGO_URL} alt="GXA Logo" className="h-6 w-auto object-contain" />
            <span className="font-display font-bold text-lg text-white">GXA Career Academy</span>
          </div>
          <h1 className="text-xl font-black text-white uppercase tracking-wider text-xs">
            Internal Operations Console
          </h1>
          <p className="text-xs text-white/50">
            Dedicated Administrative Verification Gateway
          </p>
        </div>

        {/* Security Alert Banner */}
        <div className="bg-amber-950/30 border border-amber-500/30 rounded-2xl p-3.5 text-xs text-amber-200/90 flex items-start gap-3">
          <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <div className="leading-relaxed text-[11px]">
            <strong>Authorized Personnel Only:</strong> Public access to this portal is prohibited. Session activity and IP telemetry are audited.
          </div>
        </div>

        {/* Login Form Container */}
        <div className="bg-[#101F45]/90 border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-md space-y-6">
          {errorMessage && (
            <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-xs text-rose-300 flex items-center gap-2.5">
              <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="text-white/70 block mb-1.5 font-medium">Administrator Email</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  placeholder="admin@gxacareeracademy.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#000825] border border-white/15 rounded-xl pl-10 pr-4 py-2.5 text-white placeholder-white/30 focus:outline-none focus:border-cyan-400 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="text-white/70 block mb-1.5 font-medium">Master Security Password</label>
              <div className="relative">
                <Key className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#000825] border border-white/15 rounded-xl pl-10 pr-10 py-2.5 text-white placeholder-white/30 focus:outline-none focus:border-cyan-400 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="text-white/70 block mb-1.5 font-medium">
                MFA / Hardware Security Token <span className="text-white/40">(Optional)</span>
              </label>
              <input
                type="text"
                placeholder="6-Digit OTP / FIDO2 Token"
                value={mfaCode}
                onChange={(e) => setMfaCode(e.target.value)}
                className="w-full bg-[#000825] border border-white/15 rounded-xl px-4 py-2 text-white placeholder-white/30 focus:outline-none focus:border-cyan-400 font-mono"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-cyan-950/40 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-2"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  <span>Authenticate Session</span>
                </>
              )}
            </button>
          </form>

          <div className="pt-2 border-t border-white/10 text-center">
            <button
              onClick={() => navigateTo('/')}
              className="text-[11px] text-white/50 hover:text-white transition-colors"
            >
              Return to GXA Career Academy Public Site
            </button>
          </div>
        </div>

        <p className="text-[10px] text-white/30 text-center leading-relaxed">
          GXA Technology Security Core • Role-Based Access Control • FIPS Compliant Hashing
        </p>
      </div>
    </div>
  );
};
