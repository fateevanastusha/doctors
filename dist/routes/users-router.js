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
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRouter = void 0;
const express_1 = require("express");
const users_service_1 = require("../domain/users-service");
const input_valudation_middleware_1 = require("../middlewares/input-valudation-middleware");
const blogs_router_1 = require("./blogs-router");
const pagination_helpers_1 = require("../helpers/pagination-helpers");
exports.usersRouter = (0, express_1.Router)();
//GET ALL USERS WITH AUTH
exports.usersRouter.get('/', blogs_router_1.adminAuth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let pageSize = pagination_helpers_1.paginationHelpers.pageSize(req.query.pageSize);
    let pageNumber = pagination_helpers_1.paginationHelpers.pageNumber(req.query.pageNumber);
    let sortBy = pagination_helpers_1.paginationHelpers.sortBy(req.query.sortBy);
    let sortDirection = pagination_helpers_1.paginationHelpers.sortDirection(req.query.sortDirection);
    let searchLoginTerm = pagination_helpers_1.paginationHelpers.searchLoginTerm(req.query.searchLoginTerm);
    let searchEmailTerm = pagination_helpers_1.paginationHelpers.searchEmailTerm(req.query.searchEmailTerm);
    const allUsers = yield users_service_1.usersService.getAllUsers(pageSize, pageNumber, sortBy, sortDirection, searchLoginTerm, searchEmailTerm);
    res.status(200).send(allUsers);
}));
//POST USER WITH AUTH
exports.usersRouter.post('/', blogs_router_1.adminAuth, input_valudation_middleware_1.loginCheck, input_valudation_middleware_1.passwordCheck, input_valudation_middleware_1.emailCheck, input_valudation_middleware_1.inputValidationMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newUser = yield users_service_1.usersService.createNewUser(req.body);
    if (!newUser) {
        res.sendStatus(404);
    }
    else {
        res.status(201).send(newUser);
    }
}));
//DELETE USER BY ID WITH AUTH
exports.usersRouter.delete('/:id', blogs_router_1.adminAuth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const status = yield users_service_1.usersService.deleteUserById(req.params.id);
    if (status) {
        res.sendStatus(204);
    }
    else {
        res.sendStatus(404);
    }
}));
