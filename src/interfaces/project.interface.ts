import { Profile } from "../entities/profile.entity"
import { ProjectProfile } from "../entities/projectProfile.entity"

export interface IProject{
  id: number
  name: string
  profiles: Profile[]
}
