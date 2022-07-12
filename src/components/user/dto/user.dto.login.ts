import { IsString } from "class-validator";

export class UserLoginDto {
  @IsString({ message: 'Invalid credentials' })
  email: string

  @IsString({ message: 'Invalid credentials' })
  password: string
}