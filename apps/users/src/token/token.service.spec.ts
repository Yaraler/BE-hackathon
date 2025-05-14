import { Test, TestingModule } from "@nestjs/testing"
import { TokenService } from "./token.service"
import { JsonWebTokenError, JwtService } from "@nestjs/jwt"
import { testToken } from "../../../../tests/fixtures/token.fixture"
const mockJwtService = {
  sign: jest.fn().mockResolvedValue("token"),
  verifyAsync: jest.fn().mockImplementation((token: string) => {
    if (token === "token") {
      return testToken;
    }
    throw new JsonWebTokenError('Invalid token');
  }),
}
describe('TokenService', () => {
  let service: TokenService
  let jwtService: JwtService
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TokenService,
        {
          provide: JwtService,
          useValue: mockJwtService,
        }
      ]
    }).compile();
    service = module.get<TokenService>(TokenService)
    jwtService = module.get<JwtService>(JwtService);
  })

  describe("Create token", () => {
    it("should return token", async () => {
      const result = await service.createAccessToken(testToken)
      expect(result).toEqual("token")
    })
  })

  describe("Verify token", () => {
    it("Should return data token", async () => {
      const result = await service.verfiftyRefreshToken("token")
      expect(result).toEqual(testToken)
    })
    it("Should return error", async () => {
      try {
        await service.verifyRefreshToken("invalid_token");
      } catch (error) {
        expect(error).toBeInstanceOf(JsonWebTokenError);
        expect(error.message).toBe('Invalid refresh token');
      }
    })
  })
})
