import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './auth.strategy';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { jwtConstants } from '@libs/constants';

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
      secret: jwtConstants.access_secret,
      signOptions: { expiresIn: "24h" },
    })
  ],
  providers: [LocalStrategy, JwtStrategy],
  exports: [LocalStrategy, JwtModule, JwtStrategy],
})
export class StrategyModule { }
