import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MessagePattern } from '@nestjs/microservices';
import { ValidateUserDto } from '@libs/contracts/users/validate-user.dto';
import { RegistrationDto } from '@libs/contracts/users/registration.dto';
import { LoginDto } from '@libs/contracts/users/login.dto';
import { IUser } from '@libs/contracts/type/user';
import { User } from '../user/entity/user.entity';
import { RefreshAccessTokenDto } from '@libs/contracts/users/refresh-access-token.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }
  @MessagePattern("auth.validateUser")
  async validateUser(data: ValidateUserDto) {
    return this.authService.validateUser(data)
  }
  @MessagePattern("auth.registration")
  async registration(data: RegistrationDto) {
    return await this.authService.registration(data);
  }
  @MessagePattern("auth.login")
  async login(data: User) {
    return await this.authService.login(data)
  }
  @MessagePattern("auth.refresh")
  async refresh(data: RefreshAccessTokenDto) {
    return await this.authService.refresh(data);
  }

}
