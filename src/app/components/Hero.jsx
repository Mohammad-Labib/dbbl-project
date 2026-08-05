// components/Hero.jsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Hero() {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    // Search page-এ query নিয়ে যাওয়ার জন্য redirect
    router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <section className="relative py-20 lg:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
      <div className="max-w-3xl mx-auto space-y-6">
        
        {/* Badge */}
        <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold text-indigo-700 bg-indigo-100 rounded-full border border-indigo-200">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-pulse"></span>
          Discover Everything Faster
        </span>

        {/* Heading */}
        <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Search & Manage Your Digital Hub with Ease
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
          Find resources, monitor real-time analytics, and streamline your administrative operations seamlessly in one powerful workspace.
        </p>

        {/* Search Input & Button */}
        <div id="search" className="pt-4 max-w-2xl mx-auto">
          <form
            onSubmit={handleSearch}
            className="flex flex-col sm:flex-row gap-3 p-2 bg-white rounded-2xl shadow-lg border border-slate-200"
          >
            <div className="relative flex-1 flex items-center">
              <svg
                className="w-5 h-5 text-slate-400 absolute left-4 pointer-events-none"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search documents, topics, or queries..."
                className="w-full pl-12 pr-4 py-3.5 text-slate-800 placeholder-slate-400 bg-transparent rounded-xl focus:outline-none text-base"
              />
            </div>
            
            <button
              type="submit"
              className="px-7 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 group cursor-pointer"
            >
              <span>Search</span>
              <svg
                className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </button>
          </form>
        </div>

        {/* Quick Tags / Keywords */}
        <div className="pt-2 flex items-center justify-center gap-2 text-xs text-slate-500 flex-wrap">
          <span className="font-medium text-slate-600">Popular:</span>
          <button
            onClick={() => setSearchQuery('Next.js')}
            className="hover:text-indigo-600 underline cursor-pointer"
          >
            Next.js
          </button>
          <span>•</span>
          <button
            onClick={() => setSearchQuery('Tailwind CSS')}
            className="hover:text-indigo-600 underline cursor-pointer"
          >
            Tailwind CSS
          </button>
          <span>•</span>
          <button
            onClick={() => setSearchQuery('UI Components')}
            className="hover:text-indigo-600 underline cursor-pointer"
          >
            UI Components
          </button>
        </div>

      </div>
    </section>
  );
}