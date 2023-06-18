import { Schema, model } from "mongoose";
import { Breed, Category, Cow, Label } from "./user.interface";

// Create a Mongoose schema for the Cow model
const CowSchema = new Schema<Cow>({
  name: { type: Schema.Types.String, required: true },
  age: { type: Schema.Types.Number, required: true },
  price: { type: Schema.Types.Number, required: true },
  location: {
    type: Schema.Types.String,
    enum: Object.keys(Location),
    required: true,
  },
  breed: {
    type: Schema.Types.String,
    enum: Object.keys(Breed),
    required: true,
  },
  weight: { type: Schema.Types.Number, required: true },
  label: {
    type: Schema.Types.String,
    enum: Object.keys(Label),
    default: Label.FOR_SALE,
  },
  category: {
    type: Schema.Types.String,
    enum: Object.keys(Category),
    required: true,
  },
  seller: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

// Create and export the Cow model
const CowModel = model<Cow>("Cow", CowSchema);
export default CowModel;
