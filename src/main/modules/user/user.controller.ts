import { Request, Response } from "express";
import catchAsync from "../../../utility/catchAsync";
import { UserService } from "./user.service";

const createUser = catchAsync(async (req: Request, res: Response) => {
  const newUser = await UserService.createUser(req.body);

  res.status(201).json({
    success: true,
    message: "User created successfully",
    data: newUser,
    statusCode: 201,
  });
});

const getSingleUser = catchAsync(async (req: Request, res: Response) => {
  const user = await UserService.getSingleUser(req.params.id);

  res.status(200).json({
    success: true,
    message: "User fetched successfully",
    data: user,
    statusCode: 200,
  });
});

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const users = await UserService.getAllUsers();

  res.status(200).json({
    success: true,
    message: "Users fetched successfully",
    data: users,
    statusCode: 200,
  });
});

const updateUser = catchAsync(async (req: Request, res: Response) => {
  const updatedUser = await UserService.updateUser(req.params.id, req.body);

  res.status(200).json({
    success: true,
    message: "User updated successfully",
    data: updatedUser,
    statusCode: 200,
  });
});

const deleteUser = catchAsync(async (req: Request, res: Response) => {
  const deletedUser = await UserService.deleteUser(req.params.id);

  res.status(200).json({
    success: true,
    message: "User deleted successfully",
    data: deletedUser,
    statusCode: 200,
  });
});

export const UserController = {
  createUser,
  getSingleUser,
  getAllUsers,
  updateUser,
  deleteUser,
};
