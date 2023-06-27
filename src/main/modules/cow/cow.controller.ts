import { Request, Response } from "express";
import { CowService } from "./cow.service";
import pick from "../../../utility/pick";
import { paginationFields } from "../../../constants/pagination";
import { cowFilterableFields, priceFilter } from "./cow.constant";
import catchAsync from "../../../utility/catchAsync";

const createCow = catchAsync(async (req: Request, res: Response) => {
  const newCow = await CowService.createCow(req.body);

  res.status(201).json({
    success: true,
    message: "Cow created successfully",
    data: newCow,
    statusCode: 201,
  });
});

const getAllCows = catchAsync(async (req: Request, res: Response) => {
  const paginationOptions = pick(req.query, paginationFields);

  const filters = pick(req.query, cowFilterableFields);

  const priceRange = pick(req.query, priceFilter);

  const cows = await CowService.getAllCows(
    filters,
    paginationOptions,
    priceRange
  );

  res.status(200).json({
    success: true,
    message: "Cows fetched successfully",
    data: cows,
    statusCode: 200,
  });
});

const getSingleCow = catchAsync(async (req: Request, res: Response) => {
  const cow = await CowService.getSingleCow(req.params.id);

  res.status(200).json({
    success: true,
    message: "Cow fetched successfully",
    data: cow,
    statusCode: 200,
  });
});

const updateCow = catchAsync(async (req: Request, res: Response) => {
  const seller = req.user;

  const updatedCow = await CowService.updateCow(
    req.params.id,
    seller?.id,
    req.body
  );

  res.status(200).json({
    success: true,
    message: "Cow updated successfully",
    data: updatedCow,
    statusCode: 200,
  });
});

const deleteCow = catchAsync(async (req: Request, res: Response) => {
  const seller = req.user;
  await CowService.deleteCow(req.params.id, seller?.id);

  res.status(200).json({
    success: true,
    message: "Cow deleted successfully",
    statusCode: 200,
  });
});

export const CowController = {
  createCow,
  getAllCows,
  getSingleCow,
  updateCow,
  deleteCow,
};
