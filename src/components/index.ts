import { Router } from 'express';
import { UserRoutes } from './user/user.routes';

export function registerApiRoutes(router: Router, prefix: string) {
  router.use(`${prefix}/user`, new UserRoutes().router);
}
