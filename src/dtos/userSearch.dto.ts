import { IsNumber, IsOptional, IsString } from "class-validator";

export class UserSearchDto {
  @IsOptional()
  @IsString()
    search: string
  
  @IsOptional()
  @IsNumber()
    limit?: number
}