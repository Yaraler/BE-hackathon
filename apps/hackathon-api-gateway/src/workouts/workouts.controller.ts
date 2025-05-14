import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { WorkoutsService } from './workouts.service';
import { JwtAuthGuard } from '@libs/guards/src';
import { GetUserDto } from '@libs/contracts/users/get-user.dto';
import { Request as ExpressRequest } from 'express';
import { IExercises } from '@libs/contracts/user-indicators/ICheckingIndicator';
import { Exercises } from 'apps/workouts/src/exercises/entity/exercises';

@Controller('workouts')
export class WorkoutsController {
  constructor(private readonly workoutsService: WorkoutsService) { }
  @Post("create-first-workout")
  @UseGuards(JwtAuthGuard)
  async cereateFirst(@Request() data: ExpressRequest & { user: GetUserDto }) {
    return this.workoutsService.createFirstWorkout(data.user.userId)
  }
  @Get("get-first-workout")
  @UseGuards(JwtAuthGuard)
  async getfirstWorkouts(@Request() data: ExpressRequest & { user: GetUserDto }) {
    return await this.workoutsService.getFirstWorkout(data.user.userId)
  }
  @Get("get-workout")
  @UseGuards(JwtAuthGuard)
  async getWorkouts(@Request() data: ExpressRequest & { user: GetUserDto }) {
    return await this.workoutsService.getWorkout(data.user.userId)
  }

  @Post("end-first-workout")
  @UseGuards(JwtAuthGuard)
  async endFirst(@Body() data: Exercises, @Request() user: ExpressRequest & { user: GetUserDto }) {
    console.log("start")
    return this.workoutsService.endFirstWorkout(user.user.userId, data)
  }
  @Post("fast-workout")
  async fast(@Body() data: any) {
    return this.workoutsService.fast(data)
  }
}





