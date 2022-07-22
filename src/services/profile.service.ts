import { ProfileStatus, ProjectProfile } from "@/entities/projectProfile.entity";
import { HttpException } from "@/exceptions/HttpException";
import { DI } from "@/mikro-orm.config";
import { Collection, wrap } from "@mikro-orm/core";
import { EntityRepository } from "@mikro-orm/postgresql";
import Container, { Service } from "typedi";
import { ProfileCreateDto } from "../dtos/profileCreate.dto";
import { ProfileSearchDto } from "../dtos/profileSearch.dto";
import { Profile } from "../entities/profile.entity";
import { ProfileRepository } from "../repositories/profile.repository";

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

  public async update(profileId: number, params: ProfileCreateDto): Promise<Profile> {
    const profile: Profile = await this.profileRepository.findOne({ id: profileId })

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

  public async getInvites(profile: Profile) {
    const loadedProfile = await wrap(profile).init()
    const projects = await loadedProfile.projects.init()

    const invites = await projects.matching({ where: { status: ProfileStatus.INVITED } })
    if (invites.length === 0) {
      throw new HttpException(404, 'No invites found')
    }

    return invites
  }

}
