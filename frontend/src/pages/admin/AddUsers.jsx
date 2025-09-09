import axios from "axios";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import axiosInstance from "@/api/AxiosInstance";

const AddUsers = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    studentLiberaryId: "",
    contact: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const res = await axiosInstance.post(
        "/api/add/addUsers",
        form
      );
      setMessage({ type: "success", text: res.data.message });
      setForm({ name: "", email: "", studentLiberaryId: "", contact: "" }); // reset form
    } catch (err) {
      setMessage({
        type: "error",
        text: err.response?.data?.message || "Something went wrong!",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white w-full max-w-md p-6 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Register Student
        </h2>

        {message && (
          <div
            className={`mb-4 text-sm px-4 py-2 rounded-lg ${message.type === "success"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
              }`}
          >
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name */}
          <div>
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              type="text"
              placeholder="Enter full name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </div>

          {/* Email */}
          <div>
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>

          {/* Contact */}
          <div>
            <Label htmlFor="contact">Phone Number</Label>
            <Input
              id="contact"
              type="text"
              placeholder="Enter Phone No."
              value={form.contact}
              onChange={(e) => {
                // Keep only numbers and cut to max 10
                let value = e.target.value.replace(/\D/g, "");
                if (value.length > 10) {
                  value = value.slice(0, 10);
                }
                setForm({ ...form, contact: value });
              }}
              required
            />
          </div>

          {/* Library ID */}
          <div>
            <Label htmlFor="libraryId">Student Library ID</Label>
            <Input
              id="libraryId"
              type="text"
              placeholder="Enter library ID"
              value={form.studentLiberaryId}
              onChange={(e) =>
                setForm({ ...form, studentLiberaryId: e.target.value })
              }
              required
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={loading}
            className="w-full mt-2"
          >
            {loading ? "Registering..." : "Register Student"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AddUsers;
