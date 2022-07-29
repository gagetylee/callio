"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectRoutes = void 0;
const express_1 = require("express");
const typedi_1 = __importDefault(require("typedi"));
const project_controller_1 = require("./project.controller");
const authorization_middleware_1 = __importDefault(require("@/middleware/authorization.middleware"));
const validation_middleware_1 = __importDefault(require("@/middleware/validation.middleware"));
const projectCreate_dto_1 = require("./dto/projectCreate.dto");
class ProjectRoutes {
    constructor() {
        this.projectController = typedi_1.default.get(project_controller_1.ProjectController);
        this.router = (0, express_1.Router)();
        this.initRoutes();
    }
    initRoutes() {
        this.router.get('/', this.projectController.getAll);
        this.router.post('/', authorization_middleware_1.default, (0, validation_middleware_1.default)(projectCreate_dto_1.ProjectCreateDto, 'body'), this.projectController.create);
    }
}
exports.ProjectRoutes = ProjectRoutes;
//# sourceMappingURL=project.routes.js.map