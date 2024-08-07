import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { mongoose } from "@typegoose/typegoose";
import { productRouter } from "./routers/productRouter";
import { userRouter } from "./routers/userRouter";
import { seedRouter } from "./routers/seedRouter";
import { orderRouter } from "./routers/orderRouter";
import { keyRouter } from "./routers/keyRouter";
dotenv.config();

const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1/ke-commerce";
  mongoose.set("strictQuery", true);

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error: Error) => {
    console.log("Error connecting to MongoDB", error.message);
  });

const app = express();

app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000"],
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/products", productRouter);
app.use("/api/users", userRouter);
app.use("/api/order", orderRouter);
app.use("/api/seed", seedRouter);
app.use("/api/keys", keyRouter);

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
