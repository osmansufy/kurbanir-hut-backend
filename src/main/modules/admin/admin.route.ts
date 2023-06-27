import express from "express";
import validateRequest from "../../middleware/validateRequest";
import { AdminValidation } from "./admin.validation";
import { AdminController } from "./admin.controller";

const router = express.Router();

router.post(
  "/create-admin",
  validateRequest(AdminValidation.createAdminZodSchema),
  AdminController.createAdmin
);

router.delete("/delete-admin/:id", AdminController.deleteAdmin);
router.post(
  "/login",
  validateRequest(AdminValidation.loginAdminZodSchema),
  AdminController.loginAdmin
);

export const AdminRoutes = router;
