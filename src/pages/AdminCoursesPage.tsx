import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Plus, Edit, Trash2, Eye, Search, Video, Clock } from 'lucide-react';

export const AdminCoursesPage: React.FC = () => {
  const { courses, deleteCourse, navigateTo } = useApp();
  const [search, setSearch] = useState('');

  const filtered = courses.filter(
    (c) =>
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-[#000825] text-white min-h-screen py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Admin Navigation Bar */}
        <div className="flex items-center gap-2 border-b border-white/10 pb-4 overflow-x-auto text-xs font-semibold">
          {[
            { label: 'Overview', path: '/admin', active: false },
            { label: 'eBooks', path: '/admin/ebooks', active: false },
            { label: 'Courses', path: '/admin/courses', active: true },
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
            <h1 className="text-2xl sm:text-3xl font-black text-white">Course Curriculum Management</h1>
            <p className="text-xs text-white/60 mt-1">
              Manage video masterclasses, modules, instructor assignments, and cohort pricing
            </p>
          </div>

          <button
            onClick={() => navigateTo('/admin/courses/new')}
            className="px-4 py-2.5 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold rounded-xl text-xs flex items-center gap-1.5 shadow"
          >
            <Plus className="w-4 h-4" /> Add New Course
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
              placeholder="Search courses..."
              className="w-full bg-[#000825] border border-white/10 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
            />
          </div>
          <span className="text-xs text-white/50">{filtered.length} courses</span>
        </div>

        {/* Table */}
        <div className="bg-[#101F45]/60 border border-white/10 rounded-3xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-white/5 border-b border-white/10 text-white/60 uppercase font-semibold text-[11px]">
                <tr>
                  <th className="py-4 px-6">Course & Thumbnail</th>
                  <th className="py-4 px-6">Category</th>
                  <th className="py-4 px-6">Modules & Duration</th>
                  <th className="py-4 px-6">Price</th>
                  <th className="py-4 px-6">Instructor</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-white/80">
                {filtered.map((c) => (
                  <tr key={c.id} className="hover:bg-white/5 transition-colors">
                    <td className="py-4 px-6 flex items-center gap-3">
                      <img
                        src={c.thumbnail}
                        alt={c.title}
                        className="w-12 h-8 object-cover rounded-lg border border-white/10 shrink-0"
                      />
                      <div>
                        <div className="font-bold text-white max-w-xs">{c.title}</div>
                        <div className="text-[10px] text-cyan-400">{c.level}</div>
                      </div>
                    </td>
                    <td className="py-4 px-6 font-medium text-cyan-300">{c.category}</td>
                    <td className="py-4 px-6">
                      <div>{(c.curriculum?.length || c.modules?.length || 4)} Modules</div>
                      <div className="text-[10px] text-white/40">{c.duration || `${c.durationWeeks || 6} Weeks`}</div>
                    </td>
                    <td className="py-4 px-6 font-bold text-white">
                      ₹{c.price}{' '}
                      <span className="text-white/40 line-through text-[11px] font-normal">
                        ₹{c.originalPrice}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-white/70">{c.instructor}</td>
                    <td className="py-4 px-6 text-right space-x-2">
                      <button
                        onClick={() => navigateTo(`/courses/${c.slug}`)}
                        className="p-1.5 bg-white/5 hover:bg-white/10 rounded-lg text-white/70 hover:text-white"
                        title="View Public Details"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => navigateTo(`/admin/courses/${c.id}/edit`)}
                        className="p-1.5 bg-primary-600/30 hover:bg-primary-600 rounded-lg text-cyan-300 hover:text-white"
                        title="Edit Course"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => deleteCourse(c.id)}
                        className="p-1.5 bg-rose-500/20 hover:bg-rose-500 rounded-lg text-rose-300 hover:text-white"
                        title="Delete Course"
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
