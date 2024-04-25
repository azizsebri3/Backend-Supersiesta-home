import express from "express";
import cors from "cors";
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
app.use(cors());
app.use(express.json());

app.use("/api/register", registerRoute);
app.use("/api/login", loginRoute);
app.use("/api/users", usersRoute);
app.use("/api/products", productsRoute);
app.use("/api/clients", clientsRoute);
app.use("/api/orders", ordersRoute);


const PORT = 4000 ; 
const startServer = async () => {
  try {
    connectDB("mongodb+srv://azizsbr:aziz93621982sebri@supersiesta.bjpqmt7.mongodb.net/Supersietsa");

    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });
  } catch (error) {
    console.error(error);
  }
};

startServer();

export default app;
