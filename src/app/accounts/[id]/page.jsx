"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function AccountDetailsPage() {
  const params = useParams();
  const router = useRouter();

  // Dynamic param থেকে আইডি বের করা
  const rawId = params?.id
    ? Array.isArray(params.id)
      ? params.id[0]
      : params.id
    : "";
  const accountId = rawId ? decodeURIComponent(rawId) : "";

  const [account, setAccount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://dbbl-project-server.vercel.app";

  useEffect(() => {
    if (!accountId) return;

    let isMounted = true;
    setLoading(true);

    fetch(`${baseUrl}/api/dbbl/${encodeURIComponent(accountId)}`)
      .then((res) => {
        if (!res.ok) throw new Error("Account details not found");
        return res.json();
      })
      .then((data) => {
        if (isMounted) {
          setAccount(data);
          setError(null);
        }
      })
      .catch((err) => {
        if (isMounted) setError(err.message);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [accountId, baseUrl]);

  // অ্যাকাউন্ট নাম্বার কপি করার ফাংশন
  const handleCopyAccountNumber = () => {
    if (account?.["Account Number"]) {
      navigator.clipboard.writeText(account["Account Number"]);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // অ্যাকাউন্ট ডিলিট হ্যান্ডলার
  const handleDeleteAccount = async () => {
    setIsDeleting(true);
    try {
      const res = await fetch(`${baseUrl}/api/dbbl/${encodeURIComponent(accountId)}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete the account.");

      router.push("/accounts");
    } catch (err) {
      alert(err.message || "Something went wrong while deleting.");
      setIsDeleting(false);
      setShowDeleteModal(false);
    }
  };

  // ১. লোডিং অবস্থা (Sleek Skeleton Loader)
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50/60 p-4 md:p-10 flex items-center justify-center">
        <div className="bg-white border border-slate-200/80 rounded-3xl p-8 max-w-xl w-full shadow-sm animate-pulse space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-slate-200 rounded-2xl"></div>
            <div className="space-y-2 flex-1">
              <div className="h-6 bg-slate-200 rounded-lg w-3/4"></div>
              <div className="h-4 bg-slate-200 rounded-lg w-1/2"></div>
            </div>
          </div>
          <div className="space-y-3 pt-6 border-t border-slate-100">
            <div className="h-14 bg-slate-100 rounded-2xl w-full"></div>
            <div className="grid grid-cols-2 gap-3">
              <div className="h-16 bg-slate-100 rounded-2xl"></div>
              <div className="h-16 bg-slate-100 rounded-2xl"></div>
            </div>
          </div>
          <div className="h-10 bg-slate-200 rounded-xl w-full pt-4"></div>
        </div>
      </div>
    );
  }

  // ২. এরর বা ডাটা না পাওয়ার অবস্থা
  if (error || !account) {
    return (
      <div className="min-h-screen bg-slate-50/60 p-6 flex flex-col items-center justify-center">
        <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-xl shadow-slate-200/50 text-center max-w-md w-full space-y-5">
          <div className="w-14 h-14 bg-rose-50 text-rose-500 rounded-2xl flex items-center justify-center mx-auto border border-rose-100">
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-800">Account Not Found</h2>
            <p className="text-sm text-slate-500 mt-1">
              {error || "Could not retrieve details for this account."}
            </p>
          </div>
          <button
            onClick={() => router.back()}
            className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-medium text-sm rounded-xl transition-all shadow-md active:scale-[0.98]"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const holderName = account["Name of A/C Holder"] || "N/A";

  // ৩. প্রধান Details UI
  return (
    <div className="min-h-screen bg-slate-50/60 py-8 px-4 sm:px-6 md:px-10">
      <div className="max-w-2xl mx-auto">
        
        {/* Main Profile Card Container */}
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xl shadow-slate-200/40 overflow-hidden">
          
          {/* Top Banner with Header Visual/Image */}
          <div className="relative bg-gradient-to-br from-emerald-600 via-teal-700 to-emerald-900 p-6 sm:p-8 text-white">
            <div className="absolute top-0 right-0 -mt-6 -mr-6 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
              <div className="flex items-center gap-4">
                
                {/* Account Holder Image / Avatar Badge */}
                <div className="relative group">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20 shadow-inner overflow-hidden">
                    {/* ইউজার ইমেজ ডাইনামিক না থাকলে অ্যাভাটার এসভিজি শো করবে */}
                    <svg className="w-10 h-10 text-emerald-100/90" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                    </svg>
                  </div>
                </div>

                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-200 bg-white/10 px-2.5 py-0.5 rounded-full border border-white/10">
                    Account Profile
                  </span>
                  <h1 className="text-xl sm:text-2xl font-bold mt-1.5 tracking-tight text-white">
                    {holderName}
                  </h1>
                  <p className="text-emerald-100/80 text-xs sm:text-sm mt-0.5">
                    {account.Designation || "Designation Not Set"}
                  </p>
                </div>
              </div>

              <div className="self-start sm:self-center">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 backdrop-blur-md text-white text-xs font-bold rounded-xl border border-white/20 shadow-xs">
                  <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse"></span>
                  {account["Bank Name"] || "DBBL"}
                </span>
              </div>
            </div>
          </div>

          {/* Details Sections */}
          <div className="p-6 sm:p-8 space-y-6">
            
            {/* Account Number Box */}
            <div className="bg-slate-50/80 p-5 rounded-2xl border border-slate-200/70 flex items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                  Account Number
                </span>
                <p className="text-xl font-mono font-bold text-slate-900 tracking-tight">
                  {account["Account Number"] || "N/A"}
                </p>
              </div>

              {account["Account Number"] && (
                <button
                  onClick={handleCopyAccountNumber}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-emerald-700 bg-white hover:bg-emerald-50 border border-slate-200/80 hover:border-emerald-200 rounded-xl shadow-xs transition-all active:scale-95"
                >
                  {copied ? (
                    <>
                      <svg className="w-3.5 h-3.5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                      </svg>
                      Copied!
                    </>
                  ) : (
                    <>
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      Copy
                    </>
                  )}
                </button>
              )}
            </div>

            {/* Information Grid Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Bank Card */}
              <div className="p-4 rounded-2xl border border-slate-200/60 bg-white flex items-start gap-3.5 hover:border-slate-300 transition-colors">
                <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl mt-0.5">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <div>
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                    Bank Name
                  </span>
                  <p className="text-base font-bold text-slate-800 mt-0.5">
                    {account["Bank Name"] || "DBBL"}
                  </p>
                </div>
              </div>

              {/* Designation Card */}
              <div className="p-4 rounded-2xl border border-slate-200/60 bg-white flex items-start gap-3.5 hover:border-slate-300 transition-colors">
                <div className="p-2.5 bg-teal-50 text-teal-600 rounded-xl mt-0.5">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                    Designation
                  </span>
                  <p className="text-base font-bold text-slate-800 mt-0.5">
                    {account.Designation || "N/A"}
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* Bottom Action Footer Bar (Back, Edit, Delete Buttons Inside Card) */}
          <div className="px-6 sm:px-8 py-4 bg-slate-50/80 border-t border-slate-200/60 flex items-center justify-between gap-3">
            {/* Back Button */}
            <button
              onClick={() => router.back()}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200/80 rounded-xl shadow-xs transition-all active:scale-95"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back
            </button>

            {/* Edit & Delete Action Buttons */}
            <div className="flex items-center gap-2.5">
              <button
                onClick={() => router.push(`/accounts/edit/${encodeURIComponent(accountId)}`)}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 text-sm font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200/80 rounded-xl transition-all active:scale-95"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Edit
              </button>
              <button
                onClick={() => setShowDeleteModal(true)}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 text-sm font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200/80 rounded-xl transition-all active:scale-95"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Delete
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Modern Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full space-y-4 shadow-2xl border border-slate-100">
            <div className="w-12 h-12 bg-rose-50 text-rose-600 rounded-2xl flex items-center justify-center">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">Confirm Deletion</h3>
              <p className="text-sm text-slate-500 mt-1">
                Are you sure you want to delete this account? This action cannot be undone.
              </p>
            </div>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                disabled={isDeleting}
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-all"
              >
                Cancel
              </button>
              <button
                disabled={isDeleting}
                onClick={handleDeleteAccount}
                className="px-4 py-2.5 text-sm font-semibold text-white bg-rose-600 hover:bg-rose-700 rounded-xl shadow-md transition-all disabled:opacity-50 active:scale-95"
              >
                {isDeleting ? "Deleting..." : "Delete Account"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}