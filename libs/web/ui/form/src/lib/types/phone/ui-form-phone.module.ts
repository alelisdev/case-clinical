import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common'
import { FormlyModule } from '@ngx-formly/core'
import { NgModule } from '@angular/core'
import { NgxMaskModule, IConfig } from 'ngx-mask'
import { ReactiveFormsModule } from '@angular/forms'
import { UiFormFieldModule } from '../../wrappers/form-field/ui-form-field.module'
import { UiFormPhoneInputComponent } from './ui-form-phone.component'

const currencyMask: Partial<IConfig> = {
  validation: false,
};

@NgModule({
  declarations: [UiFormPhoneInputComponent],
  imports: [
    CommonModule,
    UiFormFieldModule,
    ReactiveFormsModule,
    MatSelectModule,
    FormlyModule.forChild({
      types: [
        {
          name: 'phone',
          component: UiFormPhoneInputComponent,
          wrappers: ['form-field'],
        },
      ],
    }),
    NgxMaskModule.forRoot(currencyMask),
  ],
})
export class UiFormPhoneInputModule {}
