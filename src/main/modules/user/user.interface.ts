// Define the User model interface
import { Document, Model } from "mongoose";

export interface User extends Document {
  phoneNumber: string;
  role: "seller" | "buyer";
  password: string;
  name: {
    firstName: string;
    lastName: string;
  };
  address: string;
  budget: number;
  income: number;
}

export interface IUserExtends extends Model<User> {
  isUserExist(phoneNumber: string): Promise<User | null>;

  isPasswordMatch(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>;
}

export type IRefreshTokenResponse = {
  accessToken: string;
};
