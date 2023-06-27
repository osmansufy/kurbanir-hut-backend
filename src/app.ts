import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import httpStatus from "http-status";
import globalErrorHandler from "./main/middleware/globalErrorHandler";
import ApiError from "./errors/ApiError";
import routes from "./main/routes";
import cookieParser from "cookie-parser";
const app: Application = express();

app.use(cors());

// parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

// routes

app.use("/api/v1", routes);

//Testing
// app.get("/error", (next: NextFunction) => {
//   throw new ApiError(
//     httpStatus.CONFLICT,
//     "Academic semester is already exist !"
//   );
// });
// global error handler

app.use(globalErrorHandler);

// handle not found

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    statusCode: httpStatus.NOT_FOUND,
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

export default app;
