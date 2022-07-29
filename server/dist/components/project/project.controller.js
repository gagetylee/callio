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
exports.ProjectController = void 0;
const typedi_1 = require("typedi");
const project_service_1 = require("./project.service");
let ProjectController = class ProjectController {
    constructor(projectService) {
        this.projectService = projectService;
        this.getAll = this.getAll.bind(this);
        this.create = this.create.bind(this);
    }
    async getAll(req, res, next) {
        try {
            const projects = await this.projectService.getAll();
            res.status(200).json({
                success: true,
                message: 'Projects found',
                data: projects
            });
        }
        catch (error) {
            next(error);
        }
    }
    async create(req, res, next) {
        try {
            const projectData = req.body;
            const profile = req.user.profile;
            const project = await this.projectService.create(profile, projectData);
            return res.status(200).json({
                success: true,
                message: 'Project successfully created',
                data: project
            });
        }
        catch (error) {
            next(error);
        }
    }
};
ProjectController = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [project_service_1.ProjectService])
], ProjectController);
exports.ProjectController = ProjectController;
//# sourceMappingURL=project.controller.js.map