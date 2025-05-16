import { Controller } from '@nestjs/common';
import { ExerciseTemplatesService } from './exercise-templates.service';

@Controller('exercise-templates')
export class ExerciseTemplatesController {
  constructor(private readonly exerciseTemplatesService: ExerciseTemplatesService) {}
}
