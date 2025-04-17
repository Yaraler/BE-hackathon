import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(@Inject("USER_SERVICE") private usersClient: ClientProxy) {
    super({ usernameField: 'email', passReqToCallback: false });
  }

  async validate(email: string, password: string): Promise<any> {
    const user = this.usersClient.send("auth.validateUser", { email, password })
    return user;
  }
}

