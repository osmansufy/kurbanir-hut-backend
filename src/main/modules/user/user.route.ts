import express from "express";
import { UserController } from "./user.controller";
import auth from "../../middleware/auth";
import { Enum_Role } from "../../../interfaces/common";

const router = express.Router();

router.get("/", auth(Enum_Role.admin), UserController.getAllUsers);

router.get("/:id", auth(Enum_Role.admin), UserController.getSingleUser);

router.patch("/:id", auth(Enum_Role.admin), UserController.updateUser);

router.delete("/:id", auth(Enum_Role.admin), UserController.deleteUser);

export const UserRoutes = router;
