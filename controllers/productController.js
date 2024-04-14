// controllers/productController.js

import Product from "../models/Product.js";

async function getAllProducts(req, res) {
  try {
    const products = await Product.find();
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

async function addProduct(req, res) {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(201).json({ message: "Product added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to add product. Please try again later." });
  }
}

async function updateProduct(req, res) {
  try {
    await Product.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({ message: "Product updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update product. Please try again later." });
  }
}

async function getProductById(req, res) {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ success: false, message: "Product not found" });
    }
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function deleteProduct(req, res) {
  try {
    const result = await Product.findByIdAndDelete(req.params.id);
    if (!result) {
      res.status(404).json({ success: false, message: "Product not found" });
    } else {
      res.status(200).json({ success: true, message: "Product deleted successfully" });
    }
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

export default {
  getAllProducts,
  addProduct,
  updateProduct,
  getProductById,
  deleteProduct,
};
