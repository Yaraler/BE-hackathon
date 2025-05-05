import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { WorkoutsService } from './workouts.service';
import { JwtAuthGuard } from '@libs/guards/src';
import { GetUserDto } from '@libs/contracts/users/get-user.dto';
import { Request as ExpressRequest } from 'express';

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


}
