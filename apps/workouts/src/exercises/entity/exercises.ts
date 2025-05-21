import { ObjectId } from "mongodb";
import { Column, Entity, ObjectIdColumn } from "typeorm";

@Entity("exercises")
export class Exercises {
  @ObjectIdColumn()
  _id: string;
  @Column()
  exercise: string
  @Column()
  name: string
  @Column()
  count?: string | null
  @Column()
  userCount?: string
  @Column()
  comment?: string
  @Column()
  imgUrl?: string
  @Column()
  state: boolean
  @Column()
  description?: string
  @Column()
  videoLink?: string

}

