import express from "express";
import expressAsyncHandler from "express-async-handler";
import { ProductModel } from "../model/productModel";
import { sampleProducts } from "../data";
export const seedRouter = express.Router();

seedRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    await ProductModel.deleteMany({});
    const createdProducts = await ProductModel.insertMany(sampleProducts);
    res.json({ createdProducts });
  }),
);
