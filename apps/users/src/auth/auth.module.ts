import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { DatabaseModule } from '@libs/database/src';
import { userProviders } from '../user/user.providers';
import { MyLoggerModule } from '@app/my-logger';
import { UserModule } from '../user/user.module';
import { JwtStrategy } from '@app/strategy';
import { TokenModule } from '../token/token.module';

@Module({
  imports: [
    DatabaseModule,
    MyLoggerModule,
    forwardRef(() => UserModule),
    PassportModule.register({ session: false }),
    TokenModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, ...userProviders, JwtStrategy],
  exports: [AuthService]
})
export class AuthModule { }
