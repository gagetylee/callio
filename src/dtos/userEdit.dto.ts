import { IsEmail, IsOptional, IsString } from 'class-validator'

export class UserEditDto {
  @IsString()
  @IsOptional()
  public username?: string
}
