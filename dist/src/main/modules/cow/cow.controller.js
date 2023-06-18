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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CowController = void 0;
const cow_service_1 = require("./cow.service");
const pick_1 = __importDefault(require("../../../utility/pick"));
const pagination_1 = require("../../../constants/pagination");
const cow_constant_1 = require("./cow.constant");
const catchAsync_1 = __importDefault(require("../../../utility/catchAsync"));
const createCow = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newCow = yield cow_service_1.CowService.createCow(req.body);
    res.status(201).json({
        success: true,
        message: "Cow created successfully",
        data: newCow,
        statusCode: 201,
    });
}));
const getAllCows = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const paginationOptions = (0, pick_1.default)(req.query, pagination_1.paginationFields);
    const filters = (0, pick_1.default)(req.query, cow_constant_1.cowFilterableFields);
    const priceRange = (0, pick_1.default)(req.query, cow_constant_1.priceFilter);
    const cows = yield cow_service_1.CowService.getAllCows(filters, paginationOptions, priceRange);
    res.status(200).json({
        success: true,
        message: "Cows fetched successfully",
        data: cows,
        statusCode: 200,
    });
}));
const getSingleCow = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cow = yield cow_service_1.CowService.getSingleCow(req.params.id);
    res.status(200).json({
        success: true,
        message: "Cow fetched successfully",
        data: cow,
        statusCode: 200,
    });
}));
const updateCow = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedCow = yield cow_service_1.CowService.updateCow(req.params.id, req.body);
    res.status(200).json({
        success: true,
        message: "Cow updated successfully",
        data: updatedCow,
        statusCode: 200,
    });
}));
const deleteCow = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield cow_service_1.CowService.deleteCow(req.params.id);
    res.status(200).json({
        success: true,
        message: "Cow deleted successfully",
        statusCode: 200,
    });
}));
exports.CowController = {
    createCow,
    getAllCows,
    getSingleCow,
    updateCow,
    deleteCow,
};
