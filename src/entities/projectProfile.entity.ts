import { Entity, Enum, IdentifiedReference, ManyToOne, PrimaryKey, PrimaryKeyType, Property, Reference, wrap } from "@mikro-orm/core";
import { Profile } from "./profile.entity";
import { Project } from "./project.entity";

@Entity()
export class ProjectProfile {
  constructor(project: Project, profile: Profile, status: ProfileStatus, isAdmin: boolean) {
    this.project = Reference.create(project)
    this.profile = Reference.create(profile)
    this.status = status
    this.isAdmin = isAdmin
  }
  @PrimaryKey({ autoincrement: true })
    id!: number

  @ManyToOne({ entity: () => Profile, primary: true })
    profile!: IdentifiedReference<Profile>

  @ManyToOne({ entity: () => Project, primary: true })
    project!: IdentifiedReference<Project>

  @Enum(() => ProfileStatus)
    status!: ProfileStatus

  @Property()
    isAdmin!: boolean

  [PrimaryKeyType]?: [number, number];
}

export enum ProfileStatus {
  INVITED = 'invited',
  INACTIVE = 'inactive',
  ACTIVE = 'active',
}