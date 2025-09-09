import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card"; // shadcn card
import { motion } from "framer-motion";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import axiosInstance from "@/api/AxiosInstance";

// Chart colors
const COLORS = ["#3b82f6", "#10b981", "#8b5cf6", "#ef4444"];

const AdminAnalytics = () => {
  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await axiosInstance.get("/api/analytics/getanalytics");
        setAnalytics(res.data);
      } catch (err) {
        console.error("Error fetching analytics", err);
      }
    };
    fetchAnalytics();
  }, []);

  if (!analytics)
    return <p className="text-center mt-10 text-lg animate-pulse">⏳ Loading analytics...</p>;

  // Chart data with safe defaults
  const chartData = [
    { name: "Students", value: Number(analytics.totalStudents) || 0 },
    { name: "Borrowed", value: Number(analytics.totalBorrowed) || 0 },
    { name: "Active", value: Number(analytics.activeStudents) || 0 },
    { name: "Overdue", value: Number(analytics.overdueBooks) || 0 },
  ];

  // Animated counter component
  const Counter = ({ value, color }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      if (!value || value === 0) {
        setCount(0);
        return;
      }

      let start = 0;
      const end = value;
      const duration = 1000;
      const stepTime = Math.max(Math.floor(duration / end), 20);

      const timer = setInterval(() => {
        start += 1;
        setCount(start);
        if (start >= end) clearInterval(timer);
      }, stepTime);

      return () => clearInterval(timer);
    }, [value]);

    return <p className={`text-3xl font-bold ${color}`}>{count}</p>;
  };

  return (
    <div className="p-8">
      <h1 className="text-4xl font-extrabold text-blue-700 mb-10 text-center drop-shadow-md">
        📊 Admin Analytics Dashboard
      </h1>

      {/* Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          { title: "👨‍🎓 Total Students", value: analytics.totalStudents, color: "text-blue-600" },
          { title: "📚 Borrowed Books", value: analytics.totalBorrowed, color: "text-green-600" },
          { title: "✅ Active Students", value: analytics.activeStudents, color: "text-purple-600" },
          { title: "⚠️ Overdue Books", value: analytics.overdueBooks, color: "text-red-600" },
        ].map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Card className="shadow-xl rounded-2xl p-5 bg-gradient-to-r from-gray-50 to-gray-100 hover:shadow-2xl">
              <CardContent>
                <h2 className="text-lg font-semibold text-gray-700">{item.title}</h2>
                <Counter value={Number(item.value) || 0} color={item.color} />
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Chart Section */}
      <motion.div
        className="mt-12 flex justify-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.8 }}
      >
        <Card className="shadow-lg p-6 w-full md:w-[600px] bg-white rounded-2xl">
          <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">📈 Data Overview</h2>
          <ResponsiveContainer width="100%" height={350}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={130}
                fill="#8884d8"
                dataKey="value"
              >
                {chartData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </motion.div>
    </div>
  );
};

export default AdminAnalytics;
