// import bcrypt from "bcrypt";
// import User from "../models/register.js";

// async function authenticateUser(req, res, next) {
//   try {
//     const { email, password } = req.body;
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(401).send("Invalid email or password");
//     }
//     const passwordMatch = await bcrypt.compare(password, user.password);
//     if (!passwordMatch) {
//       return res.status(401).send("Invalid email or password");
//     }
//     next(); // Call next middleware if authentication succeeds
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Error authenticating user");
//   }
// }

// export default authenticateUser;
