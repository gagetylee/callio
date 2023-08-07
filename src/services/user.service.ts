import { Service } from 'typedi';
import { User } from '../entities/user.entity';
import { HttpException } from '@/exceptions/HttpException';
import { UserCreateDto } from '../dtos/userCreate.dto';
import { DI } from '@/mikro-orm.config';
import {EntityRepository, wrap} from "@mikro-orm/core";
import { UserUpdateDto } from '../dtos/userUpdate.dto';
import bcrypt from 'bcrypt'
import { UserLoginDto } from '../dtos/userLogin.dto';
import { UserSearchDto } from '@/dtos/userSearch.dto';
import { UserRepository } from '@/repositories/user.repository';
import { Project } from '@/entities/project.entity';
import { ProjectRepository } from '@/repositories/project.repository';
import { ProjectUser, ProjectUserStatus } from '@/entities/projectUser.entity';

@Service()
export class UserService {
  private userRepository: UserRepository = DI.userRepository
  private projectRepository: ProjectRepository = DI.projectRepository
  private projectUserRepository: EntityRepository<ProjectUser> = DI.projectUserRepository

  public async getAll(): Promise<User[]> {
    const users: User[] = await this.userRepository.findAll();

    if (users.length === 0) {
      throw new HttpException(404, 'No users found')
    }

    return users;
  }

  public async findOne(username: string): Promise<User> {
    const user: User = await DI.userRepository.findOne({ username })

    if (!user) throw new HttpException(404, 'User not found')

    return user
  }

  public async search(query: UserSearchDto): Promise<User[]> {
    const users: User[] = await DI.userRepository.find({ username: { $like: query.search }})
    if (users.length === 0) {
      throw new HttpException(404, 'No users found')
    }
    return users
  }

  public async getInvites(userId: number): Promise<Project[]> {
    const invites: Project[] = await this.userRepository.findInvites(userId)

    if (invites.length === 0) {
      throw new HttpException(404, 'No invites found')
    }

    return invites
  }

  public async acceptInvite(userId: number, projectId: number) {
    const projectUser: ProjectUser = await this.projectUserRepository.findOne({ user: userId, project: projectId })

    if (!projectUser) {
      throw new HttpException(404, 'Invite not found')
    }
    if (projectUser.status != ProjectUserStatus.INVITED) {
      throw new HttpException(400, 'User is already part of project')
    }

    const updatedProjectUser = wrap(projectUser).assign({ status: ProjectUserStatus.ACTIVE })
    this.projectUserRepository.flush()

    return updatedProjectUser
  }


  public async create(credentials: UserCreateDto): Promise<User> {
    const emailExists = await this.userRepository.findOne({ email: credentials.email })
    if (emailExists) throw new HttpException(409, 'Email is already in use')

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(credentials.password, salt)

    const createUserData: User = this.userRepository.create({ ...credentials, password: hashedPassword })
    await DI.em.persistAndFlush(createUserData);

    return createUserData
  }

  public async login(credentials: UserLoginDto): Promise<User> {
    const user: User = await DI.userRepository.findOne({ email: credentials.email })
    console.log(user)
    if (!user || !(await bcrypt.compare(credentials.password, user.password))) {
      throw new HttpException(401, 'Invalid credentials')
    }

    return user
  }


  public async update(user: User, credentials: UserUpdateDto): Promise<User> {
    if (!user) throw new HttpException(404, 'User not found')

    const updatedUser = wrap(user).assign(credentials)
    this.userRepository.flush()

    return updatedUser
  }
}
