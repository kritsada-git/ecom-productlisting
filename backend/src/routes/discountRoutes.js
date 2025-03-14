import express from "express";
import { getDiscounts, getDiscountById, createDiscount, updateDiscount, deleteDiscount } from "../controllers/discountController.js";

const router = express.Router();

router.get("/", getDiscounts);
router.get("/:id", getDiscountById);
router.post("/", createDiscount);
router.put("/:id", updateDiscount);
router.delete("/:id", deleteDiscount);

export default router;
