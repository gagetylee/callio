import { logger } from "@/config/logger";
import { HttpException } from "@/exceptions/HttpException";
import { DI } from "@/mikro-orm.config";
import { LoadStrategy } from "@mikro-orm/core";
import { EntityRepository } from "@mikro-orm/postgresql";
import { profile } from "console";
import { Service } from "typedi";
import { Profile } from "../profile/profile.entity";
import { ProjectMember } from "../projectMember/projectMember.entity";
import { ProjectCreateDto } from "./dto/projectCreate.dto";
import { Project } from "./project.entity";
import { ProjectRepository } from "./project.repository";

@Service()
export class ProjectService {
  private projectRepository: ProjectRepository = DI.projectRepository

  public async findOne(id: number): Promise<Project> {
    // const project: Project = await this.projectRepository.findOne({ id }, { populate: ['projectMembers.profile'] })

    const project = await this.projectRepository.findOneA(id)

    if (!project) {
      throw new HttpException(404, 'Project not found')
    }
    return project
  }

  public async getAll(): Promise<Project[]> {
    const projects = await this.projectRepository.findAll()

    if (projects.length === 0) {
      throw new HttpException(404, 'No projects found')
    }

    return projects
  }

  public async create(profile: Profile, projectData: ProjectCreateDto) {

    const projectExists = await this.projectRepository.findOne({ name: projectData.name })
    if (projectExists) {
      throw new HttpException(409, `Project name ${projectData.name}, already exists`)
    }

    const project: Project = new Project(profile, projectData)
    if (!project) {
      throw new HttpException(400, 'Error creating project')
    }

    this.projectRepository.persistAndFlush(project)
    return project
  }

  // public async inviteUser(projectId: number, profile: Profile, invitee: Profile) {
  //   const project: Project = await this.projectRepository.findOne({ id: projectId })

  //   if (project.userProfiles.contains(profile)) {
  //     logger.info('YEEEEEEEEEE')
  //   }
  //   return null
    
  // }
}