"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const order_interface_1 = require("./order.interface");
const user_model_1 = __importDefault(require("../user/user.model"));
const cow_model_1 = __importDefault(require("../cow/cow.model"));
const cow_interface_1 = require("../cow/cow.interface");
const order_model_1 = require("./order.model");
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const createOrder = (order) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    let newOrder = null;
    try {
        // first check buyer  has enough money in their account to buy the cow.
        // ObjectId(“6473c6a50c56d0d40b9bb6a3) to 6473c6a50c56d0d40b9bb6a3
        session.startTransaction();
        const buyer = yield user_model_1.default.findById(order.buyer).session(session);
        if (!buyer) {
            throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Buyer not found");
        }
        const cow = yield cow_model_1.default.findById(order.cow).session(session);
        if (!cow) {
            throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Cow not found");
        }
        if (cow.label === cow_interface_1.Label.SoldOut) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Cow is already sold out");
        }
        if (buyer.budget < cow.price) {
            throw new Error("Buyer does not have enough money to buy the cow");
        }
        // update buyer budget
        buyer.budget = buyer.budget - cow.price;
        yield buyer.save();
        // update cow label
        cow.label = cow_interface_1.Label.SoldOut;
        yield cow.save();
        // update seller income
        const seller = yield user_model_1.default.findById(cow.seller).session(session);
        if (!seller) {
            throw new Error("Seller not found");
        }
        seller.income = seller.income + cow.price;
        yield seller.save();
        // create order
        newOrder = yield order_model_1.OrderModel.create([
            {
                cowId: cow._id,
                buyerId: buyer._id,
                sellerId: cow.seller,
                totalPrice: cow.price,
                status: order_interface_1.OrderStatus.COMPLETED,
            },
        ], { session });
        yield session.commitTransaction();
        yield session.endSession();
    }
    catch (error) {
        yield session.abortTransaction();
        throw error;
    }
    if (!newOrder) {
        throw new ApiError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, "Something went wrong while creating order");
    }
    else {
        newOrder = yield order_model_1.OrderModel.findById({
            _id: newOrder[0]._id,
        })
            .populate("cowId")
            .populate("buyerId")
            .populate("sellerId");
    }
    return newOrder;
});
const getAllOrders = () => __awaiter(void 0, void 0, void 0, function* () {
    const orders = yield order_model_1.OrderModel.find()
        .populate("cowId")
        .populate("buyerId")
        .populate("sellerId")
        .exec();
    return orders;
});
exports.OrderService = {
    createOrder,
    getAllOrders,
};
