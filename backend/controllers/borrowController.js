

import Book from "../models/Book.js";
import BorrowRecord from "../models/BorrowRecord.js";
import User from "../models/User.js";

// Borrow (Admin issues book to student)
export const borrowBook = async (req, res) => {
  try {
    const { isbn, studentLiberaryId } = req.body;

    console.log("📥 Incoming borrow request:", { isbn, studentLiberaryId });

    // Validation
    if (!isbn || !studentLiberaryId) {
      console.log("❌ Missing ISBN or studentLiberaryId");
      return res.status(400).json({
        message: "Please enter ISBN and studentLiberaryId",
      });
    }

    // Check book exists
    const book = await Book.findOne({ isbn });
    if (!book) {
      console.log("❌ Book not found for ISBN:", isbn);
      
      return res.status(404).json({ message: "Book not found" });
    }
    console.log("✅ Book found:", book.title, "| Available copies:", book.totalCopies);

    // Check student exists
    const student = await User.findOne({ studentLiberaryId });
    if (!student) {
      console.log("❌ Student not found for ID:", studentLiberaryId);
      return res.status(404).json({ message: "Student not found" });
    }
    console.log("✅ Student found:", student.name, "| Email:", student.email);

    // Check availability
    if (book.totalCopies <= 0) {
      console.log("❌ No copies available for ISBN:", isbn);
      return res.status(400).json({ message: "No copies available" });
    }

    // Borrow dates
    const borrowDate = new Date();
    const returnDate = new Date();
    returnDate.setDate(borrowDate.getDate() + 7); // 7 days later

    console.log("📅 Borrow date:", borrowDate, "| Return date:", returnDate);

    // Create borrow record
    const borrowRecord = new BorrowRecord({
      studentLiberaryId,
      isbn,
      bookTitle: book.title,
      borrowDate,
      returnDate,
    });

    await borrowRecord.save();
    console.log("✅ Borrow record saved:", borrowRecord._id);

    // Decrease available copies
    book.totalCopies -= 1;
    await book.save();
    console.log("📉 Book copies updated. Remaining copies:", book.totalCopies);

    res.status(201).json({
      message: "Book borrowed successfully",
      borrowRecord,
    });
  } catch (error) {
    console.error("🔥 Error borrowing book:", error);
    res.status(500).json({ error: error.message });
  }
};



//retrun:
// return book with fine check
export const returnBook = async (req, res) => {
  try {
    const { isbn, studentLiberaryId, confirmReturn } = req.body;
    // confirmReturn = false -> just show fine
    // confirmReturn = true  -> actually return book

    console.log("📥 Incoming return request:", { isbn, studentLiberaryId, confirmReturn });

    if (!isbn || !studentLiberaryId) {
      return res.status(400).json({
        message: "Please enter ISBN and studentLiberaryId",
      });
    }

    const student = await User.findOne({ studentLiberaryId });
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    const book = await Book.findOne({ isbn });
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    const borrowRecord = await BorrowRecord.findOne({ studentLiberaryId, isbn });
    if (!borrowRecord) {
      return res.status(404).json({
        message: "No borrow record found for this student and book",
      });
    }

    // Fine calculation
    const today = new Date();
    const dueDate = new Date(borrowRecord.returnDate);

    let fine = 0;
    if (today > dueDate) {
      const diffTime = Math.abs(today - dueDate);
      const overdueDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      fine = overdueDays * 50;
    }

    // Step 1: Show fine before actual return
    if (!confirmReturn) {
      return res.status(200).json({
        message: "Fine details",
        student: student.name,
        book: book.title,
        dueDate,
        actualReturnDate: today,
        fine,
      });
    }

    // Step 2: If confirmReturn=true, process return
    await BorrowRecord.deleteOne({ _id: borrowRecord._id });
    book.totalCopies += 1;
    await book.save();

    return res.status(200).json({
      message: "Book returned successfully",
      returnedBook: book.title,
      student: student.name,
      finePaid: fine,
    });
  } catch (error) {
    console.error("🔥 Error returning book:", error);
    res.status(500).json({ error: error.message });
  }
};




//student's borrow details:

// Get all borrowed books for a student
// Get all borrowed books for a student with fine calculation
export const getStudentBorrows = async (req, res) => {
  try {
    const { studentLiberaryId } = req.params;

    if (!studentLiberaryId) {
      return res.status(400).json({ message: "Student ID is required" });
    }

    // Find student
    const student = await User.findOne({ studentLiberaryId });
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // Find borrow records
    let borrowRecords = await BorrowRecord.find({ studentLiberaryId });

    // Calculate fine for each book
    const today = new Date();
    borrowRecords = borrowRecords.map((record) => {
      let fine = 0;
      if (today > new Date(record.returnDate)) {
        const diffTime = today - new Date(record.returnDate);
        const overdueDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        fine = overdueDays * 50;
      }
      return {
        ...record.toObject(),
        fine,
      };
    });

    res.status(200).json({
      student: student.name,
      borrowedBooks: borrowRecords,
    });
  } catch (error) {
    console.error("🔥 Error fetching borrowed books:", error);
    res.status(500).json({ error: error.message });
  }
};
