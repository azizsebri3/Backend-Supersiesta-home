// middleware/orderMiddleware.js

import Order from "../models/order.js";

async function checkOrderIdExists(req, res, next) {
  const { orderId } = req.params;
  if (!orderId) {
    return res.status(400).json({ success: false, message: "Order ID is required" });
  }
  
  try {
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }
    next();
  } catch (error) {
    console.error("Error checking order ID:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

export { checkOrderIdExists };
