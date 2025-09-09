import express from "express";
import User from "../models/User.js";
import BorrowRecord from "../models/BorrowRecord.js"; // assuming you have a Borrow model

const router = express.Router();

// Admin analytics
export const getAnalytics =  async (req, res) => {
  try {
    // count only role:user (exclude admin)
    const totalStudents = await User.countDocuments({ role: "user" });

    // count borrowed books
    const totalBorrowed = await BorrowRecord.countDocuments();

    // active users (students who borrowed at least once)
    const activeStudents = await BorrowRecord.distinct("studentLiberaryId"); // distinct users
    const activeStudentsCount = activeStudents.length;

    // overdue books
    const today = new Date();
    const overdueBooks = await BorrowRecord.countDocuments({ dueDate: { $lt: today }, returned: false });

    res.json({
      totalStudents,
      totalBorrowed,
      activeStudents: activeStudentsCount,
      overdueBooks,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching analytics" });
  }
};

