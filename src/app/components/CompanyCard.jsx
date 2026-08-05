"use client";

import { useEffect, useState } from "react";

export default function CompanyCard() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    "Account Name": "",
    "Account Number": "",
    "Bank Name": "",
    "Branch Name": "",
    "Routing Number": "",
    "Signature Status": "Active",
    "Tax Status": "Exempt",
  });

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000";

  // Data Fetching Function
  const fetchCompanies = () => {
    fetch(`${baseUrl}/api/company`)
      .then((res) => res.json())
      .then((data) => {
        setCompanies(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching companies:", error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  // Form Input Change Handler
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Form Submit Handler (POST API)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch(`${baseUrl}/api/company`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setIsModalOpen(false);
        fetchCompanies(); // Refresh the list
        setFormData({
          "Account Name": "",
          "Account Number": "",
          "Bank Name": "",
          "Branch Name": "",
          "Routing Number": "",
          "Signature Status": "Active",
          "Tax Status": "Exempt",
        });
      } else {
        alert("Failed to add account. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Something went wrong!");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Search Filter Logic
  const filteredCompanies = companies.filter((company) => {
    const term = searchTerm.toLowerCase();
    const accountName = (company["Account Name"] || "").toLowerCase();
    const bankName = (company["Bank Name"] || "").toLowerCase();
    const accountNumber = (company["Account Number"] || "").toString().toLowerCase();

    return accountName.includes(term) || bankName.includes(term) || accountNumber.includes(term);
  });

  return (
    <div className="space-y-6">
      
      {/* Top Bar: Search Option & Add Account Button */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-4 rounded-2xl border border-gray-200/80 shadow-sm">
        
        {/* Search Bar */}
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search name, bank, or account no..."
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
          />
          <svg
            className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        {/* Add Account Button */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-all shadow-sm shadow-emerald-200 active:scale-95"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
          </svg>
          Add Account
        </button>
      </div>

      {/* Loading Skeleton View */}
      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4 animate-pulse shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gray-200 rounded-xl"></div>
                <div className="space-y-2 flex-1">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
              <div className="space-y-2 pt-2">
                <div className="h-3 bg-gray-200 rounded w-full"></div>
                <div className="h-3 bg-gray-200 rounded w-5/6"></div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty State View */}
      {!loading && filteredCompanies.length === 0 && (
        <div className="p-12 text-center bg-white rounded-2xl border border-gray-100 max-w-md mx-auto my-8 space-y-3 shadow-sm">
          <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <h3 className="text-base font-bold text-gray-800">No Company Accounts Found</h3>
          <p className="text-xs text-gray-500">
            {searchTerm ? "No result matches your search term." : "Please upload or add company bank accounts to display here."}
          </p>
        </div>
      )}

      {/* Cards Grid */}
      {!loading && filteredCompanies.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCompanies.map((company, index) => {
            const accountName = company["Account Name"] || "N/A";
            const accountNumber = company["Account Number"] || "N/A";
            const bankName = company["Bank Name"] || "N/A";
            const branchName = company["Branch Name"] || "N/A";
            const routingNumber = company["Routing Number"] || "N/A";
            const signatureStatus = company["Signature Status"] || "Pending";
            const taxStatus = company["Tax Status"] || "N/A";

            return (
              <div
                key={company._id || index}
                className="bg-white rounded-2xl border border-gray-200/80 p-6 shadow-sm hover:shadow-md hover:border-emerald-300 transition-all duration-200 flex flex-col justify-between space-y-5 group"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3.5 overflow-hidden">
                    <div className="w-11 h-11 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 font-bold text-base flex-shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                      {accountName.charAt(0).toUpperCase()}
                    </div>
                    <div className="truncate">
                      <h3 className="font-bold text-gray-900 text-base group-hover:text-emerald-600 transition-colors truncate" title={accountName}>
                        {accountName}
                      </h3>
                      <p className="text-xs text-gray-500 font-medium truncate">
                        {bankName}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold border flex-shrink-0 ${
                      signatureStatus.toLowerCase() === "active" || signatureStatus.toLowerCase() === "verified"
                        ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                        : "bg-amber-50 text-amber-700 border-amber-200"
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        signatureStatus.toLowerCase() === "active" || signatureStatus.toLowerCase() === "verified"
                          ? "bg-emerald-500"
                          : "bg-amber-500"
                      }`}
                    ></span>
                    {signatureStatus}
                  </span>
                </div>

                <div className="space-y-2.5 pt-3 border-t border-gray-100 text-xs text-gray-600">
                  <div className="flex items-center justify-between py-1 bg-gray-50/70 px-3 rounded-lg">
                    <span className="text-gray-400 font-medium">Account No:</span>
                    <span className="font-mono font-bold text-gray-800">{accountNumber}</span>
                  </div>
                  <div className="flex items-center justify-between px-1">
                    <span className="text-gray-400">Branch:</span>
                    <span className="font-medium text-gray-700">{branchName}</span>
                  </div>
                  <div className="flex items-center justify-between px-1">
                    <span className="text-gray-400">Routing No:</span>
                    <span className="font-mono font-medium text-gray-700">{routingNumber}</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] text-gray-400">Tax:</span>
                    <span className="text-xs font-semibold text-gray-700 bg-gray-100 px-2 py-0.5 rounded">
                      {taxStatus}
                    </span>
                  </div>
                  <button className="text-xs font-bold text-emerald-600 hover:text-emerald-700 bg-emerald-50 hover:bg-emerald-100/80 px-3 py-1.5 rounded-lg transition-colors">
                    View Details →
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ----------------- ADD ACCOUNT MODAL FORM ----------------- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
              <div>
                <h2 className="text-lg font-bold text-gray-900">Add New Account</h2>
                <p className="text-xs text-gray-500">Fill in the company bank account details below.</p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Account Name *</label>
                <input
                  type="text"
                  name="Account Name"
                  required
                  value={formData["Account Name"]}
                  onChange={handleInputChange}
                  placeholder="e.g. Acme Corporation"
                  className="w-full px-3.5 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Bank Name *</label>
                  <input
                    type="text"
                    name="Bank Name"
                    required
                    value={formData["Bank Name"]}
                    onChange={handleInputChange}
                    placeholder="e.g. Dutch Bangla Bank"
                    className="w-full px-3.5 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Account Number *</label>
                  <input
                    type="text"
                    name="Account Number"
                    required
                    value={formData["Account Number"]}
                    onChange={handleInputChange}
                    placeholder="e.g. 1029384756"
                    className="w-full px-3.5 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Branch Name</label>
                  <input
                    type="text"
                    name="Branch Name"
                    value={formData["Branch Name"]}
                    onChange={handleInputChange}
                    placeholder="e.g. Gulshan Branch"
                    className="w-full px-3.5 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Routing Number</label>
                  <input
                    type="text"
                    name="Routing Number"
                    value={formData["Routing Number"]}
                    onChange={handleInputChange}
                    placeholder="e.g. 090261122"
                    className="w-full px-3.5 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Signature Status</label>
                  <select
                    name="Signature Status"
                    value={formData["Signature Status"]}
                    onChange={handleInputChange}
                    className="w-full px-3.5 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 bg-white"
                  >
                    <option value="Active">Active</option>
                    <option value="Pending">Pending</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Tax Status</label>
                  <select
                    name="Tax Status"
                    value={formData["Tax Status"]}
                    onChange={handleInputChange}
                    className="w-full px-3.5 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 bg-white"
                  >
                    <option value="Exempt">Exempt</option>
                    <option value="Taxable">Taxable</option>
                  </select>
                </div>
              </div>

              {/* Form Actions */}
              <div className="pt-4 border-t border-gray-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-100 rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-all shadow-sm shadow-emerald-200 disabled:opacity-50"
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