import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ArrowLeft, Save, Plus, Trash2 } from 'lucide-react';
import { Course } from '../types';

export const AdminCourseFormPage: React.FC<{ courseId?: string }> = ({ courseId }) => {
  const { courses, addCourse, updateCourse, navigateTo, showToast } = useApp();
  const existingCourse = courseId ? courses.find((c) => c.id === courseId) : null;

  const [formData, setFormData] = useState<Partial<Course>>({
    title: existingCourse?.title || '',
    slug: existingCourse?.slug || '',
    category: existingCourse?.category || 'Artificial Intelligence',
    price: existingCourse?.price || 1499,
    originalPrice: existingCourse?.originalPrice || 4999,
    instructor: existingCourse?.instructor || 'GXA Senior Faculty',
    instructorBio: existingCourse?.instructorBio || 'Principal AI Architect at GXA Technology',
    duration: existingCourse?.duration || '12.5 Hours',
    level: existingCourse?.level || 'Beginner to Advanced',
    description: existingCourse?.description || '',
    thumbnail: existingCourse?.thumbnail || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80',
    curriculum: existingCourse?.curriculum || [
      {
        id: 'm1',
        title: 'Core Foundations',
        lessons: [
          { id: 'l1', title: 'Introduction & Architecture', duration: '15 mins', isPreview: true },
          { id: 'l2', title: 'Hands-On Setup', duration: '22 mins', isPreview: false },
        ],
      },
    ],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.slug) {
      showToast('Please fill in course title and slug');
      return;
    }

    if (existingCourse) {
      updateCourse({ ...existingCourse, ...formData } as Course);
      showToast('Course updated successfully! 🎓');
    } else {
      const newCourse: Course = {
        id: 'c-' + Date.now(),
        rating: 4.9,
        studentsCount: 1,
        learningOutcomes: ['Master enterprise frameworks', 'Build verifiable portfolio projects'],
        requirements: ['Basic computer proficiency', 'Desire to lead in tech'],
        ...formData,
      } as Course;
      addCourse(newCourse);
      showToast('New course added to catalogue! 🚀');
    }
    navigateTo('/admin/courses');
  };

  return (
    <div className="bg-[#000825] text-white min-h-screen py-8 md:py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
        <button
          onClick={() => navigateTo('/admin/courses')}
          className="text-xs text-white/60 hover:text-white flex items-center gap-1.5"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Course Management
        </button>

        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div>
            <h1 className="text-2xl font-black text-white">
              {existingCourse ? `Edit Course: ${existingCourse.title}` : 'Add New Course Masterclass'}
            </h1>
            <p className="text-xs text-white/60 mt-1">
              Configure curriculum outline, lesson durations, and enrollment price
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-[#101F45]/60 border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6">
            <h2 className="text-base font-bold text-white">1. Course Essentials</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="text-white/70 block mb-1">Course Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. AI Prompt Engineering Masterclass"
                  className="w-full bg-[#000825] border border-white/15 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="text-white/70 block mb-1">Slug *</label>
                <input
                  type="text"
                  required
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') })}
                  placeholder="e.g. ai-prompt-masterclass"
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
                  <option>Artificial Intelligence</option>
                  <option>Digital Marketing</option>
                  <option>Career Development</option>
                  <option>Tech Leadership</option>
                </select>
              </div>

              <div>
                <label className="text-white/70 block mb-1">Difficulty Level</label>
                <select
                  value={formData.level}
                  onChange={(e) => setFormData({ ...formData, level: e.target.value as any })}
                  className="w-full bg-[#000825] border border-white/15 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-cyan-400"
                >
                  <option>All Levels</option>
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
                </select>
              </div>
            </div>
          </div>

          <div className="bg-[#101F45]/60 border border-white/10 rounded-3xl p-6 sm:p-8 space-y-4">
            <h2 className="text-base font-bold text-white">2. Pricing & Instructor</h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div>
                <label className="text-white/70 block mb-1">Price (INR ₹) *</label>
                <input
                  type="number"
                  required
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                  className="w-full bg-[#000825] border border-white/15 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-cyan-400 font-bold"
                />
              </div>

              <div>
                <label className="text-white/70 block mb-1">Original Price (INR ₹)</label>
                <input
                  type="number"
                  value={formData.originalPrice}
                  onChange={(e) => setFormData({ ...formData, originalPrice: Number(e.target.value) })}
                  className="w-full bg-[#000825] border border-white/15 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="text-white/70 block mb-1">Instructor Name</label>
                <input
                  type="text"
                  value={formData.instructor}
                  onChange={(e) => setFormData({ ...formData, instructor: e.target.value })}
                  className="w-full bg-[#000825] border border-white/15 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-cyan-400"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => navigateTo('/admin/courses')}
              className="px-6 py-3 bg-white/10 hover:bg-white/15 rounded-xl text-xs font-bold text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-8 py-3 bg-cyan-400 hover:bg-cyan-300 font-bold rounded-xl text-xs uppercase tracking-wider text-slate-950 flex items-center gap-2 shadow-lg"
            >
              <Save className="w-4 h-4" /> Save Course
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
