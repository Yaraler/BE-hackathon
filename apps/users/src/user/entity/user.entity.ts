import { Bridage } from "apps/bridage/src/bridage/entity/bridage.entity";
import { DailyWorkouts } from "apps/workouts/src/daily-workouts/entity/daily-workouts.entity";
import { Column, Entity, ObjectIdColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { ObjectId } from 'mongodb';

@Entity('users')
export class User {
  @ObjectIdColumn()
  _id: ObjectId;
  @Column()
  email: string;
  @Column()
  name: string
  @Column()
  password: string
  @OneToOne(() => Bridage, bridage => bridage.user)
  bridage: Bridage;
  @OneToMany(() => DailyWorkouts, workout => workout._id)
  dailyWorkout: DailyWorkouts[];
  @Column()
  refreshToken: string;
}
