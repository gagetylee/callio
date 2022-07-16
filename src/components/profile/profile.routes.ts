import { Router } from "express";
import Container from "typedi";
import { ProfileController } from "./profile.controller";
import validate from "@/middleware/validation.middleware"
import { ProfileSearchDto } from "./dto/profileSearch.dto";
import authorize from "@/middleware/authorization.middleware";
import { ProfileCreateDto } from "./dto/profileCreate.dto";

export class ProfileRoutes {
  readonly profileController: ProfileController = Container.get(ProfileController)
  readonly router: Router = Router()

  constructor() {
    this.initRoutes()
  }

  public initRoutes() {
    this.router.get('/:username', this.profileController.findOne)
    this.router.get('/:query?', validate(ProfileSearchDto, 'body'), this.profileController.search)
    
    this.router.put('/', authorize, validate(ProfileCreateDto, 'body'), this.profileController.update)
  }
}