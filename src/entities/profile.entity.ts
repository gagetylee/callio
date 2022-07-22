import { Collection, Entity, EntityRepositoryType, ManyToMany, OneToMany, OneToOne, PrimaryKey, Property } from "@mikro-orm/core";
import { Project } from "./project.entity";
import { UserCreateDto } from "../dtos/userCreate.dto";
import { User } from "./user.entity";
import { ProfileCreateDto } from "../dtos/profileCreate.dto";
import { ProfileRepository } from "../repositories/profile.repository";
// import { ProjectProfile } from "../project/projectProfile.entity";
import { ProjectProfile } from "./projectProfile.entity";

@Entity({ customRepository: () => ProfileRepository })
export class Profile {
  [EntityRepositoryType]?: ProfileRepository

  constructor({ firstName, lastName }: ProfileCreateDto){
    this.firstName = firstName
    this.lastName = lastName
  }

  @PrimaryKey()
    id: number

  @OneToOne({ type: 'User', mappedBy: 'profile' })
    user!: User

  @OneToMany(() => ProjectProfile, projectProfile => projectProfile.profile)
    projects = new Collection<ProjectProfile>(this)

  @Property({ nullable: true })
    firstName?: string

  @Property({ nullable: true })
    lastName?: string

  @Property({ nullable: true })
    bio?: string

  @Property({ nullable: true })
    location?: string
}
