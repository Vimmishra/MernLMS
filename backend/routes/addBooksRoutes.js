import express from "express";
import { addBooks, getBooks } from "../controllers/addBooksController.js";

const router = express.Router();

router.post("/addBooks", addBooks);

router.get("/getBooks", getBooks)

export default router;