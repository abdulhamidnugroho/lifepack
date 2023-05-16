import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { pino } from 'pino';
import { AsyncLocalStorage } from 'async_hooks';
import { ASYNC_STORAGE } from '../../../global/constants';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppLoggerService implements LoggerService {
  private pino: pino.Logger;

  constructor(
    @Inject(ASYNC_STORAGE)
    private readonly asyncStorage: AsyncLocalStorage<Map<string, string>>,
    private readonly configService: ConfigService,
  ) {
    const logLevel = configService.get('logLevel');

    this.pino = pino({
      level: logLevel,
      transport: {
        target: 'pino-pretty',
      },
    });
  }

  error(message: any, trace?: string, context?: string): any {
    const traceId = this.asyncStorage.getStore()?.get('traceId');
    this.pino.error({ traceId }, this.getMessage(message, context));
    if (trace) {
      this.pino.error(trace);
    }
  }

  log(message: any, context?: string): any {
    const traceId = this.asyncStorage.getStore()?.get('traceId');
    this.pino.info({ traceId }, this.getMessage(message, context));
  }

  warn(message: any, context?: string): any {
    const traceId = this.asyncStorage.getStore()?.get('traceId');
    this.pino.warn({ traceId }, this.getMessage(message, context));
  }

  private getMessage(message: any, context?: string) {
    return context ? `[${context}] ${message}` : message;
  }
}
