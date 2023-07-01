import express from "express";
import { UserController } from "./user.controller";
import auth from "../../middleware/auth";
import { Enum_Role } from "../../../interfaces/common";

const router = express.Router();

router.get("/", auth(Enum_Role.admin), UserController.getAllUsers);
router.get(
  "/my-profile",
  auth(Enum_Role.buyer, Enum_Role.seller),
  UserController.getMyProfile
);

router.get("/:id", auth(Enum_Role.admin), UserController.getSingleUser);

router.patch(
  "/my-profile",
  auth(Enum_Role.buyer, Enum_Role.seller),
  UserController.updateMyProfile
);

router.patch("/:id", auth(Enum_Role.admin), UserController.updateUser);

router.delete("/:id", auth(Enum_Role.admin), UserController.deleteUser);

export const UserRoutes = router;
