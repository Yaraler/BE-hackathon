import { Test, TestingModule } from "@nestjs/testing";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { testValidateUserDto } from "@apps/users/test/fixtures/auth/validateUser.fixture";
import { RegistrationDto } from "@libs/contracts/users/registration.dto";
import { testUser } from "@tests/fixtures/user.fixture";
import { User } from "../user/entity/user.entity";
import { RefreshAccessTokenDto } from "@libs/contracts/users/refresh-access-token.dto";

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;

  const mockAuthService = {
    validateUser: jest.fn().mockResolvedValue('validated'),
    registration: jest.fn().mockResolvedValue('registered'),
    login: jest.fn().mockResolvedValue('loggedIn'),
    refresh: jest.fn().mockResolvedValue('refreshed'),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
  })
  it("should call validateUser", async () => {
    const res = await controller.validateUser(testValidateUserDto);
    expect(service.validateUser).toHaveBeenCalledWith(testValidateUserDto);
    expect(res).toBe('validated');
  })
  it('should call registration', async () => {
    const dto: RegistrationDto = {
      name: testUser.name,
      password: testUser.password,
      email: testUser.email,
      brigadId: testUser.brigadeId
    };
    const res = await controller.registration(dto);
    expect(service.registration).toHaveBeenCalledWith(dto);
    expect(res).toBe('registered');
  });

  it('should call login', async () => {
    const user: User = testUser
    const res = await controller.login(user);
    expect(service.login).toHaveBeenCalledWith(user);
    expect(res).toBe('loggedIn');
  });

  it('should call refresh', async () => {
    const dto: RefreshAccessTokenDto = { refreshToken: 'some-token' };
    const res = await controller.refresh(dto);
    expect(service.refresh).toHaveBeenCalledWith(dto);
    expect(res).toBe('refreshed');
  });


})
