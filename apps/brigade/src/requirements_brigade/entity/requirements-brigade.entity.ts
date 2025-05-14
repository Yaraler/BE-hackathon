import { Column, Entity, JoinColumn, ManyToOne, ObjectIdColumn } from "typeorm";
import { ObjectId } from "mongodb";
import { Brigade } from "../../brigade/entity/brigade.entity";
import { min } from "class-validator";

export class RequirementsBrigade {
  @Column()
  exercise: string
  @Column({ nullable: true })
  minimum?: number;
  @Column({ nullable: true })
  maximum?: number;
  constructor(exercise: string, minimum?: number, maximum?: number) {
    this.exercise = exercise;

    if (minimum !== undefined) {
      this.minimum = minimum;
    }

    if (maximum !== undefined) {
      this.maximum = maximum;
    }
  }
}

