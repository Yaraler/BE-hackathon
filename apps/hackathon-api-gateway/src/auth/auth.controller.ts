import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegistrationDto } from '@libs/contracts/users/registration.dto';
import { LocalAuthGuard } from '@libs/guards/src';
import { Request as ExpressRequest } from 'express';
import { User } from 'apps/users/src/user/entity/user.entity';
import { RefreshAccessTokenDto } from '@libs/contracts/users/refresh-access-token.dto';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }
  @Post("registration")
  async registration(@Body() data: RegistrationDto) {
    return await this.authService.registration(data)
  }

  @Post("login")
  @UseGuards(LocalAuthGuard)
  async login(@Request() req: ExpressRequest & { user: User }) {
    return await this.authService.login(req.user)
  }
  @Post("refresh")
  async refresh(@Body() data: RefreshAccessTokenDto) {
    return await this.authService.refresh(data)
  }

}
