"use client";

import { useEffect, useState } from "react";

export default function CreditCard() {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    bankName: "",
    cardNumber: "",
    name: "",
    expiryDate: "",
    cardType: "Credit",
    status: "Active"
  });

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000";

  // Data Fetching Function
  const fetchCards = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${baseUrl}/api/credit-card`);
      const data = await res.json();
      const result = Array.isArray(data) ? data : data.data || data.cards || [];
      setCards(result);
    } catch (error) {
      console.error("Error fetching credit cards:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCards();
  }, []);

  // Form Input Change Handler
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Form Submit Handler (POST API)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Backend-er Schema (CamelCase / Space Key) duto format-e mapping ensure kora hoyeche
    const payload = {
      // Space keys (Jodi MongoDB Direct Native Insert hoy)
      "Bank Name": formData.bankName,
      "Card Number": formData.cardNumber,
      "Name": formData.name,
      "Expiry Date": formData.expiryDate,
      "Card Type": formData.cardType,
      "Status": formData.status,

      // camelCase keys (Jodi Mongoose Schema/Model use hoy)
      bankName: formData.bankName,
      cardNumber: formData.cardNumber,
      name: formData.name,
      expiryDate: formData.expiryDate,
      cardType: formData.cardType,
      status: formData.status,
    };

    try {
      const res = await fetch(`${baseUrl}/api/credit-card`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setIsModalOpen(false);
        await fetchCards(); // Dynamic list refresh
        setFormData({
          bankName: "",
          cardNumber: "",
          name: "",
          expiryDate: "",
          cardType: "Credit",
          status: "Active"
        });
      } else {
        const errData = await res.json().catch(() => ({}));
        alert(`Failed to add credit card: ${errData.message || "Server Error (500)"}`);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Network error or server is down!");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Search Filter Logic
  const filteredCards = cards.filter((card) => {
    const term = searchTerm.toLowerCase();
    const bankName = (card["Bank Name"] || card.bankName || "").toLowerCase();
    const cardNumber = (card["Card Number"] || card.cardNumber || "").toString().toLowerCase();
    const cardHolder = (card["Name"] || card["Card Holder Name"] || card.cardHolderName || card.name || "").toLowerCase();

    return bankName.includes(term) || cardNumber.includes(term) || cardHolder.includes(term);
  });

  const gradients = [
    "from-slate-900 via-purple-900 to-slate-900 border-purple-500/20",
    "from-blue-900 via-indigo-900 to-slate-950 border-blue-500/20",
    "from-emerald-900 via-teal-900 to-slate-900 border-emerald-500/20",
    "from-zinc-900 via-stone-900 to-zinc-950 border-amber-500/20",
  ];

  return (
    <div className="space-y-6">
      
      {/* Top Bar: Search & Add Button */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-4 rounded-2xl border border-gray-200/80 shadow-sm">
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search bank, card no or holder..."
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
          />
          <svg className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

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

      {/* Skeleton Loading */}
      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-56 bg-gray-200 rounded-2xl animate-pulse shadow-sm"></div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && filteredCards.length === 0 && (
        <div className="p-12 text-center bg-white rounded-2xl border border-gray-100 max-w-md mx-auto my-8 space-y-3 shadow-sm">
          <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="text-base font-bold text-gray-800">No Credit Cards Found</h3>
          <p className="text-xs text-gray-500">
            {searchTerm ? "No result matches your search term." : "Please add credit cards to display here."}
          </p>
        </div>
      )}

      {/* Cards Grid */}
      {!loading && filteredCards.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCards.map((card, index) => {
            const bankName = card["Bank Name"] || card.bankName || "BANK NAME";
            const cardNumber = card["Card Number"] || card.cardNumber || "•••• •••• •••• ••••";
            const expiryDate = card["Expiry Date"] || card.expiryDate || "N/A";
            const cardHolder = card["Name"] || card["Card Holder Name"] || card.cardHolderName || card.name || "CARD HOLDER";
            const cardType = card["Card Type"] || card.cardType || "Credit";
            const gradientStyle = gradients[index % gradients.length];

            return (
              <div
                key={card._id || index}
                className={`relative h-56 w-full rounded-2xl bg-gradient-to-tr ${gradientStyle} p-6 text-white shadow-xl border backdrop-blur-xl flex flex-col justify-between overflow-hidden group hover:scale-[1.02] transition-transform duration-300`}
              >
                <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/5 rounded-full blur-2xl group-hover:bg-white/10 transition-all pointer-events-none" />

                <div className="flex justify-between items-center z-10">
                  <div>
                    <h3 className="font-extrabold text-lg tracking-wider uppercase text-white/95">
                      {bankName}
                    </h3>
                    <p className="text-[10px] text-white/60 tracking-widest uppercase font-medium">
                      {cardType}
                    </p>
                  </div>
                  <svg className="w-6 h-6 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8.114 6a11 11 0 0116.141 0M10.943 8.828a7 7 0 0110.354 0M13.772 11.657a3 3 0 014.536 0" />
                  </svg>
                </div>

                <div className="flex items-center gap-3 my-1 z-10">
                  <div className="w-11 h-8 bg-amber-300/80 rounded-md border border-amber-400/50 flex flex-col justify-between p-1 shadow-inner">
                    <div className="w-full h-0.5 bg-amber-600/40 rounded"></div>
                    <div className="w-full h-0.5 bg-amber-600/40 rounded"></div>
                  </div>
                </div>

                <div className="z-10">
                  <p className="font-mono text-lg sm:text-xl font-semibold tracking-widest text-white/90 drop-shadow">
                    {cardNumber}
                  </p>
                </div>

                <div className="flex justify-between items-end z-10 pt-2 border-t border-white/10">
                  <div>
                    <p className="text-[9px] text-white/50 uppercase font-semibold tracking-wider">Card Holder</p>
                    <p className="font-medium text-xs tracking-wide uppercase text-white/90 truncate max-w-[160px]">
                      {cardHolder}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-[9px] text-white/50 uppercase font-semibold tracking-wider">Expires</p>
                    <p className="font-mono text-xs font-semibold text-white/90">
                      {expiryDate}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Add Account Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
              <div>
                <h2 className="text-lg font-bold text-gray-900">Add New Credit Card</h2>
                <p className="text-xs text-gray-500">Fill in the credit card details below.</p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Bank Name *</label>
                <input
                  type="text"
                  name="bankName"
                  required
                  value={formData.bankName}
                  onChange={handleInputChange}
                  placeholder="e.g. Brac Bank"
                  className="w-full px-3.5 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Card Holder Name *</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g. Mohiuddin"
                  className="w-full px-3.5 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Card Number *</label>
                  <input
                    type="text"
                    name="cardNumber"
                    required
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    placeholder="e.g. 4088 6028 3264 6418"
                    className="w-full px-3.5 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Expiry Date</label>
                  <input
                    type="text"
                    name="expiryDate"
                    value={formData.expiryDate}
                    onChange={handleInputChange}
                    placeholder="e.g. 12/28"
                    className="w-full px-3.5 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Card Type</label>
                  <select
                    name="cardType"
                    value={formData.cardType}
                    onChange={handleInputChange}
                    className="w-full px-3.5 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 bg-white"
                  >
                    <option value="Credit">Credit</option>
                    <option value="Debit">Debit</option>
                    <option value="Prepaid">Prepaid</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Status</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="w-full px-3.5 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 bg-white"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>

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