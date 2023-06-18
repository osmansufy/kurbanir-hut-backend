"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const config_1 = __importDefault(require("../../config"));
const handleCastError_1 = __importDefault(require("../../errors/handleCastError"));
const handleValidationError_1 = __importDefault(require("../../errors/handleValidationError"));
const handleZodError_1 = __importDefault(require("../../errors/handleZodError"));
const mongoose_1 = require("mongoose");
const ApiError_1 = __importDefault(require("../../errors/ApiError"));
const globalErrorHandler = (error, req, res, next) => {
    config_1.default.env === "development"
        ? console.log(`🐱‍🏍 globalErrorHandler ~~`, { error })
        : console.error(`🐱‍🏍 globalErrorHandler ~~`, error);
    let statusCode = 500;
    let message = "Something went wrong !";
    let errorMessages = [];
    if (error.name === "CastError") {
        const properError = (0, handleCastError_1.default)(error);
        statusCode = properError.statusCode;
        errorMessages = properError.errorMessages;
        message = properError.message;
    }
    else if (error.name === "ValidationError") {
        const properError = (0, handleValidationError_1.default)(error);
        statusCode = properError.statusCode;
        errorMessages = properError.errorMessages;
        message = properError.message;
    }
    else if (error instanceof zod_1.ZodError) {
        const properError = (0, handleZodError_1.default)(error);
        statusCode = properError.statusCode;
        errorMessages = properError.errorMessages;
        message = properError.message;
    }
    else if (error instanceof ApiError_1.default) {
        console.log(`🐱‍🏍 globalErrorHandler ~~`, { error });
        statusCode = error.statusCode;
        message = error.message;
        errorMessages = (error === null || error === void 0 ? void 0 : error.message)
            ? [
                {
                    path: "",
                    message: error === null || error === void 0 ? void 0 : error.message,
                },
            ]
            : [];
    }
    else if (error instanceof mongoose_1.Error) {
        errorMessages = [
            {
                path: "",
                message: error.message,
            },
        ];
    }
    res.status(statusCode).json({
        success: false,
        message,
        errorMessages,
        stack: config_1.default.env === "development" ? error.stack : undefined,
    });
};
exports.default = globalErrorHandler;
