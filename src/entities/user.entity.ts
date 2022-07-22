import { Entity, OneToOne, PrimaryKey, Property } from "@mikro-orm/core";
import { ProfileCreateDto } from "../dtos/profileCreate.dto";
import { Profile } from "./profile.entity";
import { IUser } from "../interfaces/user.interface";

@Entity()
export class User {
  constructor(profileData?: ProfileCreateDto) {
    this.profile = new Profile(profileData)
  }

  @PrimaryKey()
    id!: number

  @OneToOne({wrappedReference: true})
    profile!: Profile;

  @Property({ type: 'text', unique: true })
    username!: string;

  @Property({ type: 'text', unique: true })
    email!: string;

  @Property({ type: 'text' })
    password!: string;

  @Property({ name: 'created_at', onCreate: () => new Date() })
    createdAt: Date = new Date()

  @Property({ name: 'updated_at', onUpdate: () => new Date() })
    updatedAt: Date = new Date()
}
