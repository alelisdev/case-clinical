import { Injectable } from '@angular/core';
import { IConfigurationService } from '@schema-driven/configuration';
import { Guid } from 'guid-typescript';
import { Subject } from 'rxjs';
import { ILogEntry } from './i-log-entry';
import { ILoggingConfig } from './i-logging-config';
import { LoggingConfig } from './logging-config';
import { ILoggingService } from './logging.service';
import { Severity } from './severity.enum';


@Injectable()
export class LoggingServiceMock<T> implements ILoggingService {
  applicationName = 'application';
  config!: LoggingConfig;
  configService!: IConfigurationService<T>;
  handleSettings!: () => { unknown: any };
  id: Guid = Guid.create();
  isProduction!: boolean;
  logEntries$: Subject<ILogEntry> = new Subject<ILogEntry>();
  loggingConfig!: ILoggingConfig;
  message!: string;
  serviceName = 'LoggingServiceMock';
  severity!: Severity;
  source!: string;
  stack!: string;
  timestamp!: Date;
  version = '0.0.0';

  setupConfiguration(settings: ILoggingConfig) {
    if (settings) {
      this.log(this.serviceName, Severity.Information, `Logging for [${settings.applicationName}].`);
    }
    this.isProduction = false;
  }

  log(source: string, severity: Severity, message: string) {
    this.source = source;
    this.severity = severity;
    this.message = message;
  }
}
