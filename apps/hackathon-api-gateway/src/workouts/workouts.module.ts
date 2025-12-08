import { Module } from '@nestjs/common';
import { WorkoutsService } from './workouts.service';
import { WorkoutsController } from './workouts.controller';
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
        name: "WORKOUTS_SERVICE",
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL || 'amqp://localhost:5672'],
          queue: 'workouts_queue',
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

  controllers: [WorkoutsController],
  providers: [WorkoutsService],
})
export class WorkoutsModule { }
