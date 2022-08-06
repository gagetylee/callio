import { Entity, Enum, IdentifiedReference, ManyToOne, PrimaryKey, PrimaryKeyType, Property, Reference, wrap } from "@mikro-orm/core";
import { User } from "./user.entity";
import { Project } from "./project.entity";
import { BaseEntity } from "./base.entity";

@Entity()
export class ProjectUser extends BaseEntity {
  
  @PrimaryKey({ autoincrement: true })
    id!: number

  @ManyToOne(() => User, { primary: true, wrappedReference: true } )
    user!: IdentifiedReference<User>

  @ManyToOne(() => Project, { primary: true, wrappedReference: true })
    project!: IdentifiedReference<Project>

  @Enum(() => ProjectUserStatus)
    status!: ProjectUserStatus

  @Property()
    isAdmin!: boolean

  [PrimaryKeyType]?: [number, number];
  constructor(project: Project, user: User, status: ProjectUserStatus, isAdmin: boolean) {
    super()
    this.project = Reference.create(project)
    this.user = Reference.create(user)
    this.status = status
    this.isAdmin = isAdmin
  }
}

export enum ProjectUserStatus {
  INVITED = 'invited',
  INACTIVE = 'inactive',
  ACTIVE = 'active',
}