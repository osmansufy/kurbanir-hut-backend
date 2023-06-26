import { IGenericErrorMsg } from "./error";

export interface IGenericResponse<T> {
  meta: {
    page: number;
    limit: number;
    total: number;
  };
  data: T;
}

export type IGenericErrorResponse = {
  statusCode: number;
  message: string;
  errorMessages: IGenericErrorMsg[];
};

export type TypePriceFilter = {
  minPrice?: number;
  maxPrice?: number;
};

export enum Enum_Role {
  admin = "admin",
  seller = "seller",
  buyer = "buyer",
}

export interface ILoginServerResponse {
  accessToken: string;
  refreshToken?: string;
}
export interface ILoginRequest {
  phoneNumber: string;
  password: string;
}
