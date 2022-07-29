import { Service } from 'typedi';
import { UserService } from '../services/user.service';
import express, { Response, Request, NextFunction } from 'express';
import { User } from '../entities/user.entity';
import { UserCreateDto } from '../dtos/userCreate.dto';
import { logger } from '@/config/logger';
import { UserUpdateDto } from '../dtos/userUpdate.dto';
import { UserLoginDto } from '../dtos/userLogin.dto';
import jsonwebtoken from 'jsonwebtoken';
import { JWT_SECRET } from '@/config';
import { DataStoredInToken, UserRequest } from '@/util/auth.interface';
import { UserSearchDto } from '@/dtos/userSearch.dto';
import { ProjectService } from '@/services/project.service';
import { Project } from '@/entities/project.entity';

@Service()
export class UserController {
  constructor(readonly userService: UserService) {
    this.getAll = this.getAll.bind(this);
    this.findOne = this.findOne.bind(this);
    this.register = this.register.bind(this);
    this.login = this.login.bind(this);
    this.update = this.update.bind(this);
    this.getInvites = this.getInvites.bind(this);
  }
  
  /**
   * ===========================================================================================
   * PRIVATE controllers
   * ===========================================================================================
   */

   public async update(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const user: User = req.user
      const updateData: UserUpdateDto = {}

      for (let key in req.body) {
        updateData[key] = req.body[key]
      }

      const updatedUser = await this.userService.update(user, updateData)
      
      return res.status(200).json({
        success: true,
        message: "User successfully updated",
        data: { user }
      })
    } catch (error) {
      next(error)
    }
  }

  public async getInvites(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const user: User = req.user
      const projectInvites: Project[] = await this.userService.getInvites(user.id)

      return res.status(200).json({
        success: true,
        message: 'Invites found',
        data: projectInvites
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

  public async getAll(req: Request, res: Response, next: NextFunction): Promise<Response> {
    try {
      const users: User[] = await this.userService.getAll()

      return res.status(200).json({
        success: true,
        message: "Users found",
        data: { users }
      })
    } catch (error) {
      next(error)
    }
  }

  public async findOne(req: Request, res: Response, next: NextFunction): Promise<Response> {
    try {
      const user: User = await this.userService.findOne(req.params.username)

      return res.status(200).json({
        success: true,
        message: "User found",
        data: { user }
      })
    } catch (error) {
      next(error)
    }
  }

  public async search(req: Request, res: Response, next: NextFunction): Promise<Response> {
    try {
      const searchData: UserSearchDto = req.body
      const searchQuery: string = req.query.search.toString()

      const users: User[] = await this.userService.search({ ...searchData, search: searchQuery })

      return res.status(200).json({
        success: true,
        message: 'Profiles found',
        data: users
      })
    } catch (error) {
      next(error)
    }
  }

  public async register(req: Request, res: Response, next: NextFunction): Promise<Response> {
    try {
      const userData: UserCreateDto = req.body

      const user: User = await this.userService.create(userData)
      const token = this.generateToken(user.id)

      return res.status(200).json({
        success: true,
        message: "User registered successfully",
        data: { user, token }
      })
    } catch (error) {
      next(error)
    }
  }

  public async login(req: Request, res: Response, next: NextFunction) {
    try {
      const userData: UserLoginDto = req.body

      const user: User = await this.userService.login(userData)
      console.log(user.id)
      const token = this.generateToken(user.id)

      return res.status(200).json({
        success: true,
        message: "User logged in successfully",
        data: { user, token }
      })
    } catch (error) {
      next(error)
    }
  }

  private generateToken(id: number) {
    const dataStoredInToken: DataStoredInToken = { id }
    const expiresIn: number = 60 * 60

    return jsonwebtoken.sign(dataStoredInToken, JWT_SECRET, { expiresIn })
  }
}
