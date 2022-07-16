import { Router } from "express";
import Container from "typedi";
import { ProfileController } from "./profile.controller";
import validate from "@/middleware/validation.middleware"
import { ProfileSearchDto } from "./dto/profileSearch.dto";

export class ProfileRoutes {
  readonly profileController: ProfileController = Container.get(ProfileController)
  readonly router: Router = Router()

  constructor() {
    this.initRoutes()
  }

  public initRoutes() {
    this.router.get('/search', validate(ProfileSearchDto, 'body'), this.profileController.search)
  }
}