import { Module } from '@nestjs/common';
import { UserIndicatorsService } from './user-indicator.service';
import { UserIndicatorsController } from './user-indicator.controller';
import { AiRouterService } from 'shared/lib/ai-router/ai-router.service';
import { UserService } from 'apps/users/src/user/user.service';
import { BrigadeService } from 'apps/brigade/src/brigade/brigade.service';
import { HttpModule, HttpService } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseModule } from '@libs/database/src';
import { MyLoggerModule } from '@app/my-logger';
import { UserModule } from 'apps/users/src/user/user.module';
import { BrigadeModule } from 'apps/brigade/src/brigade/brigade.module';
import { AwsService } from '@aws/aws.service';
import { RequirementsBrigadeService } from 'apps/brigade/src/requirements_brigade/requirements_bridage.service';
import { RequirementsBrigadeModule } from 'apps/brigade/src/requirements_brigade/requirements_bridage.module';
import openRouterConfig from '@libs/config/open-router.config';

@Module({
  imports: [
    DatabaseModule,
    UserModule,
    BrigadeModule,
    HttpModule,
    RequirementsBrigadeModule,
    MyLoggerModule,
    ConfigModule.forRoot({
      load: [openRouterConfig],
    })
  ],
  controllers: [UserIndicatorsController],
  providers: [UserIndicatorsService, AiRouterService, UserService,
    AwsService,
    BrigadeService,
    RequirementsBrigadeService,
    ConfigService],
})
export class UserIndicatorsModule { }
