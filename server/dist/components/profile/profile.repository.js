"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileRepository = void 0;
const postgresql_1 = require("@mikro-orm/postgresql");
const profile_entity_1 = require("./profile.entity");
class ProfileRepository extends postgresql_1.EntityRepository {
    constructor() {
        super(...arguments);
        this.queryBuilder = this.em.createQueryBuilder(profile_entity_1.Profile);
    }
    async search(params) {
        const conn = this.em.getConnection();
        const knex = conn.getKnex();
        const knexQuery = knex.queryBuilder()
            .with('user_collection', (qb) => {
            qb.select('username', 'profile_id');
            qb.from('user');
        })
            .select('username', 'first_name', 'last_name')
            .from('profile')
            .leftJoin('user', { 'user.profile_id': 'profile.id' });
        if (params.search) {
            knexQuery.andWhereLike('user.username', `%${params.search}%`);
        }
        const res = await knexQuery
            .limit(params.limit || 25);
        return res.map(raw => {
            return {
                firstName: raw.first_name,
                lastName: raw.last_name,
                user: {
                    username: raw.username
                }
            };
        });
    }
}
exports.ProfileRepository = ProfileRepository;
//# sourceMappingURL=profile.repository.js.map