"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    phoneNumber: { type: mongoose_1.Schema.Types.String, required: true, unique: true },
    role: {
        type: mongoose_1.Schema.Types.String,
        enum: ["seller", "buyer"],
        required: true,
    },
    password: { type: mongoose_1.Schema.Types.String, required: true },
    name: {
        firstName: { type: mongoose_1.Schema.Types.String, required: true },
        lastName: { type: mongoose_1.Schema.Types.String, required: true },
    },
    address: { type: mongoose_1.Schema.Types.String, required: true },
    budget: { type: mongoose_1.Schema.Types.Number, required: true },
    income: { type: mongoose_1.Schema.Types.Number, required: true },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
// Create and export the User model
const UserModel = (0, mongoose_1.model)("User", UserSchema);
exports.default = UserModel;
