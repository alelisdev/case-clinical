import { MatSliderModule } from '@angular/material/slider';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { FormlyModule } from '@ngx-formly/core'
import { UiFormFieldModule } from '../../wrappers/form-field/ui-form-field.module'
import { UiRangeSliderComponent } from './ui-form-range-slider.component'
import { MatFormFieldModule } from '@angular/material/form-field'
//import { NgxSliderModule } from '@angular-slider/ngx-slider';

@NgModule({
  declarations: [UiRangeSliderComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
   //// NgxSliderModule,
    UiFormFieldModule,
    FormsModule,
    MatFormFieldModule,
    MatSliderModule,
    FormlyModule.forChild({
      types: [
        {
          name: 'range',
          component: UiRangeSliderComponent,
          wrappers: ['form-field'],
        },
      ],
    }),
  ],
})
export class UiFormRangeSliderModule {}
