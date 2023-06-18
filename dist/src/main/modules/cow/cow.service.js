"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CowService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const cow_model_1 = __importDefault(require("./cow.model"));
const pagination_1 = require("../../../helper/pagination");
const cow_constant_1 = require("./cow.constant");
const createCow = (cow) => __awaiter(void 0, void 0, void 0, function* () {
    // check if cow already exists with the same name and seller id
    const isExist = yield cow_model_1.default.findOne({
        name: cow.name,
        seller: cow.seller,
    });
    if (isExist) {
        throw new ApiError_1.default(http_status_1.default.CONFLICT, "Cow already exists with the same name and seller id");
    }
    const newCow = yield cow_model_1.default.create(cow);
    return newCow;
});
const getAllCows = (filters, paginationOptions, priceRange) => __awaiter(void 0, void 0, void 0, function* () {
    const andOptions = [];
    if (priceRange.minPrice && priceRange.maxPrice) {
        andOptions.push({
            price: {
                $gte: priceRange.minPrice,
                $lte: priceRange.maxPrice,
            },
        });
    }
    const { page, limit, skip, sortBy, sortOrder } = pagination_1.paginationHelpers.calculatePagination(paginationOptions);
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    if (searchTerm) {
        andOptions.push({
            $or: cow_constant_1.cowSearchableFields.map((field) => ({
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
    const cows = yield cow_model_1.default.find(whereCondition)
        .sort({ [sortBy]: sortOrder })
        .skip(skip)
        .limit(limit)
        .populate("seller", "name email")
        .lean();
    const total = yield cow_model_1.default.countDocuments(whereCondition);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: cows,
    };
});
const getSingleCow = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const cow = yield cow_model_1.default.findById(id).populate("seller");
    return cow;
});
const updateCow = (id, cow) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedCow = yield cow_model_1.default.findByIdAndUpdate(id, cow, {
        new: true,
    });
    return updatedCow;
});
const deleteCow = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const deletedCow = yield cow_model_1.default.findByIdAndDelete(id);
    return deletedCow;
});
exports.CowService = {
    createCow,
    getAllCows,
    getSingleCow,
    updateCow,
    deleteCow,
};
