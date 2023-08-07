import { IsNumber, IsOptional, IsPositive, IsString } from "class-validator";

export class ProjectInviteDto {
  @IsNumber()
  profileId: number
}