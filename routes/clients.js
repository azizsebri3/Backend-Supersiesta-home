import express from "express";
import clientController from "../controllers/clientController.js";
import { checkClientExists } from "../middlewares/clientMiddleware.js"; 

const router = express.Router();

// Route to get all clients
router.get("/", clientController.getAllClients);

// Route to get a client by ID
router.get("/:id", checkClientExists, clientController.getClientById); 
// Route to delete a client by ID
router.delete("/:id", checkClientExists, clientController.deleteClientById);

// Route to update a client by ID
router.patch("/:id", checkClientExists, clientController.updateClientById);

export default router;
