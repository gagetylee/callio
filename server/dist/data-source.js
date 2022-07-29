"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Database = void 0;
const user_entity_1 = require("./components/user/user.entity");
const typeorm_1 = require("typeorm");
const config_1 = require("./config");
const path_1 = __importDefault(require("path"));
exports.Database = new typeorm_1.DataSource({
    type: "postgres",
    host: config_1.DB_HOST,
    port: parseInt(config_1.DB_PORT),
    username: "postgres",
    password: "postgres",
    database: config_1.DB_NAME,
    logging: ["query", "error"],
    entities: [user_entity_1.User],
    migrations: [path_1.default.join(__dirname, "./migrations/*")]
});
//# sourceMappingURL=data-source.js.map