import axiosInstance from "@/api/AxiosInstance";
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";

const Books = () => {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchAllBooks();
  }, []); // ✅ fetch only once

  const fetchAllBooks = async () => {
    try {
      const res = await axiosInstance.get("/api/add/getBooks");
      setBooks(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  // 🔎 Filter books by title, category, or isbn
  const filteredBooks = books.filter((book) =>
    [book.title, book.category, book.isbn]
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center text-blue-700 mb-8">
        📚 Library Books
      </h1>

      {/* 🔎 Search Input */}
      <div className="max-w-md mx-auto mb-6">
        <Input
          type="text"
          placeholder="Search by title, category, or ISBN..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full"
        />
      </div>

      {/* 📖 Books Grid */}
      {filteredBooks.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBooks.map((book, index) => (
            <motion.div
              key={book._id || index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card className="hover:shadow-xl transition-all duration-300 rounded-2xl">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">
                    {book.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-gray-600">
                  <p>
                    <span className="font-medium">Author:</span> {book.author}
                  </p>
                  <p>
                    <span className="font-medium">ISBN:</span> {book.isbn}
                  </p>
                  <p>
                    <span className="font-medium">Category:</span> {book.category}
                  </p>
                  <p>
                    <span className="font-medium">Copies:</span> {book.totalCopies}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-10">No books found 📭</p>
      )}
    </div>
  );
};

export default Books;
