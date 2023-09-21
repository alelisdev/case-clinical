import { Injectable, Optional } from '@angular/core';
import { Guid } from 'guid-typescript';
import { Observable, ReplaySubject } from 'rxjs';
import { ILogEntry } from './i-log-entry';
import { ILoggingConfig } from './i-logging-config';
import { LogEntry } from './log-entry';
import { LoggingConfig } from './logging-config';
import { Severity } from './severity.enum';

export interface ILoggingService {
  applicationName: string;
  handleSettings(settings: ILoggingConfig): void;
  id: Guid;
  isProduction: boolean;
  log(source: string, severity: Severity, message: string, tags?: string[]): void;
  logEntries$: Observable<ILogEntry>;
  message: string;
  serviceName: string;
  severity: Severity;
  source: string;
  timestamp: Date;
  version: string;
}
@Injectable({
  providedIn: 'root'
})
export class LoggingService implements ILoggingService {
  serviceName = 'LoggingService';
  source!: string;
  severity!: Severity;
  message!: string;
  timestamp: Date = new Date();
  applicationName!: string;
  version!: string;
  isProduction!: boolean;
  id: Guid = Guid.create();

  private logEntriesSubject: ReplaySubject<ILogEntry> = new ReplaySubject<ILogEntry>(1);
  public readonly logEntries$: Observable<ILogEntry> = this.logEntriesSubject.asObservable();

  /**
   * The [LoggingService] constructor.
   */
  constructor(
    @Optional() public loggingConfig: LoggingConfig) {
    this.log(this.serviceName, Severity.Information, `Starting logging service [${this.id.toString()}] at: ${this.timestamp}`);
    this.initializeService(loggingConfig);
  }

  /**
   * Use to initialize the logging service. Retrieves
   * application configuration settings.
   *
   * @param configService contains the configuration settings for the application
   */
  private initializeService(loggingConfig: ILoggingConfig): void {
    if (loggingConfig) {
      this.isProduction = this.loggingConfig.isProduction;
      this.applicationName = this.loggingConfig.applicationName ? this.loggingConfig.applicationName : 'Angular';
    }
  }

  /**
   * Use to handle settings from the configuration service.
   * @param settings
   */
  handleSettings(settings: ILoggingConfig) {
    if (!settings) {
      throw new Error('The logging service configuration is not valid. Cannot initialize - you can do better, really.');
    }
  }

  /**
   * Use this method to send a log message with severity and source information
   * to the application's logger.
   *
   * If the application environment mode is [Production], the information will
   * be sent to a centralized repository.
   *
   * @param source
   * @param severity
   * @param message
   */
  log(source: string, severity: Severity, message: string, tags?: string[]) {
    this.source = this.applicationName !== source ? `${this.applicationName}.${source}` : this.applicationName;
    this.severity = severity;
    this.message = message;
    this.timestamp = new Date();

    if (tags) {
      tags.push(`LoggerId:${this.id.toString()}`);
    } else {
      tags = [`LoggerId:${this.id.toString()}`];
    }

    const logEntry = new LogEntry(this.applicationName, this.source, this.severity, this.message, tags);
    this.logEntriesSubject.next(logEntry);
  }
}
