import { Collection } from "@mikro-orm/core";
import { EntityRepository } from "@mikro-orm/postgresql";
import { profile } from "console";
import { ProjectUser } from "../entities/projectUser.entity";
import { Project } from "../entities/project.entity";
import { IProject } from "../interfaces/project.interface";

export class ProjectRepository extends EntityRepository<Project> {
  private conn = this.em.getConnection()
  private knex = this.conn.getKnex()

  public async findOneById(id: number) {
    const projectQuery = this.knex.queryBuilder()
      .select('p.id', 'p.name', 'p.description', this.knex.raw(`
        json_agg(
          json_build_object(
              'id', u.id,
              'username', u.username,
              'isAdmin', pu.is_admin,
              'status', pu.status
          )
        ) as users
      `))
      .from('project as p')
      .join('project_user as pu', { 'p.id': 'pu.project_id' })
      .join('user as u', { 'u.id': 'pu.user_id' })
      .where('p.id', id)
      .groupBy('p.id')

    const projectRes = await projectQuery

    return projectRes.map(raw => {
      return <IProject> {
        id: raw.id,
        name: raw.name,
        description: raw.description,
        users: raw.users
      }
    })[0]
  }
}
