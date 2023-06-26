import { Request, Response } from "express";
import catchAsync from "../../../utility/catchAsync";
import { AdminService } from "./admin.service";
import sendResponse from "../../../utility/sendResponse";
import { ILoginServerResponse } from "../../../interfaces/common";

const createAdmin = catchAsync(async (req: Request, res: Response) => {
  const newAdmin = await AdminService.createAdmin(req.body);

  res.status(201).json({
    success: true,
    message: "Admin created successfully",
    data: newAdmin,
    statusCode: 201,
  });
});

const loginAdmin = catchAsync(async (req: Request, res: Response) => {
  const newAdmin = await AdminService.loginAdmin(req.body);

  sendResponse<ILoginServerResponse>(res, {
    statusCode: 201,
    success: true,
    message: "Admin logged in successfully",
    data: {
      accessToken: newAdmin.accessToken,
    },
  });
});

export const AdminController = {
  createAdmin,
  loginAdmin,
};
