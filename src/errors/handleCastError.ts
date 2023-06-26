import mongoose from "mongoose";
import { IGenericErrorMsg } from "../interfaces/error";

const handleCastError = (error: mongoose.Error.CastError) => {
  const errMessage: IGenericErrorMsg[] = [
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

export default handleCastError;
