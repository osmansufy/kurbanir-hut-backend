import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { Cow, ICowFilter } from "./cow.interface";
import CowModel from "./cow.model";
import { paginationHelpers } from "../../../helpers/pagination";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { cowSearchableFields } from "./cow.constant";
import { IGenericResponse, TypePriceFilter } from "../../../interfaces/common";

const createCow = async (cow: Cow): Promise<Cow | null> => {
  // check if cow already exists with the same name and seller id
  const isExist = await CowModel.findOne({
    name: cow.name,
    seller: cow.seller,
  });
  if (isExist) {
    throw new ApiError(
      httpStatus.CONFLICT,
      "Cow already exists with the same name and seller id"
    );
  }
  const newCow = await CowModel.create(cow);
  return newCow;
};

const getAllCows = async (
  filters: ICowFilter,
  paginationOptions: IPaginationOptions,
  priceRange: TypePriceFilter
): Promise<IGenericResponse<Cow[] | null>> => {
  const andOptions = [];

  if (priceRange.minPrice && priceRange.maxPrice) {
    andOptions.push({
      price: {
        $gte: priceRange.minPrice,
        $lte: priceRange.maxPrice,
      },
    });
  }

  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const { searchTerm, ...filtersData } = filters;

  if (searchTerm) {
    andOptions.push({
      $or: cowSearchableFields.map((field) => ({
        [field]: {
          $regex: searchTerm,
          $options: "i",
        },
      })),
    });
  }

  if (Object.keys(filtersData).length) {
    andOptions.push({
      $and: Object.entries(filtersData).map(([key, value]) => ({
        [key]: value,
      })),
    });
  }

  const whereCondition = andOptions.length
    ? {
        $and: andOptions,
      }
    : {};
  const cows = await CowModel.find(whereCondition)

    .sort({ [sortBy]: sortOrder })
    .skip(skip)
    .limit(limit)
    .populate("seller", "name email")
    .lean();

  const total = await CowModel.countDocuments(whereCondition);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: cows,
  };
};

const getSingleCow = async (id: string): Promise<Cow | null> => {
  const cow = await CowModel.findById(id).populate("seller");

  return cow;
};

const updateCow = async (
  id: string,
  sellerId: string,
  cow: Cow
): Promise<Cow | null> => {
  const isExist = await CowModel.findOne({ _id: id, seller: sellerId });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "Cow not found");
  }

  const updatedCow = await CowModel.findByIdAndUpdate(id, cow, {
    new: true,
  });
  return updatedCow;
};

const deleteCow = async (id: string, sellerId: string): Promise<Cow | null> => {
  const isExist = await CowModel.findOne({ _id: id, seller: sellerId });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "Cow not found");
  }

  const deletedCow = await CowModel.findByIdAndDelete(id);
  return deletedCow;
};

export const CowService = {
  createCow,
  getAllCows,
  getSingleCow,
  updateCow,
  deleteCow,
};
