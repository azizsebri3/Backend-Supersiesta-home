import Client from "../models/Client.js";
import Order from "../models/order.js";
import nodemailer from "nodemailer";
import mongoose from "mongoose";

async function getAllOrders(req, res) {
  try {
    const orders = await Order.find();
    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

async function deleteOrder(req, res) {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res
      .status(200)
      .json({ success: true, message: "Order deleted successfully" });
  } catch (error) {
    console.error("Error deleting order:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

async function addOrder(req, res) {
  const isValidEmail = (email) => {
    // Regular expression for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  try {
    const {
      client: clientData,
      products,
      totalPrice,
      date,
      invoiceHTML,
    } = req.body;
    console.log(products);
    console.log(invoiceHTML);
    // Check if clientData is provided and contains required fields
    if (
      !clientData ||
      !clientData.name ||
      !clientData.phone ||
      !clientData.address
    ) {
      return res.status(400).json({ message: "Client information incomplete" });
    }
  
    if (
      !clientData.phone ||
      clientData.phone.length !== 8 ||
      isNaN(clientData.phone)
    ) {
      return res.status(400).json({ message: "Invalid phone number" });
    }

    if (!products || !Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ message: "Products information missing" });
    }

    // Create a new client instance
    const newClient = new Client(clientData);
    const savedClient = await newClient.save();
    const newOrder = new Order({
      client: savedClient._id,
      products: products,
      totalPrice: totalPrice,
      orderDate: date,
    });

    console.log(newOrder);
    const savedOrder = await newOrder.save();
    const productIds = products.map((product) => product._id);

    await Client.findByIdAndUpdate(savedClient._id, {
      $push: { orders: savedOrder._id },
      $addToSet: { commandedProducts: { $each: productIds } },
    });

    // Send invoice to the client's email
    const transporter = nodemailer.createTransport({
      // Your email sending configuration
      service: "Gmail",
      auth: {
        user: "sebriaziz2016@gmail.com", // your email
        pass: "tawhbuemueyhdung", // your password
      },
    });

    const mailOptions = {
      from: "sebriaziz2016@gmail.com",
      to: clientData.email,
      subject: "[SuperSiesta-Home] Facture d'achat",
      html: invoiceHTML, // Use the provided invoice HTML directly
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.error("Error sending email:", error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    res
      .status(201)
      .json({ message: "Order placed successfully", order: savedOrder });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Failed to place order. Please try again later." });
  }
}

async function updateOrderCommentaire(req, res) {
  try {
    const { orderId } = req.params;
    const { commentaire } = req.body;

    const updatedOrder = await Order.findByIdAndUpdate(orderId, {
      commentaire,
    });

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    return res
      .status(200)
      .json({ message: "Commentaire updated successfully", updatedOrder });
  } catch (error) {
    console.error("Error updating commentaire:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
async function addOrderDash(req, res) {
  try {
    const newClientId = new mongoose.Types.ObjectId();
    const newClientData = {
      _id: newClientId,
      name: req.body.clientName,
      prenom: req.body.clientPrenom,
      phone: req.body.phone,
      orders: req.body.products.map(
        (pro) => new mongoose.Types.ObjectId(pro.productId)
      ),
      email: req.body.email,
      address: req.body.address,
    };
    const newClient = Client(newClientData);

    const newOrderData = {
      client: newClientId,
      products: req.body.products.map((pro) => ({
        product: new mongoose.Types.ObjectId(pro.productId),
        quantity: Number(pro.quantity),
      })),
      totalPrice: req.body.totalPrice,
      orderDate: new Date(),
      confirmation: false,
    };
    const newOrder = Order(newOrderData);

    const savedClient = await newClient.save();
    const savedOrder = await newOrder.save();

    res
      .status(201)
      .json({ success: true, message: "Order added successfully" });
  } catch (error) {
    console.error("Error adding order:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

async function updateOrderConfirmation(req, res) {
  const { email } = req.body;
  try {
    const orderId = req.params.id;
    const result = await Order.findByIdAndUpdate(orderId, {
      confirmation: true,
    });

    if (!result) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }

    // Send confirmation email
    const transporter = nodemailer.createTransport({
      // Your email sending configuration
      service: "Gmail",
      auth: {
        user: "sebriaziz2016@gmail.com", // your email
        pass: "tawhbuemueyhdung", // your password
      },
    });

    const mailOptions = {
      from: "sebriaziz2016@gmail.com",
      to: email,
      subject: "[Supersiesta-home] Confirmation de commande",
      html: `
        <p>Votre commande a été confirmée avec succès. Nous vous remercions pour votre achat chez nous.</p>
        <p>Merci beaucoup et à bientôt  !</p>
        <p>SuperSiesta</p>
      `,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.error("Error sending email:", error);
        res.status(500).json({
          success: false,
          message: "Failed to send confirmation email",
        });
      } else {
        console.log("Email sent:", info.response);
        res
          .status(200)
          .json({ success: true, message: "Order confirmed successfully" });
      }
    });
  } catch (error) {
    console.error("Error confirming order:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

export default {
  getAllOrders,
  deleteOrder,
  addOrderDash,
  addOrder,
  updateOrderCommentaire,
  updateOrderConfirmation,
};
