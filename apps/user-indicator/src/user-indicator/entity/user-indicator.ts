import { User } from "apps/users/src/user/entity/user.entity";
import { ObjectId } from "mongodb";
import { Column, Entity, JoinColumn, ManyToOne, ObjectIdColumn } from "typeorm";

@Entity("requirements-brigade")
export class UserIndicator {
  @ObjectIdColumn()
  _id: ObjectId;
  @Column()
  name: string
  @Column()
  description: string
  @Column()
  userId: ObjectId;
}

