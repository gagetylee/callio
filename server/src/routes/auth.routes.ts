import { Router } from "express";
import { Container } from "typedi";
import { AuthController } from "../controllers/auth.controller";

export class AuthRoutes {
  readonly authController: AuthController = Container.get(AuthController)
  readonly router: Router = Router()

  constructor() {
    this.initRoutes()
  }

  public initRoutes() {
    this.router.get('/login', this.authController.login)
  }
}
