import { Document, Types } from "mongoose";

// Enum for location
export enum Location {
  DHAKA = "dhaka",
  CHATTOGRAM = "chattogram",
  BARISHAL = "barishal",
  RAJSHAHI = "rajshahi",
  SYLHET = "sylhet",
  COMILLA = "comilla",
  RANGPUR = "rangpur",
  MYMENSINGH = "mymensingh",
}

// Enum for breed
export enum Breed {
  BRAHMAN = "brahman",
  NELLORE = "nellore",
  SAHIWAL = "sahiwal",
  GIR = "gir",
  INDIGENOUS = "indigenous",
  THARPARKAR = "tharparkar",
  KANKREJ = "kankrej",
}

// Enum for label
export enum Label {
  FOR_SALE = "for sale",
  SOLD_OUT = "sold out",
}

// Enum for category
export enum Category {
  DAIRY = "dairy",
  BEEF = "beef",
  DUAL_PURPOSE = "dual_purpose",
}

// Define the Cow model interface
export interface Cow extends Document {
  name: string;
  age: number;
  price: number;
  location: Location;
  breed: Breed;
  weight: number;
  label: Label;
  category: Category;
  seller: Types.ObjectId;
}
