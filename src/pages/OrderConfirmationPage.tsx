import React, { useEffect, useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  CheckCircle2,
  Clock,
  AlertTriangle,
  RefreshCw,
  BookOpen,
  ArrowRight,
  Printer,
  ShieldCheck,
  Lock,
} from 'lucide-react';

interface OrderRecord {
  orderId: string;
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
  createdAt: string;
  verifiedAt?: string;
  verificationNotes?: string;
}

export const OrderConfirmationPage: React.FC<{ orderId: string }> = ({ orderId }) => {
  const { navigateTo, showToast, refreshEntitlements } = useApp();
  const [order, setOrder] = useState<OrderRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchOrder = async () => {
    try {
      const res = await fetch(`/api/orders/${encodeURIComponent(orderId)}`);
      if (res.ok) {
        const data = await res.json();
        setOrder(data);
        if (data.status === 'PAID') {
          await refreshEntitlements();
        }
      } else {
        setOrder(null);
      }
    } catch (err) {
      console.error('Failed to fetch order status:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, [orderId]);

  const handleRefreshStatus = () => {
    setRefreshing(true);
    fetchOrder().then(() => {
      showToast('Checked gateway status with registry.');
    });
  };

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="bg-[#000825] text-white min-h-[60vh] flex items-center justify-center">
        <div className="flex items-center gap-3 text-cyan-400">
          <RefreshCw className="w-5 h-5 animate-spin" />
          <span className="text-sm font-semibold">Retrieving verified order record...</span>
        </div>
      </div>
    );
  }

  const isVerifiedPaid = order?.status === 'PAID';
  const isPending = !order || order.status === 'PAYMENT_PENDING';
  const isUnverifiedOrFlagged = order?.status === 'REQUIRES_VERIFICATION' || order?.status === 'UNVERIFIED_DEMO';

  return (
    <div className="bg-[#000825] text-white min-h-screen py-10 md:py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-8">
        {/* Header Status Card */}
        <div className="bg-[#101F45]/80 border border-white/10 rounded-3xl p-8 md:p-12 text-center space-y-6 shadow-2xl backdrop-blur-md">
          {/* Dynamic Status Icon */}
          {isVerifiedPaid ? (
            <div className="w-20 h-20 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
              <CheckCircle2 className="w-10 h-10" />
            </div>
          ) : isPending ? (
            <div className="w-20 h-20 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center mx-auto border border-amber-500/30">
              <Clock className="w-10 h-10 animate-pulse" />
            </div>
          ) : (
            <div className="w-20 h-20 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center mx-auto border border-rose-500/30">
              <AlertTriangle className="w-10 h-10" />
            </div>
          )}

          <div>
            <span
              className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full border inline-block ${
                isVerifiedPaid
                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                  : isPending
                  ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                  : 'bg-rose-500/10 text-rose-400 border-rose-500/30'
              }`}
            >
              {isVerifiedPaid
                ? 'Payment Verified & Confirmed'
                : isPending
                ? 'Payment Settlement Pending'
                : 'Unverified / Review Required'}
            </span>

            <h1 className="text-3xl md:text-4xl font-black text-white mt-3">
              {isVerifiedPaid
                ? 'Payment Successful!'
                : isPending
                ? 'Awaiting Bank Confirmation'
                : 'Payment Verification Required'}
            </h1>

            <p className="text-sm text-white/60 mt-2">
              Internal Order ID: <span className="font-mono text-cyan-300 font-bold">{orderId}</span>
            </p>
          </div>

          {/* Fail-Closed Access Notice */}
          <div className="text-xs text-white/70 max-w-lg mx-auto leading-relaxed bg-[#000825] p-4 rounded-2xl border border-white/10 text-left space-y-2">
            {isVerifiedPaid ? (
              <p className="text-emerald-300 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 shrink-0" />
                <span>Your payment has been cryptographically confirmed by the gateway. Digital licenses are active.</span>
              </p>
            ) : isPending ? (
              <>
                <p className="text-amber-300 font-semibold flex items-center gap-2">
                  <Lock className="w-4 h-4 shrink-0" />
                  <span>Content Locked (Fail-Closed Security):</span>
                </p>
                <p>
                  In accordance with GXA Career Academy security protocols, digital course modules and eBook downloads
                  remain locked until settlement verification is completed by the banking switch.
                </p>
                <p className="text-[11px] text-white/50">
                  If you have initiated payment through UPI QR or Net Banking, settlement may take a few minutes. Click below to re-verify.
                </p>
              </>
            ) : (
              <p className="text-rose-300">
                This record was flagged during institutional security audit. Unverified purchases cannot grant course or eBook entitlements.
              </p>
            )}
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            {isVerifiedPaid ? (
              <>
                <button
                  onClick={() => navigateTo('/dashboard/library')}
                  className="px-6 py-3 bg-[#2455E8] hover:bg-[#1B44BF] font-bold rounded-xl text-xs uppercase tracking-wider text-white flex items-center gap-2 shadow-lg transition-all"
                >
                  <BookOpen className="w-4 h-4" /> Go to Digital Library
                </button>
                <button
                  onClick={() => navigateTo('/dashboard/courses')}
                  className="px-6 py-3 bg-white/10 hover:bg-white/15 border border-white/20 font-bold rounded-xl text-xs uppercase tracking-wider text-white flex items-center gap-2 transition-colors"
                >
                  Start Courses
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={handleRefreshStatus}
                  disabled={refreshing}
                  className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg transition-all cursor-pointer disabled:opacity-50"
                >
                  <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
                  <span>{refreshing ? 'Checking...' : 'Re-Check Payment Status'}</span>
                </button>
                <button
                  onClick={() => navigateTo('/dashboard/orders')}
                  className="px-6 py-3 bg-white/10 hover:bg-white/15 border border-white/20 font-bold rounded-xl text-xs uppercase tracking-wider text-white transition-colors"
                >
                  View My Orders
                </button>
              </>
            )}
          </div>
        </div>

        {/* GST Tax Invoice Summary */}
        <div className="bg-[#101F45]/50 border border-white/10 rounded-3xl p-6 sm:p-8 space-y-4 text-xs">
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <div>
              <h3 className="font-bold text-white text-sm">Official Tax Invoice Statement</h3>
              <p className="text-white/40">GXA Technology Private Limited • SAC 998431</p>
            </div>
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white/70 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" /> Print Statement
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4 text-white/70">
            <div>
              <span className="text-white/40 block">Order Date</span>
              <span className="font-semibold text-white">
                {order ? new Date(order.createdAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' }) : 'October 9, 2026'}
              </span>
            </div>
            <div>
              <span className="text-white/40 block">Payment Method</span>
              <span className="font-semibold text-white">{order?.paymentMethod || 'Razorpay Gateway'}</span>
            </div>
            <div>
              <span className="text-white/40 block">Payment Settlement Status</span>
              <span className={`font-semibold ${isVerifiedPaid ? 'text-emerald-400' : 'text-amber-400'}`}>
                {order?.status || 'PAYMENT_PENDING'}
              </span>
            </div>
            <div>
              <span className="text-white/40 block">Tax Category</span>
              <span className="font-semibold text-white">18% Integrated GST (Included)</span>
            </div>
          </div>

          {order?.items && order.items.length > 0 && (
            <div className="border-t border-white/10 pt-4 space-y-2">
              <span className="text-white/40 block font-semibold">Registered Products</span>
              {order.items.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center text-white/80 py-1 border-b border-white/5">
                  <span>{item.title}</span>
                  <span className="font-mono font-bold">₹{item.unitPrice.toLocaleString('en-IN')}</span>
                </div>
              ))}
              <div className="flex justify-between items-center text-white font-bold pt-2 text-sm">
                <span>Total Amount:</span>
                <span className="font-mono text-cyan-400">₹{order.total.toLocaleString('en-IN')}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
