import { User } from "apps/users/src/user/entity/user.entity";
import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class DailyWorkouts {
  @PrimaryGeneratedColumn()
  _id: number;
  @ManyToOne(() => User, user => user._id)
  user: User
}
