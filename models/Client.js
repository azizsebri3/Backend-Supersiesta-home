import mongoose from "mongoose" ; 

// Define the schema for the client
const clientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  prenom:{
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: false,
  },
  phone: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: false,
  },
  orders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
    },
  ],
});

// Create a model for the client schema
const Client = mongoose.model("Client", clientSchema, "clients");

export default Client;
