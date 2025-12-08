import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ValidationPipe } from '@nestjs/common';
import { RpcHttpExceptionFilter } from '@app/filter';
import { UserIndicatorModule } from './user-indicator.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(UserIndicatorModule, {
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RABBITMQ_URL || 'amqp://localhost:5672'],
      queue: 'user_indicator_queue',
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
