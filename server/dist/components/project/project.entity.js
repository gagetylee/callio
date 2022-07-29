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
exports.Project = void 0;
const core_1 = require("@mikro-orm/core");
const profile_entity_1 = require("../profile/profile.entity");
const projectCreate_dto_1 = require("./dto/projectCreate.dto");
let Project = class Project {
    constructor(creator, { name, description, minUsers, maxUsers }) {
        this.userProfiles = new core_1.Collection(this);
        this.userProfiles.add(creator);
        this.name = name;
        this.description = description;
        this.minimumUsers = minUsers || 1;
        this.maximumUsers = maxUsers || 2;
    }
};
__decorate([
    (0, core_1.PrimaryKey)(),
    __metadata("design:type", Number)
], Project.prototype, "id", void 0);
__decorate([
    (0, core_1.ManyToMany)(() => profile_entity_1.Profile, profile => profile.projects),
    __metadata("design:type", Object)
], Project.prototype, "userProfiles", void 0);
__decorate([
    (0, core_1.Property)({ unique: true }),
    __metadata("design:type", String)
], Project.prototype, "name", void 0);
__decorate([
    (0, core_1.Property)(),
    __metadata("design:type", String)
], Project.prototype, "description", void 0);
__decorate([
    (0, core_1.Property)({ name: 'minimum_users' }),
    __metadata("design:type", Number)
], Project.prototype, "minimumUsers", void 0);
__decorate([
    (0, core_1.Property)({ name: 'maximum_users' }),
    __metadata("design:type", Number)
], Project.prototype, "maximumUsers", void 0);
Project = __decorate([
    (0, core_1.Entity)(),
    __metadata("design:paramtypes", [profile_entity_1.Profile, projectCreate_dto_1.ProjectCreateDto])
], Project);
exports.Project = Project;
//# sourceMappingURL=project.entity.js.map