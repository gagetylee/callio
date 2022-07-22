import { Collection, Entity, EntityRepositoryType, ManyToMany, ManyToOne, OneToMany, PrimaryKey, Property } from "@mikro-orm/core";
import { Profile } from "./profile.entity";
import { ProfileStatus, ProjectProfile } from "./projectProfile.entity";
import { ProjectCreateDto } from "../dtos/projectCreate.dto";
import { ProjectRepository } from "../repositories/project.repository";

@Entity({ customRepository: () => ProjectRepository })
export class Project {
  [EntityRepositoryType]?: ProjectRepository

  constructor(creator: Profile, { name, description, minUsers, maxUsers }: ProjectCreateDto) {
    this.profiles.add(new ProjectProfile(this, creator, ProfileStatus.ACTIVE, true))

    // this.profiles.add(creator)
    this.name = name
    this.description = description
    this.minimumUsers = minUsers || 1
    this.maximumUsers = maxUsers || 2
  }

  @PrimaryKey()
    id!: number

  @OneToMany(() => ProjectProfile, projectProfile => projectProfile.project)
    profiles = new Collection<ProjectProfile>(this)

  @Property({ unique: true })
    name!: string

  @Property()
    description: string

  @Property({ name: 'minimum_users' })
    minimumUsers!: number

  @Property({ name: 'maximum_users' })
    maximumUsers: number

}
