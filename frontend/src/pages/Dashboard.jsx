import { useEffect, useState } from "react";
import { useAuth } from "../context/authContext";
import axios from "axios";
import axiosInstance from "@/api/AxiosInstance";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch borrowed books of logged-in student
  useEffect(() => {
    const fetchBorrowedBooks = async () => {
      try {
        if (!user?.studentLiberaryId) return;
        const res = await axiosInstance.get(
          `/api/borrow/student/${user.studentLiberaryId}`
        );

        setBorrowedBooks(res.data.borrowedBooks || []);
      } catch (error) {
        console.error("Error fetching borrowed books:", error);
        setBorrowedBooks([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBorrowedBooks();
  }, [user]);

  

  // Calculate stats
  const totalBorrowed = borrowedBooks.length;
  const today = new Date();

  const dueBooks = borrowedBooks.filter(
    (b) => new Date(b.dueDate) < today
  ).length;

  const reservations = 0; // later if you add reservation feature

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6">
      {/* Header */}
      <header className="flex flex-col sm:flex-row justify-between items-center bg-white shadow-md p-4 rounded-lg mb-6 gap-3">
        <h1 className="text-xl font-bold text-gray-700">
          📚 Student Dashboard
        </h1>
      
      </header>

      {/* Welcome Section */}
      <section className="bg-white p-6 rounded-xl shadow-md mb-6">
        <h2 className="text-lg font-semibold text-gray-700">
          Welcome, {user?.name || "Student"} 🎉
        </h2>
        <p className="text-gray-500 mt-1">
          Library ID:{" "}
          <span className="font-medium">{user?.studentLiberaryId}</span>
        </p>
        <p className="text-gray-500">Email: {user?.email}</p>
      </section>

      {/* Stats Section */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-blue-100 p-5 rounded-xl shadow-md text-center">
          <h3 className="text-2xl font-bold text-blue-600">
            {totalBorrowed}
          </h3>
          <p className="text-gray-600">Books Borrowed</p>
        </div>
        <div className="bg-green-100 p-5 rounded-xl shadow-md text-center">
          <h3 className="text-2xl font-bold text-green-600">
            {dueBooks}
          </h3>
          <p className="text-gray-600">Books Due</p>
        </div>
        <div className="bg-yellow-100 p-5 rounded-xl shadow-md text-center">
          <h3 className="text-2xl font-bold text-yellow-600">
            {reservations}
          </h3>
          <p className="text-gray-600">Reservations</p>
        </div>
      </section>

      {/* Borrowed Books */}
      <section className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          📖 Your Borrowed Books
        </h2>

        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : borrowedBooks.length === 0 ? (
          <p className="text-gray-500">No borrowed books.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse min-w-[600px]">
              <thead>
                <tr className="bg-gray-200 text-gray-600">
                  <th className="p-3 text-left">Title</th>
                  <th className="p-3 text-left">ISBN</th>
                  <th className="p-3 text-left">Borrow Date</th>
                  <th className="p-3 text-left">Due Date</th>
                  <th className="p-3 text-left">Status</th>
                  <th className="p-3 text-left">Dues</th>
                </tr>
              </thead>
              <tbody>
                {borrowedBooks.map((book) => {
                  const isOverdue = new Date(book.dueDate) < today;
                  return (
                    <tr key={book._id} className="border-b">
                      <td className="p-3 text-black">{book.bookTitle}</td>
                      <td className="p-3 text-black">{book.isbn}</td>
                      <td className="p-3 text-black">
                        {new Date(book.borrowDate).toLocaleDateString()}
                      </td>
                      <td className="p-3 text-black">
                        {new Date(book.returnDate).toLocaleDateString()}
                      </td>
                      <td
                        className={`p-3 ${
                          isOverdue ? "text-red-500" : "text-green-600"
                        }`}
                      >
                        {isOverdue ? "Overdue" : "On Time"}
                      </td>
                      <td className="p-3 text-black">

                       { book.fine? book.fine : <p className="text-green-600">none</p>}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
};

export default Dashboard;
