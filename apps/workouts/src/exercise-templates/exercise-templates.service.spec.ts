import { Test, TestingModule } from '@nestjs/testing';
import { ExerciseTemplatesService } from './exercise-templates.service';
import { MongoRepository } from 'typeorm';
import { ExercisesTemplates } from './entitiy/exercise-templates.entity';
import { testExerciseTemplate } from './fixtures/create-exercise-template.fixture';

const mockDb = {}
describe('ExerciseTemplatesService', () => {
  let service: ExerciseTemplatesService;
  let db: MongoRepository<ExercisesTemplates>

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({

      providers: [
        ExerciseTemplatesService,
        {
          provide: 'EXERCISE_TEMPLATE',
          useValue: mockDb,
        },

      ],
    }).compile();
    db = module.get<MongoRepository<ExercisesTemplates>>('USER_REPOSITORY')
    service = module.get<ExerciseTemplatesService>(ExerciseTemplatesService);
  });

  describe("createExerciseTemplate", () => {
    it("should create and return", async () => {
      const res = await service.createExerciseTemplate(testExerciseTemplate)
      expect(res)
    })
  })
});
