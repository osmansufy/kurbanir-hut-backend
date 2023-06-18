"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleValidationError = (error) => {
    const errorMessages = Object.values(error.errors).map((err) => {
        return {
            path: err === null || err === void 0 ? void 0 : err.path,
            message: err.message,
        };
    });
    const statusCode = 400;
    return {
        statusCode,
        message: "Validation Error",
        errorMessages,
    };
};
exports.default = handleValidationError;
