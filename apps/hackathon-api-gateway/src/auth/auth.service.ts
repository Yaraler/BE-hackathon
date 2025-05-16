import { TokenDto } from '@libs/contracts/token/token.dto';
import { RefreshAccessTokenDto } from '@libs/contracts/users/refresh-access-token.dto';
import { RegistrationDto } from '@libs/contracts/users/registration.dto';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { User } from 'apps/users/src/user/entity/user.entity';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(@Inject("USER_SERVICE") private usersClient: ClientProxy) { }
  async registration(data: RegistrationDto) {
    console.log("1")
    return await firstValueFrom(this.usersClient.send("auth.registration", data))
  }
  async login(data: User) {
    return await firstValueFrom(this.usersClient.send("auth.login", data))
  }
  async refresh(data: RefreshAccessTokenDto) {
    return await firstValueFrom(this.usersClient.send("auth.refresh", data))
  }
}
