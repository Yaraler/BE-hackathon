import { User } from "apps/users/src/user/entity/user.entity";
import { Column, Entity, ObjectIdColumn, OneToMany, } from "typeorm";
import { ObjectId } from "mongodb";
import { Expose } from "class-transformer";
import { RequirementsBrigade } from "../../requirements_brigade/entity/requirements-brigade.entity";



@Entity("brigade")
export class Brigade {
  @ObjectIdColumn()
  @Expose()
  _id: string;
  @Column()
  name: string
  @Column()
  description: string
  @Column()
  image?: string
  @Column()
  shortName?: string
  @Column((type) => RequirementsBrigade)
  requirementsBrigade: RequirementsBrigade[];

}
