import { z } from "zod";
import { Breed, Category, Label, Location } from "./user.interface";

const createCowZodSchema = z.object({
  name: z.string({
    required_error: "Name is required",
  }),
  age: z.number({
    required_error: "Age is required",
  }),
  price: z.number({
    required_error: "Price is required",
  }),
  // required_error: "Location is required",
  location: z.nativeEnum(Location),
  breed: z.nativeEnum(Breed),
  weight: z.number(),
  label: z.nativeEnum(Label),
  category: z.nativeEnum(Category),
  seller: z.string(),
});

export const CowValidation = {
  createCowZodSchema,
};
