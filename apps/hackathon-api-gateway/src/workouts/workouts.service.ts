import { IExercises } from '@libs/contracts/user-indicators/ICheckingIndicator';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Exercises } from 'apps/workouts/src/exercises/entity/exercises';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class WorkoutsService {
  constructor(@Inject("WORKOUTS_SERVICE") private wrkoutsClient: ClientProxy) { }


  async createFirstWorkout(idUser: string) {
    try {
      //  return await firstValueFrom(this.wrkoutsClient.send("workouts.create-first-workouts", idUser))
    } catch (error) {
      throw error;
    }
  }

  async getWorkout(idUser: string) {
    try {
      // return await firstValueFrom(this.wrkoutsClient.send("workouts.get-workouts", idUser))
    } catch (error) {
      throw error;
    }
  }

  async getFirstWorkout(idUser: string) {
    try {
      //     return await firstValueFrom(this.wrkoutsClient.send("workouts.get-first-workouts", idUser))
    } catch (error) {
      throw error;
    }
  }

  async endFirstWorkout(idUser: string, exercises: Exercises) {
    try {
      console.log(exercises)
      //return await firstValueFrom(this.wrkoutsClient.send("workouts.end-first-workout", { idUser, exercises }))
    } catch (error) {
      throw error;
    }

  }

  async fast(data: any) {
    try {
      console.log(data)
      //return await firstValueFrom(this.wrkoutsClient.send("workouts.fast-create-workout", data))
    } catch (error) {
      throw error;
    }

  }


}
