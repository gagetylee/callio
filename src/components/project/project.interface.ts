import { Profile } from "../profile/profile.entity"
import { ProjectMember } from "../projectMember/projectMember.entity"

export interface IProject{
  id: number
  name: string
  projectMembers: ProjectMember[]
}