import express from "express";
import upload from ".././middleware/multerMiddleware.js";
import { bulkUploadBooks } from "../controllers/bulkBookUploadController.js";

const router = express.Router();

router.post("/bulk-upload", upload.single("file"), bulkUploadBooks);

export default router;
