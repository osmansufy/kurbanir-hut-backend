import { Schema, model } from "mongoose";
import { Order, OrderStatus } from "./order.interface";

const OrderSchema = new Schema<Order>({
  cowId: { type: Schema.Types.ObjectId, ref: "Cow", required: true },
  buyerId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  sellerId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  totalPrice: { type: Schema.Types.Number, required: true },
  status: {
    type: Schema.Types.String,
    enum: Object.values(OrderStatus),
    required: true,
  },
});

export const OrderModel = model<Order>("Order", OrderSchema);
