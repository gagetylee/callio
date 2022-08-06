import { User } from "../entities/user.entity"
import { ProjectUser } from "../entities/projectUser.entity"

export interface IProject{
  id: number,
  name: string,
  description: string,
  users: User[]
}
