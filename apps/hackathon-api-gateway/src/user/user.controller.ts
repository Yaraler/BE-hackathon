import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from '@libs/guards/src';
import { GetUserDto } from '@libs/contracts/users/get-user.dto';
import { Request as ExpressRequest } from 'express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }
  @Get("findAll")
  findAll() {
    return "user"
  }
  @Get("get")
  @UseGuards(JwtAuthGuard)
  async get(@Request() data: ExpressRequest & { user: GetUserDto }) {
    return this.userService.get(data.user)
  }
}
