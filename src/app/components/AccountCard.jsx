// components/AccountCard.jsx
'use client';

import Link from "next/link";

export default function AccountCard({  dashboard }) {
  // প্রপ্স না পাঠালে ডিফোল্ট ডেটা দেখাবে
  const defaultAccount = {
    accountName: 'Mohammad Labib',
    accountNumber: '107-152-8904123',
    branchName: 'Dhaka Main Branch',
    mobileNumber: '+880 1712-345678',
  };

  const data = dashboard || defaultAccount;

  return (
    <div className="max-w-sm w-full bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all p-6 space-y-5">
      {/* Header & Avatar */}
      <div className="flex items-center gap-4 border-b border-slate-100 pb-4">
        <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-lg shadow-sm">
          {data.accountName ? data.accountName.charAt(0) : 'A'}
        </div>
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md">
            Account Holder
          </span>
          <h3 className="text-lg font-bold text-slate-900 leading-snug mt-0.5">
            {data.accountName}
          </h3>
        </div>
      </div>

      {/* Account Info List */}
      <div className="space-y-3 text-sm">
        <div className="flex justify-between items-center py-1">
          <span className="text-slate-500 font-medium">Account No:</span>
          <span className="font-mono font-semibold text-slate-800 bg-slate-50 px-2.5 py-1 rounded-md border border-slate-100">
            {data.accountNumber}
          </span>
        </div>

        <div className="flex justify-between items-center py-1">
          <span className="text-slate-500 font-medium">Branch:</span>
          <span className="font-semibold text-slate-800">
            {data.branchName}
          </span>
        </div>

        <div className="flex justify-between items-center py-1">
          <span className="text-slate-500 font-medium">Mobile:</span>
          <span className="font-medium text-slate-800">
            {data.mobileNumber}
          </span>
        </div>
      </div>

      {/* Action Link Button */}
      <div className="pt-2">
        <Link
          href={`/dashboard/${data.accountNumber}`}
          className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl text-sm transition-colors shadow-sm flex items-center justify-center gap-2 cursor-pointer group"
        >
          <span>View Details</span>
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
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
}