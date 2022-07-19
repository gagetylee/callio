import { UserRequest } from "@/util/auth.interface"
import { NextFunction, Request, Response } from "express"
import { Service } from "typedi"
import { Profile } from "../profile/profile.entity"
import { ProjectCreateDto } from "./dto/projectCreate.dto"
import { Project } from "./project.entity"
import { ProjectService } from "./project.service"

@Service()
export class ProjectController {
  constructor(readonly projectService: ProjectService) {
    this.findOne = this.findOne.bind(this)
    this.getAll = this.getAll.bind(this)
    this.create = this.create.bind(this)
  }

  public async findOne(req: Request, res: Response, next: NextFunction) {
    try {
      const project: Project = await this.projectService.findOne(parseInt(req.params.id))

      res.status(200).json({
        success: true,
        message: 'Project found',
        data: project
      })
    } catch (error) {
      next(error)
    }
  }

  public async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const projects: Project[] = await this.projectService.getAll()

      res.status(200).json({
        success: true,
        message: 'Projects found',
        data: projects
      })
    } catch (error) {
      next(error)
    }
  }

  public async create(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const projectData: ProjectCreateDto = req.body

      const profile: Profile = req.user.profile
      const project: Project = await this.projectService.create(profile, projectData)

      return res.status(200).json({
        success: true,
        message: 'Project successfully created',
        data: project
      })
    } catch (error) {
      next(error)
    }
  }

  // public async inviteUser(req: UserRequest, res: Response, next: NextFunction) {
  //   try {
  //     const user: Profile = req.user.profile.


  //   } catch (error) {
  //     next(error)
  //   }
  // }
}