import { Router } from 'express';
import { UserController } from './user.controller';
export declare class UserRoutes {
    readonly userController: UserController;
    readonly router: Router;
    constructor();
    initRoutes(): void;
}
