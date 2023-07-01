import { Request, Response } from "express";
import catchAsync from "../../../utility/catchAsync";
import { AdminService } from "./admin.service";
import sendResponse from "../../../utility/sendResponse";
import { ILoginServerResponse } from "../../../interfaces/common";
import httpStatus from "http-status";

const createAdmin = catchAsync(async (req: Request, res: Response) => {
  const newAdmin = await AdminService.createAdmin(req.body);

  sendResponse(res, {
    success: true,
    message: "Admin created successfully",
    data: newAdmin,
    statusCode: 201,
  });
});

const loginAdmin = catchAsync(async (req: Request, res: Response) => {
  const newAdmin = await AdminService.loginAdmin(req.body);

  const cookieOptions = {
    secure: true,
    httpOnly: true,
  };

  res.cookie("refreshToken", newAdmin.refreshToken, cookieOptions);

  sendResponse<ILoginServerResponse>(res, {
    statusCode: 200,
    success: true,
    message: "Admin logged in successfully",
    data: {
      accessToken: newAdmin.accessToken,
    },
  });
});

const deleteAdmin = catchAsync(async (req: Request, res: Response) => {
  const deletedAdmin = await AdminService.deleteAdmin(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin deleted successfully",
    data: deletedAdmin,
  });
});

export const AdminController = {
  createAdmin,
  loginAdmin,
  deleteAdmin,
};
