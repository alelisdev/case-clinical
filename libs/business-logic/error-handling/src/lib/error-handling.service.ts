import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';
import { LoggingService, Severity } from '@schema-driven/logging';
import { noop } from 'rxjs';
import { ErrorHandlingOptions } from './error-handling-options';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlingService extends ErrorHandler {
  serviceName = 'ErrorHandlingService';
  hasSettings = false;

  constructor(
    private config: ErrorHandlingOptions,
    private loggingService: LoggingService) {
    super();

    this.init();
  }

  init() {
    if (this.config && this.config.applicationName) {
      this.hasSettings = true;
      this.loggingService.log(this.config.applicationName, Severity.Information, `Application [ErrorHandler] using configuration settings.`);
    } else {
      throw new Error(`Error Handling service is missing required configuration.`);
    }
  }

  /**
   * Use to handle generalized [Error] items or errors from HTTP/Web
   * APIs [HttpErrorResponse].
   *
   * @param error
   */
  override handleError(error: Error | HttpErrorResponse): void {
    if (this.config.includeDefaultErrorHandling) {
      // use the [super] call to keep default error handling functionality --> console;
      super.handleError(error);
    }

    if (this.hasSettings) {
      // A. HANDLE ERRORS FROM HTTP
      if (error instanceof HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
          // A.1: A client-side or network error occurred. Handle it accordingly.
          const formattedError = `${error.name}; ${error.message}`;
          this.loggingService.log(this.config.applicationName, Severity.Error, `${formattedError}`);
        } else {
          // A.2: The API returned an unsuccessful response (i.e., 400, 401, 403, etc.).
          /**
           * The [HttpService] should return a response that is consumable by the caller
           * of the API. The response should include relevant information and error messages
           * in a format that is known and consumable by the caller of the API.
           */
          noop();
        }
      } else {
        // B. HANDLE A GENERALIZED ERROR FROM THE APPLICATION/CLIENT;
        const formattedError = `Error: ${error.name}; Message: ${error.message}; Stack: ${error.stack ?? 'Stack trace not available.'}`;
        this.loggingService.log(this.config.applicationName, Severity.Error, `${formattedError}`);
      }
    }
  }
}
