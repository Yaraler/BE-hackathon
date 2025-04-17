import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { firstValueFrom } from "rxjs";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(@Inject("USER_SERVICE") private usersClient: ClientProxy) {
    super({ usernameField: 'email', passReqToCallback: false });
  }

  async validate(email: string, password: string): Promise<any> {
    const user = await firstValueFrom(
      this.usersClient.send("auth.validateUser", { email, password })
    );
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}

