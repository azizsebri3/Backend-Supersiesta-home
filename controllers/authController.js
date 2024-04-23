import argon2 from "argon2";
import User from "../models/register.js";

async function loginUser(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).send("Invalid email or password");
    }
    const passwordMatch = await argon2.verify(user.password, password);
    if (!passwordMatch) {
      return res.status(401).send("Invalid email or password");
    }
    res.status(200).send("Login successful");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error logging in");
  }
}

export default { loginUser };
