import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegistrationDto } from '@libs/contracts/users/registration.dto';
import { LocalAuthGuard } from '@libs/guards/src';
import { Request as ExpressRequest } from 'express';
import { User } from 'apps/users/src/user/entity/user.entity';
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
}
