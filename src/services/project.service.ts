import { logger } from "@/config/logger";
import { HttpException } from "@/exceptions/HttpException";
import { DI } from "@/mikro-orm.config";
import { Collection, LoadStrategy } from "@mikro-orm/core";
import { EntityRepository } from "@mikro-orm/postgresql";
import { profile } from "console";
import { Service } from "typedi";
import { Profile } from "../entities/profile.entity";
import { ProfileRepository } from "../repositories/profile.repository";
import { ProfileStatus, ProjectProfile } from "../entities/projectProfile.entity";
import { ProjectCreateDto } from "../dtos/projectCreate.dto";
import { Project } from "../entities/project.entity";
import { ProjectRepository } from "../repositories/project.repository";
import { User } from "@/entities/user.entity";
import { wrap } from "module";

@Service()
export class ProjectService {
  private projectRepository: ProjectRepository = DI.projectRepository
  private profileRepository: ProfileRepository = DI.profileRepository

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
   * @param profile 
   * @param projectData 
   * @returns 
   */
  public async create(profile: Profile, projectData: ProjectCreateDto) {

    const projectExists = await this.projectRepository.findOne({ name: projectData.name })
    if (projectExists) {
      throw new HttpException(409, `Project name ${projectData.name}, already exists`)
    }

    const project: Project = new Project(profile, projectData)
    if (!project) {
      throw new HttpException(400, 'Error creating project')
    }
    
    await this.projectRepository.persistAndFlush(project)
    return project
  }

  /**
   * Invite a user to project
   * @param projectId 
   * @param profile 
   * @param inviteProfileId 
   * @returns 
   */
  public async inviteUser(projectId: number, profile: Profile, inviteProfileId: number) {
    const project: Project = await this.projectRepository.findOne({ id: projectId } )
    if (!project) {
      throw new HttpException(404, 'Project not found')
    }

    const projectProfiles: Collection<ProjectProfile> = await project.profiles.init()
    console.log(projectProfiles)

    // Confirm admin
    const isAdmin = await projectProfiles.matching({ where: { profile, isAdmin: true } })
    if (isAdmin.length === 0) {
      throw new HttpException(401, 'User is not authorized to send project invite')
    }

    // Check that invited user is not already a member
    const userAlreadyMember = await projectProfiles.matching({ where: { profile: inviteProfileId } })
    if (userAlreadyMember.length > 0) {
      throw new HttpException(400, 'User is already a member')
    }

    const inviteUser: Profile = await this.profileRepository.findOne({ id: inviteProfileId })
    if (! inviteUser) {
      throw new HttpException(404, 'User not found')
    }

    // Add user with 'invited' status
    const projectProfile = new ProjectProfile(project, inviteUser, ProfileStatus.INVITED, false)
    project.profiles.add(projectProfile)
    await this.projectRepository.flush()

    return projectProfiles
  }
}
