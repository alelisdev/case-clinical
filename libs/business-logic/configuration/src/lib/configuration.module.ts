import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigurationContext } from './configuration-context';

@NgModule({
  imports: [CommonModule],
})
export class ConfigurationModule {
  static forRoot<T>(configContext: ConfigurationContext<T>): ModuleWithProviders<ConfigurationModule> {
    return {
      ngModule: ConfigurationModule,
      providers: [
        {
          provide: ConfigurationContext,
          useValue: configContext,
        },
      ],
    };
  }
}
