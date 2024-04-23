import express from "express";
import authController from "../controllers/authController.js";
import authenticateUser from "../middlewares/authMiddleware.js";


const router = express.Router();

router.post("/", authController.loginUser);

export default router;
