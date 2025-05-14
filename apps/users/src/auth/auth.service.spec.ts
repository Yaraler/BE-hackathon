import { MongoRepository } from "typeorm"
import { User } from "../user/entity/user.entity"
import { UserService } from "../user/user.service"
import { AuthService } from "./auth.service"
import { Test, TestingModule } from "@nestjs/testing"
import { MyLoggerService } from "@app/my-logger"
import { TokenService } from "../token/token.service"

const mockUser = {
  _id: 'user123',
  name: 'Test User',
};
const mockJwtService = {
  sign: jest.fn(),
};
const mockUserService = {}
describe('UserService', () => {
  let service: AuthService
  let userService: UserService
  let db: MongoRepository<User>
  let tokenService: TokenService
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: MyLoggerService,
          useValue: {},
        },
        {
          provide: 'USER_REPOSITORY',
          useValue: {},
        },
        {
          provide: UserService,
          useValue: mockUserService
        }
      ]
    }).compile();
    service = module.get<AuthService>(AuthService)
    db = module.get<MongoRepository<User>>('USER_REPOSITORY')
    userService = module.get<UserService>(UserService)
  })


  describe("create token", () => {
    it("should return access and refresh token", async () => {
      mockJwtService.sign
        .mockReturnValueOnce('mockAccessToken')
        .mockReturnValueOnce('mockRefreshToken');
      const result = await service.createToken(mockUser);
      expect(result).toEqual({
        accessToken: 'mockAccessToken',
        refreshToken: 'mockRefreshToken',
      });

      expect(mockJwtService.sign).toHaveBeenCalledTimes(2);
      expect(service['saveRefreshToken']).toHaveBeenCalledWith(
        mockUser._id.toString(),
        'mockRefreshToken',
      );
    })
  })
})

