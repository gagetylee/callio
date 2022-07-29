"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
require("tsconfig-paths");
const components_1 = require("./components");
const config_1 = require("@/config");
const error_middleware_1 = __importDefault(require("./middleware/error.middleware"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const core_1 = require("@mikro-orm/core");
const mikro_orm_config_1 = __importStar(require("./mikro-orm.config"));
const user_entity_1 = require("@/components/user/user.entity");
const profile_entity_1 = require("./components/profile/profile.entity");
const project_entity_1 = require("./components/project/project.entity");
(async function main() {
    const app = (0, express_1.default)();
    mikro_orm_config_1.DI.orm = await core_1.MikroORM.init(mikro_orm_config_1.default);
    mikro_orm_config_1.DI.em = mikro_orm_config_1.DI.orm.em.fork();
    mikro_orm_config_1.DI.userRepository = mikro_orm_config_1.DI.orm.em.fork().getRepository(user_entity_1.User);
    mikro_orm_config_1.DI.profileRepository = mikro_orm_config_1.DI.orm.em.fork().getRepository(profile_entity_1.Profile);
    mikro_orm_config_1.DI.projectRepository = mikro_orm_config_1.DI.orm.em.fork().getRepository(project_entity_1.Project);
    app.use((_1, _2, next) => core_1.RequestContext.create(mikro_orm_config_1.DI.orm.em, next));
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: true }));
    (0, components_1.registerApiRoutes)(app, '/api/v1');
    app.use(error_middleware_1.default);
    const options = {
        definition: {
            openapi: '3.0.0',
            info: {
                title: 'Callio',
                version: '1.0.0',
            },
        },
        apis: ['./src/components/**/*.routes.ts'],
    };
    const swaggerDoc = (0, swagger_jsdoc_1.default)(options);
    app.use('/docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDoc));
    app.listen(config_1.PORT, () => {
        console.log(`Server started on port ${config_1.PORT}`);
    });
})();
//# sourceMappingURL=app.js.map