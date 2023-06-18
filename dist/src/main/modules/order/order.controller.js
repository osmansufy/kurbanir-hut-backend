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
exports.OrderController = void 0;
const order_service_1 = require("./order.service");
const catchAsync_1 = __importDefault(require("../../../utility/catchAsync"));
const createOrder = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
    const newOrder = yield order_service_1.OrderService.createOrder({
        cow: cowId,
        buyer: buyerId,
    });
    res.status(201).json({
        success: true,
        data: newOrder,
    });
}));
const getAllOrders = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orders = yield order_service_1.OrderService.getAllOrders();
    res.status(200).json({
        success: true,
        data: orders,
    });
}));
exports.OrderController = {
    createOrder,
    getAllOrders,
};
