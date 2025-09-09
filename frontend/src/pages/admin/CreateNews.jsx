import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import axiosInstance from "@/api/AxiosInstance";

const NewsPage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [disappearIn, setDisappearIn] = useState("none");
  const [newsList, setNewsList] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const res = await axiosInstance.get("/api/addNews/allNews");
      setNewsList(res.data.news);
    } catch (err) {
      console.error("Error fetching news:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description) {
      setMessage("⚠️ Please enter both title and description");
      return;
    }

    try {
      const res = await axiosInstance.post("/api/addNews/addnews", {
        title,
        description,
        disappearIn,
      });

      setMessage(res.data.message);
      setTitle("");
      setDescription("");
      setDisappearIn("none");
      fetchNews();
    } catch (err) {
      console.error("Error creating news:", err);
      setMessage("❌ Error creating news");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/api/addNews/${id}`);
      setNewsList(newsList.filter((news) => news._id !== id));
      setMessage("✅ News deleted successfully");
    } catch (err) {
      console.error("Error deleting news:", err);
      setMessage("❌ Error deleting news");
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 p-6">
      <h1 className="text-4xl font-extrabold mb-6 text-center text-blue-700 drop-shadow">
        📢 Manage News
      </h1>

      {message && (
        <p className="mb-4 text-center text-green-600 font-medium">{message}</p>
      )}

      {/* Split layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-7xl mx-auto">
        {/* Create News Form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white shadow-xl rounded-xl p-6 border"
        >
          <h2 className="text-2xl font-bold mb-4 text-blue-600">➕ Add News</h2>
          <input
            type="text"
            placeholder="📰 Enter news title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border p-3 mb-3 text-black rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
          />
          <textarea
            placeholder="✍️ Enter news description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border text-black p-3 mb-3 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            rows="4"
          />

          <select
            value={disappearIn}
            onChange={(e) => setDisappearIn(e.target.value)}
            className="w-full border p-3 mb-4 text-black rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
          >
            <option value="none">⏳ Do not delete</option>
            <option value="24h">🕐 24 H</option>
            <option value="2d">📅 2 days</option>
            <option value="1w">📆 1 week</option>
          </select>

          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 w-full rounded-lg hover:bg-blue-700 transition-all shadow-md"
          >
            Publish News
          </button>
        </motion.form>

        {/* Display News */}
        <div>
          <h2 className="text-2xl font-bold mb-4 text-blue-600">📰 Latest News</h2>
          {newsList.length === 0 ? (
            <p className="text-gray-500 text-center">No news available.</p>
          ) : (
            <div className="space-y-5">
              {newsList.map((news, index) => (
                <motion.div
                  key={news._id}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="border rounded-xl p-5 bg-gradient-to-r from-gray-50 to-white shadow-md hover:shadow-lg transition-all"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-lg text-blue-800 mb-1">
                        {news.title}
                      </h3>
                      <p className="text-gray-700">{news.description}</p>
                      <small className="text-gray-500 block mt-1">
                        📅 {new Date(news.createdAt).toLocaleString()}
                      </small>
                      {news.disappearIn && news.disappearIn !== "none" && (
                        <p className="text-xs text-red-500 mt-1">
                          ⏳ Expires in: {news.disappearIn}
                        </p>
                      )}
                    </div>
                    <button
                      onClick={() => handleDelete(news._id)}
                      className="ml-4 bg-red-600 text-white px-4 py-1.5 rounded-lg hover:bg-red-700 transition-all shadow"
                    >
                      🗑 Delete
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewsPage;
