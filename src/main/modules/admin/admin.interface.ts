import { Document, Model } from "mongoose";
import { Enum_Role } from "../../../interfaces/common";

export interface IAdmin extends Document {
  phoneNumber: string;
  role: Enum_Role.admin;
  password: string;
  name: {
    firstName: string;
    lastName: string;
  };
  address: string;
}

export interface IAdminModel extends Model<IAdmin> {
  isAdminExist(phoneNumber: string): Promise<IAdmin | null>;

  isPasswordMatch(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>;
}
