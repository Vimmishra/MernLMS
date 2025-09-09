import xlsx from "xlsx";
import Book from "../models/Book.js";  // your book schema

export const bulkUploadBooks = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    
    const workbook = xlsx.read(req.file.buffer, { type: "buffer" });
    const sheetName = workbook.SheetNames[0];
    const sheetData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

    
    await Book.insertMany(sheetData);

    res.json({ message: "Books uploaded successfully!" });
  } catch (err) {
    console.error("Bulk upload error:", err);
    res.status(500).json({ message: "Failed to upload books" });
  }
};
