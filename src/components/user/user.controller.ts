import { Service } from 'typedi';
import { UserService } from './user.service';
import express, { Response, Request, NextFunction } from 'express';
import { User } from './user.entity';
import { CreateUserDto } from './dto/createUser.dto';
import { logger } from '@/config/logger';
import { EditUserDto } from './dto/editUser.dto';

@Service()
export class UserController {
  constructor(readonly userService: UserService) {
    this.getAll = this.getAll.bind(this);
    this.findOne = this.findOne.bind(this);
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
  }

  /**
   * GET /user
   *
   * @param req
   * @param res
   * @param next
   * @returns
   */
  public async getAll(req: Request, res: Response, next: NextFunction): Promise<Response> {
    try {
      const users: User[] = await this.userService.getAll()

      return res.status(200).json(users)
    } catch (error) {
      next(error)
    }
  }

  public async findOne(req: Request, res: Response, next: NextFunction): Promise<Response> {
    try {
      const user: User = await this.userService.findOne(parseInt(req.params.id))

      return res.status(200).json(user)
    } catch (error) {
      next(error)
    }
  }

  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      const userData: CreateUserDto = req.body

      const user = await this.userService.create(userData)
      return res.status(200).json(user)
    } catch (error) {
      next(error)
    }
  }

  public async update(req: Request, res: Response, next: NextFunction) {
    try {
      const userId: number = parseInt(req.params.id)
      // const userData: User = await this.userService.findOne(userId)

      const updateData: EditUserDto = {}

      for (let key in req.body) {
        updateData[key] = req.body[key]
      }

      const user = await this.userService.update(userId, updateData)

      return res.status(200).json(user)
    } catch (error) {
      next(error)
    }
  }
}
