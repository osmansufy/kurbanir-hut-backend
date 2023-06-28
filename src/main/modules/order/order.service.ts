import mongoose from "mongoose";
import { ICreateOrderInput, Order, OrderStatus } from "./order.interface";
import UserModel from "../user/user.model";
import CowModel from "../cow/cow.model";
import { Label } from "../cow/cow.interface";
import { OrderModel } from "./order.model";
import ApiError from "../../../errors/ApiError";
import httpStatus from "http-status";
import { User } from "../user/user.interface";
import { JwtPayload } from "jsonwebtoken";

const createOrder = async (order: ICreateOrderInput): Promise<Order | null> => {
  const session = await mongoose.startSession();

  let newOrder = null;
  try {
    // first check buyer  has enough money in their account to buy the cow.
    // ObjectId(“6473c6a50c56d0d40b9bb6a3) to 6473c6a50c56d0d40b9bb6a3
    session.startTransaction();

    const buyer = await UserModel.findById(order.buyer).session(session);

    if (!buyer) {
      throw new ApiError(httpStatus.NOT_FOUND, "Buyer not found");
    }

    const cow = await CowModel.findById(order.cow).session(session);

    if (!cow) {
      throw new ApiError(httpStatus.NOT_FOUND, "Cow not found");
    }

    if (cow.label === Label.SoldOut) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Cow is already sold out");
    }

    if (buyer.budget < cow.price) {
      throw new Error("Buyer does not have enough money to buy the cow");
    }

    // update buyer budget
    buyer.budget = buyer.budget - cow.price;

    await buyer.save();

    // update cow label
    cow.label = Label.SoldOut;

    await cow.save();

    // update seller income
    const seller = await UserModel.findById(cow.seller).session(session);

    if (!seller) {
      throw new Error("Seller not found");
    }

    seller.income = seller.income + cow.price;

    await seller.save();

    // create order

    newOrder = await OrderModel.create(
      [
        {
          cowId: cow._id,
          buyerId: buyer._id,
          sellerId: cow.seller,
          totalPrice: cow.price,
          status: OrderStatus.COMPLETED,
        },
      ],
      { session }
    );

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    throw error;
  }

  if (!newOrder) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      "Something went wrong while creating order"
    );
  } else {
    newOrder = await OrderModel.findById({
      _id: newOrder[0]._id,
    })
      .populate("cowId")
      .populate("buyerId")
      .populate("sellerId");
  }

  return newOrder;
};

const getAllOrders = async (user: JwtPayload): Promise<Order[]> => {
  let orders: Order[] = [];
  if (user.role === "buyer") {
    orders = await OrderModel.find({ buyerId: user.id })
      .populate("cowId")
      .populate("buyerId")
      .populate("sellerId")
      .exec();

    console.log("orders", orders);
  } else if (user.role === "seller") {
    orders = await OrderModel.find({ sellerId: user.id })
      .populate("cowId")
      .populate("buyerId")
      .populate("sellerId")
      .exec();

    console.log("orders", orders);
  } else if (user.role === "admin") {
    orders = await OrderModel.find()
      .populate("cowId")
      .populate("buyerId")
      .populate("sellerId")
      .exec();
  }

  return orders;
};

export const OrderService = {
  createOrder,
  getAllOrders,
};
