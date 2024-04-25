import express from "express";
import authController from "../controllers/userController.js";

const router = express.Router();

router.post("/",  authController.getAllUsers);

export default router;
