import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { DataDogOptions } from './data-dog-options';
import { LoggingConfig } from './logging-config';
import { LoggingService } from './logging.service';

@NgModule({
  imports: [CommonModule],
})
export class LoggingModule {
  public static forRoot(options: DataDogOptions, loggingConfig: LoggingConfig): ModuleWithProviders<LoggingModule> {
    return {
      ngModule: LoggingModule,
      providers: [
        {
          provide: DataDogOptions,
          useValue: options
        },
        {
          provide: LoggingConfig,
          useValue: loggingConfig
        },
        LoggingService,
      ]
    }
  }
}
