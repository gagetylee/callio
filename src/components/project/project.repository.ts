import { Collection } from "@mikro-orm/core";
import { EntityRepository } from "@mikro-orm/postgresql";
import { profile } from "console";
import { Profile } from "../profile/profile.entity";
import { ProjectMember } from "../projectMember/projectMember.entity";
import { Project } from "./project.entity";
import { IProject } from "./project.interface";

export class ProjectRepository extends EntityRepository<Project> {
  private conn = this.em.getConnection()
  private knex = this.conn.getKnex()

  public async findOneA(id: number): Promise<any> {
    const projectQuery = this.knex.queryBuilder()
      .select('project.id', 'project.name', 'profile.first_name')
      .from('project')
      .join('project_member as pm', { 'project.id': 'pm.project_id' })
      .join('profile', { 'pm.profile_id': 'profile.id' })
      .where('project.id', id)

    
    const projectRes = await projectQuery

    return projectRes.map(raw => {
      return <Project> {
        id: 1,
        name: raw.name
      }
    })
  }
}