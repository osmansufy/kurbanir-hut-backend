import { Request, Response } from "express";
import { OrderService } from "./order.service";
import catchAsync from "../../../utility/catchAsync";
import sendResponse from "../../../utility/sendResponse";

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

  sendResponse(res, {
    statusCode: 201,
    message: "Order created successfully",
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

  sendResponse(res, {
    statusCode: 200,
    message: "Orders fetched successfully",
    success: true,
    data: orders,
  });
});

const getSingleOrder = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;

  if (!user) {
    throw new Error("User not found");
  }

  const order = await OrderService.getSingleOrder(req.params.id, user);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Order fetched successfully",
    data: order,
  });
});

export const OrderController = {
  createOrder,
  getAllOrders,
  getSingleOrder,
};
