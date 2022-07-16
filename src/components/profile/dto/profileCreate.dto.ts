import { IsOptional, IsString } from "class-validator";

export class CreateProfileDto {
  @IsOptional()
  @IsString()
  first_name: string

  @IsOptional()
  @IsString()
  last_name: string
}