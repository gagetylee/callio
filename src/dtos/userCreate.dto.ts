import { Profile } from '@/entities/profile.entity'
import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator'

export class UserCreateDto {
  @IsString()
  @IsNotEmpty()
  public username: string

  @IsEmail()
  public email: string

  @IsString()
  @MinLength(8, {message: 'Password must be at least 8 characters'})
  public password: string

  @IsOptional()
  public profile: Profile
}
