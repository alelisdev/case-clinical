import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { FormlyModule } from '@ngx-formly/core'
import { UiFormFieldModule } from '../../wrappers/form-field/ui-form-field.module'
import { NgxMaskModule, IConfig } from 'ngx-mask'
import { UiFormDividerComponent } from './ui-form-divider.component'

const currencyMask: Partial<IConfig> = {
  validation: false,
};

@NgModule({
  declarations: [UiFormDividerComponent],
  imports: [
    CommonModule,
    UiFormFieldModule,
    ReactiveFormsModule,
    FormlyModule.forChild({
      types: [
        {
          name: 'divider',
          component: UiFormDividerComponent,
        }
      ],
    }),
    NgxMaskModule.forRoot(currencyMask),
  ],
})
export class UiFormDividerModule {}
