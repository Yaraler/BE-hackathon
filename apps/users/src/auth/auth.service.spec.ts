import { MongoRepository } from "typeorm"
import { User } from "../user/entity/user.entity"
import { UserService } from "../user/user.service"
import { AuthService } from "./auth.service"
import { Test, TestingModule } from "@nestjs/testing"
import { MyLoggerService } from "@app/my-logger"
import { TokenService } from "../token/token.service"
import { testRefreshCorrect, testRefreshIncorrect } from "../../.../../../../tests/fixtures/auth.fixture"
import { testToken } from "../../.../../../../tests/fixtures/token.fixture"
import { JsonWebTokenError } from "@nestjs/jwt"
import { testUser } from "../../.../../../../tests/fixtures/user.fixture"
import { HashService } from "@shared/lib/hash/hash.service"

const mockUser = {
  _id: 'user123',
  name: 'Test User',
};

const mockTokenService = {
  verifyRefreshToken: jest.fn().mockImplementation((token: string) => {
    if (token === "token") {
      return testToken;
    }
    throw new JsonWebTokenError('Invalid token');
  }),
  createAccessToken: jest.fn().mockReturnValue("token")
}
const mockUserService = {
  findById: jest.fn().mockImplementation((id: string) => {
    if (id == "1") {
      return testUser
    }
    return undefined
  })
}
const mockHashService = {
  compareHash: jest.fn().mockReturnValue(true)
}
describe('UserService', () => {
  let service: AuthService
  let userService: UserService
  let db: MongoRepository<User>
  let tokenService: TokenService
  let hashService: HashService
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
        },
        {
          provide: TokenService,
          useValue: mockTokenService
        },
        {
          provide: HashService,
          useValue: mockHashService
        }
      ]
    }).compile();
    service = module.get<AuthService>(AuthService)
    db = module.get<MongoRepository<User>>('USER_REPOSITORY')
    userService = module.get<UserService>(UserService)
    tokenService = module.get<TokenService>(TokenService)
    hashService = module.get<HashService>(HashService)
  })


  describe("create token", () => {
    it("should return access and refresh token", async () => {
      const result = await service.refresh(testRefreshCorrect)

      console.log(result)
      expect(result).toEqual({ accessToken: "token" })
    })
  })
})

