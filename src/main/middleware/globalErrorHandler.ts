import { ZodError } from "zod";
import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import config from "../../config";
import { IGenericErrorMsg } from "../../interfaces/error";
import handleCastError from "../../errors/handleCastError";
import handleValidationError from "../../errors/handleValidationError";
import handleZodError from "../../errors/handleZodError";
import { Error } from "mongoose";
import ApiError from "../../errors/ApiError";

const globalErrorHandler: ErrorRequestHandler = (
  error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  config.env === "development"
    ? console.log(`🐱‍🏍 globalErrorHandler ~~`, { error })
    : console.error(`🐱‍🏍 globalErrorHandler ~~`, error);

  let statusCode = 500;
  let message = "Something went wrong !";
  let errorMessages: IGenericErrorMsg[] = [];

  if (error.name === "CastError") {
    const properError = handleCastError(error);
    statusCode = properError.statusCode;
    errorMessages = properError.errorMessages;
    message = properError.message;
  } else if (error.name === "ValidationError") {
    const properError = handleValidationError(error);
    statusCode = properError.statusCode;
    errorMessages = properError.errorMessages;
    message = properError.message;
  } else if (error instanceof ZodError) {
    const properError = handleZodError(error);
    statusCode = properError.statusCode;
    errorMessages = properError.errorMessages;
    message = properError.message;
  } else if (error instanceof ApiError) {
    console.log(`🐱‍🏍 globalErrorHandler ~~`, { error });
    statusCode = error.statusCode;
    message = error.message;
    errorMessages = error?.message
      ? [
          {
            path: "",
            message: error?.message,
          },
        ]
      : [];
  } else if (error instanceof Error) {
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
    stack: config.env === "development" ? error.stack : undefined,
  });
};

export default globalErrorHandler;
