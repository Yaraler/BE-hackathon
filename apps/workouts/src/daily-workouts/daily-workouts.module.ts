import { Module } from '@nestjs/common';
import { DailyWorkoutsService } from './daily-workouts.service';
import { DailyWorkoutsController } from './daily-workouts.controller';
import { DatabaseModule } from '@libs/database/src';
import { BrigadeModule } from 'apps/brigade/src/brigade/brigade.module';
import { HttpModule } from '@nestjs/axios';
import { MyLoggerModule } from '@app/my-logger';
import { ConfigModule } from '@nestjs/config';
import openRouterConfig from '@libs/config/open-router.config';
import { ExercisesModule } from '../exercises/exercises.module';
import { exercisesProviders } from '../exercises/provider/exercises.provides';
import { dailyWorkoutsProviders } from './provider/daily-workouts.providers';
import { AiRouterModule } from 'shared/lib/ai-router/ai-router.module';
import { AiRouterService } from 'shared/lib/ai-router/ai-router.service';
import { UserModule } from 'apps/users/src/user/user.module';

@Module({
  imports: [
    DatabaseModule,
    UserModule,
    HttpModule,
    MyLoggerModule,
    ExercisesModule,
    AiRouterModule,
    ConfigModule.forRoot({
      load: [openRouterConfig],
    }),
  ],
  controllers: [DailyWorkoutsController],
  providers: [DailyWorkoutsService, AiRouterService, ...exercisesProviders, ...dailyWorkoutsProviders],
  exports: [...dailyWorkoutsProviders]
})
export class DailyWorkoutsModule { }
