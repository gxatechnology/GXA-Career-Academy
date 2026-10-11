import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Lock, Mail, User, ArrowRight, ShieldCheck } from 'lucide-react';
import { GXA_LOGO_URL } from '../data/mockData';
import { GXALogoHorizontal } from '../components/GXALogo';
import { AuthSecurityBannerGraphic } from '../components/EducationalGraphics';

export const AuthPage: React.FC = () => {
  const { login, navigateTo } = useApp();
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!email.trim() || !password.trim()) {
      setErrorMessage('Please provide both email and password.');
      return;
    }

    if (!isLoginMode && !name.trim()) {
      setErrorMessage('Please provide your full legal name for certificate issuance.');
      return;
    }

    login(email.trim(), isLoginMode ? undefined : name.trim());
    navigateTo('/dashboard');
  };

  return (
    <div className="bg-[#000825] text-white min-h-[85vh] flex items-center justify-center p-4 py-16">
      <div className="w-full max-w-md space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="flex justify-center mb-4 cursor-pointer" onClick={() => navigateTo('/')}>
            <GXALogoHorizontal theme="dark" size="md" />
          </div>
          <h1 className="text-2xl font-bold text-white">
            {isLoginMode ? 'Sign In to Your Learning Account' : 'Create Your Student Account'}
          </h1>
          <p className="text-xs text-white/60">
            {isLoginMode
              ? 'Access your enrolled courses, digital books, and verifiable certificates'
              : 'Join ambitious engineering students and technology professionals across India'}
          </p>
        </div>

        {/* Security Assurance Banner */}
        <div className="bg-[#101F45]/80 border border-white/10 rounded-2xl p-3.5 text-xs text-white/70 flex items-center gap-3">
          <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
          <span className="text-[11px] leading-relaxed">
            Personal digital library and certificates are securely encrypted and tied to your verified email.
          </span>
        </div>

        {/* Form Container */}
        <div className="bg-[#101F45]/90 border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-md space-y-5">
          {errorMessage && (
            <div className="p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            {!isLoginMode && (
              <div>
                <label className="text-white/70 block mb-1 font-semibold">Full Legal Name</label>
                <div className="relative">
                  <User className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Vikramaditya Sen"
                    className="w-full bg-[#000825] border border-white/15 rounded-xl pl-10 pr-4 py-2.5 text-white placeholder-white/30 focus:outline-none focus:border-cyan-400 transition-colors"
                  />
                </div>
                <span className="text-[10px] text-white/40 mt-1 block">
                  Used for verified completion certificates.
                </span>
              </div>
            )}

            <div>
              <label className="text-white/70 block mb-1 font-semibold">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@example.com"
                  className="w-full bg-[#000825] border border-white/15 rounded-xl pl-10 pr-4 py-2.5 text-white placeholder-white/30 focus:outline-none focus:border-cyan-400 transition-colors"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-white/70 font-semibold">Password</label>
                {isLoginMode && (
                  <span className="text-[11px] text-cyan-400 cursor-pointer hover:underline">
                    Reset Password
                  </span>
                )}
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-[#000825] border border-white/15 rounded-xl pl-10 pr-4 py-2.5 text-white placeholder-white/30 focus:outline-none focus:border-cyan-400 transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#2455E8] hover:bg-[#1B44BF] font-bold rounded-xl text-xs uppercase tracking-wider text-white shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
            >
              <span>{isLoginMode ? 'Sign In to Portal' : 'Create Account'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="text-center pt-3 border-t border-white/10 text-xs text-white/60">
            {isLoginMode ? "Don't have an account yet? " : 'Already registered? '}
            <button
              onClick={() => {
                setErrorMessage(null);
                setIsLoginMode(!isLoginMode);
              }}
              className="text-cyan-400 font-bold hover:underline ml-1 cursor-pointer"
            >
              {isLoginMode ? 'Register New Student' : 'Sign In Here'}
            </button>
          </div>
        </div>

        {/* Dedicated Auth Security Graphic */}
        <div className="pt-2">
          <AuthSecurityBannerGraphic className="w-full h-auto drop-shadow-md" />
        </div>
      </div>
    </div>
  );
};
