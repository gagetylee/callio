import { HttpException } from "@/exceptions/HttpException";
import { DI } from "@/mikro-orm.config";
import { EntityRepository } from "@mikro-orm/postgresql";
import Container, { Service } from "typedi";
import { ProfileSearchDto } from "./dto/profileSearch.dto";
import { Profile } from "./profile.entity";
import { ProfileRepository } from "./profile.repository";

@Service()
export class ProfileService {
  readonly profileRepository: ProfileRepository = DI.profileRepository

  public async findOne(id: number): Promise<Profile> {
    const profile = await this.profileRepository.findOne(id)

    if (!profile) throw new HttpException(404, 'Profile not found')

    return profile
  }

  public async search(params: ProfileSearchDto): Promise<Profile[]> {
    const profiles: Profile[] = await this.profileRepository.search(params)

    if (profiles.length === 0) {
      throw new HttpException(404, 'No matching profiles found')
    }
    
    return profiles
  }
}