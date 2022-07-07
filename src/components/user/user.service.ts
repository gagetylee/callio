import { Service } from 'typedi';
import { User } from './user.entity';
import { HttpException } from '@/exceptions/HttpException';
import { Repository } from 'typeorm';
import { Database } from '@/data-source';


@Service()
export class UserService {
  userRepository: Repository<User> = Database.getRepository(User)

  public async getAll(): Promise<User[]> {
    const users: User[] = await User.find()

    if (users.length === 0) {
      throw new HttpException(404, 'No users found')
    }

    return users;
  }
}
