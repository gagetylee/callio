import { Service } from 'typedi';
import { User } from './user.entity';
import { HttpException } from '@/exceptions/HttpException';
import { CreateUserDto } from './dto/createUser.dto';
import { DI } from '@/mikro-orm.config';
import {EntityRepository} from "@mikro-orm/core";
import { EditUserDto } from './dto/editUser.dto';
import bcrypt from 'bcrypt'
import { UserLoginDto } from './dto/user.dto.login';

@Service()
export class UserService {
  private userRepository: EntityRepository<User> = DI.userRepository

  public async getAll(): Promise<User[]> {
    const users: User[] = await this.userRepository.findAll();

    if (users.length === 0) {
      throw new HttpException(404, 'No users found')
    }

    return users;
  }

  public async findOne(id: number): Promise<User> {
    const user: User = await DI.userRepository.findOne({ id })

    if (!user) throw new HttpException(404, 'User not found')

    return user
  }


  public async create(credentials: CreateUserDto): Promise<User> {
    const emailExists = await this.userRepository.findOne({ email: credentials.email })
    if (emailExists) throw new HttpException(409, 'Email is already in use')

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(credentials.password, salt)

    const createUserData: User = this.userRepository.create({ ...credentials, password: hashedPassword })
    await DI.em.persistAndFlush(createUserData);

    return createUserData
  }

  public async login(credentials: UserLoginDto): Promise<User> {
    const user: User = await DI.userRepository.findOne({ email: credentials.email })
    console.log(user)
    if (!user || !(await bcrypt.compare(credentials.password, user.password))) {
      throw new HttpException(401, 'Invalid credentials')
    }

    return user
    return null
  }

  
  public async update(id: number, credentials: EditUserDto): Promise<User> {
    const user = await this.userRepository.findOne({ id })

    if (!user) throw new HttpException(404, 'User not found')

    const updatedUserData: User = this.userRepository.assign(user, credentials)
    return updatedUserData
  }
}
