import { IsEmail, IsOptional, IsString } from 'class-validator'

export class EditUserDto {
  @IsString()
  @IsOptional()
  public firstName?: string

  @IsString()
  @IsOptional()
  public lastName?: string
}