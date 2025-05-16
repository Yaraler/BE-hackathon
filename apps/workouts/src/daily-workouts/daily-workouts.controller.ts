import { Controller } from '@nestjs/common';
import { DailyWorkoutsService } from './daily-workouts.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller('daily-workouts')
export class DailyWorkoutsController {
  constructor(private readonly dailyWorkoutsService: DailyWorkoutsService) { }
  @MessagePattern("workouts.create-first-workouts")
  async createFirstWorkoutsCheckIndicators(idUser: string) {
    return await this.dailyWorkoutsService.createFirstWorkoutsCheckIndicators(idUser)
  }
  @MessagePattern("workouts.get-first-workouts")
  async getFirstWorkouts(idUser: string) {
    console.log("a")
    return await this.dailyWorkoutsService.getFirstWorkouts(idUser)
  }

  @MessagePattern("workouts.get-workouts")
  async getWorkouts(idUser: string) {
    return await this.dailyWorkoutsService.getWorkouts(idUser)
  }


  @MessagePattern("workouts.end-first-workout")
  async endFirstWorkouts(data: any) {
    return await this.dailyWorkoutsService.endFirstExercises(data.idUser, data.exercises)
  }
  @MessagePattern("workouts.fast-create-workout")
  async fast(data: any) {
    console.log(data)
    return await this.dailyWorkoutsService.fastCreate(data)
  }


}
