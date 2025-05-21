import { ObjectId } from "mongodb";
import { Column, Entity, ObjectIdColumn } from "typeorm";

@Entity("exercise-templates")
export class ExercisesTemplates {
  @ObjectIdColumn()
  _id: string;
  @Column()
  name: string;
  @Column()
  imgUrl: string
  @Column()
  type: string
  @Column()
  engName: string
  @Column()
  videoUrl: string
}

