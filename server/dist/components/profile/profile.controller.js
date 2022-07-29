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
exports.ProfileController = void 0;
const typedi_1 = require("typedi");
const profile_service_1 = require("./profile.service");
let ProfileController = class ProfileController {
    constructor(profileService) {
        this.profileService = profileService;
        this.findOne = this.findOne.bind(this);
        this.search = this.search.bind(this);
        this.update = this.update.bind(this);
    }
    async findOne(req, res, next) {
        try {
            const profile = await this.profileService.findOne(req.params.username);
            return res.status(200).json({
                success: true,
                message: "User found",
                data: profile
            });
        }
        catch (error) {
            next(error);
        }
    }
    async search(req, res, next) {
        try {
            const searchData = req.body;
            const searchQuery = req.query.search;
            const profiles = await this.profileService.search(Object.assign(Object.assign({}, searchData), { search: searchQuery }));
            return res.status(200).json({
                success: true,
                message: 'Profiles found',
                data: profiles
            });
        }
        catch (error) {
            next(error);
        }
    }
    async update(req, res, next) {
        try {
            const updateData = req.body;
            const updatedProfile = await this.profileService.update(req.user.id, updateData);
            return res.status(200).json({
                success: true,
                message: 'Profile successfully updated',
                data: updatedProfile
            });
        }
        catch (error) {
            next(error);
        }
    }
};
ProfileController = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [profile_service_1.ProfileService])
], ProfileController);
exports.ProfileController = ProfileController;
//# sourceMappingURL=profile.controller.js.map