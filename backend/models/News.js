import mongoose from "mongoose";

const NewsSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true, unique: true },

    // createdAt already provided by timestamps, but keeping your `date` too
    date: { type: Date, default: Date.now },

    // NEW FIELD: when the news should expire
    expiresAt: { type: Date, default: null }, 
  },
  { timestamps: true } // adds createdAt & updatedAt automatically
);

export default mongoose.model("News", NewsSchema);
