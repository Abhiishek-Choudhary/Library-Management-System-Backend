import { Router } from "express";
import { addBook, deleteBook, bookReport,browseBooks } from "../controllers/book.controller.js";
import { protect, authorize } from "../middlwares/auth.middleware.js";
import upload from "../middlwares/multer.middleware.js";

const router = Router();

router.post(
  "/add",
  protect,
  authorize("Librarian"),
  upload.single("coverImg"),
  addBook
);
router.delete("/delete/:id", protect, authorize("Librarian"), deleteBook);
router.get("/report", protect, authorize("Librarian"), bookReport);
router.get("/", browseBooks);  


export default router;
