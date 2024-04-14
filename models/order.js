import mongoose from "mongoose";

// Define the schema for the order
const orderSchema = new mongoose.Schema({
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Client", // Assuming you have a Client schema defined
  },
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
      size: {
        type: String,
        required: false,
      },
      quantity: {
        type: Number,
        required: true,
      }
    },
  ],
  totalPrice: {
    type: Number,
    required: true,
  },
  orderDate: {
    type: String,
    required:true,
  },
  confirmation: {
    type: Boolean,
    default: false,
  },
  commentaire : {
    type : String , 
    required: false,
    default: "no commentaire",
  }
});

// Create a model for the order schema
const Order = mongoose.model("Order", orderSchema, "orders");

export default Order ; 
