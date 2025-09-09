import express from "express";
import { createNews, deleteNews, getNews } from "../controllers/createNewsController.js";

const router = express.Router();

router.post("/addNews", createNews);
router.get("/allNews", getNews);
router.delete("/:id", deleteNews);

export default router;  