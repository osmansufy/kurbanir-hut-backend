import express from "express";
import { OrderController } from "./order.controller";
import { Enum_Role } from "../../../interfaces/common";
import auth from "../../middleware/auth";
const router = express.Router();

router.get(
  "/",
  auth(Enum_Role.buyer, Enum_Role.seller, Enum_Role.admin),
  OrderController.getAllOrders
);

router.get(
  "/:id",
  auth(Enum_Role.buyer, Enum_Role.seller),
  OrderController.getSingleOrder
);

router.post("/", auth(Enum_Role.buyer), OrderController.createOrder);

export const OrderRoutes = router;
