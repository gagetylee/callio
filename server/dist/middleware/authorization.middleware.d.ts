import { UserRequest } from "@/util/auth.interface";
import { NextFunction, Response } from "express";
declare const authorize: (req: UserRequest, res: Response, next: NextFunction) => Promise<void>;
export default authorize;
