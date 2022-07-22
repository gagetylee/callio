import { Collection } from "@mikro-orm/core";
import { EntityRepository } from "@mikro-orm/postgresql";
import { profile } from "console";
import { Profile } from "../entities/profile.entity";
import { ProjectProfile } from "../entities/projectProfile.entity";
import { Project } from "../entities/project.entity";
import { IProject } from "../interfaces/project.interface";

export class ProjectRepository extends EntityRepository<Project> {
  private conn = this.em.getConnection()
  private knex = this.conn.getKnex()

  public async findOneById(id: number) {
    // const projectQuery = this.knex.queryBuilder()
    //   .with('profile_interface', (qb) => {
    //     qb.select('p.id', 'p.first_name', 'p.last_name')
    //     qb.from('profile as p')
    //   })
    //   .select('project.id', 'project.name', this.knex.raw(`
    //     json_agg(
    //       json_build_object(
    //           'id', p.id,
    //           'firstName', p.first_name,
    //           'lastName', p.last_name,
    //           'isAdmin', pm.is_admin
    //       )
    //     ) as profiles
    //   `))
    //   .from('project')
    //   .join('project_member as pm', { 'project.id': 'pm.project_id' })
    //   .join('profile_interface as p', { 'pm.profile_id': 'p.id' })
    //   .where('project.id', id)
    //   .groupBy('project.id')

    // const projectRes = await projectQuery

    // return projectRes.map(raw => {
    //   return <Project> {
    //     id: 1,
    //     name: raw.name,
    //     profiles: raw.profiles
    //   }
    // })[0]
  }
}
