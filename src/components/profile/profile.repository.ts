import { DI } from "@/mikro-orm.config";
import { EntityRepository, PostgreSqlDriver, QueryBuilder } from "@mikro-orm/postgresql";
import { Service } from "typedi";
import { ProfileSearchDto } from "./dto/profileSearch.dto";
import { Profile } from "./profile.entity";

export class ProfileRepository extends EntityRepository<Profile> {
  private queryBuilder = this.em.createQueryBuilder(Profile)

  public async search(params: ProfileSearchDto) {
    const conn = this.em.getConnection()
    const knex = conn.getKnex()

    const knexQuery = knex.queryBuilder()
    .with('user_collection', (qb) => {
      qb.select('username', 'profile_id')
      qb.from('user')
    })
    .select('username', 'first_name', 'last_name')
    .from('profile')
    .leftJoin('user', { 'user.profile_id' : 'profile.id' })


    // Apply search filter
    if (params.search) {
      knexQuery.andWhereLike('user.username' ,`%${params.search}%`)
    }

    const res = await knexQuery
    
    return res.map(raw => {
      return <Profile> {
        firstName: raw.first_name,
        lastName: raw.last_name,
        user: {
          username: raw.username
        }
      }
    })
  }
}