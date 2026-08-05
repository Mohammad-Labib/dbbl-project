"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function DbblCard() {
  const [accounts, setAccounts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // .env.local থেকে NEXT_PUBLIC_BASE_URL আনা হচ্ছে
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://dbbl-project-server.vercel.app";

    fetch(`${baseUrl}/api/dbbl`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch data");
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setAccounts(data);
        } else {
          setAccounts([]);
        }
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  // সার্চ এর ওপর ভিত্তি করে ডাটা ফিল্টার করার লজিক
  const filteredAccounts = accounts.filter((account) => {
    const name = account["Name of A/C Holder"]?.toLowerCase() || "";
    const bank = account["Bank Name"]?.toLowerCase() || "";
    const accNumber = String(account["Account Number"] || "").toLowerCase();
    const query = searchTerm.toLowerCase();

    return (
      name.includes(query) ||
      bank.includes(query) ||
      accNumber.includes(query)
    );
  });

  // ১. লোডিং স্টেট (Skeleton Loading)
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6 max-w-7xl mx-auto">
        {[1, 2, 3].map((n) => (
          <div
            key={n}
            className="border rounded-2xl p-6 shadow-sm animate-pulse space-y-4 bg-gray-50"
          >
            <div className="h-6 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="space-y-2 pt-2">
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // ২. এরর স্টেট
  if (error) {
    return (
      <div className="p-6 text-center text-red-600 bg-red-50 rounded-xl max-w-md mx-auto my-10 border border-red-200">
        <p className="font-semibold">Error: {error}</p>
        <p className="text-sm text-red-500 mt-1">
          Please check if the backend server is running.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header & Search Bar Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 border-b pb-4">
        <h1 className="text-2xl font-bold text-gray-800">
          DBBL Account Cards
        </h1>

        {/* 🔍 Search Input Field */}
        <div className="relative w-full md:w-80">
          <input
            type="text"
            placeholder="Search by name, bank, or account no..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
          />
          {/* Search Icon */}
          <svg
            className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5"
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
        </div>
      </div>

      {/* ৩. সার্চের পর ডাটা না থাকলে (Empty State) */}
      {filteredAccounts.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
          <p className="text-gray-500 font-medium">
            No account found matching {searchTerm}
          </p>
        </div>
      ) : (
        /* ৪. মূল কার্ড লিস্ট UI */
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredAccounts.map((account, index) => {
            const accountId =
              account["Account Number"] || account._id || index;

            return (
              <Link
                key={account._id || index}
                href={`/accounts/${encodeURIComponent(accountId)}`}
                className="group relative bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between overflow-hidden cursor-pointer"
              >
                {/* Top Accent Line */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-500 to-teal-600"></div>

                <div>
                  {/* Account Holder Name */}
                  <div className="flex justify-between items-start gap-2 mb-2">
                    <h2 className="text-lg font-bold text-gray-900 group-hover:text-emerald-600 transition-colors">
                      {account["Name of A/C Holder"] || "N/A"}
                    </h2>
                    <span className="text-xs bg-emerald-50 text-emerald-700 font-medium px-2.5 py-1 rounded-full border border-emerald-100">
                      {account["Bank Name"] || "DBBL"}
                    </span>
                  </div>

                  {/* Designation */}
                  <p className="text-sm font-medium text-gray-500 mb-4">
                    {account.Designation || "Designation not set"}
                  </p>
                </div>

                {/* Account Details Box & Button */}
                <div className="mt-4 pt-4 border-t border-gray-100 bg-gray-50/50 -mx-6 -mb-6 p-6 rounded-b-2xl space-y-3">
                  <div>
                    <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-1">
                      Account Number
                    </span>
                    <p className="text-base font-mono font-bold text-gray-800 tracking-wide">
                      {account["Account Number"] || "•••• •••• ••••"}
                    </p>
                  </div>

                  {/* 🔘 View Details Button */}
                  <div className="w-full mt-2 py-2 px-4 bg-emerald-600 group-hover:bg-emerald-700 text-white font-medium text-xs rounded-xl transition-all duration-200 flex items-center justify-center gap-1.5 shadow-sm">
                    <span>View Details</span>
                    <svg
                      className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1"
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
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}