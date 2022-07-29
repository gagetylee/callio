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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const HttpException_1 = require("@/exceptions/HttpException");
const mikro_orm_config_1 = require("@/mikro-orm.config");
const bcrypt_1 = require("bcrypt");
const typedi_1 = require("typedi");
let AuthService = class AuthService {
    constructor() {
    }
    async login(loginData) {
        const user = await mikro_orm_config_1.DI.userRepository.findOne({ email: loginData.email });
        if (!user || !(await (0, bcrypt_1.compare)(loginData.password, user.password))) {
            throw new HttpException_1.HttpException(401, 'Invalid credentials');
        }
        return user;
    }
};
AuthService = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map