/*

import mongoose from "mongoose";

const borrowSchema = new mongoose.Schema({
  studentLiberaryId: { type: String, required: true }, // use liberaryId
  bookTitle: { type: String, required: true },
  isbn: { type: String, required: true },
  borrowDate: { type: Date, default: Date.now },
  returnDate: { type: Date },
  //: { type: String, enum: ["borrowed", "returned"], default: "borrowed" }
});

export default mongoose.model("Borrow", borrowSchema);

*/


import mongoose from "mongoose";

const borrowSchema = new mongoose.Schema({
  studentLiberaryId: { type: String, required: true }, // student’s library ID
  bookTitle: { type: String, required: true },
  isbn: { type: String, required: true },
  borrowDate: { type: Date, default: Date.now },
  returnDate: { type: Date },
  fine: { type: Number, default: 0 },  // store fine amount if late
  status: { type: String, enum: ["borrowed", "returned"], default: "borrowed" } // for tracking
});

export default mongoose.model("Borrow", borrowSchema);
