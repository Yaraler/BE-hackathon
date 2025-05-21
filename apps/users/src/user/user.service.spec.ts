import { MongoRepository } from "typeorm"
import { User } from "./entity/user.entity"
import { Test, TestingModule } from "@nestjs/testing"
import { MyLoggerService } from "@app/my-logger"
import { UserService } from "./user.service"
import { testUser } from "@tests/fixtures/user.fixture"

const mockDb = {
  findOne: jest.fn().mockImplementation(({ where }) => {
    if (where.email == testUser.email || where._id == testUser._id) {
      return Promise.resolve(testUser);
    }
    return Promise.resolve(undefined);
  })
}
describe('UserService', () => {
  let service: UserService
  let db: MongoRepository<User>
  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: MyLoggerService,
          useValue: {},
        },
        {
          provide: 'USER_REPOSITORY',
          useValue: mockDb,
        },
      ]
    }).compile();
    service = module.get<UserService>(UserService)
    db = module.get<MongoRepository<User>>('USER_REPOSITORY')
  })

  describe("Find user by Id", () => {
    it("Should return user", async () => {
      const res = await service.findById(testUser._id)
      expect(mockDb.findOne).toHaveBeenCalled();
      expect(mockDb.findOne).toHaveBeenCalledWith({ where: { _id: testUser._id } });
      expect(res).toEqual(testUser)
    })
    it("Should return undefined if user not found", async () => {
      const res = await service.findById("2")
      expect(mockDb.findOne).toHaveBeenCalled();
      expect(mockDb.findOne).toHaveBeenCalledWith({ where: { _id: "2" } });
      expect(res).toBeUndefined();
    })
  })

  describe("Find user by email", () => {
    it("Should return user", async () => {
      const res = await service.findByEmail(testUser.email)
      expect(mockDb.findOne).toHaveBeenCalled();
      expect(mockDb.findOne).toHaveBeenCalledWith({ where: { email: testUser.email } });
      expect(res).toEqual(testUser)
    })
    it("Should return undefined if user not found", async () => {
      const res = await service.findByEmail("notcorrectemail@gmail.com")
      expect(mockDb.findOne).toHaveBeenCalled();
      //expect(mockDb.findOne).toHaveBeenCalledWith({ where: { email: "notcorrectemail@gmail.com" } });
      expect(res).toBeUndefined();
    })
  })
})
