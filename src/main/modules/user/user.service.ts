import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { User } from "./user.interface";
import UserModel from "./user.model";
import {
  ILoginRequest,
  ILoginServerResponse,
} from "../../../interfaces/common";
import config from "../../../config";
import { JwtHelper } from "../../../helpers/jwtHelper";

const createUser = async (user: User): Promise<User | null> => {
  // check if user already exists with the same phone number
  const isExist = await UserModel.findOne({ phoneNumber: user.phoneNumber });
  if (isExist) {
    throw new ApiError(
      httpStatus.CONFLICT,
      "User already exists with the same phone number"
    );
  }

  const newUser = await UserModel.create(user);
  return newUser;
};

const getSingleUser = async (id: string): Promise<User | null> => {
  const user = UserModel.findOne({ _id: id });
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }
  return user;
};

const getAllUsers = async (): Promise<User[]> => {
  const users = UserModel.find();
  return users;
};

const updateUser = async (
  id: string,
  payload: Partial<User>
): Promise<User | null> => {
  const isExist = await UserModel.findOne({ _id: id });
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }

  const { name, ...userInfo } = payload;

  const updatedUserData = {
    ...userInfo,
  };
  // update name object if it exists
  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach((key) => {
      const nameKey: keyof typeof name = key as keyof typeof name;
      // @ts-ignore
      updatedUserData[`name.${nameKey}`] = name[nameKey];
    });
  }

  const updatedUser = await UserModel.findByIdAndUpdate(id, updatedUserData, {
    new: true,
  });

  return updatedUser;
};

const deleteUser = async (id: string): Promise<User | null> => {
  const deletedUser = await UserModel.findOneAndDelete({ _id: id });
  return deletedUser;
};

const loginUser = async (
  user: ILoginRequest
): Promise<ILoginServerResponse> => {
  const isUserExist = await UserModel.findOne({
    phoneNumber: user.phoneNumber,
    password: user.password,
  });

  if (!isUserExist) {
    throw new ApiError(httpStatus.CONFLICT, "User not found");
  }

  // create token

  const accessToken = JwtHelper.createToken(
    {
      id: isUserExist._id,
      role: isUserExist.role,
    },
    config.jwt.secret as string,
    config.jwt.expires_in as string
  );

  const refreshToken = JwtHelper.createToken(
    {
      id: isUserExist._id,
      role: isUserExist.role,
    },
    config.jwt.refresh_secret as string,
    config.jwt.refresh_expires_in as string
  );

  return {
    accessToken,
    refreshToken,
  };
};

export const UserService = {
  createUser,
  getSingleUser,
  getAllUsers,
  updateUser,
  deleteUser,
  loginUser,
};
