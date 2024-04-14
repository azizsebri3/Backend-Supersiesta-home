// middleware/clientMiddleware.js

import Client from "../models/Client.js";

async function checkClientExists(req, res, next) {
  try {
    const client = await Client.findById(req.params.id);
    if (!client) {
      return res.status(404).json({ success: false, message: "Client not found" });
    }
    req.client = client; // Attach client object to the request for later use
    next();
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

export { checkClientExists };
