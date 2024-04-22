// controllers/clientController.js

import Client from "../models/Client.js";
import {ObjectId} from "mongodb"
// Get all clients
async function getAllClients(req, res) {
  try {
    const clients = await Client.find();
    res.status(200).json({ success: true, data: clients });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

// Get client by ID
async function getClientById(req, res) {
  try {
    res.status(200).json({ success: true, data: req.client });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

// Delete client by ID
async function deleteClientById(req, res) {
  try {
    const deleted = await Client.findByIdAndRemove(req.params.id);
    if (!deleted) {
      res
        .status(400)
        .json({ success: false, message: " no Client deleted " });
    } else {
      res
      .status(200)
      .json({ success: true, message: "Client deleted successfully" });
    }
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
}

// Update client by ID
async function updateClientById(req, res) {
  try {
    const updateClient = {
      name: req.body.name,
      prenom: req.body.prenom,
      email: req.body.email,
      phone: req.body.phone,
      address: req.body.address,
    };
    await Client.findByIdAndUpdate(req.params.id, updateClient);
    res
      .status(200)
      .json({ success: true, message: "Client updated successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

export default {
  getAllClients,
  getClientById,
  deleteClientById,
  updateClientById,
};
