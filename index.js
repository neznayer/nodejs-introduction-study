require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const todosRouter = require("./routes/todos");

// Initialize express app
const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

app.use(checkSecret);

app.use("/todos", todosRouter);

// Start the server
const start = async () => {
  try {
    app.listen(PORT, async () => {
      console.log(`Server started on port ${PORT}`);
      await mongoose.connect(process.env.MONGO_URL);
      console.log("Connected to MongoDB");
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

start();
