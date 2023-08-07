import { IsNumber, IsOptional, IsPositive, IsString } from "class-validator";

export class ProjectCreateDto {
  @IsString()
  name: string

  @IsOptional()
  @IsString()
  description?: string

  @IsOptional()
  @IsNumber()
  @IsPositive()
  minUsers?: number

  @IsOptional()
  @IsNumber()
  @IsPositive()
  maxUsers?: number
}