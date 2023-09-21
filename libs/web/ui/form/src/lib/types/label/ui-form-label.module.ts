import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { FormlyModule } from '@ngx-formly/core'
import { UiFormFieldModule } from '../../wrappers/form-field/ui-form-field.module'
import { NgxMaskModule, IConfig } from 'ngx-mask'
import { UiFormLabelComponent } from './ui-form-label.component'

const currencyMask: Partial<IConfig> = {
  validation: false,
};

@NgModule({
  declarations: [UiFormLabelComponent],
  imports: [
    CommonModule,
    UiFormFieldModule,
    ReactiveFormsModule,
    FormlyModule.forChild({
      types: [
        {
          name: 'label',
          component: UiFormLabelComponent,
        }
      ],
    }),
    NgxMaskModule.forRoot(currencyMask),
  ],
})
export class UiFormLabelModule {}
