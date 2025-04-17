import { UserService } from './user.service';
import { MessagePattern } from '@nestjs/microservices';
import { GetUserDto } from '@libs/contracts/users/get-user.dto';
import { Controller } from '@nestjs/common';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) { }
  @MessagePattern('user.get')
  async get(data: GetUserDto) {
    return await this.userService.findById(data.userId)
  }
}
