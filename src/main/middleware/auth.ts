import { NextFunction, Response, Request } from "express";
import ApiError from "../../errors/ApiError";
import httpStatus from "http-status";
import { JwtHelper } from "../../helpers/jwtHelper";
import config from "../../config";
import { Secret } from "jsonwebtoken";

const auth =
  (...requiredRoles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization;

      if (!token) {
        throw new ApiError(httpStatus.UNAUTHORIZED, "Access token not found");
      }
      let verifiedUser = null;
      verifiedUser = JwtHelper.verifyToken(token, config.jwt.secret as Secret);

      // set user in request object
      req.user = verifiedUser;

      // check if user has required role

      if (requiredRoles.length && !requiredRoles.includes(verifiedUser.role)) {
        throw new ApiError(httpStatus.UNAUTHORIZED, "Access denied");
      }

      next();
    } catch (error) {
      next(error);
    }
  };

export default auth;
