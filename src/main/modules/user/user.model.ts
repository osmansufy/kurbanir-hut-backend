import { Schema, model } from "mongoose";
import { User } from "./user.interface";

const UserSchema = new Schema<User>(
  {
    phoneNumber: { type: Schema.Types.String, required: true, unique: true },
    role: {
      type: Schema.Types.String,
      enum: ["seller", "buyer"],
      required: true,
    },
    password: { type: Schema.Types.String, required: true },
    name: {
      firstName: { type: Schema.Types.String, required: true },
      lastName: { type: Schema.Types.String, required: true },
    },
    address: { type: Schema.Types.String, required: true },
    budget: { type: Schema.Types.Number, required: true },
    income: { type: Schema.Types.Number, required: true },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

// Create and export the User model
const UserModel = model<User>("User", UserSchema);
export default UserModel;
