import { GetUserDto } from '@libs/contracts/users/get-user.dto';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class UserService {
  constructor(@Inject("USER_SERVICE") private usersClient: ClientProxy) { }
  async findAll() {
    return this.usersClient.send("user.findAll", {})
  }
  async get(data: GetUserDto) {
    return this.usersClient.send("user.get", data)
  }
}
