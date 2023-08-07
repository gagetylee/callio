import { IsEmail, IsOptional, IsString } from 'class-validator'

export class UserUpdateDto {

  @IsString()
  @IsOptional()
  public firstName?: string

  @IsString()
  @IsOptional()
  public lastName?: string

}
