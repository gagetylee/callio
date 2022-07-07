import { Service } from 'typedi';
import { User } from './user.entity';
import { HttpException } from '@/exceptions/HttpException';
import { Repository } from 'typeorm';
import { Database } from '@/data-source';
import { CreateUserDto } from './dto/createUser.dto';
import { IUser } from './user.interface';


@Service()
export class UserService {
  private userRepository: Repository<User> = Database.getRepository(User)

  public async getAll(): Promise<User[]> {
    const users: User[] = await User.find()

    if (users.length === 0) {
      throw new HttpException(404, 'No users found')
    }

    return users;
  }

  public async create(credentials: CreateUserDto): Promise<User> {
    const emailExists = await User.findOne({ where: { email: credentials.email } })
    if (emailExists) throw new HttpException(409, 'Email is already in use')

    const createUserData: User = await User.create({ ...credentials }).save()
    return createUserData
  }
}
