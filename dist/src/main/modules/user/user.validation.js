"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
const zod_1 = require("zod");
// Define Zod validation schema for the User model
const createUserZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        phoneNumber: zod_1.z.string(),
        role: zod_1.z.enum(["seller", "buyer"]),
        password: zod_1.z.string(),
        name: zod_1.z.object({
            firstName: zod_1.z.string({
                required_error: "First name is required",
            }),
            lastName: zod_1.z.string({
                required_error: "Last name is required",
            }),
        }),
        address: zod_1.z.string({
            required_error: "Address is required",
        }),
        budget: zod_1.z.number({
            required_error: "Budget is required",
        }),
        income: zod_1.z.number({
            required_error: "Income is required",
        }),
    }),
});
exports.UserValidation = {
    createUserZodSchema,
};
