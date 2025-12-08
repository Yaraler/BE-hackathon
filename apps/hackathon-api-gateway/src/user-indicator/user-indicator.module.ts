import { Module } from '@nestjs/common';
import { UserIndicatorService } from './user-indicator.service';
import { UserIndicatorController } from './user-indicator.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { UserModule } from '../user/user.module';
import { BrigadeModule } from 'apps/brigade/src/brigade/brigade.module';
import { HttpModule } from '@nestjs/axios';
import { RequirementsBrigadeModule } from 'apps/brigade/src/requirements_brigade/requirements_bridage.module';
import { MyLoggerModule } from '@app/my-logger';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'USER_INDICATOR_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL || 'amqp://localhost:5672'],
          queue: 'user_indicator_queue',
          queueOptions: {
            durable: false
          },
        },
      },
    ]),
    UserModule,
    BrigadeModule,
    HttpModule,
    RequirementsBrigadeModule,
    MyLoggerModule,
  ],
  controllers: [UserIndicatorController],
  providers: [UserIndicatorService],
})
export class UserIndicatorModule { }
