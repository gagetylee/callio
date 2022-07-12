import { JWT_SECRET } from "@/config";
import { HttpException } from "@/exceptions/HttpException";
import { DI } from "@/mikro-orm.config";
import { DataStoredInToken, UserRequest } from "@/util/auth.interface";
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

const authorize = async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization.split(' ')[1]
    
    if (token) {
      const secretKey: string = JWT_SECRET
      const verificationResponse = verify(token, secretKey) as DataStoredInToken

      const userId: number = verificationResponse.id
      const findUser = await DI.userRepository.findOne({ id: userId })

      if (findUser) {
        req.user = findUser
        next()
      } else {
        next(new HttpException(401, 'Wrong authentication token'))
      }
    } else {
      next(new HttpException(401, 'Authentication token missing'))
    }
  } catch (error) {
    next(new HttpException(401, 'Authentication token missing'))
  }
}

export default authorize