"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const http_status_1 = __importDefault(require("http-status"));
const globalErrorHandler_1 = __importDefault(require("./main/middleware/globalErrorHandler"));
const routes_1 = __importDefault(require("./main/routes"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
// parser
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// routes
app.use("/api/v1", routes_1.default);
//Testing
// app.get("/error", (next: NextFunction) => {
//   throw new ApiError(
//     httpStatus.CONFLICT,
//     "Academic semester is already exist !"
//   );
// });
// global error handler
app.use(globalErrorHandler_1.default);
// handle not found
app.use((req, res, next) => {
    res.status(http_status_1.default.NOT_FOUND).json({
        statusCode: http_status_1.default.NOT_FOUND,
        success: false,
        message: "Not Found",
        errorMessages: [
            {
                path: req.originalUrl,
                message: "Not Found",
            },
        ],
    });
    next();
});
exports.default = app;
