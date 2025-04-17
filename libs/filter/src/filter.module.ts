import { Module } from '@nestjs/common';
import { RpcHttpExceptionFilter } from './filter.service';

@Module({
  providers: [RpcHttpExceptionFilter],
  exports: [RpcHttpExceptionFilter],
})
export class FilterModule { }
