import React, { useState } from "react";
import axios from "axios";
import axiosInstance from "@/api/AxiosInstance";

const AddBook = () => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    isbn: "",
    category: "",
    totalCopies: ""
  });
  const [message, setMessage] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post("/api/add/addBooks", formData); // adjust route
      setMessage(res.data.message);
      setFormData({
        title: "",
        author: "",
        isbn: "",
        category: "",
        totalCopies: ""
      });
    } catch (err) {
      setMessage(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-6 w-96"
      >
        <h2 className="text-2xl font-bold mb-4 text-center text-black">Add New Book</h2>

        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded text-black"
          required
        />

        <input
          type="text"
          name="author"
          placeholder="Author"
          value={formData.author}
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded text-black"
          required
        />

        <input
          type="text"
          name="isbn"
          placeholder="ISBN"
          value={formData.isbn}
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded text-black"
          required
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded text-black"
          required
        />

        <input
          type="number"
          name="totalCopies"
          placeholder="Total Copies"
          value={formData.totalCopies}
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded text-black"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Add Book
        </button>

        {message && (
          <p className="mt-3 text-center text-sm text-red-600">{message}</p>
        )}
      </form>
    </div>
  );
};

export default AddBook;
