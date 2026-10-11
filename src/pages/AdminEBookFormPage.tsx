import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ArrowLeft, Save, Upload, FileText, CheckCircle } from 'lucide-react';
import { EBook } from '../types';

export const AdminEBookFormPage: React.FC<{ bookId?: string }> = ({ bookId }) => {
  const { ebooks, addEBook, updateEBook, navigateTo, showToast } = useApp();
  const existingBook = bookId ? ebooks.find((b) => b.id === bookId) : null;

  const [formData, setFormData] = useState<Partial<EBook>>({
    title: existingBook?.title || '',
    slug: existingBook?.slug || '',
    category: existingBook?.category || 'Digital Marketing',
    price: existingBook?.price || 499,
    originalPrice: existingBook?.originalPrice || 1299,
    author: existingBook?.author || existingBook?.authorName || 'GXA Technology Research Lead',
    authorName: existingBook?.authorName || existingBook?.author || 'GXA Technology Research Lead',
    authorRole: existingBook?.authorRole || 'Founder & Principal Architect',
    pages: existingBook?.pages || existingBook?.totalPages || 445,
    totalPages: existingBook?.totalPages || existingBook?.pages || 445,
    status: (existingBook?.status?.toLowerCase() === 'published' ? 'published' : 'draft') as any,
    description: existingBook?.description || existingBook?.shortDescription || '',
    shortDescription: existingBook?.shortDescription || existingBook?.description || '',
    longDescription: existingBook?.longDescription || existingBook?.description || '',
    coverImage: existingBook?.coverImage || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80',
    tags: existingBook?.tags || ['Marketing', 'Strategy', 'ROI'],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.slug) {
      showToast('Please fill in required fields (Title and Slug)');
      return;
    }

    if (existingBook) {
      updateEBook({ ...existingBook, ...formData } as EBook);
      showToast('eBook updated successfully! 📚');
    } else {
      const newBook: EBook = {
        id: 'eb-' + Date.now(),
        rating: 5.0,
        reviewsCount: 1,
        featured: false,
        ...formData,
      } as EBook;
      addEBook(newBook);
      showToast('New eBook added to catalogue! 🚀');
    }
    navigateTo('/admin/ebooks');
  };

  return (
    <div className="bg-[#000825] text-white min-h-screen py-8 md:py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
        <button
          onClick={() => navigateTo('/admin/ebooks')}
          className="text-xs text-white/60 hover:text-white flex items-center gap-1.5"
        >
          <ArrowLeft className="w-4 h-4" /> Back to eBook Management
        </button>

        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div>
            <h1 className="text-2xl font-black text-white">
              {existingBook ? `Edit eBook: ${existingBook.title}` : 'Create New eBook Entry'}
            </h1>
            <p className="text-xs text-white/60 mt-1">
              Set metadata, upload PDF assets, and configure Indian Rupee pricing
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-[#101F45]/60 border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6">
            <h2 className="text-base font-bold text-white">1. Book Metadata & Identifiers</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="text-white/70 block mb-1">Book Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Digital Marketing Mastery"
                  className="w-full bg-[#000825] border border-white/15 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="text-white/70 block mb-1">URL Slug *</label>
                <input
                  type="text"
                  required
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') })}
                  placeholder="e.g. digital-marketing-mastery"
                  className="w-full bg-[#000825] border border-white/15 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-cyan-400 font-mono"
                />
              </div>

              <div>
                <label className="text-white/70 block mb-1">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full bg-[#000825] border border-white/15 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-cyan-400"
                >
                  <option>Digital Marketing</option>
                  <option>Career Development</option>
                  <option>Artificial Intelligence</option>
                  <option>Data Science</option>
                  <option>Product Management</option>
                </select>
              </div>

              <div>
                <label className="text-white/70 block mb-1">Catalogue Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                  className="w-full bg-[#000825] border border-white/15 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-cyan-400"
                >
                  <option value="Draft">Draft (Hidden from public storefront)</option>
                  <option value="Published">Published (Live for purchase)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Pricing & Page Count */}
          <div className="bg-[#101F45]/60 border border-white/10 rounded-3xl p-6 sm:p-8 space-y-4">
            <h2 className="text-base font-bold text-white">2. Pricing & Publication Details</h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div>
                <label className="text-white/70 block mb-1">Selling Price (INR ₹) *</label>
                <input
                  type="number"
                  required
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                  className="w-full bg-[#000825] border border-white/15 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-cyan-400 font-bold"
                />
              </div>

              <div>
                <label className="text-white/70 block mb-1">Original / Strikethrough Price (INR ₹)</label>
                <input
                  type="number"
                  value={formData.originalPrice}
                  onChange={(e) => setFormData({ ...formData, originalPrice: Number(e.target.value) })}
                  className="w-full bg-[#000825] border border-white/15 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="text-white/70 block mb-1">Total Page Count</label>
                <input
                  type="number"
                  value={formData.pages || formData.totalPages || 400}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    setFormData({ ...formData, pages: val, totalPages: val });
                  }}
                  className="w-full bg-[#000825] border border-white/15 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-cyan-400"
                />
              </div>
            </div>
          </div>

          {/* Descriptions */}
          <div className="bg-[#101F45]/60 border border-white/10 rounded-3xl p-6 sm:p-8 space-y-4">
            <h2 className="text-base font-bold text-white">3. Content & Synopsis</h2>

            <div className="space-y-4 text-xs">
              <div>
                <label className="text-white/70 block mb-1">Short Summary (Catalogue Card)</label>
                <input
                  type="text"
                  value={formData.shortDescription || formData.description}
                  onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value, description: e.target.value })}
                  className="w-full bg-[#000825] border border-white/15 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="text-white/70 block mb-1">Detailed Description (Product Page)</label>
                <textarea
                  rows={4}
                  value={formData.longDescription || formData.description}
                  onChange={(e) => setFormData({ ...formData, longDescription: e.target.value, description: e.target.value })}
                  className="w-full bg-[#000825] border border-white/15 rounded-xl p-4 text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="text-white/70 block mb-1">Cover Image URL</label>
                <input
                  type="text"
                  value={formData.coverImage}
                  onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                  className="w-full bg-[#000825] border border-white/15 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-cyan-400 font-mono text-[11px]"
                />
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => navigateTo('/admin/ebooks')}
              className="px-6 py-3 bg-white/10 hover:bg-white/15 rounded-xl text-xs font-bold text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-8 py-3 bg-cyan-400 hover:bg-cyan-300 font-bold rounded-xl text-xs uppercase tracking-wider text-slate-950 flex items-center gap-2 shadow-lg transition-colors"
            >
              <Save className="w-4 h-4" /> Save eBook
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
