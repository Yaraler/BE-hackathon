import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { DatabaseModule } from '@libs/database/src';
import { userProviders } from '../user/user.providers';
import { UserService } from '../user/user.service';
import { jwtConstants } from '@libs/constants';
import { MyLoggerModule } from '@app/my-logger';

@Module({
  imports: [
    DatabaseModule,
    MyLoggerModule,
    forwardRef(() => UsersModule),
    PassportModule.register({ session: false }),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '24h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, ...userProviders, UserService],
  exports: [AuthService]
})
export class AuthModule { }
