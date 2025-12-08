import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MulterModule } from '@nestjs/platform-express';
import * as Multer from 'multer';

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
    ]),
    MulterModule.register({
      storage: Multer.memoryStorage(),
      limits: {
        fileSize: 10 * 1024 * 1024,
      },
    }),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule { }
