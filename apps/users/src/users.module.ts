import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from '@libs/database/src';
import { TokenModule } from './token/token.module';

@Module({
  imports: [UserModule, DatabaseModule, AuthModule, TokenModule],
  controllers: [],
  providers: [],
})
export class UsersModule { }
