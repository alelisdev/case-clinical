import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColorPickerComponent } from './color-picker.component';
import { ColorPickerModule } from 'ngx-color-picker';
import { FormlyModule } from '@ngx-formly/core';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    ColorPickerModule,
    CommonModule,
    ReactiveFormsModule,
    FormlyModule.forChild({
      types: [
        {
          name: 'color-picker',
          component: ColorPickerComponent,
          wrappers: ['form-field'],
        },
      ],
    }),
  ],
  declarations: [ColorPickerComponent]
})
export class UiColorPickerModule { }
