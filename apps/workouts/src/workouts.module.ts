import { Module } from '@nestjs/common';
import { WorkoutsController } from './workouts.controller';
import { WorkoutsService } from './workouts.service';
import { ExercisesModule } from './exercises/exercises.module';
import { DailyWorkoutsModule } from './daily-workouts/daily-workouts.module';
import { ExerciseTemplatesModule } from './exercise-templates/exercise-templates.module';

@Module({
  imports: [ExercisesModule, DailyWorkoutsModule, ExerciseTemplatesModule],
  controllers: [WorkoutsController],
  providers: [WorkoutsService],
})
export class WorkoutsModule { }
