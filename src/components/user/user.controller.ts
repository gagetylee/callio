import { Service } from 'typedi';
import { UserService } from './user.service';
import express, { Response, Request, NextFunction } from 'express';
import { User } from './user.entity';
import { CreateUserDto } from './dto/createUser.dto';
import { logger } from '@/config/logger';

@Service()
export class UserController {
  constructor(readonly userService: UserService) {
    this.getAll = this.getAll.bind(this);
  }

  public async getAll(req: Request, res: Response, next: NextFunction): Promise<Response> {
    try {
      const users: User[] = await this.userService.getAll()
    
      return res.status(200).json(users)
    } catch (err) {
      next(err)
    }
  }

  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      const userData: CreateUserDto = req.body
      console.log(userData)
      return res.send('nice')
    } catch (err) {
      next(err)
    }
  }
}
