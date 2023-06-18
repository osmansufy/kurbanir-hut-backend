"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CowValidation = void 0;
const zod_1 = require("zod");
const cow_interface_1 = require("./cow.interface");
const createCowZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: "Name is required",
        }),
        age: zod_1.z.number({
            required_error: "Age is required",
        }),
        price: zod_1.z.number({
            required_error: "Price is required",
        }),
        // required_error: "Location is required",
        location: zod_1.z.nativeEnum(cow_interface_1.Location),
        breed: zod_1.z.nativeEnum(cow_interface_1.Breed),
        weight: zod_1.z.number(),
        label: zod_1.z.nativeEnum(cow_interface_1.Label),
        category: zod_1.z.nativeEnum(cow_interface_1.Category),
        seller: zod_1.z.string(),
    }),
});
exports.CowValidation = {
    createCowZodSchema,
};
