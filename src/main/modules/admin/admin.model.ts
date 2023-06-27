import mongoose from "mongoose";
import { IAdminModel, IAdmin } from "./admin.interface";
import { Enum_Role } from "../../../interfaces/common";
import bcrypt from "bcrypt";

const AdminSchema = new mongoose.Schema<IAdmin, IAdminModel>(
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

// hash password before save

AdminSchema.pre<IAdmin>("save", async function (next) {
  const admin = this;

  if (admin.isModified("password")) {
    admin.password = await bcrypt.hash(admin.password, 10);
  }

  next();
});

// is password match

AdminSchema.statics.isPasswordMatch = async function (
  givenPassword: string,
  savedPassword: string
): Promise<boolean> {
  return bcrypt.compare(givenPassword, savedPassword);
};

// is admin exist

AdminSchema.statics.isAdminExist = async function (
  phoneNumber: string
): Promise<IAdmin | null> {
  const admin = await this.findOne(
    {
      phoneNumber,
    },
    {
      id: 1,
      password: 1,
      role: 1,
      phoneNumber: 1,
    }
  );

  return admin;
};

// Create and export the User model

export const AdminModel = mongoose.model<IAdmin, IAdminModel>(
  "Admin",
  AdminSchema
);
