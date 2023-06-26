import { Document, Types } from "mongoose";

// Enum for location
export enum Location {
  Dhaka = "Dhaka",
  Chattogram = "Chattogram",
  Barishal = "Barishal",
  Rajshahi = "Rajshahi",
  Sylhet = "Sylhet",
  Comilla = "Comilla",
  Rangpur = "Rangpur",
  Mymensingh = "Mymensingh",
}

// Enum for breed
export enum Breed {
  Brahman = "Brahman",
  Nellore = "Nellore",
  Sahiwal = "Sahiwal",
  Gir = "Gir",
  Indigenous = "Indigenous",
  Tharparkar = "Tharparkar",
  Kankrej = "Kankrej",
}

// Enum for label
export enum Label {
  ForSale = "for sale",
  SoldOut = "sold out",
}

// Enum for category
export enum Category {
  Dairy = "Dairy",
  Beef = "Beef",
  DualPurpose = "Dual Purpose",
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

export interface ICowFilter {
  searchTerm?: string;
  location?: string;
}
