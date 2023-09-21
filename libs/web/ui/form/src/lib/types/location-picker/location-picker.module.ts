import { CommonModule } from '@angular/common';
import { FormlyModule } from '@ngx-formly/core';
import { LocationPickerComponent } from './location-picker.component';
import { NgModule } from '@angular/core';
import { WebUiMapModule } from '@case-clinical/web/ui/map';

@NgModule({
  imports: [
    CommonModule,
    WebUiMapModule,
    FormlyModule.forChild({
      types: [
        {
          name: 'Address-picker',
          component: LocationPickerComponent,
          wrappers: ['form-field'],
          defaultOptions: {
            validators: {
              validation: ['addressLength'],
            }
          },
        },
      ],
    }),
  ],
  declarations: [LocationPickerComponent]
})
export class LocationPickerModule { }
