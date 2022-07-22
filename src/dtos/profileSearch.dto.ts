import { IsNumber, IsOptional, IsString } from "class-validator";

export class ProfileSearchDto {
  @IsOptional()
  @IsString()
    search: string
  
  @IsOptional()
  @IsNumber()
    limit?: number
}