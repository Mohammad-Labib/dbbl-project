"use client";

import { useEffect, useState, use } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

export default function AccountDetailsPage() {
  const params = useParams();
  const router = useRouter();

  // URL encode/decode হ্যান্ডেল করা (105.103.0643305 এর মতো একাউন্ট নম্বরের জন্য)
  const accountId = params?.id ? decodeURIComponent(params.id) : null;

  const [account, setAccount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000";

  useEffect(() => {
    if (!accountId) return;

    // ব্যাকএন্ডে API কল করা (ডট সহ অ্যাকাউন্ট নাম্বার ব্যাকএন্ডে পাঠানো)
    fetch(`${baseUrl}/api/dbbl/${encodeURIComponent(accountId)}`)
      .then((res) => {
        if (!res.ok) throw new Error("Account details not found");
        return res.json();
      })
      .then((data) => {
        setAccount(data);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, [accountId, baseUrl]);

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-10 flex items-center justify-center">
        <p className="text-gray-500 font-medium">Loading details...</p>
      </div>
    );
  }

  // Error State
  if (error || !account) {
    return (
      <div className="min-h-screen bg-gray-50 p-10 flex flex-col items-center justify-center">
        <h2 className="text-xl font-bold text-red-500 mb-2">Data Not Found</h2>
        <p className="text-gray-600 mb-4">{error || "No data exists for this ID"}</p>
        <button
          onClick={() => router.back()}
          className="px-4 py-2 bg-emerald-600 text-white rounded-lg"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-sm p-6 border">
        <Link href="/" className="text-sm text-emerald-600 hover:underline block mb-4">
          &larr  Back
        </Link>
        
        <h1 className="text-2xl font-bold text-gray-800 border-b pb-4 mb-4">
          {account["Name of A/C Holder"] || "Account Details"}
        </h1>

        <div className="space-y-3">
          <p><span className="font-semibold text-gray-600">Account Number:</span> {account["Account Number"]}</p>
          <p><span className="font-semibold text-gray-600">Bank Name:</span> {account["Bank Name"] || "DBBL"}</p>
          <p><span className="font-semibold text-gray-600">Designation:</span> {account.Designation || "N/A"}</p>
        </div>
      </div>
    </div>
  );
}