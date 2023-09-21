import { ErrorHandler, ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorHandlingOptions } from './error-handling-options';
import { ErrorHandlingService } from './error-handling.service';

@NgModule({
  imports: [CommonModule],
})
export class ErrorHandlingModule {
  public static forRoot(options: ErrorHandlingOptions): ModuleWithProviders<ErrorHandlingModule> {
    return {
      ngModule: ErrorHandlingModule,
      providers: [
        {
          provide: ErrorHandlingOptions,
          useValue: options
        },
        {
          provide: ErrorHandler,
          useClass: ErrorHandlingService
        }
      ]
    }
  }
}
