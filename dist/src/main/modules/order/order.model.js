"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderModel = void 0;
const mongoose_1 = require("mongoose");
const order_interface_1 = require("./order.interface");
const OrderSchema = new mongoose_1.Schema({
    cowId: { type: mongoose_1.Schema.Types.ObjectId, ref: "Cow", required: true },
    buyerId: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    sellerId: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    totalPrice: { type: mongoose_1.Schema.Types.Number, required: true },
    status: {
        type: mongoose_1.Schema.Types.String,
        enum: Object.values(order_interface_1.OrderStatus),
        required: true,
    },
});
exports.OrderModel = (0, mongoose_1.model)("Order", OrderSchema);
