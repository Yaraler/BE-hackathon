import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AwsService } from './aws.service';
import awsConfig from '@libs/config/aws.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [awsConfig],
    }),
  ],
  providers: [
    {
      provide: 'CONFIGURATION(aws)',
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => configService.get('aws'),
    },
    AwsService,
  ],
  exports: [AwsService],
})
export class AwsModule { }
