import { Request, Response } from "express";
import { OrderService } from "./order.service";
import catchAsync from "../../../utility/catchAsync";

const createOrder = catchAsync(async (req: Request, res: Response) => {
  // check if cow id is like ObjectId(“6473c6a50c56d0d40b9bb6a3) then convert it to 6473c6a50c56d0d40b9bb6a3
  // check if buyer id is like ObjectId(“6473c6a50c56d0d40b9bb6a3) then convert it to 6473c6a50c56d0d40b9bb6a3

  // Check and convert cow ID
  let cowId = req.body.cow;
  if (req.body.cow.startsWith("ObjectId(") && req.body.cow.endsWith(")")) {
    cowId = req.body.cow.slice(9, -1);
  }

  // Check and convert buyer ID
  let buyerId = req.body.buyer;
  if (req.body.buyer.startsWith("ObjectId(") && req.body.buyer.endsWith(")")) {
    buyerId = req.body.buyer.slice(9, -1);
  }

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
  const orders = await OrderService.getAllOrders();

  res.status(200).json({
    success: true,
    data: orders,
  });
});

export const OrderController = {
  createOrder,
  getAllOrders,
};
