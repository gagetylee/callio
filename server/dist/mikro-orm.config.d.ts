import { MikroORM, Options } from "@mikro-orm/core";
import { EntityRepository, PostgreSqlDriver, EntityManager } from "@mikro-orm/postgresql";
import { User } from "./components/user/user.entity";
import { ProfileRepository } from "./components/profile/profile.repository";
import { Project } from "./components/project/project.entity";
import { ProfileProject } from "./components/profile/profileProject.entity";
declare const config: Options<PostgreSqlDriver>;
export declare const DI: {
    orm: MikroORM<PostgreSqlDriver>;
    em: EntityManager;
    userRepository: EntityRepository<User>;
    profileRepository: ProfileRepository;
    projectRepository: EntityRepository<Project>;
    profileProjectRepository: EntityRepository<ProfileProject>;
};
export default config;
