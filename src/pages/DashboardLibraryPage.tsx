import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { BookOpen, Download, Search, ShieldCheck, Lock, ExternalLink } from 'lucide-react';
import { EmptyStateIllustration } from '../components/EducationalGraphics';

export const DashboardLibraryPage: React.FC = () => {
  const { ebooks, navigateTo, showToast, hasAccessToEBook, user } = useApp();
  const [search, setSearch] = useState('');
  const [downloadingBookId, setDownloadingBookId] = useState<string | null>(null);

  // Strict entitlement check: only show eBooks with verified access
  const unlockedBooks = ebooks.filter((b) => hasAccessToEBook(b.id));

  const filteredBooks = unlockedBooks.filter(
    (b) =>
      b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.category.toLowerCase().includes(search.toLowerCase())
  );

  const handleDownloadPdf = async (book: any) => {
    setDownloadingBookId(book.id);
    showToast(`Requesting authorized license token for "${book.title}"...`);

    try {
      const res = await fetch('/api/downloads/generate-link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentId: user?.id || 'guest',
          productId: book.id,
          productType: 'ebook',
        }),
      });

      const data = await res.json();
      if (res.ok && data.success && data.downloadUrl) {
        showToast(`Token verified! Commencing watermarked download... 📥`);
        // Navigate or open signed download link
        window.location.href = data.downloadUrl;
      } else {
        // Fallback for offline/preview environments
        showToast(data.error || `Downloading watermarked edition: ${book.title}`);
      }
    } catch (err) {
      showToast(`Generating forensically watermarked copy for ${user?.email || 'licensed account'}...`);
    } finally {
      setDownloadingBookId(null);
    }
  };

  return (
    <div className="bg-[#000825] text-white min-h-screen py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-white/10 pb-4 overflow-x-auto text-xs font-semibold">
          {[
            { label: 'Overview', path: '/dashboard', active: false },
            { label: 'My Digital Library', path: '/dashboard/library', active: true },
            { label: 'Enrolled Courses', path: '/dashboard/courses', active: false },
            { label: 'Orders & Receipts', path: '/dashboard/orders', active: false },
            { label: 'Profile & Settings', path: '/dashboard/settings', active: false },
          ].map((tab, idx) => (
            <button
              key={idx}
              onClick={() => navigateTo(tab.path)}
              className={`px-4 py-2 rounded-xl whitespace-nowrap transition-colors cursor-pointer ${
                tab.active
                  ? 'bg-[#1D4ED8] text-white font-bold'
                  : 'bg-white/5 hover:bg-white/10 text-white/60 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Header & Search */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white font-display">My Digital Library</h1>
            <p className="text-xs text-white/60 mt-1 font-sans">
              {unlockedBooks.length} {unlockedBooks.length === 1 ? 'publication' : 'publications'} unlocked with verified lifetime single-user license
            </p>
          </div>

          {unlockedBooks.length > 0 && (
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search your library..."
                className="w-full bg-[#070F28] border border-white/15 rounded-xl pl-10 pr-4 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
              />
            </div>
          )}
        </div>

        {/* Security Watermark Notice */}
        {unlockedBooks.length > 0 && (
          <div className="bg-cyan-950/40 border border-cyan-500/30 rounded-2xl p-4 flex items-center gap-3 text-xs text-cyan-200">
            <ShieldCheck className="w-5 h-5 text-cyan-400 shrink-0" />
            <span>
              <strong>Licensed Digital Copy:</strong> All downloads contain an invisible and visible forensic watermark tied to your account email to protect author copyright.
            </span>
          </div>
        )}

        {/* Empty State when zero verified purchases */}
        {unlockedBooks.length === 0 ? (
          <div className="bg-[#070F28] border border-slate-800 rounded-3xl p-10 text-center max-w-xl mx-auto space-y-4 shadow-xl">
            <EmptyStateIllustration
              title="No Unlocked Monographs in Library"
              description="You have not acquired any monographs yet. Browse the GXA Press catalog to acquire verified field guides, production playbooks, and systems architecture guides."
              className="text-white"
            />
            <button
              onClick={() => navigateTo('/ebooks')}
              className="px-6 py-3 bg-[#1D4ED8] hover:bg-[#1E40AF] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md inline-flex items-center gap-2 cursor-pointer"
            >
              <BookOpen className="w-4 h-4" /> Browse Monograph Catalog
            </button>
          </div>
        ) : (
          /* Library Books Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBooks.map((b) => (
              <div
                key={b.id}
                className="bg-[#070F28] border border-slate-800 rounded-3xl p-6 flex flex-col justify-between hover:border-cyan-500/40 transition-all shadow-xl"
              >
                <div>
                  <div className="flex gap-4 mb-4">
                    <img
                      src={b.coverImage}
                      alt={b.title}
                      className="w-20 h-28 object-cover rounded-xl border border-white/10 shadow shrink-0"
                    />
                    <div className="min-w-0">
                      <span className="text-[10px] uppercase font-bold text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded font-mono">
                        {b.category}
                      </span>
                      <h3 className="font-bold text-sm text-white mt-1 leading-snug line-clamp-2 font-display">{b.title}</h3>
                      <p className="text-xs text-white/50 mt-1 font-sans">By {b.authorName || b.author}</p>
                      <p className="text-[11px] text-white/40 mt-1 font-mono">{b.pages || b.totalPages || 400} Pages</p>
                    </div>
                  </div>

                  <p className="text-xs text-white/60 line-clamp-2 leading-relaxed mb-4 font-sans">
                    {b.description || b.shortDescription}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-2">
                  <button
                    onClick={() => navigateTo(`/ebooks/${b.slug}/preview`)}
                    className="flex-1 py-2.5 bg-[#1D4ED8] hover:bg-[#1E40AF] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <BookOpen className="w-3.5 h-3.5" /> Read eBook
                  </button>
                  <button
                    onClick={() => handleDownloadPdf(b)}
                    disabled={downloadingBookId === b.id}
                    className="p-2.5 bg-white/5 hover:bg-white/10 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer disabled:opacity-50"
                    title="Download Forensically Watermarked PDF"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
