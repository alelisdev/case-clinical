import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { FormlyModule } from '@ngx-formly/core'
import { UiFormFieldModule } from '../../wrappers/form-field/ui-form-field.module'
import { NgxMaskModule, IConfig } from 'ngx-mask'
import { UiFormTitleComponent } from './ui-form-title.component'


const currencyMask: Partial<IConfig> = {
  validation: false,
};

@NgModule({
  declarations: [UiFormTitleComponent],
  imports: [
    CommonModule,
    UiFormFieldModule,
    ReactiveFormsModule,
    FormlyModule.forChild({
      types: [
        {
          name: 'title',
          component: UiFormTitleComponent,
        }
      ],
    }),
    NgxMaskModule.forRoot(currencyMask),
  ],
})
export class UiFormTitleModule {}
