"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWT_SECRET = exports.LOG_FORMAT = exports.LOG_DIR = exports.DB_NAME = exports.DB_PASSWORD = exports.DB_USER = exports.DB_PORT = exports.DB_HOST = exports.PORT = exports.DB_URL = exports.NODE_ENV = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });
_a = process.env, exports.NODE_ENV = _a.NODE_ENV, exports.DB_URL = _a.DB_URL, exports.PORT = _a.PORT, exports.DB_HOST = _a.DB_HOST, exports.DB_PORT = _a.DB_PORT, exports.DB_USER = _a.DB_USER, exports.DB_PASSWORD = _a.DB_PASSWORD, exports.DB_NAME = _a.DB_NAME, exports.LOG_DIR = _a.LOG_DIR, exports.LOG_FORMAT = _a.LOG_FORMAT, exports.JWT_SECRET = _a.JWT_SECRET;
//# sourceMappingURL=index.js.map