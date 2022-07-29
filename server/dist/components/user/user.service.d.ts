import { User } from './user.entity';
import { CreateUserDto } from './dto/createUser.dto';
import { EditUserDto } from './dto/editUser.dto';
import { UserLoginDto } from './dto/user.dto.login';
export declare class UserService {
    private userRepository;
    getAll(): Promise<User[]>;
    findOne(id: number): Promise<User>;
    create(credentials: CreateUserDto): Promise<User>;
    login(credentials: UserLoginDto): Promise<User>;
    update(id: number, credentials: EditUserDto): Promise<User>;
}
