import { Router } from "express";
import Container from "typedi";
import { ProfileController } from "../controllers/profile.controller";
import validate from "@/middleware/validation.middleware"
import { ProfileSearchDto } from "../dtos/profileSearch.dto";
import authorize from "@/middleware/authorization.middleware";
import { ProfileCreateDto } from "../dtos/profileCreate.dto";

export class ProfileRoutes {
  readonly profileController: ProfileController = Container.get(ProfileController)
  readonly router: Router = Router()

  constructor() {
    this.initRoutes()
  }

  public initRoutes() {
    this.router.get('/username/:username', this.profileController.findOne)
    this.router.get('/query/:query?', validate(ProfileSearchDto, 'body'), this.profileController.search)

    this.router.get('/invites', authorize, this.profileController.getInvites)

    this.router.put('/', authorize, validate(ProfileCreateDto, 'body'), this.profileController.update)
  }
}
