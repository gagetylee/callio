import { Project } from "@/entities/project.entity";
import { ProjectUserStatus } from "@/entities/projectUser.entity";
import { User } from "@/entities/user.entity";
import { Collection } from "@mikro-orm/core";
import { EntityRepository, PostgreSqlDriver, QueryBuilder } from "@mikro-orm/postgresql";

export class UserRepository extends EntityRepository<User> {
  
  // public async search(params: ProfileSearchDto) {
  //   const conn = this.em.getConnection()
  //   const knex = conn.getKnex()
  //   return null
  // }

  public async findInvites(userId: number, projectId?: number): Promise<Project[]> {
    const conn = this.em.getConnection()
    const knex = conn.getKnex()

    const query = knex.queryBuilder()
      .select('p.id', 'p.name')
      .from('project as p')
      .join('project_user as pu', { 'p.id': 'pu.project_id' })
      .where('pu.user_id', userId)
      .andWhere('pu.status', 'invited')

      if (projectId != null) {
        query.where((qb) => {
          qb.andWhere('pu.project_id', projectId)
        })
      }
      
    const res = await query

    const projectArray = res.map(raw => {
      return <Project> {
        id: raw.id,
        name: raw.name
      }
    })
    return projectArray
  }

  public async findOneInvite(userId: number, projectId: number) {
    const conn = this.em.getConnection()
    const knex = conn.getKnex()

    const query = knex.queryBuilder()
      .select()

  }
}
