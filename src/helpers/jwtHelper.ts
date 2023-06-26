import Jwt, { Secret } from "jsonwebtoken";

const createToken = (
  payload: Record<string, unknown>,
  secret: Secret,
  expireTime: string
): string => {
  return Jwt.sign(payload, secret, { expiresIn: expireTime });
};

const verifyToken = (
  token: string,
  secret: Secret
): Record<string, unknown> => {
  return Jwt.verify(token, secret) as Record<string, unknown>;
};

export const JwtHelper = {
  createToken,
  verifyToken,
};
