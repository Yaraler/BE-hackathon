import { Column, Entity, ManyToOne, ObjectIdColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { ObjectId } from 'mongodb';
import { Role } from "@libs/enum/role.enum";

@Entity('users')
export class User {
  @ObjectIdColumn()
  _id: string;
  @Column()
  email: string;
  @Column()
  name: string
  @Column()
  icon: string
  @Column()
  password: string
  @Column()
  brigadeId: string
  @Column()
  DailyWorkoutsIds?: string[];
  @Column()
  FirstWorkoutICheckndicatorId?: string //  DailyWorkoutsIds
  @Column({ default: false })
  state: boolean
  @Column()
  refreshToken: string;
  @Column({ default: "user" })
  role: Role
}
