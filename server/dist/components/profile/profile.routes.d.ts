import { Router } from "express";
import { ProfileController } from "./profile.controller";
export declare class ProfileRoutes {
    readonly profileController: ProfileController;
    readonly router: Router;
    constructor();
    initRoutes(): void;
}
