import { Profile } from "../profile/profile.entity";
import { ProjectCreateDto } from "./dto/projectCreate.dto";
import { Project } from "./project.entity";
export declare class ProjectService {
    private projectRepository;
    getAll(): Promise<Project[]>;
    create(profile: Profile, projectData: ProjectCreateDto): Promise<Project>;
    inviteUser(projectId: number, profile: Profile, invitee: Profile): Promise<any>;
}
