"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const typedi_1 = require("typedi");
const HttpException_1 = require("@/exceptions/HttpException");
const mikro_orm_config_1 = require("@/mikro-orm.config");
const core_1 = require("@mikro-orm/core");
const bcrypt_1 = __importDefault(require("bcrypt"));
let UserService = class UserService {
    constructor() {
        this.userRepository = mikro_orm_config_1.DI.userRepository;
    }
    async getAll() {
        const users = await this.userRepository.findAll();
        if (users.length === 0) {
            throw new HttpException_1.HttpException(404, 'No users found');
        }
        return users;
    }
    async findOne(id) {
        const user = await mikro_orm_config_1.DI.userRepository.findOne({ id });
        if (!user)
            throw new HttpException_1.HttpException(404, 'User not found');
        return user;
    }
    async create(credentials) {
        const emailExists = await this.userRepository.findOne({ email: credentials.email });
        if (emailExists)
            throw new HttpException_1.HttpException(409, 'Email is already in use');
        const salt = await bcrypt_1.default.genSalt(10);
        const hashedPassword = await bcrypt_1.default.hash(credentials.password, salt);
        const createUserData = this.userRepository.create(Object.assign(Object.assign({}, credentials), { password: hashedPassword }));
        await mikro_orm_config_1.DI.em.persistAndFlush(createUserData);
        return createUserData;
    }
    async login(credentials) {
        const user = await mikro_orm_config_1.DI.userRepository.findOne({ email: credentials.email });
        console.log(user);
        if (!user || !(await bcrypt_1.default.compare(credentials.password, user.password))) {
            throw new HttpException_1.HttpException(401, 'Invalid credentials');
        }
        return user;
    }
    async update(id, credentials) {
        const user = await this.userRepository.findOne({ id });
        if (!user)
            throw new HttpException_1.HttpException(404, 'User not found');
        const updatedUser = (0, core_1.wrap)(user).assign(credentials);
        this.userRepository.flush();
        return updatedUser;
    }
};
UserService = __decorate([
    (0, typedi_1.Service)()
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map