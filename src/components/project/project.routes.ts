import { Router } from "express";
import Container from "typedi";
import { ProjectController } from "./project.controller";
import authorize from "@/middleware/authorization.middleware";
import validate from "@/middleware/validation.middleware";
import { ProjectCreateDto } from "./dto/projectCreate.dto";

export class ProjectRoutes {
  readonly projectController: ProjectController = Container.get(ProjectController)
  readonly router: Router = Router()

  constructor() {
    this.initRoutes()
  }

  private initRoutes() {
    this.router.get('/', this.projectController.getAll)
    this.router.get('/:id', this.projectController.findOne)

    this.router.post('/', authorize, validate(ProjectCreateDto, 'body'), this.projectController.create)
  }
}