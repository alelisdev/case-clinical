import { Injectable, Optional } from '@angular/core';
import { datadogLogs } from '@datadog/browser-logs';
import { datadogRum } from '@datadog/browser-rum';
import { DataDogOptions } from '../data-dog-options';
import { ILogEntry } from '../i-log-entry';
import { LoggingService } from '../logging.service';
import { Severity } from '../severity.enum';
import { LogWriter } from './log-writer';

@Injectable({
  providedIn: 'root'
})
export class DataDogWriterService extends LogWriter {

  constructor(
    @Optional() private options: DataDogOptions,
    private loggingService: LoggingService,
  ) {
    super();
    this.initialize();
  }

  private initialize() {
    if (this.options && this.loggingService) {
      this.loggingService.logEntries$.subscribe((entry) =>
        this.handleLogEntry(entry)
      );
    } else {
      throw new Error(`Failed to initialize error handler for application. Please verify DataDog options.`)
    }
  }

  handleLogEntry(entry: ILogEntry) {
    if (this.hasWriter) {
      this.targetEntry = entry;
      this.execute();
    }
  }

  handleSettings() {
    if (this.options) {
      this.hasWriter = true;
      console.log(`Initializing [DataDog] writer for logging.`);

      /**
       * Use to initialize client-browser log transfer to DataDog;
       */
      datadogLogs.init({
        clientToken: this.options.logs.clientToken,
        site: this.options.logs.site,
        forwardErrorsToLogs: this.options.logs.forwardErrorsToLogs,
        sampleRate: this.options.logs.sampleRate
      });

      /**
       * Note: The trackInteractions initialization parameter enables the automatic collection of user
       * clicks in your application.Sensitive and private data contained on your pages may be included to
       * identify the elements interacted with.
       *
       * version: Specify a version number to identify the deployed version of your application in Datadog
       */
      datadogRum.init({
        applicationId: this.options.realUserMonitoring.applicationId,
        clientToken: this.options.realUserMonitoring.clientToken,
        site: this.options.realUserMonitoring.site,
        service: this.options.realUserMonitoring.service,
        env: this.options.realUserMonitoring.env,
        // Specify a version number to identify the deployed version of your application in Datadog
        version: this.options.realUserMonitoring.version,
        sampleRate: this.options.realUserMonitoring.sampleRate,
        trackInteractions: this.options.realUserMonitoring.trackInteractions
      });
    }
  }

  /**
   * Use to perform an setup or configuration of the [writer].
   * The [setup] method runs on all executions of the writer - and
   * is called before the [write] method.
   */
  public setup(): void {
    if (this.hasWriter && this.options && this.targetEntry) {
      try {
        // FIXME: DO WE NEED TO SOMETHING HERE? Nope.
      } catch (error) {
        if (error && error instanceof Error) {
          const message = `${this.targetEntry.application}.DataDogWriter: ${error?.message ?? ''}, ${error?.stack ?? error.stack}`;
          console.error(message);
        }
      }
    }
  }

  /**
   * Use to implement the actual write of the [Log Entry].
   */
  public write(): void {
    if (this.targetEntry) {
      switch (this.targetEntry.severity) {
        case Severity.Information:
          datadogLogs.logger.info(this.targetEntry.application, { ...this.targetEntry });
          break;
        case Severity.Warning:
          datadogLogs.logger.warn(this.targetEntry.application, { ...this.targetEntry });
          break;
        case Severity.Error:
          datadogLogs.logger.error(this.targetEntry.application, { ...this.targetEntry });
          break;
        case Severity.Critical:
          datadogLogs.logger.error(this.targetEntry.application, { ...this.targetEntry });
          break;
        case Severity.Debug:
          datadogLogs.logger.info(this.targetEntry.application, { ...this.targetEntry });
          break;
        default:
          datadogLogs.logger.info(this.targetEntry.application, { ...this.targetEntry });
      }
    }
  }

}
