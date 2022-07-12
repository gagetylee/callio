import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { IUser } from "./user.interface";

@Entity()
export class User {
  @PrimaryKey()
  id!: number

  @Property({ type: 'text', name: 'first_name' })
  firstName!: string;

  @Property({ type: 'text', name: 'last_name' })
  lastName!: string;

  @Property({ type: 'text', unique: true })
  email: string;

  @Property({ type: 'text' })
  password: string;

  @Property({ name: 'created_at', onCreate: () => new Date() })
  createdAt: Date = new Date()

  @Property({ name: 'updated_at', onUpdate: () => new Date() })
  updatedAt: Date = new Date()
}
