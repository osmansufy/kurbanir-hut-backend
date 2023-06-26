import { Response } from "express";
interface IApiResponse<T> {
  statusCode: number;
  success: boolean;
  message?: string | null;
  meta?: {
    total: number;
    page: number;
    limit: number;
  };
  data: T | null;
}

const sendResponse = <T>(res: Response, apiResponse: IApiResponse<T>) => {
  const responseData: IApiResponse<T> = {
    statusCode: apiResponse.statusCode,
    success: apiResponse.success,
    message: apiResponse.message || null,
    data: apiResponse.data || null,
    meta: apiResponse.meta || null || undefined,
  };

  return res.status(apiResponse.statusCode).json(responseData);
};

export default sendResponse;
