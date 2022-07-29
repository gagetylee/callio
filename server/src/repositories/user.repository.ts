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

  public async findInvites(userId: number): Promise<Project[]> {
    const conn = this.em.getConnection()
    const knex = conn.getKnex()

    const query = knex.queryBuilder()
      .select('p.id', 'p.name')
      .from('project as p')
      .join('project_user as pu', { 'p.id': 'pu.project_id' })
      .where('pu.status', ProjectUserStatus.INVITED)
      .andWhere('pu.user_id', userId)
    
    const res = await query

    const projectArray = res.map(raw => {
      return <Project> {
        id: raw.id,
        name: raw.name
      }
    })

    return projectArray
  }
}
