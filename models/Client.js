import mongoose from "mongoose" ; 

// Define the schema for the client
const clientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false,
  },
  prenom:{
    type: String,
    required: true,
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
      ref: "Order", // Assuming you have an Order schema defined
    },
  ],
});

// Create a model for the client schema
const Client = mongoose.model("Client", clientSchema, "clients");

export default Client;
