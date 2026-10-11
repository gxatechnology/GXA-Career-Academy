import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Plus, Edit, Trash2, Eye, Search, Filter } from 'lucide-react';

export const AdminEBooksPage: React.FC = () => {
  const { ebooks, deleteEBook, navigateTo } = useApp();
  const [search, setSearch] = useState('');

  const filtered = ebooks.filter(
    (b) =>
      b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-[#000825] text-white min-h-screen py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Admin Navigation Bar */}
        <div className="flex items-center gap-2 border-b border-white/10 pb-4 overflow-x-auto text-xs font-semibold">
          {[
            { label: 'Overview', path: '/admin', active: false },
            { label: 'eBooks', path: '/admin/ebooks', active: true },
            { label: 'Courses', path: '/admin/courses', active: false },
            { label: 'Students', path: '/admin/students', active: false },
            { label: 'Orders & Payments', path: '/admin/orders', active: false },
            { label: 'Categories & Content', path: '/admin/content', active: false },
            { label: 'Reports & Analytics', path: '/admin/analytics', active: false },
            { label: 'Settings', path: '/admin/settings', active: false },
          ].map((tab, idx) => (
            <button
              key={idx}
              onClick={() => navigateTo(tab.path)}
              className={`px-3.5 py-2 rounded-xl whitespace-nowrap transition-colors ${
                tab.active
                  ? 'bg-cyan-500 text-slate-950 font-bold'
                  : 'bg-white/5 hover:bg-white/10 text-white/60 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white">eBook Catalogue Management</h1>
            <p className="text-xs text-white/60 mt-1">
              Configure pricing, draft/published status, and manage uploaded PDF files
            </p>
          </div>

          <button
            onClick={() => navigateTo('/admin/ebooks/new')}
            className="px-4 py-2.5 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold rounded-xl text-xs flex items-center gap-1.5 shadow"
          >
            <Plus className="w-4 h-4" /> Add New eBook
          </button>
        </div>

        {/* Filter bar */}
        <div className="flex items-center justify-between bg-[#101F45]/60 p-4 rounded-2xl border border-white/10">
          <div className="relative w-full max-w-sm">
            <Search className="w-4 h-4 text-white/40 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search books by title or category..."
              className="w-full bg-[#000825] border border-white/10 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
            />
          </div>
          <span className="text-xs text-white/50">{filtered.length} entries</span>
        </div>

        {/* Table */}
        <div className="bg-[#101F45]/60 border border-white/10 rounded-3xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-white/5 border-b border-white/10 text-white/60 uppercase font-semibold text-[11px]">
                <tr>
                  <th className="py-4 px-6">Book Title & Cover</th>
                  <th className="py-4 px-6">Category</th>
                  <th className="py-4 px-6">Pages</th>
                  <th className="py-4 px-6">Selling Price</th>
                  <th className="py-4 px-6">Status</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-white/80">
                {filtered.map((b) => (
                  <tr key={b.id} className="hover:bg-white/5 transition-colors">
                    <td className="py-4 px-6 flex items-center gap-3">
                      <img
                        src={b.coverImage}
                        alt={b.title}
                        className="w-10 h-14 object-cover rounded-lg border border-white/10 shrink-0"
                      />
                      <div>
                        <div className="font-bold text-white max-w-xs">{b.title}</div>
                        <div className="text-[11px] text-white/40">By {b.authorName || b.author}</div>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-cyan-300 font-medium">{b.category}</td>
                    <td className="py-4 px-6">{b.pages || b.totalPages || 400}</td>
                    <td className="py-4 px-6 font-bold text-white">
                      ₹{b.price}{' '}
                      <span className="text-white/40 line-through text-[11px] font-normal">
                        ₹{b.originalPrice}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          (b.status === 'Draft' || b.status === 'draft')
                            ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                            : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        }`}
                      >
                        {b.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right space-x-2">
                      <button
                        onClick={() => navigateTo(`/ebooks/${b.slug}`)}
                        className="p-1.5 bg-white/5 hover:bg-white/10 rounded-lg text-white/70 hover:text-white"
                        title="View Public Page"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => navigateTo(`/admin/ebooks/${b.id}/edit`)}
                        className="p-1.5 bg-primary-600/30 hover:bg-primary-600 rounded-lg text-cyan-300 hover:text-white"
                        title="Edit Book Details"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => deleteEBook(b.id)}
                        className="p-1.5 bg-rose-500/20 hover:bg-rose-500 rounded-lg text-rose-300 hover:text-white"
                        title="Delete Book"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
