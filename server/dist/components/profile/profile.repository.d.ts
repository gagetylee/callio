import { EntityRepository } from "@mikro-orm/postgresql";
import { ProfileSearchDto } from "./dto/profileSearch.dto";
import { Profile } from "./profile.entity";
export declare class ProfileRepository extends EntityRepository<Profile> {
    private queryBuilder;
    search(params: ProfileSearchDto): Promise<Profile[]>;
}
