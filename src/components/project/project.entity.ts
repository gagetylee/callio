import { Collection, Entity, EntityRepositoryType, ManyToMany, ManyToOne, OneToMany, PrimaryKey, Property } from "@mikro-orm/core";
import { Profile } from "../profile/profile.entity";
import { ProjectMember } from "../projectMember/projectMember.entity";
import { ProjectCreateDto } from "./dto/projectCreate.dto";
import { ProjectRepository } from "./project.repository";

@Entity({ customRepository: () => ProjectRepository })
export class Project {
  [EntityRepositoryType]?: ProjectRepository
  
  constructor(creator: Profile, { name, description, minUsers, maxUsers }: ProjectCreateDto) {
    const projectMember: ProjectMember = new ProjectMember(this, creator, true)

    this.projectMembers.add(projectMember)
    this.name = name
    this.description = description
    this.minimumUsers = minUsers || 1
    this.maximumUsers = maxUsers || 2
  }

  @PrimaryKey()
    id!: number

  @OneToMany({ entity: () => ProjectMember, mappedBy: 'project', orphanRemoval: true })
    projectMembers = new Collection<ProjectMember>(this)

  @Property({ unique: true })
    name!: string

  @Property()
    description: string
  
  @Property({ name: 'minimum_users' })
    minimumUsers!: number
  
  @Property({ name: 'maximum_users' })
    maximumUsers: number

}