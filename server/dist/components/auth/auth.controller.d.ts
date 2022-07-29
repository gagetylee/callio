import { NextFunction, Request, Response } from "express";
import { AuthService } from "./auth.service";
export declare class AuthController {
    readonly authService: AuthService;
    constructor(authService: AuthService);
    login(req: Request, res: Response, next: NextFunction): Promise<Response>;
    private generateToken;
}
