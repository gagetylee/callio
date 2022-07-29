"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileRoutes = void 0;
const express_1 = require("express");
const typedi_1 = __importDefault(require("typedi"));
const profile_controller_1 = require("./profile.controller");
const validation_middleware_1 = __importDefault(require("@/middleware/validation.middleware"));
const profileSearch_dto_1 = require("./dto/profileSearch.dto");
const authorization_middleware_1 = __importDefault(require("@/middleware/authorization.middleware"));
const profileCreate_dto_1 = require("./dto/profileCreate.dto");
class ProfileRoutes {
    constructor() {
        this.profileController = typedi_1.default.get(profile_controller_1.ProfileController);
        this.router = (0, express_1.Router)();
        this.initRoutes();
    }
    initRoutes() {
        this.router.get('/:username', this.profileController.findOne);
        this.router.get('/:query?', (0, validation_middleware_1.default)(profileSearch_dto_1.ProfileSearchDto, 'body'), this.profileController.search);
        this.router.put('/', authorization_middleware_1.default, (0, validation_middleware_1.default)(profileCreate_dto_1.ProfileCreateDto, 'body'), this.profileController.update);
    }
}
exports.ProfileRoutes = ProfileRoutes;
//# sourceMappingURL=profile.routes.js.map