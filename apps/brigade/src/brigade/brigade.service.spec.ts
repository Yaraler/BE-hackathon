import { Test, TestingModule } from "@nestjs/testing";
import { BrigadeService } from "./brigade.service";
import { brigadeProviders } from "./provider/brigade";
import { AwsService } from "@aws/aws.service";
import { MongoRepository } from "typeorm";
import { Brigade } from "./entity/brigade.entity";
import { testBrigade } from "../../../../tests/fixtures/brigade.fixture";
import { RequirementsBrigade } from "../requirements_brigade/entity/requirements-brigade.entity";
import { RequirementsBrigadeService } from "../requirements_brigade/requirements_bridage.service";
import { BadRequestException, NotFoundException } from "@nestjs/common";
import { ObjectId } from "mongodb";





const requirementsBrigadeMock = {}
const awsMock = {
  createPhoto: jest.fn().mockResolvedValue("mocked-photo-url"),
};
describe('Brigade', () => {
  let service: BrigadeService
  let db: MongoRepository<Brigade>
  let aws: AwsService
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BrigadeService,
        {
          provide: 'BRIGADE_REPOSITORY',
          useValue: {
            find: jest.fn().mockResolvedValue([testBrigade]),
            findOneBy: jest.fn(({ _id }) => {
              if (_id.toString() === testBrigade._id.toString()) {
                return Promise.resolve(testBrigade);
              }
              return Promise.resolve(null);
            }),
          },
        },
        {
          provide: AwsService,
          useValue: awsMock,
        },
        {
          provide: RequirementsBrigadeService,
          useValue: requirementsBrigadeMock
        }
      ]
    }).compile();
    service = module.get<BrigadeService>(BrigadeService)
    db = module.get<MongoRepository<Brigade>>('BRIGADE_REPOSITORY')
    aws = module.get<AwsService>(AwsService);
  })


  describe("get all brigade", () => {
    it("should return all brigade", async () => {
      const result = await service.getAllBrigade();
      expect(result).toEqual({ brigades: [testBrigade] })
    })
  })
  describe("get one", () => {
    it("should return one brigade", async () => {
      const result = await service.getOneBrigade(testBrigade._id);
      expect(result).toEqual({ brigade: testBrigade })
    })
    it('should throw BadRequestException for invalid ObjectId', async () => {
      await expect(service.getOneBrigade('test')).rejects.toThrow(BadRequestException);
    });
    it('should throw NotFoundException if brigade not found', async () => {
      const nonExistingId = new ObjectId().toString();
      await expect(service.getOneBrigade(nonExistingId)).rejects.toThrow(NotFoundException);
    });
  })
})

