import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes.js";
import addUserRoutes from "./routes/addUserRoutes.js";
import borrowRoutes from "./routes/borrowRoutes.js";
import createNewsRoutes from "./routes/createNewsRoutes.js";
import addbooksRoutes from "./routes/addBooksRoutes.js";
import analyticsRoutes from "./routes/analyticsRoutes.js"
import bulkUploadBookRoutes from "./routes/bulkUploadBookRoutes.js"
import "./cron/deleteOldUsers.js"; 
import "./cron/reminderCron.js"; 


dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json()); // parse JSON request body

// Routes
app.get("/", (req, res) => {
  res.send("API is running...");
}); 

app.use("/api/auth", authRoutes);

app.use("/api/add", addUserRoutes);

app.use("/api/addnews", createNewsRoutes);

app.use("/api/borrow", borrowRoutes);

app.use("/api/add",addbooksRoutes );

app.use("/api/analytics",analyticsRoutes )

app.use("/api/bulk",bulkUploadBookRoutes )

// DB Connection
mongoose
  .connect(process.env.MONGO_URI) // no need for useUnifiedTopology etc.
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ Could not connect to DB:", err));

// Server
const PORT = process.env.PORT ;
app.listen(PORT, () =>
  console.log(`🚀 Server is running at http://localhost:${PORT}`)
);
