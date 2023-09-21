import { CommonModule } from '@angular/common'
import { FormlyModule } from '@ngx-formly/core'
import { NgModule } from '@angular/core'
import { NgxMaskModule, IConfig } from 'ngx-mask'
import { ReactiveFormsModule } from '@angular/forms'
import { UiFormFieldModule } from '../../wrappers/form-field/ui-form-field.module'
import { UiFormMaskedInputComponent } from './ui-form-masked-input.component'

const currencyMask: Partial<IConfig> = {
  validation: false,
};

@NgModule({
  declarations: [UiFormMaskedInputComponent],
  imports: [
    CommonModule,
    UiFormFieldModule,
    ReactiveFormsModule,
    FormlyModule.forChild({
      types: [
        {
          name: 'masked-input',
          component: UiFormMaskedInputComponent,
          wrappers: ['form-field'],
        },
      ],
    }),
    NgxMaskModule.forRoot(currencyMask),
  ],
})
export class UiFormMaskedInputModule {}
