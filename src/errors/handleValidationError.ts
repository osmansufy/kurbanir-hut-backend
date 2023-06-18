import mongoose from "mongoose";
import { IGenericErrorResponse } from "../interfaces/common";
import { IGenericErrorMsg } from "../interfaces/error";

const handleValidationError = (
  error: mongoose.Error.ValidationError
): IGenericErrorResponse => {
  const errorMessages: IGenericErrorMsg[] = Object.values(error.errors).map(
    (err: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: err?.path,
        message: err.message,
      };
    }
  );

  const statusCode = 400;

  return {
    statusCode,
    message: "Validation Error",
    errorMessages,
  };
};

export default handleValidationError;
