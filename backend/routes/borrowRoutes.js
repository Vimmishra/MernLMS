import express from "express";
import { borrowBook, getStudentBorrows, returnBook, } from "../controllers/borrowController.js";

const router = express.Router();

// Admin issues a book to a student using studentLiberaryId
router.post("/borrowBook", borrowBook);
router.post("/returnBook", returnBook);



// Student
router.get("/student/:studentLiberaryId", getStudentBorrows);

export default router;
