/*

import React, { useState } from "react";
import axios from "axios";

const ReturnBook = () => {
  const [isbn, setIsbn] = useState("");
  const [studentLiberaryId, setStudentLiberaryId] = useState("");
  const [message, setMessage] = useState("");

  const handleReturn = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await axios.post("http://localhost:5000/api/borrow/returnBook", {
        isbn,
        studentLiberaryId,
      });

      setMessage(res.data.message);
      setIsbn("");
      setStudentLiberaryId("");
    } catch (err) {
      if (err.response) {
        setMessage(err.response.data.message || "Error returning book");
      } else {
        setMessage("Server error");
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
          Return Book
        </h2>

        {message && (
          <p
            className={`text-center mb-4 ${
              message.includes("successfully")
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}

        <form onSubmit={handleReturn} className="space-y-4">
          
          <div>
            <label className="block text-gray-700 font-medium">ISBN</label>
            <input
              type="text"
              placeholder="Enter ISBN"
              value={isbn}
              onChange={(e) => setIsbn(e.target.value)}
              className="mt-1 w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none text-black"
              required
            />
          </div>

          
          <div>
            <label className="block text-gray-700 font-medium">
              Student Library ID
            </label>
            <input
              type="text"
              placeholder="Enter Student Library ID"
              value={studentLiberaryId}
              onChange={(e) => setStudentLiberaryId(e.target.value)}
              className="mt-1 w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none text-black"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Return Book
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReturnBook;
*/



import React, { useState } from "react";
import axios from "axios";
import axiosInstance from "@/api/AxiosInstance";

const ReturnBook = () => {
  const [isbn, setIsbn] = useState("");
  const [studentLiberaryId, setStudentLiberaryId] = useState("");
  const [message, setMessage] = useState("");
  const [fineDetails, setFineDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  // Step 1: Check fine first
  const handleCheckFine = async (e) => {
    e.preventDefault();
    setMessage("");
    setFineDetails(null);
    setLoading(true);

    try {
      const res = await axiosInstance.post("/api/borrow/returnBook", {
        isbn,
        studentLiberaryId,
        confirmReturn: false, // just check fine
      });

      setFineDetails(res.data); // store fine details
    } catch (err) {
      if (err.response) {
        setMessage(err.response.data.message || "Error checking fine");
      } else {
        setMessage("Server error");
      }
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Confirm return after showing fine
  const handleConfirmReturn = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.post("/api/borrow/returnBook", {
        isbn,
        studentLiberaryId,
        confirmReturn: true, // actually return
      });

      setMessage(res.data.message + (res.data.finePaid ? ` | Fine: ₹${res.data.finePaid}` : ""));
      setIsbn("");
      setStudentLiberaryId("");
      setFineDetails(null);
    } catch (err) {
      if (err.response) {
        setMessage(err.response.data.message || "Error returning book");
      } else {
        setMessage("Server error");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
          Return Book
        </h2>

        {message && (
          <p
            className={`text-center mb-4 ${
              message.includes("successfully")
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}

        {!fineDetails ? (
          // Step 1: Enter details & check fine
          <form onSubmit={handleCheckFine} className="space-y-4">
            {/* ISBN */}
            <div>
              <label className="block text-gray-700 font-medium">ISBN</label>
              <input
                type="text"
                placeholder="Enter ISBN"
                value={isbn}
                onChange={(e) => setIsbn(e.target.value)}
                className="mt-1 w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none text-black"
                required
              />
            </div>

            {/* Student Library ID */}
            <div>
              <label className="block text-gray-700 font-medium">
                Student Library ID
              </label>
              <input
                type="text"
                placeholder="Enter Student Library ID"
                value={studentLiberaryId}
                onChange={(e) => setStudentLiberaryId(e.target.value)}
                className="mt-1 w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none text-black"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            >
              {loading ? "Checking..." : "Check Fine"}
            </button>
          </form>
        ) : (
          // Step 2: Show fine details + confirm button
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 text-center">
              Fine Details
            </h3>
            <p className="text-center text-gray-700">
              <strong>Student:</strong> {fineDetails.student}
            </p>
            <p className="text-center text-gray-700">
              <strong>Book:</strong> {fineDetails.book}
            </p>
            <p className="text-center text-gray-700">
              <strong>Due Date:</strong>{" "}
              {new Date(fineDetails.dueDate).toLocaleDateString()}
            </p>
            <p className="text-center text-gray-700">
              <strong>Actual Return:</strong>{" "}
              {new Date(fineDetails.actualReturnDate).toLocaleDateString()}
            </p>
            <p className="text-center text-red-600 font-bold">
              Fine: ₹{fineDetails.fine}
            </p>

            <button
              onClick={handleConfirmReturn}
              disabled={loading}
              className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
            >
              {loading ? "Processing..." : "Confirm Return"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReturnBook;
