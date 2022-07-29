"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectService = void 0;
const logger_1 = require("@/config/logger");
const HttpException_1 = require("@/exceptions/HttpException");
const mikro_orm_config_1 = require("@/mikro-orm.config");
const typedi_1 = require("typedi");
const project_entity_1 = require("./project.entity");
let ProjectService = class ProjectService {
    constructor() {
        this.projectRepository = mikro_orm_config_1.DI.projectRepository;
    }
    async getAll() {
        const projects = await this.projectRepository.findAll();
        if (projects.length === 0) {
            throw new HttpException_1.HttpException(404, 'No projects found');
        }
        return projects;
    }
    async create(profile, projectData) {
        const projectExists = await this.projectRepository.findOne({ name: projectData.name });
        if (projectExists) {
            throw new HttpException_1.HttpException(409, `Project name ${projectData.name}, already exists`);
        }
        const project = new project_entity_1.Project(profile, projectData);
        if (!project) {
            throw new HttpException_1.HttpException(400, 'Error creating project');
        }
        this.projectRepository.persistAndFlush(project);
        return project;
    }
    async inviteUser(projectId, profile, invitee) {
        const project = await this.projectRepository.findOne({ id: projectId });
        if (project.userProfiles.contains(profile)) {
            logger_1.logger.info('YEEEEEEEEEE');
        }
        return null;
    }
};
ProjectService = __decorate([
    (0, typedi_1.Service)()
], ProjectService);
exports.ProjectService = ProjectService;
//# sourceMappingURL=project.service.js.map