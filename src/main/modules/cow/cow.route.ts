import express from "express";
import { CowController } from "./cow.controller";
import validateRequest from "../../middleware/validateRequest";
import { CowValidation } from "./cow.validation";
import { Enum_Role } from "../../../interfaces/common";
import auth from "../../middleware/auth";

const router = express.Router();

router.get(
  "/",
  auth(Enum_Role.seller, Enum_Role.admin, Enum_Role.buyer),
  CowController.getAllCows
);

router.get(
  "/:id",
  auth(Enum_Role.seller, Enum_Role.admin, Enum_Role.buyer),
  CowController.getSingleCow
);

router.post(
  "/",
  validateRequest(CowValidation.createCowZodSchema),
  auth(Enum_Role.seller),
  CowController.createCow
);

router.patch("/:id", auth(Enum_Role.seller), CowController.updateCow);

router.delete("/:id", auth(Enum_Role.seller), CowController.deleteCow);

export const CowRoutes = router;
