import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './auth.strategy';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'apps/users/constants';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'USER_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'user_queue',
          queueOptions: {
            durable: false
          },
        },
      },
    ]),
    PassportModule.register({ session: false }),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [LocalStrategy, JwtStrategy],
  exports: [LocalStrategy, JwtModule],
})
export class StrategyModule { }
