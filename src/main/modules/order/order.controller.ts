import { Request, Response } from "express";
import { OrderService } from "./order.service";
import catchAsync from "../../../utility/catchAsync";

const createOrder = catchAsync(async (req: Request, res: Response) => {
  let cowId = req.body.cow;

  let buyerId = req.body.buyer;

  if (!req.body.cow || !req.body.buyer) {
    throw new Error("Cow and buyer are required");
  }

  const newOrder = await OrderService.createOrder({
    cow: cowId,
    buyer: buyerId,
  });

  res.status(201).json({
    success: true,
    data: newOrder,
  });
});

const getAllOrders = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;

  if (!user) {
    throw new Error("User not found");
  }
  const orders = await OrderService.getAllOrders(user);

  res.status(200).json({
    success: true,
    data: orders,
  });
});

export const OrderController = {
  createOrder,
  getAllOrders,
};
