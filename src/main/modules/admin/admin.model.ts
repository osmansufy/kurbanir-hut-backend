import mongoose from "mongoose";
import { IAdmin } from "./admin.interface";
import { Enum_Role } from "../../../interfaces/common";

const AdminSchema = new mongoose.Schema<IAdmin>(
  {
    phoneNumber: {
      type: mongoose.Schema.Types.String,
      required: true,
      unique: true,
    },
    role: {
      type: mongoose.Schema.Types.String,
      String: Enum_Role.admin,
      required: true,
    },
    password: { type: mongoose.Schema.Types.String, required: true },

    name: {
      firstName: { type: mongoose.Schema.Types.String, required: true },
      lastName: { type: mongoose.Schema.Types.String, required: true },
    },
    address: { type: mongoose.Schema.Types.String, required: true },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

// Create and export the User model

export const AdminModel = mongoose.model<IAdmin>("Admin", AdminSchema);
