import { User } from "../user/user.entity";
import { LoginDto } from "./dto/login.dto";
export declare class AuthService {
    constructor();
    login(loginData: LoginDto): Promise<User>;
}
