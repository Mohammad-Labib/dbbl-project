"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function DashboardPage() {
  const [accounts, setAccounts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBank, setSelectedBank] = useState("ALL");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 📝 Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    "Name of A/C Holder": "",
    "Bank Name": "DBBL",
    Designation: "",
    "Account Number": "",
  });

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://dbbl-project-server.vercel.app";

  // 📥 Fetch Accounts Data
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

  // 🖊️ Form Handlers
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

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

      setFormData({
        "Name of A/C Holder": "",
        "Bank Name": "DBBL",
        Designation: "",
        "Account Number": "",
      });
      setIsModalOpen(false);
      fetchAccounts();
    } catch (err) {
      alert("Error adding account: " + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // 📊 Analytics Calculations
  const totalAccounts = accounts.length;
  const uniqueBanks = Array.from(
    new Set(accounts.map((acc) => acc["Bank Name"] || "DBBL"))
  );

  // 🔍 Filter Logic (Search + Bank Filter)
  const filteredAccounts = accounts.filter((account) => {
    const name = account["Name of A/C Holder"]?.toLowerCase() || "";
    const bank = account["Bank Name"]?.toLowerCase() || "";
    const accNumber = String(account["Account Number"] || "").toLowerCase();
    const query = searchTerm.toLowerCase();

    const matchesSearch =
      name.includes(query) || bank.includes(query) || accNumber.includes(query);

    const matchesBank =
      selectedBank === "ALL" ||
      bank.toUpperCase() === selectedBank.toUpperCase();

    return matchesSearch && matchesBank;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50/50 p-6 md:p-10 max-w-7xl mx-auto space-y-8 animate-pulse">
        <div className="h-10 bg-gray-200 rounded-xl w-1/4"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((n) => (
            <div key={n} className="h-28 bg-gray-200 rounded-2xl"></div>
          ))}
        </div>
        <div className="h-64 bg-gray-200 rounded-2xl"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-center text-red-600 bg-red-50 rounded-xl max-w-md mx-auto my-12 border border-red-200">
        <p className="font-semibold">Error: {error}</p>
        <p className="text-sm text-red-500 mt-1">
          Please check if the backend server is running.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/50 p-6 md:p-10">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* 1. Header & Welcome Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
              Dashboard
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Overview and management of your bank accounts.
            </p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm rounded-xl transition-all shadow-sm hover:shadow flex items-center justify-center gap-2 self-start sm:self-auto"
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

        {/* 2. Stat Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {/* Card 1: Total Accounts */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Total Accounts
              </p>
              <h3 className="text-3xl font-bold text-gray-900 mt-1">
                {totalAccounts}
              </h3>
            </div>
            <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 10h18M7 15h1m4 0h1m-7 4h12a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
          </div>

          {/* Card 2: Banks Connected */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Connected Banks
              </p>
              <h3 className="text-3xl font-bold text-gray-900 mt-1">
                {uniqueBanks.length}
              </h3>
            </div>
            <div className="w-12 h-12 bg-teal-50 rounded-2xl flex items-center justify-center text-teal-600">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5m0 0h5m-5 0V11m0 0h5m-5 0H7"
                />
              </svg>
            </div>
          </div>

          {/* Card 3: Status */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                System Status
              </p>
              <h3 className="text-lg font-bold text-emerald-600 mt-1 flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-ping"></span>
                Active
              </h3>
            </div>
            <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* 3. Controls Bar (Search & Filter) */}
        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Bank Filter Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
            <button
              onClick={() => setSelectedBank("ALL")}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                selectedBank === "ALL"
                  ? "bg-gray-900 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              All ({accounts.length})
            </button>
            {uniqueBanks.map((bank) => (
              <button
                key={bank}
                onClick={() => setSelectedBank(bank)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                  selectedBank === bank
                    ? "bg-emerald-600 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {bank}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <input
              type="text"
              placeholder="Search holder name, bank or acc..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
            />
            <svg
              className="w-4 h-4 text-gray-400 absolute left-3.5 top-3"
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

        {/* 4. Accounts Cards List */}
        {filteredAccounts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-gray-200">
            <p className="text-gray-500 font-medium">
              No matching accounts found.
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
                  className="group relative bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between overflow-hidden"
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

        {/* 5. Modal Overlay */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fadeIn">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl relative border border-gray-100">
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

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">
                    Account Holder Name *
                  </label>
                  <input
                    type="text"
                    name="Name of A/C Holder"
                    required
                    placeholder="user name"
                    value={formData["Name of A/C Holder"]}
                    onChange={handleInputChange}
                    className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                {/* <div>
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
                </div> */}
                <div>
 <div>
  <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">
    Bank Name *
  </label>
  <select
    name="Bank Name"
    required
    value={formData["Bank Name"] || ""}
    onChange={handleInputChange}
    className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white text-gray-700 cursor-pointer"
  >
    <option value="" disabled>
      Select a Bank
    </option>
    <option value="Dutch-Bangla Bank PLC (DBBL)">Dutch-Bangla Bank PLC (DBBL)</option>
    <option value="BRAC Bank PLC">BRAC Bank PLC</option>
    <option value="Eastern Bank PLC (EBL)">Eastern Bank PLC (EBL)</option>
    <option value="The City Bank PLC">The City Bank PLC</option>
    <option value="Prime Bank PLC">Prime Bank PLC</option>
    <option value="United Commercial Bank PLC (UCB)">United Commercial Bank PLC (UCB)</option>
    <option value="Mutual Trust Bank PLC (MTB)">Mutual Trust Bank PLC (MTB)</option>
    <option value="Bank Asia PLC">Bank Asia PLC</option>
    <option value="Dhaka Bank PLC">Dhaka Bank PLC</option>
    <option value="IFIC Bank PLC">IFIC Bank PLC</option>
    <option value="Pubali Bank PLC">Pubali Bank PLC</option>
    <option value="Jamuna Bank PLC">Jamuna Bank PLC</option>
    <option value="NCC Bank PLC">NCC Bank PLC</option>
    <option value="NRB Bank PLC">NRB Bank PLC</option>
    <option value="NRBC Bank PLC">NRBC Bank PLC</option>
    <option value="Community Bank Bangladesh PLC">Community Bank Bangladesh PLC</option>
    <option value="ONE Bank PLC">ONE Bank PLC</option>
    <option value="Trust Bank PLC">Trust Bank PLC</option>
    <option value="Islami Bank Bangladesh PLC">Islami Bank Bangladesh PLC</option>
    <option value="Al-Arafah Islami Bank PLC">Al-Arafah Islami Bank PLC</option>
    <option value="Shahjalal Islami Bank PLC">Shahjalal Islami Bank PLC</option>
    <option value="EXIM Bank PLC">EXIM Bank PLC</option>
    <option value="First Security Islami Bank PLC">First Security Islami Bank PLC</option>
    <option value="Social Islami Bank PLC (SIBL)">Social Islami Bank PLC (SIBL)</option>
    <option value="Sonali Bank PLC">Sonali Bank PLC</option>
    <option value="Janata Bank PLC">Janata Bank PLC</option>
    <option value="Agrani Bank PLC">Agrani Bank PLC</option>
    <option value="Rupali Bank PLC">Rupali Bank PLC</option>
    <option value="Standard Chartered Bank">Standard Chartered Bank</option>
    <option value="Commercial Bank of Ceylon">Commercial Bank of Ceylon</option>
  </select>
</div>
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
    </div>
  );
}