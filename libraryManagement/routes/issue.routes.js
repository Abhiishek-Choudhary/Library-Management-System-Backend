import { Router } from "express";
import { checkout,returnBook,getMyIssues,getAllIssues } from "../controllers/issue.controller.js";
import { protect, authorize } from "../middlwares/auth.middleware.js";

const router = Router();

router.post("/checkout", protect, authorize("student"), checkout);
router.post("/return", protect, authorize("student"), returnBook);
router.get("/my-issues", protect, authorize("student"), getMyIssues);
router.get("/all", protect, authorize("Librarian"), getAllIssues);

export default router;
