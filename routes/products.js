// routes/productRoutes.js

import express from "express";
import productController from "../controllers/productController.js";

const router = express.Router();

router.get("/", productController.getAllProducts);
router.post("/", productController.addProduct);
router.put("/:id", productController.updateProduct);
router.get("/:id", productController.getProductById);
router.delete("/:id", productController.deleteProduct);

export default router;
