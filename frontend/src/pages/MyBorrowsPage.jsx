import { useEffect, useState } from "react";
import axiosInstance from "../api/AxiosInstance";
import { useAuth } from "../context/authContext";

const MyBorrowsPage = () => {
  const { user } = useAuth();
  const [borrows, setBorrows] = useState([]);

  useEffect(() => {
    if (user?._id) {
      axiosInstance.get(`/borrow/user/${user._id}`).then((res) => setBorrows(res.data));
    }
  }, [user]);

  if (user.role !== "student") {
    return <h2 className="text-red-500 font-bold">Access Denied</h2>;
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">📖 My Borrowed Books</h1>
      {borrows.length === 0 && <p className="text-gray-500">No borrowed books yet.</p>}
      {borrows.map((record) => (
        <div key={record._id} className="p-3 border rounded mb-2">
          <h2 className="font-bold">{record.bookId?.title}</h2>
          <p>Status: <span className="font-semibold">{record.status}</span></p>
          <p>Borrowed: {new Date(record.borrowDate).toDateString()}</p>
          <p>Due: {new Date(record.dueDate).toDateString()}</p>
          {record.returnDate && <p>Returned: {new Date(record.returnDate).toDateString()}</p>}
        </div>
      ))}
    </div>
  );
};

export default MyBorrowsPage;
