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
exports.AuthController = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("@/config");
const auth_service_1 = require("./auth.service");
const typedi_1 = require("typedi");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
        this.login = this.login.bind(this);
    }
    async login(req, res, next) {
        try {
            const loginData = req.body;
            const user = await this.authService.login(loginData);
            const token = this.generateToken(user.id);
            return res.status(200).json({
                success: true,
                message: "Login successfull",
                data: { user, token }
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
AuthController = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map