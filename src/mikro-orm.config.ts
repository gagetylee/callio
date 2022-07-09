import { MikroORM, Options, ReflectMetadataProvider, EntityManager } from "@mikro-orm/core";
import { EntityRepository} from "@mikro-orm/postgresql";
import { User } from "./components/user/user.entity";
import {DB_HOST, DB_NAME, DB_PORT, NODE_ENV} from "@/config";

const config: Options = {
  entities: [User],
  dbName: DB_NAME,
  host: DB_HOST,
  port: parseInt(DB_PORT),
  type: 'postgresql',
  metadataProvider: ReflectMetadataProvider,
  debug: NODE_ENV != 'production',
  forceUtcTimezone: true
}

export const DI = {} as {
  orm: MikroORM;
  em: EntityManager;
  userRepository: EntityRepository<User>;
};

export default config
