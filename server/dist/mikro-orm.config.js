"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DI = void 0;
const core_1 = require("@mikro-orm/core");
const user_entity_1 = require("./components/user/user.entity");
const config_1 = require("@/config");
const migrations_1 = require("@mikro-orm/migrations");
const profile_entity_1 = require("./components/profile/profile.entity");
const project_entity_1 = require("./components/project/project.entity");
const profileProject_entity_1 = require("./components/profile/profileProject.entity");
const config = {
    entities: [user_entity_1.User, profile_entity_1.Profile, project_entity_1.Project, profileProject_entity_1.ProfileProject],
    dbName: config_1.DB_NAME,
    host: config_1.DB_HOST,
    port: parseInt(config_1.DB_PORT),
    type: 'postgresql',
    metadataProvider: core_1.ReflectMetadataProvider,
    debug: config_1.NODE_ENV != 'production',
    forceUtcTimezone: true,
    migrations: {
        tableName: 'mikro_orm_migrations',
        path: './src/migrations',
        glob: '!(*.d).{js,ts}',
        transactional: true,
        disableForeignKeys: true,
        allOrNothing: true,
        dropTables: true,
        safe: false,
        snapshot: true,
        emit: 'ts',
        generator: migrations_1.TSMigrationGenerator,
    },
};
exports.DI = {};
exports.default = config;
//# sourceMappingURL=mikro-orm.config.js.map