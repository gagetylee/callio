import { Collection } from "@mikro-orm/core";
import { EntityRepository } from "@mikro-orm/postgresql";
import { profile } from "console";
import { ProjectUser, ProjectUserStatus } from "../entities/projectUser.entity";
import { Project } from "../entities/project.entity";
import { IProject } from "../interfaces/project.interface";
import { User } from "@/entities/user.entity";

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

  public async findMembers(id: number, status?: ProjectUserStatus) {
    const projectQuery = this.knex.queryBuilder()
      .select('u.id', 'u.username', 'pu.status')
      .from('user as u')
      .innerJoin('projectUser as pu', { 'u.id': 'pu.user' })
      .innerJoin('project as p', { 'p.id': 'pu.project' })
      .where('p.id', id)

      // Add filters
      if (status !== null) {
        projectQuery.where((qb) => {
          qb.andWhere('status', status)
        })
      }

      const res = await projectQuery

      return res.map(raw => {
        return <User> {
          id: raw.id,
          username: raw.username
        }
      })
  }

}
