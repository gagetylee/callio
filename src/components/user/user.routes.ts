import validate from '../../middleware/validation.middleware';
import { Router } from 'express';
import { Container } from 'typedi';
import { CreateUserDto } from './dto/createUser.dto';
import { UserController } from './user.controller';
import { EditUserDto } from './dto/editUser.dto';
import { UserLoginDto } from './dto/user.dto.login';
import authorize from '@/middleware/authorization.middleware';

export class UserRoutes {
  readonly userController: UserController = Container.get(UserController);
  readonly router: Router = Router();

  constructor() {
    this.initRoutes();
  }

  public initRoutes() {
    this.router.get('/', this.userController.getAll);
    this.router.get('/:id', this.userController.findOne);

    this.router.post('/', validate(CreateUserDto, 'body'), this.userController.register);

    this.router.put('/:id', authorize, validate(EditUserDto, 'body'), this.userController.update);
  }
}
