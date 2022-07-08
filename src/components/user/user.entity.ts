import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, Unique, CreateDateColumn, UpdateDateColumn } from "typeorm"
import { IUser } from "./user.interface";

@Entity()
export class User extends BaseEntity implements IUser {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ type: 'text', name: 'first_name' })
  firstName!: string;

  @Column({ type: 'text', name: 'last_name' })
  lastName!: string;

  @Column({ type: 'text', unique: true })
  email: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}