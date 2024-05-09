import express from "express";
import * as dotenv from "dotenv";
import connectDB from "./config/connection.js";
import registerRoute from "./routes/register.js";
import loginRoute from "./routes/login.js";
import usersRoute from "./routes/users.js";
import productsRoute from "./routes/products.js";
import clientsRoute from "./routes/clients.js";
import ordersRoute from "./routes/orders.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// CORS middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// Other middleware
app.use(express.json());

// Routes
app.use("/api/register", registerRoute);
app.use("/api/login", loginRoute);
app.use("/api/users", usersRoute);
app.use("/api/products", productsRoute);
app.use("/api/clients", clientsRoute);
app.use("/api/orders", ordersRoute);

// Start the server
const startServer = async () => {
  try {
    await connectDB(process.env.MONGODB_URI);
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });
  } catch (error) {
    console.error(error);
  }
};

startServer();

export default app;