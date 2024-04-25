import express from "express";
import authController from "../controllers/userController.js";
import authenticateUser from "../middlewares/authMiddleware.js"; 

const router = express.Router();

router.post("/",  authController.getAllUsers);

export default router;
