import { Module } from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';
import { JwtStrategy, LocalStrategy, StrategyModule } from '@libs/strategy/src';
import { JwtAuthGuard } from './auth.guard';
import { ClientsModule, Transport } from '@nestjs/microservices';
@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'USER_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL || 'amqp://localhost:5672'],
          queue: 'user_queue',
          queueOptions: {
            durable: false
          },
        },
      },
    ]),],
  providers: [LocalAuthGuard, JwtAuthGuard, LocalStrategy, JwtStrategy],
  exports: [LocalAuthGuard, JwtAuthGuard],
})
export class GuardsModule { }
