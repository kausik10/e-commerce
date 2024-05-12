import express, { Request, Response } from "express";
import bcypt from "bcryptjs";
import expressAsyncHandler from "express-async-handler";
import { User, UserModel } from "../model/userModel";
import { generateToken } from "../utils";

export const userRouter = express.Router();

// POST request to /api/users/signin

userRouter.post(
  "/signin",
  expressAsyncHandler(async (req: Request, res: Response) => {
    const user = await UserModel.findOne({ emai: req.body.email });
    if (user) {
      if (bcypt.compareSync(req.body.password, user.password)) {
        res.json({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          token: generateToken(user),
        });
        return;
      }
    }
    res.status(401).send({ message: "Invalid email or password" });
  }),
);

userRouter.post(
  "/signup",
  expressAsyncHandler(async (req: Request, res: Response) => {
    const user = await UserModel.create({
      name: req.body.name,
      email: req.body.email,
      password: bcypt.hashSync(req.body.password),
    } as User);
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user),
    });
  }),
);
