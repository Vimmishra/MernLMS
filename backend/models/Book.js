import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  isbn: String,
  category: String,
  totalCopies: { type: Number, default: 1 },
  availableCopies: { type: Number, default: 1 },
});

export default mongoose.model("Book", bookSchema);
