import { WebUiCodeModule } from '@case-clinical/web/ui/code';
import { CommonModule } from '@angular/common'
import { FormlyModule } from '@ngx-formly/core'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { UiFormCodeComponent } from './ui-form-code.component'
import { UiFormFieldModule } from '../../wrappers/form-field/ui-form-field.module'

@NgModule({
  declarations: [UiFormCodeComponent],
  imports: [
    CommonModule,
    UiFormFieldModule,
    ReactiveFormsModule,
    WebUiCodeModule,
    FormlyModule.forChild({
      types: [
        {
          name: 'code',
          component: UiFormCodeComponent,
          wrappers: ['form-field'],
        },
      ],
    }),
  ],
})
export class UiFormCodeModule {}
