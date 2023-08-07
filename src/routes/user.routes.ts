import validate from '../middleware/validation.middleware';
import { Router } from 'express';
import { Container } from 'typedi';
import { UserCreateDto } from '../dtos/userCreate.dto';
import { UserController } from '../controllers/user.controller';
import { UserUpdateDto } from '../dtos/userUpdate.dto';
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
    this.router.get('/:username/invites', authorize, this.userController.getInvites)
    this.router.get('/:username', this.userController.findOne);

    this.router.post('/', validate(UserCreateDto, 'body'), this.userController.register);
    this.router.post('/:username/invites', authorize, this.userController.acceptInvite)

    this.router.put('/:id', authorize, validate(UserUpdateDto, 'body'), this.userController.update);
  }
}
