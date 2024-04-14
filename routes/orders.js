// routes/orderRoutes.js

import express from "express";
import orderController from "../controllers/orderController.js";
import { checkOrderIdExists } from "../middlewares/orderMiddleware.js"; // Import the middleware

const router = express.Router();

router.get("/", orderController.getAllOrders);
router.put("/:id", orderController.updateOrderConfirmation); // Use the update-specific controller function
router.delete("/:id", orderController.deleteOrder);
router.post("/platforme", orderController.addOrder);
router.post("/dashboard", orderController.addOrderDash);
router.put(
  "/api/orders/:orderId",
  checkOrderIdExists,
  orderController.updateOrderCommentaire
); // Use the middleware before calling the update-specific controller function

export default router;
