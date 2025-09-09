import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import axiosInstance from "@/api/AxiosInstance";

const BorrowBook = () => {

const navigate = useNavigate();

  const [formData, setFormData] = useState({
    isbn: "",
    studentLiberaryId: "",
  });
  const [message, setMessage] = useState("");

  // handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };






  // handle form submit
  
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await axiosInstance.post(
      "/api/borrow/borrowBook",
      formData
    );
    setMessage(res.data.message);
    setFormData({ isbn: "", studentLiberaryId: "" });
  } catch (err) {
    const errorMsg = err.response?.data?.message || "Something went wrong";
    setMessage(errorMsg);

    // ✅ Check for book not found error
    if (err.response?.status === 404 && errorMsg === "Book not found") {
      setMessage("Book not found. Redirecting to Add Books...");
      setTimeout(() => {
        navigate("/admin/add-books");
      }, 2000); // 2 sec delay
    }
  }
};





  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-6 w-96"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Borrow Book</h2>

        <input
          type="text"
          name="isbn"
          placeholder="Enter ISBN"
          value={formData.isbn}
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded text-black"
          required
        />

        <input
          type="text"
          name="studentLiberaryId"
          placeholder="Enter Student Library ID"
          value={formData.studentLiberaryId}
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded text-black"
          required
        />

        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
        >
          Issue Book
        </button>

        {message && (
          <p className="mt-3 text-center text-sm text-red-600">{message}</p>
        )}
      </form>
    </div>
  );
};

export default BorrowBook;
