import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  ShieldCheck,
  Lock,
  CreditCard,
  Smartphone,
  Building,
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  QrCode,
  Globe,
  RefreshCw,
} from 'lucide-react';
import { SecurePaymentShieldIllustration } from '../components/EducationalGraphics';

export const CheckoutPage: React.FC = () => {
  const { cart, cartTotal, cartSubtotal, cartDiscount, user, clearCart, navigateTo, showToast, createPaymentOrder, verifyRazorpayPayment } = useApp();
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking' | 'paypal'>('upi');
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    billingAddress: '',
    city: 'New Delhi',
    state: 'Delhi',
    pincode: '110001',
    gstin: '',
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [pendingNotice, setPendingNotice] = useState<{ orderId: string; total: number } | null>(null);

  if (cart.length === 0) {
    navigateTo('/cart');
    return null;
  }

  const handlePayNow = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsProcessing(true);

    try {
      // 1. Create Server-Side Payment Order (Trusted Price Calculation on Backend)
      const result = await createPaymentOrder(paymentMethod);

      if (!result.success || !result.orderId) {
        setIsProcessing(false);
        setErrorMessage(result.error || 'Failed to initialize payment order on server.');
        return;
      }

      const { orderId, order } = result;

      // 2. Gateway Verification Logic (Fail-Closed)
      if (order.gatewayConfigured && (window as any).Razorpay) {
        // Live Razorpay Gateway flow
        const options = {
          key: order.razorpayKeyId,
          amount: order.total * 100,
          currency: 'INR',
          name: 'GXA Career Academy',
          description: `Order ${orderId}`,
          order_id: order.gatewayOrderId,
          prefill: {
            name: formData.name,
            email: formData.email,
            contact: formData.phone,
          },
          theme: { color: '#101F45' },
          handler: async (response: any) => {
            const verifyRes = await verifyRazorpayPayment(orderId, response);
            setIsProcessing(false);
            if (verifyRes.success) {
              showToast('Payment verified successfully! Welcome to GXA Career Academy.');
              navigateTo(`/order-confirmation/${orderId}`);
            } else {
              setErrorMessage('Payment signature verification failed. No paid access granted.');
              navigateTo(`/order-confirmation/${orderId}`);
            }
          },
          modal: {
            ondismiss: () => {
              setIsProcessing(false);
              showToast('Payment window closed. Order remains pending.');
              navigateTo(`/order-confirmation/${orderId}`);
            },
          },
        };

        const rzp = new (window as any).Razorpay(options);
        rzp.open();
      } else {
        // FAIL CLOSED: If Razorpay credentials are not yet configured in env,
        // we DO NOT simulate a fake payment success!
        // We record the order as PAYMENT_PENDING on the server and notify the user.
        setIsProcessing(false);
        setPendingNotice({
          orderId,
          total: order.total,
        });
      }
    } catch (err: any) {
      setIsProcessing(false);
      setErrorMessage('A critical payment error occurred. The transaction was stopped.');
    }
  };

  return (
    <div className="bg-[#000825] text-white min-h-screen py-10 md:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-8">
        <button
          onClick={() => navigateTo('/cart')}
          className="text-xs text-white/60 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Cart
        </button>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/10 pb-4 gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-black text-white">Verified Secure Checkout</h1>
            <p className="text-xs text-white/60 mt-1">
              Enterprise 256-Bit SSL Encryption • Server-Side Signature Verification
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold bg-emerald-500/10 px-3.5 py-1.5 rounded-full border border-emerald-500/20 w-fit">
            <Lock className="w-3.5 h-3.5" /> Fail-Closed Entitlement Security
          </div>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-xs text-rose-300 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
            <div>
              <strong className="block font-bold">Security Notice:</strong>
              <span>{errorMessage}</span>
            </div>
          </div>
        )}

        {/* Gateway Pending Notice Modal / Screen (Fail Closed) */}
        {pendingNotice && (
          <div className="bg-[#101F45] border border-amber-500/40 rounded-3xl p-6 sm:p-8 space-y-4 shadow-2xl">
            <div className="flex items-center gap-3 text-amber-400">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">Order Registered — Payment Pending</h2>
                <p className="text-xs text-amber-300/80">
                  Order ID: <span className="font-mono font-bold text-white">{pendingNotice.orderId}</span>
                </p>
              </div>
            </div>

            <div className="bg-[#000825] p-4 rounded-2xl border border-white/10 text-xs text-white/70 space-y-2 leading-relaxed">
              <p className="font-semibold text-white">
                🔒 Fail-Closed Security Policy Active:
              </p>
              <p>
                In strict compliance with commercial payment guidelines, paid course modules and eBook licenses
                are <strong className="text-amber-300">never unlocked</strong> without verified gateway settlement.
                Because live gateway API keys (Razorpay/PayPal) have not been populated in the current server environment,
                this order has been saved with status <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-mono font-bold">PAYMENT_PENDING</span>.
              </p>
              <p className="text-[11px] text-white/50">
                To complete activation in a production environment, configure RAZORPAY_KEY_ID & RAZORPAY_KEY_SECRET on the backend, or request administrator reconciliation.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => {
                  clearCart();
                  navigateTo(`/order-confirmation/${pendingNotice.orderId}`);
                }}
                className="px-5 py-2.5 bg-[#2455E8] hover:bg-[#1B44BF] text-white font-bold text-xs rounded-xl transition-all shadow"
              >
                View Order Status & Receipt
              </button>
              <button
                onClick={() => setPendingNotice(null)}
                className="px-4 py-2.5 bg-white/10 hover:bg-white/15 text-white/80 text-xs font-semibold rounded-xl transition-colors"
              >
                Return to Checkout
              </button>
            </div>
          </div>
        )}

        {!pendingNotice && (
          <form onSubmit={handlePayNow} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Form Column */}
            <div className="lg:col-span-2 space-y-6">
              {/* Student & Billing Contact */}
              <div className="bg-[#101F45]/60 border border-white/10 rounded-3xl p-6 sm:p-8 space-y-4">
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  1. Student Account & Billing Details
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="text-white/70 block mb-1.5 font-medium">Student Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Priyanshu Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-[#000825] border border-white/15 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                  <div>
                    <label className="text-white/70 block mb-1.5 font-medium">Email Address (for verified access) *</label>
                    <input
                      type="email"
                      required
                      placeholder="student@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-[#000825] border border-white/15 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                  <div>
                    <label className="text-white/70 block mb-1.5 font-medium">Contact Phone Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-[#000825] border border-white/15 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                  <div>
                    <label className="text-white/70 block mb-1.5 font-medium">State / Union Territory *</label>
                    <input
                      type="text"
                      required
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      className="w-full bg-[#000825] border border-white/15 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-white/70 block mb-1.5 font-medium">GSTIN (Optional, for 18% input tax credit)</label>
                    <input
                      type="text"
                      placeholder="e.g. 07AAAAA0000A1Z5"
                      value={formData.gstin}
                      onChange={(e) => setFormData({ ...formData, gstin: e.target.value.toUpperCase() })}
                      className="w-full bg-[#000825] border border-white/15 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-cyan-400 font-mono text-xs"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method Selector */}
              <div className="bg-[#101F45]/60 border border-white/10 rounded-3xl p-6 sm:p-8 space-y-4">
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  2. Select Authorized Gateway Method
                </h2>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { id: 'upi', label: 'UPI / QR', icon: Smartphone, desc: 'PhonePe, GPay, Paytm' },
                    { id: 'card', label: 'Cards', icon: CreditCard, desc: 'Visa, MC, RuPay' },
                    { id: 'netbanking', label: 'Net Banking', icon: Building, desc: 'Major Indian Banks' },
                    { id: 'paypal', label: 'PayPal', icon: Globe, desc: 'International (USD)' },
                  ].map((pm) => (
                    <button
                      type="button"
                      key={pm.id}
                      onClick={() => setPaymentMethod(pm.id as any)}
                      className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                        paymentMethod === pm.id
                          ? 'border-cyan-400 bg-cyan-500/10 text-white shadow-md'
                          : 'border-white/10 bg-white/5 text-white/60 hover:bg-white/10'
                      }`}
                    >
                      <pm.icon className="w-5 h-5 mb-1.5 text-cyan-400" />
                      <div className="font-bold text-xs text-white">{pm.label}</div>
                      <div className="text-[10px] text-white/50">{pm.desc}</div>
                    </button>
                  ))}
                </div>

                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white/70 flex items-center gap-3">
                  <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                  <p className="text-[11px] leading-relaxed">
                    Transactions are routed via official Razorpay / UPI banking switches with server-side HMAC-SHA256 signature verification.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Summary Column */}
            <div className="space-y-6">
              <div className="bg-[#101F45]/80 border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6 sticky top-24 shadow-xl">
                <h2 className="text-base font-bold text-white border-b border-white/10 pb-4">
                  Order Summary ({cart.length} {cart.length === 1 ? 'item' : 'items'})
                </h2>

                <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                  {cart.map((item) => (
                    <div key={item.id} className="flex justify-between items-start text-xs border-b border-white/5 pb-2">
                      <div className="space-y-0.5 pr-2">
                        <span className="font-semibold text-white block line-clamp-1">{item.title}</span>
                        <span className="text-[10px] text-cyan-400 uppercase font-semibold">{item.type}</span>
                      </div>
                      <span className="font-bold text-white shrink-0">₹{item.price.toLocaleString('en-IN')}</span>
                    </div>
                  ))}
                </div>

                <div className="space-y-2 text-xs border-t border-white/10 pt-4">
                  <div className="flex justify-between text-white/70">
                    <span>Catalog Subtotal</span>
                    <span>₹{cartSubtotal.toLocaleString('en-IN')}</span>
                  </div>
                  {cartDiscount > 0 && (
                    <div className="flex justify-between text-emerald-400 font-semibold">
                      <span>Verified Discount</span>
                      <span>-₹{cartDiscount.toLocaleString('en-IN')}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-white/70">
                    <span>GST (18% Integrated Tax)</span>
                    <span>₹{Math.round(cartTotal - (cartSubtotal - cartDiscount)).toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-base font-black text-white pt-2 border-t border-white/10">
                    <span>Total Payable</span>
                    <span className="text-cyan-400 font-mono">₹{cartTotal.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full py-3.5 bg-gradient-to-r from-[#2455E8] to-[#1B44BF] hover:opacity-95 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isProcessing ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Initiating Secure Gateway...</span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-4 h-4" />
                      <span>Authorize Payment • ₹{cartTotal.toLocaleString('en-IN')}</span>
                    </>
                  )}
                </button>

                <p className="text-[10px] text-white/40 text-center leading-relaxed">
                  By clicking Authorize Payment, you agree to GXA Career Academy Terms of Service and Refund Policy. Paid entitlements are granted upon verified banking settlement only.
                </p>

                {/* Educational Payment Security Visual */}
                <div className="pt-2">
                  <SecurePaymentShieldIllustration className="w-full h-auto drop-shadow-md" />
                </div>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
