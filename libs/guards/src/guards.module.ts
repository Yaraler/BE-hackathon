import { Module } from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';
import { JwtAuthGuard } from './auth.guard';

@Module({
  providers: [LocalAuthGuard, JwtAuthGuard],
  exports: [LocalAuthGuard, JwtAuthGuard],
})
export class GuardsModule { }
