import { Collection, EntityRepositoryType } from "@mikro-orm/core";
import { Project } from "../project/project.entity";
import { User } from "../user/user.entity";
import { ProfileCreateDto } from "./dto/profileCreate.dto";
import { ProfileRepository } from "./profile.repository";
export declare class Profile {
    [EntityRepositoryType]?: ProfileRepository;
    constructor({ firstName, lastName }: ProfileCreateDto);
    id: number;
    user: User;
    projects: Collection<Project, unknown>;
    firstName?: string;
    lastName?: string;
    bio?: string;
    location?: string;
}
