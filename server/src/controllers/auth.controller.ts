import { DataStoredInToken } from "@/util/auth.interface";
import { NextFunction, Request, Response } from "express";
import { LoginDto } from "../dtos/login.dto";
import jsonwebtoken from "jsonwebtoken"
import { JWT_SECRET } from "@/config";

import { User } from "../entities/user.entity";
import { AuthService } from "../services/auth.service";
import { Service } from "typedi";

@Service()
export class AuthController {
  constructor(readonly authService: AuthService) {
    this.login = this.login.bind(this)
  }

  public async login(req: Request, res: Response, next: NextFunction): Promise<Response> {
    try {
      const loginData: LoginDto = req.body

      const user: User = await this.authService.login(loginData)
      const token = this.generateToken(user.id)

      return res.status(200).json({
        success: true,
        message: "Login successfull",
        data: { user, token }
      })
    } catch (error) {
      next(error)
    }
  }

  private generateToken(id: number) {
    const dataStoredInToken: DataStoredInToken = { id }
    const expiresIn: number = 60 * 60 * 60

    return jsonwebtoken.sign(dataStoredInToken, JWT_SECRET, { expiresIn })
  }
}
