import { CommonModule } from '@angular/common';
import { FormlyModule } from '@ngx-formly/core';
import { GoogleMapBuilderComponent } from './googlemapbuilder.component';
import { NgModule } from '@angular/core';
import { AgmCoreModule } from '@agm/core'
import { UiFormConextProviderModule } from '../../context-provider/ui-form-context-provider.module';

@NgModule({
  imports: [
    CommonModule,
    UiFormConextProviderModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyC3cPFfcRGTdbgdFra8MaM5x2lXd7wHGeg',
      libraries: ['places'],
    }),
    FormlyModule.forChild({
      wrappers: [
        {
          name: 'googlemap',
          component: GoogleMapBuilderComponent,
        },
      ],
    }),
  ],
  declarations: [GoogleMapBuilderComponent]
})
export class GoogleMapBuilderModule { }
