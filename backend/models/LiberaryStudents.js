import mongoose from "mongoose";

const LiberaryStudentsSchema = new mongoose.Schema({

      userName: { type: String, required: true },
  userEmail: { type: String, required: true, unique: true },
  studentLiberaryId: { type: String, required: true },
    password: { type: String },

})

export default mongoose.model("LiberaryStudents", LiberaryStudentsSchema );