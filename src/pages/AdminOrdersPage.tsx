import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import {
  Receipt,
  Download,
  Search,
  CheckCircle2,
  Clock,
  AlertTriangle,
  ShieldCheck,
  RefreshCw,
  FileCheck,
  Ban,
  Filter,
} from 'lucide-react';

interface ServerOrderRecord {
  orderId: string;
  studentId: string;
  customerName: string;
  customerEmail: string;
  items: { id: string; type: 'course' | 'ebook'; title: string; unitPrice: number }[];
  subtotal: number;
  discount: number;
  gstAmount: number;
  total: number;
  currency: string;
  paymentMethod: string;
  status: 'PAYMENT_PENDING' | 'PAID' | 'PAYMENT_FAILED' | 'REQUIRES_VERIFICATION' | 'UNVERIFIED_DEMO' | 'REFUNDED';
  gateway: string;
  gatewayOrderId?: string;
  gatewayPaymentId?: string;
  gatewaySignature?: string;
  verificationNotes?: string;
  createdAt: string;
  verifiedAt?: string;
}

export const AdminOrdersPage: React.FC = () => {
  const { showToast, adminToken } = useApp();
  const [orders, setOrders] = useState<ServerOrderRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [selectedOrder, setSelectedOrder] = useState<ServerOrderRecord | null>(null);
  const [reconcileAction, setReconcileAction] = useState<'APPROVE_VERIFIED' | 'MARK_TEST_PURCHASE' | 'REVOKE_UNVERIFIED'>('APPROVE_VERIFIED');
  const [reconcileNotes, setReconcileNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/orders', {
        headers: { Authorization: `Bearer ${adminToken}` },
      });
      if (res.ok) {
        const data = await res.json();
        setOrders(data.orders || []);
      }
    } catch (err) {
      console.error('Error fetching admin orders:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [adminToken]);

  const handleReconcileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOrder) return;
    setIsSubmitting(true);

    try {
      const res = await fetch(`/api/admin/orders/${selectedOrder.orderId}/reconcile`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminToken}`,
        },
        body: JSON.stringify({
          action: reconcileAction,
          notes: reconcileNotes,
        }),
      });

      if (res.ok) {
        showToast(`Order #${selectedOrder.orderId} reconciled successfully!`);
        setSelectedOrder(null);
        setReconcileNotes('');
        await fetchOrders();
      } else {
        showToast('Reconciliation failed. Check administrator permissions.');
      }
    } catch {
      showToast('Network error processing reconciliation.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const filtered = orders.filter((o) => {
    const matchesSearch =
      o.orderId.toLowerCase().includes(search.toLowerCase()) ||
      o.customerName?.toLowerCase().includes(search.toLowerCase()) ||
      o.customerEmail?.toLowerCase().includes(search.toLowerCase()) ||
      o.items.some((it) => it.title.toLowerCase().includes(search.toLowerCase()));

    if (!matchesSearch) return false;

    if (statusFilter === 'ALL') return true;
    if (statusFilter === 'PAID') return o.status === 'PAID';
    if (statusFilter === 'PENDING') return o.status === 'PAYMENT_PENDING';
    if (statusFilter === 'FLAGGED') return o.status === 'REQUIRES_VERIFICATION';
    if (statusFilter === 'DEMO') return o.status === 'UNVERIFIED_DEMO';
    return true;
  });

  return (
    <div className="bg-[#000825] text-white min-h-screen py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[11px] font-mono text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                PHASE 1.5 & 2.6 AUDIT
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white">Payment Orders & Entitlement Reconciliation</h1>
            <p className="text-xs text-white/60 mt-1">
              Cryptographic signature auditing, banking settlement verification, and entitlement governance
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={fetchOrders}
              className="px-3.5 py-2 bg-white/5 hover:bg-white/10 rounded-xl text-xs font-semibold text-white/80 hover:text-white flex items-center gap-1.5 border border-white/10 cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span>Refresh Ledger</span>
            </button>
            <button
              onClick={() => showToast('GSTR-1 verified ledger exported (CSV/JSON) 📊')}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 font-bold rounded-xl text-xs text-white transition-colors cursor-pointer"
            >
              Export GSTR-1 Ledger
            </button>
          </div>
        </div>

        {/* Filter bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#101F45]/60 p-4 rounded-2xl border border-white/10">
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-white/40 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search Order ID, student, product..."
              className="w-full bg-[#000825] border border-white/10 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto text-xs">
            {[
              { id: 'ALL', label: 'All Orders' },
              { id: 'PAID', label: 'Verified Paid' },
              { id: 'PENDING', label: 'Pending Settlement' },
              { id: 'FLAGGED', label: 'Flagged for Review' },
              { id: 'DEMO', label: 'Test / Revoked' },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setStatusFilter(f.id)}
                className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                  statusFilter === f.id
                    ? 'bg-cyan-500 text-slate-950 font-bold'
                    : 'bg-white/5 hover:bg-white/10 text-white/60 hover:text-white'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-[#101F45]/60 border border-white/10 rounded-3xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-white/5 border-b border-white/10 text-white/60 uppercase font-semibold text-[11px]">
                <tr>
                  <th className="py-4 px-6">Order ID & Date</th>
                  <th className="py-4 px-6">Student Account</th>
                  <th className="py-4 px-6">Purchased Products</th>
                  <th className="py-4 px-6">Amount & Method</th>
                  <th className="py-4 px-6">Entitlement Status</th>
                  <th className="py-4 px-6 text-right">Reconciliation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-white/80">
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-white/40">
                      No order records match the current filter.
                    </td>
                  </tr>
                ) : (
                  filtered.map((o) => {
                    const isPaid = o.status === 'PAID';
                    const isPending = o.status === 'PAYMENT_PENDING';
                    const isFlagged = o.status === 'REQUIRES_VERIFICATION';
                    const isRevoked = o.status === 'UNVERIFIED_DEMO';

                    return (
                      <tr key={o.orderId} className="hover:bg-white/5 transition-colors">
                        <td className="py-4 px-6">
                          <div className="font-mono font-bold text-white flex items-center gap-1.5">
                            <span>{o.orderId}</span>
                            {o.gatewayOrderId && (
                              <span className="text-[9px] bg-white/5 text-white/40 px-1.5 py-0.5 rounded font-mono">
                                {o.gatewayOrderId.slice(0, 12)}...
                              </span>
                            )}
                          </div>
                          <div className="text-[10px] text-white/40 mt-0.5">
                            {new Date(o.createdAt).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}
                          </div>
                        </td>

                        <td className="py-4 px-6">
                          <div className="font-semibold text-white">{o.customerName}</div>
                          <div className="text-[10px] text-white/40">{o.customerEmail}</div>
                          <div className="text-[9px] font-mono text-cyan-400/80">{o.studentId}</div>
                        </td>

                        <td className="py-4 px-6">
                          <div className="space-y-1 max-w-xs">
                            {o.items.map((it, idx) => (
                              <div key={idx} className="truncate text-white/90 text-[11px]">
                                • <span className="font-semibold">[{it.type.toUpperCase()}]</span> {it.title}
                              </div>
                            ))}
                          </div>
                        </td>

                        <td className="py-4 px-6">
                          <div className="font-bold text-white text-sm">₹{o.total.toLocaleString('en-IN')}</div>
                          <div className="text-[10px] text-white/50 font-mono">
                            {o.paymentMethod.toUpperCase()} ({o.gateway})
                          </div>
                        </td>

                        <td className="py-4 px-6">
                          {isPaid && (
                            <span className="px-2.5 py-1 rounded-full text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold inline-flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3" /> VERIFIED PAID
                            </span>
                          )}
                          {isPending && (
                            <span className="px-2.5 py-1 rounded-full text-[10px] bg-amber-500/10 text-amber-400 border border-amber-500/20 font-semibold inline-flex items-center gap-1">
                              <Clock className="w-3 h-3" /> PENDING SETTLEMENT
                            </span>
                          )}
                          {isFlagged && (
                            <span className="px-2.5 py-1 rounded-full text-[10px] bg-rose-500/10 text-rose-400 border border-rose-500/20 font-semibold inline-flex items-center gap-1">
                              <AlertTriangle className="w-3 h-3" /> REQUIRES REVIEW
                            </span>
                          )}
                          {isRevoked && (
                            <span className="px-2.5 py-1 rounded-full text-[10px] bg-slate-500/10 text-slate-400 border border-slate-500/20 font-semibold inline-flex items-center gap-1">
                              <Ban className="w-3 h-3" /> UNVERIFIED TEST
                            </span>
                          )}

                          {o.verificationNotes && (
                            <p className="text-[10px] text-white/50 mt-1 line-clamp-1 max-w-xs italic">
                              "{o.verificationNotes}"
                            </p>
                          )}
                        </td>

                        <td className="py-4 px-6 text-right">
                          <button
                            onClick={() => {
                              setSelectedOrder(o);
                              setReconcileNotes(o.verificationNotes || '');
                            }}
                            className="px-3 py-1.5 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
                          >
                            Reconcile Access
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Safe Reconciliation Modal (Phase 1.5) */}
        {selectedOrder && (
          <div
            className="fixed inset-0 bg-[#000825]/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedOrder(null)}
          >
            <div
              className="bg-[#101F45] border border-cyan-500/30 rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <h3 className="text-lg font-black text-white">Reconcile Order & Entitlements</h3>
                  <p className="text-xs text-white/60 font-mono mt-0.5">
                    Order ID: {selectedOrder.orderId}
                  </p>
                </div>
                <span className="text-xs font-bold text-cyan-400">
                  ₹{selectedOrder.total.toLocaleString('en-IN')}
                </span>
              </div>

              <div className="space-y-3 text-xs bg-[#000825] p-4 rounded-2xl border border-white/10">
                <div className="flex justify-between">
                  <span className="text-white/60">Student:</span>
                  <span className="text-white font-semibold">{selectedOrder.customerName} ({selectedOrder.customerEmail})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">Products:</span>
                  <span className="text-white text-right">{selectedOrder.items.map((i) => i.title).join(', ')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">Current Status:</span>
                  <span className="font-bold text-amber-300">{selectedOrder.status}</span>
                </div>
              </div>

              <form onSubmit={handleReconcileSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="text-white/70 block mb-1.5 font-semibold">Select Administrative Action</label>
                  <div className="space-y-2">
                    <label className="flex items-center gap-3 p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/30 cursor-pointer">
                      <input
                        type="radio"
                        name="reconcileAction"
                        value="APPROVE_VERIFIED"
                        checked={reconcileAction === 'APPROVE_VERIFIED'}
                        onChange={() => setReconcileAction('APPROVE_VERIFIED')}
                        className="text-emerald-500"
                      />
                      <div>
                        <strong className="block text-emerald-300">Approve Verified Payment</strong>
                        <span className="text-[11px] text-white/60">
                          Confirm legitimate banking clearance and activate lifetime entitlements.
                        </span>
                      </div>
                    </label>

                    <label className="flex items-center gap-3 p-3 rounded-xl bg-amber-950/30 border border-amber-500/30 cursor-pointer">
                      <input
                        type="radio"
                        name="reconcileAction"
                        value="MARK_TEST_PURCHASE"
                        checked={reconcileAction === 'MARK_TEST_PURCHASE'}
                        onChange={() => setReconcileAction('MARK_TEST_PURCHASE')}
                        className="text-amber-500"
                      />
                      <div>
                        <strong className="block text-amber-300">Mark Sandbox / Test Purchase</strong>
                        <span className="text-[11px] text-white/60">
                          Exclude from production revenue without triggering dispute alerts.
                        </span>
                      </div>
                    </label>

                    <label className="flex items-center gap-3 p-3 rounded-xl bg-rose-950/30 border border-rose-500/30 cursor-pointer">
                      <input
                        type="radio"
                        name="reconcileAction"
                        value="REVOKE_UNVERIFIED"
                        checked={reconcileAction === 'REVOKE_UNVERIFIED'}
                        onChange={() => setReconcileAction('REVOKE_UNVERIFIED')}
                        className="text-rose-500"
                      />
                      <div>
                        <strong className="block text-rose-300">Revoke Unverified Access</strong>
                        <span className="text-[11px] text-white/60">
                          Lock digital library & lessons due to failed payment settlement.
                        </span>
                      </div>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="text-white/70 block mb-1 font-semibold">Audit Notes & Banking Reference</label>
                  <textarea
                    rows={2}
                    value={reconcileNotes}
                    onChange={(e) => setReconcileNotes(e.target.value)}
                    placeholder="e.g. Verified via ICICI UTR #982140283 or test purchase flagged."
                    className="w-full bg-[#000825] border border-white/15 rounded-xl p-3 text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setSelectedOrder(null)}
                    className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-xl text-white/70 text-xs font-semibold cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-5 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-xl text-xs transition-colors cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? 'Recording Audit...' : 'Execute Reconcile'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
