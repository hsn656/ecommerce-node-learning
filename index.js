const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

const userRoutes = require("./router/userRoutes");
const authRoutes = require("./router/authRoutes");
const productRoutes = require("./router/productRoutes");

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);

mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    app.listen(process.env.PORT || 5000, () => {
      console.log("server is running");
    });
  })
  .catch((err) => {
    console.log(err);
  });
