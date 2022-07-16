import { HttpException } from "@/exceptions/HttpException";
import { DI } from "@/mikro-orm.config";
import { wrap } from "@mikro-orm/core";
import { EntityRepository } from "@mikro-orm/postgresql";
import Container, { Service } from "typedi";
import { ProfileCreateDto } from "./dto/profileCreate.dto";
import { ProfileSearchDto } from "./dto/profileSearch.dto";
import { Profile } from "./profile.entity";
import { ProfileRepository } from "./profile.repository";

@Service()
export class ProfileService {
  readonly profileRepository: ProfileRepository = DI.profileRepository

  public async findOne(username: string): Promise<Profile> {
    const profile = await this.profileRepository.findOne({ user: { username } })

    if (!profile) throw new HttpException(404, 'Profile not found')

    return profile
  }

  public async search(params: ProfileSearchDto): Promise<Profile[]> {
    params.search = params.search.toLowerCase()

    const profiles: Profile[] = await this.profileRepository.search(params)

    if (profiles.length === 0) {
      throw new HttpException(404, 'No matching profiles found')
    }
    
    return profiles
  }

  public async update(userId: number, params: ProfileCreateDto): Promise<Profile> {
    const profile: Profile = await this.profileRepository.findOne({ id: userId })

    if (!profile) {
      throw new HttpException(404, 'Profile not found')
    }

    // Set parameters of type string to null if they are empty
    for (let key in params) {
      if (typeof params[key] === 'string' && params[key].length === 0) {
        params[key] = null
      }
    }

    const updatedProfile = wrap(profile).assign(params)
    this.profileRepository.flush()

    return updatedProfile
  }
}