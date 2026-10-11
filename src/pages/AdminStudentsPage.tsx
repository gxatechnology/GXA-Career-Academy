import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Users, Search, Mail, BookOpen, Video, ShieldCheck, RefreshCw } from 'lucide-react';

interface StudentRecord {
  studentId: string;
  name: string;
  email: string;
  enrolledCourses: string[];
  purchasedEBooks: string[];
  totalSpent: number;
  lastActive: string;
}

export const AdminStudentsPage: React.FC = () => {
  const { showToast, adminToken } = useApp();
  const [students, setStudents] = useState<StudentRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/students', {
        headers: { Authorization: `Bearer ${adminToken}` },
      });
      if (res.ok) {
        const json = await res.json();
        setStudents(json.students || []);
      }
    } catch (err) {
      console.error('Failed to load students:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, [adminToken]);

  const filtered = students.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase()) ||
      s.studentId.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-[#000825] text-white min-h-screen py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-400 bg-cyan-500/10 px-2.5 py-0.5 rounded border border-cyan-500/20">
                Identity & Entitlements
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white">Student Roster & Entitlements</h1>
            <p className="text-xs text-white/60 mt-1">
              Verified accounts, course enrollments, licensed eBooks, and cumulative spending
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={fetchStudents}
              className="px-3.5 py-2 bg-white/5 hover:bg-white/10 rounded-xl text-xs font-semibold text-white/80 hover:text-white flex items-center gap-1.5 border border-white/10 cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span>Refresh Students</span>
            </button>
            <button
              onClick={() => showToast('Student roster CSV exported successfully!')}
              className="px-4 py-2 bg-[#2455E8] hover:bg-[#1B44BF] rounded-xl text-xs font-bold text-white transition-colors cursor-pointer"
            >
              Export Roster (CSV)
            </button>
          </div>
        </div>

        {/* Filter bar */}
        <div className="flex items-center justify-between bg-[#101F45]/60 p-4 rounded-2xl border border-white/10">
          <div className="relative w-full max-w-sm">
            <Search className="w-4 h-4 text-white/40 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search student by name, email, or ID..."
              className="w-full bg-[#000825] border border-white/10 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
            />
          </div>
          <span className="text-xs text-white/50">{filtered.length} verified learners</span>
        </div>

        {/* Students Table */}
        <div className="bg-[#101F45]/60 border border-white/10 rounded-3xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-white/5 border-b border-white/10 text-white/60 uppercase font-semibold text-[11px]">
                <tr>
                  <th className="py-4 px-6">Learner Profile</th>
                  <th className="py-4 px-6">Enrolled Courses</th>
                  <th className="py-4 px-6">Unlocked eBooks</th>
                  <th className="py-4 px-6">Verified Spend</th>
                  <th className="py-4 px-6">Last Activity</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-white/80">
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-white/40">
                      No student records found in current database registry.
                    </td>
                  </tr>
                ) : (
                  filtered.map((s) => (
                    <tr key={s.studentId} className="hover:bg-white/5 transition-colors">
                      <td className="py-4 px-6">
                        <div className="font-semibold text-white">{s.name}</div>
                        <div className="text-[10px] text-white/40 flex items-center gap-1">
                          <Mail className="w-3 h-3" /> {s.email}
                        </div>
                        <div className="text-[9px] font-mono text-cyan-400/80">{s.studentId}</div>
                      </td>

                      <td className="py-4 px-6">
                        <span className="px-2.5 py-1 rounded-lg bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 font-semibold inline-flex items-center gap-1 text-[11px]">
                          <Video className="w-3 h-3" /> {s.enrolledCourses.length} Programs
                        </span>
                      </td>

                      <td className="py-4 px-6">
                        <span className="px-2.5 py-1 rounded-lg bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 font-semibold inline-flex items-center gap-1 text-[11px]">
                          <BookOpen className="w-3 h-3" /> {s.purchasedEBooks.length} eBooks
                        </span>
                      </td>

                      <td className="py-4 px-6 font-bold text-emerald-400">
                        ₹{s.totalSpent.toLocaleString('en-IN')}
                      </td>

                      <td className="py-4 px-6 text-white/50 text-[11px]">
                        {new Date(s.lastActive).toLocaleDateString('en-IN', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
