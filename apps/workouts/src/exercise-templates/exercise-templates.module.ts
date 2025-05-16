import { Module } from '@nestjs/common';
import { ExerciseTemplatesService } from './exercise-templates.service';
import { ExerciseTemplatesController } from './exercise-templates.controller';

@Module({
  controllers: [ExerciseTemplatesController],
  providers: [ExerciseTemplatesService],
})
export class ExerciseTemplatesModule {}
