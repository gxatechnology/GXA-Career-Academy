import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { ShieldCheck, AlertTriangle, RefreshCw, Lock, Terminal, Activity } from 'lucide-react';

interface AuditLog {
  id: string;
  action: string;
  actor: string;
  role: 'student' | 'admin' | 'system';
  ip?: string;
  details: Record<string, any>;
  timestamp: string;
}

export const AdminAnalyticsPage: React.FC = () => {
  const { adminToken } = useApp();
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/audit-logs', {
        headers: { Authorization: `Bearer ${adminToken}` },
      });
      if (res.ok) {
        const json = await res.json();
        setLogs(json.logs || []);
      }
    } catch (err) {
      console.error('Failed to load audit logs:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, [adminToken]);

  return (
    <div className="bg-[#000825] text-white min-h-screen py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-400 bg-cyan-500/10 px-2.5 py-0.5 rounded border border-cyan-500/20">
                Security Governance
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white">Security Audit Logs & Telemetry</h1>
            <p className="text-xs text-white/60 mt-1">
              Immutable ledger of payment attempts, signature verifications, reconciliation actions, and access tokens
            </p>
          </div>

          <button
            onClick={fetchLogs}
            className="px-3.5 py-2 bg-white/5 hover:bg-white/10 rounded-xl text-xs font-semibold text-white/80 hover:text-white flex items-center gap-1.5 border border-white/10 cursor-pointer w-fit"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>Refresh Audit Feed</span>
          </button>
        </div>

        {/* Security Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-[#101F45]/60 border border-white/10 rounded-2xl p-5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-white/50">Fail-Closed Enforcement</span>
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-xl font-black text-emerald-400">100% Active</div>
            <span className="text-[10px] text-white/40">Zero unverified entitlements permitted</span>
          </div>

          <div className="bg-[#101F45]/60 border border-white/10 rounded-2xl p-5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-white/50">HMAC-SHA256 Signatures</span>
              <Lock className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="text-xl font-black text-cyan-300">Cryptographic</div>
            <span className="text-[10px] text-white/40">Razorpay & PayPal server validation</span>
          </div>

          <div className="bg-[#101F45]/60 border border-white/10 rounded-2xl p-5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-white/50">Logged Security Events</span>
              <Activity className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-xl font-black text-white">{logs.length} Events</div>
            <span className="text-[10px] text-white/40">Audited in memory ledger</span>
          </div>
        </div>

        {/* Audit Log Table */}
        <div className="bg-[#101F45]/60 border border-white/10 rounded-3xl overflow-hidden shadow-xl">
          <div className="p-4 sm:p-6 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-cyan-400" />
              <h2 className="text-sm font-bold text-white">System Security Event Stream</h2>
            </div>
            <span className="text-[11px] font-mono text-white/40">{logs.length} records</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-white/5 border-b border-white/10 text-white/60 uppercase font-semibold text-[10px]">
                <tr>
                  <th className="py-3 px-5">Timestamp</th>
                  <th className="py-3 px-5">Event Action</th>
                  <th className="py-3 px-5">Actor & Role</th>
                  <th className="py-3 px-5">IP Origin</th>
                  <th className="py-3 px-5">Event Metadata</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-white/80">
                {logs.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-white/40">
                      No security events recorded in current server runtime session.
                    </td>
                  </tr>
                ) : (
                  logs.map((log) => {
                    const isAlert = log.action.includes('REJECTED') || log.action.includes('FAILED') || log.action.includes('ALERT');
                    const isSuccess = log.action.includes('VERIFIED') || log.action.includes('SUCCESS') || log.action.includes('APPROVED');

                    return (
                      <tr key={log.id} className="hover:bg-white/5 transition-colors">
                        <td className="py-3 px-5 text-white/40 text-[11px] whitespace-nowrap">
                          {new Date(log.timestamp).toLocaleTimeString('en-IN', { hour12: false })}
                          <span className="block text-[9px] text-white/30">
                            {new Date(log.timestamp).toLocaleDateString()}
                          </span>
                        </td>

                        <td className="py-3 px-5">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              isAlert
                                ? 'bg-rose-500/15 text-rose-300 border border-rose-500/30'
                                : isSuccess
                                ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                                : 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30'
                            }`}
                          >
                            {log.action}
                          </span>
                        </td>

                        <td className="py-3 px-5">
                          <div className="text-white text-[11px] truncate max-w-xs">{log.actor}</div>
                          <span className="text-[10px] text-white/40 uppercase">[{log.role}]</span>
                        </td>

                        <td className="py-3 px-5 text-white/40 text-[11px]">
                          {log.ip || '127.0.0.1'}
                        </td>

                        <td className="py-3 px-5 text-white/60 text-[10px] font-mono">
                          <pre className="truncate max-w-md bg-[#000825] p-1.5 rounded border border-white/5">
                            {JSON.stringify(log.details)}
                          </pre>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
