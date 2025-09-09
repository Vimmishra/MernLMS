import React, { useState, useEffect } from "react";
import axiosInstance from "../../api/AxiosInstance";
import { useAuth } from "@/context/authContext";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";

const AllUsersList = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axiosInstance.get("/api/add/getAllUsers");
      const userList =
        res.data.data || res.data.users || (Array.isArray(res.data) ? res.data : []);
      setUsers(userList);
      setFilteredUsers(userList);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    if (value.trim() === "") {
      setFilteredUsers(users);
    } else {
      const filtered = users.filter((user) =>
        user?.studentLiberaryId?.toLowerCase().includes(value)
      );
      setFilteredUsers(filtered);
    }
  };

  const handleDeleteClick = (user) => {
    setSelectedUser(user);
    setOpenDialog(true);
  };

  const confirmDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      await axiosInstance.delete(`/api/add/remove/${selectedUser._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const updatedUsers = users.filter((u) => u._id !== selectedUser._id);
      setUsers(updatedUsers);
      setFilteredUsers(updatedUsers);
      setOpenDialog(false);
      setSelectedUser(null);
    } catch (err) {
      console.error("Error deleting user:", err);
      alert(err.response?.data?.message || "Delete failed");
    }
  };

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold text-center mb-6">👥 All Users</h1>

      {/* Search */}
      <div className="max-w-2xl mx-auto mb-6">
        <Input
          type="text"
          placeholder="🔍 Search by Library ID..."
          value={searchTerm}
          onChange={handleSearch}
          className="w-full"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-xl shadow-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">Name</TableHead>
              <TableHead className="text-center">Email</TableHead>
              <TableHead className="text-center">Library ID</TableHead>
               <TableHead className="text-center">Contact No.</TableHead>              
              <TableHead className="text-center">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user, i) => (
                <motion.tr
                  key={user._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="hover:bg-gray-50"
                >
                  <TableCell className="text-center font-medium">{user.name}</TableCell>
                  <TableCell className="text-center">{user.email}</TableCell>
                  <TableCell className="text-center">
                    {user?.studentLiberaryId || "N/A"}
                  </TableCell>
                    <TableCell className="text-center">{user.contact}</TableCell>
                  <TableCell className="text-center">
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeleteClick(user)}
                    >
                      Remove
                    </Button>
                  </TableCell>
                </motion.tr>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan="4" className="text-center text-gray-500 italic py-6">
                  No users found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Confirm Delete Modal */}
      {openDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white p-6 rounded-xl shadow-lg w-96"
          >
            <h2 className="text-xl font-semibold mb-3">Confirm Delete</h2>
            <p className="mb-6">
              Are you sure you want to permanently remove{" "}
              <span className="font-bold">{selectedUser?.name}</span>?
            </p>
            <div className="flex justify-end gap-4">
              <Button variant="outline" onClick={() => setOpenDialog(false)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={confirmDelete}>
                Yes, Remove
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default AllUsersList;
