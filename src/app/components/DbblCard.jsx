"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function DbblCard() {
  const [accounts, setAccounts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 📝 Modal & Form States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    "Name of A/C Holder": "",
    "Bank Name": "DBBL",
    Designation: "",
    "Account Number": "",
  });

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://dbbl-project-server.vercel.app";

  const fetchAccounts = () => {
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
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  // 📥 Form Input Handler
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 🚀 Form Submit Handler (POST Request)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch(`${baseUrl}/api/dbbl`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to add account");

      // ফর্ম রিসেট ও রি-ফেচ
      setFormData({
        "Name of A/C Holder": "",
        "Bank Name": "DBBL",
        Designation: "",
        "Account Number": "",
      });
      setIsModalOpen(false);
      fetchAccounts(); // রিফ্রেশ না করেই নতুন ডাটা লোড
    } catch (err) {
      alert("Error adding account: " + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

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
      {/* Header, Add Button & Search Bar Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 border-b pb-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            DBBL Account Cards
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Total Accounts: {filteredAccounts.length}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 items-center">
          {/* 🔍 Search Input Field */}
          <div className="relative w-full sm:w-72">
            <input
              type="text"
              placeholder="Search by name, bank, or acc..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
            />
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

          {/* ➕ Add New Card Button */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full sm:w-auto px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm rounded-xl transition-all shadow-sm hover:shadow flex items-center justify-center gap-2 whitespace-nowrap"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 4v16m8-8H4"
              />
            </svg>
            Add Account
          </button>
        </div>
      </div>

      {/* 💳 Card List */}
      {filteredAccounts.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
          <p className="text-gray-500 font-medium">
            {searchTerm
              ? `No account found matching "${searchTerm}"`
              : "No accounts found. Click 'Add Account' to create one."}
          </p>
        </div>
      ) : (
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
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-500 to-teal-600"></div>

                <div>
                  <div className="flex justify-between items-start gap-2 mb-2">
                    <h2 className="text-lg font-bold text-gray-900 group-hover:text-emerald-600 transition-colors">
                      {account["Name of A/C Holder"] || "N/A"}
                    </h2>
                    <span className="text-xs bg-emerald-50 text-emerald-700 font-medium px-2.5 py-1 rounded-full border border-emerald-100">
                      {account["Bank Name"] || "DBBL"}
                    </span>
                  </div>

                  <p className="text-sm font-medium text-gray-500 mb-4">
                    {account.Designation || "Designation not set"}
                  </p>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-100 bg-gray-50/50 -mx-6 -mb-6 p-6 rounded-b-2xl space-y-3">
                  <div>
                    <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-1">
                      Account Number
                    </span>
                    <p className="text-base font-mono font-bold text-gray-800 tracking-wide">
                      {account["Account Number"] || "•••• •••• ••••"}
                    </p>
                  </div>

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

      {/* 📌 Add Account Modal Overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl relative border border-gray-100">
            {/* Modal Header */}
            <div className="flex justify-between items-center mb-5 border-b pb-3">
              <h3 className="text-lg font-bold text-gray-800">
                Add New Account
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">
                  Account Holder Name *
                </label>
                <input
                  type="text"
                  name="Name of A/C Holder"
                  required
                  placeholder="e.g. John Doe"
                  value={formData["Name of A/C Holder"]}
                  onChange={handleInputChange}
                  className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">
                  Bank Name *
                </label>
                <input
                  type="text"
                  name="Bank Name"
                  required
                  placeholder="e.g. DBBL"
                  value={formData["Bank Name"]}
                  onChange={handleInputChange}
                  className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">
                  Designation
                </label>
                <input
                  type="text"
                  name="Designation"
                  placeholder="e.g. Software Engineer"
                  value={formData.Designation}
                  onChange={handleInputChange}
                  className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">
                  Account Number *
                </label>
                <input
                  type="text"
                  name="Account Number"
                  required
                  placeholder="e.g. 1234567890"
                  value={formData["Account Number"]}
                  onChange={handleInputChange}
                  className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              {/* Form Buttons */}
              <div className="flex gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-medium transition-colors shadow-sm disabled:opacity-50"
                >
                  {isSubmitting ? "Saving..." : "Save Account"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}