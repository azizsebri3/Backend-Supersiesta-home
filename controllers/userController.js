import argon2 from "argon2";
import User from "../models/register.js";

// Controller function to register a new user
async function registerUser(req, res) {
  try {
    const { name, email, role, password } = req.body;
    const hashedPassword = await argon2.hash(password);
    const user = new User({ name, email, role, password: hashedPassword });
    await user.save();
    res.status(201).send("User registered successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error registering user");
  }
}

// Controller function to fetch all users
async function getAllUsers(req, res) {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

// Controller function to modify a user
async function modifyUser(req, res) {
  try {
    const { id } = req.params; // Assuming id is passed as a parameter
    const { name, email, role, password } = req.body;
    
    // Find the user by id
    let user = await User.findById(id);
    if (!user) {
      return res.status(404).send("User not found");
    }

    // Update user fields
    user.name = name;
    user.email = email;
    user.role = role;

    if (password) {
      user.password = await argon2.hash(password); // Hash new password
    }

    // Save the updated user
    await user.save();
    res.status(200).send("User updated successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error updating user");
  }
}

// Controller function to delete a user
async function deleteUser(req, res) {
  try {
    const { id } = req.params; // Assuming id is passed as a parameter
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.status(200).send("User deleted successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error deleting user");
  }
}

export default { getAllUsers, registerUser, modifyUser, deleteUser };
