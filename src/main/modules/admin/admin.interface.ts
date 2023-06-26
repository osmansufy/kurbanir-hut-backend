import { Document } from "mongoose";
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
