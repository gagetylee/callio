"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const typedi_1 = require("typedi");
const user_service_1 = require("./user.service");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("@/config");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
        this.getAll = this.getAll.bind(this);
        this.findOne = this.findOne.bind(this);
        this.register = this.register.bind(this);
        this.login = this.login.bind(this);
        this.update = this.update.bind(this);
    }
    async getAll(req, res, next) {
        try {
            const users = await this.userService.getAll();
            return res.status(200).json({
                success: true,
                message: "Users found",
                data: { users }
            });
        }
        catch (error) {
            next(error);
        }
    }
    async findOne(req, res, next) {
        try {
            const user = await this.userService.findOne(parseInt(req.params.id));
            return res.status(200).json({
                success: true,
                message: "User found",
                data: { user }
            });
        }
        catch (error) {
            next(error);
        }
    }
    async register(req, res, next) {
        try {
            const userData = req.body;
            const user = await this.userService.create(userData);
            const token = this.generateToken(user.id);
            return res.status(200).json({
                success: true,
                message: "User registered successfully",
                data: { user, token }
            });
        }
        catch (error) {
            next(error);
        }
    }
    async login(req, res, next) {
        try {
            const userData = req.body;
            const user = await this.userService.login(userData);
            console.log(user.id);
            const token = this.generateToken(user.id);
            return res.status(200).json({
                success: true,
                message: "User logged in successfully",
                data: { user, token }
            });
        }
        catch (error) {
            next(error);
        }
    }
    async update(req, res, next) {
        try {
            const userId = parseInt(req.params.id);
            const updateData = {};
            for (let key in req.body) {
                updateData[key] = req.body[key];
            }
            const user = await this.userService.update(userId, updateData);
            return res.status(200).json({
                success: true,
                message: "User successfully updated",
                data: { user }
            });
        }
        catch (error) {
            next(error);
        }
    }
    generateToken(id) {
        const dataStoredInToken = { id };
        const expiresIn = 60 * 60;
        return jsonwebtoken_1.default.sign(dataStoredInToken, config_1.JWT_SECRET, { expiresIn });
    }
};
UserController = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map