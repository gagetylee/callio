"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerApiRoutes = void 0;
const auth_routes_1 = require("./auth/auth.routes");
const profile_routes_1 = require("./profile/profile.routes");
const user_routes_1 = require("./user/user.routes");
const project_routes_1 = require("./project/project.routes");
function registerApiRoutes(router, prefix) {
    router.use(`${prefix}/auth`, new auth_routes_1.AuthRoutes().router);
    router.use(`${prefix}/user`, new user_routes_1.UserRoutes().router);
    router.use(`${prefix}/profile`, new profile_routes_1.ProfileRoutes().router);
    router.use(`${prefix}/project`, new project_routes_1.ProjectRoutes().router);
}
exports.registerApiRoutes = registerApiRoutes;
//# sourceMappingURL=index.js.map