"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const express_1 = require("express");
const typedi_1 = require("typedi");
const auth_controller_1 = require("./auth.controller");
class AuthRoutes {
    constructor() {
        this.authController = typedi_1.Container.get(auth_controller_1.AuthController);
        this.router = (0, express_1.Router)();
        this.initRoutes();
    }
    initRoutes() {
        this.router.get('/login', this.authController.login);
    }
}
exports.AuthRoutes = AuthRoutes;
//# sourceMappingURL=auth.routes.js.map