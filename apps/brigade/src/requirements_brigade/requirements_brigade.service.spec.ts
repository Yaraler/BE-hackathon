import { Test, TestingModule } from "@nestjs/testing"
import { RequirementsBrigade } from "./entity/requirements-brigade.entity"
import { RequirementsBrigadeService } from "./requirements_bridage.service"
import { BadRequestException } from "@nestjs/common";
import { MongoRepository } from "typeorm";







describe("Requirements brigade", () => {
  let service: RequirementsBrigadeService;
  let db: MongoRepository<RequirementsBrigade>
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RequirementsBrigadeService,
        {
          provide: 'REQUIREMENT_BRIGADE_REPOSITORY',
          useValue: {},
        }
      ]
    }).compile();

    service = module.get<RequirementsBrigadeService>(RequirementsBrigadeService);
  });

  describe("transformRequirementsBrigade", () => {
    it('should transform input array into array of RequirementsBrigade instances', async () => {
      const input = [
        { exercise: 'Push-up', minimum: 10, maximum: 30 },
        { exercise: 'Squat', minimum: 15, maximum: 40 }
      ];

      const result = await service.transformRequirementsBrigade(input);

      expect(result).toHaveLength(2);
      expect(result[0]).toBeInstanceOf(RequirementsBrigade);
      expect(result[0]).toMatchObject({ exercise: 'Push-up', minimum: 10, maximum: 30 });
      expect(result[1]).toMatchObject({ exercise: 'Squat', minimum: 15, maximum: 40 });
    });

    it('should throw BadRequestException if such is thrown inside', async () => {
      const input = null;

      jest.spyOn(service as any, 'transformRequirementsBrigade').mockImplementation(() => {
        throw new BadRequestException('Invalid input');
      });

    });

    it('should throw a generic error for unexpected cases', async () => {
      const input = undefined as any;

      await expect(service.transformRequirementsBrigade(input)).rejects.toEqual('An unexpected error occurred');
    });
  });
})
