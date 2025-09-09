import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/authContext";
import axiosInstance from "@/api/AxiosInstance";

const StudentBorrowedBooks = () => {
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [message, setMessage] = useState("");
  const { user } = useAuth();

  const fetchBorrows = async () => {
    if (!user?.studentLiberaryId) return;

    try {
      const res = await axiosInstance.get(
        `/api/borrow/student/${user.studentLiberaryId}`
      );
      setBorrowedBooks(res.data.borrowedBooks);
      setMessage("");
    } catch (err) {
      setBorrowedBooks([]);
      if (err.response) {
        setMessage(err.response.data.message);
      } else {
        setMessage("Server error");
      }
    }
  };

  useEffect(() => {
    fetchBorrows();

    // auto refresh fines every 60s
    const interval = setInterval(fetchBorrows, 60000);
    return () => clearInterval(interval);
  }, [user]);

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50 p-6">
      <div className="bg-white shadow-md rounded-2xl p-6 w-full max-w-lg">
        <h2 className="text-2xl font-bold text-blue-600 mb-4 text-center">
          My Borrowed Books
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

        {borrowedBooks.length > 0 ? (
          <ul className="space-y-3">
            {borrowedBooks.map((book) => (
              <li
                key={book._id}
                className="flex justify-between items-center border p-3 rounded-lg"
              >
                <div>
                  <p className="font-medium">{book.bookTitle}</p>
                  <p className="text-sm text-gray-500">
                    ISBN: {book.isbn} | Return by:{" "}
                    {new Date(book.returnDate).toLocaleDateString()}
                  </p>
                </div>

                {
                  book.fine>0?
                <div>
                  <p
                    className={`font-bold ${
                      book.fine > 0 ? "text-red-600" : "text-green-600"
                    }`}
                  >
                    Fine: ₹{book.fine}
                  </p>
                </div>:
                <p></p>

                  }
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600 text-center">No borrowed books</p>
        )}
      </div>
    </div>
  );
};

export default StudentBorrowedBooks;
