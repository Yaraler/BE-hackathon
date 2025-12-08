import { NestFactory } from '@nestjs/core';
import { BrigadeModuleApp } from './brigade.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { RpcHttpExceptionFilter } from '@app/filter';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(BrigadeModuleApp, {
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RABBITMQ_URL || 'amqp://localhost:5672'],
      queue: 'brigade_queue',
      queueOptions: {
        durable: false
      },
    },
  });
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalFilters(new RpcHttpExceptionFilter());
  await app.listen();
}
bootstrap();
