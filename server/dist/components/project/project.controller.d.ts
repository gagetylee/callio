import { UserRequest } from "@/util/auth.interface";
import { NextFunction, Request, Response } from "express";
import { ProjectService } from "./project.service";
export declare class ProjectController {
    readonly projectService: ProjectService;
    constructor(projectService: ProjectService);
    getAll(req: Request, res: Response, next: NextFunction): Promise<void>;
    create(req: UserRequest, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
}
