import { Collection } from "@mikro-orm/core";
import { Profile } from "../profile/profile.entity";
import { ProjectCreateDto } from "./dto/projectCreate.dto";
export declare class Project {
    constructor(creator: Profile, { name, description, minUsers, maxUsers }: ProjectCreateDto);
    id: number;
    userProfiles: Collection<Profile, unknown>;
    name: string;
    description: string;
    minimumUsers: number;
    maximumUsers: number;
}
