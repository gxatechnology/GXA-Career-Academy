import React, { useEffect, useState } from 'react';
import { useApp } from '../context/AppContext';
import { BookOpen, Video, Users, DollarSign, TrendingUp, ShoppingCart, Plus, ArrowRight, ShieldCheck, AlertTriangle, RefreshCw } from 'lucide-react';

interface AdminOverviewData {
  metrics: {
    totalRevenue: number;
    verifiedOrdersCount: number;
    unverifiedOrdersCount: number;
    pendingOrdersCount: number;
    activeEntitlementsCount: number;
  };
  recentOrders: any[];
}

export const AdminOverviewPage: React.FC = () => {
  const { ebooks, courses, navigateTo, adminToken } = useApp();
  const [data, setData] = useState<AdminOverviewData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchOverview = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/overview', {
        headers: { Authorization: `Bearer ${adminToken}` },
      });
      if (res.ok) {
        const json = await res.json();
        setData(json);
      }
    } catch (err) {
      console.error('Failed to load admin overview:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOverview();
  }, [adminToken]);

  const verifiedRevenue = data?.metrics.totalRevenue || 0;
  const verifiedOrdersCount = data?.metrics.verifiedOrdersCount || 0;
  const flaggedCount = data?.metrics.unverifiedOrdersCount || 0;
  const pendingCount = data?.metrics.pendingOrdersCount || 0;
  const entitlementsCount = data?.metrics.activeEntitlementsCount || 0;

  return (
    <div className="bg-[#000825] text-white min-h-screen py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-400 bg-cyan-500/10 px-2.5 py-0.5 rounded border border-cyan-500/20">
                Operations Telemetry & Governance
              </span>
              <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" /> Fail-Closed Active
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white">Operations Command Center</h1>
            <p className="text-xs text-white/60">
              Verified financial metrics, cryptographic settlement tracking, and catalog controls
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigateTo('/admin/ebooks/new')}
              className="px-4 py-2 bg-[#2455E8] hover:bg-[#1B44BF] rounded-xl text-xs font-bold text-white flex items-center gap-1.5 shadow cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" /> Add New eBook
            </button>
            <button
              onClick={() => navigateTo('/admin/courses/new')}
              className="px-4 py-2 bg-[#5848E5] hover:bg-[#4837D5] rounded-xl text-xs font-bold text-white flex items-center gap-1.5 shadow cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" /> Add New Course
            </button>
          </div>
        </div>

        {/* Security & Reconciliation Notice */}
        {flaggedCount > 0 && (
          <div className="bg-amber-950/30 border border-amber-500/40 rounded-2xl p-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-xs text-amber-200">
              <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />
              <div>
                <strong>Reconciliation Notice:</strong> {flaggedCount} historical or test orders flagged for administrative review. Verified revenue excludes unconfirmed transactions.
              </div>
            </div>
            <button
              onClick={() => navigateTo('/admin/orders')}
              className="px-3.5 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold rounded-lg whitespace-nowrap transition-colors cursor-pointer"
            >
              Review in Orders
            </button>
          </div>
        )}

        {/* Key KPI Metrics (Grounded in Verified Server Data) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              label: 'Verified Bank Revenue',
              value: `₹${verifiedRevenue.toLocaleString('en-IN')}`,
              sub: `${verifiedOrdersCount} Verified Orders`,
              icon: DollarSign,
              highlight: true,
            },
            {
              label: 'Active Entitlements',
              value: entitlementsCount.toString(),
              sub: 'Protected Access Tokens',
              icon: Users,
            },
            {
              label: 'Catalogue eBooks',
              value: ebooks.length.toString(),
              sub: 'Digital Monographs & Playbooks',
              icon: BookOpen,
            },
            {
              label: 'Curriculum Masterclasses',
              value: courses.length.toString(),
              sub: 'Self-Paced & Live Cohorts',
              icon: Video,
            },
          ].map((kpi, idx) => (
            <div
              key={idx}
              className={`bg-[#101F45]/60 border rounded-2xl p-5 space-y-2 ${
                kpi.highlight ? 'border-cyan-500/40 bg-gradient-to-br from-[#101F45] to-cyan-950/20' : 'border-white/10'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-white/50">{kpi.label}</span>
                <kpi.icon className="w-4 h-4 text-cyan-400" />
              </div>
              <div className="font-display text-2xl font-black text-white">{kpi.value}</div>
              <span className="text-[10px] text-white/40 block">{kpi.sub}</span>
            </div>
          ))}
        </div>

        {/* Quick Operations Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div
            onClick={() => navigateTo('/admin/orders')}
            className="bg-[#101F45]/50 border border-white/10 hover:border-cyan-500/40 rounded-2xl p-5 cursor-pointer transition-all space-y-2"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white">Orders & Reconciliation</span>
              <ArrowRight className="w-4 h-4 text-cyan-400" />
            </div>
            <p className="text-[11px] text-white/60">
              Audit payments, confirm bank clearance, and manage refunds or test classifications.
            </p>
          </div>

          <div
            onClick={() => navigateTo('/admin/analytics')}
            className="bg-[#101F45]/50 border border-white/10 hover:border-cyan-500/40 rounded-2xl p-5 cursor-pointer transition-all space-y-2"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white">Security Audit Logs</span>
              <ArrowRight className="w-4 h-4 text-cyan-400" />
            </div>
            <p className="text-[11px] text-white/60">
              Inspect cryptographic signature attempts, download link generations, and rate limit blocks.
            </p>
          </div>

          <div
            onClick={() => navigateTo('/admin/settings')}
            className="bg-[#101F45]/50 border border-white/10 hover:border-cyan-500/40 rounded-2xl p-5 cursor-pointer transition-all space-y-2"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white">Gateway & System Settings</span>
              <ArrowRight className="w-4 h-4 text-cyan-400" />
            </div>
            <p className="text-[11px] text-white/60">
              Inspect Razorpay, PayPal, and UPI QR gateway health, and fail-closed security rules.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
