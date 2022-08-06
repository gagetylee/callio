import { HttpException } from "@/exceptions/HttpException";
import { DI } from "@/mikro-orm.config";
import { DataStoredInToken } from "@/util/auth.interface";
import { User } from "../entities/user.entity";
import { LoginDto } from "../dtos/login.dto";
import jsonwebtoken from "jsonwebtoken"
import { JWT_SECRET } from "@/config";
import { compare } from "bcrypt";
import { Service } from "typedi";

@Service()
export class AuthService {
  constructor() {

  }

  public async login(loginData: LoginDto) {
    const user: User = await DI.userRepository.findOne({ email: loginData.email })

    if (!user || !(await compare(loginData.password, user.password))) {
      throw new HttpException(401, 'Invalid credentials')
    }
    return user
  }

  public generateToken(id: number) {
    const dataStoredInToken: DataStoredInToken = { id }
    const expiresIn: number = 60 * 60 * 60

    return jsonwebtoken.sign(dataStoredInToken, JWT_SECRET, { expiresIn })
  }
}
