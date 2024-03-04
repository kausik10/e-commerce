import express from "express";
import expressAsyncHandler from "express-async-handler";
import { ProductModel } from "../model/productModel";
export const productRouter = express.Router();

// final address is /api/products

productRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const products = await ProductModel.find();
    res.json(products);
  }),
);
// /api/slug/iphone-s12

productRouter.get(
  "/slug/:slug",
  expressAsyncHandler(async (req, res) => {
    const product = await ProductModel.findOne({ slug: req.params.slug });

    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  }),
);
