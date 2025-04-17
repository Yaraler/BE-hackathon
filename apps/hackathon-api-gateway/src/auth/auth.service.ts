import { RegistrationDto } from '@libs/contracts/users/registration.dto';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { User } from 'apps/users/src/user/entity/user.entity';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(@Inject("USER_SERVICE") private usersClient: ClientProxy) { }
  async registration(data: RegistrationDto) {
    return await firstValueFrom(this.usersClient.send("auth.registration", data))
  }
  async login(data: User) {
    return await firstValueFrom(this.usersClient.send("auth.login", data))
  }
}
