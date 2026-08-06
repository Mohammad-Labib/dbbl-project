"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-slate-50/60 flex items-center justify-center p-4 sm:p-6 md:p-10">
      <div className="max-w-md w-full bg-white border border-slate-200/80 rounded-3xl p-8 sm:p-10 shadow-xl shadow-slate-200/50 text-center relative overflow-hidden">
        
        {/* Background Glow Effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -mt-12 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

        {/* 404 Visual Icon Badge */}
        <div className="relative z-10">
          <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-emerald-100 shadow-inner">
            <svg
              className="w-10 h-10"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>

          {/* Error Code & Message */}
          <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200/60 inline-block mb-3">
            Error 404
          </span>
          
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Page Not Found
          </h1>
          
          <p className="text-sm text-slate-500 mt-2.5 leading-relaxed">
            Oops! The page you are looking for doesn t exist or has been moved to another URL.
          </p>

          {/* Quick Action Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => router.back()}
              className="w-full sm:w-auto px-5 py-2.5 text-sm font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200/80 rounded-xl transition-all active:scale-95 shadow-xs"
            >
              ← Go Back
            </button>

            <Link
              href="/dashboard"
              className="w-full sm:w-auto px-5 py-2.5 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-md transition-all active:scale-95 text-center"
            >
              Back to Dashboard
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}