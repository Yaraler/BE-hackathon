import { NestFactory } from '@nestjs/core';
import { WorkoutsModule } from './workouts.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { RpcHttpExceptionFilter } from '@app/filter';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(WorkoutsModule, {
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RABBITMQ_URL || 'amqp://localhost:5672'],
      queue: 'workouts_queue',
      queueOptions: {
        durable: false
      },
    },
  });
  app.useGlobalFilters(new RpcHttpExceptionFilter());
  await app.listen();
}
bootstrap();
