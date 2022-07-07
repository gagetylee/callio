import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from "typeorm"

@Entity()
export class User extends BaseEntity {
  
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ type: 'text' })
  first_name!: string;

  @Column({ type: 'text' })
  last_name!: string;

  @Column({ type: 'text' })
  email!: string;
}