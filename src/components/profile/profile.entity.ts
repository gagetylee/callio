import { Collection, Entity, EntityRepositoryType, ManyToMany, OneToMany, OneToOne, PrimaryKey, Property } from "@mikro-orm/core";
import { Project } from "../project/project.entity";
import { CreateUserDto } from "../user/dto/createUser.dto";
import { User } from "../user/user.entity";
import { ProfileCreateDto } from "./dto/profileCreate.dto";
import { ProfileRepository } from "./profile.repository";
// import { ProjectProfile } from "../project/projectProfile.entity";
import { ProjectMember } from "../projectMember/projectMember.entity";

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
  
  @OneToMany(() => ProjectMember, projectMember => projectMember.profile)
    projectMember = new Collection<ProjectMember>(this)
  
  @Property({ nullable: true })
    firstName?: string

  @Property({ nullable: true })
    lastName?: string

  @Property({ nullable: true })
    bio?: string
  
  @Property({ nullable: true })
    location?: string
}