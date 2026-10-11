import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { FREE_RESOURCES } from '../data/mockData';
import { Gift, Download, FileText, CheckCircle2, Search, ArrowRight } from 'lucide-react';
import {
  EmptyStateIllustration,
  FreeResourcesBundleGraphic,
} from '../components/EducationalGraphics';

export const ResourcesPage: React.FC = () => {
  const { showToast, navigateTo } = useApp();
  const [search, setSearch] = useState('');
  const [downloadedIds, setDownloadedIds] = useState<string[]>([]);
  const [emailModalResource, setEmailModalResource] = useState<typeof FREE_RESOURCES[0] | null>(null);
  const [emailInput, setEmailInput] = useState('');

  const filtered = FREE_RESOURCES.filter(
    (r) =>
      r.title.toLowerCase().includes(search.toLowerCase()) ||
      r.description.toLowerCase().includes(search.toLowerCase()) ||
      r.type.toLowerCase().includes(search.toLowerCase())
  );

  const handleDownloadClick = (res: typeof FREE_RESOURCES[0]) => {
    setEmailModalResource(res);
  };

  const submitDownload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput || !emailModalResource) return;
    setDownloadedIds([...downloadedIds, emailModalResource.id]);
    showToast(`Instant download link sent to ${emailInput}! Check your inbox. 📩`);
    setEmailModalResource(null);
    setEmailInput('');
  };

  return (
    <div className="bg-[#F9FAF7] text-[#121E17] min-h-screen py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-6xl mx-auto">
          <div className="lg:col-span-7 space-y-4 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-[#059669] text-xs font-semibold uppercase tracking-wider">
              <Gift className="w-3.5 h-3.5 text-[#EA580C]" /> No Cost • Immediate Field Toolkits
            </div>
            <h1 className="text-3xl md:text-5xl font-black text-[#072118] tracking-tight">
              Free Knowledge Resources &amp; Toolkits
            </h1>
            <p className="text-[#52635B] text-base md:text-lg leading-relaxed">
              Download our curated cheatsheets, architecture templates, and practical code frameworks to accelerate your learning without spending a rupee.
            </p>

            {/* Search */}
            <div className="max-w-md pt-2">
              <div className="relative">
                <Search className="w-4 h-4 text-[#85988F] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search cheatsheets, templates, checklists..."
                  className="w-full bg-white border border-[#CBD5CD] rounded-2xl pl-10 pr-4 py-3 text-sm text-[#072118] placeholder-[#85988F] focus:outline-none focus:border-[#EA580C] focus:ring-2 focus:ring-orange-100 shadow-sm"
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-sm bg-white p-3 rounded-2xl border border-[#E2E8E4] shadow-md">
              <FreeResourcesBundleGraphic className="w-full h-auto drop-shadow-md" />
            </div>
          </div>
        </div>

        {/* Resource Grid */}
        {filtered.length === 0 ? (
          <div className="bg-white border border-[#E2E8E4] rounded-3xl p-12 text-center shadow-sm">
            <EmptyStateIllustration
              title="No resources match your query"
              description="Try searching with a broader keyword such as 'cheatsheet', 'framework', or 'prompt'."
              className="text-[#072118] max-w-sm mx-auto"
            />
            <button
              onClick={() => setSearch('')}
              className="mt-4 px-5 py-2.5 bg-[#EA580C] hover:bg-[#C2410C] text-white font-bold rounded-xl text-xs transition-colors cursor-pointer shadow-sm"
            >
              Clear Search Query
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {filtered.map((res) => {
              const hasDownloaded = downloadedIds.includes(res.id);
              return (
                <div
                  key={res.id}
                  className="bg-white border border-[#E2E8E4] rounded-3xl p-6 flex flex-col justify-between hover:border-emerald-300 hover:shadow-xl transition-all duration-300"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-[#EBF2EC] text-[#059669] border border-emerald-200">
                        {res.type}
                      </span>
                      <span className="text-[11px] text-[#52635B] font-mono">{res.fileSize} • Direct Toolkit</span>
                    </div>

                    <h3 className="text-xl font-bold text-[#072118] mb-2 leading-snug">{res.title}</h3>
                    <p className="text-xs text-[#52635B] mb-6 leading-relaxed">{res.description}</p>
                  </div>

                  <div className="pt-4 border-t border-[#F0F4F1] flex items-center justify-between">
                    <span className="text-xs font-bold text-[#059669] bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      100% Free
                    </span>
                    <button
                      onClick={() => handleDownloadClick(res)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                        hasDownloaded
                          ? 'bg-emerald-100 text-[#059669] border border-emerald-300'
                          : 'bg-[#EA580C] hover:bg-[#C2410C] text-white shadow-sm'
                      }`}
                    >
                      <Download className="w-3.5 h-3.5" />
                      {hasDownloaded ? 'Downloaded' : 'Download PDF'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Modal for Free Download Lead Gen */}
        {emailModalResource && (
          <div className="fixed inset-0 z-50 bg-[#072118]/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white border border-[#E2E8E4] rounded-3xl p-6 md:p-8 max-w-md w-full shadow-2xl relative">
              <button
                onClick={() => setEmailModalResource(null)}
                className="absolute top-4 right-4 text-[#85988F] hover:text-[#072118] font-bold text-lg cursor-pointer"
              >
                ✕
              </button>
              <div className="w-12 h-12 rounded-xl bg-orange-100 text-[#EA580C] flex items-center justify-center mb-4">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#072118] mb-2">Get {emailModalResource.title}</h3>
              <p className="text-xs text-[#52635B] mb-6 leading-relaxed">
                Enter your email address to receive immediate access and future complimentary updates from GXA Career Academy.
              </p>

              <form onSubmit={submitDownload} className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-[#121E17] block mb-1">Your Best Email Address</label>
                  <input
                    type="email"
                    required
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full bg-[#F8FAF8] border border-[#CBD5CD] rounded-xl px-4 py-2.5 text-sm text-[#072118] focus:outline-none focus:border-[#EA580C]"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 bg-[#EA580C] hover:bg-[#C2410C] text-white font-bold rounded-xl text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer"
                >
                  Send Free Download Link
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
