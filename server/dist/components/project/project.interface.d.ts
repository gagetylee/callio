import { Collection } from "@mikro-orm/core";
import { User } from "../user/user.entity";
export interface IProject {
    id: number;
    name: string;
    description: string;
    users: Collection<User>;
}
