import { Profile } from '@/components/profile/profile.entity'
import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator'

export class CreateUserDto {
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