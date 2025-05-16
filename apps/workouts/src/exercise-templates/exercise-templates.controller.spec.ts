import { Test, TestingModule } from '@nestjs/testing';
import { ExerciseTemplatesController } from './exercise-templates.controller';
import { ExerciseTemplatesService } from './exercise-templates.service';

describe('ExerciseTemplatesController', () => {
  let controller: ExerciseTemplatesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExerciseTemplatesController],
      providers: [ExerciseTemplatesService],
    }).compile();

    controller = module.get<ExerciseTemplatesController>(ExerciseTemplatesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
