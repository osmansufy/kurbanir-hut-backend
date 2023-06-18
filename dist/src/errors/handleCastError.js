"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleCastError = (error) => {
    const errMessage = [
        {
            path: error.path,
            message: `${error.value} is not a valid ${error.kind}`,
        },
    ];
    const statusCode = 400;
    return {
        statusCode,
        message: "Cast Error",
        errorMessages: errMessage,
    };
};
exports.default = handleCastError;
