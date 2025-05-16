import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { MongoRepository } from 'typeorm';
import { Exercises } from './entity/exercises';
import { IExercises } from '@libs/contracts/user-indicators/ICheckingIndicator';
import { ObjectId } from 'mongodb';

@Injectable()
export class ExercisesService {
  constructor(
    @Inject('EXERCISES')
    private readonly exercisesRepository: MongoRepository<Exercises>,
  ) { }
  async createExercise(data: IExercises) {
    try {
      const exercise = this.exercisesRepository.create({
        name: data.name,
        exercise: data.exercise,
        count: null,
        state: false,
        description: data.description
      })
      return await this.exercisesRepository.save(exercise)
    } catch (error) {
      throw error;
    }
  }
  async getExercises(id: string[]) {
    try {
      const objectIds = id.map(i => new ObjectId(i));
      const exercises = await this.exercisesRepository.find({
        where: {
          _id: {
            $in: objectIds
          }
        }
      })
      return exercises;

    } catch (error) {
      throw error;
    }

  }
  async endExercises(comment: string, updateExercise: any) {
    try {
      const result = await this.exercisesRepository.updateOne(
        { _id: new ObjectId(updateExercise.exercise._id) },
        {
          $set: {
            comment: comment,
            userCount: updateExercise.exercise.userCount,
            state: true,
          },
        },
      );

      if (result.matchedCount === 0) {
        throw new Error('Update operation failed - no documents matched');
      }

      return {
        success: true,
        matchedCount: result.matchedCount,
        modifiedCount: result.modifiedCount,
      }
    } catch (error) {
      console.error('Error in endExercises:', error);
      throw error;
    }
  }
  async findExerciseById(id: string) {
    try {
      const exercise = await this.exercisesRepository.findBy({
        where: {
          _id: new ObjectId(id)
        }
      })
      return exercise
    } catch (error) {
      throw error;
    }

  }








  async createExercises(data: IExercises[]) {
    try {
      const createdExercises = await Promise.all(
        data.map(async (item) =>
          await this.createExercise(item))
      );
      const exerciseIds = createdExercises.map(ex => ex._id.toString());
      return exerciseIds
    } catch (error) {
      throw error;
    }
  }


}
