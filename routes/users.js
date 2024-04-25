import express from "express";
import authController from "../controllers/userController.js";

const router = express.Router();

router.get("/",  authController.getAllUsers);
router.put("/:id", authController.modifyUser);
router.delete("/:id", authController.deleteUser);

export default router;
