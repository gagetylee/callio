import validate from '../middleware/validation.middleware';
import { Router } from 'express';
import { Container } from 'typedi';
import { UserCreateDto } from '../dtos/userCreate.dto';
import { UserController } from '../controllers/user.controller';
import { UserEditDto } from '../dtos/userEdit.dto';
import { UserLoginDto } from '../dtos/userLogin.dto';
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

    this.router.post('/', validate(UserCreateDto, 'body'), this.userController.register);

    this.router.put('/:id', authorize, validate(UserEditDto, 'body'), this.userController.update);
  }
}
