import { UserRequest } from "@/util/auth.interface";
import { NextFunction, Request, Response } from "express";
import { ProfileService } from "./profile.service";
export declare class ProfileController {
    readonly profileService: ProfileService;
    constructor(profileService: ProfileService);
    findOne(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
    search(req: Request, res: Response, next: NextFunction): Promise<Response>;
    update(req: UserRequest, res: Response, next: NextFunction): Promise<Response>;
}
