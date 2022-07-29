import { logger } from "@/config/logger";
import { HttpException } from "@/exceptions/HttpException";
import { DI } from "@/mikro-orm.config";
import { Collection, LoadStrategy } from "@mikro-orm/core";
import { EntityRepository } from "@mikro-orm/postgresql";
import { Service } from "typedi";
import { User } from "../entities/user.entity";
import { ProjectUserStatus, ProjectUser } from "../entities/projectUser.entity";
import { ProjectCreateDto } from "../dtos/projectCreate.dto";
import { Project } from "../entities/project.entity";
import { ProjectRepository } from "../repositories/project.repository";
import { wrap } from "module";

@Service()
export class ProjectService {
  private projectRepository: ProjectRepository = DI.projectRepository
  private userRepository: EntityRepository<User> = DI.userRepository

  public async findOne(id: number): Promise<Project> {
    const project: Project = await this.projectRepository.findOne({ id })

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

  /**
   * Create a new project
   * @param projectData 
   * @returns 
   */
  public async create(user: User, projectData: ProjectCreateDto) {

    const projectExists = await this.projectRepository.findOne({ name: projectData.name })
    if (projectExists) {
      throw new HttpException(409, `Project name already exists`)
    }

    const project: Project = new Project(user, projectData)
    if (!project) {
      throw new HttpException(400, 'Error creating project')
    }
    
    await this.projectRepository.persistAndFlush(project)
    return project
  }

  /**
   * Invite a user to project
   * @param projectId 
   * @param inviteProfileId 
   * @returns 
   */
  public async inviteUser(projectId: number, user: User, inviteUserId: number) {
    const project: Project = await this.projectRepository.findOne({ id: projectId } )
    if (!project) {
      throw new HttpException(404, 'Project not found')
    }

    const projectUsers: Collection<ProjectUser> = await project.projectUsers.init()
    // console.log(projectProfiles)

    // Confirm admin
    const isAdmin = await projectUsers.matching({ where: { user, isAdmin: true } })
    if (isAdmin.length === 0) {
      throw new HttpException(401, 'User is not authorized to send project invite')
    }

    // Check that invited user is not already a member
    const userAlreadyMember = await projectUsers.matching({ where: { user: inviteUserId } })
    if (userAlreadyMember.length > 0) {
      throw new HttpException(400, 'User is already a member')
    }

    const inviteUser: User = await this.userRepository.findOne({ id: inviteUserId })
    if (! inviteUser) {
      throw new HttpException(404, 'User not found')
    }

    // Add user with 'invited' status
    const projectUser = new ProjectUser(project, inviteUser, ProjectUserStatus.INVITED, false)
    project.projectUsers.add(projectUser)
    await this.projectRepository.flush()

    return projectUsers
  }
}
