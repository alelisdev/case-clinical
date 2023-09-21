import { WebUiCodeModule } from '@case-clinical/web/ui/code';
import { CommonModule } from '@angular/common'
import { FormlyModule } from '@ngx-formly/core'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { UiFormEmptyComponent } from './ui-form-empty.component'
import { UiFormFieldModule } from '../../wrappers/form-field/ui-form-field.module'

@NgModule({
  declarations: [UiFormEmptyComponent],
  imports: [
    CommonModule,
    UiFormFieldModule,
    ReactiveFormsModule,
    WebUiCodeModule,
    FormlyModule.forChild({
      types: [
        {
          name: 'empty',
          component: UiFormEmptyComponent,
        },
      ],
    }),
  ],
})
export class UiFormEmptyModule {}
