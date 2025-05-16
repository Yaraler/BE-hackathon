import { MongoRepository } from "typeorm"
import { User } from "../user/entity/user.entity"
import { UserService } from "../user/user.service"
import { AuthService } from "./auth.service"
import { Test, TestingModule } from "@nestjs/testing"
import { MyLoggerService } from "@app/my-logger"
import { TokenService } from "../token/token.service"
import { JsonWebTokenError } from "@nestjs/jwt"
import { HashService } from "@shared/lib/hash/hash.service"
import { testToken } from "@tests/fixtures/token.fixture"
import { RefreshAccessTokenDto } from "@libs/contracts/users/refresh-access-token.dto"
import { ValidateUserDto } from "@libs/contracts/users/validate-user.dto"
import { testUser } from "@tests/fixtures/user.fixture"
import { testRefreshCorrect } from "@tests/fixtures/auth.fixture"

const mockTokenService = {
  verifyRefreshToken: jest.fn().mockImplementation((token: string) => {
    if (token === "token") {
      return testToken;
    }
    throw new JsonWebTokenError('Invalid token');
  }),
  createAccessToken: jest.fn().mockReturnValue("token"),
  createRefreshToken: jest.fn().mockReturnValue("refresh_token")

}
const mockUserService = {
  findById: jest.fn().mockImplementation((id: string) => {
    if (id == testUser._id) {
      return testUser
    }
    return undefined
  }),
  findByEmail: jest.fn().mockImplementation((email: string): User | undefined => {
    if (email == testUser.email) {
      return testUser
    }
    return undefined
  }),

}
const mockDb = {
  update: jest.fn().mockReturnValueOnce(testUser)
}
const mockHashService = {
  compareHash: jest.fn().mockImplementation((firstData: string, secondData: string): boolean => {
    if (firstData == secondData) {
      return true
    }
    return false
  }),
  hashPassword: jest.fn().mockReturnValue("hash")
}
describe('UserService', () => {
  let service: AuthService
  let userService: UserService
  let db: MongoRepository<User>
  let tokenService: TokenService
  let hashService: HashService
  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: MyLoggerService,
          useValue: {},
        },
        {
          provide: 'USER_REPOSITORY',
          useValue: mockDb,
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

  describe("refreshToken", () => {
    it("should return access and refresh token", async () => {
      const result = await service.refresh(testRefreshCorrect)

      expect(result).toEqual({ accessToken: "token" });
      expect(mockTokenService.verifyRefreshToken).toHaveBeenCalledWith("token");
      expect(mockUserService.findById).toHaveBeenCalledWith("1");
      expect(mockHashService.compareHash).toHaveBeenCalledWith("token", testUser.refreshToken);
      expect(mockTokenService.createAccessToken).toHaveBeenCalledWith(testToken);
    })

    it("should return jwt error", async () => {
      const data: RefreshAccessTokenDto = { refreshToken: "not correct token" }
      await expect(service.refresh(data)).rejects.toThrow(JsonWebTokenError)
    })
  })
  describe("login", () => {
    it("return tokens", async () => {
      const testResData = {
        accessToken: "token",
        refreshToken: "refresh_token",
      }
      const res = await service.login(testUser)
      expect(res).toEqual(testResData)
    })
  })
  describe("validateUser", () => {
    it("Should return user", async () => {
      const mockValidateUserDto: ValidateUserDto = {
        email: testUser.email,
        password: testUser.password
      }
      const res = await service.validateUser(mockValidateUserDto)
      expect(res).toEqual(testUser)

    })
    it("Should return null", async () => {
      const testNotCorrectEmail = "not_correct_email"
      const mockValidateUserDto: ValidateUserDto = {
        email: testNotCorrectEmail,
        password: testUser.password
      }
      const res = await service.validateUser(mockValidateUserDto)
      expect(res).toBeNull()
      expect(mockUserService.findByEmail).toHaveBeenCalledWith(testNotCorrectEmail)
      expect(mockHashService.compareHash).not.toHaveBeenCalled();
    })
    it("Should return null because password not correct", async () => {
      const testNotCorrectPassword = "not_correct_password"
      const mockValidateUserDto: ValidateUserDto = {
        email: testUser.email,
        password: testNotCorrectPassword
      }
      const res = await service.validateUser(mockValidateUserDto)
      expect(res).toBeNull()
      expect(mockUserService.findByEmail).toHaveBeenCalledWith(testUser.email)
      expect(mockHashService.compareHash).toHaveBeenCalledWith(testNotCorrectPassword, testUser.password)
    })
  })
})




