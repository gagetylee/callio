import { MikroORM, Options, ReflectMetadataProvider } from "@mikro-orm/core";
import { EntityRepository, PostgreSqlDriver, EntityManager } from "@mikro-orm/postgresql";
import { User } from "./entities/user.entity";
import {DB_HOST, DB_NAME, DB_PORT, NODE_ENV} from "@/config";
import { TSMigrationGenerator } from "@mikro-orm/migrations";
import { Profile } from "./entities/profile.entity";
import { ProfileRepository } from "./repositories/profile.repository";
import { Project } from "./entities/project.entity";
import { ProjectProfile } from "./entities/projectProfile.entity";
import { ProjectRepository } from "./repositories/project.repository";
// import { ProjectProfile } from "./components/project/projectProfile.entity";

const config: Options<PostgreSqlDriver> = {
  entities: [User, Profile, Project, ProjectProfile],
  dbName: DB_NAME,
  host: DB_HOST,
  port: parseInt(DB_PORT),
  type: 'postgresql',
  metadataProvider: ReflectMetadataProvider,
  debug: NODE_ENV != 'production',
  forceUtcTimezone: true,
  migrations: {
    tableName: 'mikro_orm_migrations', // name of database table with log of executed transactions
    path: './src/migrations', // path to the folder with migrations
    //pathTs: undefined, // path to the folder with TS migrations (if used, we should put path to compiled files in `path`)
    glob: '!(*.d).{js,ts}', // how to match migration files (all .js and .ts files, but not .d.ts)
    transactional: true, // wrap each migration in a transaction
    disableForeignKeys: true, // wrap statements with `set foreign_key_checks = 0` or equivalent
    allOrNothing: true, // wrap all migrations in master transaction
    dropTables: true, // allow to disable table dropping
    safe: false, // allow to disable table and column dropping
    snapshot: true, // save snapshot when creating new migrations
    emit: 'ts', // migration generation mode
    generator: TSMigrationGenerator, // migration generator, e.g. to allow custom formatting
  },
}

export const DI = {} as {
  orm: MikroORM<PostgreSqlDriver>;
  em: EntityManager;
  userRepository: EntityRepository<User>;
  profileRepository: ProfileRepository;
  projectRepository: ProjectRepository;
  // profileProjectRepository: EntityRepository<ProfileProject>
};

export default config
