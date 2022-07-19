import { Entity, ManyToOne, PrimaryKey, PrimaryKeyType, Property } from "@mikro-orm/core";
import { Profile } from "../profile/profile.entity";
import { Project } from "../project/project.entity";

@Entity()
export class ProjectMember {
  constructor(project: Project, profile: Profile, isAdmin: boolean) {
    this.project = project
    this.profile = profile
    this.isAdmin = isAdmin
  }

  @ManyToOne({ entity: () => Profile, primary: true })
    profile: Profile
    
  @ManyToOne({ entity: () => Project, primary: true })
    project: Project

  @Property()
    isAdmin: boolean

  [PrimaryKeyType]?: [number, number];
}