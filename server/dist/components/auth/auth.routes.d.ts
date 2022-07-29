import { Router } from "express";
import { AuthController } from "./auth.controller";
export declare class AuthRoutes {
    readonly authController: AuthController;
    readonly router: Router;
    constructor();
    initRoutes(): void;
}
