import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import * as Multer from 'multer';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { DatabaseModule } from '@libs/database/src';
import { BrigadeController } from './bridage.controller';
import { BrigadeService } from './bridage.service';
import { brigadeProviders } from 'apps/brigade/src/brigade/provider/brigade';
import { requirementsBrigadeProviders } from 'apps/brigade/src/requirements_brigade/provider/requirements-brigade';
import { ConfigModule } from '@nestjs/config';
import awsConfig from '@libs/config/aws.config';
import { AwsService } from '@aws/aws.service';
@Module({
  imports: [
    DatabaseModule,
    ClientsModule.register([
      {
        name: 'BRIGADE_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'brigade_queue',
          queueOptions: {
            durable: false
          },
        },
      },

    ]),
    ConfigModule.forRoot({
      load: [awsConfig],
    }),
    MulterModule.register({
      storage: Multer.memoryStorage(),
      limits: {
        fileSize: 10 * 1024 * 1024,
      },
    })],
  controllers: [BrigadeController],
  providers: [BrigadeService,
    ...brigadeProviders,
    ...requirementsBrigadeProviders,
    AwsService],
})
export class BridageModule { }
