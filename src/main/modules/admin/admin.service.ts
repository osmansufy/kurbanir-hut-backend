import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { IAdmin } from "./admin.interface";
import { AdminModel } from "./admin.model";
import {
  ILoginRequest,
  ILoginServerResponse,
} from "../../../interfaces/common";
import { JwtHelper } from "../../../helpers/jwtHelper";
import config from "../../../config/";

const createAdmin = async (admin: IAdmin): Promise<IAdmin | null> => {
  const isAdminExist = await AdminModel.isAdminExist(admin.phoneNumber);

  if (isAdminExist) {
    throw new ApiError(
      httpStatus.CONFLICT,
      "Admin already exists with the same phoneNumber"
    );
  }

  const newAdmin = await AdminModel.create(admin);

  return newAdmin;
};

const loginAdmin = async (
  admin: ILoginRequest
): Promise<ILoginServerResponse> => {
  const isAdminExist = await AdminModel.isAdminExist(admin.phoneNumber);

  if (!isAdminExist) {
    throw new ApiError(httpStatus.CONFLICT, "Admin not found");
  }

  const isPasswordMatch = await AdminModel.isPasswordMatch(
    admin.password,
    isAdminExist.password
  );

  if (!isPasswordMatch) {
    throw new ApiError(httpStatus.CONFLICT, "Credentials not match");
  }
  // create token

  const accessToken = JwtHelper.createToken(
    {
      id: isAdminExist.id,
      role: isAdminExist.role,
    },
    config.jwt.secret as string,
    config.jwt.expires_in as string
  );

  const refreshToken = JwtHelper.createToken(
    {
      id: isAdminExist.id,
      role: isAdminExist.role,
    },
    config.jwt.refresh_secret as string,
    config.jwt.refresh_expires_in as string
  );

  return {
    accessToken,
    refreshToken,
  };
};

const deleteAdmin = async (id: string): Promise<IAdmin | null> => {
  const admin = await AdminModel.findByIdAndDelete(id);

  return admin;
};
export const AdminService = {
  createAdmin,
  loginAdmin,
  deleteAdmin,
};
