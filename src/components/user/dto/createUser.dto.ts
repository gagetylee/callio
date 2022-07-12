import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator'

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  public firstName: string

  @IsString()
  @IsNotEmpty()
  public lastName: string

  @IsEmail()
  public email: string

  @IsString()
  @MinLength(8, {message: 'Password must be at least 8 characters'})
  public password: string
}