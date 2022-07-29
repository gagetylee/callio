import { ProfileCreateDto } from "./dto/profileCreate.dto";
import { ProfileSearchDto } from "./dto/profileSearch.dto";
import { Profile } from "./profile.entity";
import { ProfileRepository } from "./profile.repository";
export declare class ProfileService {
    readonly profileRepository: ProfileRepository;
    findOne(username: string): Promise<Profile>;
    search(params: ProfileSearchDto): Promise<Profile[]>;
    update(userId: number, params: ProfileCreateDto): Promise<Profile>;
}
