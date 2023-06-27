import express from "express";
import { UserController } from "../user.controller";
import validateRequest from "../../../middleware/validateRequest";
import { UserValidation } from "../user.validation";
import { AuthValidation } from "./auth.validation";

const router = express.Router();

router.post(
  "/signup",
  validateRequest(UserValidation.createUserZodSchema),
  UserController.createUser
);

router.post(
  "/login",
  validateRequest(AuthValidation.loginUserZodSchema),

  UserController.loginUser
);

router.post(
  "/refresh-token",
  validateRequest(AuthValidation.refreshTokenZodSchema),
  UserController.refreshToken
);

export const AuthRouts = router;
