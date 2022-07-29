import { ProfileCreateDto } from "../profile/dto/profileCreate.dto";
import { Profile } from "../profile/profile.entity";
export declare class User {
    constructor(profileData?: ProfileCreateDto);
    id: number;
    profile: Profile;
    username: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}
