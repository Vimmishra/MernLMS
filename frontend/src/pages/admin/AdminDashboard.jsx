import React from "react";
import { Link } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const AdminDashboard = () => {
  const cards = [

     {
      title: "📚 Add User",
      color: "text-blue-600",
      desc: "Register Users.",
      link: "/admin/add-students",
    },
    {
      title: "📚 Manage Books",
      color: "text-gray-600",
      desc: "Add or delete books.",
      link: "/admin/add-books",
    },
    {
      title: "👥 Manage Users",
      color: "text-green-500",
      desc: "View and manage registered library users.",
      link: "/admin/allusers",
    },
    {
      title: "📖 Borrow ",
      color: "text-purple-600",
      desc: "Issue books for students.",
      link: "/admin/add-BorrowBooks",
    },
     {
      title: "📖 Return",
      color: "text-red-500",
      desc: " return books of students.",
      link: "/admin/return-BorrowBooks",
    },
    {
      title: "📰 News & Announcements",
      color: "text-orange-600",
      desc: "Publish library news and updates.",
      link: "/admin/create-news",
    },
   
      {
      title: "📊 View Analytics",
      color: "text-pink-500",
      desc: "View and manage analytics.",
      link: "/admin/getAnalytics",
    },
     {
      title: " Bulk-Upload",
      color: "text-gray-400",
      desc: " Upload books in one single click.",
      link: "/admin/bulk-upload",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <h1 className="text-2xl sm:text-3xl font-bold text-blue-700 mb-8 text-center lg:text-left">
        📊 Admin Dashboard
      </h1>

      {/* Cards Grid */}
      <div className="  grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card, idx) => (
          <Link key={idx} to={card.link} className="block">
            <Card className="rounded-2xl shadow-md hover:shadow-xl hover:scale-[1.02] transition-transform">
              <CardHeader>
                <CardTitle className={`text-lg sm:text-xl font-semibold ${card.color}`}>
                  {card.title}
                </CardTitle>
                <CardDescription className="text-sm sm:text-base">
                  {card.desc}
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
