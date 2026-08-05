"use client";

import { useState, useRef } from "react";

export default function UploadCompanyExcel({ onUploadSuccess }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });

  const fileInputRef = useRef(null);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000";

  // ফাইল ভ্যালিডেশন
  const handleFileSelect = (selectedFile) => {
    if (!selectedFile) return;

    const fileExtension = selectedFile.name.split(".").pop().toLowerCase();
    if (fileExtension !== "xlsx" && fileExtension !== "xls") {
      setStatus({
        type: "error",
        message: "Please select a valid Excel file (.xlsx or .xls)",
      });
      return;
    }

    setFile(selectedFile);
    setStatus({ type: "", message: "" });
  };

  // Drag & Drop
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    setStatus({ type: "", message: "" });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // আপলোড হ্যান্ডলার
  const handleUpload = async () => {
    if (!file) {
      setStatus({ type: "error", message: "Please select a company Excel file first!" });
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);
    setStatus({ type: "", message: "" });

    try {
      const response = await fetch(`${baseUrl}/api/upload-company-excel`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setStatus({
          type: "success",
          message: data.message || "Company Excel uploaded successfully!",
        });

        handleRemoveFile();

        if (onUploadSuccess) {
          onUploadSuccess();
        }
      } else {
        setStatus({
          type: "error",
          message: data.message || "Upload failed from server.",
        });
      }
    } catch (error) {
      console.error("Upload error:", error);
      setStatus({
        type: "error",
        message: "Network error or server is down!",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-12 md:py-16 bg-gradient-to-b from-gray-50 to-white px-4 md:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Section Title & Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="px-3.5 py-1.5 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-full border border-emerald-200/60 inline-block uppercase tracking-wider">
            Company Data Import
          </span>
          <h2 className="text-2xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
            Upload Company Account Excel
          </h2>
          <p className="text-sm md:text-base text-gray-600 leading-relaxed">
            Upload your structured Excel sheet (<code className="text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded font-mono text-xs">.xlsx</code> or <code className="text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded font-mono text-xs">.xls</code>) to sync bulk company accounts directly with your MongoDB database.
          </p>
        </div>

        {/* Main Section Content Card */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-xl p-6 md:p-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          
          {/* Left Info Column */}
          <div className="md:col-span-5 space-y-5 border-b md:border-b-0 md:border-r border-gray-100 pb-6 md:pb-0 md:pr-6">
            <h3 className="text-lg font-bold text-gray-800">
              Excel File Guidelines
            </h3>
            
            <ul className="space-y-3.5 text-xs md:text-sm text-gray-600">
              <li className="flex items-start gap-3">
                <div className="p-1 bg-emerald-100 text-emerald-700 rounded-full mt-0.5 flex-shrink-0">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span>First row should contain correct column headers matching company account schemas.</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="p-1 bg-emerald-100 text-emerald-700 rounded-full mt-0.5 flex-shrink-0">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span>Ensure company IDs and account details are formatted cleanly without extra spaces.</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="p-1 bg-emerald-100 text-emerald-700 rounded-full mt-0.5 flex-shrink-0">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span>Maximum recommended file size is up to 10MB per batch.</span>
              </li>
            </ul>

            <div className="p-4 bg-emerald-50/60 rounded-2xl border border-emerald-100 flex items-center gap-3">
              <svg className="w-5 h-5 text-emerald-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-xs text-emerald-800 font-medium">
                Company data will be merged and updated immediately upon upload.
              </p>
            </div>
          </div>

          {/* Right Upload Box Column */}
          <div className="md:col-span-7 space-y-5">
            {/* Hidden File Input */}
            <input
              ref={fileInputRef}
              type="file"
              accept=".xlsx, .xls"
              onChange={(e) => handleFileSelect(e.target.files[0])}
              className="hidden"
            />

            {/* Drag & Drop Zone */}
            {!file ? (
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-2xl p-8 md:p-10 text-center cursor-pointer transition-all ${
                  isDragging
                    ? "border-emerald-500 bg-emerald-50/50 scale-[0.99]"
                    : "border-gray-200 bg-gray-50/50 hover:bg-gray-50 hover:border-emerald-400"
                }`}
              >
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mx-auto shadow-sm border border-gray-100 text-emerald-600 mb-4">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                </div>
                <p className="text-base font-semibold text-gray-800">
                  Click to choose file <span className="text-gray-400 font-normal">or drag & drop</span>
                </p>
                <p className="text-xs text-gray-400 mt-1.5">Supports Microsoft Excel (.xlsx, .xls)</p>
              </div>
            ) : (
              /* Selected File Preview Box */
              <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4 flex items-center justify-between">
                <div className="flex items-center gap-3.5 overflow-hidden">
                  <div className="p-3 bg-emerald-100 text-emerald-700 rounded-xl flex-shrink-0">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div className="truncate">
                    <p className="text-sm font-bold text-gray-800 truncate">
                      {file.name}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {(file.size / 1024).toFixed(1)} KB
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleRemoveFile}
                  disabled={loading}
                  className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors flex-shrink-0"
                  title="Remove file"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            )}

            {/* Status Message Display */}
            {status.message && (
              <div
                className={`p-4 rounded-2xl text-xs font-semibold flex items-center gap-3 ${
                  status.type === "success"
                    ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                    : "bg-red-50 text-red-700 border border-red-200"
                }`}
              >
                {status.type === "success" ? (
                  <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )}
                <span>{status.message}</span>
              </div>
            )}

            {/* Upload Button */}
            <button
              onClick={handleUpload}
              disabled={loading || !file}
              className={`w-full py-3.5 px-6 rounded-2xl font-bold text-sm text-white transition-all flex items-center justify-center gap-2 ${
                loading || !file
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-emerald-600 hover:bg-emerald-700 active:scale-[0.99] shadow-lg shadow-emerald-600/25"
              }`}
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span>Processing Upload...</span>
                </>
              ) : (
                <span>Upload Company Excel</span>
              )}
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}