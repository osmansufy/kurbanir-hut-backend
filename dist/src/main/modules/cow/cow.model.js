"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const cow_interface_1 = require("./cow.interface");
// Create a Mongoose schema for the Cow model
const CowSchema = new mongoose_1.Schema({
    name: { type: mongoose_1.Schema.Types.String, required: true },
    age: { type: mongoose_1.Schema.Types.Number, required: true },
    price: { type: mongoose_1.Schema.Types.Number, required: true },
    location: {
        type: mongoose_1.Schema.Types.String,
        enum: Object.keys(cow_interface_1.Location),
        required: true,
    },
    breed: {
        type: mongoose_1.Schema.Types.String,
        enum: Object.keys(cow_interface_1.Breed),
        required: true,
    },
    weight: { type: mongoose_1.Schema.Types.Number, required: true },
    label: {
        type: mongoose_1.Schema.Types.String,
        // enum: Object.keys(Label),
        default: cow_interface_1.Label.ForSale,
    },
    category: {
        type: mongoose_1.Schema.Types.String,
        enum: Object.keys(cow_interface_1.Category),
        required: true,
    },
    seller: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
});
// Create and export the Cow model
const CowModel = (0, mongoose_1.model)("Cow", CowSchema);
exports.default = CowModel;
