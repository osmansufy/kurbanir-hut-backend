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
exports.UserController = void 0;
const catchAsync_1 = __importDefault(require("../../../utility/catchAsync"));
const user_service_1 = require("./user.service");
const createUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newUser = yield user_service_1.UserService.createUser(req.body);
    res.status(201).json({
        success: true,
        message: "User created successfully",
        data: newUser,
        statusCode: 201,
    });
}));
const getSingleUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_service_1.UserService.getSingleUser(req.params.id);
    res.status(200).json({
        success: true,
        message: "User fetched successfully",
        data: user,
        statusCode: 200,
    });
}));
const getAllUsers = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_service_1.UserService.getAllUsers();
    res.status(200).json({
        success: true,
        message: "Users fetched successfully",
        data: users,
        statusCode: 200,
    });
}));
const updateUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedUser = yield user_service_1.UserService.updateUser(req.params.id, req.body);
    res.status(200).json({
        success: true,
        message: "User updated successfully",
        data: updatedUser,
        statusCode: 200,
    });
}));
const deleteUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const deletedUser = yield user_service_1.UserService.deleteUser(req.params.id);
    res.status(200).json({
        success: true,
        message: "User deleted successfully",
        data: deletedUser,
        statusCode: 200,
    });
}));
exports.UserController = {
    createUser,
    getSingleUser,
    getAllUsers,
    updateUser,
    deleteUser,
};
