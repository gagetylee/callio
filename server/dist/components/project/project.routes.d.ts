import { Router } from "express";
import { ProjectController } from "./project.controller";
export declare class ProjectRoutes {
    readonly projectController: ProjectController;
    readonly router: Router;
    constructor();
    private initRoutes;
}
