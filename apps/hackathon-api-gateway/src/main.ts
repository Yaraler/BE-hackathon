import { NestFactory } from '@nestjs/core';
import { HackathonApiGatewayModule } from './hackathon-api-gateway.module';

async function bootstrap() {
  const app = await NestFactory.create(HackathonApiGatewayModule);
  await app.listen(process.env.PORT ?? 3000, '0.0.0.0');

}
bootstrap();
