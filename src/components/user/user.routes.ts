import validationMiddleware from '../../middleware/validation.middleware';
import { Router } from 'express';
import { Container } from 'typedi';
import { CreateUserDto } from './dto/createUser.dto';
import { UserController } from './user.controller';
import { EditUserDto } from './dto/editUser.dto';

export class UserRoutes {
  readonly userController: UserController = Container.get(UserController);
  readonly router: Router = Router();

  constructor() {
    this.initRoutes();
  }

  public initRoutes() {
    this.router.get('/', this.userController.getAll);
    this.router.get('/:id', this.userController.findOne);

    this.router.post('/', validationMiddleware(CreateUserDto, 'body'), this.userController.create);

    this.router.put('/:id', validationMiddleware(EditUserDto, 'body'), this.userController.update);
  }
}
