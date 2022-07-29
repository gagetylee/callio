"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const validation_middleware_1 = __importDefault(require("../../middleware/validation.middleware"));
const express_1 = require("express");
const typedi_1 = require("typedi");
const createUser_dto_1 = require("./dto/createUser.dto");
const user_controller_1 = require("./user.controller");
const editUser_dto_1 = require("./dto/editUser.dto");
const authorization_middleware_1 = __importDefault(require("@/middleware/authorization.middleware"));
class UserRoutes {
    constructor() {
        this.userController = typedi_1.Container.get(user_controller_1.UserController);
        this.router = (0, express_1.Router)();
        this.initRoutes();
    }
    initRoutes() {
        this.router.get('/', this.userController.getAll);
        this.router.get('/:id', this.userController.findOne);
        this.router.post('/', (0, validation_middleware_1.default)(createUser_dto_1.CreateUserDto, 'body'), this.userController.register);
        this.router.put('/:id', authorization_middleware_1.default, (0, validation_middleware_1.default)(editUser_dto_1.EditUserDto, 'body'), this.userController.update);
    }
}
exports.UserRoutes = UserRoutes;
//# sourceMappingURL=user.routes.js.map