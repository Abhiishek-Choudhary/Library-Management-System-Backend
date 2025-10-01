import { Router } from "express";
import { addToCart, saveForLater } from "../controllers/cart.controller.js";
import { protect, authorize } from "../middlwares/auth.middleware.js";

const router = Router();

router.post("/add", protect, authorize("student"), addToCart);
router.post("/save-for-later", protect, authorize("student"), saveForLater);

export default router;
