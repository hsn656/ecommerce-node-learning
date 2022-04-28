const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const app = express();
dotenv.config();

app.get("/api/test", (req, res) => {
  res.json({ message: "init" });  
});

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
