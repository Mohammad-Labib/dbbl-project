// app/accounts/users/page.js
'use client';

import { useState, useEffect } from 'react';

export default function RegisteredUsersListPage() {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // MongoDB থেকে নিবন্ধিত ইউজারদের ডেটা নিয়ে আসা
  const fetchRegisteredAccounts = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/accounts');
      const data = await res.json();
      if (data.success) {
        setAccounts(data.data);
      }
    } catch (err) {
      console.error('Error fetching accounts:', err);
    } finally {
      setLoading(false);
    }
  };

//   useEffect(() => {
//     fetchRegisteredAccounts();
//   }, []);

  // সার্চ করার লজিক
  const filteredAccounts = accounts.filter((acc) => {
    return (
      acc.accountName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      acc.accountNumber?.includes(searchTerm) ||
      acc.mobileNumber?.includes(searchTerm)
    );
  });

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Page Title */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Registered Accounts List</h1>
            <p className="text-xs text-slate-500 mt-1">
              যেসব ইউজার অ্যাকাউন্ট ক্রিয়েট করেছেন তাদের তালিকা ও বিস্তারিত তথ্য।
            </p>
          </div>
          <div className="bg-indigo-50 px-4 py-2.5 rounded-xl border border-indigo-100 text-indigo-700 font-bold text-sm">
            Total Users: {accounts.length}
          </div>
        </div>

        {/* Search Bar */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <input
            type="text"
            placeholder="Search by name, account number, or mobile..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full sm:w-96 p-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50"
          />
        </div>

        {/* User Table */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          {loading ? (
            <div className="p-12 text-center text-slate-500">
              <div className="animate-spin inline-block w-6 h-6 border-[3 border-current border-t-transparent text-indigo-600 rounded-full mb-2"></div>
              <p className="text-sm">নিবন্ধিত অ্যাকাউন্টগুলোর তথ্য লোড হচ্ছে...</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-600">
                <thead className="bg-slate-50 border-b border-slate-100 text-xs text-slate-500 uppercase tracking-wider">
                  <tr>
                    <th className="px-6 py-4">User Details</th>
                    <th className="px-6 py-4">Account No</th>
                    <th className="px-6 py-4">Branch</th>
                    <th className="px-6 py-4">Type</th>
                    <th className="px-6 py-4">Created Date</th>
                    <th className="px-6 py-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredAccounts.length > 0 ? (
                    filteredAccounts.map((acc) => (
                      <tr key={acc._id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="font-semibold text-slate-900">{acc.accountName}</div>
                          <div className="text-xs text-slate-400">{acc.mobileNumber}</div>
                        </td>
                        <td className="px-6 py-4 font-mono text-xs">{acc.accountNumber}</td>
                        <td className="px-6 py-4">{acc.branchName}</td>
                        <td className="px-6 py-4 font-medium text-slate-700">{acc.accountType}</td>
                        <td className="px-6 py-4 text-xs text-slate-500">
                          {acc.createdAt ? new Date(acc.createdAt).toLocaleDateString('en-GB', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric'
                          }) : 'N/A'}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-2.5 py-1 text-xs font-semibold rounded-full ${
                              acc.status === 'Active'
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-rose-100 text-rose-800'
                            }`}
                          >
                            {acc.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center py-8 text-slate-400">
                        কোনো অ্যাকাউন্ট পাওয়া যায়নি।
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}