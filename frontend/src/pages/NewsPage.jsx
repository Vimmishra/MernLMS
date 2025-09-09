import React, { useEffect, useState } from "react";
import axiosInstance from "../api/AxiosInstance";
import { motion } from "framer-motion";

const NewsPage = () => {
  const [news, setNews] = useState([]);
  const [expanded, setExpanded] = useState(null); // track which news is expanded

  useEffect(() => {
    getAllNews();
  }, []);

  const getAllNews = async () => {
    try {
      const res = await axiosInstance.get("/api/addNews/allNews");
      setNews(res.data.news);
    } catch (err) {
      console.log(err, "some error occurred while fetching news");
    }
  };

  const toggleExpand = (id) => {
    setExpanded(expanded === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 py-10 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-extrabold mb-10 text-blue-700 drop-shadow text-center">
          📰 Latest News
        </h2>

        {news.length === 0 ? (
          <p className="text-gray-500 text-center text-lg">
            No news available.
          </p>
        ) : (
          <div className="space-y-8">
            {news.map((item, index) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 border border-gray-200"
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  {expanded === item._id
                    ? item.description
                    : item.description.length > 150
                    ? item.description.slice(0, 150) + "..."
                    : item.description}
                </p>
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>📅 {new Date(item.createdAt).toLocaleString()}</span>
                  {item.description.length > 150 && (
                    <button
                      onClick={() => toggleExpand(item._id)}
                      className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
                    >
                      {expanded === item._id ? "Show Less ↑" : "Read More →"}
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsPage;
