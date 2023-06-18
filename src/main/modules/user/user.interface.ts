// Define the User model interface
import { Document } from "mongoose";

export interface User extends Document {
  _id: string;
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
