import { Collection, Entity, EntityRepositoryType, ManyToMany, ManyToOne, OneToMany, PrimaryKey, Property } from "@mikro-orm/core";
import { User } from "./user.entity";
import { ProjectUserStatus, ProjectUser } from "./projectUser.entity";
import { ProjectCreateDto } from "../dtos/projectCreate.dto";
import { ProjectRepository } from "../repositories/project.repository";
import { BaseEntity } from "./base.entity";

@Entity({ customRepository: () => ProjectRepository })
export class Project extends BaseEntity {
  [EntityRepositoryType]?: ProjectRepository

  @PrimaryKey()
    id!: number

  @OneToMany(() => ProjectUser, projectUser => projectUser.project, { hidden: true })
    projectUsers = new Collection<ProjectUser>(this)

  @Property({ unique: true })
    name!: string

  @Property()
    description: string

  @Property({ name: 'minimum_users' })
    minimumUsers!: number

  @Property({ name: 'maximum_users' })
    maximumUsers: number

    constructor(creator: User, { name, description, minUsers, maxUsers }: ProjectCreateDto) {
      super()
      this.projectUsers.add(new ProjectUser(this, creator, ProjectUserStatus.ACTIVE, true))
      this.name = name
      this.description = description
      this.minimumUsers = minUsers || 1
      this.maximumUsers = maxUsers || 2
    }
}
