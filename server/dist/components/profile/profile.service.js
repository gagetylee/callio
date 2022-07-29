"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileService = void 0;
const HttpException_1 = require("@/exceptions/HttpException");
const mikro_orm_config_1 = require("@/mikro-orm.config");
const core_1 = require("@mikro-orm/core");
const typedi_1 = require("typedi");
let ProfileService = class ProfileService {
    constructor() {
        this.profileRepository = mikro_orm_config_1.DI.profileRepository;
    }
    async findOne(username) {
        const profile = await this.profileRepository.findOne({ user: { username } });
        if (!profile)
            throw new HttpException_1.HttpException(404, 'Profile not found');
        return profile;
    }
    async search(params) {
        params.search = params.search.toLowerCase();
        const profiles = await this.profileRepository.search(params);
        if (profiles.length === 0) {
            throw new HttpException_1.HttpException(404, 'No matching profiles found');
        }
        return profiles;
    }
    async update(userId, params) {
        const profile = await this.profileRepository.findOne({ id: userId });
        if (!profile) {
            throw new HttpException_1.HttpException(404, 'Profile not found');
        }
        for (let key in params) {
            if (typeof params[key] === 'string' && params[key].length === 0) {
                params[key] = null;
            }
        }
        const updatedProfile = (0, core_1.wrap)(profile).assign(params);
        this.profileRepository.flush();
        return updatedProfile;
    }
};
ProfileService = __decorate([
    (0, typedi_1.Service)()
], ProfileService);
exports.ProfileService = ProfileService;
//# sourceMappingURL=profile.service.js.map