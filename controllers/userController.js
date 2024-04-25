import argon2 from "argon2";
import User from "../models/register.js";

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
// Controller function to fetch all clients
async function getAllUsers(req, res) {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export default { getAllUsers, registerUser };
