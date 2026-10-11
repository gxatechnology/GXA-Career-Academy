import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Receipt, Download, ExternalLink, Printer, CheckCircle2, Clock } from 'lucide-react';

export const DashboardOrdersPage: React.FC = () => {
  const { orders, navigateTo, showToast } = useApp();
  const [selectedInvoice, setSelectedInvoice] = useState<typeof orders[0] | null>(null);

  const handleDownloadInvoice = (orderId: string) => {
    showToast(`Downloading official GST Tax Invoice for order #${orderId}... 🧾`);
  };

  return (
    <div className="bg-[#000825] text-white min-h-screen py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-white/10 pb-4 overflow-x-auto text-xs font-semibold">
          {[
            { label: 'Overview', path: '/dashboard', active: false },
            { label: 'My Digital Library', path: '/dashboard/library', active: false },
            { label: 'Enrolled Courses', path: '/dashboard/courses', active: false },
            { label: 'Orders & Receipts', path: '/dashboard/orders', active: true },
            { label: 'Profile & Settings', path: '/dashboard/settings', active: false },
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
          <h1 className="text-2xl sm:text-3xl font-black text-white">Orders & Tax Invoices</h1>
          <p className="text-xs text-white/60 mt-1">
            Review historical transactions, Razorpay reference numbers, and download GST tax receipts
          </p>
        </div>

        {/* Orders Table */}
        <div className="bg-[#101F45]/60 border border-white/10 rounded-3xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-white/5 border-b border-white/10 text-white/60 uppercase font-semibold text-[11px]">
                <tr>
                  <th className="py-4 px-6">Order ID & Date</th>
                  <th className="py-4 px-6">Purchased Items</th>
                  <th className="py-4 px-6">Payment Method</th>
                  <th className="py-4 px-6">Amount</th>
                  <th className="py-4 px-6">Status</th>
                  <th className="py-4 px-6 text-right">Invoice</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-white/80">
                {orders.map((order) => {
                  const id = order.orderId || order.id || 'ORD-98241';
                  const dateStr = order.createdAt ? new Date(order.createdAt).toLocaleDateString() : (order.date || 'May 18, 2025');

                  return (
                    <tr key={id} className="hover:bg-white/5 transition-colors">
                      <td className="py-4 px-6">
                        <div className="font-mono font-bold text-white">{id}</div>
                        <div className="text-[10px] text-white/40">{dateStr}</div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="space-y-1">
                          {order.items.map((it, idx) => (
                            <div key={idx} className="truncate max-w-xs text-white">
                              • {it.title}
                            </div>
                          ))}
                        </div>
                      </td>
                      <td className="py-4 px-6 font-mono text-white/70">
                        {order.paymentMethod}
                      </td>
                      <td className="py-4 px-6 font-bold text-cyan-300">
                        ₹{order.total}
                      </td>
                      <td className="py-4 px-6">
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                          <CheckCircle2 className="w-3 h-3" /> Paid
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right space-x-2">
                        <button
                          onClick={() => setSelectedInvoice(order)}
                          className="px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-[11px] font-medium text-white transition-colors"
                        >
                          View
                        </button>
                        <button
                          onClick={() => handleDownloadInvoice(id)}
                          className="p-1.5 bg-primary-600/30 hover:bg-primary-600 text-cyan-300 hover:text-white rounded-lg transition-colors"
                          title="Download Invoice PDF"
                        >
                          <Download className="w-3.5 h-3.5 inline" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal for Invoice View */}
        {selectedInvoice && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-[#101F45] border border-white/20 rounded-3xl p-6 md:p-8 max-w-lg w-full space-y-6 shadow-2xl relative">
              <button
                onClick={() => setSelectedInvoice(null)}
                className="absolute top-4 right-4 text-white/50 hover:text-white"
              >
                ✕
              </button>

              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <h3 className="font-bold text-lg text-white">GST TAX INVOICE</h3>
                  <p className="text-xs text-white/50">GXA Technology Private Limited</p>
                </div>
                <div className="text-right">
                  <span className="font-mono text-cyan-400 font-bold text-xs">{selectedInvoice.orderId || selectedInvoice.id || 'ORD-98241'}</span>
                  <p className="text-[10px] text-white/50">{selectedInvoice.createdAt ? new Date(selectedInvoice.createdAt).toLocaleDateString() : (selectedInvoice.date || 'May 18, 2025')}</p>
                </div>
              </div>

              <div className="space-y-2 text-xs">
                <span className="text-white/60 font-semibold block uppercase tracking-wider text-[10px]">
                  Billed Products
                </span>
                {selectedInvoice.items.map((it, idx) => (
                  <div key={idx} className="flex justify-between py-1 border-b border-white/5">
                    <span className="text-white">{it.title}</span>
                    <span className="font-semibold text-cyan-300">₹{it.price}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-1 text-xs pt-2 border-t border-white/10">
                <div className="flex justify-between text-white/60">
                  <span>Subtotal</span>
                  <span>₹{selectedInvoice.total}</span>
                </div>
                <div className="flex justify-between text-white/60">
                  <span>Integrated GST (18%)</span>
                  <span>₹{Math.round(selectedInvoice.total * 0.18)} (Incl.)</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-white/10">
                  <span>Total Paid</span>
                  <span className="text-cyan-400">₹{selectedInvoice.total}</span>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => window.print()}
                  className="flex-1 py-2.5 bg-white/10 hover:bg-white/15 rounded-xl text-xs font-bold text-white flex items-center justify-center gap-2"
                >
                  <Printer className="w-3.5 h-3.5" /> Print Invoice
                </button>
                <button
                  onClick={() => {
                    handleDownloadInvoice(selectedInvoice.orderId || selectedInvoice.id || 'ORD-98241');
                    setSelectedInvoice(null);
                  }}
                  className="flex-1 py-2.5 bg-primary-600 hover:bg-primary-500 rounded-xl text-xs font-bold text-white flex items-center justify-center gap-2"
                >
                  <Download className="w-3.5 h-3.5" /> Download PDF
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
