import { Module } from '@nestjs/common';
import { ExerciseTemplatesService } from './exercise-templates.service';
import { ExerciseTemplatesController } from './exercise-templates.controller';
import { exerciseTemplatesProviders } from './provider/exercise-templates.providers';
import { DatabaseModule } from '@libs/database/src';

@Module({
  controllers: [ExerciseTemplatesController, DatabaseModule],
  providers: [ExerciseTemplatesService, ...exerciseTemplatesProviders],
  exports: [ExerciseTemplatesService, ...exerciseTemplatesProviders],
})
export class ExerciseTemplatesModule { }
