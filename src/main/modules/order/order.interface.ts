import { Types, Document } from "mongoose";

export interface Order extends Document {
  cowId: Types.ObjectId;
  buyerId: Types.ObjectId;
  sellerId: Types.ObjectId;
  totalPrice: number;
  status: OrderStatus;
}

export enum OrderStatus {
  PENDING = "pending",
  COMPLETED = "completed",
  CANCELED = "canceled",
}

export interface ICreateOrderInput {
  cow: Types.ObjectId;
  buyer: Types.ObjectId;
}
