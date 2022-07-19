import { Router } from 'express';
import { AuthRoutes } from './auth/auth.routes';
import { ProfileRoutes } from './profile/profile.routes';
import { UserRoutes } from './user/user.routes';
import { ProjectRoutes } from './project/project.routes';

export function registerApiRoutes(router: Router, prefix: string) {
  router.use(`${prefix}/auth`, new AuthRoutes().router);
  router.use(`${prefix}/user`, new UserRoutes().router);
  router.use(`${prefix}/profile`, new ProfileRoutes().router);
  router.use(`${prefix}/project`, new ProjectRoutes().router);
}
