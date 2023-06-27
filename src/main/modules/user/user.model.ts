import { Schema, model } from "mongoose";
import { User, IUserExtends } from "./user.interface";
import { Enum_Role } from "../../../interfaces/common";
import bcrypt from "bcrypt";

const UserSchema = new Schema<User, IUserExtends>(
  {
    phoneNumber: { type: Schema.Types.String, required: true, unique: true },
    role: {
      type: Schema.Types.String,
      enum: Enum_Role,
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

// hash password before save

UserSchema.pre<User>("save", async function (next) {
  const admin = this;

  if (admin.isModified("password")) {
    admin.password = await bcrypt.hash(admin.password, 10);
  }

  next();
});

// is password match

UserSchema.statics.isPasswordMatch = async function (
  givenPassword: string,
  savedPassword: string
): Promise<boolean> {
  return bcrypt.compare(givenPassword, savedPassword);
};

// is admin exist

UserSchema.statics.isUserExist = async function (
  phoneNumber: string
): Promise<User | null> {
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
const UserModel = model<User, IUserExtends>("User", UserSchema);
export default UserModel;
