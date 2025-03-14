import express from "express";
import { getProducts, getProductById } from "../controllers/item-controll.js";

// import { getProducts, getProductById, createProduct, updateProduct, deleteProduct } from "../controllers/category-controll.js";

const router = express.Router();

router.get("/", getProducts);
router.get("/:id", getProductById);
// router.post("/", createProduct);
// router.put("/:id", updateProduct);
// router.delete("/:id", deleteProduct);

export default router;