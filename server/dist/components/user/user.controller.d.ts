import { UserService } from './user.service';
import express, { Response, Request, NextFunction } from 'express';
export declare class UserController {
    readonly userService: UserService;
    constructor(userService: UserService);
    getAll(req: Request, res: Response, next: NextFunction): Promise<Response>;
    findOne(req: Request, res: Response, next: NextFunction): Promise<Response>;
    register(req: Request, res: Response, next: NextFunction): Promise<express.Response<any, Record<string, any>>>;
    login(req: Request, res: Response, next: NextFunction): Promise<express.Response<any, Record<string, any>>>;
    update(req: Request, res: Response, next: NextFunction): Promise<express.Response<any, Record<string, any>>>;
    private generateToken;
}
