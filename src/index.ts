import { Router } from 'express';
import { AuthRoutes } from './routes/auth.routes';
import { UserRoutes } from './routes/user.routes';
import { ProjectRoutes } from './routes/project.routes';

export function registerApiRoutes(router: Router, prefix: string) {
  router.use(`${prefix}/auth`, new AuthRoutes().router);
  router.use(`${prefix}/user`, new UserRoutes().router);
  router.use(`${prefix}/project`, new ProjectRoutes().router);
}
