import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { IAdmin } from "./admin.interface";
import { AdminModel } from "./admin.model";
import { ILoginRequest, ILoginServerRequest } from "../../../interfaces/common";
import { JwtHelper } from "../../../helpers/jwtHelper";
import config from "../../../config/";

const createAdmin = async (admin: Partial<IAdmin>): Promise<IAdmin | null> => {
  const isAdminExist = await AdminModel.findOne({
    phoneNumber: admin.phoneNumber,
  });

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
): Promise<ILoginServerRequest> => {
  const isAdminExist = await AdminModel.findOne({
    phoneNumber: admin.phoneNumber,
    password: admin.password,
  });

  if (!isAdminExist) {
    throw new ApiError(httpStatus.CONFLICT, "Admin not found");
  }

  // create token

  const accessToken = JwtHelper.createToken(
    {
      id: isAdminExist._id,
      role: isAdminExist.role,
    },
    config.jwt.secret as string,
    config.jwt.expires_in as string
  );

  const refreshToken = JwtHelper.createToken(
    {
      id: isAdminExist._id,
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
export const AdminService = {
  createAdmin,
  loginAdmin,
};
