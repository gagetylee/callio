import { UserRepository } from "@/repositories/user.repository";
import { Collection, Entity, EntityRepositoryType, ManyToOne, OneToMany, OneToOne, PrimaryKey, Property } from "@mikro-orm/core";
import { ProfileCreateDto } from "../dtos/profileCreate.dto";
import { IUser } from "../interfaces/user.interface";
import { BaseEntity } from "./base.entity";
import { ProjectUser } from "./projectUser.entity";

@Entity({ customRepository: () => UserRepository })
export class User extends BaseEntity {
  [EntityRepositoryType]?: UserRepository

  @PrimaryKey()
    id!: number

  @OneToMany(() => ProjectUser, projectUser => projectUser.user, { hidden: true })
    projectUsers = new Collection<ProjectUser>(this)

  @Property({ type: 'text', unique: true })
    username!: string;

  @Property({ nullable: true, fieldName: 'first_name' })
    firstName: string

  @Property({ nullable: true, fieldName: 'last_name' })
    lastName: string

  @Property({ type: 'text', unique: true })
    email!: string;

  @Property({ type: 'text', hidden: true })
    password!: string;
}
