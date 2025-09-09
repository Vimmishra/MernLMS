/*

import axiosInstance from "@/api/AxiosInstance";
import React, { useState } from "react";


const BulkUploadBooks = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return setMessage("Please select a file");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axiosInstance.post("/api/bulk/bulk-upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMessage(res.data.message);
    } catch (err) {
      setMessage("Upload failed");
    }
  };

  return (
    <div className="bg-white shadow-md rounded-xl p-6 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">📚 Bulk Upload Books</h2>
      <form onSubmit={handleUpload}>
        <input
          type="file"
          accept=".csv, .xlsx"
          onChange={(e) => setFile(e.target.files[0])}
          className="mb-3 block w-full text-sm text-gray-700 border border-gray-300 rounded-lg p-2"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Upload
        </button>
      </form>
      {message && <p className="mt-3 text-green-600">{message}</p>}
    </div>
  );
};

export default BulkUploadBooks;


*/



import axiosInstance from "@/api/AxiosInstance";
import React, { useState } from "react";

const BulkUploadBooks = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return setMessage("⚠️ Please select a file");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axiosInstance.post("/api/bulk/bulk-upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMessage(res.data.message);
    } catch (err) {
      setMessage("❌ Upload failed. Try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6 py-10">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-2xl p-8 border border-gray-200">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          📚 Bulk Upload Books
        </h1>
        <p className="text-gray-600 text-center mb-6">
          Upload a <span className="font-medium">CSV</span> or <span className="font-medium">Excel</span> file to add books in bulk.  
          Ensure your file follows the correct format.
        </p>

        <form onSubmit={handleUpload} className="space-y-5">
          <input
            type="file"
            accept=".csv, .xlsx"
            onChange={(e) => setFile(e.target.files[0])}
            className="block w-full text-sm text-gray-700 border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium text-lg hover:bg-blue-700 transition-colors duration-300"
          >
            🚀 Upload File
          </button>
        </form>

        {message && (
          <p
            className={`mt-5 text-center font-medium ${
              message.includes("failed") ? "text-red-600" : "text-green-600"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default BulkUploadBooks;
