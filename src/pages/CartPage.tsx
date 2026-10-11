import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Trash2, ShoppingBag, ArrowRight, ShieldCheck, Tag, ArrowLeft } from 'lucide-react';
import {
  EmptyStateIllustration,
  SecurePaymentShieldIllustration,
} from '../components/EducationalGraphics';

export const CartPage: React.FC = () => {
  const { cart, removeFromCart, cartSubtotal, cartDiscount, cartTotal, appliedCoupon, applyCoupon, removeCoupon, navigateTo } = useApp();
  const [couponInput, setCouponInput] = useState('');

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    applyCoupon(couponInput);
    setCouponInput('');
  };

  if (cart.length === 0) {
    return (
      <div className="bg-[#000825] text-white min-h-[70vh] flex items-center justify-center p-6">
        <div className="text-center max-w-md space-y-4">
          <EmptyStateIllustration
            title="Your Cart is Empty"
            description="Discover expert-created eBooks and practical courses designed to accelerate your career."
            className="text-white"
          />
          <div className="flex justify-center gap-3 pt-2">
            <button
              onClick={() => navigateTo('/ebooks')}
              className="px-5 py-2.5 bg-[#1D4ED8] hover:bg-[#1E40AF] rounded-xl text-xs font-bold text-white transition-colors cursor-pointer shadow-md"
            >
              Explore Digital Books
            </button>
            <button
              onClick={() => navigateTo('/courses')}
              className="px-5 py-2.5 bg-white/10 hover:bg-white/15 rounded-xl text-xs font-bold text-white transition-colors cursor-pointer"
            >
              Browse Courses
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#000825] text-white min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-8">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-black text-white">Your Shopping Cart</h1>
            <p className="text-xs text-white/60 mt-1">{cart.length} item{cart.length > 1 ? 's' : ''} in cart</p>
          </div>
          <button
            onClick={() => navigateTo('/ebooks')}
            className="text-xs text-white/60 hover:text-white flex items-center gap-1.5"
          >
            <ArrowLeft className="w-4 h-4" /> Continue Shopping
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items List */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="bg-[#101F45]/60 border border-white/10 rounded-2xl p-4 sm:p-6 flex gap-4 sm:gap-6 items-center justify-between shadow-md"
              >
                <div className="flex items-center gap-4 min-w-0">
                  <img
                    src={item.coverImage || item.image}
                    alt={item.title}
                    className="w-16 h-20 sm:w-20 sm:h-24 object-cover rounded-xl border border-white/10 shrink-0"
                  />
                  <div className="min-w-0">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded">
                      {item.type.toUpperCase()}
                    </span>
                    <h3 className="font-bold text-sm sm:text-base text-white truncate mt-1">{item.title}</h3>
                    <p className="text-xs text-white/50">{item.author || item.authorOrInstructor}</p>
                    <div className="mt-2 text-sm font-bold text-cyan-300">
                      ₹{item.price}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => removeFromCart(item.id)}
                  className="p-2.5 text-white/40 hover:text-rose-400 hover:bg-rose-500/10 rounded-xl transition-colors shrink-0"
                  title="Remove from cart"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          {/* Order Summary & Coupon */}
          <div className="space-y-6">
            <div className="bg-[#101F45]/80 border border-white/10 rounded-3xl p-6 space-y-6 shadow-xl">
              <h2 className="text-lg font-bold text-white">Order Summary</h2>

              {/* Coupon Form */}
              <div>
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-3.5 h-3.5 text-white/40 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Coupon Code"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                      className="w-full bg-[#000825] border border-white/15 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-white/40 focus:outline-none focus:border-cyan-400 uppercase font-mono"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-white/10 hover:bg-white/15 border border-white/20 rounded-xl text-xs font-bold text-white"
                  >
                    Apply
                  </button>
                </form>

                {appliedCoupon ? (
                  <div className="flex items-center justify-between mt-2 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-xs text-emerald-400">
                    <span>Coupon <strong>{appliedCoupon.code}</strong> applied ({appliedCoupon.discountPercentage}% OFF)</span>
                    <button onClick={removeCoupon} className="text-emerald-300 hover:text-white font-bold ml-2">×</button>
                  </div>
                ) : (
                  <p className="text-[11px] text-white/40 mt-1.5">
                    Try using code <strong className="text-cyan-400 font-mono">GXA20</strong> for 20% discount.
                  </p>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 pt-3 border-t border-white/10 text-xs">
                <div className="flex justify-between text-white/70">
                  <span>Subtotal</span>
                  <span>₹{cartSubtotal}</span>
                </div>
                {cartDiscount > 0 && (
                  <div className="flex justify-between text-emerald-400 font-semibold">
                    <span>Discount</span>
                    <span>-₹{cartDiscount}</span>
                  </div>
                )}
                <div className="flex justify-between text-white/70">
                  <span>Estimated GST (18% inclusive)</span>
                  <span>₹{Math.round(cartTotal * 0.18)}</span>
                </div>
                <div className="pt-3 border-t border-white/10 flex justify-between text-base font-bold text-white">
                  <span>Total Amount</span>
                  <span className="text-cyan-400 text-lg">₹{cartTotal}</span>
                </div>
              </div>

              <button
                onClick={() => navigateTo('/checkout')}
                className="w-full py-3.5 bg-gradient-to-r from-primary-600 to-indigo-600 hover:opacity-90 font-bold rounded-xl text-xs uppercase tracking-wider text-white flex items-center justify-center gap-2 shadow-lg transition-all"
              >
                Proceed to Checkout <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-white/50 pt-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Instant Digital Delivery • 100% Encrypted</span>
              </div>

              <div className="pt-2">
                <SecurePaymentShieldIllustration className="w-full h-auto drop-shadow-sm" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
