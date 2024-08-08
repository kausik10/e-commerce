import express, { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import { isAuth } from "../utils";
import { Order, OrderModel } from "../model/orderModel";
import { Product } from "../model/productModel";
export const orderRouter = express.Router();

orderRouter.get(
  "/mine",
  isAuth,
  expressAsyncHandler(async (req: Request, res: Response) => {
    const orders = await OrderModel.find({user: req.user._id});  
    res.json(orders);
  })
)

orderRouter.get(
  // /api/order/:id
  "/:id",
  isAuth,
  expressAsyncHandler(async (req: Request, res: Response) => {
    const order = await OrderModel.findById(req.params.id);
    if (order) {
      res.json(order);
    } else {
      res.status(404).json({ message: "Order Not Found" });
    }
  }),
);

orderRouter.post(
  "/",
  isAuth,
  expressAsyncHandler(async (req: Request, res: Response) => {
    if (req.body.orderItems.length === 0) {
      res.status(400).json({ message: "Cart is empty" });
    } else {
      const createdOrder = await OrderModel.create({
        orderItems: req.body.orderItems.map((x: Product) => ({
          ...x,
          product: x._id,
        })),

        shippingAddress: req.body.shippingAddress,
        paymentMethod: req.body.paymentMethod,
        itemPrice: req.body.itemPrice,
        shippingPrice: req.body.shippingPrice,
        taxPrice: req.body.taxPrice,
        totalPrice: req.body.totalPrice,
        user: req.user._id,
      } as Order)

      res
        .status(201)
        .json({ message: "New Order Created", order: createdOrder });
    }
  }),
);


orderRouter.put(
  '/:id/pay',
  isAuth,
  expressAsyncHandler(async (req: Request, res: Response) => {
    const order = await OrderModel.findById(req.params.id).populate('user');

    if(order)
    {
      order.isPaid = true;
      order.paidAt = new Date(Date.now());
      order.paymentResult = {
        paymentId: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.payer.email_address,
      };
      const updatedOrder = await order.save();
      res.send({order: updatedOrder, message: 'Order Paid Succesfully'});
    }else {
      res.status(404).json({message: 'Order Not Found'})
    }
})
);
