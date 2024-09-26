import express from "express";
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

import userRouter from "./routes/user.js";
import authRouter from "./routes/auth.js";
import productsRouter from "./routes/product.js";
import categoriesRouter from "./routes/categories.js";

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB...");
  })
  .catch((err) => {
    console.log(err);
  });

const port = process.env.PORT || 5000;

const app = express();

app.use(express.json());

app.use(cookieParser());

app.get("/", (req, res) => res.send("Server running"));

app.listen(port, () => console.log(`Server listening on ${port}`));

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/product", productsRouter);
app.use("/api/category", categoriesRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
