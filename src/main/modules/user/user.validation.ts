import { z } from "zod";

// Define Zod validation schema for the User model
const createUserZodSchema = z.object({
  body: z.object({
    phoneNumber: z.string(),
    role: z.enum(["seller", "buyer"]),
    password: z.string(),
    name: z.object({
      firstName: z.string({
        required_error: "First name is required",
      }),
      lastName: z.string({
        required_error: "Last name is required",
      }),
    }),
    address: z.string({
      required_error: "Address is required",
    }),
    budget: z.number({
      required_error: "Budget is required",
    }),
    income: z.number({
      required_error: "Income is required",
    }),
  }),
});

const loginUserZodSchema = z.object({
  body: z.object({
    phoneNumber: z.string({
      required_error: "Phone number is required",
    }),

    password: z.string({
      required_error: "Password is required",
    }),
  }),
});

export const UserValidation = {
  createUserZodSchema,
  loginUserZodSchema,
};
