import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { FolderTree, Plus, Trash2, Edit, Tag, BookOpen, Layers } from 'lucide-react';

export const AdminContentPage: React.FC = () => {
  const { navigateTo, showToast } = useApp();
  const [categories, setCategories] = useState([
    { id: 'cat-1', name: 'Digital Marketing', slug: 'digital-marketing', count: 12, type: 'Core Track' },
    { id: 'cat-2', name: 'Artificial Intelligence', slug: 'artificial-intelligence', count: 8, type: 'Core Track' },
    { id: 'cat-3', name: 'Career Development', slug: 'career-development', count: 6, type: 'Core Track' },
    { id: 'cat-4', name: 'Data Science & Analytics', slug: 'data-science', count: 4, type: 'Elective' },
    { id: 'cat-5', name: 'Tech Leadership', slug: 'tech-leadership', count: 5, type: 'Executive' },
  ]);
  const [newCatName, setNewCatName] = useState('');

  const handleAddCat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatName.trim()) return;
    setCategories([
      ...categories,
      {
        id: 'cat-' + Date.now(),
        name: newCatName,
        slug: newCatName.toLowerCase().replace(/\s+/g, '-'),
        count: 0,
        type: 'Core Track',
      },
    ]);
    setNewCatName('');
    showToast('Category created successfully! 🏷️');
  };

  return (
    <div className="bg-[#000825] text-white min-h-screen py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Navigation Bar */}
        <div className="flex items-center gap-2 border-b border-white/10 pb-4 overflow-x-auto text-xs font-semibold">
          {[
            { label: 'Overview', path: '/admin', active: false },
            { label: 'eBooks', path: '/admin/ebooks', active: false },
            { label: 'Courses', path: '/admin/courses', active: false },
            { label: 'Students', path: '/admin/students', active: false },
            { label: 'Orders & Payments', path: '/admin/orders', active: false },
            { label: 'Categories & Content', path: '/admin/content', active: true },
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

        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">Content Taxonomy & Categories</h1>
          <p className="text-xs text-white/60 mt-1">
            Organize digital bookstore genres, course subject tags, and navigation filters
          </p>
        </div>

        {/* Create Category Form */}
        <div className="bg-[#101F45]/60 border border-white/10 rounded-3xl p-6 sm:p-8">
          <h2 className="text-base font-bold text-white mb-4">Add New Subject Category</h2>
          <form onSubmit={handleAddCat} className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              required
              value={newCatName}
              onChange={(e) => setNewCatName(e.target.value)}
              placeholder="e.g. Prompt Engineering & LLMOps"
              className="flex-1 bg-[#000825] border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400"
            />
            <button
              type="submit"
              className="px-6 py-2.5 bg-cyan-400 hover:bg-cyan-300 font-bold text-slate-950 rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors"
            >
              <Plus className="w-4 h-4" /> Create Category
            </button>
          </form>
        </div>

        {/* Categories List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((c) => (
            <div
              key={c.id}
              className="bg-[#101F45]/60 border border-white/10 rounded-2xl p-5 flex items-center justify-between shadow-lg"
            >
              <div>
                <span className="text-[10px] uppercase font-bold text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded">
                  {c.type}
                </span>
                <h3 className="font-bold text-sm text-white mt-1.5">{c.name}</h3>
                <p className="text-xs text-white/40 mt-0.5">{c.count} Active Catalog Products</p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => showToast(`Editing category: ${c.name}`)}
                  className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-white/70 hover:text-white"
                >
                  <Edit className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
