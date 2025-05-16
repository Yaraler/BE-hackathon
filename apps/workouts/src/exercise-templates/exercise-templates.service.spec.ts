import { Test, TestingModule } from '@nestjs/testing';
import { ExerciseTemplatesService } from './exercise-templates.service';

describe('ExerciseTemplatesService', () => {
  let service: ExerciseTemplatesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExerciseTemplatesService],
    }).compile();

    service = module.get<ExerciseTemplatesService>(ExerciseTemplatesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
