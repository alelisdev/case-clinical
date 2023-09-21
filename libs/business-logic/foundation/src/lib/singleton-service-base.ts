import { Type, inject, InjectFlags } from '@angular/core';
import { ServiceBase } from './service-base';
import { LoggingService } from '@schema-driven/logging';
import { ServiceContext } from './models/ServiceContext';

export class SingletonServiceBase extends ServiceBase {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(type: Type<any>, loggingService: LoggingService, serviceName: string, serviceContext: ServiceContext) {
    super(serviceName, loggingService, serviceContext);
    // eslint-disable-next-line no-bitwise
    const parent = inject(type, InjectFlags.Optional | InjectFlags.SkipSelf);
    if (parent) {
      throw Error(`Cannot create multiple instances of provider: [${type}]`);
    }
  }
}
