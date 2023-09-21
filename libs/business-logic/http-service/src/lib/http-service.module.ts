import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { HttpService } from './http.service';
import { HttpOptions } from './i-http-options';

@NgModule({
  imports: [CommonModule],
})
export class HttpServiceModule {
  public static forRoot(options: HttpOptions): ModuleWithProviders<HttpServiceModule> {
    return {
      ngModule: HttpServiceModule,
      providers: [
        HttpService,
        {
          provide: HttpOptions,
          useValue: options
        }
      ]
    }
  }
}
