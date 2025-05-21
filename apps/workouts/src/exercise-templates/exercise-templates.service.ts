import { Inject, Injectable, Res } from '@nestjs/common';
import { MongoRepository } from 'typeorm';
import { ExercisesTemplates } from './entitiy/exercise-templates.entity';
import { CreateExerciseTemplateDto } from './dto/create-exercise-template.dto';
import { exerciseTemplateData } from './seed/exerciseTempalate.data';

@Injectable()
export class ExerciseTemplatesService {
  constructor(
    @Inject('EXERCISE_TEMPLATE')
    private readonly exercisesTemplateRepository: MongoRepository<ExercisesTemplates>,
  ) { }
  async createExerciseTemplate(exercise: CreateExerciseTemplateDto): Promise<ExercisesTemplates> {
    const newExercisesTemplates = this.exercisesTemplateRepository.create({
      ...exercise
    })
    return await this.exercisesTemplateRepository.save(newExercisesTemplates)
  }
  async CreateExerciseTemplatesWithData(): Promise<ExercisesTemplates[]> {
    const res = await Promise.all(
      exerciseTemplateData.map(
        this.createExerciseTemplate
      )
    )
    return res;
  }
  async get(): Promise<any> {

  }
}
