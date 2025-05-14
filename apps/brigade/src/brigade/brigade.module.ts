import { forwardRef, Module } from '@nestjs/common';
import { MyLoggerModule } from '@app/my-logger';
import { DatabaseModule } from '@libs/database/src';
import { RequirementsBrigadeModule } from '../requirements_brigade/requirements_bridage.module';
import { BrigadeController } from './brigade.controller';
import { BrigadeService } from './brigade.service';
import { requirementsBrigadeProviders } from '../requirements_brigade/provider/requirements-brigade';
import { brigadeProviders } from './provider/brigade';
import { ConfigModule, ConfigService } from '@nestjs/config';
import awsConfig from '@libs/config/aws.config';
import { AwsModule } from '@aws/aws.module';
@Module({
  imports: [
    DatabaseModule,
    MyLoggerModule,
    AwsModule,
    RequirementsBrigadeModule,
  ],
  controllers: [BrigadeController],
  providers: [BrigadeService, ...brigadeProviders, ...requirementsBrigadeProviders],
  exports: [BrigadeService, ...brigadeProviders],
})
export class BrigadeModule { }
