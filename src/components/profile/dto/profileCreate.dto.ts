import { IsOptional, IsString } from "class-validator";

export class ProfileCreateDto {
  @IsOptional()
  @IsString()
  firstName: string

  @IsOptional()
  @IsString()
  lastName: string
}