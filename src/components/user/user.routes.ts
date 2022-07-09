import validationMiddleware from '../../middleware/validation.middleware';
import { Router } from 'express';
import { Container } from 'typedi';
import { CreateUserDto } from './dto/createUser.dto';
import { UserController } from './user.controller';

export class UserRoutes {
  readonly userController: UserController = Container.get(UserController);
  readonly router: Router = Router();

  constructor() {
    this.initRoutes();
  }

  public initRoutes() {
    /**
    * @swagger
    * /api/v1/user:
    *   get:
    *     description: Get all users
    *     responses:
    *       200:
    *         description: Returns a mysterious string.
    */
    this.router.get('/', this.userController.getAll);

    // /**
    //  *
    //  */
    this.router.get('/:id', this.userController.findOne);

    // /**
    //  *
    //  */
    this.router.post('/', validationMiddleware(CreateUserDto, 'body'), this.userController.create);
  }
}
