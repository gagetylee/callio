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
exports.Profile = void 0;
const core_1 = require("@mikro-orm/core");
const user_entity_1 = require("../user/user.entity");
const profileCreate_dto_1 = require("./dto/profileCreate.dto");
const profile_repository_1 = require("./profile.repository");
let Profile = class Profile {
    constructor({ firstName, lastName }) {
        this.projects = new core_1.Collection(this);
        this.firstName = firstName;
        this.lastName = lastName;
    }
};
__decorate([
    (0, core_1.PrimaryKey)(),
    __metadata("design:type", Number)
], Profile.prototype, "id", void 0);
__decorate([
    (0, core_1.OneToOne)({ type: 'User', mappedBy: 'profile' }),
    __metadata("design:type", user_entity_1.User)
], Profile.prototype, "user", void 0);
__decorate([
    (0, core_1.ManyToMany)({ pivotEntity: 'ProfileProject', entity: 'Project' }),
    __metadata("design:type", Object)
], Profile.prototype, "projects", void 0);
__decorate([
    (0, core_1.Property)({ nullable: true }),
    __metadata("design:type", String)
], Profile.prototype, "firstName", void 0);
__decorate([
    (0, core_1.Property)({ nullable: true }),
    __metadata("design:type", String)
], Profile.prototype, "lastName", void 0);
__decorate([
    (0, core_1.Property)({ nullable: true }),
    __metadata("design:type", String)
], Profile.prototype, "bio", void 0);
__decorate([
    (0, core_1.Property)({ nullable: true }),
    __metadata("design:type", String)
], Profile.prototype, "location", void 0);
Profile = __decorate([
    (0, core_1.Entity)({ customRepository: () => profile_repository_1.ProfileRepository }),
    __metadata("design:paramtypes", [profileCreate_dto_1.ProfileCreateDto])
], Profile);
exports.Profile = Profile;
//# sourceMappingURL=profile.entity.js.map