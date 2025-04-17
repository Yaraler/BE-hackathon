import { User } from "apps/users/src/user/entity/user.entity";
import { Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";



@Entity()
export class Bridage {
  @PrimaryGeneratedColumn()
  _id: number;
  @OneToOne(() => User, user => user.bridage)
  user: User;
}

