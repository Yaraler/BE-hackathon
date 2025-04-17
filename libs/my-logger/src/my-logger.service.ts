import { Injectable, LoggerService } from '@nestjs/common';

@Injectable()
export class MyLoggerService implements LoggerService {
  log(message: any, ...optionalParams: any[]) {
    console.log('[LOG]', message, ...optionalParams);
  }

  error(message: any, ...optionalParams: any[]) {
    console.error('[ERROR]', message, ...optionalParams);
  }

  warn(message: any, ...optionalParams: any[]) {
    console.warn('[WARN]', message, ...optionalParams);
  }

  debug?(message: any, ...optionalParams: any[]) {
    console.debug('[DEBUG]', message, ...optionalParams);
  }

  verbose?(message: any, ...optionalParams: any[]) {
    console.info('[VERBOSE]', message, ...optionalParams);
  }

  fatal(message: any, ...optionalParams: any[]) {
    console.error('[FATAL]', message, ...optionalParams);
  }
}
