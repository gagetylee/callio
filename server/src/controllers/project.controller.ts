import { UserRequest } from "@/util/auth.interface"
import { NextFunction, Request, Response } from "express"
import { Service } from "typedi"
import { User } from "../entities/user.entity"
import { ProjectCreateDto } from "../dtos/projectCreate.dto"
import { Project } from "../entities/project.entity"
import { ProjectService } from "../services/project.service"
import { IProject } from "@/interfaces/project.interface"

@Service()
export class ProjectController {
  constructor(readonly projectService: ProjectService) {
    this.findOne = this.findOne.bind(this)
    this.getAll = this.getAll.bind(this)
    this.create = this.create.bind(this)
    this.inviteUser = this.inviteUser.bind(this)
  }

  /**
   * ===========================================================================================
   * PRIVATE controllers
   * ===========================================================================================
   */

   public async create(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const projectData: ProjectCreateDto = req.body

      const profile: User = req.user
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

  public async inviteUser(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const user: User = req.user
      const projectId: number = parseInt(req.params.projectId)
      const inviteUserId: number = parseInt(req.body.inviteUser)

      const data = await this.projectService.inviteUser(projectId, user, inviteUserId)

      return res.status(200).json({
        success: true,
        message: 'User invited',
        data
      })
    } catch (error) {
      next(error)
    }
  }


/**
   * ===========================================================================================
   * PUBLIC controllers
   * ===========================================================================================
   */

  public async findOne(req: Request, res: Response, next: NextFunction) {
    try {
      const project: IProject = await this.projectService.findOne(parseInt(req.params.id))

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

}
